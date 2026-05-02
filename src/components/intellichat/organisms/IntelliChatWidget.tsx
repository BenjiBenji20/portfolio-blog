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
        <div className="fixed bottom-0 left-0 right-0 sm:left-auto z-40 flex flex-col items-end pointer-events-none sm:p-6 sm:pb-[24px] sm:pr-[30px] lg:pb-[24px] lg:pr-[40px]">
            <div
                className={`fixed sm:relative top-20 bottom-6 left-4 right-4 sm:top-auto sm:bottom-auto sm:left-auto sm:right-auto sm:w-auto transition-all duration-300 transform origin-bottom sm:origin-bottom-right flex flex-col justify-end ${isOpen
                    ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto'
                    : 'opacity-0 translate-y-8 scale-95 pointer-events-none'
                    }`}
            >
                {isOpen && <IntelliChatWindow onClose={() => setIsOpen(false)} />}
            </div>

            <div
                className={`fixed bottom-6 right-6 transition-all duration-300 ${isOpen ? 'opacity-0 scale-75 pointer-events-none' : 'opacity-100 scale-100 pointer-events-auto'
                    }`}
            >
                <ChatbotToggle isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
            </div>
        </div>
    );
}