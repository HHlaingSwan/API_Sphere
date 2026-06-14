import { cn } from "@/lib/utils";

const methodColors: Record<string, string> = {
  GET: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  POST: "bg-blue-500/15 text-blue-400 border-blue-500/30",
  PUT: "bg-amber-500/15 text-amber-400 border-amber-500/30",
  DELETE: "bg-red-500/15 text-red-400 border-red-500/30",
  PATCH: "bg-purple-500/15 text-purple-400 border-purple-500/30",
};

export default function MethodBadges({ methods }: { methods: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {methods.map((m) => (
        <span
          key={m}
          className={cn(
            "px-3 py-1 text-xs font-bold font-mono rounded-md border uppercase tracking-wider",
            methodColors[m] || "bg-muted text-muted-foreground border-border",
          )}
        >
          {m}
        </span>
      ))}
    </div>
  );
}
