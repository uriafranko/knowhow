import { ScrollArea } from '@/components/ui/scroll-area';
import { parseContent } from '@/utils/contentParser';
import { Card } from '@/components/ui/card';
import { Headphones } from 'lucide-react';

interface AudioLessonProps {
  audioUrl: string | null;
  transcription: string | null;
}

const AudioLesson = ({ audioUrl, transcription }: AudioLessonProps) => {
  return (
    <Card className="p-6 space-y-6 border border-slate-200 rounded-lg overflow-hidden bg-white/50 backdrop-blur-sm shadow-lg shadow-slate-100/20">
      <div className="flex items-center gap-3">
        <Headphones className="h-6 w-6 text-slate-500" />
        <h2 className="text-2xl font-semibold text-slate-900">Audio Lesson</h2>
      </div>

      <div className="space-y-6">
        {audioUrl ? (
          <div className="bg-white p-4 rounded-lg shadow-inner">
            <audio
              controls
              className="w-full focus:outline-none focus:ring-2 focus:ring-slate-500/20 rounded"
              src={audioUrl}
            >
              Your browser does not support the audio element.
            </audio>
          </div>
        ) : (
          <div className="text-slate-500/70 italic text-center py-4">
            No audio available for this lesson
          </div>
        )}

        <div className="space-y-3">
          <h3 className="text-lg font-medium text-slate-900">Transcription</h3>
          <ScrollArea className="h-[24rem] rounded-lg border border-slate-200 p-6 bg-white/80">
            {transcription ? (
              <div
                className="prose max-w-none prose-headings:text-slate-900 prose-p:text-slate-700"
                dangerouslySetInnerHTML={{
                  __html: parseContent(transcription),
                }}
              />
            ) : (
              <p className="text-slate-500/70 italic text-center">
                No transcription available for this lesson
              </p>
            )}
          </ScrollArea>
        </div>
      </div>
    </Card>
  );
};

export default AudioLesson;