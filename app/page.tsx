"use client";

import Link from "next/link";
import {
  ArrowRight,
  Sparkles,
  Code,
  GitFork,
  Radio,
  Cpu,
  Layers,
  Terminal,
  FileText,
  Video,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import InteractiveVisualizer from "@/components/InteractiveVisualizer";
import ComparisonTable from "@/components/ComparisonTable";
import HttpStatusDemo from "@/components/HttpStatusDemo";
import { motion } from "framer-motion";

const apiTypes = [
  {
    name: "REST",
    description:
      "The classic architectural style of the web. Resource-oriented, stateless, and standard-bound.",
    funFact:
      "Every web page you visit uses REST. Hitting the back button replays a GET request — not a cached view, but a real HTTP call.",
    tag: "Traditional",
    color:
      "from-green-500/20 to-emerald-500/10 text-green-400 border-green-500/20",
    icon: Code,
    slug: "rest",
  },
  {
    name: "GraphQL",
    description:
      "Ask for what you need and get exactly that. Consolidate requests into a single roundtrip.",
    funFact:
      "Invented by Facebook in 2012 to fix the slow mobile news feed. The client picks exactly what data it needs — the endpoint never changes.",
    tag: "Query-driven",
    color: "from-pink-500/20 to-rose-500/10 text-pink-400 border-pink-500/20",
    icon: Layers,
    slug: "graphql",
  },
  {
    name: "Webhooks",
    description:
      "Don't call us, we'll call you. Reorganize your architectures with event-driven HTTP callbacks.",
    funFact:
      "Webhooks are callback URLs for the internet. Every time Stripe processes a payment, they POST the result to your server — no polling required.",
    tag: "Event-Driven",
    color:
      "from-orange-500/20 to-amber-500/10 text-orange-400 border-orange-500/20",
    icon: GitFork,
    slug: "webhooks",
  },
  {
    name: "WebSockets",
    description:
      "Establish a permanent, full-duplex TCP tunnel. Ideal for real-time dashboards and chat systems.",
    funFact:
      "After the handshake, the protocol switches from http:// to ws://. The connection stays open indefinitely — no polling, no waiting.",
    tag: "Real-time",
    color: "from-cyan-500/20 to-blue-500/10 text-cyan-400 border-cyan-500/20",
    icon: Radio,
    slug: "websockets",
  },
  {
    name: "gRPC",
    description:
      "Google's high-performance remote procedure call framework powered by Protobuf serialization.",
    funFact:
      "10x faster than REST/JSON because it uses Protobuf binary format. Every Google service internally speaks gRPC — Search, Maps, YouTube.",
    tag: "High-Perf RPC",
    color:
      "from-violet-500/20 to-indigo-500/10 text-violet-400 border-violet-500/20",
    icon: Terminal,
    slug: "grpc",
  },
  {
    name: "MCP",
    description:
      "Model Context Protocol. An open-standard enabling LLMs and AI Agents to securely interact with local tools.",
    funFact:
      "Invented by Anthropic in 2024. It lets AI agents discover your APIs dynamically — like plug-and-play for LLMs.",
    tag: "AI / Agentic",
    color:
      "from-fuchsia-500/20 to-purple-500/10 text-fuchsia-400 border-fuchsia-500/20",
    icon: Cpu,
    slug: "mcp",
  },
  {
    name: "SOAP",
    description:
      "Enterprise-grade XML messaging with strict WSDL contracts, WS-Security, and transactional integrity.",
    funFact:
      "SOAP predates REST (1998). Banks, airlines, and financial systems still run SOAP — your credit card transaction likely uses it right now.",
    tag: "Enterprise",
    color:
      "from-yellow-500/20 to-amber-500/10 text-yellow-400 border-yellow-500/20",
    icon: FileText,
    slug: "soap",
  },
  {
    name: "WebRTC",
    description:
      "Peer-to-peer audio, video, and data transfer with sub-500ms latency for real-time communications.",
    funFact:
      "Google open-sourced this in 2011. Two browsers can stream video directly — no server between them, just a quick signaling handshake.",
    tag: "Peer-to-Peer",
    color:
      "from-teal-500/20 to-emerald-500/10 text-teal-400 border-teal-500/20",
    icon: Video,
    slug: "webrtc",
  },
];

export default function Home() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col bg-background font-sans text-foreground overflow-hidden">
      {/* Top Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-24 pb-20 sm:pt-32 sm:pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col items-center text-center">
        {/* Glow Effects */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 radial-glow pointer-events-none opacity-30 -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 radial-glow-secondary pointer-events-none opacity-20 translate-x-1/2" />

        {/* Feature Announcement Tag */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-border bg-muted text-muted-foreground text-xs font-semibold backdrop-blur-md mb-6"
        >
          <Sparkles className="h-3.5 w-3.5 text-violet-400 animate-pulse" />
          <span>Interactive API Architecture Atlas</span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-foreground max-w-4xl leading-tight"
        >
          Demystifying the{" "}
          <span className="bg-linear-to-r from-violet-400 via-cyan-400 to-indigo-500 bg-clip-text text-transparent">
            Language
          </span>{" "}
          of the Web
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-6 max-w-2xl text-base sm:text-lg text-muted-foreground leading-relaxed"
        >
          An interactive catalog and testing sandbox comparing REST, SOAP,
          GraphQL, Webhooks, WebSockets, gRPC, WebRTC, and MCP. Choose the right
          interface for your next application.
        </motion.p>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            href="/docs"
            className="flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-6 font-semibold text-white hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
          >
            <span>Explore Docs</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
          <button
            onClick={() => scrollToSection("comparison-matrix")}
            className="flex h-12 items-center justify-center gap-2 rounded-full border border-border bg-muted px-6 font-semibold text-foreground hover:bg-muted/80 transition-all backdrop-blur-md"
          >
            Compare Protocols
          </button>
        </motion.div>

        {/* Floating Protocol Badges in Hero */}
        <div className="relative w-full max-w-3xl h-16 mt-16 flex flex-wrap justify-center items-center gap-3 md:gap-5">
          {[
            "REST",
            "SOAP",
            "GraphQL",
            "tRPC",
            "Webhooks",
            "SSE",
            "WebSockets",
            "WebRTC",
            "gRPC",
            "MCP",
          ].map((p, idx) => (
            <motion.div
              key={p}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 + idx * 0.05 }}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold glass-panel select-none hover:border-primary/40 hover:text-foreground transition-colors cursor-default ${
                idx % 2 === 0 ? "animate-float" : "animate-float-slow"
              }`}
              style={{ animationDelay: `${idx * 0.4}s` }}
            >
              {p}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Catalog Grid Section */}
      <section className="py-20 border-t border-border bg-background/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              The API Catalog
            </h2>
            <p className="mt-4 text-sm sm:text-base text-muted-foreground">
              A breakdown of the core communication models driving digital
              interfaces today.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {apiTypes.map((api, index) => {
              const Icon = api.icon;
              return (
                <motion.div
                  key={api.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="glass-panel glass-panel-hover p-6 rounded-2xl flex flex-col justify-between"
                >
                  <div>
                    {/* Header */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted border border-border text-primary shadow-md">
                        <Icon className="h-5 w-5" />
                      </div>
                      <span
                        className={`text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full border ${api.color}`}
                      >
                        {api.tag}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-foreground mb-2">
                      {api.name}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed mb-6">
                      {api.description}
                    </p>
                  </div>

                  <Link
                    href={`/docs/${api.slug}`}
                    className="flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-primary/80 transition-colors"
                  >
                    <span>Read Protocol Docs</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Interactive visualizer section */}
      <section className="py-20 border-t border-border bg-muted/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Flow Visualizer
            </h2>
            <p className="mt-4 text-sm sm:text-base text-muted-foreground">
              Interactive playground simulating how request packages travel
              across network borders.
            </p>
          </div>

          <InteractiveVisualizer />
        </div>
      </section>

      {/* Comparison table section */}
      <section
        id="comparison-matrix"
        className="py-20 border-t border-border bg-background"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Protocol Matrix
            </h2>
            <p className="mt-4 text-sm sm:text-base text-muted-foreground">
              Compare architectural styles, transport levels, payloads, and
              capabilities in a consolidated grid.
            </p>
          </div>

          <ComparisonTable />
        </div>
      </section>

      {/* HTTP Status Codes Demo */}
      <section
        id="http-status-codes"
        className="py-20 border-t border-border bg-muted/10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              HTTP Status Codes
            </h2>
            <p className="mt-4 text-sm sm:text-base text-muted-foreground">
              Make live API calls to a real REST endpoint and inspect actual
              HTTP responses — status codes, headers, and body.
            </p>
          </div>

          <HttpStatusDemo />
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-border bg-background py-12 text-center text-xs text-muted-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded bg-linear-to-tr from-violet-600 to-cyan-500 flex items-center justify-center text-white text-[10px] font-bold">
              AS
            </div>
            <span className="font-semibold text-muted-foreground">
              APISphere
            </span>
          </div>
          <p>
            © {new Date().getFullYear()} APISphere. All rights reserved. Built
            with Next.js & Tailwind CSS.
          </p>
          <div className="flex gap-4">
            <Link
              href="/docs"
              className="hover:text-foreground transition-colors"
            >
              Documentation
            </Link>
            <Link
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              GitHub
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
