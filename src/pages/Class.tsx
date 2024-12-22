import { useParams, Link } from "react-router-dom";
import PageTransition from "@/components/PageTransition";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, CheckCircle2, XCircle, ArrowLeft } from "lucide-react";
import { useAuth } from "@/components/AuthProvider";
import AudioLesson from "@/components/class/AudioLesson";
import ResearchSection from "@/components/class/ResearchSection";

const Class = () => {
  const { id } = useParams();
  const { user } = useAuth();

  const { data: classData, isLoading: isClassLoading } = useQuery({
    queryKey: ['class', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('class')
        .select(`
          *,
          course:course (
            id,
            topic,
            description
          )
        `)
        .eq('id', id)
        .maybeSingle();
      
      if (error) throw error;
      console.log('Fetched class data:', data);
      return data;
    },
  });

  const { data: completionStatus, isLoading: isCompletionLoading } = useQuery({
    queryKey: ['class-completion', id, user?.id],
    queryFn: async () => {
      if (!user) return null;
      const { data, error } = await supabase
        .from('class_completed')
        .select('*')
        .eq('class_id', id)
        .eq('user_id', user.id)
        .maybeSingle();
      
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  if (isClassLoading || isCompletionLoading) {
    return (
      <PageTransition>
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 flex justify-center items-center">
          <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
        </div>
      </PageTransition>
    );
  }

  if (!classData) {
    return (
      <PageTransition>
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-2xl font-bold text-gray-900">Class not found</h1>
          </div>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-white flex flex-col">
        {/* Header Section */}
        <div className="bg-gradient-to-b from-gray-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Back Button */}
            <Link
              to={`/course/${classData?.course?.id}`}
              className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8 group transition-colors"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Back to {classData?.course?.topic}
            </Link>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <h1 className="text-4xl font-bold text-gray-900">
                  {classData?.name}
                </h1>
                {completionStatus ? (
                  <CheckCircle2 className="h-8 w-8 text-green-500" />
                ) : (
                  <XCircle className="h-8 w-8 text-gray-300" />
                )}
              </div>
              <p className="text-xl text-gray-600">{classData?.description}</p>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 w-full">
          <div className="flex flex-col gap-6">
            <AudioLesson
              audioUrl={classData?.audio_url}
              transcription={classData?.transcription}
            />
            <ResearchSection research={classData?.research} />
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Class;