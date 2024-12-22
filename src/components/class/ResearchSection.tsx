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
    <AccordionItem
      value="research"
      className="border border-slate-200 rounded-lg overflow-hidden bg-white/50 backdrop-blur-sm shadow-lg shadow-slate-100/20"
    >
      <AccordionTrigger className="px-6 py-4 text-2xl font-semibold hover:bg-slate-50/50 transition-colors">
        <div className="flex items-center gap-3">
          <BookOpen className="h-6 w-6 text-slate-500" />
          <span className="text-slate-900">Research</span>
        </div>
      </AccordionTrigger>
      <AccordionContent className="px-6 pb-6">
        <ScrollArea className="rounded-lg border border-slate-200 p-6 bg-white/80 h-[34rem]">
          <div className="prose max-w-none prose-headings:text-slate-900 prose-p:text-slate-700">
            {research ? (
              <Markdown className="bg-white" rehypePlugins={[rehypeHighlight]}>
                {research}
              </Markdown>
            ) : (
              <p className="text-slate-500/70 italic text-center">
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
