import React from "react";
import { Send, Loader2 } from "lucide-react";

interface ChatInputProps {
    value: string;
    onChange: (val: string) => void;
    onSubmit: () => void;
    disabled: boolean;
}

export function ChatInput({ value, onChange, onSubmit, disabled }: ChatInputProps) {
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            if (!disabled && value.trim()) {
                onSubmit();
            }
        }
    };

    return (
        <div className="relative w-full">
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={disabled}
                placeholder={disabled ? "AI is thinking..." : "Pass your message to IntelliChat..."}
                className="w-full bg-background border border-border text-primary placeholder:text-tertiary rounded-full pl-5 pr-12 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-inner"
            />
            <button
                onClick={onSubmit}
                disabled={disabled || !value.trim()}
                className="absolute right-1.5 top-1/2 -translate-y-1/2 w-8 h-8 bg-cyan-500 rounded-full flex items-center justify-center disabled:opacity-50 transition-all hover:bg-cyan-600 outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-cyan-500"
                aria-label="Send Message"
            >
                {disabled ? (
                    <Loader2 className="w-4 h-4 text-zinc-950 animate-spin" />
                ) : (
                    <Send className="w-4 h-4 text-zinc-950 ml-0.5" />
                )}
            </button>
        </div>
    );
}
