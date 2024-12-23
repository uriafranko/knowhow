import { useToast } from '@/hooks/use-toast';
import { useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import CourseHeaderActions from './CourseHeaderActions';
import CourseProgress from './CourseProgress';

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

      // Invalidate relevant queries to update the UI
      queryClient.invalidateQueries({ queryKey: ['saved-course', courseId] });
      queryClient.invalidateQueries({ queryKey: ['course-stats', courseId] });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'There was a problem saving the course.',
        variant: 'destructive',
      });
    }
  };

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

  return (
    <div className="mb-8">
      <CourseHeaderActions
        isSaved={!!isSaved}
        onSave={handleSave}
        onShare={handleShare}
      />
      <h1 className="text-4xl font-bold text-gray-900 mb-4">{topic}</h1>
      {description && (
        <p className="text-xl text-gray-600 mb-8">{description}</p>
      )}
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