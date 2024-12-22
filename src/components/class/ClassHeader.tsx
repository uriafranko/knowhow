import { CheckCircle2, XCircle, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/components/AuthProvider';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { useQueryClient } from '@tanstack/react-query';

interface ClassHeaderProps {
  name: string;
  description: string;
  courseId: number;
  courseTopic: string;
  isCompleted: boolean;
  classId: number;
}

const ClassHeader = ({ name, description, courseId, courseTopic, isCompleted, classId }: ClassHeaderProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const handleToggleComplete = async () => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to mark classes as complete",
        variant: "destructive",
      });
      return;
    }

    try {
      if (isCompleted) {
        await supabase
          .from('class_completed')
          .delete()
          .eq('class_id', classId)
          .eq('user_id', user.id);
      } else {
        await supabase
          .from('class_completed')
          .insert([{ class_id: classId, user_id: user.id }]);
      }

      queryClient.invalidateQueries({ queryKey: ['class-completion', classId, user.id] });
      
      toast({
        title: isCompleted ? "Class unmarked" : "Class completed!",
        description: isCompleted ? "Progress has been updated" : "Great job on completing this class!",
        className: "bg-gradient-to-r from-slate-50 to-slate-100 border-slate-200",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem updating your progress",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="bg-gradient-to-b from-slate-50 via-white to-slate-50">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          to={`/course/${courseId}`}
          className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-6 group transition-colors"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          <span className="font-medium">{courseTopic}</span>
        </Link>

        <div className="flex justify-between items-start">
          <div className="space-y-4 max-w-3xl">
            <h1 className="text-4xl font-bold text-slate-900">
              {name}
            </h1>
            <p className="text-xl text-slate-600">{description}</p>
          </div>

          <Button
            onClick={handleToggleComplete}
            variant="outline"
            className={`magic-hover ${
              isCompleted 
                ? 'bg-green-50 text-green-600 hover:bg-green-100 border-green-200' 
                : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border-slate-200'
            }`}
          >
            {isCompleted ? (
              <>
                <CheckCircle2 className="mr-2 h-5 w-5 text-green-500" />
                Completed
              </>
            ) : (
              <>
                <XCircle className="mr-2 h-5 w-5" />
                Mark as Complete
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ClassHeader;