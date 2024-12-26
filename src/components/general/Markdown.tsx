import { FC } from 'react';
import { Marpit } from '@marp-team/marpit';
import 'github-markdown-css/github-markdown.css';

interface MarkdownProps {
  children: string;
  className?: string;
  rehypePlugins?: unknown[];
}

const Markdown: FC<MarkdownProps> = ({ children, className = '', rehypePlugins = [] }) => {
  // Initialize Marpit
  const marpit = new Marpit({
    markdown: {
      breaks: true,
    },
    container: true,
  });

  // Add some basic theme CSS
  marpit.themeSet.default = marpit.themeSet.add('default').css`
    section {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      padding: 2rem;
      background-color: white;
    }
    h1 {
      color: #1e293b;
      font-size: 2.25rem;
      margin-bottom: 1rem;
    }
    h2 {
      color: #334155;
      font-size: 1.875rem;
      margin-bottom: 0.875rem;
    }
    p {
      color: #475569;
      line-height: 1.625;
      margin-bottom: 1rem;
    }
    ul, ol {
      margin-left: 1.5rem;
      margin-bottom: 1rem;
    }
    li {
      margin-bottom: 0.5rem;
    }
  `;

  // Process the markdown content
  const { html, css } = marpit.render(children || '');

  return (
    <div className={`markdown-body ${className}`}>
      <style>{css}</style>
      <div 
        className="prose prose-slate max-w-none"
        dangerouslySetInnerHTML={{ __html: html }} 
      />
    </div>
  );
};

export default Markdown;