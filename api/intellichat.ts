export const config = {
    runtime: 'edge'
};

export default async function handler(req: Request) {
    // 1. GET Request: Used by frontend to determine if the widget should be rendered
    if (req.method === 'GET') {
        const isConfigured = !!(
            process.env.INTELLICHAT_PUBLIC_URL &&
            process.env.INTELLICHAT_SECRET_KEY &&
            process.env.INTELLICHAT_PROJECT_ID &&
            process.env.INTELLICHAT_CHATBOT_ID
        );
        
        return new Response(JSON.stringify({ configured: isConfigured }), {
            status: 200,
            headers: { "Content-Type": "application/json" }
        });
    }

    // 2. POST Request: Proxy chat payload securely to InteliChat backend
    if (req.method === 'POST') {
        try {
            const { query, conversation_id, stream } = await req.json();

            const baseUrl = process.env.INTELLICHAT_PUBLIC_URL?.replace(/\/$/, "");
            const projectId = process.env.INTELLICHAT_PROJECT_ID;
            const chatbotId = process.env.INTELLICHAT_CHATBOT_ID;
            const authHeader = process.env.INTELLICHAT_AUTH_HEADER || "Authorization";
            const secretKey = process.env.INTELLICHAT_SECRET_KEY || "";

            if (!baseUrl || !projectId || !chatbotId || !secretKey) {
                return new Response(JSON.stringify({ error: "IntelliChat Proxy Configuration Missing" }), {
                    status: 500,
                    headers: { "Content-Type": "application/json" }
                });
            }

            // NOTE: Adjusted to match user's explicit fetch requirement. 
            // If the backend router requires /api/v1/chat/... just modify this targetEndpoint!
            const targetEndpoint = `${baseUrl}/${projectId}/${chatbotId}`;

            const upstreamResponse = await fetch(targetEndpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    [authHeader]: secretKey
                },
                body: JSON.stringify({ query, conversation_id, stream })
            });

            if (!upstreamResponse.ok) {
                const errorText = await upstreamResponse.text();
                return new Response(errorText, { status: upstreamResponse.status });
            }

            // Return the stream back to the Vercel edge client natively
            return new Response(upstreamResponse.body, {
                status: 200,
                headers: {
                    "Content-Type": "text/event-stream",
                    "Cache-Control": "no-cache",
                    "Connection": "keep-alive"
                }
            });
            
        } catch (error: any) {
            return new Response(JSON.stringify({ error: error.message || "Internal Server Error" }), {
                status: 500,
                headers: { "Content-Type": "application/json" }
            });
        }
    }

    return new Response("Method not allowed", { status: 405 });
}
