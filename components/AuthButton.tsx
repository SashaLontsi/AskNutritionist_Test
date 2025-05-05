"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AuthButton() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") return <p>Loading...</p>;

  if (session) {
    return (
      <div className="flex items-center gap-2">
        <span>Signed in as {session.user?.name || session.user?.email}</span>
        <button
          type="button"
          className="px-3 py-1 bg-accent text-white rounded"
          onClick={() => signOut()}
        >
          Sign out
        </button>
      </div>
    );
  }
  return (
    <button
      type="button"
      className="px-3 py-1 bg-accent text-white rounded"
      onClick={() => router.push("/signin")}
    >
      Sign in / Sign up
    </button>
  );
}
