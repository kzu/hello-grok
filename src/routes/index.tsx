import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Hand, RotateCcw } from "lucide-react";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { SignedIn, SignedOut, UserButton } from "@/lib/auth/gates";

export const Route = createFileRoute("/")({ component: Home });

const GREETINGS = [
  "Hello, World",
  "Welcome aboard",
  "Good to see you",
  "Hey there",
  "Nice to meet you",
] as const;

function Home() {
  const { user, isPending } = useCurrentUserState();
  const [index, setIndex] = useState(0);
  const [waveCount, setWaveCount] = useState(0);

  const greeting = GREETINGS[index % GREETINGS.length];
  const name =
    user?.displayName?.split(" ")[0] ?? user?.primaryEmail?.split("@")[0];

  const subtitle = useMemo(() => {
    if (waveCount === 0) return "A tiny app that says hello.";
    if (waveCount === 1) return "You waved once. Keep going.";
    if (waveCount < 5) return `You've waved ${waveCount} times.`;
    return `${waveCount} waves — world says hi back.`;
  }, [waveCount]);

  function wave() {
    setIndex((i) => i + 1);
    setWaveCount((n) => n + 1);
  }

  function reset() {
    setIndex(0);
    setWaveCount(0);
  }

  return (
    <div className="relative min-h-dvh overflow-hidden bg-bg text-fg">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% -10%, color-mix(in oklab, var(--color-fg) 6%, transparent), transparent 70%)",
        }}
      />

      <header className="relative z-10 flex items-center justify-between px-5 py-4 sm:px-8">
        <div className="flex items-center gap-2">
          <span className="flex size-8 items-center justify-center rounded-md border border-border bg-surface text-muted">
            <Hand className="size-4" strokeWidth={1.75} aria-hidden />
          </span>
          <span className="text-sm font-medium tracking-tight text-muted">Hello World</span>
        </div>
        <div className="flex items-center gap-3">
          {isPending ? (
            <div className="h-8 w-8 animate-pulse rounded-full bg-surface-elevated" aria-hidden />
          ) : (
            <>
              <SignedOut>
                <Link
                  to="/login"
                  className="inline-flex h-9 items-center rounded-md border border-border bg-surface px-3.5 text-sm font-medium text-fg transition-colors hover:bg-surface-elevated focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  Sign in
                </Link>
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </>
          )}
        </div>
      </header>

      <main className="relative z-10 flex min-h-[calc(100dvh-5rem)] flex-col items-center justify-center px-5 pb-16 sm:px-8">
        <div className="w-full max-w-lg text-center">
          <p className="animate-fade-up text-xs font-medium tracking-[0.18em] text-subtle uppercase">
            Hello World App
          </p>

          <h1
            key={greeting}
            className="animate-fade-up-delay-1 mt-4 text-[clamp(2.25rem,6vw,3.5rem)] font-semibold tracking-[-0.03em] text-fg"
            style={{ lineHeight: 1.1 }}
          >
            {greeting}
            {name ? (
              <>
                <span className="text-muted">,</span>
                <br className="sm:hidden" />
                <span className="text-muted"> {name}</span>
              </>
            ) : (
              <span className="text-muted">.</span>
            )}
          </h1>

          <p
            key={subtitle}
            className="animate-fade-up-delay-2 mx-auto mt-5 max-w-sm text-base text-muted"
            style={{ lineHeight: 1.55 }}
          >
            {subtitle}
          </p>

          <div className="animate-fade-up-delay-3 mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button
              type="button"
              onClick={wave}
              className="inline-flex h-11 min-w-[10.5rem] items-center justify-center gap-2 rounded-lg bg-accent px-5 text-sm font-semibold text-accent-fg transition-[transform,opacity] duration-150 hover:opacity-90 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
            >
              <Hand className="size-4" strokeWidth={2} aria-hidden />
              Wave hello
            </button>
            <button
              type="button"
              onClick={reset}
              disabled={waveCount === 0}
              className="inline-flex h-11 min-w-[10.5rem] items-center justify-center gap-2 rounded-lg border border-border bg-surface px-5 text-sm font-medium text-fg transition-colors hover:bg-surface-elevated disabled:pointer-events-none disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
            >
              <RotateCcw className="size-3.5" strokeWidth={2} aria-hidden />
              Reset
            </button>
          </div>

          <div className="mt-14 rounded-xl border border-border bg-surface p-5 text-left sm:p-6">
            <p className="text-xs font-medium tracking-wide text-subtle uppercase">Status</p>
            <dl className="mt-3 grid gap-3 text-sm sm:grid-cols-2">
              <div className="rounded-md border border-border bg-bg px-3.5 py-3">
                <dt className="text-subtle">Waves</dt>
                <dd className="mt-0.5 font-mono text-lg font-medium tabular-nums text-fg">
                  {waveCount}
                </dd>
              </div>
              <div className="rounded-md border border-border bg-bg px-3.5 py-3">
                <dt className="text-subtle">Session</dt>
                <dd className="mt-0.5 font-medium text-fg">
                  {isPending ? "Checking…" : user ? "Signed in" : "Guest"}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </main>
    </div>
  );
}
