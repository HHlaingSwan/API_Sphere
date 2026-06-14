"use client";

import DocPageLayout from "@/components/docs/DocPageLayout";
import CodeTabs from "@/components/docs/CodeTabs";
import ProsConsGrid from "@/components/docs/ProsConsGrid";
import DocsConsole from "@/components/DocsConsole";
import { protocolDocs } from "@/data/protocolDocs";

const doc = protocolDocs.webrtc;

const signalingMessages = [
  { type: "offer", description: "The caller sends an SDP offer to initiate a session.", direction: "Client → Server" },
  { type: "answer", description: "The callee responds with an SDP answer accepting the session.", direction: "Server → Client" },
  { type: "candidate", description: "ICE candidates exchanged for NAT traversal.", direction: "Bidirectional" },
  { type: "bye", description: "A peer signals it is leaving the session.", direction: "Client → Server" },
];

const directionColors: Record<string, string> = {
  "Client → Server": "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  "Server → Client": "bg-blue-500/15 text-blue-400 border-blue-500/30",
  "Bidirectional": "bg-violet-500/15 text-violet-400 border-violet-500/30",
};

export default function WebrtcDocsPage() {
  return (
    <DocPageLayout protocolKey="webrtc">
      <div>
        <span className="text-xs font-semibold text-rose-400 uppercase tracking-wider">{doc.category}</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground mb-3 tracking-tight">{doc.name}</h1>
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed italic">{doc.tagline}</p>
      </div>

      <div className="rounded-2xl border border-border bg-muted/15 p-4 sm:p-6">
        <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-4">Peer-to-Peer Connection</h3>
        <div className="flex items-center justify-between px-4 py-6">
          <div className="flex flex-col items-center gap-2">
            <div className="h-14 w-14 rounded-xl bg-rose-500/10 border-2 border-rose-500/40 flex items-center justify-center">
              <span className="text-xl">🖥️</span>
            </div>
            <span className="text-xs font-bold text-rose-400">Peer A</span>
            <span className="text-[10px] text-muted-foreground">Caller</span>
          </div>

          <div className="flex-1 mx-4 flex flex-col items-center gap-2">
            <span className="text-[10px] font-mono text-rose-400">SDP Offer →</span>
            <div className="w-full h-[2px] bg-gradient-to-r from-rose-500/50 via-violet-500/50 to-blue-500/50 rounded-full" />
            <span className="text-[10px] font-mono text-blue-400">← SDP Answer</span>
            <div className="w-full h-[2px] bg-gradient-to-r from-blue-500/50 via-violet-500/50 to-rose-500/50 rounded-full" />
            <span className="text-[10px] font-mono text-violet-400">◄══ ICE Candidates ══►</span>
            <div className="flex items-center gap-2 mt-1 text-[10px] text-muted-foreground">
              <span>STUN</span>
              <span>→</span>
              <span>NAT Traversal</span>
              <span>→</span>
              <span>DTLS-SRTP</span>
            </div>
          </div>

          <div className="flex flex-col items-center gap-2">
            <div className="h-14 w-14 rounded-xl bg-blue-500/10 border-2 border-blue-500/40 flex items-center justify-center">
              <span className="text-xl">🖥️</span>
            </div>
            <span className="text-xs font-bold text-blue-400">Peer B</span>
            <span className="text-[10px] text-muted-foreground">Callee</span>
          </div>
        </div>

        <div className="flex justify-center -mt-4 mb-2">
          <div className="flex flex-col items-center gap-1 px-4 py-2 rounded-lg bg-violet-500/10 border border-violet-500/30">
            <span className="text-sm">📡</span>
            <span className="text-[10px] font-bold text-violet-400">Signaling Server</span>
            <span className="text-[9px] text-muted-foreground font-mono">WebSocket / HTTP</span>
          </div>
        </div>
      </div>

      <div className="text-foreground text-[15px] sm:text-base leading-relaxed space-y-4">
        <p>{doc.description}</p>
        <h3 className="text-xl font-bold text-foreground pt-2">How it Works</h3>
        <p>{doc.overview}</p>
      </div>

      <div className="rounded-xl border border-border bg-background/40 p-5">
        <h3 className="text-sm font-bold text-foreground mb-3">Signaling Messages</h3>
        <div className="flex flex-col gap-2">
          {signalingMessages.map((m, i) => (
            <div key={i} className="flex items-center justify-between px-3 py-2.5 rounded-lg bg-muted/30 border border-border/40">
              <div className="flex items-center gap-3">
                <span className="text-sm">📨</span>
                <code className="text-xs font-mono text-foreground font-semibold">{m.type}</code>
              </div>
              <div className="flex items-center gap-3">
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${directionColors[m.direction]}`}>
                  {m.direction}
                </span>
                <span className="text-xs text-muted-foreground max-w-[220px] text-right hidden sm:block">{m.description}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-border bg-background/40 p-5">
        <h3 className="text-sm font-bold text-foreground mb-3">NAT Traversal Stack</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="rounded-lg border border-rose-500/20 bg-rose-500/5 p-3">
            <span className="text-xs font-bold text-rose-400">ICE</span>
            <p className="text-[11px] text-muted-foreground mt-1">Interactive Connectivity Establishment — finds the best path between peers.</p>
          </div>
          <div className="rounded-lg border border-amber-500/20 bg-amber-500/5 p-3">
            <span className="text-xs font-bold text-amber-400">STUN</span>
            <p className="text-[11px] text-muted-foreground mt-1">Session Traversal Utilities for NAT — discovers public IP/port.</p>
          </div>
          <div className="rounded-lg border border-cyan-500/20 bg-cyan-500/5 p-3">
            <span className="text-xs font-bold text-cyan-400">TURN</span>
            <p className="text-[11px] text-muted-foreground mt-1">Relay server fallback when direct P2P fails (symmetric NAT).</p>
          </div>
        </div>
      </div>

      <DocsConsole doc={doc} />
      <CodeTabs snippets={doc.codeSnippets} />
      <ProsConsGrid pros={doc.pros} cons={doc.cons} />
    </DocPageLayout>
  );
}
