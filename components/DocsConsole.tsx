"use client";

import { useState, useEffect } from "react";
import { Terminal, ChevronsUpDown, Play } from "lucide-react";
import { cn } from "@/lib/utils";
import { ProtocolDoc, MockResponseDetail } from "@/data/protocolDocs";

interface DocsConsoleProps {
  doc: ProtocolDoc;
}

export default function DocsConsole({ doc }: DocsConsoleProps) {
  const [consoleMethod, setConsoleMethod] = useState("");
  const [consolePath, setConsolePath] = useState("");
  const [consolePayload, setConsolePayload] = useState("");
  const [consoleResponse, setConsoleResponse] = useState<MockResponseDetail | null>(null);
  const [isConsoleExecuting, setIsConsoleExecuting] = useState(false);

  // Synchronize console options when protocol changes
  useEffect(() => {
    if (doc) {
      setConsoleMethod(doc.methods[0]);
      setConsolePath(doc.paths[0]);
      setConsolePayload(doc.defaultPayload);
      setConsoleResponse(null);
    }
  }, [doc]);

  const handleExecuteConsole = () => {
    setIsConsoleExecuting(true);
    setConsoleResponse(null);

    // Simulate network latency
    setTimeout(() => {
      const key = `${consoleMethod}:${consolePath}`;
      const response = doc.mockResponses[key] || {
        status: "404",
        statusText: "Not Found",
        headers: { "Content-Type": "application/json" },
        body: { error: `Endpoint mock for '${key}' not registered in visual console atlas.` }
      };

      setConsoleResponse(response);
      setIsConsoleExecuting(false);
    }, 1200);
  };

  return (
    <div className="glass-panel p-5 rounded-2xl flex flex-col gap-4 border-primary/10">
      <div>
        <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
          <Terminal className="h-4.5 w-4.5 text-primary" />
          <span>Sandbox API Console</span>
        </h3>
        <p className="text-[10px] text-muted-foreground mt-1">Configure client headers & properties to execute mock server requests.</p>
      </div>

      {/* Selector Fields */}
      <div className="flex flex-col gap-3">
        {/* Method & Path Row */}
        <div className="flex gap-2">
          {/* Method */}
          <div className="relative shrink-0 w-24">
            <select
              value={consoleMethod}
              onChange={(e) => setConsoleMethod(e.target.value)}
              className="w-full pl-3 pr-8 py-2 text-xs font-bold uppercase bg-background border border-border rounded-lg text-foreground appearance-none focus:outline-none focus:border-primary cursor-pointer"
            >
              {doc.methods.map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
            <ChevronsUpDown className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground h-3.5 w-3.5 pointer-events-none" />
          </div>

          {/* Path */}
          <div className="relative flex-1">
            <select
              value={consolePath}
              onChange={(e) => setConsolePath(e.target.value)}
              className="w-full pl-3 pr-8 py-2 text-xs bg-background border border-border rounded-lg text-foreground appearance-none focus:outline-none focus:border-primary font-mono cursor-pointer"
            >
              {doc.paths.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
            <ChevronsUpDown className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground h-3.5 w-3.5 pointer-events-none" />
          </div>
        </div>

        {/* JSON Payload Text Area */}
        {consoleMethod !== "GET" && consoleMethod !== "DELETE" && consoleMethod !== "CONNECT" && (
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] uppercase font-bold text-muted-foreground">Request Body (JSON)</label>
            <textarea
              rows={6}
              value={consolePayload}
              onChange={(e) => setConsolePayload(e.target.value)}
              className="w-full p-3 text-xs bg-background border border-border rounded-lg font-mono text-foreground focus:outline-none focus:border-primary"
            />
          </div>
        )}

        {/* Submit Trigger */}
        <button
          onClick={handleExecuteConsole}
          disabled={isConsoleExecuting}
          className="w-full py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-white text-xs font-semibold shadow-lg shadow-primary/20 flex items-center justify-center gap-2 transition-all disabled:opacity-50 cursor-pointer"
        >
          <Play className="h-3 w-3 fill-white" />
          <span>{isConsoleExecuting ? "Sending Packet..." : "Execute Call"}</span>
        </button>
      </div>

      {/* Response Display Box */}
      <div className="border-t border-border pt-4">
        <span className="text-[10px] uppercase font-bold text-muted-foreground block mb-2">Response Log</span>

        <div className="rounded-xl border border-border bg-background overflow-hidden font-mono text-[11px] h-56 flex flex-col">
          {isConsoleExecuting ? (
            <div className="flex-1 flex flex-col items-center justify-center gap-2 text-muted-foreground italic bg-background/50">
              <div className="h-4 w-4 border-2 border-t-transparent border-violet-500 rounded-full animate-spin" />
              <span>Awaiting Server Response...</span>
            </div>
          ) : consoleResponse ? (
            <div className="flex-1 flex flex-col h-full overflow-hidden">
              {/* Headers & Stats */}
              <div className="px-3 py-2 border-b border-border bg-muted/60 flex items-center justify-between text-[10px]">
                <span className={cn(
                  "font-bold",
                  consoleResponse.status.startsWith("2") || consoleResponse.status.includes("0") ? "text-emerald-400" : "text-amber-500"
                )}>
                  STATUS: {consoleResponse.status} {consoleResponse.statusText}
                </span>
                <span className="text-muted-foreground">JSON</span>
              </div>
              {/* Headers List */}
              <div className="px-3 py-1.5 border-b border-border text-[9px] text-muted-foreground max-h-16 overflow-y-auto">
                {Object.entries(consoleResponse.headers).map(([k, v]) => (
                  <div key={k}>{k}: {v}</div>
                ))}
              </div>
              {/* Response Body */}
              <pre className="flex-1 p-3 overflow-y-auto bg-background text-emerald-300 leading-relaxed max-h-36 select-all">
                <code>{JSON.stringify(consoleResponse.body, null, 2)}</code>
              </pre>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center text-muted-foreground italic p-4 text-center">
              Enter request parameters and click "Execute Call" to view real-time data payloads.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
