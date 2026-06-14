"use client";

import DocPageLayout from "@/components/docs/DocPageLayout";
import CodeTabs from "@/components/docs/CodeTabs";
import ProsConsGrid from "@/components/docs/ProsConsGrid";
import DocsConsole from "@/components/DocsConsole";
import { protocolDocs } from "@/data/protocolDocs";

const doc = protocolDocs.grpc;

const services = [
  {
    service: "UserService",
    methods: [
      { name: "GetUser", input: "GetUserRequest", output: "User", description: "Retrieve a single user by ID." },
      { name: "ListUsers", input: "ListUsersRequest", output: "ListUsersResponse", description: "Fetch a paginated list of users." },
      { name: "CreateUser", input: "CreateUserRequest", output: "User", description: "Create a new user account." },
      { name: "UpdateUser", input: "UpdateUserRequest", output: "User", description: "Update an existing user's properties." },
      { name: "DeleteUser", input: "DeleteUserRequest", output: "DeleteUserResponse", description: "Permanently remove a user." },
    ],
  },
];

export default function GrpcDocsPage() {
  return (
    <DocPageLayout protocolKey="grpc">
      <div>
        <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">{doc.category}</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground mb-3 tracking-tight">{doc.name}</h1>
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed italic">{doc.tagline}</p>
      </div>

      <div className="rounded-2xl border border-border bg-muted/15 p-4 sm:p-6">
        <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-4">Service Method Matrix</h3>
        {services.map((svc) => (
          <div key={svc.service}>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-sm font-bold text-amber-400">{svc.service}</span>
              <span className="text-[10px] font-mono text-muted-foreground">.proto</span>
            </div>
            <div className="rounded-xl border border-border overflow-hidden">
              <div className="grid grid-cols-[1fr_1.2fr_1fr_1.5fr] gap-px bg-border text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                <span className="bg-muted/60 px-3 py-2">Method</span>
                <span className="bg-muted/60 px-3 py-2">Input Type</span>
                <span className="bg-muted/60 px-3 py-2">Output Type</span>
                <span className="bg-muted/60 px-3 py-2 hidden sm:block">Description</span>
              </div>
              {svc.methods.map((m, i) => (
                <div key={i} className="grid grid-cols-[1fr_1.2fr_1fr_1.5fr] gap-px bg-border text-xs">
                  <span className="bg-background px-3 py-2 font-mono font-semibold text-amber-300">{m.name}</span>
                  <span className="bg-background px-3 py-2 font-mono text-muted-foreground">{m.input}</span>
                  <span className="bg-background px-3 py-2 font-mono text-emerald-400">{m.output}</span>
                  <span className="bg-background px-3 py-2 text-muted-foreground hidden sm:block">{m.description}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="text-foreground text-[15px] sm:text-base leading-relaxed space-y-4">
        <p>{doc.description}</p>
        <h3 className="text-xl font-bold text-foreground pt-2">How it Works</h3>
        <p>{doc.overview}</p>
      </div>

      <div className="rounded-xl border border-border bg-background/40 p-5">
        <h3 className="text-sm font-bold text-foreground mb-3">RPC Types</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="rounded-lg border border-amber-500/20 bg-amber-500/5 p-3">
            <span className="text-xs font-bold text-amber-400">Unary RPC</span>
            <p className="text-[11px] text-muted-foreground mt-1">Single request → single response. Like a traditional function call.</p>
          </div>
          <div className="rounded-lg border border-cyan-500/20 bg-cyan-500/5 p-3">
            <span className="text-xs font-bold text-cyan-400">Server Stream</span>
            <p className="text-[11px] text-muted-foreground mt-1">Single request → stream of responses. Server sends data over time.</p>
          </div>
          <div className="rounded-lg border border-violet-500/20 bg-violet-500/5 p-3">
            <span className="text-xs font-bold text-violet-400">Client Stream</span>
            <p className="text-[11px] text-muted-foreground mt-1">Stream of requests → single response. Client sends chunks.</p>
          </div>
          <div className="rounded-lg border border-rose-500/20 bg-rose-500/5 p-3">
            <span className="text-xs font-bold text-rose-400">Bidirectional Stream</span>
            <p className="text-[11px] text-muted-foreground mt-1">Both sides stream independently. Full duplex communication.</p>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-background/40 p-5">
        <h3 className="text-sm font-bold text-foreground mb-2">Protocol Buffers</h3>
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-lg bg-muted/40 border border-border/50 p-3">
            <span className="text-[10px] font-bold text-muted-foreground block mb-1">Protobuf (Binary)</span>
            <span className="text-xs font-mono text-foreground">~42 bytes</span>
            <span className="text-[10px] text-emerald-400 block mt-1">Fast • Compact • Typed</span>
          </div>
          <div className="rounded-lg bg-muted/40 border border-border/50 p-3">
            <span className="text-[10px] font-bold text-muted-foreground block mb-1">JSON (Text)</span>
            <span className="text-xs font-mono text-foreground">~156 bytes</span>
            <span className="text-[10px] text-amber-400 block mt-1">Verbose • Human-readable</span>
          </div>
        </div>
      </div>

      <DocsConsole doc={doc} />
      <CodeTabs snippets={doc.codeSnippets} />
      <ProsConsGrid pros={doc.pros} cons={doc.cons} />
    </DocPageLayout>
  );
}
