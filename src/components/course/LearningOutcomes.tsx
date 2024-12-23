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
        <Markdown className="text-gray-700 bg-white">{outcome}</Markdown>
      </CardContent>
    </Card>
  );
};

export default LearningOutcomes;
