import { marked } from 'marked';

export const parseContent = (content: string | null) => {
  if (!content) return '';
  // First replace escaped newlines with actual newlines
  const unescapedContent = content.replace(/\\n/g, '\n');
  // Then parse the markdown
  return marked(unescapedContent);
};