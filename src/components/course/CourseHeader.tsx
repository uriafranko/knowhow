import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BookOpen, Clock, Trophy, Share2, Bookmark, BookmarkCheck, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/components/AuthProvider';
import { supabase } from '@/integrations/supabase/client';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router-dom';

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
      <div className="flex justify-between items-center mb-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 group transition-colors"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back to Courses
        </Link>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full hover:bg-purple-50 hover:text-purple-600 transition-all duration-300"
            onClick={handleSave}
            title={isSaved ? 'Remove from library' : 'Save to library'}
          >
            {isSaved ? (
              <BookmarkCheck className="h-5 w-5 text-purple-600" />
            ) : (
              <Bookmark className="h-5 w-5" />
            )}
          </Button>
          <Button
            variant="default"
            size="icon"
            className="rounded-full shadow-lg shadow-purple-100 hover:shadow-purple-200 transition-all duration-300"
            onClick={handleShare}
            title="Share course"
          >
            <Share2 className="h-5 w-5" />
          </Button>
        </div>
      </div>
      <Badge variant="secondary" className="mb-6">
        Course
      </Badge>
      <h1 className="text-5xl font-bold text-gray-900 mb-6 tracking-tight">{topic}</h1>
      <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-6">{description}</p>
      <div className="flex justify-center gap-4">
        <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border">
          <Clock className="h-4 w-4 text-blue-500" />
          <span className="text-sm font-medium">
            {totalClasses} {totalClasses === 1 ? 'class' : 'classes'}
          </span>
        </div>
        <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border">
          <BookOpen className="h-4 w-4 text-green-500" />
          <span className="text-sm font-medium">
            {completedClassesCount} of {totalClasses} completed
          </span>
        </div>
        {completedClassesCount === totalClasses && !isCompleted && (
          <Button
            onClick={onComplete}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700 shadow-lg shadow-green-500/20 transition-all duration-300"
          >
            <Trophy className="h-4 w-4" />
            Complete Course
          </Button>
        )}
        {isCompleted && (
          <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full shadow-sm border border-green-200">
            <Trophy className="h-4 w-4" />
            <span className="text-sm font-medium">Course Completed</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseHeader;