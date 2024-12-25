import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import CourseProgress from "./CourseProgress";
import CourseHeaderActions from "./CourseHeaderActions";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";

interface CourseHeaderProps {
  topic: string;
  description: string | null;
  totalClasses: number;
  completedClassesCount: number;
  isCompleted: boolean;
  onComplete: () => void;
  courseId: number;
}

const CourseHeader = ({
  topic,
  description,
  totalClasses,
  completedClassesCount,
  isCompleted,
  onComplete,
  courseId,
}: CourseHeaderProps) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: isSaved } = useQuery({
    queryKey: ['saved-course', courseId],
    queryFn: async () => {
      const { data } = await supabase
        .from('saved_course')
        .select('*')
        .eq('course_id', courseId)
        .maybeSingle();
      return !!data;
    },
  });

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: 'Link copied!',
      description: 'The course link has been copied to your clipboard.',
    });
  };

  const handleSave = async () => {
    try {
      if (isSaved) {
        await supabase
          .from('saved_course')
          .delete()
          .eq('course_id', courseId);

        toast({
          title: 'Course removed',
          description: 'The course has been removed from your library.',
        });
      } else {
        await supabase
          .from('saved_course')
          .insert([{ course_id: courseId }]);

        toast({
          title: 'Course saved!',
          description: 'The course has been added to your library.',
        });
      }

      queryClient.invalidateQueries({ queryKey: ['saved-course', courseId] });
      queryClient.invalidateQueries({ queryKey: ['course', courseId] });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'There was a problem saving the course.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="mb-8">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Courses
      </Link>
      <div className="flex justify-between items-start gap-8 mb-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{topic}</h1>
          <p className="text-gray-600">{description}</p>
        </div>
        <CourseHeaderActions
          isSaved={!!isSaved}
          onSave={handleSave}
          onShare={handleShare}
        />
      </div>
      <CourseProgress
        totalClasses={totalClasses}
        completedClassesCount={completedClassesCount}
        isCompleted={isCompleted}
        onComplete={onComplete}
      />
    </div>
  );
};

export default CourseHeader;