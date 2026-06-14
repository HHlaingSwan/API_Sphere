import Link from "next/link";
import {
  ArrowRight,
  Sparkles,
  Code,
  Layers,
  GitFork,
  Radio,
  Terminal,
  Cpu,
  FileText,
  Video,
} from "lucide-react";
import Navbar from "@/components/Navbar";

const protocols = [
  {
    name: "REST",
    slug: "rest",
    description:
      "Resource-oriented, stateless, and standard-bound. The architectural style of the web.",
    color:
      "from-green-500/20 to-emerald-500/10 text-green-400 border-green-500/20",
    icon: Code,
  },
  {
    name: "GraphQL",
    slug: "graphql",
    description:
      "Ask for exactly what you need. Consolidate multiple requests into a single roundtrip.",
    color: "from-pink-500/20 to-rose-500/10 text-pink-400 border-pink-500/20",
    icon: Layers,
  },
  {
    name: "Webhooks",
    slug: "webhooks",
    description:
      "Event-driven HTTP callbacks. Don't poll — let the server call you when something happens.",
    color:
      "from-orange-500/20 to-amber-500/10 text-orange-400 border-orange-500/20",
    icon: GitFork,
  },
  {
    name: "WebSockets",
    slug: "websockets",
    description:
      "Full-duplex TCP tunnel for real-time dashboards, chat, and live streaming.",
    color: "from-cyan-500/20 to-blue-500/10 text-cyan-400 border-cyan-500/20",
    icon: Radio,
  },
  {
    name: "gRPC",
    slug: "grpc",
    description:
      "High-performance RPC with Protobuf serialization. Powers Google's internal services.",
    color:
      "from-violet-500/20 to-indigo-500/10 text-violet-400 border-violet-500/20",
    icon: Terminal,
  },
  {
    name: "MCP",
    slug: "mcp",
    description:
      "Model Context Protocol. Let AI agents discover and invoke your APIs dynamically.",
    color:
      "from-fuchsia-500/20 to-purple-500/10 text-fuchsia-400 border-fuchsia-500/20",
    icon: Cpu,
  },
  {
    name: "SOAP",
    slug: "soap",
    description:
      "Enterprise XML messaging with strict WSDL contracts, WS-Security, and transactions.",
    color:
      "from-yellow-500/20 to-amber-500/10 text-yellow-400 border-yellow-500/20",
    icon: FileText,
  },
  {
    name: "WebRTC",
    slug: "webrtc",
    description:
      "Peer-to-peer audio, video, and data with sub-500ms latency — no plugins needed.",
    color:
      "from-teal-500/20 to-emerald-500/10 text-teal-400 border-teal-500/20",
    icon: Video,
  },
];

export default function DocsIndexPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-border bg-muted text-muted-foreground text-xs font-semibold mb-4">
              <Sparkles className="h-3.5 w-3.5 text-violet-400" />
              <span>API Protocol Documentation</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-foreground tracking-tight mb-4">
              Explore Protocol{" "}
              <span className="bg-linear-to-r from-violet-400 via-cyan-400 to-indigo-500 bg-clip-text text-transparent">
                Manuals
              </span>
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              Select a protocol below to read its in-depth documentation —
              architecture, code snippets, pros & cons, and more.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {protocols.map((p) => {
              const Icon = p.icon;
              return (
                <Link
                  key={p.slug}
                  href={`/docs/${p.slug}`}
                  className="group glass-panel glass-panel-hover p-5 rounded-2xl flex flex-col transition-all"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted border border-border text-primary shadow-md">
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>
                  <h3 className="text-base font-bold text-foreground mb-1.5">
                    {p.name}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-4 flex-1">
                    {p.description}
                  </p>
                  <div className="flex items-center gap-1 text-xs font-semibold text-primary group-hover:gap-2 transition-all">
                    <span>Read Docs</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
