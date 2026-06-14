"use client";

import DocPageLayout from "@/components/docs/DocPageLayout";
import CodeTabs from "@/components/docs/CodeTabs";
import ProsConsGrid from "@/components/docs/ProsConsGrid";
import DocsConsole from "@/components/DocsConsole";
import { protocolDocs } from "@/data/protocolDocs";

const doc = protocolDocs.websockets;

const channels = [
  {
    channel: "price-ticks",
    description: "Real-time cryptocurrency and stock price updates.",
    direction: "Server → Client",
  },
  {
    channel: "cursor-move",
    description: "Collaborative cursor position sharing.",
    direction: "Client → Server",
  },
  {
    channel: "chat",
    description: "Live chat messages between users.",
    direction: "Bidirectional",
  },
  {
    channel: "typing",
    description: "Typing indicator for chat applications.",
    direction: "Bidirectional",
  },
  {
    channel: "notifications",
    description: "Push notifications for alerts and mentions.",
    direction: "Server → Client",
  },
];

const directionColors: Record<string, string> = {
  "Server → Client": "bg-blue-500/15 text-blue-400 border-blue-500/30",
  "Client → Server": "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  Bidirectional: "bg-violet-500/15 text-violet-400 border-violet-500/30",
};

export default function WebsocketsDocsPage() {
  return (
    <DocPageLayout protocolKey="websockets">
      <div>
        <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">
          {doc.category}
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground mb-3 tracking-tight">
          {doc.name}
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed italic">
          {doc.tagline}
        </p>
      </div>

      <div className="rounded-2xl border border-border bg-muted/15 p-4 sm:p-6">
        <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-4">
          Persistent Connection Tunnel
        </h3>
        <div className="flex items-center justify-between px-4 py-6">
          <div className="flex flex-col items-center gap-2">
            <div className="h-14 w-14 rounded-xl bg-cyan-500/10 border-2 border-cyan-500/40 flex items-center justify-center">
              <span className="text-xl">🖥️</span>
            </div>
            <span className="text-xs font-bold text-cyan-400">Browser</span>
          </div>

          <div className="flex-1 mx-4 flex flex-col items-center gap-2">
            <div className="w-full h-3 rounded-full bg-cyan-500/20 border border-cyan-500/30 overflow-hidden relative">
              <div className="absolute inset-0 bg-linear-to-r from-cyan-500/40 via-transparent to-cyan-500/40 animate-pulse" />
            </div>
            <div className="flex items-center gap-2 text-[10px] font-mono">
              <span className="text-cyan-400">
                ◄═══════════════════════════►
              </span>
            </div>
            <span className="text-[10px] text-muted-foreground">
              ws:// → Upgrade → 101 → Open
            </span>
          </div>

          <div className="flex flex-col items-center gap-2">
            <div className="h-14 w-14 rounded-xl bg-violet-500/10 border-2 border-violet-500/40 flex items-center justify-center">
              <span className="text-xl">⚙️</span>
            </div>
            <span className="text-xs font-bold text-violet-400">WS Server</span>
          </div>
        </div>
        <div className="flex justify-center mt-2">
          <div className="flex items-center gap-4 text-[10px] text-muted-foreground">
            <span>1. GET ws://api/live</span>
            <span>→</span>
            <span>2. Upgrade: websocket</span>
            <span>→</span>
            <span>3. 101 Switching</span>
            <span>→</span>
            <span>4. Bidirectional pipe</span>
          </div>
        </div>
      </div>

      <div className="text-foreground text-[15px] sm:text-base leading-relaxed space-y-4">
        <p>{doc.description}</p>
        <h3 className="text-xl font-bold text-foreground pt-2">How it Works</h3>
        <p>{doc.overview}</p>
      </div>

      <div className="rounded-xl border border-border bg-background/40 p-5">
        <h3 className="text-sm font-bold text-foreground mb-3">
          Channels & Direction
        </h3>
        <div className="flex flex-col gap-2">
          {channels.map((ch, i) => (
            <div
              key={i}
              className="flex items-center justify-between px-3 py-2.5 rounded-lg bg-muted/30 border border-border/40"
            >
              <div className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
                <code className="text-xs font-mono text-foreground font-semibold">
                  {ch.channel}
                </code>
              </div>
              <div className="flex items-center gap-3">
                <span
                  className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${directionColors[ch.direction]}`}
                >
                  {ch.direction}
                </span>
                <span className="text-xs text-muted-foreground max-w-50 text-right hidden sm:block">
                  {ch.description}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <DocsConsole doc={doc} />
      <CodeTabs snippets={doc.codeSnippets} />
      <ProsConsGrid pros={doc.pros} cons={doc.cons} />
    </DocPageLayout>
  );
}
