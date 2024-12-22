import { useParams, Link } from "react-router-dom";
import PageTransition from "@/components/PageTransition";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, BookOpen, Target, ListChecks, Clock, CheckCircle2, Loader2, ArrowLeft } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/components/AuthProvider";

const Course = () => {
  const { id } = useParams();
  const { user } = useAuth();

  const { data: course, isLoading: courseLoading } = useQuery({
    queryKey: ['course', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('course')
        .select('*')
        .eq('id', id)
        .maybeSingle();
      
      if (error) throw error;
      return data;
    },
  });

  const { data: classes, isLoading: classesLoading } = useQuery({
    queryKey: ['classes', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('class')
        .select('*')
        .eq('course_id', id)
        .order('index');
      
      if (error) throw error;
      return data;
    },
  });

  const { data: completedClasses = [], isLoading: completedClassesLoading } = useQuery({
    queryKey: ['completed-classes', id, user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await supabase
        .from('class_completed')
        .select('class_id')
        .eq('user_id', user.id);
      
      if (error) throw error;
      return data.map(item => item.class_id);
    },
    enabled: !!user,
  });

  const isLoading = courseLoading || classesLoading || completedClassesLoading;

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
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-2xl font-bold text-gray-900">Course not found</h1>
          </div>
        </div>
      </PageTransition>
    );
  }

  const totalClasses = classes?.length || 0;
  const completedClassesCount = completedClasses.length;
  const progressPercentage = (completedClassesCount / totalClasses) * 100;

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8 group transition-colors"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to Courses
          </Link>

          {/* Header Section */}
          <div className="mb-12 text-center">
            <Badge variant="secondary" className="mb-6">Course</Badge>
            <h1 className="text-5xl font-bold text-gray-900 mb-6 tracking-tight">{course.topic}</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-6">{course.description}</p>
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
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <Progress value={progressPercentage} className="h-2" />
          </div>

          {/* Course Outcomes */}
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
                  {course.outcome.split('\n').map((outcome, index) => (
                    <div key={index} className="flex items-start gap-3 group">
                      <ListChecks className="h-5 w-5 text-green-500 mt-1 flex-shrink-0 group-hover:scale-110 transition-transform" />
                      <span className="text-gray-700">{outcome}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Class List */}
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
                    <Link
                      key={classItem.id}
                      to={`/class/${classItem.id}`}
                      className="block group"
                    >
                      <Card className={`transition-all duration-300 hover:shadow-xl border-none ${isCompleted ? 'bg-green-50' : 'bg-white'}`}>
                        <CardContent className="p-6">
                          <div className="flex justify-between items-start">
                            <div className="flex-grow">
                              <div className="flex items-center gap-3">
                                {isCompleted && (
                                  <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                                )}
                                <h3 className={`text-lg font-semibold mb-2 group-hover:text-blue-600 transition-colors ${isCompleted ? 'text-green-700' : 'text-gray-900'}`}>
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
