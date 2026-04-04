# Task Plan

## Phase 1: Blueprint
- [x] Received user request for N8N automation to handle consultation bookings.
- [x] Ask Discovery Questions to clarify integrations (N8N, Google Sheets, Gmail/Email provider, Gemini API).
- [x] Define JSON Data Schema based on form inputs (Name, Email, Message, Contextual Meta).
- [ ] Get Blueprint approval.

## Phase 2: Link
- [ ] Obtain or create an N8N Webhook URL (`https://your-n8n-domain/webhook/consultation` or similar).

## Phase 3: Architect
- [ ] Create the N8N Workflow (Webhook -> Google Sheets -> Gemini -> Gmail).
- [ ] Update frontend (`landing-form.tsx`) to post to N8N webhook instead of Firebase.

## Phase 4: Stylize
- [ ] Test the email copy and Google Sheets integration internally.
- [ ] Verify UI success/error states still function smoothly.

## Phase 5: Trigger
- [ ] Deploy the frontend changes to Vercel.
- [ ] Activate the N8N workflow in production.
