import type { Metadata } from "next";
import { signIn } from "@/app/actions";

export const metadata: Metadata = { title: "Login" };

const messages: Record<string, string> = {
  invalid: "Email or password is incorrect.",
  "not-authorized": "This account does not have CRM access.",
};

export default function LoginPage({ searchParams }: { searchParams: { error?: string } }) {
  const error = searchParams.error ? messages[searchParams.error] : undefined;

  return (
    <section className="mx-auto max-w-sm px-4 py-24">
      <h1 className="font-display text-3xl font-bold">CRM login</h1>
      <form action={signIn} className="mt-8 flex flex-col gap-4">
        {error && (
          <p role="alert" className="rounded-md border border-red-500/40 bg-red-500/10 text-red-300 px-4 py-3 text-sm">
            {error}
          </p>
        )}
        <label className="flex flex-col gap-1 text-sm">
          Email
          <input name="email" type="email" required autoComplete="email" className="rounded-md bg-surface border border-line px-3 py-2" />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          Password
          <input name="password" type="password" required autoComplete="current-password" className="rounded-md bg-surface border border-line px-3 py-2" />
        </label>
        <button type="submit" className="rounded-lg bg-accent text-bg font-semibold px-5 py-3 hover:opacity-90">
          Sign in
        </button>
      </form>
    </section>
  );
}
