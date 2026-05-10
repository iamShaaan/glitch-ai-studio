"use client";

import { GlitchText } from "@/components/ui/glitch-text";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#060d11] pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-3">
          <GlitchText text="TERMS_AND_CONDITIONS" />
        </h1>
        <p className="text-xs md:text-sm text-slate-500 mb-10">
          Last updated: May 2026
        </p>

        <div className="space-y-8 text-slate-300 text-[14px] md:text-[15px] leading-relaxed">
          <section>
            <p className="text-slate-400">
              These terms govern the working relationship between Glitch AI Studio and any client engaging our AI Avatar Content System or related services. By booking a consultation, signing an agreement, or making a payment, you accept these terms in full.
            </p>
          </section>

          <section>
            <h2 className="text-lg md:text-xl font-bold text-white mb-3 tracking-tight">
              <span className="text-[#26f7b2]">1.</span> Scope of Service
            </h2>
            <p>
              Glitch AI Studio builds AI avatars, voice clones, and automated content production systems for businesses and individual brands. Our service is delivered in three phases as described on our website. Phase 3 add-ons are optional and only available after Phases 1 and 2 are complete.
            </p>
          </section>

          <section>
            <h2 className="text-lg md:text-xl font-bold text-white mb-3 tracking-tight">
              <span className="text-[#26f7b2]">2.</span> Tool Subscriptions and Ownership
            </h2>
            <p className="mb-3">
              The two AI tools required to train your avatar must be subscribed under your own account. You provide the login credentials during setup. This ensures full ownership and copyright control of your avatar and voice clone stays with you. Glitch AI Studio does not retain ownership of, or rights to, any avatar, voice, or trained model created for a client.
            </p>
            <p>
              You are responsible for the ongoing subscription costs of these tools. Our pricing covers our work only.
            </p>
          </section>

          <section>
            <h2 className="text-lg md:text-xl font-bold text-white mb-3 tracking-tight">
              <span className="text-[#26f7b2]">3.</span> What You Receive at the End of the Project
            </h2>
            <p className="mb-3">
              At the end of Phase 1, you receive your trained AI avatar and your cloned voice within your tool accounts.
            </p>
            <p className="mb-3">
              At the end of Phase 2, you receive an automated workflow that generates and edits videos in your brand style.
            </p>
            <p className="mb-3">
              You do not receive the underlying editing system itself. The custom AI editing system, including its source code, GitHub repository, automation logic, and proprietary configurations, remains the intellectual property of Glitch AI Studio. The editing system is built using significant custom development and is not transferable. You receive the output of the system. You do not receive the system.
            </p>
            <p>
              If you discontinue working with Glitch AI Studio, your avatar and voice remain yours, but you will lose access to the editing automation and will need to either license it through us or build your own.
            </p>
          </section>

          <section>
            <h2 className="text-lg md:text-xl font-bold text-white mb-3 tracking-tight">
              <span className="text-[#26f7b2]">4.</span> Portfolio Rights
            </h2>
            <p className="mb-3">
              As partial consideration for our work and pricing, the client agrees to allow Glitch AI Studio to showcase at least one piece of work produced through our system as part of our public portfolio. This may include video samples, screenshots, written case studies, or social media references. Sensitive identifying information will not be shared without written consent.
            </p>
            <p>
              If you do not agree to portfolio rights, additional pricing may apply and must be negotiated before the project begins.
            </p>
          </section>

          <section>
            <h2 className="text-lg md:text-xl font-bold text-white mb-3 tracking-tight">
              <span className="text-[#26f7b2]">5.</span> Payment Methods and Platform Fees
            </h2>
            <p className="mb-3">
              Our primary payment method is Payoneer. We accept direct payments via Payoneer with no additional fees added to the project price.
            </p>
            <p className="mb-3">
              We can also work through trusted freelance platforms if you prefer additional payment protection or have not worked with us before. The platforms we currently support are:
            </p>
            <ul className="list-disc pl-6 space-y-1.5 mb-3 marker:text-[#26f7b2]">
              <li>Fiverr</li>
              <li>Upwork</li>
              <li>Contra</li>
            </ul>
            <p className="mb-3">
              If you choose to work through any of these platforms, all platform service fees, transaction fees, and currency conversion charges are the responsibility of the client. Glitch AI Studio will not absorb these fees. As a result, the final invoice on these platforms may be higher than the base project price quoted on our website to account for these costs.
            </p>
            <p>
              If you wish to use a freelance platform not listed here, please raise it during the consultation call. We will assess case by case.
            </p>
          </section>

          <section>
            <h2 className="text-lg md:text-xl font-bold text-white mb-3 tracking-tight">
              <span className="text-[#26f7b2]">6.</span> Pricing and Hourly Engagements
            </h2>
            <p className="mb-3">
              Our standard package pricing is published on our website and includes Phase 1 ($250), Phase 2 ($1,000), per-video generation ($15), and Phase 3 add-ons as listed.
            </p>
            <p className="mb-3">
              For custom work outside the standard system, ongoing optimization, or one-off engagements, we offer hourly rates at $25 per hour. Hourly engagements are billed in 30-minute increments and require a minimum commitment of 2 hours per session.
            </p>
            <p>All prices are in USD.</p>
          </section>

          <section>
            <h2 className="text-lg md:text-xl font-bold text-white mb-3 tracking-tight">
              <span className="text-[#26f7b2]">7.</span> Project Timeline and Delivery
            </h2>
            <p className="mb-3">
              Phase 1 typically takes 7 days from the date all client materials (video, voice samples, photos) are received. Phase 2 setup takes an additional 7 to 14 days depending on the brand complexity. Per-video generation runs take approximately 10 minutes per video.
            </p>
            <p>
              Delays caused by missing client materials, delayed feedback, or tool subscription issues on the client side will extend the project timeline accordingly and are not the responsibility of Glitch AI Studio.
            </p>
          </section>

          <section>
            <h2 className="text-lg md:text-xl font-bold text-white mb-3 tracking-tight">
              <span className="text-[#26f7b2]">8.</span> Refund Policy
            </h2>
            <p className="mb-3">
              Phase 1 and Phase 2 setup fees are partially refundable only before training has begun. Once we begin training your avatar or building your editing system, fees become non-refundable due to the custom labor and tool resources committed to the project.
            </p>
            <p className="mb-3">
              Per-video generation fees are non-refundable once the video has been delivered.
            </p>
            <p>
              If a critical technical issue prevents us from completing the work and we are unable to deliver, a fair refund will be calculated based on the work completed at that point.
            </p>
          </section>

          <section>
            <h2 className="text-lg md:text-xl font-bold text-white mb-3 tracking-tight">
              <span className="text-[#26f7b2]">9.</span> Confidentiality
            </h2>
            <p>
              Both parties agree to keep confidential any private business information, scripts, brand assets, or strategy materials shared during the engagement. We do not share client materials with third parties without written consent, except where required by law or where reasonably necessary to deliver the service (such as cloud storage providers or AI tool APIs).
            </p>
          </section>

          <section>
            <h2 className="text-lg md:text-xl font-bold text-white mb-3 tracking-tight">
              <span className="text-[#26f7b2]">10.</span> Acceptable Use
            </h2>
            <p className="mb-3">
              You agree not to use your AI avatar, voice clone, or our content systems for:
            </p>
            <ul className="list-disc pl-6 space-y-1.5 mb-3 marker:text-[#26f7b2]">
              <li>Illegal activity in any jurisdiction</li>
              <li>Defamation, harassment, or impersonation of real individuals other than yourself</li>
              <li>Generating misleading political content, deepfakes of public figures, or election interference material</li>
              <li>Adult or sexually explicit content</li>
              <li>Fraudulent advertising or misleading product claims</li>
            </ul>
            <p>
              Glitch AI Studio reserves the right to terminate the working relationship and revoke ongoing services without refund if these terms are violated.
            </p>
          </section>

          <section>
            <h2 className="text-lg md:text-xl font-bold text-white mb-3 tracking-tight">
              <span className="text-[#26f7b2]">11.</span> Limitation of Liability
            </h2>
            <p className="mb-3">
              Glitch AI Studio is not liable for indirect, incidental, or consequential damages arising from the use of your AI avatar or content system, including but not limited to lost revenue, brand damage, third-party tool outages, or social media platform policy changes that affect your content distribution.
            </p>
            <p>
              Our total liability in any case is limited to the amount you have paid Glitch AI Studio for the specific service in question.
            </p>
          </section>

          <section>
            <h2 className="text-lg md:text-xl font-bold text-white mb-3 tracking-tight">
              <span className="text-[#26f7b2]">12.</span> Changes to These Terms
            </h2>
            <p>
              We may update these terms occasionally to reflect changes in our service or legal requirements. The updated terms will be posted on this page with a new &ldquo;Last updated&rdquo; date. Continued use of our service after changes are posted means you accept the updated terms.
            </p>
          </section>

          <section>
            <h2 className="text-lg md:text-xl font-bold text-white mb-3 tracking-tight">
              <span className="text-[#26f7b2]">13.</span> Contact
            </h2>
            <p className="mb-3">For questions about these terms, contact:</p>
            <a
              href="mailto:soumitrohaldershan@gmail.com"
              className="text-[#26f7b2] hover:underline font-medium"
            >
              soumitrohaldershan@gmail.com
            </a>
          </section>
        </div>
      </div>
    </div>
  );
}
