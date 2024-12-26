import { FC, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import 'github-markdown-css/github-markdown.css';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface MarkdownProps {
  children: string;
  className?: string;
  rehypePlugins?: unknown[];
}

const Markdown: FC<MarkdownProps> = ({ children, className = '', rehypePlugins = [] }) => {
  // Replace escaped newlines with actual newlines
  const processedContent = children.replace(/\\n/g, '\n');
  
  // Split content into pages using horizontal rule (---) as delimiter
  const pages = processedContent.split(/\n---\n/).map(page => page.trim());
  const [currentPage, setCurrentPage] = useState(0);

  const goToNextPage = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(prev => prev - 1);
    }
  };

  // If there's only one page, render normally
  if (pages.length === 1) {
    return (
      <ReactMarkdown
        className={`markdown-body ${className} text-gray-700`}
        rehypePlugins={rehypePlugins}
        remarkPlugins={[remarkGfm]}
      >
        {processedContent}
      </ReactMarkdown>
    );
  }

  return (
    <div className="space-y-4">
      <div className={cn(
        "min-h-[400px] p-6 rounded-lg border bg-white shadow-sm",
        "markdown-body",
        className,
        "text-gray-700"
      )}>
        <ReactMarkdown
          rehypePlugins={rehypePlugins}
          remarkPlugins={[remarkGfm]}
        >
          {pages[currentPage]}
        </ReactMarkdown>
      </div>
      
      <div className="flex items-center justify-between px-4">
        <Button
          variant="outline"
          onClick={goToPreviousPage}
          disabled={currentPage === 0}
          className="flex items-center gap-2"
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </Button>
        
        <span className="text-sm text-gray-500">
          {currentPage + 1} / {pages.length}
        </span>
        
        <Button
          variant="outline"
          onClick={goToNextPage}
          disabled={currentPage === pages.length - 1}
          className="flex items-center gap-2"
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default Markdown;