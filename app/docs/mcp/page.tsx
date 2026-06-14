"use client";

import DocPageLayout from "@/components/docs/DocPageLayout";
import CodeTabs from "@/components/docs/CodeTabs";
import ProsConsGrid from "@/components/docs/ProsConsGrid";
import DocsConsole from "@/components/DocsConsole";
import { protocolDocs } from "@/data/protocolDocs";

const doc = protocolDocs.mcp;

const tools = [
  { name: "execute_sql_query", description: "Run SQL statements against a connected database.", inputSchema: "{ query: string }", category: "Database" },
  { name: "read_file", description: "Read the contents of a file from the workspace.", inputSchema: "{ path: string }", category: "Filesystem" },
  { name: "list_directory", description: "List files and directories in a given path.", inputSchema: "{ path: string }", category: "Filesystem" },
  { name: "search_web", description: "Perform a web search and return top results.", inputSchema: "{ query: string }", category: "Web" },
  { name: "create_issue", description: "Create a new issue in the project tracker.", inputSchema: "{ title: string, description?: string }", category: "Project Management" },
];

const categoryColors: Record<string, string> = {
  Database: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  Filesystem: "bg-blue-500/15 text-blue-400 border-blue-500/30",
  Web: "bg-violet-500/15 text-violet-400 border-violet-500/30",
  "Project Management": "bg-amber-500/15 text-amber-400 border-amber-500/30",
};

export default function McpDocsPage() {
  return (
    <DocPageLayout protocolKey="mcp">
      <div>
        <span className="text-xs font-semibold text-violet-400 uppercase tracking-wider">{doc.category}</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground mb-3 tracking-tight">{doc.name}</h1>
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed italic">{doc.tagline}</p>
      </div>

      <div className="rounded-2xl border border-border bg-muted/15 p-4 sm:p-6">
        <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-4">AI Tool Discovery Flow</h3>
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-violet-500/15 border border-violet-500/30 flex items-center justify-center shrink-0">
              <span className="text-xs font-bold text-violet-400">1</span>
            </div>
            <div className="flex-1 flex items-center gap-3 px-3 py-2 rounded-lg bg-background/60 border border-border/50">
              <span className="text-lg">🤖</span>
              <span className="text-xs font-bold text-violet-400">LLM Client</span>
              <span className="text-[10px] text-muted-foreground mx-1">→</span>
              <span className="text-xs font-mono text-muted-foreground">tools/list</span>
              <span className="text-[10px] text-muted-foreground mx-1">→</span>
              <span className="text-lg">⚙️</span>
              <span className="text-xs font-bold text-emerald-400">MCP Server</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-violet-500/15 border border-violet-500/30 flex items-center justify-center shrink-0">
              <span className="text-xs font-bold text-violet-400">2</span>
            </div>
            <div className="flex-1 flex items-center gap-3 px-3 py-2 rounded-lg bg-background/60 border border-border/50">
              <span className="text-lg">⚙️</span>
              <span className="text-xs font-bold text-emerald-400">MCP Server</span>
              <span className="text-[10px] text-muted-foreground mx-1">→</span>
              <span className="text-xs font-mono text-muted-foreground">tools schema</span>
              <span className="text-[10px] text-muted-foreground mx-1">→</span>
              <span className="text-lg">🤖</span>
              <span className="text-xs font-bold text-violet-400">LLM Client</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-violet-500/15 border border-violet-500/30 flex items-center justify-center shrink-0">
              <span className="text-xs font-bold text-violet-400">3</span>
            </div>
            <div className="flex-1 flex items-center gap-3 px-3 py-2 rounded-lg bg-background/60 border border-border/50">
              <span className="text-lg">🤖</span>
              <span className="text-xs font-bold text-violet-400">LLM Client</span>
              <span className="text-[10px] text-muted-foreground mx-1">→</span>
              <span className="text-xs font-mono text-muted-foreground">tools/call + args</span>
              <span className="text-[10px] text-muted-foreground mx-1">→</span>
              <span className="text-lg">⚙️</span>
              <span className="text-xs font-bold text-emerald-400">MCP Server</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-violet-500/15 border border-violet-500/30 flex items-center justify-center shrink-0">
              <span className="text-xs font-bold text-violet-400">4</span>
            </div>
            <div className="flex-1 flex items-center gap-3 px-3 py-2 rounded-lg bg-background/60 border border-border/50">
              <span className="text-lg">⚙️</span>
              <span className="text-xs font-bold text-emerald-400">MCP Server</span>
              <span className="text-[10px] text-muted-foreground mx-1">→</span>
              <span className="text-xs font-mono text-muted-foreground">result + content</span>
              <span className="text-[10px] text-muted-foreground mx-1">→</span>
              <span className="text-lg">🤖</span>
              <span className="text-xs font-bold text-violet-400">LLM evaluates → responds to user</span>
            </div>
          </div>
        </div>
      </div>

      <div className="text-foreground text-[15px] sm:text-base leading-relaxed space-y-4">
        <p>{doc.description}</p>
        <h3 className="text-xl font-bold text-foreground pt-2">How it Works</h3>
        <p>{doc.overview}</p>
      </div>

      <div className="rounded-xl border border-border bg-background/40 p-5">
        <h3 className="text-sm font-bold text-foreground mb-3">Connected Tools</h3>
        <div className="flex flex-col gap-2">
          {tools.map((t, i) => (
            <div key={i} className="flex items-center justify-between px-3 py-2.5 rounded-lg bg-muted/30 border border-border/40">
              <div className="flex items-center gap-3">
                <span className="text-sm">🔧</span>
                <code className="text-xs font-mono text-foreground font-semibold">{t.name}</code>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-mono text-muted-foreground hidden sm:block">{t.inputSchema}</span>
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${categoryColors[t.category] || "bg-muted text-muted-foreground border-border"}`}>
                  {t.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-border bg-background/40 p-5">
        <h3 className="text-sm font-bold text-foreground mb-2">Transport: JSON-RPC 2.0</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="rounded-lg bg-muted/40 border border-border/50 p-3">
            <span className="text-xs font-bold text-violet-400">SSE (Remote)</span>
            <p className="text-[11px] text-muted-foreground mt-1">Server-Sent Events for remote MCP servers over HTTP.</p>
          </div>
          <div className="rounded-lg bg-muted/40 border border-border/50 p-3">
            <span className="text-xs font-bold text-cyan-400">stdio (Local)</span>
            <p className="text-[11px] text-muted-foreground mt-1">Local process communication via stdin/stdout pipes.</p>
          </div>
        </div>
      </div>

      <DocsConsole doc={doc} />
      <CodeTabs snippets={doc.codeSnippets} />
      <ProsConsGrid pros={doc.pros} cons={doc.cons} />
    </DocPageLayout>
  );
}
