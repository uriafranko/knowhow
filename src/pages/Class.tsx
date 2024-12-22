import { useParams } from 'react-router-dom';
import PageTransition from '@/components/PageTransition';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Loader2 } from 'lucide-react';
import { useAuth } from '@/components/AuthProvider';
import AudioLesson from '@/components/class/AudioLesson';
import ResearchSection from '@/components/class/ResearchSection';
import { Accordion } from '@/components/ui/accordion';
import ClassHeader from '@/components/class/ClassHeader';

const Class = () => {
  const { id } = useParams();
  const { user } = useAuth();

  const { data: classData, isLoading: isClassLoading } = useQuery({
    queryKey: ['class', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('class')
        .select(
          `
          *,
          course:course (
            id,
            topic,
            description
          )
        `
        )
        .eq('id', id)
        .maybeSingle();

      if (error) throw error;
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
        <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 py-12 flex justify-center items-center">
          <Loader2 className="h-8 w-8 animate-spin text-slate-400" />
        </div>
      </PageTransition>
    );
  }

  if (!classData) {
    return (
      <PageTransition>
        <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 py-12">
          <div className="mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-2xl font-bold text-slate-900">Class not found</h1>
          </div>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 flex flex-col">
        <ClassHeader
          name={classData.name}
          description={classData.description}
          courseId={classData.course.id}
          courseTopic={classData.course.topic}
          isCompleted={!!completionStatus}
          classId={Number(id)}
        />

        <div className="flex-1 mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 w-full max-w-7xl">
          <Accordion
            type="single"
            defaultValue="audio-lesson"
            className="space-y-6 transition-all duration-300"
          >
            <AudioLesson audioUrl={classData.audio_url} transcription={classData.transcription} />
            <ResearchSection research={classData.research} />
          </Accordion>
        </div>
      </div>
    </PageTransition>
  );
};

export default Class;