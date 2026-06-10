"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import DocsSidebar from "@/components/DocsSidebar";
import { protocolDocs } from "@/data/protocolDocs";
import { cn } from "@/lib/utils";
import DocSections from "@/components/docs/DocSections";
import { Check, Copy, Menu, Network, ImageIcon } from "lucide-react";

export default function DocPage() {
  const params = useParams();
  const router = useRouter();
  const protocol = (params.protocol as string) || "rest";

  const activeProtocolKey = protocolDocs[protocol] ? protocol : "rest";
  const doc = protocolDocs[activeProtocolKey];

  const [activeTab, setActiveTab] = useState<
    "curl" | "javascript" | "python" | "go"
  >("curl");
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopyCode = (code: string, index: number) => {
    navigator.clipboard.writeText(code);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 1500);
  };

  const selectProtocol = (key: string) => {
    setMobileSidebarOpen(false);
    router.push(`/docs/${key}`);
  };

  return (
    <div className="h-screen flex flex-col bg-background text-foreground">
      <Navbar />
      <div className="flex-1 flex overflow-hidden md:pl-6">
        <DocsSidebar
          currentId={doc.id}
          onSelect={selectProtocol}
          isOpen={mobileSidebarOpen}
          onClose={() => setMobileSidebarOpen(false)}
        />

        <main className="flex-1 overflow-y-auto">
          <div className="w-full max-w-4xl mx-auto flex flex-col gap-8 px-4 sm:px-6 lg:px-8 py-8">
            {/* Mobile Browse Toggle */}
            <div className="flex md:hidden items-center justify-between bg-muted border border-border px-4 py-3 rounded-xl w-full">
              <button
                onClick={() => setMobileSidebarOpen(true)}
                className="flex items-center gap-2 text-sm font-semibold text-foreground cursor-pointer"
              >
                <Menu className="h-5 w-5 text-primary" />
                <span>Browse Protocols</span>
              </button>
              <span className="text-xs font-bold text-primary">
                {doc.name} Docs
              </span>
            </div>

            {/* Document Header */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                  {doc.category}
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground mb-3 tracking-tight">
                {doc.name}
              </h1>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed italic">
                {doc.tagline}
              </p>
            </div>

            {/* Description & Overview */}
            <div className="prose text-foreground text-[15px] sm:text-base leading-relaxed space-y-6 max-w-none">
              <p>{doc.description}</p>
              <h3 className="text-xl sm:text-2xl font-bold text-foreground pt-4">
                How it Works
              </h3>
              <p>{doc.overview}</p>
            </div>

            {/* Pre-built Image/Diagram Demonstration Frame */}
            <div className="rounded-2xl border border-border bg-muted/15 p-3 sm:p-5 backdrop-blur-sm mt-2">
              <div className="relative aspect-21/9 w-full rounded-xl bg-background/70 border border-border flex flex-col items-center justify-center text-muted-foreground group">
                <div className="absolute inset-0 radial-glow pointer-events-none opacity-20" />
                <div className="flex items-center gap-4 mb-3 z-10">
                  <Network className="h-10 w-10 text-primary animate-pulse" />
                  <div className="h-4 w-px bg-border" />
                  <ImageIcon className="h-8 w-8 text-secondary opacity-60" />
                </div>
                <span className="text-xs sm:text-sm font-bold text-muted-foreground uppercase tracking-wider mb-1 z-10">
                  {doc.name} Protocol Diagram Placeholder
                </span>
                <span className="text-[10px] text-muted-foreground z-10 select-all font-mono">
                  {`<img src="/images/${doc.id}-flow.png" alt="${doc.name} Architecture Diagram" className="object-cover w-full h-full" />`}
                </span>
                <div className="absolute top-3 left-3 h-2 w-2 border-t border-l border-border" />
                <div className="absolute top-3 right-3 h-2 w-2 border-t border-r border-border" />
                <div className="absolute bottom-3 left-3 h-2 w-2 border-b border-l border-border" />
                <div className="absolute bottom-3 right-3 h-2 w-2 border-b border-r border-border" />
              </div>
              <p className="text-xs text-muted-foreground mt-3 text-center leading-relaxed italic">
                Figure 1: Client-Server communication flow topology and payload
                mapping for {doc.name} architectures.
              </p>
            </div>

            {/* Advantages & Drawbacks Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-emerald-950/10 border border-emerald-500/20 p-5 rounded-xl">
                <h4 className="text-sm sm:text-base font-bold text-emerald-400 mb-3">
                  Advantages
                </h4>
                <ul className="space-y-2.5 text-xs sm:text-sm text-muted-foreground">
                  {doc.pros.map((pro, i) => (
                    <li key={i} className="flex gap-2.5 leading-relaxed">
                      <span className="text-emerald-400 font-bold">✓</span>
                      <span>{pro}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-rose-950/10 border border-rose-500/20 p-5 rounded-xl">
                <h4 className="text-sm sm:text-base font-bold text-rose-400 mb-3">
                  Challenges
                </h4>
                <ul className="space-y-2.5 text-xs sm:text-sm text-muted-foreground">
                  {doc.cons.map((con, i) => (
                    <li key={i} className="flex gap-2.5 leading-relaxed">
                      <span className="text-rose-400 font-bold">✕</span>
                      <span>{con}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Tabbed Code Snippet Block */}
            <div className="rounded-xl border border-border bg-background/40">
              <div className="flex items-center justify-between border-b border-border bg-muted/40 px-4 py-2.5">
                <div className="flex gap-1.5">
                  {(["curl", "javascript", "python", "go"] as const).map(
                    (tab) => (
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
                        {tab === "javascript" ? "JS" : tab}
                      </button>
                    ),
                  )}
                </div>
                <button
                  onClick={() => handleCopyCode(doc.codeSnippets[activeTab], 1)}
                  className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground text-xs sm:text-sm cursor-pointer"
                >
                  {copiedIndex === 1 ? (
                    <>
                      <Check className="h-4 w-4 text-emerald-400" />
                      <span className="text-emerald-400 font-medium">
                        Copied!
                      </span>
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
                <code>{doc.codeSnippets[activeTab]}</code>
              </pre>
            </div>

            {/* Protocol-Specific Sections */}
            {doc.sections && doc.sections.length > 0 && (
              <DocSections sections={doc.sections} />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
