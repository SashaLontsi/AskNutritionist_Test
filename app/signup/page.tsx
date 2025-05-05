"use client";
import { useState, useEffect } from "react";
import { signIn, getProviders } from "next-auth/react";
import type { ClientSafeProvider } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Eye, EyeOff } from "lucide-react";

export default function SignupPage() {
  const [providers, setProviders] = useState<Record<string, ClientSafeProvider> | null>(null);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [step, setStep] = useState<1 | 2>(1);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { status } = useSession();
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");

  const providerDisplayNames: Record<string, string> = {
    google: "Continue with Google",
  };

  const providerIcons: Record<string, string> = {
    google: "/google.svg",
    github: "/github.svg",
  };

  useEffect(() => {
    getProviders().then((prov) => {
      setProviders(prov as Record<string, ClientSafeProvider>);
      console.log("Providers:", prov);
    });
  }, []);

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/chat");
    }
  }, [status, router]);

  async function handleEmailContinue() {
    if (!name || name.length < 2) {
      setEmailError("Please enter your name.");
      return;
    }
    if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }
    setEmailError("");
    setStep(2);
  }

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    if (!password || password.length < 6) {
      setPasswordError("Password must be at least 6 characters.");
      return;
    }
    setPasswordError("");
    setLoading(true);
    try {
      // Call API to create user
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      
      if (!res.ok) {
        let errorMsg = "Sign up failed";
        try {
          const data = await res.json();
          errorMsg = data.error || errorMsg;
        } catch {
          // If response is not JSON, use default error message
        }
        throw new Error(errorMsg);
      }

      // Sign in with credentials
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        throw new Error(result.error);
      }

      // Redirect to chat page
      router.push("/chat");
    } catch (error) {
      setPasswordError(error instanceof Error ? error.message : "Sign up failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white py-8 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow p-8 flex flex-col gap-6">
        <h2 className="text-3xl font-bold text-center mb-2">Create an account</h2>
        {step === 1 && (
          <form className="flex flex-col gap-4" onSubmit={e => { e.preventDefault(); handleEmailContinue(); }}>
            <input
              id="name"
              type="text"
              className="w-full px-4 py-3 rounded-full border border-gray-300 focus:ring-2 focus:ring-black focus:border-black transition text-base mb-2"
              placeholder="Your name"
              value={name}
              onChange={e => setName(e.target.value)}
            />
            <input
              id="email"
              type="email"
              className="w-full px-4 py-3 rounded-full border border-gray-300 focus:ring-2 focus:ring-black focus:border-black transition text-base mb-2"
              placeholder="Email address"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <button
              type="submit"
              className="w-full py-3 rounded-full bg-accent text-white font-semibold text-lg mb-2"
            >
              Continue
            </button>
            {emailError && <p className="text-red-500 text-sm mb-2">{emailError}</p>}
          </form>
        )}
        {step === 2 && (
          <form className="flex flex-col gap-4" onSubmit={handleSignup}>
            <div className="w-full px-4 py-3 rounded-full border border-gray-300 bg-gray-100 text-gray-500 cursor-not-allowed">{email}</div>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                className="w-full px-4 py-3 rounded-full border border-gray-300 focus:ring-2 focus:ring-black focus:border-black transition text-base mb-2 pr-12"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
                tabIndex={-1}
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
            <button
              type="submit"
              className="w-full py-3 rounded-full bg-accent text-white font-semibold text-lg mb-2"
              disabled={loading}
            >
              {loading ? "Creating account..." : "Continue"}
            </button>
            {passwordError && <p className="text-red-500 text-sm mb-2">{passwordError}</p>}
          </form>
        )}
        <div className="text-center text-gray-500">
          Already have an account? <a href="/login" className="text-accent underline">Log in</a>
        </div>
        <div className="flex items-center gap-2 my-2">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-gray-400 text-sm">OR</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>
        <div className="flex flex-col gap-3 my-4">
          {providers && Object.values(providers).map((provider) =>
            provider.id !== "email" && provider.id !== "credentials" && (
              <button
                type="button"
                key={provider.id}
                className="flex items-center w-full gap-3 py-3 px-4 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-black transition font-medium text-base"
                onClick={() => signIn(provider.id, { callbackUrl: "/chat" })}
              >
                <img src={providerIcons[provider.id]} alt={provider.name} className="h-6 w-6" />
                <span className="flex-1 text-center">{providerDisplayNames[provider.id] || `Continue with ${provider.name}`}</span>
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
} 