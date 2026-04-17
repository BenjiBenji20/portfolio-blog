import { useState, useEffect, useRef } from "react";
import { ChatInput } from "../atoms/ChatInput";
import { ChatMessage } from "../atoms/ChatMessage";
import { ChatTypingIndicator } from "../atoms/ChatTypingIndicator";
import { type ChatMessageSchema, validateIntelliChatQuery } from "../../../types/intellichat";
import { X } from "lucide-react";

const SESSION_KEY = "intellichat_session_messages";

const getConversationId = () => {
    let cid = sessionStorage.getItem("intellichat_cid");
    if (!cid) {
        cid = "client_" + Date.now().toString() + "_" + Math.random().toString(36).substring(2, 11);
        sessionStorage.setItem("intellichat_cid", cid);
    }
    return cid;
};

// Added onClose prop
export function IntelliChatWindow({ onClose }: { onClose: () => void }) {
    const [messages, setMessages] = useState<ChatMessageSchema[]>(() => {
        const saved = sessionStorage.getItem(SESSION_KEY);
        if (saved) {
            const parsed = JSON.parse(saved);
            if (parsed && parsed.length > 0) return parsed;
        }
        return [
            {
                id: "initial_greeting",
                role: "assistant",
                content: "Hello, how can I help you?",
                timestamp: Date.now()
            }
        ];
    });

    const [inputValue, setInputValue] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [serverStatus, setServerStatus] = useState<string | null>(null);
    const [streamingContent, setStreamingContent] = useState("");
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isTyping, streamingContent]);

    const handleSendMessage = async () => {
        const { isValid, error } = validateIntelliChatQuery(inputValue);
        if (!isValid) {
            setErrorMsg(error || "Invalid input");
            setTimeout(() => setErrorMsg(null), 3000);
            return;
        }

        const queryText = inputValue.trim();
        const cid = getConversationId();

        const newUserMsg: ChatMessageSchema = {
            id: Date.now().toString() + "_user",
            role: "user",
            content: queryText,
            timestamp: Date.now()
        };

        const updatedMessages = [...messages, newUserMsg];
        setMessages(updatedMessages);
        setInputValue("");
        setIsTyping(true);
        setServerStatus(null);
        setStreamingContent("");
        setErrorMsg(null);

        try {
            const response = await fetch("/api/intellichat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ query: queryText, conversation_id: cid, stream: true })
            });

            if (!response.ok) {
                let errText = "Failed to communicate with IntelliChat server.";
                try {
                    const errPayload = await response.json();
                    if (errPayload.detail) {
                        errText = typeof errPayload.detail === 'string' ? errPayload.detail : JSON.stringify(errPayload.detail);
                    } else if (errPayload.error) {
                        errText = errPayload.error;
                    }
                } catch { }
                throw new Error(errText);
            }

            const reader = response.body?.getReader();
            if (!reader) throw new Error("Stream not supported.");

            const decoder = new TextDecoder();
            let buffer = "";
            let assembledChunk = "";

            while (true) {
                const { value, done } = await reader.read();
                if (done) break;

                buffer += decoder.decode(value, { stream: true });
                let lines = buffer.split('\n');
                buffer = lines.pop() || "";

                for (let line of lines) {
                    if (line.startsWith('data: ')) {
                        const dataStr = line.replace('data: ', '').trim();
                        if (!dataStr) continue;

                        if (dataStr.startsWith('[DONE] ')) {
                            const jsonStr = dataStr.replace('[DONE] ', '');
                            try {
                                const finalData = JSON.parse(jsonStr);
                                const finalContent = finalData.assistant?.content || assembledChunk;

                                const finalMsg: ChatMessageSchema = {
                                    id: Date.now().toString() + "_assistant",
                                    role: "assistant",
                                    content: finalContent,
                                    timestamp: Date.now()
                                };

                                setMessages(prev => {
                                    const nextState = [...prev, finalMsg];
                                    sessionStorage.setItem(SESSION_KEY, JSON.stringify(nextState));
                                    return nextState;
                                });

                            } catch (e) {
                                console.error("Final Schema Parsing Error", e);
                            }
                        } else {
                            try {
                                const parsed = JSON.parse(dataStr);
                                if (parsed.status) {
                                    setServerStatus(parsed.status);
                                } else if (parsed.chunk) {
                                    assembledChunk += parsed.chunk;
                                    setStreamingContent(assembledChunk);
                                    setIsTyping(false);
                                }
                            } catch (e) {
                                console.error("Chunk parsing error", e);
                            }
                        }
                    }
                }
            }

        } catch (error: any) {
            setErrorMsg(error.message || "Something went wrong.");
            setMessages(prev => {
                const nextState = [...prev, {
                    id: Date.now().toString() + "_error",
                    role: "assistant" as const,
                    content: `**Error**: ${error.message || "Failed to reach servers."}`,
                    timestamp: Date.now()
                }];
                return nextState;
            });
        } finally {
            setIsTyping(false);
            setServerStatus(null);
            setStreamingContent("");
        }
    };

    return (
        <div className="w-full h-full sm:w-[380px] sm:h-[550px] sm:max-h-[calc(100vh-160px)] flex flex-col bg-card shadow-2xl overflow-hidden rounded-2xl border border-border">

            {/* Header */}
            <div className="p-4 bg-cyan-500 dark:bg-card border-b border-cyan-600 dark:border-border flex justify-between items-start pt-5">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-transparent flex items-center justify-center shrink-0">
                        <img
                            src="/chatbot.png"
                            alt="IntelliChat Bot"
                            className="w-full h-full rounded-full object-cover"
                        />
                    </div>
                    <div>
                        <h3 className="font-bold text-white dark:text-primary tracking-tight">
                            {import.meta.env.VITE_INTELLICHAT_BOT_NAME || "IntelliChat AI"}
                        </h3>
                    </div>
                </div>

                <button
                    onClick={onClose}
                    className="p-1.5 text-zinc-900 dark:text-secondary hover:bg-zinc-900/10 dark:hover:bg-background rounded-md transition-colors"
                    aria-label="Close chat"
                >
                    <X className="w-5 h-5" />
                </button>
            </div>

            {/* Chat Body: Changed bg-zinc-950 to bg-background */}
            <div className="flex-1 overflow-y-auto p-4 custom-scrollbar bg-background">

                {messages.map((msg) => (
                    <ChatMessage key={msg.id} role={msg.role} content={msg.content} />
                ))}

                {isTyping && !streamingContent && (
                    <ChatTypingIndicator status={serverStatus} />
                )}

                {streamingContent && (
                    <ChatMessage role="assistant" content={streamingContent + " ▍"} />
                )}

                {errorMsg && !streamingContent && (
                    <div className="text-[13px] text-red-500 bg-red-500/10 border border-red-500/20 rounded-md py-2 text-center mb-2 px-4 shadow-sm">
                        {errorMsg}
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-cyan-500 dark:bg-card border-t border-cyan-600 dark:border-border">
                <ChatInput
                    value={inputValue}
                    onChange={setInputValue}
                    onSubmit={handleSendMessage}
                    disabled={isTyping || !!streamingContent}
                />
                <div className="text-center mt-2.5">
                    <span className="text-[10px] text-white dark:text-tertiary uppercase tracking-widest font-bold dark:font-semibold">
                        Powered by IntelliChat AI
                    </span>
                </div>
            </div>
        </div>
    );
}