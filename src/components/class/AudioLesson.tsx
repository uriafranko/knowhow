import { ScrollArea } from '@/components/ui/scroll-area';
import { parseContent } from '@/utils/contentParser';
import { AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Headphones } from 'lucide-react';

interface AudioLessonProps {
  audioUrl: string | null;
  transcription: string | null;
}

const AudioLesson = ({ audioUrl, transcription }: AudioLessonProps) => {
  return (
    <AccordionItem value="audio-lesson" className="border border-purple-100 rounded-lg overflow-hidden bg-white/50 backdrop-blur-sm shadow-lg shadow-purple-100/20">
      <AccordionTrigger className="px-6 py-4 text-2xl font-semibold hover:bg-purple-50/50 transition-colors">
        <div className="flex items-center gap-3">
          <Headphones className="h-6 w-6 text-purple-500" />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">
            Audio Lesson
          </span>
        </div>
      </AccordionTrigger>
      <AccordionContent className="px-6 pb-6">
        <div className="space-y-6">
          {audioUrl ? (
            <div className="bg-white p-4 rounded-lg shadow-inner">
              <audio
                controls
                className="w-full focus:outline-none focus:ring-2 focus:ring-purple-500/20 rounded"
                src={audioUrl}
              >
                Your browser does not support the audio element.
              </audio>
            </div>
          ) : (
            <div className="text-purple-500/70 italic text-center py-4">
              No audio available for this lesson
            </div>
          )}

          <div className="space-y-3">
            <h3 className="text-lg font-medium bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">
              Transcription
            </h3>
            <ScrollArea className="h-[24rem] rounded-lg border border-purple-100 p-6 bg-white/80">
              {transcription ? (
                <div
                  className="prose prose-purple max-w-none prose-headings:text-purple-900 prose-p:text-purple-800/90"
                  dangerouslySetInnerHTML={{
                    __html: parseContent(transcription),
                  }}
                />
              ) : (
                <p className="text-purple-500/70 italic text-center">
                  No transcription available for this lesson
                </p>
              )}
            </ScrollArea>
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};

export default AudioLesson;