import Link from "next/link"
import { Leaf, Mail } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-white/90 border-t border-accent/10 py-8 mt-12">
      <div className="max-w-3xl mx-auto px-4 flex flex-col items-center gap-4">
        <div className="flex items-center gap-2 mb-2">
          <Leaf className="h-6 w-6 text-accent" />
          <span className="font-heading text-xl font-bold text-accent">AskNutritionist</span>
        </div>
        <nav className="flex flex-wrap justify-center gap-6 text-sm text-textLight mb-2">
          <Link href="/" className="hover:text-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent transition-colors">Home</Link>
          <Link href="/about" className="hover:text-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent transition-colors">About</Link>
          <Link href="/ask" className="hover:text-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent transition-colors">Ask AI</Link>
          <Link href="/contact" className="hover:text-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent transition-colors">Contact</Link>
          <Link href="/privacy-policy" className="hover:text-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent transition-colors">Privacy Policy</Link>
          <Link href="/terms-of-service" className="hover:text-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent transition-colors">Terms of Service</Link>
          <Link href="/cookie-policy" className="hover:text-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent transition-colors">Cookie Policy</Link>
        </nav>
        <div className="flex items-center gap-4 mb-2">
          <a href="mailto:contact@asknutritionist.com" className="text-textLight hover:text-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent transition-colors" aria-label="Email">
            <Mail className="h-5 w-5" />
          </a>
        </div>
        <div className="text-xs text-textLight text-center">
          &copy; {new Date().getFullYear()} AskNutritionist. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
