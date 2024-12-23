import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Share2, Bookmark, BookmarkCheck } from 'lucide-react';

interface CourseHeaderActionsProps {
  isSaved: boolean;
  onSave: () => void;
  onShare: () => void;
}

const CourseHeaderActions = ({ isSaved, onSave, onShare }: CourseHeaderActionsProps) => {
  return (
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
          onClick={onSave}
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
          onClick={onShare}
          title="Share course"
        >
          <Share2 className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default CourseHeaderActions;