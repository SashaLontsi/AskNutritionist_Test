import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Terms of Service | AskNutritionist",
  description: "Read our Terms of Service to understand the rules and guidelines for using AskNutritionist.",
}

export default function TermsOfService() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
      <h1 className="text-4xl font-bold mb-8 text-accent font-heading">Terms of Service</h1>
      
      <div className="prose prose-lg max-w-none">
        <section className="mb-8" aria-label="Terms Section">
          <h2 className="text-2xl font-semibold mb-4 text-textMain">1. Acceptance of Terms</h2>
          <p className="text-textLight">
            By accessing and using AskNutritionist, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our service.
          </p>
        </section>

        <section className="mb-8" aria-label="Terms Section">
          <h2 className="text-2xl font-semibold mb-4 text-textMain">2. Description of Service</h2>
          <p className="text-textLight">
            AskNutritionist provides AI-powered nutrition advice and guidance. Our service is designed to offer general nutrition information and should not be considered a substitute for professional medical advice.
          </p>
        </section>

        <section className="mb-8" aria-label="Terms Section">
          <h2 className="text-2xl font-semibold mb-4 text-textMain">3. User Responsibilities</h2>
          <p className="text-textLight mb-4">
            As a user of AskNutritionist, you agree to:
          </p>
          <ul className="list-disc pl-6 text-textLight space-y-2">
            <li>Provide accurate and truthful information</li>
            <li>Use the service for personal, non-commercial purposes</li>
            <li>Not misuse or abuse the service</li>
            <li>Comply with all applicable laws and regulations</li>
          </ul>
        </section>

        <section className="mb-8" aria-label="Terms Section">
          <h2 className="text-2xl font-semibold mb-4 text-textMain">4. Limitation of Liability</h2>
          <p className="text-textLight">
            AskNutritionist is provided "as is" without any warranties. We are not responsible for any decisions made based on the information provided by our AI assistant. Users should always consult with healthcare professionals for medical advice.
          </p>
        </section>

        <section className="mb-8" aria-label="Terms Section">
          <h2 className="text-2xl font-semibold mb-4 text-textMain">5. Intellectual Property</h2>
          <p className="text-textLight">
            All content and materials available on AskNutritionist are protected by intellectual property rights. Users may not copy, modify, or distribute any content without our permission.
          </p>
        </section>

        <section className="mb-8" aria-label="Terms Section">
          <h2 className="text-2xl font-semibold mb-4 text-textMain">6. Changes to Terms</h2>
          <p className="text-textLight">
            We reserve the right to modify these terms at any time. Users will be notified of significant changes, and continued use of the service constitutes acceptance of the modified terms.
          </p>
        </section>

        <section className="mb-8" aria-label="Terms Section">
          <h2 className="text-2xl font-semibold mb-4 text-textMain">7. Contact Information</h2>
          <p className="text-textLight">
            For questions about these Terms of Service, please contact us at{" "}
            <a href="mailto:legal@asknutritionist.com" className="text-accent hover:underline">
              legal@asknutritionist.com
            </a>
          </p>
        </section>
      </div>
    </div>
  )
} 