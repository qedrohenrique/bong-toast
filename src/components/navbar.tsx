"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Moon, Sun, Github } from "lucide-react";
import { useTheme } from "@/app/providers";

const navLinks = [
  { href: "/docs", label: "Docs" },
  { href: "/examples", label: "Examples" },
  { href: "/changelog", label: "Changelog" },
];

export function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto max-w-7xl px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="text-lg font-bold text-foreground">
            bong-toast
          </Link>
          <div className="flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="https://github.com/qedrohenrique/bong-toast"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center w-10 h-10 rounded-lg border border-border bg-muted/50 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            aria-label="GitHub"
          >
            <Github size={20} />
          </a>

          <button
            onClick={toggleTheme}
            className="inline-flex items-center justify-center w-10 h-10 rounded-lg border border-border bg-muted/50 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </div>
    </nav>
  );
}
