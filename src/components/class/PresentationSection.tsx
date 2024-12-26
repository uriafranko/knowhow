import { Card } from '@/components/ui/card';
import { Presentation } from 'lucide-react';
import Markdown from '../general/Markdown';

interface PresentationSectionProps {
  presentation: string | null;
}

const PresentationSection = ({ presentation }: PresentationSectionProps) => {
  return (
    <Card className="p-6 space-y-4 border border-slate-200 rounded-lg overflow-hidden bg-white/50 backdrop-blur-sm shadow-lg shadow-slate-100/20">
      <div className="flex items-center gap-3">
        <Presentation className="h-6 w-6 text-slate-500" />
        <h2 className="text-2xl font-semibold text-slate-900">Presentation</h2>
      </div>
      <div className="rounded-lg border border-slate-200 p-6 bg-white/80">
        <div className="prose max-w-none prose-headings:text-slate-900 prose-p:text-slate-700">
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

export default PresentationSection;