import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Share2, Bookmark, BookmarkCheck } from 'lucide-react';
import { useAuth } from '../AuthProvider';

interface CourseHeaderActionsProps {
  isSaved: boolean;
  onSave: () => void;
  onShare: () => void;
}

const CourseHeaderActions = ({ isSaved, onSave, onShare }: CourseHeaderActionsProps) => {
  const { user } = useAuth();

  return (
    <div className="flex justify-between items-center mb-4">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 group transition-colors"
      >
        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
        Back to Courses
      </Link>
      <div className="flex gap-2">
        {user && (
          <Button
            variant="outline"
            size="icon"
            className="rounded-full shadow-purple-100 hover:shadow-purple-200  hover:text-purple-600 transition-all duration-300"
            onClick={onSave}
            title={isSaved ? 'Remove from library' : 'Save to library'}
          >
            {isSaved ? (
              <BookmarkCheck className="h-6 w-6 text-purple-600" />
            ) : (
              <Bookmark className="h-6 w-6" />
            )}
          </Button>
        )}
        <Button
          variant="outline"
          size="icon"
          className="rounded-full shadow-purple-100 hover:shadow-purple-200  hover:text-purple-600 transition-all duration-300"
          onClick={onShare}
          title="Share course"
        >
          <Share2 className="h-6 w-6" />
        </Button>
      </div>
    </div>
  );
};

export default CourseHeaderActions;
