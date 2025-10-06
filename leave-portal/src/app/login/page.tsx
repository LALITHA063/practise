"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    await signIn("credentials", {
      email,
      name,
      callbackUrl: "/dashboard",
      redirect: true,
    });
  }

  return (
    <div className="min-h-screen grid place-items-center p-4">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-sm space-y-4 border rounded-lg p-6"
      >
        <h1 className="text-xl font-semibold">Sign in with college email</h1>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@college.edu"
          className="w-full border rounded px-3 py-2"
        />
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name (optional)"
          className="w-full border rounded px-3 py-2"
        />
        <button
          type="submit"
          className="w-full bg-black text-white rounded px-4 py-2"
        >
          Sign in
        </button>
      </form>
    </div>
  );
}
