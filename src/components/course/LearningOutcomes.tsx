import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Target, ListChecks } from 'lucide-react';
import Markdown from '@/components/general/Markdown';

interface LearningOutcomesProps {
  outcome: string;
}

const LearningOutcomes = ({ outcome }: LearningOutcomesProps) => {
  if (!outcome) return null;

  return (
    <Card className="mb-8 border-none shadow-lg bg-white/50 backdrop-blur">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          <Target className="h-6 w-6 text-blue-500" />
          Learning Outcomes
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-start gap-3 group">
            <ListChecks className="h-5 w-5 text-green-500 mt-1 flex-shrink-0 group-hover:scale-110 transition-transform" />
            <Markdown className="text-gray-700 bg-white">{outcome}</Markdown>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LearningOutcomes;