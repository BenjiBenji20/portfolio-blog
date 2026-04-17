import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { cn } from '../../utils/cn';

interface IntelliChatMarkdownProps {
    content: string;
    className?: string;
}

export function IntelliChatMarkdown({ content, className }: IntelliChatMarkdownProps) {
    return (
        <div className={cn("text-inherit leading-relaxed font-light text-[14px]", className)}>
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                    p: ({ node, ...props }) => <p className="mb-2 last:mb-0" {...props} />,
                    a: ({ node, ...props }) => <a className="text-cyan-500 hover:text-cyan-400 hover:underline transition-colors" target="_blank" rel="noopener noreferrer" {...props} />,
                    ul: ({ node, ...props }) => <ul className="list-disc pl-5 mb-2 space-y-1" {...props} />,
                    ol: ({ node, ...props }) => <ol className="list-decimal pl-5 mb-2 space-y-1" {...props} />,
                    li: ({ node, ...props }) => <li className="pl-1" {...props} />,
                    h1: ({ node, ...props }) => <h1 className="text-xl font-bold mb-3 mt-4 first:mt-0 text-zinc-50" {...props} />,
                    h2: ({ node, ...props }) => <h2 className="text-lg font-bold mb-2 mt-3 first:mt-0 text-zinc-50" {...props} />,
                    h3: ({ node, ...props }) => <h3 className="text-md font-bold mb-2 mt-2 first:mt-0 text-zinc-50" {...props} />,
                    h4: ({ node, ...props }) => <h4 className="text-base font-semibold mb-2 text-zinc-50" {...props} />,
                    strong: ({ node, ...props }) => <strong className="font-semibold text-zinc-100" {...props} />,
                    em: ({ node, ...props }) => <em className="italic" {...props} />,
                    blockquote: ({ node, ...props }) => <blockquote className="border-l-4 border-zinc-700 pl-4 py-1 italic mb-2 text-zinc-400 bg-zinc-800/50 rounded-r-sm" {...props} />,
                    hr: ({ node, ...props }) => <hr className="my-4 border-zinc-700" {...props} />,
                    code: ({ node, inline, className, ...props }: any) => {
                        return inline ? (
                            <code className="bg-zinc-800 text-cyan-400 px-1.5 py-0.5 rounded-sm text-[0.85em] font-mono break-words" {...props} />
                        ) : (
                            <div className="my-3 overflow-hidden rounded-md border border-zinc-700 bg-zinc-950">
                                <pre className="p-3 overflow-x-auto text-[0.85em] leading-relaxed text-zinc-50 custom-scrollbar">
                                    <code className="font-mono bg-transparent p-0 block min-w-full" {...props} />
                                </pre>
                            </div>
                        );
                    },
                    table: ({ node, ...props }) => (
                        <div className="overflow-x-auto mb-3 border border-zinc-700 rounded-lg">
                            <table className="min-w-full divide-y divide-zinc-700 text-sm" {...props} />
                        </div>
                    ),
                    thead: ({ node, ...props }) => <thead className="bg-zinc-800/80" {...props} />,
                    tbody: ({ node, ...props }) => <tbody className="divide-y divide-zinc-700 bg-transparent" {...props} />,
                    tr: ({ node, ...props }) => <tr className="transition-colors hover:bg-zinc-800/50" {...props} />,
                    th: ({ node, ...props }) => <th className="px-4 py-2 font-medium text-left text-zinc-300 whitespace-nowrap" {...props} />,
                    td: ({ node, ...props }) => <td className="px-4 py-2 text-zinc-400" {...props} />
                }}
            >
                {content}
            </ReactMarkdown>
        </div>
    );
}
