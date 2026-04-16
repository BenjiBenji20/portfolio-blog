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
            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${isUser ? 'bg-zinc-800 text-zinc-400' : 'bg-cyan-500/20 text-cyan-500'
                }`}>
                {isUser ? (
                    <User className="w-4 h-4" />
                ) : (
                    <img
                        src="/chatbot.png"
                        alt="IntelliChat Bot"
                        className="w-5 h-5 object-contain"
                    />
                )}
            </div>
            <div className={`flex-1 flex flex-col space-y-1 ${isUser ? 'items-end' : 'items-start'} min-w-0 overflow-hidden`}>
                <div className={`
                    px-4 py-3 text-[14px] leading-relaxed max-w-[95%] break-words
                    ${isUser
                        ? 'bg-zinc-800 text-zinc-50 rounded-2xl rounded-tr-sm'
                        : 'bg-zinc-900 text-zinc-50 rounded-2xl rounded-tl-sm w-fit'
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
