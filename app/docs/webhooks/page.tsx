"use client";

import DocPageLayout from "@/components/docs/DocPageLayout";
import CodeTabs from "@/components/docs/CodeTabs";
import ProsConsGrid from "@/components/docs/ProsConsGrid";
import DocsConsole from "@/components/DocsConsole";
import { protocolDocs } from "@/data/protocolDocs";

const doc = protocolDocs.webhooks;

const events = [
  {
    event: "payment.succeeded",
    category: "Payment",
    description: "A payment was successfully processed.",
  },
  {
    event: "payment.failed",
    category: "Payment",
    description: "A payment attempt failed.",
  },
  {
    event: "customer.created",
    category: "Customer",
    description: "A new customer account was created.",
  },
  {
    event: "customer.updated",
    category: "Customer",
    description: "Customer profile information changed.",
  },
  {
    event: "invoice.paid",
    category: "Invoice",
    description: "An invoice was paid successfully.",
  },
  {
    event: "invoice.payment_failed",
    category: "Invoice",
    description: "An invoice payment attempt failed.",
  },
];

const categoryColors: Record<string, string> = {
  Payment: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  Customer: "bg-blue-500/15 text-blue-400 border-blue-500/30",
  Invoice: "bg-amber-500/15 text-amber-400 border-amber-500/30",
};

export default function WebhooksDocsPage() {
  return (
    <DocPageLayout protocolKey="webhooks">
      <div>
        <span className="text-xs font-semibold text-orange-400 uppercase tracking-wider">
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
          Live Event Feed
        </h3>
        <div className="flex flex-col gap-2">
          {events.map((ev, i) => (
            <div
              key={i}
              className="flex items-center justify-between px-3 py-2.5 rounded-lg bg-background/60 border border-border/50 hover:border-border transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="text-orange-400 text-sm">⚡</span>
                <code className="text-xs font-mono text-foreground font-semibold">
                  {ev.event}
                </code>
              </div>
              <div className="flex items-center gap-3">
                <span
                  className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${categoryColors[ev.category] || "bg-muted text-muted-foreground border-border"}`}
                >
                  {ev.category}
                </span>
                <span className="text-[10px] text-emerald-400 font-mono font-bold">
                  200 OK
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="text-foreground text-[15px] sm:text-base leading-relaxed space-y-4">
        <p>{doc.description}</p>
        <h3 className="text-xl font-bold text-foreground pt-2">How it Works</h3>
        <p>{doc.overview}</p>
      </div>

      <div className="rounded-2xl border border-border bg-muted/15 p-4 sm:p-6">
        <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-4">
          Webhook Flow
        </h3>
        <div className="flex items-center justify-between px-4 py-6">
          <div className="flex flex-col items-center gap-2">
            <div className="h-14 w-14 rounded-xl bg-orange-500/10 border-2 border-orange-500/40 flex items-center justify-center">
              <span className="text-xl">🏦</span>
            </div>
            <span className="text-xs font-bold text-orange-400">3rd Party</span>
            <span className="text-[10px] text-muted-foreground">(Stripe)</span>
          </div>

          <div className="flex-1 mx-4 flex flex-col items-center gap-1">
            <span className="text-[10px] font-mono text-orange-400">
              POST /webhooks/stripe →
            </span>
            <div className="w-full h-0.5 bg-linear-to-r from-orange-500/50 to-emerald-500/50 rounded-full" />
            <span className="text-[10px] font-mono text-emerald-400">
              ← 200 OK
            </span>
          </div>

          <div className="flex flex-col items-center gap-2">
            <div className="h-14 w-14 rounded-xl bg-emerald-500/10 border-2 border-emerald-500/40 flex items-center justify-center">
              <span className="text-xl">⚙️</span>
            </div>
            <span className="text-xs font-bold text-emerald-400">
              Your Server
            </span>
            <span className="text-[10px] text-muted-foreground">
              /webhooks/stripe
            </span>
          </div>
        </div>
        <div className="flex justify-center mt-2">
          <div className="flex items-center gap-4 text-[10px] text-muted-foreground">
            <span>1. Event fires</span>
            <span>→</span>
            <span>2. Verify signature</span>
            <span>→</span>
            <span>3. Update DB</span>
            <span>→</span>
            <span>4. Return 200</span>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-background/40 p-5">
        <h3 className="text-sm font-bold text-foreground mb-3">Event Types</h3>
        <div className="flex flex-col gap-2">
          {events.map((ev, i) => (
            <div
              key={i}
              className="flex items-center gap-3 px-3 py-2 rounded-lg bg-muted/30 border border-border/40"
            >
              <code className="text-xs font-mono text-foreground font-semibold shrink-0">
                {ev.event}
              </code>
              <span
                className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border shrink-0 ${categoryColors[ev.category] || "bg-muted text-muted-foreground border-border"}`}
              >
                {ev.category}
              </span>
              <span className="text-xs text-muted-foreground">
                {ev.description}
              </span>
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
