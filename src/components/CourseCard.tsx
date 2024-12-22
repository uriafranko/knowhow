import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/components/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface CourseCardProps {
  id: string;
  title: string;
  description: string;
  duration: string;
  index: number;
}

const CourseCard = ({ id, title, description, duration, index }: CourseCardProps) => {
  const { user } = useAuth();

  const { data: isCompleted } = useQuery({
    queryKey: ['course-completion', id, user?.id],
    queryFn: async () => {
      if (!user) return false;
      
      const { data } = await supabase
        .from('course_completed')
        .select('*')
        .eq('course_id', id)
        .eq('user_id', user.id)
        .maybeSingle();

      return !!data;
    },
    enabled: !!user,
  });

  const { data: classCount = 0 } = useQuery({
    queryKey: ['course-classes-count', id],
    queryFn: async () => {
      const { count } = await supabase
        .from('class')
        .select('*', { count: 'exact', head: true })
        .eq('course_id', id);
      
      return count || 0;
    },
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link to={`/course/${id}`}>
        <div className="group relative p-6 rounded-2xl bg-white/80 shadow-sm ring-1 ring-black/5 hover:shadow-md hover:bg-white transition-all duration-300">
          <div className="flex flex-col h-full">
            <div className="flex justify-between items-start">
              <div className="text-xs font-medium text-gray-500 mb-2">
                {classCount} {classCount === 1 ? 'class' : 'classes'} · {duration}
              </div>
              {isCompleted && (
                <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
              )}
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-gray-700">
              {title}
            </h3>
            <p className="text-gray-600 mb-4 flex-grow">{description}</p>
            <div className="flex items-center text-sm font-medium text-gray-900">
              Learn more
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default CourseCard;