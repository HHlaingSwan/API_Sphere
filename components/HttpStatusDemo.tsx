"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Send, Loader2, Hash, Info } from "lucide-react";

interface StatusCodeItem {
  code: number;
  name: string;
  category: string;
  color: string;
}

const STATUS_CODES: StatusCodeItem[] = [
  {
    code: 200,
    name: "OK",
    category: "2xx Success",
    color: "text-green-accent border-green-500/30",
  },
  {
    code: 201,
    name: "Created",
    category: "2xx Success",
    color: "text-green-accent border-green-500/30",
  },
  {
    code: 304,
    name: "Not Modified",
    category: "3xx Redirection",
    color: "text-blue-400 border-blue-500/30",
  },
  {
    code: 400,
    name: "Bad Request",
    category: "4xx Client Error",
    color: "text-amber-400 border-amber-500/30",
  },
  {
    code: 401,
    name: "Unauthorized",
    category: "4xx Client Error",
    color: "text-amber-400 border-amber-500/30",
  },
  {
    code: 403,
    name: "Forbidden",
    category: "4xx Client Error",
    color: "text-amber-400 border-amber-500/30",
  },
  {
    code: 404,
    name: "Not Found",
    category: "4xx Client Error",
    color: "text-amber-400 border-amber-500/30",
  },
  {
    code: 405,
    name: "Method Not Allowed",
    category: "4xx Client Error",
    color: "text-red-400 border-red-500/30",
  },
  {
    code: 429,
    name: "Too Many Requests",
    category: "4xx Client Error",
    color: "text-red-400 border-red-500/30",
  },
  {
    code: 500,
    name: "Internal Server Error",
    category: "5xx Server Error",
    color: "text-red-500 border-red-500/30",
  },
];

const CATEGORIES = [
  "2xx Success",
  "3xx Redirection",
  "4xx Client Error",
  "5xx Server Error",
] as const;

function statusColor(status: number): string {
  if (status >= 200 && status < 300) return "bg-green-500";
  if (status >= 300 && status < 400) return "bg-blue-500";
  if (status >= 400 && status < 500) return "bg-amber-500";
  if (status >= 500) return "bg-red-500";
  return "bg-muted-foreground";
}

function statusBgClass(status: number): string {
  if (status >= 200 && status < 300)
    return "bg-green-500/10 border-green-500/30 text-green-400";
  if (status >= 300 && status < 400)
    return "bg-blue-500/10 border-blue-500/30 text-blue-400";
  if (status >= 400 && status < 500)
    return "bg-amber-500/10 border-amber-500/30 text-amber-400";
  if (status >= 500) return "bg-red-500/10 border-red-500/30 text-red-500";
  return "bg-muted/40 border-border text-muted-foreground";
}

export default function HttpStatusDemo() {
  const [selected, setSelected] = useState(200);
  const [result, setResult] = useState<{
    status: number;
    headers: string;
    body: string;
  } | null>(null);
  const [loading, setLoading] = useState(false);

  const callEndpoint = async (code: number) => {
    setSelected(code);
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch(`/api/status-codes/${code}`);
      const body = await res.json();
      const headerLines: string[] = [];
      res.headers.forEach((val, key) => {
        if (
          ![
            "content-type",
            "content-length",
            "date",
            "connection",
            "vary",
            "transfer-encoding",
            "keep-alive",
          ].includes(key)
        ) {
          headerLines.push(`${key}: ${val}`);
        }
      });
      setResult({
        status: res.status,
        headers: headerLines.join("\n"),
        body: JSON.stringify(body, null, 2),
      });
    } catch {
      setResult({
        status: 0,
        headers: "",
        body: JSON.stringify(
          { error: "Failed to connect to the API endpoint." },
          null,
          2,
        ),
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex  flex-col lg:flex-row gap-6  bg-background p-6 rounded-2xl border border-border shadow-2xl relative overflow-hidden">
      {/* Control Panel */}
      <div className="w-full lg:w-[30%]  justify-around flex flex-col gap-4 z-10">
        <div>
          <h3 className="text-lg font-bold text-foreground mb-1">
            <Hash className="h-4 w-4 inline mr-1.5 text-primary" />
            HTTP Status Code Playground
          </h3>
        </div>

        <div className="flex flex-col  gap-2">
          {CATEGORIES.map((cat) => {
            const codes = STATUS_CODES.filter((c) => c.category === cat);
            if (!codes.length) return null;
            return (
              <div key={cat}>
                <span className="text-[10px] font-semibold text-muted-foreground/60 uppercase tracking-wider p-2 block">
                  {cat}
                </span>
                <div className="flex flex-wrap gap-1">
                  {codes.map((sc) => (
                    <button
                      key={sc.code}
                      onClick={() => callEndpoint(sc.code)}
                      disabled={loading}
                      className={`px-2.5 py-1.5 rounded-lg text-xs font-mono font-bold border transition-all ${
                        selected === sc.code
                          ? `bg-primary/10 border-primary/40 text-primary shadow-sm`
                          : `${sc.color} bg-muted/20 hover:bg-muted/40`
                      } disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                      {sc.code}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <button
          onClick={() => callEndpoint(selected)}
          disabled={loading}
          className="w-full mt-2 py-2.5 rounded-xl bg-linear-to-r from-violet-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 text-white text-xs font-semibold shadow-lg shadow-violet-500/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {loading ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
          ) : (
            <Send className="h-3.5 w-3.5" />
          )}
          {loading ? "Requesting..." : `Send GET /api/status-codes/${selected}`}
        </button>
      </div>

      {/* Response Viewer */}
      <div className="w-full lg:w-[70%] flex flex-col gap-4 z-10">
        {/* Status Code Badge */}
        <AnimatePresence mode="wait">
          <motion.div
            key={result ? result.status : "empty"}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className={`flex items-center gap-4 px-5 py-4 rounded-xl border ${result ? statusBgClass(result.status) : "bg-muted/20 border-border"}`}
          >
            {result ? (
              <>
                <div
                  className={`h-4 w-4 rounded-full ${statusColor(result.status)}`}
                />
                <span className="text-2xl sm:text-3xl font-extrabold font-mono tracking-tight">
                  {result.status}
                </span>
                <span className="text-sm sm:text-base font-semibold opacity-80">
                  {STATUS_CODES.find((c) => c.code === result.status)?.name ??
                    (result.status === 304 ? "Not Modified" : "")}
                </span>
                <span className="ml-auto text-[10px] uppercase tracking-wider text-muted-foreground/60 font-mono">
                  HTTP/{result.status >= 100 ? "1.1" : "?"}
                </span>
              </>
            ) : (
              <>
                <Info className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  Select a status code and click send to see the live response
                </span>
              </>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Terminal-style Response */}
        <div className="flex flex-col rounded-xl border border-border bg-background font-mono text-[11px] sm:text-xs text-foreground h-80 overflow-hidden">
          <div className="flex items-center gap-1.5 px-4 py-2 border-b border-border bg-muted/60 text-muted-foreground select-none shrink-0">
            <Terminal className="h-3.5 w-3.5" />
            <span>Response</span>
            {result && (
              <span className="ml-auto text-[10px] text-muted-foreground/60">
                {result.headers.split("\n").length} header
                {result.headers.split("\n").length !== 1 ? "s" : ""}
              </span>
            )}
          </div>
          <div className="flex-1 overflow-y-auto p-4">
            {loading ? (
              <div className="flex items-center justify-center h-full">
                <Loader2 className="h-5 w-5 animate-spin text-primary" />
              </div>
            ) : result ? (
              <div className="space-y-3">
                {result.headers && (
                  <div>
                    <span className="text-muted-foreground text-[10px] font-semibold uppercase tracking-wider">
                      Response Headers
                    </span>
                    <pre className="mt-1 text-muted-foreground/80 whitespace-pre-wrap">
                      {result.headers}
                    </pre>
                  </div>
                )}
                <div>
                  <span className="text-muted-foreground text-[10px] font-semibold uppercase tracking-wider">
                    Body
                  </span>
                  <pre className="mt-1 text-foreground whitespace-pre-wrap overflow-x-auto">
                    {result.body}
                  </pre>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-muted-foreground italic">
                Waiting for request...
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
