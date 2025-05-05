"use client";

import { useState, useEffect } from "react";
import { useSession, signIn, getProviders } from "next-auth/react";
import type { ClientSafeProvider } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const { data: session, status } = useSession();
  const [providers, setProviders] = useState<Record<string, ClientSafeProvider> | null>(null);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const router = useRouter();

  useEffect(() => {
    getProviders().then((prov) => setProviders(prov as Record<string, ClientSafeProvider>));
  }, []);

  useEffect(() => {
    if (session) {
      router.replace("/");
    }
  }, [session, router]);

  if (status === "loading") {
    return <div className="flex justify-center items-center h-full">Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white/80 py-8 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-4 text-center">Create an account</h2>
        {providers?.email && (
          !emailSent ? (
            <>
              <label htmlFor="email" className="label">Email address</label>
              <input
                id="email"
                type="email"
                className="input mb-2"
                placeholder="Email address"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
              <button
                type="button"
                className="w-full mb-4 px-4 py-2 bg-accent text-white rounded shadow"
                onClick={async () => {
                  if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
                    setEmailError("Please enter a valid email address.");
                    return;
                  }
                  setEmailError("");
                  const res = await signIn("email", {
                    email,
                    redirect: false,
                    callbackUrl: "/",
                  });
                  if (res?.ok) {
                    setEmailSent(true);
                  } else {
                    setEmailError("There was a problem sending the email. Please try again.");
                  }
                }}
              >
                Continue
              </button>
              {emailError && <p className="text-red-500 text-sm mb-2">{emailError}</p>}
            </>
          ) : (
            <div className="text-green-600 text-center my-4">
              Check your email for a sign-in link!
            </div>
          )
        )}
        <div className="mb-2 text-center text-gray-500">Already have an account? <button type="button" className="text-accent cursor-pointer bg-transparent border-none p-0 underline" onClick={() => signIn()}>Log in</button></div>
        <div className="flex items-center w-full my-2">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="mx-2 text-gray-400 text-sm">OR</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>
        {providers && Object.values(providers).map((provider) => (
          typeof provider === 'object' && provider && 'id' in provider && provider.id !== "email" && (
            <button
              type="button"
              key={provider.id}
              className={`w-full flex items-center gap-2 mb-3 px-4 py-2 rounded shadow ${
                provider.id === "google"
                  ? "bg-white border border-gray-300 hover:bg-gray-50" :
                provider.id === "github"
                  ? "bg-gray-900 text-white hover:bg-gray-800 pl-4" :
                provider.id === "apple"
                  ? "bg-black text-white hover:bg-gray-900" :
                "bg-white border border-gray-300 hover:bg-gray-50"
              }`}
              onClick={() => signIn(provider.id)}
            >
              {provider.id === "google" && <img src="/google.svg" alt="Google" className="h-5 w-5" />}
              {provider.id === "github" && <img src="/github.svg" alt="GitHub" className="h-5 w-5" />}
              {provider.id === "apple" && <img src="/apple.svg" alt="Apple" className="h-5 w-5" />}
              Continue with {provider.name}
            </button>
          )
        ))}
      </div>
    </div>
  );
} 