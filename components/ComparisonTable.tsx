"use client";

import { useState, useMemo } from "react";
import { Search, ArrowUp, ArrowDown, Check, X } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface ProtocolDetail {
  name: string;
  category:
    | "Request-Response"
    | "Real-time & Bidirectional"
    | "Push / Event-Driven"
    | "RPC"
    | "AI Context";
  transport: string;
  serialization: string;
  bidirectional: boolean;
  useCase: string;
  latency: "Low" | "Medium" | "High" | "Ultra-Low";
}

const protocols: ProtocolDetail[] = [
  {
    name: "REST",
    category: "Request-Response",
    transport: "HTTP/1.1, HTTP/2",
    serialization: "JSON, XML, HTML",
    bidirectional: false,
    useCase: "Standard CRUD APIs, Public Web APIs",
    latency: "Medium",
  },
  {
    name: "GraphQL",
    category: "Request-Response",
    transport: "HTTP/1.1, HTTP/2",
    serialization: "JSON",
    bidirectional: false,
    useCase: "Complex queries, frontend-driven data requirements",
    latency: "Medium",
  },
  {
    name: "SOAP",
    category: "Request-Response",
    transport: "HTTP, SMTP, TCP",
    serialization: "XML",
    bidirectional: false,
    useCase: "Legacy systems, high-security financial transactions",
    latency: "High",
  },
  {
    name: "Webhooks",
    category: "Push / Event-Driven",
    transport: "HTTP POST",
    serialization: "JSON, XML",
    bidirectional: false,
    useCase: "Payment confirmations (Stripe), CI/CD build notifications",
    latency: "Medium",
  },
  {
    name: "WebSockets",
    category: "Real-time & Bidirectional",
    transport: "TCP / WS",
    serialization: "JSON, Binary, Custom",
    bidirectional: true,
    useCase: "Multiplayer games, chat rooms, collaborative apps",
    latency: "Ultra-Low",
  },
  {
    name: "WebRTC",
    category: "Real-time & Bidirectional",
    transport: "UDP / Peer-to-Peer",
    serialization: "Binary (SCTP)",
    bidirectional: true,
    useCase: "Direct audio/video calls, P2P high-speed file sharing",
    latency: "Ultra-Low",
  },
  {
    name: "gRPC",
    category: "RPC",
    transport: "HTTP/2",
    serialization: "Protobuf (Binary)",
    bidirectional: true,
    useCase: "Microservice-to-microservice high-speed communication",
    latency: "Ultra-Low",
  },
  {
    name: "MCP (Model Context)",
    category: "AI Context",
    transport: "SSE, JSON-RPC 2.0",
    serialization: "JSON",
    bidirectional: true,
    useCase:
      "Connecting AI Agents to external IDE tools, databases, and context",
    latency: "Low",
  },
];

const latencyColors: Record<string, string> = {
  "Ultra-Low": "text-secondary",
  Low: "text-green-accent",
  Medium: "text-yellow-500",
  High: "text-orange-500",
};

function SortIcon({ column, sortColumn, sortDirection: _sortDirection }: { column: string; sortColumn: string | null; sortDirection: "asc" | "desc" }) {
  if (sortColumn !== column) {
    return <ArrowUp className="h-3 w-3 inline ml-1.5 text-muted-foreground" />;
  }
  return _sortDirection === "asc" ? (
    <ArrowUp className="h-3 w-3 inline ml-1.5 text-primary" />
  ) : (
    <ArrowDown className="h-3 w-3 inline ml-1.5 text-primary" />
  );
}

export default function ComparisonTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const categories = [
    "All",
    "Request-Response",
    "Real-time & Bidirectional",
    "Push / Event-Driven",
    "RPC",
    "AI Context",
  ];

  const filteredProtocols = useMemo(() => {
    return protocols.filter((p) => {
      const matchesSearch =
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.useCase.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.serialization.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategory === "All" || p.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  const sortedProtocols = useMemo(() => {
    if (!sortColumn) return filteredProtocols;
    return [...filteredProtocols].sort((a, b) => {
      let cmp = 0;
      switch (sortColumn) {
        case "protocol":
          cmp = a.name.localeCompare(b.name);
          break;
        case "category":
          cmp = a.category.localeCompare(b.category);
          break;
        case "transport":
          cmp = a.transport.localeCompare(b.transport);
          break;
        case "serialization":
          cmp = a.serialization.localeCompare(b.serialization);
          break;
        case "bidirectional":
          cmp = Number(b.bidirectional) - Number(a.bidirectional);
          break;
        case "latency": {
          const order = ["Ultra-Low", "Low", "Medium", "High"];
          cmp = order.indexOf(a.latency) - order.indexOf(b.latency);
          break;
        }
        case "useCase":
          cmp = a.useCase.localeCompare(b.useCase);
          break;
      }
      return sortDirection === "asc" ? cmp : -cmp;
    });
  }, [filteredProtocols, sortColumn, sortDirection]);

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-muted/40 p-4 rounded-xl border border-border backdrop-blur-sm">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4.5 w-4.5" />
          <input
            type="text"
            placeholder="Search protocols..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm bg-background/60 border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all"
          />
        </div>

        <div className="flex flex-wrap gap-2 w-full md:w-auto justify-start md:justify-end">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={cn(
                "px-3 py-1.5 text-sm font-medium rounded-full transition-all border",
                selectedCategory === cat
                  ? "bg-primary border-primary text-white shadow-md shadow-primary/10"
                  : "bg-background/50 border-border text-muted-foreground hover:text-foreground hover:border-border",
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-border bg-background/30 backdrop-blur-md overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead
                className="cursor-pointer select-none text-muted-foreground font-semibold uppercase text-xs tracking-wider"
                onClick={() => handleSort("protocol")}
              >
                Protocol <SortIcon column="protocol" sortColumn={sortColumn} sortDirection={sortDirection} />
              </TableHead>
              <TableHead
                className="cursor-pointer select-none text-muted-foreground font-semibold uppercase text-xs tracking-wider"
                onClick={() => handleSort("category")}
              >
                Paradigm <SortIcon column="category" sortColumn={sortColumn} sortDirection={sortDirection} />
              </TableHead>
              <TableHead
                className="cursor-pointer select-none text-muted-foreground font-semibold uppercase text-xs tracking-wider"
                onClick={() => handleSort("transport")}
              >
                Transport <SortIcon column="transport" sortColumn={sortColumn} sortDirection={sortDirection} />
              </TableHead>
              <TableHead
                className="cursor-pointer select-none text-muted-foreground font-semibold uppercase text-xs tracking-wider"
                onClick={() => handleSort("serialization")}
              >
                Serialization <SortIcon column="serialization" sortColumn={sortColumn} sortDirection={sortDirection} />
              </TableHead>
              <TableHead
                className="cursor-pointer select-none text-center text-muted-foreground font-semibold uppercase text-xs tracking-wider"
                onClick={() => handleSort("bidirectional")}
              >
                Bi‑Dir <SortIcon column="bidirectional" sortColumn={sortColumn} sortDirection={sortDirection} />
              </TableHead>
              <TableHead
                className="cursor-pointer select-none text-muted-foreground font-semibold uppercase text-xs tracking-wider"
                onClick={() => handleSort("latency")}
              >
                Latency <SortIcon column="latency" sortColumn={sortColumn} sortDirection={sortDirection} />
              </TableHead>
              <TableHead
                className="cursor-pointer select-none text-muted-foreground font-semibold uppercase text-xs tracking-wider"
                onClick={() => handleSort("useCase")}
              >
                Use Case <SortIcon column="useCase" sortColumn={sortColumn} sortDirection={sortDirection} />
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedProtocols.length > 0 ? (
              sortedProtocols.map((p) => (
                <TableRow
                  key={p.name}
                  className="border-border hover:bg-muted/30 transition-colors"
                >
                  <TableCell className="font-medium text-foreground">
                    <span className="flex items-center gap-2.5">
                      <span
                        className={cn(
                          "h-2 w-2 rounded-full shrink-0",
                          p.category === "Request-Response" && "bg-green-accent",
                          p.category === "Real-time & Bidirectional" &&
                            "bg-secondary",
                          p.category === "Push / Event-Driven" &&
                            "bg-orange-accent",
                          p.category === "RPC" && "bg-primary",
                          p.category === "AI Context" && "bg-pink-accent",
                        )}
                      />
                      {p.name}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span
                      className={cn(
                        "inline-block px-2 py-0.5 rounded-md text-xs font-medium border",
                        p.category === "Request-Response" &&
                          "bg-green-accent/10 text-green-accent border-green-accent/20",
                        p.category === "Real-time & Bidirectional" &&
                          "bg-secondary/10 text-secondary border-secondary/20",
                        p.category === "Push / Event-Driven" &&
                          "bg-orange-accent/10 text-orange-accent border-orange-accent/20",
                        p.category === "RPC" &&
                          "bg-primary/10 text-primary border-primary/20",
                        p.category === "AI Context" &&
                          "bg-pink-accent/10 text-pink-accent border-pink-accent/20",
                      )}
                    >
                      {p.category}
                    </span>
                  </TableCell>
                  <TableCell className="text-muted-foreground font-mono text-sm">
                    {p.transport}
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm">
                    {p.serialization}
                  </TableCell>
                  <TableCell className="text-center">
                    {p.bidirectional ? (
                      <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-secondary/10 border border-secondary/25">
                        <Check className="h-3.5 w-3.5 text-secondary" />
                      </span>
                    ) : (
                      <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-muted border border-border">
                        <X className="h-3.5 w-3.5 text-muted-foreground" />
                      </span>
                    )}
                  </TableCell>
                  <TableCell>
                    <span
                      className={cn(
                        "text-sm font-semibold",
                        latencyColors[p.latency],
                      )}
                    >
                      {p.latency}
                    </span>
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm max-w-65">
                    <span className="line-clamp-2">{p.useCase}</span>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="h-32 text-center text-muted-foreground"
                >
                  No protocols found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
