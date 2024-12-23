import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { useAuth } from '@/components/AuthProvider';
import { supabase } from '@/integrations/supabase/client';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import CourseHeaderActions from './CourseHeaderActions';
import CourseProgress from './CourseProgress';

interface CourseHeaderProps {
  topic: string;
  description: string;
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
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: isSaved } = useQuery({
    queryKey: ['saved-course', courseId, user?.id],
    queryFn: async () => {
      if (!user) return false;
      const { data } = await supabase
        .from('saved_course')
        .select('id')
        .eq('course_id', courseId)
        .eq('user_id', user.id)
        .maybeSingle();
      return !!data;
    },
    enabled: !!user,
  });

  const handleShare = async () => {
    try {
      await navigator.share({
        title: topic,
        text: description,
        url: window.location.href,
      });
    } catch (error) {
      // If Web Share API is not supported, fallback to copying URL
      navigator.clipboard.writeText(window.location.href);
      toast.success('Course URL copied to clipboard');
    }
  };

  const handleSave = async () => {
    if (!user) {
      toast.error('Please sign in to save courses');
      return;
    }

    try {
      if (isSaved) {
        await supabase
          .from('saved_course')
          .delete()
          .eq('course_id', courseId)
          .eq('user_id', user.id);
        toast.success('Course removed from library');
      } else {
        await supabase
          .from('saved_course')
          .insert([{ course_id: courseId, user_id: user.id }]);
        toast.success('Course saved to library');
      }
      queryClient.invalidateQueries({ queryKey: ['saved-course', courseId, user.id] });
      queryClient.invalidateQueries({ queryKey: ['saved-courses', user.id] });
    } catch (error) {
      toast.error('Failed to save course');
    }
  };

  return (
    <div className="mb-12 text-center relative">
      <CourseHeaderActions isSaved={isSaved} onSave={handleSave} onShare={handleShare} />
      <Badge variant="secondary" className="mb-6">
        Course
      </Badge>
      <h1 className="text-5xl font-bold text-gray-900 mb-6 tracking-tight">{topic}</h1>
      <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-6">{description}</p>
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