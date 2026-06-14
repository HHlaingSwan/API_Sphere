import { cn } from "@/lib/utils";

function statusColor(code: number): string {
  if (code >= 200 && code < 300) return "bg-emerald-500/15 text-emerald-400 border-emerald-500/30";
  if (code >= 300 && code < 400) return "bg-blue-500/15 text-blue-400 border-blue-500/30";
  if (code >= 400 && code < 500) return "bg-amber-500/15 text-amber-400 border-amber-500/30";
  if (code >= 500) return "bg-red-500/15 text-red-400 border-red-500/30";
  return "bg-muted text-muted-foreground border-border";
}

export default function StatusBadge({ code, name }: { code: number; name: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold font-mono rounded-md border",
        statusColor(code),
      )}
    >
      <span>{code}</span>
      <span className="font-semibold opacity-70">{name}</span>
    </span>
  );
}
