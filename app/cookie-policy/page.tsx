import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Cookie Policy | AskNutritionist",
  description: "Learn about how we use cookies and similar technologies on AskNutritionist.",
}

export default function CookiePolicy() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
      <h1 className="text-4xl font-bold mb-8 text-accent font-heading">Cookie Policy</h1>
      
      <div className="prose prose-lg max-w-none">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-textMain">1. What Are Cookies</h2>
          <p className="text-textLight">
            Cookies are small text files that are placed on your device when you visit our website. They help us provide you with a better experience and allow us to improve our service.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-textMain">2. How We Use Cookies</h2>
          <p className="text-textLight mb-4">
            We use cookies for the following purposes:
          </p>
          <ul className="list-disc pl-6 text-textLight space-y-2">
            <li>Essential cookies: Required for the website to function properly</li>
            <li>Analytics cookies: Help us understand how visitors use our website</li>
            <li>Preference cookies: Remember your settings and preferences</li>
            <li>Security cookies: Help protect your account and data</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-textMain">3. Types of Cookies We Use</h2>
          <p className="text-textLight mb-4">
            We use the following types of cookies:
          </p>
          <ul className="list-disc pl-6 text-textLight space-y-2">
            <li>Session cookies: Temporary cookies that expire when you close your browser</li>
            <li>Persistent cookies: Remain on your device for a set period of time</li>
            <li>First-party cookies: Set by our website</li>
            <li>Third-party cookies: Set by our service providers</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-textMain">4. Managing Cookies</h2>
          <p className="text-textLight">
            You can control and manage cookies through your browser settings. Please note that disabling certain cookies may affect the functionality of our website.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-textMain">5. Updates to This Policy</h2>
          <p className="text-textLight">
            We may update this Cookie Policy from time to time. We will notify you of any changes by posting the new policy on this page.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-textMain">6. Contact Us</h2>
          <p className="text-textLight">
            If you have any questions about our Cookie Policy, please contact us at{" "}
            <a href="mailto:legal@asknutritionist.com" className="text-accent hover:underline">
              legal@asknutritionist.com
            </a>
          </p>
        </section>
      </div>
    </div>
  )
} 