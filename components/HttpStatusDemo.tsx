"use client";

import { useState, useMemo, memo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Loader2, Hash, Copy, Check, Trash2 } from "lucide-react";

interface StatusCodeItem {
  code: number;
  name: string;
  category: string;
}

const STATUS_CODES: StatusCodeItem[] = [
  { code: 200, name: "OK", category: "2xx Success" },
  { code: 201, name: "Created", category: "2xx Success" },
  { code: 304, name: "Not Modified", category: "3xx Redirection" },
  { code: 400, name: "Bad Request", category: "4xx Client Error" },
  { code: 401, name: "Unauthorized", category: "4xx Client Error" },
  { code: 403, name: "Forbidden", category: "4xx Client Error" },
  { code: 404, name: "Not Found", category: "4xx Client Error" },
  { code: 405, name: "Method Not Allowed", category: "4xx Client Error" },
  { code: 429, name: "Too Many Requests", category: "4xx Client Error" },
  { code: 500, name: "Internal Server Error", category: "5xx Server Error" },
];

const CATEGORIES = [
  "2xx Success",
  "3xx Redirection",
  "4xx Client Error",
  "5xx Server Error",
] as const;

const categoryDotColor: Record<string, string> = {
  "2xx Success": "bg-green-500",
  "3xx Redirection": "bg-blue-500",
  "4xx Client Error": "bg-amber-500",
  "5xx Server Error": "bg-red-500",
};

type Tab = "headers" | "body" | "raw";

function statusBadgeColor(status: number): string {
  if (status >= 200 && status < 300)
    return "bg-green-500/10 border-green-500/30 text-green-400";
  if (status >= 300 && status < 400)
    return "bg-blue-500/10 border-blue-500/30 text-blue-400";
  if (status >= 400 && status < 500)
    return "bg-amber-500/10 border-amber-500/30 text-amber-400";
  if (status >= 500) return "bg-red-500/10 border-red-500/30 text-red-500";
  return "bg-muted/40 border-border text-muted-foreground";
}

function statusDotColor(status: number): string {
  if (status >= 200 && status < 300) return "bg-green-500";
  if (status >= 300 && status < 400) return "bg-blue-500";
  if (status >= 400 && status < 500) return "bg-amber-500";
  if (status >= 500) return "bg-red-500";
  return "bg-muted-foreground";
}

const TerminalHeader = ({
  title,
  extra,
  showDots = true,
}: {
  title: string;
  extra?: React.ReactNode;
  showDots?: boolean;
}) => (
  <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-border bg-muted/60 select-none shrink-0">
    {showDots && (
      <>
        <span className="h-3 w-3 rounded-full bg-red-500/80" />
        <span className="h-3 w-3 rounded-full bg-amber-500/80" />
        <span className="h-3 w-3 rounded-full bg-green-500/80" />
      </>
    )}
    <span
      className={`${showDots ? "ml-2" : ""} text-xs font-semibold text-muted-foreground flex items-center gap-1.5`}
    >
      <Terminal className="h-3.5 w-3.5" />
      {title}
    </span>
    {extra && <span className="ml-auto">{extra}</span>}
  </div>
);

const StatusButton = memo(function StatusButton({
  code,
  name,
  isSelected,
  disabled,
  onClick,
}: {
  code: number;
  name: string;
  isSelected: boolean;
  disabled: boolean;
  onClick: () => void;
}) {
  const item = STATUS_CODES.find((s) => s.code === code);
  const dotColor = item
    ? categoryDotColor[item.category]
    : "bg-muted-foreground";

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-mono font-bold border transition-all cursor-pointer ${
        isSelected
          ? "bg-primary/10 border-primary/40 text-primary shadow-sm"
          : "bg-muted/20 border-border text-foreground hover:bg-muted/40"
      } disabled:opacity-50 disabled:cursor-not-allowed`}
    >
      <span
        className={`h-2 w-2 rounded-full shrink-0 ${isSelected ? "bg-primary" : dotColor}`}
      />
      <span>{code}</span>
      <span
        className={`text-[10px] font-medium ${isSelected ? "text-primary/70" : "text-muted-foreground"}`}
      >
        {name}
      </span>
    </button>
  );
});

export default function HttpStatusDemo() {
  const [selected, setSelected] = useState(200);
  const [activeTab, setActiveTab] = useState<Tab>("body");
  const [copied, setCopied] = useState(false);
  const [result, setResult] = useState<{
    status: number;
    statusText: string;
    headers: Record<string, string>;
    body: string;
    responseTime: number;
  } | null>(null);
  const [loading, setLoading] = useState(false);

  const groupedCodes = useMemo(() => {
    return CATEGORIES.map((cat) => ({
      category: cat,
      codes: STATUS_CODES.filter((c) => c.category === cat),
    })).filter((g) => g.codes.length > 0);
  }, []);

  const rawResponse = useMemo(() => {
    if (!result) return "";
    const headerLines = Object.entries(result.headers)
      .map(([k, v]) => `${k}: ${v}`)
      .join("\n");
    return `HTTP/1.1 ${result.status} ${result.statusText}\n${headerLines ? "\n" + headerLines : ""}\n\n${result.body}`;
  }, [result]);

  const currentTabContent = useMemo(() => {
    if (!result) return "";
    if (activeTab === "headers") {
      return (
        Object.entries(result.headers)
          .map(([k, v]) => `${k}: ${v}`)
          .join("\n") || "(No custom headers)"
      );
    }
    if (activeTab === "body") return result.body;
    return rawResponse;
  }, [result, activeTab, rawResponse]);

  const callEndpoint = useCallback(async (code: number) => {
    setSelected(code);
    setLoading(true);
    setResult(null);

    const start = performance.now();
    try {
      const res = await fetch(`/api/status-codes/${code}`);
      const elapsed = Math.round(performance.now() - start);
      const body = await res.json();

      const headers: Record<string, string> = {};
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
          headers[key] = val;
        }
      });

      const statusText =
        STATUS_CODES.find((c) => c.code === code)?.name ??
        (code === 304 ? "Not Modified" : "");

      setResult({
        status: res.status,
        statusText,
        headers,
        body: JSON.stringify(body, null, 2),
        responseTime: elapsed,
      });
    } catch {
      setResult({
        status: 0,
        statusText: "Error",
        headers: {},
        body: JSON.stringify(
          { error: "Failed to connect to the API endpoint." },
          null,
          2,
        ),
        responseTime: Math.round(performance.now() - start),
      });
    } finally {
      setLoading(false);
    }
  }, []);

  const copyToClipboard = useCallback(async () => {
    if (!currentTabContent) return;
    await navigator.clipboard.writeText(currentTabContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [currentTabContent]);

  const clearResponse = useCallback(() => {
    setResult(null);
    setActiveTab("body");
  }, []);

  return (
    <div className="w-full flex flex-col lg:flex-row gap-0 bg-background rounded-2xl border border-border shadow-2xl overflow-hidden">
      {/* Left Panel - API Client */}
      <div className="w-full lg:w-[30%] flex flex-col border-b lg:border-b-0 lg:border-r border-border">
        <TerminalHeader
          title="API Client"
          extra={
            <span className="text-[10px] font-mono text-primary font-bold">
              GET
            </span>
          }
        />

        {/* URL Bar */}
        <div className="px-4 py-3 border-b border-border bg-muted/30">
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-background border border-border font-mono text-xs">
            <span className="text-green-400 font-bold">GET</span>
            <span className="text-muted-foreground">/api/status-codes/</span>
            <span className="text-primary font-bold">{selected}</span>
          </div>
        </div>

        {/* Status Code Grid */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {groupedCodes.map(({ category, codes }) => (
            <div key={category}>
              <span className="text-[10px] font-semibold text-muted-foreground/60 uppercase tracking-wider px-1 pb-2 block">
                {category}
              </span>
              <div className="flex flex-col gap-1.5">
                {codes.map((sc) => (
                  <StatusButton
                    key={sc.code}
                    code={sc.code}
                    name={sc.name}
                    isSelected={selected === sc.code}
                    disabled={loading}
                    onClick={() => callEndpoint(sc.code)}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Panel - Response */}
      <div className="w-full lg:w-[70%] flex flex-col min-h-0">
        <TerminalHeader
          title="Response"
          showDots={false}
          extra={
            result ? (
              <span className="text-[10px] font-mono text-muted-foreground">
                {result.responseTime} ms
              </span>
            ) : (
              <span className="text-[10px] font-mono text-muted-foreground">
                0 ms
              </span>
            )
          }
        />

        {/* Status Badge */}
        <AnimatePresence mode="wait">
          <motion.div
            key={result ? result.status : "empty"}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            className={`mx-4 mt-4 flex items-center gap-3 px-4 py-3 rounded-xl border ${
              result
                ? statusBadgeColor(result.status)
                : "bg-muted/20 border-border"
            }`}
          >
            {result ? (
              <>
                <div
                  className={`h-3 w-3 rounded-full ${statusDotColor(result.status)}`}
                />
                <span className="text-xl font-extrabold font-mono tracking-tight">
                  {result.status}
                </span>
                <span className="text-sm font-semibold opacity-80">
                  {result.statusText}
                </span>
                <span className="ml-auto text-[10px] uppercase tracking-wider text-muted-foreground/60 font-mono">
                  HTTP/1.1
                </span>
              </>
            ) : (
              <span className="text-sm text-muted-foreground">
                Click a status code to see the response
              </span>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Tabs */}
        {result && (
          <div className="flex items-center gap-0 px-4 mt-4 border-b border-border">
            {(["headers", "body", "raw"] as Tab[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-xs font-semibold capitalize transition-colors border-b-2 ${
                  activeTab === tab
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab}
              </button>
            ))}
            <div className="ml-auto flex items-center gap-1 py-1">
              <button
                onClick={copyToClipboard}
                className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                title="Copy"
              >
                {copied ? (
                  <Check className="h-3.5 w-3.5 text-green-400" />
                ) : (
                  <Copy className="h-3.5 w-3.5" />
                )}
              </button>
              <button
                onClick={clearResponse}
                className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                title="Clear"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Response Body */}
        <div
          className="flex-1 overflow-y-auto p-4 min-h-0"
          style={{ maxHeight: "24rem" }}
        >
          <div className="font-mono text-[11px] sm:text-xs leading-relaxed">
            {loading ? (
              <div className="flex items-center justify-center h-32">
                <Loader2 className="h-5 w-5 animate-spin text-primary" />
              </div>
            ) : result ? (
              <pre className="whitespace-pre-wrap wrap-break-word text-foreground/90">
                {currentTabContent}
              </pre>
            ) : (
              <div className="flex flex-col items-center justify-center h-32 text-muted-foreground gap-2">
                <Hash className="h-8 w-8 opacity-20" />
                <span className="italic text-xs">Waiting for request...</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
