"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";
import { CodeSnippet } from "@/data/protocolDocs";

const tabs = ["curl", "javascript", "python", "go"] as const;

const tabLabels: Record<string, string> = {
  curl: "curl",
  javascript: "JS",
  python: "Python",
  go: "Go",
};

export default function CodeTabs({ snippets }: { snippets: CodeSnippet }) {
  const [activeTab, setActiveTab] = useState<"curl" | "javascript" | "python" | "go">("curl");
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(snippets[activeTab]);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="rounded-xl border border-border bg-background/40">
      <div className="flex items-center justify-between border-b border-border bg-muted/40 px-4 py-2.5">
        <div className="flex gap-1.5">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "px-3 py-1.5 text-xs sm:text-sm font-semibold rounded-md uppercase tracking-wider transition-all cursor-pointer",
                activeTab === tab
                  ? "bg-muted border border-border text-primary"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {tabLabels[tab]}
            </button>
          ))}
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground text-xs sm:text-sm cursor-pointer"
        >
          {copied ? (
            <>
              <Check className="h-4 w-4 text-emerald-400" />
              <span className="text-emerald-400 font-medium">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="h-4 w-4" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <pre className="p-4.5 overflow-x-auto text-xs sm:text-sm font-mono text-muted-foreground bg-background/80 leading-relaxed select-all">
        <code>{snippets[activeTab]}</code>
      </pre>
    </div>
  );
}
