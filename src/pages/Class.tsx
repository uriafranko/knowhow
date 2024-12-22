import { useParams } from "react-router-dom";
import PageTransition from "@/components/PageTransition";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, CheckCircle2, XCircle } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { marked } from 'marked';
import { useAuth } from "@/components/AuthProvider";

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
            topic,
            description
          )
        `)
        .eq('id', id)
        .maybeSingle();
      
      if (error) throw error;
      console.log('Fetched class data:', data); // Debug log
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

  const parseContent = (content: string | null) => {
    if (!content) return '';
    // First replace escaped newlines with actual newlines
    const unescapedContent = content.replace(/\\n/g, '\n');
    // Then parse the markdown
    return marked(unescapedContent);
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-white">
        {/* Header Section */}
        <div className="bg-gradient-to-b from-gray-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <h1 className="text-4xl font-bold text-gray-900">{classData.name}</h1>
                {completionStatus ? (
                  <CheckCircle2 className="h-8 w-8 text-green-500" />
                ) : (
                  <XCircle className="h-8 w-8 text-gray-300" />
                )}
              </div>
              <p className="text-xl text-gray-600">{classData.description}</p>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
          {/* Audio Player Section */}
          <div className="bg-gray-50 rounded-2xl p-8 space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900">Audio Lesson</h2>
            {classData.audio_url ? (
              <audio 
                controls 
                className="w-full"
                src={classData.audio_url}
              >
                Your browser does not support the audio element.
              </audio>
            ) : (
              <div className="text-gray-500 italic">No audio available for this lesson</div>
            )}
            
            {/* Transcription Section */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">Transcription</h3>
              <ScrollArea className="h-48 rounded-md border p-4 bg-white">
                {classData.transcription ? (
                  <div 
                    className="prose prose-gray max-w-none"
                    dangerouslySetInnerHTML={{ 
                      __html: parseContent(classData.transcription)
                    }} 
                  />
                ) : (
                  <p className="text-gray-500 italic">No transcription available for this lesson</p>
                )}
              </ScrollArea>
            </div>
          </div>

          {/* Research Section */}
          <div className="bg-gray-50 rounded-2xl p-8 space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900">Research</h2>
            <ScrollArea className="h-[calc(100vh-600px)] rounded-md border p-8 bg-white">
              <div className="prose prose-gray max-w-none">
                {classData.research ? (
                  <div 
                    dangerouslySetInnerHTML={{ 
                      __html: parseContent(classData.research)
                    }} 
                  />
                ) : (
                  <p className="text-gray-500 italic">No research content available for this lesson</p>
                )}
              </div>
            </ScrollArea>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Class;