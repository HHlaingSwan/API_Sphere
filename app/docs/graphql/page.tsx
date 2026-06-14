"use client";

import { useState } from "react";
import DocPageLayout from "@/components/docs/DocPageLayout";
import CodeTabs from "@/components/docs/CodeTabs";
import ProsConsGrid from "@/components/docs/ProsConsGrid";
import DocsConsole from "@/components/DocsConsole";
import { protocolDocs } from "@/data/protocolDocs";

const doc = protocolDocs.graphql;

const sampleQuery = `query {
  user(id: "1") {
    name
    email
    posts {
      title
    }
  }
}`;

const sampleResult = `{
  "data": {
    "user": {
      "name": "Alice Smith",
      "email": "alice@example.com",
      "posts": [
        { "title": "GraphQL is Amazing" },
        { "title": "API Design Tips" }
      ]
    }
  }
}`;

export default function GraphqlDocsPage() {
  const [activeView, setActiveView] = useState<"query" | "mutation">("query");

  return (
    <DocPageLayout protocolKey="graphql">
      <div>
        <span className="text-xs font-semibold text-pink-400 uppercase tracking-wider">{doc.category}</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground mb-3 tracking-tight">{doc.name}</h1>
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed italic">{doc.tagline}</p>
      </div>

      <div className="rounded-2xl border border-border bg-muted/15 p-4 sm:p-6">
        <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-4">Query Builder</h3>
        <div className="flex gap-1 mb-3">
          <button
            onClick={() => setActiveView("query")}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${
              activeView === "query" ? "bg-pink-500/15 text-pink-400 border border-pink-500/30" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Query
          </button>
          <button
            onClick={() => setActiveView("mutation")}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${
              activeView === "mutation" ? "bg-sky-500/15 text-sky-400 border border-sky-500/30" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Mutation
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="rounded-xl border border-border bg-background p-4">
            <span className="text-[10px] font-bold uppercase tracking-wider text-pink-400 mb-2 block">
              {activeView === "query" ? "Query" : "Mutation"}
            </span>
            <pre className="text-xs font-mono text-foreground/80 whitespace-pre-wrap overflow-x-auto">
              {activeView === "query" ? sampleQuery : `mutation {\n  createUser(input: {\n    name: "Jane Doe"\n    email: "jane@example.com"\n  }) {\n    id\n    name\n  }\n}`}
            </pre>
          </div>
          <div className="rounded-xl border border-border bg-background p-4">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 mb-2 block">Result</span>
            <pre className="text-xs font-mono text-emerald-300 whitespace-pre-wrap overflow-x-auto">
              {activeView === "query" ? sampleResult : `{\n  "data": {\n    "createUser": {\n      "id": "42",\n      "name": "Jane Doe"\n    }\n  }\n}`}
            </pre>
          </div>
        </div>
      </div>

      <div className="text-foreground text-[15px] sm:text-base leading-relaxed space-y-4">
        <p>{doc.description}</p>
        <h3 className="text-xl font-bold text-foreground pt-2">How it Works</h3>
        <p>{doc.overview}</p>
      </div>

      <div className="rounded-xl border border-border bg-background/40 p-5">
        <h3 className="text-sm font-bold text-foreground mb-2">Single Endpoint</h3>
        <div className="flex items-center gap-3">
          <span className="px-2.5 py-1 text-xs font-bold font-mono rounded-md bg-blue-500/15 text-blue-400 border border-blue-500/30">POST</span>
          <code className="text-sm font-mono text-foreground">/graphql</code>
        </div>
        <p className="text-xs text-muted-foreground mt-2">All queries and mutations go through one endpoint. The query itself determines what data is returned.</p>
      </div>

      <div className="rounded-xl border border-border bg-background/40 p-5">
        <h3 className="text-sm font-bold text-foreground mb-3">Schema Types</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="rounded-lg border border-pink-500/20 bg-pink-500/5 p-3">
            <span className="text-xs font-bold text-pink-400">Query</span>
            <p className="text-[11px] text-muted-foreground mt-1">Read operations — fetch data</p>
          </div>
          <div className="rounded-lg border border-sky-500/20 bg-sky-500/5 p-3">
            <span className="text-xs font-bold text-sky-400">Mutation</span>
            <p className="text-[11px] text-muted-foreground mt-1">Write operations — create, update, delete</p>
          </div>
          <div className="rounded-lg border border-violet-500/20 bg-violet-500/5 p-3">
            <span className="text-xs font-bold text-violet-400">Subscription</span>
            <p className="text-[11px] text-muted-foreground mt-1">Real-time data via WebSocket</p>
          </div>
        </div>
      </div>

      <DocsConsole doc={doc} />
      <CodeTabs snippets={doc.codeSnippets} />
      <ProsConsGrid pros={doc.pros} cons={doc.cons} />
    </DocPageLayout>
  );
}
