import { Button } from '@/components/ui/button';
import { Share2, Bookmark, BookmarkCheck } from 'lucide-react';
import { useAuth } from '../AuthProvider';

interface CourseHeaderActionsProps {
  isSaved: boolean;
  onSave: () => void;
  onShare: () => void;
}

const CourseHeaderActions = ({ isSaved, onSave, onShare }: CourseHeaderActionsProps) => {
  const { user } = useAuth();

  return (
    <div className="flex gap-2">
      {user && (
        <Button
          variant="outline"
          size="icon"
          className="rounded-full shadow-purple-100 hover:shadow-purple-200 hover:text-purple-600 transition-all duration-300"
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
        className="rounded-full shadow-purple-100 hover:shadow-purple-200 hover:text-purple-600 transition-all duration-300"
        onClick={onShare}
        title="Share course"
      >
        <Share2 className="h-6 w-6" />
      </Button>
    </div>
  );
};

export default CourseHeaderActions;