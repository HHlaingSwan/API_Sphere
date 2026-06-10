"use client";

import { cn } from "@/lib/utils";
import { BookOpen, X } from "lucide-react";
import { protocolDocs } from "@/data/protocolDocs";

interface DocsSidebarProps {
  currentId: string;
  onSelect: (key: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

export default function DocsSidebar({
  currentId,
  onSelect,
  isOpen,
  onClose,
}: DocsSidebarProps) {
  return (
    <aside
      className={cn(
        "w-full md:w-1/4 shrink-0 overflow-y-auto z-30 transition-all",
        "fixed  top-16 bg-background px-6 py-6 md:relative md:inset-auto md:top-auto md:h-full md:px-0 md:py-8 md:bg-transparent md:block",
        isOpen ? "block" : "hidden",
      )}
    >
      {/* Mobile Header in Drawer */}
      <div className="flex items-center justify-between md:hidden pb-6 border-b border-border mb-6">
        <span className="text-base font-bold text-foreground">
          APISphere Manuals
        </span>
        <button onClick={onClose} aria-label="Close sidebar">
          <X className="h-6 w-6 text-muted-foreground" />
        </button>
      </div>

      <nav className="flex flex-col md:pl-8 md:pr-6 gap-6">
        {/* Architectures */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-1.5">
            <BookOpen className="h-3.5 w-3.5 text-muted-foreground" />
            <span>Architectures & Protocols</span>
          </h4>
          <div className="flex flex-col gap-1">
            {Object.values(protocolDocs).map((item) => {
              const Icon = item.icon;
              const isSelected = item.id === currentId;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelect(item.id)}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-left transition-all border cursor-pointer",
                    isSelected
                      ? "bg-primary/10 border-primary/25 text-foreground font-medium shadow-md shadow-primary/5"
                      : "bg-transparent border-transparent text-muted-foreground hover:text-foreground hover:bg-muted",
                  )}
                >
                  <Icon
                    className={cn(
                      "h-4 w-4 shrink-0",
                      isSelected ? "text-primary" : "text-muted-foreground",
                    )}
                  />
                  <span>{item.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Static reference guides */}
        <div className="border-t border-border pt-6">
          <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">
            Guides
          </h4>
          <div className="space-y-1">
            <a
              href="#"
              className="block px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              How Webhooks Fail
            </a>
            <a
              href="#"
              className="block px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              Choosing real-time protocols
            </a>
            <a
              href="#"
              className="block px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              Security & Key Verification
            </a>
          </div>
        </div>
      </nav>
    </aside>
  );
}
