"use client";

import { DocSection } from "@/data/protocolDocs";

export default function DocSections({ sections }: { sections: DocSection[] }) {
  return (
    <div className="flex flex-col gap-8">
      {sections.map((section, i) => (
        <SectionRenderer key={i} section={section} />
      ))}
    </div>
  );
}

function SectionRenderer({ section }: { section: DocSection }) {
  switch (section.type) {
    case "rest-status-codes":
      return <RestStatusCodesTable title={section.title} data={section.data as StatusCode[]} />;
    case "graphql-schema":
      return <GraphqlSchema title={section.title} data={section.data as GraphqlSchemaData} />;
    case "webhook-events":
      return <WebhookEvents title={section.title} data={section.data as WebhookEvent[]} />;
    case "websocket-channels":
      return <WebsocketChannels title={section.title} data={section.data as WebsocketChannel[]} />;
    case "grpc-services":
      return <GrpcServices title={section.title} data={section.data as GrpcServiceDef[]} />;
    case "mcp-tools":
      return <McpTools title={section.title} data={section.data as McpTool[]} />;
    case "soap-operation":
      return <SoapOperations title={section.title} data={section.data as SoapOperation[]} />;
    case "webrtc-signaling":
      return <WebrtcSignaling title={section.title} data={section.data as WebrtcSignal[]} />;
    default:
      return null;
  }
}

interface StatusCode {
  code: number;
  name: string;
  description: string;
}

function RestStatusCodesTable({ title, data }: { title: string; data: StatusCode[] }) {
  return (
    <SectionCard title={title}>
      <table className="w-full text-xs sm:text-sm text-left">
        <thead>
          <tr className="border-b border-border text-muted-foreground">
            <th className="pb-2 pr-4 font-semibold">Code</th>
            <th className="pb-2 pr-4 font-semibold">Name</th>
            <th className="pb-2 font-semibold">Description</th>
          </tr>
        </thead>
        <tbody>
          {data.map((sc) => (
            <tr key={sc.code} className="border-b border-border/40 last:border-0">
              <td className="py-2.5 pr-4 font-mono text-primary font-bold">{sc.code}</td>
              <td className="py-2.5 pr-4 font-mono text-foreground font-semibold">{sc.name}</td>
              <td className="py-2.5 text-muted-foreground">{sc.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </SectionCard>
  );
}

interface GraphqlSchemaData {
  queries: { name: string; description: string }[];
  mutations: { name: string; description: string }[];
}

function GraphqlSchema({ title, data }: { title: string; data: GraphqlSchemaData }) {
  return (
    <SectionCard title={title}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <h4 className="text-sm font-bold text-emerald-400 mb-3">Queries</h4>
          <ul className="space-y-2.5">
            {data.queries.map((q, i) => (
              <li key={i} className="text-xs sm:text-sm text-muted-foreground">
                <code className="text-primary font-mono font-semibold">{q.name}</code>
                <p className="mt-0.5">{q.description}</p>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-bold text-sky-400 mb-3">Mutations</h4>
          <ul className="space-y-2.5">
            {data.mutations.map((m, i) => (
              <li key={i} className="text-xs sm:text-sm text-muted-foreground">
                <code className="text-primary font-mono font-semibold">{m.name}</code>
                <p className="mt-0.5">{m.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </SectionCard>
  );
}

interface WebhookEvent {
  event: string;
  description: string;
  category: string;
}

function WebhookEvents({ title, data }: { title: string; data: WebhookEvent[] }) {
  return (
    <SectionCard title={title}>
      <table className="w-full text-xs sm:text-sm text-left">
        <thead>
          <tr className="border-b border-border text-muted-foreground">
            <th className="pb-2 pr-4 font-semibold">Event</th>
            <th className="pb-2 pr-4 font-semibold">Category</th>
            <th className="pb-2 font-semibold">Description</th>
          </tr>
        </thead>
        <tbody>
          {data.map((ev, i) => (
            <tr key={i} className="border-b border-border/40 last:border-0">
              <td className="py-2.5 pr-4 font-mono text-primary font-semibold">{ev.event}</td>
              <td className="py-2.5 pr-4">
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-muted text-muted-foreground border border-border">{ev.category}</span>
              </td>
              <td className="py-2.5 text-muted-foreground">{ev.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </SectionCard>
  );
}

interface WebsocketChannel {
  channel: string;
  description: string;
  direction: string;
}

function WebsocketChannels({ title, data }: { title: string; data: WebsocketChannel[] }) {
  return (
    <SectionCard title={title}>
      <table className="w-full text-xs sm:text-sm text-left">
        <thead>
          <tr className="border-b border-border text-muted-foreground">
            <th className="pb-2 pr-4 font-semibold">Channel</th>
            <th className="pb-2 pr-4 font-semibold">Direction</th>
            <th className="pb-2 font-semibold">Description</th>
          </tr>
        </thead>
        <tbody>
          {data.map((ch, i) => (
            <tr key={i} className="border-b border-border/40 last:border-0">
              <td className="py-2.5 pr-4 font-mono text-primary font-semibold">{ch.channel}</td>
              <td className="py-2.5 pr-4 text-xs text-muted-foreground">{ch.direction}</td>
              <td className="py-2.5 text-muted-foreground">{ch.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </SectionCard>
  );
}

interface GrpcMethod {
  name: string;
  inputType: string;
  outputType: string;
  description: string;
}

interface GrpcServiceDef {
  service: string;
  methods: GrpcMethod[];
}

function GrpcServices({ title, data }: { title: string; data: GrpcServiceDef[] }) {
  return (
    <SectionCard title={title}>
      {data.map((svc, i) => (
        <div key={i} className="mb-6 last:mb-0">
          <h4 className="text-sm font-bold text-primary mb-3 font-mono">{svc.service}</h4>
          <table className="w-full text-xs sm:text-sm text-left">
            <thead>
              <tr className="border-b border-border text-muted-foreground">
                <th className="pb-2 pr-3 font-semibold">Method</th>
                <th className="pb-2 pr-3 font-semibold">Input</th>
                <th className="pb-2 pr-3 font-semibold">Output</th>
                <th className="pb-2 font-semibold">Description</th>
              </tr>
            </thead>
            <tbody>
              {svc.methods.map((m, j) => (
                <tr key={j} className="border-b border-border/40 last:border-0">
                  <td className="py-2 pr-3 font-mono text-foreground font-semibold">{m.name}</td>
                  <td className="py-2 pr-3 font-mono text-muted-foreground">{m.inputType}</td>
                  <td className="py-2 pr-3 font-mono text-muted-foreground">{m.outputType}</td>
                  <td className="py-2 text-muted-foreground">{m.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </SectionCard>
  );
}

interface McpTool {
  name: string;
  description: string;
  inputSchema: string;
  category: string;
}

function McpTools({ title, data }: { title: string; data: McpTool[] }) {
  return (
    <SectionCard title={title}>
      <table className="w-full text-xs sm:text-sm text-left">
        <thead>
          <tr className="border-b border-border text-muted-foreground">
            <th className="pb-2 pr-4 font-semibold">Tool</th>
            <th className="pb-2 pr-4 font-semibold">Category</th>
            <th className="pb-2 pr-4 font-semibold">Input Schema</th>
            <th className="pb-2 font-semibold">Description</th>
          </tr>
        </thead>
        <tbody>
          {data.map((tool, i) => (
            <tr key={i} className="border-b border-border/40 last:border-0">
              <td className="py-2.5 pr-4 font-mono text-primary font-semibold">{tool.name}</td>
              <td className="py-2.5 pr-4">
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-muted text-muted-foreground border border-border">{tool.category}</span>
              </td>
              <td className="py-2.5 pr-4 font-mono text-xs text-muted-foreground">{tool.inputSchema}</td>
              <td className="py-2.5 text-muted-foreground">{tool.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </SectionCard>
  );
}

interface SoapOperation {
  operation: string;
  input: string;
  output: string;
  description: string;
}

function SoapOperations({ title, data }: { title: string; data: SoapOperation[] }) {
  return (
    <SectionCard title={title}>
      <table className="w-full text-xs sm:text-sm text-left">
        <thead>
          <tr className="border-b border-border text-muted-foreground">
            <th className="pb-2 pr-4 font-semibold">Operation</th>
            <th className="pb-2 pr-4 font-semibold">Input</th>
            <th className="pb-2 pr-4 font-semibold">Output</th>
            <th className="pb-2 font-semibold">Description</th>
          </tr>
        </thead>
        <tbody>
          {data.map((op, i) => (
            <tr key={i} className="border-b border-border/40 last:border-0">
              <td className="py-2.5 pr-4 font-mono text-primary font-semibold">{op.operation}</td>
              <td className="py-2.5 pr-4 font-mono text-muted-foreground">{op.input}</td>
              <td className="py-2.5 pr-4 font-mono text-muted-foreground">{op.output}</td>
              <td className="py-2.5 text-muted-foreground">{op.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </SectionCard>
  );
}

interface WebrtcSignal {
  type: string;
  description: string;
  direction: string;
}

function WebrtcSignaling({ title, data }: { title: string; data: WebrtcSignal[] }) {
  return (
    <SectionCard title={title}>
      <table className="w-full text-xs sm:text-sm text-left">
        <thead>
          <tr className="border-b border-border text-muted-foreground">
            <th className="pb-2 pr-4 font-semibold">Message</th>
            <th className="pb-2 pr-4 font-semibold">Direction</th>
            <th className="pb-2 font-semibold">Description</th>
          </tr>
        </thead>
        <tbody>
          {data.map((sig, i) => (
            <tr key={i} className="border-b border-border/40 last:border-0">
              <td className="py-2.5 pr-4 font-mono text-primary font-semibold">{sig.type}</td>
              <td className="py-2.5 pr-4 text-xs text-muted-foreground">{sig.direction}</td>
              <td className="py-2.5 text-muted-foreground">{sig.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </SectionCard>
  );
}

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-border bg-background/40 p-5 sm:p-6">
      <h3 className="text-lg sm:text-xl font-bold text-foreground mb-4">{title}</h3>
      {children}
    </div>
  );
}
