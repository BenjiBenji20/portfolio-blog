import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { cn } from '../../utils/cn';

interface MarkdownTextProps {
  content: string;
  className?: string;
}

export function MarkdownText({ content, className }: MarkdownTextProps) {
  return (
    <div className={cn("text-secondary leading-relaxed font-light text-sm md:text-base w-full", className)}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ node, ...props }) => <h1 className="text-2xl font-bold text-primary mt-6 mb-4" {...props} />,
          h2: ({ node, ...props }) => <h2 className="text-xl font-semibold text-primary mt-5 mb-3" {...props} />,
          h3: ({ node, ...props }) => <h3 className="text-lg font-medium text-primary mt-4 mb-2" {...props} />,
          p: ({ node, ...props }) => <p className="mb-4 last:mb-0" {...props} />,
          a: ({ node, ...props }) => (
            <a 
              className="text-accent hover:text-accent-hover underline underline-offset-4 transition-colors" 
              target="_blank" 
              rel="noopener noreferrer" 
              {...props} 
            />
          ),
          ul: ({ node, ...props }) => <ul className="list-disc list-inside mb-4 space-y-1" {...props} />,
          ol: ({ node, ...props }) => <ol className="list-decimal list-inside mb-4 space-y-1" {...props} />,
          li: ({ node, ...props }) => <li className="text-secondary" {...props} />,
          blockquote: ({ node, ...props }) => (
            <blockquote className="border-l-4 border-border pl-4 py-1 mb-4 italic text-tertiary bg-card rounded-r" {...props} />
          ),
          code: ({ node, className, children, ...props }) => {
            const match = /language-(\w+)/.exec(className || '');
            const isInline = !match && !className?.includes('language-');
            return isInline ? (
              <code className="bg-card-hover text-secondary px-1.5 py-0.5 rounded text-sm font-mono" {...props}>
                {children}
              </code>
            ) : (
              <pre className="bg-card border border-border rounded-lg p-4 mb-4 overflow-x-auto">
                <code className={cn("text-sm font-mono text-secondary", className)} {...props}>
                  {children}
                </code>
              </pre>
            );
          },
          hr: ({ node, ...props }) => <hr className="border-t border-border my-6" {...props} />,
          img: ({ node, ...props }) => (
            <img className="max-w-full h-auto rounded-lg border border-border my-4" loading="lazy" {...props} />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
