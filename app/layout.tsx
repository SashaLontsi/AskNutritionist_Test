import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import Header from "@/components/Header"
import { Open_Sans, Playfair_Display } from "next/font/google"
import PageTransition from "@/components/PageTransition"
import SessionProviderWrapper from "./SessionProviderWrapper"

// Define the fonts
const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
  weight: ["400", "500", "600", "700"],
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["600", "700"],
})

export const metadata: Metadata = {
  title: "AskNutritionist - AI-powered nutrition advice",
  description: "Get personalized health and nutrition guidance from our AI advisor",
  generator: "v0.dev",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${openSans.variable} ${playfair.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="bg-primary text-textMain flex min-h-screen flex-col overflow-y-scroll">
        <SessionProviderWrapper>
          <Header />
          <PageTransition>
            <div className="flex-1 flex flex-col">{children}</div>
          </PageTransition>
        </SessionProviderWrapper>
      </body>
    </html>
  )
}
