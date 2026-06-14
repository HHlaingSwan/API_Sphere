export default function ProsConsGrid({ pros, cons }: { pros: string[]; cons: string[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div className="bg-emerald-950/10 border border-emerald-500/20 p-5 rounded-xl">
        <h4 className="text-sm sm:text-base font-bold text-emerald-400 mb-3">Advantages</h4>
        <ul className="space-y-2.5 text-xs sm:text-sm text-muted-foreground">
          {pros.map((pro, i) => (
            <li key={i} className="flex gap-2.5 leading-relaxed">
              <span className="text-emerald-400 font-bold">✓</span>
              <span>{pro}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="bg-rose-950/10 border border-rose-500/20 p-5 rounded-xl">
        <h4 className="text-sm sm:text-base font-bold text-rose-400 mb-3">Challenges</h4>
        <ul className="space-y-2.5 text-xs sm:text-sm text-muted-foreground">
          {cons.map((con, i) => (
            <li key={i} className="flex gap-2.5 leading-relaxed">
              <span className="text-rose-400 font-bold">✕</span>
              <span>{con}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
