import { ScrollArea } from '@/components/ui/scroll-area';
import rehypeHighlight from 'rehype-highlight';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Markdown from '../general/Markdown';

interface ResearchSectionProps {
  research: string | null;
}

const ResearchSection = ({ research }: ResearchSectionProps) => {
  return (
    <Accordion type="single" className="w-full">
      <AccordionItem value="research">
        <AccordionTrigger className="text-2xl font-semibold text-gray-900">
          Research
        </AccordionTrigger>
        <AccordionContent>
          <ScrollArea className="h-[calc(100vh-600px)] rounded-md border p-8 bg-white">
            <div className="prose prose-gray max-w-none">
              {research ? (
                <Markdown rehypePlugins={[rehypeHighlight]}>{research}</Markdown>
              ) : (
                <p className="text-gray-500 italic">
                  No research content available for this lesson
                </p>
              )}
            </div>
          </ScrollArea>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default ResearchSection;