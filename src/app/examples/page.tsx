"use client";

import { Navbar } from "@/components/navbar";
import { BongToast } from "../../../registry/bong-toast/bong-toast";
import { useBongToast } from "../../../registry/bong-toast/use-bong-toast";

function CodeBlock({ children }: { children: string }) {
  return (
    <pre className="overflow-x-auto rounded-xl border border-border bg-card p-5 font-mono text-sm leading-relaxed text-foreground/80">
      <code>{children}</code>
    </pre>
  );
}

function ExampleCard({
  title,
  description,
  code,
  children,
}: {
  title: string;
  description: string;
  code: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-border bg-card/50 overflow-hidden">
      <div className="p-6 border-b border-border">
        <h3 className="text-lg font-semibold text-foreground mb-1">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <div className="p-6 flex flex-wrap gap-3">{children}</div>
      <div className="border-t border-border">
        <CodeBlock>{code}</CodeBlock>
      </div>
    </div>
  );
}

export default function ExamplesPage() {
  const { toast } = useBongToast();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <BongToast position="bottom-right" />

      <div className="mx-auto max-w-4xl px-6 pt-28 pb-20">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-2">
          Examples
        </h1>
        <p className="text-lg text-muted-foreground mb-12">
          Interactive examples of bong-toast in action. Click the buttons to see
          each toast.
        </p>

        <div className="space-y-8">
          {/* Basic */}
          <ExampleCard
            title="Basic Usage"
            description="Simple toast with title only."
            code={`const { toast } = useBongToast();

toast({ title: "Hello world!" });`}
          >
            <button
              onClick={() => toast({ title: "Hello world!" })}
              className="rounded-lg border border-border bg-muted/50 px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
            >
              Default toast
            </button>
          </ExampleCard>

          {/* Variants */}
          <ExampleCard
            title="Variants"
            description="Built-in variants with color-coded icons."
            code={`toast({ title: "Saved!", variant: "success" });
toast({ title: "Error occurred", variant: "error" });
toast({ title: "Be careful", variant: "warning" });
toast({ title: "FYI", variant: "info" });`}
          >
            <button
              onClick={() =>
                toast({
                  title: "Saved successfully",
                  description: "Your changes have been saved.",
                  variant: "success",
                })
              }
              className="rounded-lg border border-emerald-500/30 bg-emerald-500/15 px-4 py-2 text-sm font-medium text-emerald-600 dark:text-emerald-400 transition-colors hover:bg-emerald-500/25"
            >
              Success
            </button>
            <button
              onClick={() =>
                toast({
                  title: "Something went wrong",
                  description: "Please try again later.",
                  variant: "error",
                })
              }
              className="rounded-lg border border-red-500/30 bg-red-500/15 px-4 py-2 text-sm font-medium text-red-600 dark:text-red-400 transition-colors hover:bg-red-500/25"
            >
              Error
            </button>
            <button
              onClick={() =>
                toast({
                  title: "Careful!",
                  description: "This action cannot be undone.",
                  variant: "warning",
                })
              }
              className="rounded-lg border border-amber-500/30 bg-amber-500/15 px-4 py-2 text-sm font-medium text-amber-600 dark:text-amber-400 transition-colors hover:bg-amber-500/25"
            >
              Warning
            </button>
            <button
              onClick={() =>
                toast({
                  title: "New update available",
                  description: "Version 2.0 is ready.",
                  variant: "info",
                })
              }
              className="rounded-lg border border-blue-500/30 bg-blue-500/15 px-4 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 transition-colors hover:bg-blue-500/25"
            >
              Info
            </button>
          </ExampleCard>

          {/* Sizes */}
          <ExampleCard
            title="Sizes"
            description='Three built-in sizes: "sm", "md", and "lg".'
            code={`toast({ title: "Small toast", size: "sm" });
toast({ title: "Medium toast", size: "md" });
toast({ title: "Large toast", size: "lg" });`}
          >
            <button
              onClick={() =>
                toast({
                  title: "Small toast",
                  description: "Compact size.",
                  size: "sm",
                  variant: "info",
                })
              }
              className="rounded-lg border border-border bg-muted/50 px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
            >
              Small
            </button>
            <button
              onClick={() =>
                toast({
                  title: "Medium toast",
                  description: "Default size.",
                  size: "md",
                  variant: "info",
                })
              }
              className="rounded-lg border border-border bg-muted/50 px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
            >
              Medium
            </button>
            <button
              onClick={() =>
                toast({
                  title: "Large toast",
                  description: "Larger size for important messages.",
                  size: "lg",
                  variant: "info",
                })
              }
              className="rounded-lg border border-border bg-muted/50 px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
            >
              Large
            </button>
          </ExampleCard>

          {/* Spring Configs */}
          <ExampleCard
            title="Spring Configurations"
            description="Different spring physics for different vibes."
            code={`// Snappy
toast({ title: "Snappy", spring: { stiffness: 500, damping: 30, mass: 0.5 } });

// Bouncy
toast({ title: "Bouncy", spring: { stiffness: 300, damping: 12, mass: 1.0 } });

// Smooth
toast({ title: "Smooth", spring: { stiffness: 200, damping: 20, mass: 1.5 } });`}
          >
            <button
              onClick={() =>
                toast({
                  title: "Snappy!",
                  description: "Fast and precise animation.",
                  variant: "success",
                  spring: { stiffness: 500, damping: 30, mass: 0.5 },
                })
              }
              className="rounded-lg border border-border bg-muted/50 px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
            >
              Snappy
            </button>
            <button
              onClick={() =>
                toast({
                  title: "Bouncy!",
                  description: "Playful bounce effect.",
                  variant: "warning",
                  spring: { stiffness: 300, damping: 12, mass: 1.0 },
                })
              }
              className="rounded-lg border border-border bg-muted/50 px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
            >
              Bouncy
            </button>
            <button
              onClick={() =>
                toast({
                  title: "Smooth",
                  description: "Slow, elegant entrance.",
                  variant: "info",
                  spring: { stiffness: 200, damping: 20, mass: 1.5 },
                })
              }
              className="rounded-lg border border-border bg-muted/50 px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
            >
              Smooth
            </button>
          </ExampleCard>

          {/* Tab Layout */}
          <ExampleCard
            title="Tab Layout"
            description='Asymmetric tab shape. Description expands on hover by default. Use layout: "tab".'
            code={`toast({
  title: "Tab toast",
  description: "Hover to see description.",
  variant: "success",
  layout: "tab",
});`}
          >
            <button
              onClick={() =>
                toast({
                  title: "Saved!",
                  description: "Your changes have been saved to the database.",
                  variant: "success",
                  layout: "tab",
                })
              }
              className="rounded-lg border border-emerald-500/30 bg-emerald-500/15 px-4 py-2 text-sm font-medium text-emerald-600 dark:text-emerald-400 transition-colors hover:bg-emerald-500/25"
            >
              Success Tab
            </button>
            <button
              onClick={() =>
                toast({
                  title: "Error occurred",
                  description: "The request failed. Please try again later.",
                  variant: "error",
                  layout: "tab",
                })
              }
              className="rounded-lg border border-red-500/30 bg-red-500/15 px-4 py-2 text-sm font-medium text-red-600 dark:text-red-400 transition-colors hover:bg-red-500/25"
            >
              Error Tab
            </button>
            <button
              onClick={() =>
                toast({
                  title: "Heads up",
                  description:
                    "This action cannot be undone. Proceed with caution.",
                  variant: "warning",
                  layout: "tab",
                })
              }
              className="rounded-lg border border-amber-500/30 bg-amber-500/15 px-4 py-2 text-sm font-medium text-amber-600 dark:text-amber-400 transition-colors hover:bg-amber-500/25"
            >
              Warning Tab
            </button>
            <button
              onClick={() =>
                toast({
                  title: "New update",
                  description: "Version 2.0 is ready to install.",
                  variant: "info",
                  layout: "tab",
                })
              }
              className="rounded-lg border border-blue-500/30 bg-blue-500/15 px-4 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 transition-colors hover:bg-blue-500/25"
            >
              Info Tab
            </button>
          </ExampleCard>

          {/* Duration */}
          <ExampleCard
            title="Custom Duration"
            description="Control how long toasts stay visible."
            code={`toast({ title: "Quick!", duration: 1500 });
toast({ title: "Long one", duration: 8000 });`}
          >
            <button
              onClick={() =>
                toast({
                  title: "Quick!",
                  description: "Gone in 1.5 seconds.",
                  variant: "warning",
                  duration: 1500,
                })
              }
              className="rounded-lg border border-border bg-muted/50 px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
            >
              1.5s
            </button>
            <button
              onClick={() =>
                toast({
                  title: "Taking my time",
                  description: "Sticking around for 8 seconds.",
                  variant: "info",
                  duration: 8000,
                })
              }
              className="rounded-lg border border-border bg-muted/50 px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
            >
              8s
            </button>
          </ExampleCard>
        </div>
      </div>

      <footer className="border-t border-border py-8 text-center text-sm text-muted-foreground">
        bong-toast — built with Next.js, Motion & shadcn
      </footer>
    </div>
  );
}
