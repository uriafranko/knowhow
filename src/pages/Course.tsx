import { useParams, Link } from 'react-router-dom';
import PageTransition from '@/components/PageTransition';
import { Progress } from '@/components/ui/progress';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/AuthProvider';
import { useToast } from '@/hooks/use-toast';
import { Loader2, ArrowLeft } from 'lucide-react';
import CourseHeader from '@/components/course/CourseHeader';
import LearningOutcomes from '@/components/course/LearningOutcomes';
import ClassList from '@/components/course/ClassList';

const Course = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: course, isLoading: courseLoading } = useQuery({
    queryKey: ['course', id],
    queryFn: async () => {
      if (!id) throw new Error('Course ID is required');
      const { data, error } = await supabase.from('course').select('*').eq('id', id).maybeSingle();
      if (error) throw error;
      return data;
    },
    enabled: !!id,
  });

  const { data: classes, isLoading: classesLoading } = useQuery({
    queryKey: ['classes', id],
    queryFn: async () => {
      if (!id) throw new Error('Course ID is required');
      const { data, error } = await supabase
        .from('class')
        .select('*')
        .eq('course_id', id)
        .order('index');
      if (error) throw error;
      return data;
    },
    enabled: !!id,
  });

  const { data: completedClasses = [], isLoading: completedClassesLoading } = useQuery({
    queryKey: ['completed-classes', id, user?.id],
    queryFn: async () => {
      if (!user || !id) return [];
      const { data, error } = await supabase
        .from('class_completed')
        .select('class_id')
        .eq('user_id', user.id)
        .eq('course_id', id);
      if (error) throw error;
      return data.map((item) => item.class_id);
    },
    enabled: !!user && !!id,
  });

  const { data: courseCompletion } = useQuery({
    queryKey: ['course-completion', id, user?.id],
    queryFn: async () => {
      if (!user || !id) return null;
      const { data, error } = await supabase
        .from('course_completed')
        .select('*')
        .eq('course_id', id)
        .eq('user_id', user.id)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
    enabled: !!user && !!id,
  });

  const handleCompleteCourse = async () => {
    if (!user || !id) {
      toast({
        title: 'Authentication required',
        description: 'Please sign in to mark courses as complete',
        variant: 'destructive',
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('course_completed')
        .insert([{ course_id: Number(id), user_id: user.id }]);

      if (error) throw error;

      queryClient.invalidateQueries({ queryKey: ['course-completion', id, user.id] });

      toast({
        title: 'Course completed! 🎉',
        description: 'Congratulations on completing this course!',
        className: 'bg-gradient-to-r from-slate-50 to-slate-100 border-slate-200',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'There was a problem marking the course as complete',
        variant: 'destructive',
      });
    }
  };

  const isLoading = courseLoading || classesLoading || completedClassesLoading;
  const totalClasses = classes?.length || 0;
  const completedClassesCount = completedClasses.length;
  const progressPercentage = (completedClassesCount / totalClasses) * 100;

  if (isLoading) {
    return (
      <PageTransition>
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 flex justify-center items-center">
          <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
        </div>
      </PageTransition>
    );
  }

  if (!course) {
    return (
      <PageTransition>
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
          <div className="mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-2xl font-bold text-gray-900">Course not found</h1>
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mt-4"
            >
              <ArrowLeft className="h-4 w-4" />
              Return to Courses
            </Link>
          </div>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8 group transition-colors"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to Courses
          </Link>

          <CourseHeader
            topic={course.topic}
            description={course.description}
            totalClasses={totalClasses}
            completedClassesCount={completedClassesCount}
            isCompleted={!!courseCompletion}
            onComplete={handleCompleteCourse}
            courseId={Number(id)}
          />

          <div className="mb-8">
            <Progress value={progressPercentage} className="h-2" />
          </div>

          <LearningOutcomes outcome={course.outcome} />
          <ClassList classes={classes || []} completedClasses={completedClasses} />
        </div>
      </div>
    </PageTransition>
  );
};

export default Course;