import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Bookmark, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/components/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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

  const { data: course } = useQuery({
    queryKey: ['course', id],
    queryFn: async () => {
      const { data } = await supabase
        .from('course')
        .select('*')
        .eq('id', id)
        .single();
      
      return data;
    },
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="h-full"
    >
      <Link to={`/course/${id}`} className="block h-full">
        <div className="group relative p-6 rounded-2xl bg-white/80 shadow-sm ring-1 ring-purple-100/20 hover:shadow-xl hover:shadow-purple-100/30 hover:bg-white transition-all duration-500 h-full transform hover:-translate-y-1">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-50/50 via-white to-purple-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative flex flex-col h-full">
            <div className="flex justify-between items-start mb-4">
              <div className="text-xs font-medium text-purple-500 bg-purple-50 px-3 py-1 rounded-full">
                {classCount} {classCount === 1 ? 'class' : 'classes'} · {duration}
              </div>
              {isCompleted && (
                <CheckCircle2 className="h-5 w-5 text-purple-500 flex-shrink-0" />
              )}
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-purple-700 transition-colors duration-300">
              {title}
            </h3>
            <p className="text-gray-600 mb-4 flex-grow">{description}</p>
            <div className="flex items-center justify-between">
              <div className="flex gap-4">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <Bookmark className="h-4 w-4" />
                        <span>{course?.saved_count || 0}</span>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Number of times this course has been saved</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <Users className="h-4 w-4" />
                        <span>{course?.completed_count || 0}</span>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Number of users who completed this course</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <div className="flex items-center text-sm font-medium text-purple-600 group-hover:text-purple-700">
                Learn more
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default CourseCard;