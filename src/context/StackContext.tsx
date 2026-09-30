import { createContext, useContext, useEffect, useState } from "react";
import { Tool } from "../types";

interface StackContextValue {
  stack: Tool[];
  addToStack: (tool: Tool) => void;
  removeFromStack: (id: string) => void;
  clearStack: () => void;
}

const StackContext = createContext<StackContextValue | undefined>(undefined);

export function StackProvider({ children }: { children: React.ReactNode }) {
  const [stack, setStack] = useState<Tool[]>(() => {
    const saved = localStorage.getItem("prismstack");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("prismstack", JSON.stringify(stack));
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
    <StackContext.Provider
      value={{ stack, addToStack, removeFromStack, clearStack }}
    >
      {children}
    </StackContext.Provider>
  );
}

export function useStack() {
  const ctx = useContext(StackContext);
  if (!ctx) throw new Error("useStack must be used inside StackProvider");
  return ctx;
}
