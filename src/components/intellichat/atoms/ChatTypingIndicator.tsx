
interface ChatTypingIndicatorProps {
    status: string | null;
}

export function ChatTypingIndicator({ status }: ChatTypingIndicatorProps) {
    return (
        <div className="flex items-start gap-3 min-w-0 mb-5">
            <div className="w-8 h-8 rounded-full bg-cyan-500/20 text-cyan-500 flex items-center justify-center shrink-0 mt-0.5">
                <img
                    src="/chatbot.png"
                    alt="IntelliChat Bot"
                    className="w-5 h-5 object-contain"
                />
            </div>
            <div className="flex-1 space-y-2">
                <div className="bg-zinc-900 px-4 py-3.5 rounded-2xl rounded-tl-sm w-fit max-w-[90%] flex flex-col gap-2">
                    {status && (
                        <span className="text-[11px] font-semibold text-cyan-500/80 animate-pulse uppercase tracking-wider">
                            {status}
                        </span>
                    )}
                    <div className="flex items-center gap-1.5 h-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-zinc-500 animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-1.5 h-1.5 rounded-full bg-zinc-500 animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-1.5 h-1.5 rounded-full bg-zinc-500 animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                </div>
            </div>
        </div>
    );
}
