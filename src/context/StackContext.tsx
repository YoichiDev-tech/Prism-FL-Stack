import { createContext, useContext, useEffect, useState } from "react";
import { Tool } from "../types";

interface StackContextValue {
  stack: Tool[];
  addToStack: (tool: Tool) => void;
  removeFromStack: (id: string) => void;
  clearStack: () => void;
}

const StackContext = createContext<StackContextValue | undefined>(undefined);
const STORAGE_KEY = "veylora-stack";
const LEGACY_KEYS = ["prism-fl-stack", "prismstack"];

function readStoredStack(): Tool[] {
  if (typeof window === "undefined") return [];

  try {
    const storage = window.localStorage;
    const saved = storage.getItem(STORAGE_KEY) ??
      LEGACY_KEYS.map((key) => storage.getItem(key)).find(Boolean);

    if (!saved) return [];

    const parsed: unknown = JSON.parse(saved);
    if (!Array.isArray(parsed)) return [];

    const valid = parsed.filter((item): item is Tool => {
      if (!item || typeof item !== "object") return false;
      const candidate = item as Partial<Tool>;
      return typeof candidate.id === "string" &&
        typeof candidate.name === "string" &&
        typeof candidate.category === "string";
    });

    storage.setItem(STORAGE_KEY, JSON.stringify(valid));
    LEGACY_KEYS.forEach((key) => storage.removeItem(key));
    return valid;
  } catch {
    // Storage may be unavailable or contain malformed data.
    return [];
  }
}

export function StackProvider({ children }: { children: React.ReactNode }) {
  const [stack, setStack] = useState<Tool[]>(readStoredStack);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(stack));
    } catch {
      // Private browsing or storage quotas may prevent persistence.
    }
  }, [stack]);

  function addToStack(tool: Tool) {
    setStack((prev) => {
      if (prev.some((t) => t.id === tool.id)) return prev;
      return [...prev, tool];
    });
  }

  function removeFromStack(id: string) {
    setStack((prev) => prev.filter((t) => t.id !== id));
  }

  function clearStack() {
    setStack([]);
  }

  return (
    <StackContext.Provider value={{ stack, addToStack, removeFromStack, clearStack }}>
      {children}
    </StackContext.Provider>
  );
}

export function useStack() {
  const ctx = useContext(StackContext);
  if (!ctx) throw new Error("useStack must be used inside StackProvider");
  return ctx;
}
