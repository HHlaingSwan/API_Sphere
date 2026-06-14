"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { protocolDocs } from "@/data/protocolDocs";
import { ArrowLeft, ArrowRight, ArrowUp } from "lucide-react";

const protocolOrder = ["rest", "graphql", "webhooks", "websockets", "grpc", "mcp", "soap", "webrtc"];

export default function DocPageLayout({
  protocolKey,
  children,
}: {
  protocolKey: string;
  children: React.ReactNode;
}) {
  const router = useRouter();
  const doc = protocolDocs[protocolKey];

  const currentIndex = protocolOrder.indexOf(protocolKey);
  const prevKey = protocolOrder[(currentIndex - 1 + protocolOrder.length) % protocolOrder.length];
  const nextKey = protocolOrder[(currentIndex + 1) % protocolOrder.length];
  const prevDoc = protocolDocs[prevKey];
  const nextDoc = protocolDocs[nextKey];

  return (
    <div className="h-screen flex flex-col bg-background text-foreground">
      <Navbar />
      <div className="flex-1 flex overflow-hidden">
        <main className="flex-1 overflow-y-auto">
          <div className="w-full max-w-4xl mx-auto flex flex-col gap-8 px-4 sm:px-6 lg:px-8 py-8">
            <Link
              href="/docs"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors w-fit"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>All Protocols</span>
            </Link>

            {children}

            {/* Prev / Next Navigation */}
            <div className="border-t border-border pt-6 flex items-center justify-between gap-4">
              <Link
                href={`/docs/${prevKey}`}
                className="flex items-center gap-2 px-4 py-3 rounded-xl border border-border bg-background/40 hover:bg-muted/40 transition-colors group flex-1 min-w-0"
              >
                <ArrowUp className="h-4 w-4 text-muted-foreground -rotate-90 shrink-0 group-hover:text-foreground transition-colors" />
                <div className="min-w-0">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block">Previous</span>
                  <span className="text-sm font-semibold text-foreground truncate block">{prevDoc.name}</span>
                </div>
              </Link>
              <Link
                href={`/docs/${nextKey}`}
                className="flex items-center justify-end gap-2 px-4 py-3 rounded-xl border border-border bg-background/40 hover:bg-muted/40 transition-colors group flex-1 min-w-0 text-right"
              >
                <div className="min-w-0">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block">Next</span>
                  <span className="text-sm font-semibold text-foreground truncate block">{nextDoc.name}</span>
                </div>
                <ArrowUp className="h-4 w-4 text-muted-foreground rotate-90 shrink-0 group-hover:text-foreground transition-colors" />
              </Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
