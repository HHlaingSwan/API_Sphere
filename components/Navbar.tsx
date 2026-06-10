"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Terminal, Menu, X, GitCompareArrows } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Documentation", href: "/docs" },
    { name: "Status Codes", href: "/#http-status-codes" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-linear-to-tr from-violet-600 to-cyan-500 text-white shadow-lg shadow-violet-500/20 group-hover:scale-105 transition-transform">
            <Terminal className="h-5 w-5" />
          </div>
          <span className="text-xl font-bold bg-linear-to-r from-violet-600 to-cyan-500 bg-clip-text text-transparent">
            APISphere
          </span>
        </Link>

        {/* Desktop Nav Items */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/" && pathname?.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative px-4 py-2 text-sm font-medium transition-colors rounded-md",
                  isActive
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="activeNav"
                    className="absolute inset-0 -z-10 rounded-md bg-muted border border-border"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Social / External Action */}
        <div className="hidden md:flex items-center gap-4">
          <AnimatedThemeToggler className="text-muted-foreground hover:text-foreground transition-colors size-5" />
          <Link
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <GitCompareArrows className="h-5 w-5" />
          </Link>
          <Link
            href="/docs"
            className="relative group overflow-hidden rounded-full p-px focus:outline-none"
          >
            <span className="absolute inset-0 bg-linear-to-r from-violet-500 to-cyan-500 rounded-full" />
            <div className="relative px-5 py-1.5 bg-background text-foreground text-xs font-semibold rounded-full group-hover:bg-transparent group-hover:text-white transition-colors duration-300">
              Start Reading
            </div>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted-foreground hover:text-foreground md:hidden"
        >
          {mobileMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="border-b border-border bg-background md:hidden"
        >
          <div className="space-y-1 px-4 py-4">
            {navItems.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href !== "/" && pathname?.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "block px-4 py-2.5 text-base font-medium rounded-lg transition-colors",
                    isActive
                      ? "bg-muted border border-border text-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  )}
                >
                  {item.name}
                </Link>
              );
            })}
            <div className="flex items-center justify-between border-t border-border pt-4 mt-4">
              <div className="flex items-center gap-2">
                <AnimatedThemeToggler className="text-muted-foreground hover:text-foreground transition-colors size-5" />
                <span className="text-sm text-muted-foreground">
                  Toggle theme
                </span>
              </div>
              <Link
                href="/docs"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-full bg-linear-to-r from-violet-600 to-cyan-500 px-4 py-2 text-xs font-bold text-white shadow-lg shadow-violet-500/20"
              >
                Get Started
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </header>
  );
}
