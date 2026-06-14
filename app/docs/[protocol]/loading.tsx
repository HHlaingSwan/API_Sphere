import Navbar from "@/components/Navbar";

export default function DocPageLoading() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />
      <div className="flex-1 overflow-y-auto">
        <div className="w-full max-w-4xl mx-auto flex flex-col gap-8 px-4 sm:px-6 lg:px-8 py-8">
          <div className="h-4 w-28 bg-muted rounded animate-pulse" />

          <div className="animate-pulse">
            <div className="h-3 w-20 bg-muted rounded mb-3" />
            <div className="h-8 w-48 bg-muted rounded mb-3" />
            <div className="h-4 w-72 bg-muted rounded" />
          </div>

          <div className="rounded-2xl border border-border bg-muted/15 p-4 sm:p-6 animate-pulse">
            <div className="h-3 w-40 bg-muted rounded mb-4" />
            <div className="flex items-center justify-between py-6">
              <div className="h-16 w-16 bg-muted rounded-xl" />
              <div className="flex-1 mx-8">
                <div className="h-2 w-full bg-muted rounded-full mb-2" />
                <div className="flex gap-2 justify-center">
                  <div className="h-5 w-10 bg-muted rounded" />
                  <div className="h-5 w-10 bg-muted rounded" />
                  <div className="h-5 w-10 bg-muted rounded" />
                </div>
              </div>
              <div className="h-16 w-16 bg-muted rounded-xl" />
            </div>
          </div>

          <div className="space-y-3">
            <div className="h-4 w-full bg-muted rounded" />
            <div className="h-4 w-5/6 bg-muted rounded" />
            <div className="h-4 w-4/6 bg-muted rounded" />
          </div>

          <div className="rounded-xl border border-border bg-muted/15 p-5 animate-pulse">
            <div className="h-3 w-32 bg-muted rounded mb-3" />
            <div className="space-y-2">
              <div className="h-10 w-full bg-muted rounded-lg" />
              <div className="h-10 w-full bg-muted rounded-lg" />
              <div className="h-10 w-full bg-muted rounded-lg" />
            </div>
          </div>

          <div className="glass-panel p-5 rounded-2xl animate-pulse">
            <div className="h-4 w-40 bg-muted rounded mb-4" />
            <div className="flex gap-2 mb-3">
              <div className="h-9 w-24 bg-muted rounded-lg" />
              <div className="h-9 flex-1 bg-muted rounded-lg" />
            </div>
            <div className="h-9 w-full bg-muted rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  );
}
