"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Laptop,
  Server,
  Radio,
  Terminal,
  RefreshCw,
  Code,
  GitFork,
  Video,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

type ProtocolType = "REST" | "WebSockets" | "Webhooks" | "WebRTC";

interface ProtocolConfig {
  icon: LucideIcon;
  color: string;
  tag: string;
  clientLabel: string;
  serverLabel: string;
}

const PROTOCOL_CONFIG: Record<ProtocolType, ProtocolConfig> = {
  REST: { icon: Code, color: "text-green-accent", tag: "Request-Response", clientLabel: "Browser Client", serverLabel: "API Server" },
  WebSockets: { icon: Radio, color: "text-cyan-400", tag: "Bidirectional", clientLabel: "Browser Client", serverLabel: "WS Server" },
  Webhooks: { icon: GitFork, color: "text-orange-accent", tag: "Event-Driven", clientLabel: "Third Party", serverLabel: "Your Server" },
  WebRTC: { icon: Video, color: "text-teal-400", tag: "Peer-to-Peer", clientLabel: "Peer A", serverLabel: "Peer B" },
};

const ALL_PROTOCOLS: ProtocolType[] = ["REST", "WebSockets", "Webhooks", "WebRTC"];

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

  const addLog = useCallback(
    (source: string, message: string, type: LogMessage["type"] = "info") => {
      const time = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
      setLogs((prev) =>
        [{ timestamp: time, source, message, type }, ...prev].slice(0, 15),
      );
    },
    [],
  );

  const startSimulation = useCallback(() => {
    setIsAnimating(true);
    setAnimationStep(0);
    setLogs([]);
  }, []);

  const prevProtocolRef = useRef<ProtocolType>(protocol);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const mountedRef = useRef(false);

  useEffect(() => {
    if (!mountedRef.current) {
      mountedRef.current = true;
      startSimulation();
      return;
    }
    if (prevProtocolRef.current !== protocol) {
      if (timerRef.current) clearTimeout(timerRef.current);
      prevProtocolRef.current = protocol;
      startSimulation();
    }
  }, [protocol, startSimulation]);

  // Simulation step controller
  useEffect(() => {
    if (!isAnimating) return;

    if (protocol === "REST") {
      if (animationStep === 0) {
        addLog("Client", "Initiating GET /api/v1/users request...", "request");
        timerRef.current = setTimeout(() => setAnimationStep(1), 1000);
      } else if (animationStep === 1) {
        addLog("Network", "Packet traveling to REST Server...", "info");
        timerRef.current = setTimeout(() => setAnimationStep(2), 1200);
      } else if (animationStep === 2) {
        addLog("Server", "Request received. Querying database...", "info");
        timerRef.current = setTimeout(() => setAnimationStep(3), 1000);
      } else if (animationStep === 3) {
        addLog("Server", "Returning HTTP 200 OK with User JSON Payload", "response");
        timerRef.current = setTimeout(() => setAnimationStep(4), 1200);
      } else if (animationStep === 4) {
        addLog("Client", "Response received successfully! Rendered 12 users.", "success");
        timerRef.current = setTimeout(() => setIsAnimating(false), 1000);
      }
    } else if (protocol === "WebSockets") {
      if (animationStep === 0) {
        addLog("Client", "Initiating WebSocket handshake (GET ws://api.app/live)", "request");
        timerRef.current = setTimeout(() => setAnimationStep(1), 1000);
      } else if (animationStep === 1) {
        addLog("Server", "Handshake accepted. Upgrading connection to WebSocket protocol.", "success");
        timerRef.current = setTimeout(() => setAnimationStep(2), 1200);
      } else if (animationStep === 2) {
        addLog("Network", "TCP Tunnel established. Permanent bidirectional pipe open.", "success");
        timerRef.current = setTimeout(() => setAnimationStep(3), 1000);
      } else if (animationStep === 3) {
        addLog("Server", "Pushing Stock price update: APPL +1.2%", "stream");
        timerRef.current = setTimeout(() => setAnimationStep(4), 1000);
      } else if (animationStep === 4) {
        addLog("Client", "Pushing cursor movement event: x: 125, y: 412", "stream");
        timerRef.current = setTimeout(() => setAnimationStep(5), 1000);
      } else if (animationStep === 5) {
        addLog("Server", "Pushing Live chat notification: User 'Jane' joined", "stream");
        timerRef.current = setTimeout(() => setIsAnimating(false), 1500);
      }
    } else if (protocol === "Webhooks") {
      if (animationStep === 0) {
        addLog("Third Party (Stripe)", "Payment charge succeeded event triggered.", "info");
        timerRef.current = setTimeout(() => setAnimationStep(1), 1000);
      } else if (animationStep === 1) {
        addLog("Third Party", "POST https://my-app.com/webhooks/stripe (Sending JSON payload)", "request");
        timerRef.current = setTimeout(() => setAnimationStep(2), 1200);
      } else if (animationStep === 2) {
        addLog("Your Server", "Webhook received! Verifying webhook signature...", "info");
        timerRef.current = setTimeout(() => setAnimationStep(3), 1200);
      } else if (animationStep === 3) {
        addLog("Your Server", "Signature Verified. Database updated. Returning HTTP 200 OK.", "success");
        timerRef.current = setTimeout(() => setIsAnimating(false), 1000);
      }
    } else if (protocol === "WebRTC") {
      if (animationStep === 0) {
        addLog("Peer A", "Creating SDP offer for video call...", "info");
        timerRef.current = setTimeout(() => setAnimationStep(1), 1000);
      } else if (animationStep === 1) {
        addLog("Peer A", "Sending SDP offer to STUN server for signaling", "request");
        timerRef.current = setTimeout(() => setAnimationStep(2), 1200);
      } else if (animationStep === 2) {
        addLog("STUN Server", "ICE candidates discovered. Connectivity checks passed.", "success");
        timerRef.current = setTimeout(() => setAnimationStep(3), 1000);
      } else if (animationStep === 3) {
        addLog("Network", "P2P direct UDP tunnel established (bypasses server)", "success");
        timerRef.current = setTimeout(() => setAnimationStep(4), 1000);
      } else if (animationStep === 4) {
        addLog("Peer A", "Streaming video frame [1920x1080 @30fps]", "stream");
        timerRef.current = setTimeout(() => setAnimationStep(5), 1200);
      } else if (animationStep === 5) {
        addLog("Peer B", "Streaming audio chunk [48kHz stereo]", "stream");
        timerRef.current = setTimeout(() => setIsAnimating(false), 1500);
      }
    }
  }, [isAnimating, animationStep, protocol, addLog]);

  const config = PROTOCOL_CONFIG[protocol];
  const isWebRTC = protocol === "WebRTC";

  return (
    <div className="w-full flex flex-col lg:flex-row gap-6 bg-background p-6 rounded-2xl border border-border shadow-2xl relative overflow-hidden">
      {/* Background Decorative Blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 radial-glow pointer-events-none opacity-20" />

      {/* Control Panel */}
      <div className="w-full lg:w-[30%] flex flex-col justify-around gap-4 z-10">
        <div>
          <h3 className="text-lg font-bold text-foreground mb-1">Visualizer</h3>
          <p className="text-xs text-muted-foreground">
            Select a protocol below to see the interactive communication cycle in real-time.
          </p>
        </div>

        {/* Protocol Selectors */}
        <div className="flex flex-col gap-2">
          {ALL_PROTOCOLS.map((p) => {
            const cfg = PROTOCOL_CONFIG[p];
            const Icon = cfg.icon;
            const isActive = protocol === p;
            return (
              <button
                key={p}
                disabled={isAnimating && protocol !== p}
                onClick={() => setProtocol(p)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border text-sm font-medium transition-all ${
                  isActive
                    ? "bg-primary/10 border-primary/50 text-foreground shadow-lg shadow-primary/5"
                    : "bg-muted/40 border-border text-muted-foreground hover:text-foreground hover:border-border hover:bg-muted/60"
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                <Icon className={`h-4 w-4 shrink-0 ${isActive ? "text-primary" : cfg.color}`} />
                <span className="flex flex-col items-start">
                  <span>{p}</span>
                  <span className="text-[10px] text-muted-foreground/60">{cfg.tag}</span>
                </span>
                {isActive && isAnimating && (
                  <RefreshCw className="h-4 w-4 animate-spin text-primary ml-auto" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Animation Stage & Terminal */}
      <div className="w-full lg:w-[70%] flex flex-col gap-6 z-10">
        {/* Stage */}
        <div className="relative h-44 rounded-xl border border-border bg-muted/20 overflow-hidden flex items-center justify-between px-6 sm:px-12">
          {/* Client Node */}
          <div className="flex flex-col items-center gap-2 z-10">
            <div className="h-14 w-14 rounded-xl bg-muted border border-border flex items-center justify-center text-foreground shadow-md">
              {protocol === "WebRTC" ? (
                <Video className="h-7 w-7 text-teal-400" />
              ) : (
                <Laptop className="h-7 w-7" />
              )}
            </div>
            <span className="text-xs font-semibold text-muted-foreground">{config.clientLabel}</span>
          </div>

          {/* STUN Server Node (WebRTC only) */}
          {isWebRTC && (
            <div className="flex flex-col items-center gap-2 z-10 mx-2">
              <div className="h-12 w-12 rounded-lg bg-muted border border-border flex items-center justify-center text-foreground shadow-md">
                <Radio className="h-6 w-6 text-amber-400" />
              </div>
              <span className="text-[10px] font-semibold text-muted-foreground">STUN Server</span>
            </div>
          )}

          {/* Pipe Connection */}
          <div className={`absolute h-0.75 bg-muted rounded-full overflow-hidden ${
            isWebRTC
              ? "left-[18%] right-[18%] sm:left-[20%] sm:right-[20%]"
              : "left-21 right-21 sm:left-29 sm:right-29"
          }`}>
            {/* WebSocket persistent connection line */}
            {protocol === "WebSockets" && animationStep >= 2 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full h-full bg-linear-to-r from-cyan-500 to-violet-500" />
            )}
            {/* WebRTC P2P connection line */}
            {isWebRTC && animationStep >= 3 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full h-full bg-linear-to-r from-teal-500 to-cyan-500" />
            )}

            {/* Moving Packets */}
            <AnimatePresence>
              {isAnimating && (
                <>
                  {/* Client → Server Packet */}
                  {((protocol === "REST" && animationStep === 1) ||
                    (protocol === "WebSockets" && animationStep === 0) ||
                    (isWebRTC && animationStep === 1)) && (
                    <motion.div
                      key="c-to-s"
                      initial={{ left: "0%" }}
                      animate={{ left: "100%" }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 1.2, ease: "easeInOut" }}
                      className="absolute top-1/2 -translate-y-1/2 h-3.5 w-3.5 rounded-full bg-primary shadow-[0_0_8px_var(--primary)]"
                    />
                  )}

                  {/* Server → Client Packet */}
                  {((protocol === "REST" && animationStep === 3) ||
                    (protocol === "WebSockets" && animationStep === 1) ||
                    (protocol === "Webhooks" && animationStep === 1) ||
                    (isWebRTC && animationStep === 2)) && (
                    <motion.div
                      key="s-to-c"
                      initial={{ left: "100%" }}
                      animate={{ left: "0%" }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 1.2, ease: "easeInOut" }}
                      className="absolute top-1/2 -translate-y-1/2 h-3.5 w-3.5 rounded-full bg-secondary shadow-[0_0_8px_var(--secondary)]"
                    />
                  )}

                  {/* WebSocket bidirectional stream packets */}
                  {protocol === "WebSockets" && animationStep === 3 && (
                    <motion.div key="ws-s" initial={{ left: "100%" }} animate={{ left: "0%" }} transition={{ duration: 1 }} className="absolute top-1/2 -translate-y-1/2 h-2.5 w-2.5 rounded-full bg-secondary shadow-[0_0_6px_var(--secondary)]" />
                  )}
                  {protocol === "WebSockets" && animationStep === 4 && (
                    <motion.div key="ws-c" initial={{ left: "0%" }} animate={{ left: "100%" }} transition={{ duration: 1 }} className="absolute top-1/2 -translate-y-1/2 h-2.5 w-2.5 rounded-full bg-primary shadow-[0_0_6px_var(--primary)]" />
                  )}
                  {protocol === "WebSockets" && animationStep === 5 && (
                    <motion.div key="ws-s2" initial={{ left: "100%" }} animate={{ left: "0%" }} transition={{ duration: 1 }} className="absolute top-1/2 -translate-y-1/2 h-2.5 w-2.5 rounded-full bg-secondary shadow-[0_0_6px_var(--secondary)]" />
                  )}

                  {/* WebRTC P2P stream packets */}
                  {isWebRTC && animationStep === 4 && (
                    <motion.div key="rtc-video" initial={{ left: "0%" }} animate={{ left: "100%" }} transition={{ duration: 1 }} className="absolute top-1/2 -translate-y-1/2 h-3 w-3 rounded-full bg-teal-400 shadow-[0_0_6px_var(--teal-400)]" />
                  )}
                  {isWebRTC && animationStep === 5 && (
                    <motion.div key="rtc-audio" initial={{ left: "100%" }} animate={{ left: "0%" }} transition={{ duration: 1 }} className="absolute top-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_6px_var(--cyan-400)]" />
                  )}
                </>
              )}
            </AnimatePresence>
          </div>

          {/* Server Node */}
          <div className="flex flex-col items-center gap-2 z-10">
            <div className={`rounded-xl bg-muted border border-border flex items-center justify-center text-foreground shadow-md ${
              isWebRTC ? "h-12 w-12" : "h-14 w-14"
            }`}>
              {isWebRTC ? (
                <Video className="h-6 w-6 text-teal-400" />
              ) : (
                <Server className="h-7 w-7" />
              )}
            </div>
            <span className="text-xs font-semibold text-muted-foreground">{config.serverLabel}</span>
          </div>
        </div>

        {/* Terminal Logger */}
        <div className="flex flex-col rounded-xl border border-border bg-background font-mono text-[11px] sm:text-xs text-foreground h-50 overflow-hidden">
          <div className="flex items-center gap-1.5 px-4 py-2 border-b border-border bg-muted/60 text-muted-foreground select-none">
            <Terminal className="h-3.5 w-3.5" />
            <span>Simulation Event Logs</span>
            <span className="ml-auto text-[10px] text-muted-foreground/60">{config.tag}</span>
          </div>
          <div className="flex-1 overflow-y-auto p-4 flex flex-col-reverse gap-1.5">
            {logs.length > 0 ? (
              logs.map((log, index) => (
                <div key={index} className="flex gap-2 leading-relaxed">
                  <span className="text-muted-foreground">[{log.timestamp}]</span>
                  <span
                    className={`font-semibold shrink-0 ${
                      log.type === "request" && "text-primary"
                    } ${log.type === "response" && "text-secondary"} ${
                      log.type === "stream" && "text-orange-400"
                    } ${log.type === "success" && "text-green-accent"} ${
                      log.type === "info" && "text-muted-foreground"
                    }`}
                  >
                    {log.source}:
                  </span>
                  <span className="text-foreground">{log.message}</span>
                </div>
              ))
            ) : (
              <div className="text-muted-foreground italic">
                No events logged. Select a protocol to begin.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
