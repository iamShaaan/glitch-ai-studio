import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const formData = await request.formData();

        // Forward to n8n Webhook
        const n8nUrl = "https://up-seo-2025.app.n8n.cloud/webhook/c58a5beb-e0fe-46fa-beff-a13184f98b1c";

        console.log("Forwarding application to n8n...");

        const response = await fetch(n8nUrl, {
            method: 'POST',
            body: formData,
            // Note: When sending FormData with fetch, do NOT set Content-Type header.
            // The browser/fetch client sets it automatically with the correct boundary.
        });

        if (!response.ok) {
            const text = await response.text();
            console.error(`n8n Error (${response.status}):`, text);
            throw new Error(`n8n webhook failed: ${response.status}`);
        }

        console.log("Successfully sent to n8n");
        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error('Webhook Proxy Error:', error);
        return NextResponse.json(
            { success: false, error: error.message || "Internal Server Error" },
            { status: 500 }
        );
    }
}
