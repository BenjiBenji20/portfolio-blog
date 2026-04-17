import { memo } from "react";
import { User } from "lucide-react";
import { IntelliChatMarkdown } from "../../common/IntelliChatMarkdown";

interface ChatMessageProps {
    role: "user" | "assistant";
    content: string;
}

export const ChatMessage = memo(({ role, content }: ChatMessageProps) => {
    const isUser = role === "user";

    return (
        <div className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : ''} min-w-0 mb-5`}>

            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${isUser
                    ? 'bg-zinc-200 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400'
                    : 'bg-transparent text-cyan-600 dark:text-cyan-500'
                }`}>
                {isUser ? (
                    <User className="w-4 h-4" />
                ) : (
                    <img
                        src="/chatbot.png"
                        alt="IntelliChat Bot"
                        className="w-full h-full rounded-full object-cover"
                    />
                )}
            </div>

            <div className={`flex-1 flex flex-col space-y-1 ${isUser ? 'items-end' : 'items-start'} min-w-0 overflow-hidden`}>
                <div className={`
                    px-4 py-3 text-[14px] leading-relaxed max-w-[95%] break-words
                    ${isUser
                        ? 'bg-cyan-500 text-white dark:bg-cyan-600 dark:text-white rounded-2xl rounded-tr-sm shadow-sm'
                        : 'bg-zinc-100 text-black dark:bg-zinc-900 dark:text-zinc-50 border border-zinc-200 dark:border-zinc-800 rounded-2xl rounded-tl-sm w-fit shadow-sm'
                    }
                `}>
                    {isUser ? (
                        <p className="whitespace-pre-wrap">{content}</p>
                    ) : (
                        <IntelliChatMarkdown content={content} />
                    )}
                </div>
            </div>
        </div>
    );
});