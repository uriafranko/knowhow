import { FC } from 'react';
import { Deck, Slide } from 'mdx-deck';
import { MDXProvider } from '@mdx-js/react';
import remarkGfm from 'remark-gfm';
import ReactMarkdown from 'react-markdown';

interface MarkdownProps {
  children: string;
  className?: string;
  rehypePlugins?: unknown[];
}

const Markdown: FC<MarkdownProps> = ({ children, className = '', rehypePlugins = [] }) => {
  // Check if content contains slide separators (---)
  const hasSlides = children.includes('---');

  if (hasSlides) {
    const slides = children.split('---').map(slide => slide.trim());
    
    return (
      <div className={`markdown-deck ${className}`}>
        <Deck>
          {slides.map((slideContent, index) => (
            <Slide key={index}>
              <div className="p-8">
                <ReactMarkdown
                  className="prose prose-slate max-w-none"
                  rehypePlugins={rehypePlugins}
                  remarkPlugins={[remarkGfm]}
                >
                  {slideContent}
                </ReactMarkdown>
              </div>
            </Slide>
          ))}
        </Deck>
      </div>
    );
  }

  // If no slides, render as regular markdown
  return (
    <ReactMarkdown
      className={`markdown-body ${className} prose prose-slate max-w-none`}
      rehypePlugins={rehypePlugins}
      remarkPlugins={[remarkGfm]}
    >
      {children}
    </ReactMarkdown>
  );
};

export default Markdown;