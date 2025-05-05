import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy | AskNutritionist",
  description: "Learn about how we protect your privacy and handle your data at AskNutritionist.",
}

export default function PrivacyPolicy() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
      <h1 className="text-4xl font-bold mb-8 text-accent font-heading">Privacy Policy</h1>
      
      <div className="prose prose-lg max-w-none">
        <section className="mb-8" aria-label="Privacy Section">
          <h2 className="text-2xl font-semibold mb-4 text-textMain">1. Introduction</h2>
          <p className="text-textLight">
            At AskNutritionist, we take your privacy seriously. This Privacy Policy explains how we collect, use, and protect your personal information when you use our AI-powered nutrition assistant platform.
          </p>
        </section>

        <section className="mb-8" aria-label="Privacy Section">
          <h2 className="text-2xl font-semibold mb-4 text-textMain">2. Information We Collect</h2>
          <p className="text-textLight mb-4">
            We collect information that you provide directly to us, including:
          </p>
          <ul className="list-disc pl-6 text-textLight space-y-2">
            <li>Questions and messages you send to our AI assistant</li>
            <li>Account information (if you choose to create an account)</li>
            <li>Contact information when you reach out to us</li>
          </ul>
        </section>

        <section className="mb-8" aria-label="Privacy Section">
          <h2 className="text-2xl font-semibold mb-4 text-textMain">3. How We Use Your Information</h2>
          <p className="text-textLight mb-4">
            We use the information we collect to:
          </p>
          <ul className="list-disc pl-6 text-textLight space-y-2">
            <li>Provide and improve our AI nutrition assistant service</li>
            <li>Respond to your questions and requests</li>
            <li>Analyze and improve our platform</li>
            <li>Communicate with you about our services</li>
          </ul>
        </section>

        <section className="mb-8" aria-label="Privacy Section">
          <h2 className="text-2xl font-semibold mb-4 text-textMain">4. Data Security</h2>
          <p className="text-textLight">
            We implement appropriate security measures to protect your personal information. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
          </p>
        </section>

        <section className="mb-8" aria-label="Privacy Section">
          <h2 className="text-2xl font-semibold mb-4 text-textMain">5. Your Rights</h2>
          <p className="text-textLight mb-4">
            You have the right to:
          </p>
          <ul className="list-disc pl-6 text-textLight space-y-2">
            <li>Access your personal information</li>
            <li>Correct inaccurate information</li>
            <li>Request deletion of your information</li>
            <li>Opt-out of certain data uses</li>
          </ul>
        </section>

        <section className="mb-8" aria-label="Privacy Section">
          <h2 className="text-2xl font-semibold mb-4 text-textMain">6. Contact Us</h2>
          <p className="text-textLight">
            If you have any questions about this Privacy Policy, please contact us at{" "}
            <a href="mailto:legal@asknutritionist.com" className="text-accent hover:underline">
              legal@asknutritionist.com
            </a>
          </p>
        </section>
      </div>
    </div>
  )
} 