import { ScrollArea } from "@/components/ui/scroll-area";
import { parseContent } from "@/utils/contentParser";

interface ResearchSectionProps {
  research: string | null;
}

const ResearchSection = ({ research }: ResearchSectionProps) => {
  return (
    <div className="bg-gray-50 rounded-2xl p-8 space-y-6">
      <h2 className="text-2xl font-semibold text-gray-900">Research</h2>
      <ScrollArea className="h-[calc(100vh-600px)] rounded-md border p-8 bg-white">
        <div className="prose prose-gray max-w-none">
          {research ? (
            <div 
              dangerouslySetInnerHTML={{ 
                __html: parseContent(research)
              }} 
            />
          ) : (
            <p className="text-gray-500 italic">No research content available for this lesson</p>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

export default ResearchSection;