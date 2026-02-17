"use client";

import { useState } from "react";
import { BongToast } from "../../registry/bong-toast/bong-toast";
import {
  useBongToast,
  type ToastPosition,
  type ToastSize,
} from "../../registry/bong-toast/use-bong-toast";

const installCommand =
  "npx shadcn@latest add https://bong-toast.vercel.app/r/bong-toast.json";

const usageCode = `import { BongToast } from "@/components/bong-toast/bong-toast";
import { useBongToast } from "@/hooks/use-bong-toast";

// In your layout or root component:
<BongToast
  position="bottom-right"
  size="md"
  duration={4000}
  spring={{ stiffness: 400, damping: 25, mass: 0.8 }}
  style={{ borderRadius: 14 }}
/>

// In any component:
const { toast } = useBongToast();

// Simple
toast({ title: "Saved!", variant: "success" });

// With per-toast overrides
toast({
  title: "Custom toast",
  description: "Hover me to see the description expand.",
  variant: "info",
  duration: 6000,
  size: "lg",
  style: { bg: "#1a1a2e", borderColor: "#4a9eff", borderRadius: 20 },
  spring: { stiffness: 300, damping: 15, mass: 1.2 },
});`;

const variants = [
  {
    variant: "success" as const,
    title: "Saved successfully",
    description: "Your changes have been saved to the database.",
    label: "Success",
  },
  {
    variant: "error" as const,
    title: "Something went wrong",
    description: "The request failed. Please try again later.",
    label: "Error",
  },
  {
    variant: "warning" as const,
    title: "Careful!",
    description: "This action cannot be undone. Proceed with caution.",
    label: "Warning",
  },
  {
    variant: "info" as const,
    title: "New update available",
    description: "Version 2.0 is ready to install. Check the changelog for details.",
    label: "Info",
  },
  {
    variant: "default" as const,
    title: "Hello!",
    description: "This is a default toast. Hover to read more.",
    label: "Default",
  },
];

const positions: { value: ToastPosition; label: string }[] = [
  { value: "bottom-right", label: "Bottom Right" },
  { value: "bottom-left", label: "Bottom Left" },
  { value: "top-right", label: "Top Right" },
  { value: "top-left", label: "Top Left" },
];

const sizes: { value: ToastSize; label: string }[] = [
  { value: "sm", label: "Small" },
  { value: "md", label: "Medium" },
  { value: "lg", label: "Large" },
];

function variantColor(variant: string) {
  switch (variant) {
    case "success":
      return "bg-emerald-500/15 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/25";
    case "error":
      return "bg-red-500/15 text-red-400 border-red-500/30 hover:bg-red-500/25";
    case "warning":
      return "bg-amber-500/15 text-amber-400 border-amber-500/30 hover:bg-amber-500/25";
    case "info":
      return "bg-blue-500/15 text-blue-400 border-blue-500/30 hover:bg-blue-500/25";
    default:
      return "bg-zinc-500/15 text-zinc-300 border-zinc-500/30 hover:bg-zinc-500/25";
  }
}

function ToggleGroup({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <h2 className="mb-3 text-sm font-medium text-zinc-500 uppercase tracking-wider">
        {label}
      </h2>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <button
            key={o.value}
            onClick={() => onChange(o.value)}
            className={`rounded-lg border px-3 py-1.5 text-sm transition-colors ${
              value === o.value
                ? "border-zinc-600 bg-zinc-800 text-zinc-100"
                : "border-zinc-800 bg-zinc-900 text-zinc-500 hover:text-zinc-300"
            }`}
          >
            {o.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function Slider({
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
  unit = "",
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  step?: number;
  unit?: string;
}) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <span className="text-sm text-zinc-500">{label}</span>
        <span className="font-mono text-sm text-zinc-400">
          {value}{unit}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-zinc-500"
      />
    </div>
  );
}

export default function Home() {
  const { toast } = useBongToast();
  const [copied, setCopied] = useState(false);
  const [position, setPosition] = useState<ToastPosition>("bottom-right");
  const [size, setSize] = useState<ToastSize>("md");
  const [duration, setDuration] = useState(4000);
  const [stiffness, setStiffness] = useState(400);
  const [damping, setDamping] = useState(25);
  const [mass, setMass] = useState(0.8);
  const [borderRadius, setBorderRadius] = useState(14);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(installCommand);
    setCopied(true);
    toast({ title: "Copied to clipboard!", variant: "success", duration: 2000 });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <BongToast
        position={position}
        size={size}
        duration={duration}
        spring={{ stiffness, damping, mass }}
        style={{ borderRadius }}
      />

      {/* Hero */}
      <div className="flex flex-col items-center justify-center px-6 pt-32 pb-20">
        <h1 className="text-center text-5xl font-bold tracking-tight sm:text-7xl">
          bong-toast
        </h1>

        <p className="mt-4 max-w-lg text-center text-lg text-zinc-400">
          Animated gooey toast notifications with spring physics.
          <br />
          Hover any toast to expand its description.
        </p>

        {/* Install command */}
        <button
          onClick={handleCopy}
          className="group mt-8 flex items-center gap-3 rounded-xl border border-zinc-800 bg-zinc-900 px-5 py-3 font-mono text-sm transition-colors hover:border-zinc-700 hover:bg-zinc-800"
        >
          <span className="text-zinc-500">$</span>
          <span className="text-zinc-300">{installCommand}</span>
          <span className="text-zinc-500 transition-colors group-hover:text-zinc-300">
            {copied ? (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8.5L6 11.5L13 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <rect x="5" y="5" width="9" height="9" rx="2" stroke="currentColor" strokeWidth="1.2" />
                <path d="M5 11H4C2.89543 11 2 10.1046 2 9V4C2 2.89543 2.89543 2 4 2H9C10.1046 2 11 2.89543 11 4V5" stroke="currentColor" strokeWidth="1.2" />
              </svg>
            )}
          </span>
        </button>
      </div>

      {/* Demo section */}
      <div className="mx-auto max-w-2xl px-6 pb-20">
        {/* Controls grid */}
        <div className="mb-10 grid gap-6 sm:grid-cols-2">
          <ToggleGroup
            label="Position"
            options={positions}
            value={position}
            onChange={(v) => setPosition(v as ToastPosition)}
          />
          <ToggleGroup
            label="Size"
            options={sizes}
            value={size}
            onChange={(v) => setSize(v as ToastSize)}
          />
        </div>

        {/* Sliders */}
        <div className="mb-10 rounded-xl border border-zinc-800 bg-zinc-900/50 p-5">
          <h2 className="mb-4 text-sm font-medium text-zinc-500 uppercase tracking-wider">
            Configuration
          </h2>
          <div className="grid gap-5 sm:grid-cols-2">
            <Slider label="Duration" value={duration} onChange={setDuration} min={1000} max={10000} step={500} unit="ms" />
            <Slider label="Border Radius" value={borderRadius} onChange={setBorderRadius} min={0} max={30} unit="px" />
            <Slider label="Stiffness" value={stiffness} onChange={setStiffness} min={100} max={1000} step={10} />
            <Slider label="Damping" value={damping} onChange={setDamping} min={5} max={60} />
            <Slider label="Mass" value={mass} onChange={(v) => setMass(v)} min={0.1} max={3} step={0.1} />
          </div>
        </div>

        {/* Variant buttons */}
        <div className="mb-12">
          <h2 className="mb-3 text-sm font-medium text-zinc-500 uppercase tracking-wider">
            Trigger a toast
          </h2>
          <div className="flex flex-wrap gap-3">
            {variants.map((v) => (
              <button
                key={v.variant}
                onClick={() =>
                  toast({
                    title: v.title,
                    description: v.description,
                    variant: v.variant,
                  })
                }
                className={`rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${variantColor(v.variant)}`}
              >
                {v.label}
              </button>
            ))}
            <button
              onClick={() =>
                toast({
                  title: "Custom styled",
                  description: "This toast has a custom purple background and round corners.",
                  style: { bg: "#2d1b69", borderColor: "#7c3aed", borderRadius: 24 },
                })
              }
              className="rounded-lg border border-purple-500/30 bg-purple-500/15 px-4 py-2 text-sm font-medium text-purple-400 transition-colors hover:bg-purple-500/25"
            >
              Custom Style
            </button>
          </div>
        </div>

        {/* Usage code */}
        <div>
          <h2 className="mb-3 text-sm font-medium text-zinc-500 uppercase tracking-wider">
            Usage
          </h2>
          <pre className="overflow-x-auto rounded-xl border border-zinc-800 bg-zinc-900 p-5 font-mono text-sm leading-relaxed text-zinc-300">
            <code>{usageCode}</code>
          </pre>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-zinc-900 py-8 text-center text-sm text-zinc-600">
        bong-toast — built with Next.js, Motion & shadcn
      </footer>
    </div>
  );
}
