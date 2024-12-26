import { FC } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import 'github-markdown-css/github-markdown.css';

interface MarkdownProps {
  children: string;
  className?: string;
  rehypePlugins?: unknown[];
}

const Markdown: FC<MarkdownProps> = ({ children, className = '', rehypePlugins = [] }) => {
  // Replace escaped newlines with actual newlines
  const processedContent = children.replace(/\\n/g, '\n');

  return (
    <ReactMarkdown
      className={`markdown-body ${className} text-gray-700`}
      rehypePlugins={rehypePlugins}
      remarkPlugins={[remarkGfm]}
    >
      {processedContent}
    </ReactMarkdown>
  );
};

export default Markdown;
