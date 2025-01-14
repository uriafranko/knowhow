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

  // URL transform function to handle relative URLs properly
  const urlTransform = (url: string) => {
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url;
    }
    // Remove any trailing colons that might cause issues
    return url.replace(/:$/, '');
  };

  // If there's only one page, render normally without the presentation deck UI
  if (pages.length === 1) {
    return (
      <ReactMarkdown
        className={`markdown-body ${className} text-gray-700`}
        remarkPlugins={[remarkGfm]}
        rehypePlugins={rehypePlugins}
        urlTransform={urlTransform}
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
      <div className="relative overflow-hidden rounded-xl border bg-white shadow-lg">
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
                "prose-headings:font-display prose-headings:font-bold prose-headings:tracking-tight",
                "prose-h1:text-4xl prose-h1:leading-tight",
                "prose-h2:text-3xl prose-h2:leading-tight",
                "prose-h3:text-2xl prose-h3:leading-snug",
                "prose-p:text-slate-700 prose-p:leading-relaxed prose-p:font-normal",
                "prose-a:text-blue-600 prose-a:no-underline hover:prose-a:text-blue-800",
                "prose-strong:text-slate-900 prose-strong:font-semibold",
                "prose-code:font-mono prose-code:text-slate-900 prose-code:bg-slate-100 prose-code:px-1 prose-code:rounded",
                "prose-pre:bg-slate-900 prose-pre:text-slate-50 prose-pre:shadow-sm",
                "prose-img:rounded-lg prose-img:shadow-md",
                "prose-blockquote:border-l-slate-300 prose-blockquote:text-slate-700 prose-blockquote:italic prose-blockquote:bg-slate-50/50"
              )}
            >
              <ReactMarkdown
                rehypePlugins={rehypePlugins}
                remarkPlugins={[remarkGfm]}
                urlTransform={urlTransform}
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
          className="flex items-center gap-2 bg-white hover:bg-slate-50 hover:text-slate-900 transition-colors"
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
          className="flex items-center gap-2 bg-white hover:bg-slate-50 hover:text-slate-900 transition-colors"
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default Markdown;