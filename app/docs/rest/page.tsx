"use client";

import DocPageLayout from "@/components/docs/DocPageLayout";
import CodeTabs from "@/components/docs/CodeTabs";
import ProsConsGrid from "@/components/docs/ProsConsGrid";
import MethodBadges from "@/components/docs/MethodBadges";
import StatusBadge from "@/components/docs/StatusBadge";
import DocsConsole from "@/components/DocsConsole";
import { protocolDocs } from "@/data/protocolDocs";

const doc = protocolDocs.rest;

export default function RestDocsPage() {
  return (
    <DocPageLayout protocolKey="rest">
      <div>
        <span className="text-xs font-semibold text-primary uppercase tracking-wider">{doc.category}</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground mb-3 tracking-tight">{doc.name}</h1>
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed italic">{doc.tagline}</p>
      </div>

      <div className="rounded-2xl border border-border bg-muted/15 p-4 sm:p-6">
        <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-4">Architecture Blueprint</h3>
        <div className="relative flex items-center justify-between px-4 sm:px-10 py-6">
          <div className="flex flex-col items-center gap-2 z-10">
            <div className="h-16 w-16 rounded-xl bg-emerald-500/10 border-2 border-emerald-500/40 flex items-center justify-center">
              <span className="text-2xl">🖥️</span>
            </div>
            <span className="text-xs font-bold text-emerald-400">Client</span>
          </div>

          <div className="absolute left-24 right-24 sm:left-32 sm:right-32 flex flex-col items-center gap-2">
            <div className="flex items-center gap-3 text-[10px] font-mono text-muted-foreground">
              <span className="text-emerald-400">GET/POST/PUT/DEL →</span>
              <span className="text-blue-400">← JSON</span>
            </div>
            <div className="w-full h-[2px] bg-gradient-to-r from-emerald-500/50 via-border to-blue-500/50 rounded-full" />
            <div className="flex gap-2 text-[10px] font-mono">
              <span className="px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">GET</span>
              <span className="px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">POST</span>
              <span className="px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">PUT</span>
              <span className="px-1.5 py-0.5 rounded bg-red-500/10 text-red-400 border border-red-500/20">DEL</span>
            </div>
          </div>

          <div className="flex flex-col items-center gap-2 z-10">
            <div className="h-16 w-16 rounded-xl bg-blue-500/10 border-2 border-blue-500/40 flex items-center justify-center">
              <span className="text-2xl">⚙️</span>
            </div>
            <span className="text-xs font-bold text-blue-400">REST Server</span>
            <span className="text-[10px] text-muted-foreground font-mono">/api/v1</span>
          </div>
        </div>
      </div>

      <div className="text-foreground text-[15px] sm:text-base leading-relaxed space-y-4">
        <p>{doc.description}</p>
        <h3 className="text-xl font-bold text-foreground pt-2">How it Works</h3>
        <p>{doc.overview}</p>
      </div>

      <div className="rounded-xl border border-border bg-background/40 p-5">
        <h3 className="text-sm font-bold text-foreground mb-3">Resources & Methods</h3>
        <div className="flex flex-col gap-2">
          {doc.paths.map((path) => (
            <div key={path} className="flex items-center justify-between px-3 py-2 rounded-lg bg-muted/40 border border-border/50">
              <code className="text-xs font-mono text-foreground">{path}</code>
              <MethodBadges methods={doc.methods} />
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-border bg-background/40 p-5">
        <h3 className="text-sm font-bold text-foreground mb-3">HTTP Status Codes</h3>
        <div className="flex flex-wrap gap-2">
          <StatusBadge code={200} name="OK" />
          <StatusBadge code={201} name="Created" />
          <StatusBadge code={304} name="Not Modified" />
          <StatusBadge code={400} name="Bad Request" />
          <StatusBadge code={404} name="Not Found" />
          <StatusBadge code={500} name="Server Error" />
        </div>
      </div>

      <DocsConsole doc={doc} />
      <CodeTabs snippets={doc.codeSnippets} />
      <ProsConsGrid pros={doc.pros} cons={doc.cons} />
    </DocPageLayout>
  );
}
