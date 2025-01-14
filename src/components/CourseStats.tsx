import { useAuth } from '@/components/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { BookOpen, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const CourseStats = () => {
  const { user } = useAuth();

  const { data: totalCourses } = useQuery({
    queryKey: ['totalCourses'],
    queryFn: async () => {
      const { count } = await supabase
        .from('course')
        .select('*', { count: 'exact', head: true })
        .eq('is_ready', true);
      return count || 0;
    },
  });

  const { data: completedCourses } = useQuery({
    queryKey: ['completedCourses', user?.id],
    queryFn: async () => {
      if (!user) return 0;
      const { count } = await supabase
        .from('course_completed')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id);
      return count || 0;
    },
    enabled: !!user,
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex gap-8 justify-center mb-8"
    >
      <div className="flex items-center gap-2">
        <BookOpen className="h-5 w-5 text-purple-500" />
        <span className="text-gray-600">
          <span className="font-semibold text-gray-900">{totalCourses}</span> courses available
        </span>
      </div>
      {user && (
        <div className="flex items-center gap-2">
          <CheckCircle className="h-5 w-5 text-green-500" />
          <span className="text-gray-600">
            <span className="font-semibold text-gray-900">{completedCourses}</span> completed
          </span>
        </div>
      )}
    </motion.div>
  );
};

export default CourseStats;