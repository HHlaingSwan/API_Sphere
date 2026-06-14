"use client";

import DocPageLayout from "@/components/docs/DocPageLayout";
import CodeTabs from "@/components/docs/CodeTabs";
import ProsConsGrid from "@/components/docs/ProsConsGrid";
import DocsConsole from "@/components/DocsConsole";
import { protocolDocs } from "@/data/protocolDocs";

const doc = protocolDocs.soap;

const operations = [
  { operation: "GetUser", input: "GetUserRequest", output: "GetUserResponse", description: "Fetch a user by ID." },
  { operation: "CreateUser", input: "CreateUserRequest", output: "CreateUserResponse", description: "Register a new user account." },
  { operation: "UpdateUser", input: "UpdateUserRequest", output: "UpdateUserResponse", description: "Modify user profile fields." },
  { operation: "DeleteUser", input: "DeleteUserRequest", output: "DeleteUserResponse", description: "Remove a user and all associated data." },
];

const envelopeParts = [
  { name: "Envelope", tag: "soap:Envelope", description: "Root element wrapping the entire message.", color: "text-amber-400" },
  { name: "Header", tag: "soap:Header", description: "Optional metadata: auth, transactions, routing.", color: "text-cyan-400" },
  { name: "Body", tag: "soap:Body", description: "Contains the actual request/response payload.", color: "text-emerald-400" },
  { name: "Fault", tag: "soap:Fault", description: "Error information when a request fails.", color: "text-red-400" },
];

export default function SoapDocsPage() {
  return (
    <DocPageLayout protocolKey="soap">
      <div>
        <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">{doc.category}</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground mb-3 tracking-tight">{doc.name}</h1>
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed italic">{doc.tagline}</p>
      </div>

      <div className="rounded-2xl border border-border bg-muted/15 p-4 sm:p-6">
        <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-4">SOAP Envelope Inspector</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="rounded-xl border border-border bg-background p-4">
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 mb-2 block">Request Envelope</span>
            <pre className="text-xs font-mono text-foreground/80 whitespace-pre-wrap overflow-x-auto leading-relaxed">
{`<soap:Envelope
  xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Header>
    <auth:Token xmlns:auth="auth">abc123</auth:Token>
  </soap:Header>
  <soap:Body>
    <tns:GetUser
      xmlns:tns="http://sphere.dev/UserService">
      <tns:UserId>1</tns:UserId>
    </tns:GetUser>
  </soap:Body>
</soap:Envelope>`}
            </pre>
          </div>
          <div className="rounded-xl border border-border bg-background p-4">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 mb-2 block">Response Envelope</span>
            <pre className="text-xs font-mono text-emerald-300/80 whitespace-pre-wrap overflow-x-auto leading-relaxed">
{`<soap:Envelope
  xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <tns:GetUserResponse
      xmlns:tns="http://sphere.dev/UserService">
      <tns:User>
        <tns:ID>1</tns:ID>
        <tns:Name>Alice Smith</tns:Name>
        <tns:Email>alice@example.com</tns:Email>
      </tns:User>
    </tns:GetUserResponse>
  </soap:Body>
</soap:Envelope>`}
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
        <h3 className="text-sm font-bold text-foreground mb-3">Envelope Structure</h3>
        <div className="flex flex-col gap-2">
          {envelopeParts.map((p, i) => (
            <div key={i} className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-muted/30 border border-border/40">
              <code className={`text-xs font-mono font-bold ${p.color}`}>{`<${p.tag}>`}</code>
              <span className="text-xs text-muted-foreground">{p.description}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-border bg-background/40 p-5">
        <h3 className="text-sm font-bold text-foreground mb-3">WSDL Operations</h3>
        <div className="rounded-xl border border-border overflow-hidden">
          <div className="grid grid-cols-[1fr_1.2fr_1.2fr_1.5fr] gap-px bg-border text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
            <span className="bg-muted/60 px-3 py-2">Operation</span>
            <span className="bg-muted/60 px-3 py-2">Input</span>
            <span className="bg-muted/60 px-3 py-2">Output</span>
            <span className="bg-muted/60 px-3 py-2 hidden sm:block">Description</span>
          </div>
          {operations.map((op, i) => (
            <div key={i} className="grid grid-cols-[1fr_1.2fr_1.2fr_1.5fr] gap-px bg-border text-xs">
              <span className="bg-background px-3 py-2 font-mono font-semibold text-amber-300">{op.operation}</span>
              <span className="bg-background px-3 py-2 font-mono text-muted-foreground">{op.input}</span>
              <span className="bg-background px-3 py-2 font-mono text-emerald-400">{op.output}</span>
              <span className="bg-background px-3 py-2 text-muted-foreground hidden sm:block">{op.description}</span>
            </div>
          ))}
        </div>
      </div>

      <DocsConsole doc={doc} />
      <CodeTabs snippets={doc.codeSnippets} />
      <ProsConsGrid pros={doc.pros} cons={doc.cons} />
    </DocPageLayout>
  );
}
