"use client";

import { Navbar } from "@/components/navbar";

interface ChangelogEntry {
  version: string;
  date: string;
  changes: { type: "added" | "changed" | "fixed"; text: string }[];
}

const changelog: ChangelogEntry[] = [
  {
    version: "1.3.0",
    date: "2025-02-18",
    changes: [
      {
        type: "added",
        text: 'expandDescription prop: control whether descriptions start expanded ("open") or reveal on hover ("hover")',
      },
      {
        type: "added",
        text: "Tab layout: asymmetric tab shape with concave corner bridge connecting title to body",
      },
      {
        type: "added",
        text: "Position-aware tab alignment: tab aligns to the right on right-side positions, left on left-side",
      },
      {
        type: "added",
        text: "Expand Description toggle in the interactive demo page",
      },
      {
        type: "changed",
        text: "Spring config now affects both entrance and description expand/collapse animations",
      },
      {
        type: "changed",
        text: "Default layout uses a single rounded container instead of split title/body",
      },
      {
        type: "fixed",
        text: "Removed subtle line artifact between tab title and body (sub-pixel gap)",
      },
    ],
  },
  {
    version: "1.2.0",
    date: "2025-02-15",
    changes: [
      { type: "added", text: "Theme provider with dark/light mode support" },
      {
        type: "added",
        text: "Navbar component with GitHub link and theme toggle",
      },
      {
        type: "changed",
        text: "Updated layout and page styles for improved theming",
      },
    ],
  },
  {
    version: "1.1.0",
    date: "2025-02-14",
    changes: [
      {
        type: "added",
        text: "Interactive demo page with configuration controls",
      },
      {
        type: "added",
        text: "Position, size, duration, and spring config selectors",
      },
      { type: "added", text: "Custom style toast demo with purple theme" },
      { type: "changed", text: "Switched to bun as package manager" },
    ],
  },
  {
    version: "1.0.0",
    date: "2025-02-13",
    changes: [
      {
        type: "added",
        text: "BongToast component with spring-based animations via Motion",
      },
      {
        type: "added",
        text: "useBongToast hook with external store for cross-component usage",
      },
      {
        type: "added",
        text: "5 built-in variants: default, success, error, warning, info",
      },
      { type: "added", text: "3 size presets: sm, md, lg" },
      {
        type: "added",
        text: "4 position options: top-right, top-left, bottom-right, bottom-left",
      },
      {
        type: "added",
        text: "Per-toast style overrides (bg, fg, borderColor, borderRadius)",
      },
      {
        type: "added",
        text: "Per-toast spring config overrides (stiffness, damping, mass)",
      },
      {
        type: "added",
        text: "Hover-to-expand description with chevron indicator",
      },
      { type: "added", text: "Click-to-dismiss behavior" },
      { type: "added", text: "Imperative toast() and dismissToast() exports" },
      {
        type: "added",
        text: "shadcn registry integration for easy installation",
      },
    ],
  },
];

const typeBadge: Record<string, string> = {
  added:
    "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30",
  changed: "bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/30",
  fixed:
    "bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30",
};

export default function ChangelogPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <div className="mx-auto max-w-3xl px-6 pt-28 pb-20">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-2">
          Changelog
        </h1>
        <p className="text-lg text-muted-foreground mb-12">
          All notable changes to bong-toast.
        </p>

        <div className="space-y-10">
          {changelog.map((entry) => (
            <div key={entry.version} className="relative">
              <div className="flex items-baseline gap-3 mb-4">
                <h2 className="text-2xl font-bold text-foreground">
                  v{entry.version}
                </h2>
                <span className="text-sm text-muted-foreground">
                  {entry.date}
                </span>
              </div>
              <ul className="space-y-2.5">
                {entry.changes.map((change, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span
                      className={`mt-0.5 shrink-0 rounded-md border px-2 py-0.5 text-xs font-medium capitalize ${typeBadge[change.type]}`}
                    >
                      {change.type}
                    </span>
                    <span className="text-sm text-foreground/80">
                      {change.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <footer className="border-t border-border py-8 text-center text-sm text-muted-foreground">
        bong-toast — built with Next.js, Motion & shadcn
      </footer>
    </div>
  );
}
