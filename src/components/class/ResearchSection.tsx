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
    <AccordionItem value="research" className="border border-purple-100 rounded-lg overflow-hidden bg-white/50 backdrop-blur-sm shadow-lg shadow-purple-100/20">
      <AccordionTrigger className="px-6 py-4 text-2xl font-semibold hover:bg-purple-50/50 transition-colors">
        <div className="flex items-center gap-3">
          <BookOpen className="h-6 w-6 text-purple-500" />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">
            Research
          </span>
        </div>
      </AccordionTrigger>
      <AccordionContent className="px-6 pb-6">
        <ScrollArea className="rounded-lg border border-purple-100 p-6 bg-white/80 h-[34rem]">
          <div className="prose prose-purple max-w-none prose-headings:text-purple-900 prose-p:text-purple-800/90">
            {research ? (
              <Markdown rehypePlugins={[rehypeHighlight]}>{research}</Markdown>
            ) : (
              <p className="text-purple-500/70 italic text-center">
                No research content available for this lesson
              </p>
            )}
          </div>
        </ScrollArea>
      </AccordionContent>
    </AccordionItem>
  );
};

export default ResearchSection;