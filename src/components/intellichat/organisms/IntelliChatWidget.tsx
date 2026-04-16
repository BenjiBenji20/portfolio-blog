import { useState, useEffect } from "react";
import { ChatbotToggle } from "../atoms/ChatbotToggle";
import { IntelliChatWindow } from "./IntelliChatWindow";

export function IntelliChatWidget() {
    const [isConfigured, setIsConfigured] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [isLoadingConfig, setIsLoadingConfig] = useState(true);

    useEffect(() => {
        const checkConfig = async () => {
            try {
                const response = await fetch("/api/intellichat");
                const contentType = response.headers.get("content-type");

                if (response.ok && contentType && contentType.includes("application/json")) {
                    const data = await response.json();
                    setIsConfigured(data.configured === true);
                } else {
                    setIsConfigured(false);
                }
            } catch (err) {
                setIsConfigured(false);
            } finally {
                setIsLoadingConfig(false);
            }
        };
        checkConfig();
    }, []);

    if (isLoadingConfig || !isConfigured) return null;

    return (
        <div className="fixed bottom-0 right-0 z-50 flex flex-col items-end pointer-events-none p-4 lg:p-6 pb-[90px] pr-[30px] lg:pb-[100px] lg:pr-[40px]">
            {/* The Chat Window */}
            <div
                className={`transition-all duration-300 transform origin-bottom-right pointer-events-auto ${isOpen
                        ? 'opacity-100 translate-y-0 scale-100'
                        : 'opacity-0 translate-y-8 scale-95 pointer-events-none'
                    }`}
            >
                {/* Passed onClose to allow header to close it */}
                {isOpen && <IntelliChatWindow onClose={() => setIsOpen(false)} />}
            </div>

            {/* The Floating Toggle (Now hides when window is open!) */}
            <div
                className={`fixed bottom-6 right-6 pointer-events-auto transition-all duration-300 ${isOpen ? 'opacity-0 scale-75 pointer-events-none' : 'opacity-100 scale-100'
                    }`}
            >
                <ChatbotToggle isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
            </div>
        </div>
    );
}