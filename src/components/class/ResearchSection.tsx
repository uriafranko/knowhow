import { ScrollArea } from '@/components/ui/scroll-area';
import rehypeHighlight from 'rehype-highlight';
import { AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Markdown from '../general/Markdown';
import { BookOpen } from 'lucide-react';

interface ResearchSectionProps {
  research: string | null;
}

const ResearchSection = ({ research }: ResearchSectionProps) => {
  return (
    <AccordionItem value="research">
      <AccordionTrigger className="text-2xl font-semibold text-gray-900">
        <div className="flex items-center gap-2">
          <BookOpen className="h-6 w-6" />
          Research
        </div>
      </AccordionTrigger>
      <AccordionContent>
        <ScrollArea className="rounded-md border p-3 bg-white h-[34rem]">
          <div className="prose prose-gray max-w-none">
            {research ? (
              <Markdown className="bg-white" rehypePlugins={[rehypeHighlight]}>
                {research}
              </Markdown>
            ) : (
              <p className="text-gray-500 italic">No research content available for this lesson</p>
            )}
          </div>
        </ScrollArea>
      </AccordionContent>
    </AccordionItem>
  );
};

export default ResearchSection;