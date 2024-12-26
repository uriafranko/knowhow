import { ScrollArea } from '@/components/ui/scroll-area';
import rehypeHighlight from 'rehype-highlight';
import { Card } from '@/components/ui/card';
import Markdown from '../general/Markdown';
import { BookOpen, ChevronDown } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { useState } from 'react';

interface ResearchSectionProps {
  research: string | null;
}

const ResearchSection = ({ research }: ResearchSectionProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Card className="p-6 space-y-4 border border-slate-200 rounded-lg overflow-hidden bg-white/50 backdrop-blur-sm shadow-lg shadow-slate-100/20">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger className="flex items-center justify-between w-full">
          <div className="flex items-center gap-3">
            <BookOpen className="h-6 w-6 text-slate-500" />
            <h2 className="text-2xl font-semibold text-slate-900">Research</h2>
          </div>
          <ChevronDown className={`h-5 w-5 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`} />
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-4">
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
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};

export default ResearchSection;