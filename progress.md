# Progress

- Initialized project memory files (task_plan.md, findings.md, progress.md, gemini.md) as per Protocol 0.
- Reviewed `landing-form.tsx` to understand the current form structure and submission process.
- Updated `gemini.md` with data schema and answers to Discovery questions.
- Generated N8N Workflow JSON (`.tmp/n8n_consultation_workflow.json`) to handle Webhook -> Sheets -> Gemini -> Gmail.
- Updated `landing-form.tsx` to:
  - Automatically fetch the user's location via `ipapi`.
  - Compile the new rich payload (Name, Email, Message, Timestamp, Timezone, Page Source, Location).
  - Submit the payload via `fetch` to `NEXT_PUBLIC_N8N_WEBHOOK_URL` in replacement of Firebase.

## Bug Fix: Mobile / Cross-Device Form Failure [2026-04-05]
### Root Cause
1. **`.env.local` was empty** — `NEXT_PUBLIC_N8N_WEBHOOK_URL` was never written. Every device was hitting the `toast.error("Webhook not configured.")` fallback immediately after submission.
2. **`isMobile` state split** — The component rendered two duplicate form trees (one for mobile, one for desktop) using `window.innerWidth`. On mobile browsers, the `useEffect` ran after hydration, causing re-renders that could discard form state and dispatch the wrong error before the request completed.

### Fix Applied
- Removed the entire `isMobile` split. Unified into a single responsive form using CSS (`grid-cols-1 sm:grid-cols-2`).
- Added `AbortSignal.timeout()` on both the IP fetch and the webhook fetch to prevent mobile network hangs.
- Added `noValidate` on the form to prevent browser native validation conflicts on mobile.
- Added `autoComplete` attributes to name and email inputs for better mobile UX.
- Added clearer console.error logging for the missing env var case.

### Action Required
The user must provide the N8N webhook URL and it must be set as:
- **Local dev**: `NEXT_PUBLIC_N8N_WEBHOOK_URL=<url>` in `.env.local`
- **Production (Vercel)**: Same key set in Project → Settings → Environment Variables
