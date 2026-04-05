Paste the JavaScript code below into an N8N Code node placed between the Gemini node and the Gmail node.
It will parse the raw Gemini output text, strip the markdown code fence, and return two clean fields: subject and body.

// Get the raw output string from the Gemini node
const rawOutput = $input.first().json.output;

// Strip the markdown code fence wrapper if present
// Gemini often wraps JSON in ```json ... ```
const cleaned = rawOutput
  .replace(/^```json\s*/i, '')
  .replace(/^```\s*/i, '')
  .replace(/```\s*$/i, '')
  .trim();

// Parse the cleaned string into a real JSON object
const parsed = JSON.parse(cleaned);

// Return the two fields as separate output schema keys
return [
  {
    json: {
      subject: parsed.subject,
      body: parsed.body
    }
  }
];
