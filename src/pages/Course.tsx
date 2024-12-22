import { useParams, Link } from 'react-router-dom';
import PageTransition from '@/components/PageTransition';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  ArrowRight,
  BookOpen,
  Target,
  ListChecks,
  Clock,
  CheckCircle2,
  Loader2,
  ArrowLeft,
  Trophy,
} from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/AuthProvider';
import { useToast } from '@/hooks/use-toast';
import Markdown from '@/components/general/Markdown';

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
  const allClassesCompleted = totalClasses > 0 && completedClassesCount === totalClasses;

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

          <div className="mb-12 text-center">
            <Badge variant="secondary" className="mb-6">
              Course
            </Badge>
            <h1 className="text-5xl font-bold text-gray-900 mb-6 tracking-tight">
              {course?.topic}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-6">{course?.description}</p>
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
              {allClassesCompleted && !courseCompletion && (
                <Button
                  onClick={handleCompleteCourse}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700 shadow-lg shadow-green-500/20 transition-all duration-300"
                >
                  <Trophy className="h-4 w-4" />
                  Complete Course
                </Button>
              )}
              {courseCompletion && (
                <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full shadow-sm border border-green-200">
                  <Trophy className="h-4 w-4" />
                  <span className="text-sm font-medium">Course Completed</span>
                </div>
              )}
            </div>
          </div>

          <div className="mb-8">
            <Progress value={progressPercentage} className="h-2" />
          </div>

          {course.outcome && (
            <Card className="mb-8 border-none shadow-lg bg-white/50 backdrop-blur">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <Target className="h-6 w-6 text-blue-500" />
                  Learning Outcomes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3 group">
                    <ListChecks className="h-5 w-5 text-green-500 mt-1 flex-shrink-0 group-hover:scale-110 transition-transform" />
                    <Markdown className="text-gray-700 bg-white">{course.outcome}</Markdown>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <Card className="border-none shadow-lg bg-white/50 backdrop-blur">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <BookOpen className="h-6 w-6 text-blue-500" />
                Course Classes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {classes?.map((classItem) => {
                  const isCompleted = completedClasses.includes(classItem.id);
                  return (
                    <Link key={classItem.id} to={`/class/${classItem.id}`} className="block group">
                      <Card
                        className={`transition-all duration-300 hover:shadow-xl border-none ${
                          isCompleted ? 'bg-green-50' : 'bg-white'
                        }`}
                      >
                        <CardContent className="p-6">
                          <div className="flex justify-between items-start">
                            <div className="flex-grow">
                              <div className="flex items-center gap-3">
                                {isCompleted && (
                                  <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                                )}
                                <h3
                                  className={`text-lg font-semibold mb-2 group-hover:text-blue-600 transition-colors ${
                                    isCompleted ? 'text-green-700' : 'text-gray-900'
                                  }`}
                                >
                                  {classItem.name}
                                </h3>
                              </div>
                              <p className="text-gray-600 mb-2">{classItem.description}</p>
                              <div className="flex items-center gap-2 text-sm text-gray-500">
                                <Clock className="h-4 w-4" />
                                <span>{classItem.duration}</span>
                              </div>
                            </div>
                            <ArrowRight className="h-5 w-5 text-gray-400 transition-transform group-hover:translate-x-2 group-hover:text-blue-500" />
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageTransition>
  );
};

export default Course;
