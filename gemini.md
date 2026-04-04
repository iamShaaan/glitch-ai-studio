# Project Constitution: Glitch AI Landing Page Backend

## Data Schema (Proposed)
Input Payload (from Frontend to N8N Webhook)
```json
{
  "name": "string",
  "email": "string",
  "message": "string",
  "timestamp": "string (ISO 8601)",
  "pageSource": "string (URL)",
  "timezone": "string",
  "location": "string (e.g., Country/City based on timezone/IP if available)"
}
```

Output Actions (N8N Workflow)
1. Webhook Trigger: Accepts the JSON Payload.
2. Google Sheets Node: Appends a row with [Timestamp, Name, Email, Message, Page Source, Timezone, Location].
3. Google Gemini Node: Generates a custom thank-you note based on the message.
   - **Tone**: Casual and friendly.
   - **Prompt**: Start with "Hey dude, it's great that you booked a call with us." Ask the user where we can text (WhatsApp, Telegram, Discord, Facebook, Instagram).
4. Gmail Node: Sends the generated email to the provided email address.

## Architectural Invariants
- Frontend component `landing-form.tsx` decoupled from Firebase.
- Use N8N webhook for processing and triggering.
- All backend business logic is strictly configured inside N8N.

## Maintenance Log
- **[2026-04-05] Frontend Transition to N8N**: Shifted consultation form off Firebase. Implemented dynamic IP-based location tracking via `ipapi.co`.
- **N8N Automation Required**: If the webhook shape changes or fails, verify that `landing-form.tsx` is still sending `{ name, email, message, timestamp, timezone, pageSource, location }` correctly.
- **Fail-safe**: Form catches fetching errors from IP lookup and falls back to "Unknown Location" without blocking form submission.
