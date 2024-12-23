import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BookOpen, Clock, Trophy, Share2 } from 'lucide-react';
import { toast } from 'sonner';

interface CourseHeaderProps {
  topic: string;
  description: string;
  totalClasses: number;
  completedClassesCount: number;
  isCompleted: boolean;
  onComplete: () => void;
}

const CourseHeader = ({
  topic,
  description,
  totalClasses,
  completedClassesCount,
  isCompleted,
  onComplete,
}: CourseHeaderProps) => {
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

  return (
    <div className="mb-12 text-center relative">
      <div className="absolute right-0 top-0">
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full"
          onClick={handleShare}
          title="Share course"
        >
          <Share2 className="h-5 w-5" />
        </Button>
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