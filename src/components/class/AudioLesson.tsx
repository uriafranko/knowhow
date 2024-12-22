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
    <AccordionItem value="audio-lesson">
      <AccordionTrigger className="text-2xl font-semibold text-gray-900">
        <div className="flex items-center gap-2">
          <Headphones className="h-6 w-6" />
          Audio Lesson
        </div>
      </AccordionTrigger>
      <AccordionContent>
        <div className="space-y-3">
          {audioUrl ? (
            <audio controls className="w-full" src={audioUrl}>
              Your browser does not support the audio element.
            </audio>
          ) : (
            <div className="text-gray-500 italic">No audio available for this lesson</div>
          )}

          {/* Transcription Section */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-3">Transcription</h3>
            <ScrollArea className="h-[24rem] rounded-md border p-4 bg-white">
              {transcription ? (
                <div
                  className="prose prose-gray max-w-none"
                  dangerouslySetInnerHTML={{
                    __html: parseContent(transcription),
                  }}
                />
              ) : (
                <p className="text-gray-500 italic">No transcription available for this lesson</p>
              )}
            </ScrollArea>
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};

export default AudioLesson;