import { Card } from '@/components/ui/card';
import { Headphones } from 'lucide-react';
import Markdown from '../general/Markdown';

interface AudioLessonProps {
  audioUrl: string | null;
  presentation: string | null;
}

const AudioLesson = ({ audioUrl, presentation }: AudioLessonProps) => {
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

        <div className="rounded-lg border border-slate-200 p-6 bg-white/80">
          {presentation ? (
            <Markdown>{presentation}</Markdown>
          ) : (
            <p className="text-slate-500/70 italic text-center">
              No presentation content available for this lesson
            </p>
          )}
        </div>
      </div>
    </Card>
  );
};

export default AudioLesson;