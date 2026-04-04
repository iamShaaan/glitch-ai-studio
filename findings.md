# Findings

- The user wants to replace the Firebase backend for consultation bookings with an N8N automation.
- The form currently captures `name`, `email`, and `message` and sends them to `submitConsultationBooking` from `@/lib/firestore`.
- The new flow will collect data, send it to a Google Sheet, use Gemini for generating a custom email, and send the email to the user.
