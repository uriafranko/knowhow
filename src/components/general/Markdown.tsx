import { FC, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import 'github-markdown-css/github-markdown.css';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

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
  const [direction, setDirection] = useState(0);

  const goToNextPage = () => {
    if (currentPage < pages.length - 1) {
      setDirection(1);
      setCurrentPage(prev => prev + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 0) {
      setDirection(-1);
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

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden rounded-xl border bg-gradient-to-b from-purple-50 via-white to-purple-50 shadow-lg">
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] bg-grid-purple-100/[0.2]" />
        
        <div className="relative min-h-[500px] p-8">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={currentPage}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
              className={cn(
                "absolute inset-0 p-8",
                "markdown-body prose max-w-none",
                className,
                "prose-headings:text-purple-900 prose-headings:font-bold",
                "prose-p:text-slate-700 prose-p:leading-relaxed",
                "prose-a:text-purple-600 prose-a:no-underline hover:prose-a:text-purple-700",
                "prose-strong:text-purple-900 prose-strong:font-semibold",
                "prose-code:text-purple-900 prose-code:bg-purple-100 prose-code:px-1 prose-code:rounded",
                "prose-pre:bg-slate-900 prose-pre:text-slate-50",
                "prose-img:rounded-lg prose-img:shadow-md",
                "prose-blockquote:border-l-purple-300 prose-blockquote:bg-purple-50/50 prose-blockquote:py-0.5 prose-blockquote:px-4"
              )}
            >
              <ReactMarkdown
                rehypePlugins={rehypePlugins}
                remarkPlugins={[remarkGfm]}
              >
                {pages[currentPage]}
              </ReactMarkdown>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      
      <div className="flex items-center justify-between px-4">
        <Button
          variant="outline"
          onClick={goToPreviousPage}
          disabled={currentPage === 0}
          className="flex items-center gap-2 bg-white hover:bg-purple-50 hover:text-purple-600 transition-colors"
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </Button>
        
        <span className="text-sm font-medium text-slate-600 bg-white px-4 py-2 rounded-full shadow-sm border">
          {currentPage + 1} / {pages.length}
        </span>
        
        <Button
          variant="outline"
          onClick={goToNextPage}
          disabled={currentPage === pages.length - 1}
          className="flex items-center gap-2 bg-white hover:bg-purple-50 hover:text-purple-600 transition-colors"
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default Markdown;