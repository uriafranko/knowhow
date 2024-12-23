import { Button } from '@/components/ui/button';
import { BookOpen, Clock, Trophy } from 'lucide-react';

interface CourseProgressProps {
  totalClasses: number;
  completedClassesCount: number;
  isCompleted: boolean;
  onComplete: () => void;
}

const CourseProgress = ({
  totalClasses,
  completedClassesCount,
  isCompleted,
  onComplete,
}: CourseProgressProps) => {
  return (
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
  );
};

export default CourseProgress;