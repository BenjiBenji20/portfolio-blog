import { MessageSquare, X } from "lucide-react";

interface ChatbotToggleProps {
    isOpen: boolean;
    onClick: () => void;
}

export function ChatbotToggle({ isOpen, onClick }: ChatbotToggleProps) {
    return (
        <button
            onClick={onClick}
            className={`flex items-center justify-center w-14 h-14 rounded-full shadow-lg transition-all transform hover:scale-105 active:scale-95 z-50 ${
                isOpen 
                ? 'bg-zinc-800 text-zinc-400 hover:text-zinc-50 border border-zinc-700' 
                : 'bg-cyan-500 text-zinc-950 hover:bg-cyan-400'
            }`}
            aria-label="Toggle IntelliChat widget"
        >
            {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
        </button>
    );
}
