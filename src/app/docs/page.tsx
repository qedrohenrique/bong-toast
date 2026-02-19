"use client";

import { useEffect, useState } from "react";
import { Navbar } from "@/components/navbar";

function CodeBlock({ children }: { children: string }) {
  return (
    <pre className="overflow-x-auto rounded-xl border border-border bg-card p-5 font-mono text-sm leading-relaxed text-foreground/80">
      <code>{children}</code>
    </pre>
  );
}

function Section({
  title,
  id,
  children,
}: {
  title: string;
  id: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24">
      <h2 className="text-2xl font-bold text-foreground mb-4">{title}</h2>
      {children}
    </section>
  );
}

function PropRow({
  name,
  type,
  defaultVal,
  description,
}: {
  name: string;
  type: string;
  defaultVal?: string;
  description: string;
}) {
  return (
    <tr className="border-b border-border">
      <td className="py-3 px-4 font-mono text-sm text-primary">{name}</td>
      <td className="py-3 px-4 font-mono text-sm text-muted-foreground">
        {type}
      </td>
      <td className="py-3 px-4 font-mono text-sm text-muted-foreground">
        {defaultVal ?? "—"}
      </td>
      <td className="py-3 px-4 text-sm text-foreground/80">{description}</td>
    </tr>
  );
}

const tocItems = [
  { id: "installation", label: "Installation" },
  { id: "quick-start", label: "Quick Start" },
  { id: "bong-toast-props", label: "BongToast Props" },
  { id: "use-bong-toast", label: "useBongToast Hook" },
  { id: "toast-options", label: "Toast Options" },
  { id: "styling", label: "Styling" },
  { id: "spring-config", label: "Spring Config" },
];

function Sidebar({ activeId }: { activeId: string }) {
  return (
    <nav className="hidden lg:block sticky top-24 self-start w-56 shrink-0">
      <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-3">
        On this page
      </h3>
      <ul className="space-y-1 border-l border-border">
        {tocItems.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={`block pl-4 py-1.5 text-sm transition-colors border-l-2 -ml-px ${
                activeId === item.id
                  ? "border-primary text-foreground font-medium"
                  : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
              }`}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default function DocsPage() {
  const [activeId, setActiveId] = useState(tocItems[0].id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "-80px 0px -60% 0px", threshold: 0 },
    );

    for (const item of tocItems) {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <div className="mx-auto max-w-6xl px-6 pt-28 pb-20 flex gap-12">
        <Sidebar activeId={activeId} />

        <div className="min-w-0 flex-1 max-w-4xl">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-2">
            Documentation
          </h1>
          <p className="text-lg text-muted-foreground mb-10">
            Everything you need to use bong-toast in your project.
          </p>

          <div className="space-y-16">
            {/* Installation */}
            <Section title="Installation" id="installation">
              <p className="text-muted-foreground mb-4">
                Install bong-toast via the shadcn CLI:
              </p>
              <CodeBlock>
                {`npx shadcn@latest add https://bong-toast.vercel.app/r/bong-toast.json`}
              </CodeBlock>
              <p className="text-muted-foreground mt-4">
                This will add the{" "}
                <code className="font-mono text-sm text-primary">
                  BongToast
                </code>{" "}
                component and{" "}
                <code className="font-mono text-sm text-primary">
                  useBongToast
                </code>{" "}
                hook to your project.
              </p>
            </Section>

            {/* Quick Start */}
            <Section title="Quick Start" id="quick-start">
              <p className="text-muted-foreground mb-4">
                Add{" "}
                <code className="font-mono text-sm text-primary">{`<BongToast />`}</code>{" "}
                to your layout or root component, then use the hook anywhere to
                trigger toasts.
              </p>
              <CodeBlock>
                {`// app/layout.tsx or root component
import { BongToast } from "@/components/bong-toast/bong-toast";

export default function Layout({ children }) {
  return (
    <>
      {children}
      <BongToast position="bottom-right" />
    </>
  );
}

// Any component
import { useBongToast } from "@/components/bong-toast/use-bong-toast";

function MyComponent() {
  const { toast } = useBongToast();

  return (
    <button onClick={() => toast({ title: "Hello!", variant: "success" })}>
      Show toast
    </button>
  );
}`}
              </CodeBlock>
            </Section>

            {/* BongToast Props */}
            <Section title="BongToast Props" id="bong-toast-props">
              <p className="text-muted-foreground mb-4">
                Props for the{" "}
                <code className="font-mono text-sm text-primary">{`<BongToast />`}</code>{" "}
                provider component.
              </p>
              <div className="overflow-x-auto rounded-xl border border-border">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-border bg-muted/30">
                      <th className="py-2.5 px-4 text-sm font-medium text-muted-foreground">
                        Prop
                      </th>
                      <th className="py-2.5 px-4 text-sm font-medium text-muted-foreground">
                        Type
                      </th>
                      <th className="py-2.5 px-4 text-sm font-medium text-muted-foreground">
                        Default
                      </th>
                      <th className="py-2.5 px-4 text-sm font-medium text-muted-foreground">
                        Description
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <PropRow
                      name="position"
                      type="ToastPosition"
                      defaultVal='"bottom-right"'
                      description="Where toasts appear on screen"
                    />
                    <PropRow
                      name="maxVisible"
                      type="number"
                      defaultVal="5"
                      description="Maximum number of visible toasts"
                    />
                    <PropRow
                      name="size"
                      type="ToastSize"
                      defaultVal='"md"'
                      description='Default size for all toasts: "sm" | "md" | "lg"'
                    />
                    <PropRow
                      name="duration"
                      type="number"
                      defaultVal="4000"
                      description="Default auto-dismiss duration in ms"
                    />
                    <PropRow
                      name="spring"
                      type="ToastSpring"
                      description="Default spring animation config"
                    />
                    <PropRow
                      name="style"
                      type="ToastStyle"
                      description="Default custom style for all toasts"
                    />
                  </tbody>
                </table>
              </div>
            </Section>

            {/* useBongToast Hook */}
            <Section title="useBongToast Hook" id="use-bong-toast">
              <p className="text-muted-foreground mb-4">
                The hook returns the following:
              </p>
              <div className="overflow-x-auto rounded-xl border border-border">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-border bg-muted/30">
                      <th className="py-2.5 px-4 text-sm font-medium text-muted-foreground">
                        Return
                      </th>
                      <th className="py-2.5 px-4 text-sm font-medium text-muted-foreground">
                        Type
                      </th>
                      <th className="py-2.5 px-4 text-sm font-medium text-muted-foreground">
                        Description
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-border">
                      <td className="py-3 px-4 font-mono text-sm text-primary">
                        toast
                      </td>
                      <td className="py-3 px-4 font-mono text-sm text-muted-foreground">{`(options: ToastOptions) => string`}</td>
                      <td className="py-3 px-4 text-sm text-foreground/80">
                        Show a toast, returns its ID
                      </td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="py-3 px-4 font-mono text-sm text-primary">
                        dismiss
                      </td>
                      <td className="py-3 px-4 font-mono text-sm text-muted-foreground">{`(id: string) => void`}</td>
                      <td className="py-3 px-4 text-sm text-foreground/80">
                        Dismiss a specific toast by ID
                      </td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="py-3 px-4 font-mono text-sm text-primary">
                        clear
                      </td>
                      <td className="py-3 px-4 font-mono text-sm text-muted-foreground">{`() => void`}</td>
                      <td className="py-3 px-4 text-sm text-foreground/80">
                        Dismiss all active toasts
                      </td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="py-3 px-4 font-mono text-sm text-primary">
                        toasts
                      </td>
                      <td className="py-3 px-4 font-mono text-sm text-muted-foreground">{`ToastData[]`}</td>
                      <td className="py-3 px-4 text-sm text-foreground/80">
                        Current list of active toasts
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-muted-foreground mt-4">
                You can also use{" "}
                <code className="font-mono text-sm text-primary">toast()</code>{" "}
                and{" "}
                <code className="font-mono text-sm text-primary">
                  dismissToast()
                </code>{" "}
                imperatively outside React components:
              </p>
              <CodeBlock>
                {`import { toast, dismissToast } from "@/components/bong-toast/use-bong-toast";

// Works outside React components
toast({ title: "Imperative toast!", variant: "info" });`}
              </CodeBlock>
            </Section>

            {/* Toast Options */}
            <Section title="Toast Options" id="toast-options">
              <p className="text-muted-foreground mb-4">
                Options passed to{" "}
                <code className="font-mono text-sm text-primary">toast()</code>{" "}
                when triggering a notification.
              </p>
              <div className="overflow-x-auto rounded-xl border border-border">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-border bg-muted/30">
                      <th className="py-2.5 px-4 text-sm font-medium text-muted-foreground">
                        Option
                      </th>
                      <th className="py-2.5 px-4 text-sm font-medium text-muted-foreground">
                        Type
                      </th>
                      <th className="py-2.5 px-4 text-sm font-medium text-muted-foreground">
                        Default
                      </th>
                      <th className="py-2.5 px-4 text-sm font-medium text-muted-foreground">
                        Description
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <PropRow
                      name="title"
                      type="string"
                      description="Toast title (required)"
                    />
                    <PropRow
                      name="description"
                      type="string"
                      description="Expandable description shown on hover"
                    />
                    <PropRow
                      name="variant"
                      type="ToastVariant"
                      defaultVal='"default"'
                      description='"default" | "success" | "error" | "warning" | "info"'
                    />
                    <PropRow
                      name="duration"
                      type="number"
                      defaultVal="4000"
                      description="Auto-dismiss time in ms (overrides global)"
                    />
                    <PropRow
                      name="size"
                      type="ToastSize"
                      defaultVal='"md"'
                      description="Toast size (overrides global)"
                    />
                    <PropRow
                      name="style"
                      type="ToastStyle"
                      description="Custom style (overrides global)"
                    />
                    <PropRow
                      name="spring"
                      type="ToastSpring"
                      description="Spring config (overrides global)"
                    />
                  </tbody>
                </table>
              </div>
            </Section>

            {/* Styling */}
            <Section title="Styling" id="styling">
              <p className="text-muted-foreground mb-4">
                Customize toast appearance with the{" "}
                <code className="font-mono text-sm text-primary">
                  ToastStyle
                </code>{" "}
                type:
              </p>
              <CodeBlock>
                {`interface ToastStyle {
  bg?: string;          // Background color (any CSS color)
  fg?: string;          // Text color
  borderColor?: string; // Border color
  borderRadius?: number; // Border radius in px
}`}
              </CodeBlock>
              <p className="text-muted-foreground mt-4 mb-4">
                Styles can be set globally on the{" "}
                <code className="font-mono text-sm text-primary">{`<BongToast />`}</code>{" "}
                component or per-toast. Per-toast styles are merged with (and
                override) global styles.
              </p>
              <CodeBlock>
                {`// Global style
<BongToast style={{ borderRadius: 20 }} />

// Per-toast override
toast({
  title: "Custom",
  style: {
    bg: "#1a1a2e",
    fg: "#e9d5ff",
    borderColor: "#7c3aed",
    borderRadius: 24,
  },
});`}
              </CodeBlock>
            </Section>

            {/* Spring Config */}
            <Section title="Spring Config" id="spring-config">
              <p className="text-muted-foreground mb-4">
                Control the spring animation with{" "}
                <code className="font-mono text-sm text-primary">
                  ToastSpring
                </code>
                :
              </p>
              <CodeBlock>
                {`interface ToastSpring {
  stiffness?: number; // Default: 400 — higher = faster snap
  damping?: number;   // Default: 25  — higher = less bounce
  mass?: number;      // Default: 0.8 — higher = heavier/slower
}`}
              </CodeBlock>
              <p className="text-muted-foreground mt-4 mb-4">
                Some preset combinations:
              </p>
              <div className="grid gap-3 sm:grid-cols-3">
                {[
                  { name: "Snappy", stiffness: 500, damping: 30, mass: 0.5 },
                  { name: "Bouncy", stiffness: 300, damping: 12, mass: 1.0 },
                  { name: "Smooth", stiffness: 200, damping: 20, mass: 1.5 },
                ].map((preset) => (
                  <div
                    key={preset.name}
                    className="rounded-xl border border-border bg-card/50 p-4"
                  >
                    <div className="font-medium text-foreground mb-1">
                      {preset.name}
                    </div>
                    <code className="text-xs text-muted-foreground font-mono">
                      {`{ stiffness: ${preset.stiffness}, damping: ${preset.damping}, mass: ${preset.mass} }`}
                    </code>
                  </div>
                ))}
              </div>
            </Section>
          </div>
        </div>
      </div>

      <footer className="border-t border-border py-8 text-center text-sm text-muted-foreground">
        bong-toast — built with Next.js, Motion & shadcn
      </footer>
    </div>
  );
}
