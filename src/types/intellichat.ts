export interface IntelliChatRequestSchema {
    query: string;
    conversation_id: string;
    stream: boolean;
}

export interface ChatMessageSchema {
    id: string;
    role: "user" | "assistant";
    content: string;
    timestamp: number;
}

export const validateIntelliChatQuery = (query: unknown): { isValid: boolean; error?: string } => {
    if (typeof query !== 'string') {
        return { isValid: false, error: 'Query must be a string.' };
    }
    
    const trimmed = query.trim();
    
    if (trimmed.length < 1) {
        return { isValid: false, error: 'Query must not be empty.' };
    }
    
    if (trimmed.length > 500) {
        return { isValid: false, error: 'Query must not exceed 500 characters.' };
    }
    
    return { isValid: true };
};
