import { NextResponse } from 'next/server';
import { getSystemConfig } from '@/lib/firestore';

export async function POST(request: Request) {
    try {
        const formData = await request.formData();

        // Fetch dynamic webhook URL from Firestore
        const config = await getSystemConfig();
        const n8nUrl = config.careerWebhookUrl;

        console.log("Forwarding application to n8n:", n8nUrl);

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
