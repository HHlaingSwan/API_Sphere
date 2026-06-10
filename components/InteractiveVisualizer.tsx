"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Laptop,
  Server,
  Send,
  Radio,
  Terminal,
  Bot,
  RefreshCw,
} from "lucide-react";

type ProtocolType = "REST" | "WebSockets" | "Webhooks" | "MCP";

interface LogMessage {
  timestamp: string;
  source: string;
  message: string;
  type: "info" | "request" | "response" | "stream" | "success";
}

export default function InteractiveVisualizer() {
  const [protocol, setProtocol] = useState<ProtocolType>("REST");
  const [logs, setLogs] = useState<LogMessage[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationStep, setAnimationStep] = useState<number>(0);

  const addLog = (
    source: string,
    message: string,
    type: LogMessage["type"] = "info",
  ) => {
    const time = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    setLogs((prev) =>
      [{ timestamp: time, source, message, type }, ...prev].slice(0, 15),
    );
  };

  // Triggered when switching protocols or running simulation
  const startSimulation = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setAnimationStep(0);
    setLogs([]);
  };

  useEffect(() => {
    startSimulation();
  }, [protocol]);

  // Simulation step controller
  useEffect(() => {
    if (!isAnimating) return;

    let timer: NodeJS.Timeout;

    if (protocol === "REST") {
      if (animationStep === 0) {
        addLog("Client", "Initiating GET /api/v1/users request...", "request");
        timer = setTimeout(() => setAnimationStep(1), 1000);
      } else if (animationStep === 1) {
        addLog("Network", "Packet traveling to REST Server...", "info");
        timer = setTimeout(() => setAnimationStep(2), 1200);
      } else if (animationStep === 2) {
        addLog("Server", "Request received. Querying database...", "info");
        timer = setTimeout(() => setAnimationStep(3), 1000);
      } else if (animationStep === 3) {
        addLog(
          "Server",
          "Returning HTTP 200 OK with User JSON Payload",
          "response",
        );
        timer = setTimeout(() => setAnimationStep(4), 1200);
      } else if (animationStep === 4) {
        addLog(
          "Client",
          "Response received successfully! Rendered 12 users.",
          "success",
        );
        timer = setTimeout(() => {
          setIsAnimating(false);
        }, 1000);
      }
    } else if (protocol === "WebSockets") {
      if (animationStep === 0) {
        addLog(
          "Client",
          "Initiating WebSocket handshake (GET ws://api.app/live)",
          "request",
        );
        timer = setTimeout(() => setAnimationStep(1), 1000);
      } else if (animationStep === 1) {
        addLog(
          "Server",
          "Handshake accepted. Upgrading connection to WebSocket protocol.",
          "success",
        );
        timer = setTimeout(() => setAnimationStep(2), 1200);
      } else if (animationStep === 2) {
        addLog(
          "Network",
          "TCP Tunnel established. Permanent bidirectional pipe open.",
          "success",
        );
        timer = setTimeout(() => setAnimationStep(3), 1000);
      } else if (animationStep === 3) {
        addLog("Server", "Pushing Stock price update: APPL +1.2%", "stream");
        timer = setTimeout(() => setAnimationStep(4), 1000);
      } else if (animationStep === 4) {
        addLog(
          "Client",
          "Pushing cursor movement event: x: 125, y: 412",
          "stream",
        );
        timer = setTimeout(() => setAnimationStep(5), 1000);
      } else if (animationStep === 5) {
        addLog(
          "Server",
          "Pushing Live chat notification: User 'Jane' joined",
          "stream",
        );
        timer = setTimeout(() => {
          // Keep loop or stop
          setIsAnimating(false);
        }, 1500);
      }
    } else if (protocol === "Webhooks") {
      if (animationStep === 0) {
        addLog(
          "Third Party (e.g. Stripe)",
          "Payment charge succeeded event triggered.",
          "info",
        );
        timer = setTimeout(() => setAnimationStep(1), 1000);
      } else if (animationStep === 1) {
        addLog(
          "Third Party",
          "POST https://my-app.com/webhooks/stripe (Sending JSON payload)",
          "request",
        );
        timer = setTimeout(() => setAnimationStep(2), 1200);
      } else if (animationStep === 2) {
        addLog(
          "Your Server",
          "Webhook received! Verifying webhook signature...",
          "info",
        );
        timer = setTimeout(() => setAnimationStep(3), 1200);
      } else if (animationStep === 3) {
        addLog(
          "Your Server",
          "Signature Verified. Database updated. Returning HTTP 200 OK.",
          "success",
        );
        timer = setTimeout(() => {
          setIsAnimating(false);
        }, 1000);
      }
    } else if (protocol === "MCP") {
      if (animationStep === 0) {
        addLog(
          "AI Client",
          "Asking model: 'What tables are in my db?' model needs database schema tool.",
          "info",
        );
        timer = setTimeout(() => setAnimationStep(1), 1000);
      } else if (animationStep === 1) {
        addLog(
          "AI Client",
          "MCP Host invokes tool 'list_tables' to MCP Database Server via SSE connection.",
          "request",
        );
        timer = setTimeout(() => setAnimationStep(2), 1200);
      } else if (animationStep === 2) {
        addLog(
          "MCP Server",
          "Invoking Local DB connection to extract schemas...",
          "info",
        );
        timer = setTimeout(() => setAnimationStep(3), 1000);
      } else if (animationStep === 3) {
        addLog(
          "MCP Server",
          "Returning database schema context: ['users', 'orders', 'products']",
          "response",
        );
        timer = setTimeout(() => setAnimationStep(4), 1200);
      } else if (animationStep === 4) {
        addLog(
          "AI Client",
          "MCP response parsed. AI Agent outputs correct tables list to user.",
          "success",
        );
        timer = setTimeout(() => {
          setIsAnimating(false);
        }, 1000);
      }
    }

    return () => clearTimeout(timer);
  }, [isAnimating, animationStep, protocol]);

  return (
    <div className="w-full flex flex-col lg:flex-row gap-6 bg-background p-6 rounded-2xl border border-border shadow-2xl relative overflow-hidden">
      {/* Background Decorative Blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 radial-glow pointer-events-none opacity-20" />

      {/* Control Panel (Left column on large screens) */}
      <div className="w-full lg:w-[30%] flex flex-col justify-around gap-4 z-10">
        <div>
          <h3 className="text-lg font-bold text-foreground mb-1">Visualizer</h3>
          <p className="text-xs text-muted-foreground">
            Select a protocol below to see the interactive communication cycle
            in real-time.
          </p>
        </div>

        {/* Protocol Selectors */}
        <div className="flex flex-col gap-2">
          {(["REST", "WebSockets", "Webhooks", "MCP"] as ProtocolType[]).map(
            (p) => (
              <button
                key={p}
                disabled={isAnimating}
                onClick={() => {
                  setProtocol(p);
                }}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border text-sm font-medium transition-all ${
                  protocol === p
                    ? "bg-primary/10 border-primary/50 text-foreground shadow-lg shadow-primary/5"
                    : "bg-muted/40 border-border text-muted-foreground hover:text-foreground hover:border-border hover:bg-muted/60"
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                <span>{p}</span>
                {protocol === p && isAnimating && (
                  <RefreshCw className="h-4 w-4 animate-spin text-primary" />
                )}
              </button>
            ),
          )}
        </div>

        <button
          onClick={startSimulation}
          disabled={isAnimating}
          className="w-full mt-2 py-2.5 rounded-xl bg-linear-to-r from-violet-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 text-white text-xs font-semibold shadow-lg shadow-violet-500/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
        >
          <Send className="h-3.5 w-3.5" />
          Trigger Simulation
        </button>
      </div>

      {/* Animation Stage & Terminal (Right column on large screens) */}
      <div className="w-full lg:w-[70%] flex flex-col gap-6 z-10">
        {/* Stage */}
        <div className="relative h-44 rounded-xl border border-border bg-muted/20 overflow-hidden flex items-center justify-between px-8 sm:px-16">
          {/* Client Node */}
          <div className="flex flex-col items-center gap-2 z-10">
            <div className="h-14 w-14 rounded-xl bg-muted border border-border flex items-center justify-center text-foreground shadow-md">
              {protocol === "MCP" ? (
                <Bot className="h-7 w-7 text-pink-accent" />
              ) : (
                <Laptop className="h-7 w-7" />
              )}
            </div>
            <span className="text-xs font-semibold text-muted-foreground">
              {protocol === "MCP" ? "AI Host" : "Browser Client"}
            </span>
          </div>

          {/* Pipe Connection */}
          <div className="absolute left-21 right-21 sm:left-29 sm:right-29 h-0.75 bg-muted rounded-full overflow-hidden">
            {/* Connection line styles */}
            {protocol === "WebSockets" && animationStep >= 2 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="w-full h-full bg-linear-to-r from-cyan-500 to-violet-500"
              />
            )}

            {/* Moving Packets */}
            <AnimatePresence>
              {isAnimating && (
                <>
                  {/* Client to Server Packet */}
                  {((protocol === "REST" && animationStep === 1) ||
                    (protocol === "WebSockets" && animationStep === 0) ||
                    (protocol === "MCP" && animationStep === 1)) && (
                    <motion.div
                      key="c-to-s"
                      initial={{ left: "0%" }}
                      animate={{ left: "100%" }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 1.2, ease: "easeInOut" }}
                      className="absolute top-1/2 -translate-y-1/2 h-3.5 w-3.5 rounded-full bg-primary shadow-[0_0_8px_var(--primary)]"
                    />
                  )}

                  {/* Server to Client Packet */}
                  {((protocol === "REST" && animationStep === 3) ||
                    (protocol === "WebSockets" && animationStep === 1) ||
                    (protocol === "Webhooks" && animationStep === 1) ||
                    (protocol === "MCP" && animationStep === 3)) && (
                    <motion.div
                      key="s-to-c"
                      initial={{ left: "100%" }}
                      animate={{ left: "0%" }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 1.2, ease: "easeInOut" }}
                      className="absolute top-1/2 -translate-y-1/2 h-3.5 w-3.5 rounded-full bg-secondary shadow-[0_0_8px_var(--secondary)]"
                    />
                  )}

                  {/* Bidirectional Stream Packets */}
                  {protocol === "WebSockets" && animationStep === 3 && (
                    <motion.div
                      key="ws-stream-s"
                      initial={{ left: "100%" }}
                      animate={{ left: "0%" }}
                      transition={{ duration: 1 }}
                      className="absolute top-1/2 -translate-y-1/2 h-2.5 w-2.5 rounded-full bg-secondary shadow-[0_0_6px_var(--secondary)]"
                    />
                  )}
                  {protocol === "WebSockets" && animationStep === 4 && (
                    <motion.div
                      key="ws-stream-c"
                      initial={{ left: "0%" }}
                      animate={{ left: "100%" }}
                      transition={{ duration: 1 }}
                      className="absolute top-1/2 -translate-y-1/2 h-2.5 w-2.5 rounded-full bg-primary shadow-[0_0_6px_var(--primary)]"
                    />
                  )}
                  {protocol === "WebSockets" && animationStep === 5 && (
                    <motion.div
                      key="ws-stream-s2"
                      initial={{ left: "100%" }}
                      animate={{ left: "0%" }}
                      transition={{ duration: 1 }}
                      className="absolute top-1/2 -translate-y-1/2 h-2.5 w-2.5 rounded-full bg-secondary shadow-[0_0_6px_var(--secondary)]"
                    />
                  )}
                </>
              )}
            </AnimatePresence>
          </div>

          {/* Server Node */}
          <div className="flex flex-col items-center gap-2 z-10">
            <div className="h-14 w-14 rounded-xl bg-muted border border-border flex items-center justify-center text-foreground shadow-md">
              {protocol === "MCP" ? (
                <Radio className="h-7 w-7 text-primary" />
              ) : (
                <Server className="h-7 w-7" />
              )}
            </div>
            <span className="text-xs font-semibold text-muted-foreground">
              {protocol === "Webhooks"
                ? "Your Server"
                : protocol === "MCP"
                  ? "MCP Server"
                  : "API Server"}
            </span>
          </div>
        </div>

        {/* Terminal Logger */}
        <div className="flex flex-col rounded-xl border border-border bg-background font-mono text-[11px] sm:text-xs text-foreground h-50 overflow-hidden">
          {/* Header */}
          <div className="flex items-center gap-1.5 px-4 py-2 border-b border-border bg-muted/60 text-muted-foreground select-none">
            <Terminal className="h-3.5 w-3.5" />
            <span>Simulation Event Logs</span>
          </div>
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 flex flex-col-reverse gap-1.5">
            {logs.length > 0 ? (
              logs.map((log, index) => (
                <div key={index} className="flex gap-2 leading-relaxed">
                  <span className="text-muted-foreground">
                    [{log.timestamp}]
                  </span>
                  <span
                    className={`font-semibold shrink-0 ${
                      log.type === "request" && "text-primary"
                    } ${log.type === "response" && "text-secondary"} ${
                      log.type === "stream" && "text-orange-400"
                    } ${
                      log.type === "success" && "text-green-accent"
                    } ${log.type === "info" && "text-muted-foreground"}`}
                  >
                    {log.source}:
                  </span>
                  <span className="text-foreground">{log.message}</span>
                </div>
              ))
            ) : (
              <div className="text-muted-foreground italic">
                No events logged. Click "Trigger Simulation" to begin.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
