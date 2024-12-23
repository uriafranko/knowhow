import { motion } from 'framer-motion';
import CourseCard from '@/components/CourseCard';
import PageTransition from '@/components/PageTransition';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Loader2 } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from '@/components/AuthProvider';

const Library = () => {
  const { user } = useAuth();

  const { data: completedCourses, isLoading: isCompletedLoading } = useQuery({
    queryKey: ['completed-courses', user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await supabase
        .from('course_completed')
        .select(`
          course_id,
          course:course (
            id,
            topic,
            description
          )
        `)
        .eq('user_id', user.id);

      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  if (isCompletedLoading) {
    return (
      <PageTransition>
        <div className="flex justify-center items-center min-h-[200px]">
          <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-16">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl mb-4"
            >
              Your Library
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xl text-gray-600 max-w-2xl mx-auto"
            >
              Track your learning progress
            </motion.p>
          </div>

          <Tabs defaultValue="completed" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
              <TabsTrigger value="completed">Completed</TabsTrigger>
              <TabsTrigger value="saved">Saved</TabsTrigger>
            </TabsList>
            <TabsContent value="completed">
              {completedCourses && completedCourses.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {completedCourses.map((item, index) => (
                    <CourseCard
                      key={item.course.id}
                      id={item.course.id.toString()}
                      title={item.course.topic}
                      description={item.course.description || ''}
                      duration=""
                      index={index}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center text-gray-500">
                  No completed courses yet
                </div>
              )}
            </TabsContent>
            <TabsContent value="saved">
              <div className="text-center text-gray-500">
                Saved courses feature coming soon
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </PageTransition>
  );
};

export default Library;