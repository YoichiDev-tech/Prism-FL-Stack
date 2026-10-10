import { useCallback, useEffect, useState } from "react";
import { isSupabaseConfigured, supabase } from "../lib/supabaseClient";
import { NewTool, Tool } from "../types";

interface UseToolsResult {
  tools: Tool[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
  addTool: (tool: NewTool) => Promise<{ error: string | null }>;
  updateToolApproval: (
    id: string,
    isApproved: boolean
  ) => Promise<{ error: string | null }>;
  deleteTool: (id: string) => Promise<{ error: string | null }>;
}

// Central hook for reading and writing tools from Supabase.
// Keeping data access in one hook keeps pages and components simple.
export function useTools({ enabled = true }: { enabled?: boolean } = {}): UseToolsResult {
  const [tools, setTools] = useState<Tool[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTools = useCallback(async () => {
    if (!isSupabaseConfigured) {
      setTools([]);
      setError("Directory data is unavailable until Supabase is configured.");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { data, error: fetchError } = await supabase
        .from("tools")
        .select("*")
        .order("created_at", { ascending: false });

      if (fetchError) {
        setError(fetchError.message);
        setTools([]);
      } else {
        setTools(data ?? []);
      }
    } catch (fetchError) {
      const message =
        fetchError instanceof Error
          ? fetchError.message
          : "An unexpected error occurred while loading tools.";
      setError(message);
      setTools([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!enabled) {
      setTools([]);
      setLoading(false);
      setError(null);
      return;
    }
    void fetchTools();
  }, [enabled, fetchTools]);

  // Inserts a new tool and refreshes the local list on success.
  const addTool = useCallback(
    async (tool: NewTool) => {
      if (!isSupabaseConfigured) {
        return { error: "Submissions are unavailable until Supabase is configured." };
      }

      const normalizedTool: NewTool = {
        ...tool,
        name: tool.name.trim(),
        category: tool.category.trim(),
        description: tool.description.trim(),
        link: tool.link.trim(),
      };
      if (!normalizedTool.name || normalizedTool.name.length > 100) {
        return { error: "Tool name must be between 1 and 100 characters." };
      }
      if (!normalizedTool.category || normalizedTool.category.length > 80) {
        return { error: "Category must be between 1 and 80 characters." };
      }
      if (!normalizedTool.description || normalizedTool.description.length > 1200) {
        return { error: "Description must be between 1 and 1,200 characters." };
      }
      try {
        const parsedLink = new globalThis.URL(normalizedTool.link);
        if (!["http:", "https:"].includes(parsedLink.protocol) || !parsedLink.hostname || normalizedTool.link.length > 2048) {
          return { error: "Enter a valid HTTP or HTTPS URL (maximum 2,048 characters)." };
        }
      } catch {
        return { error: "Enter a valid HTTP or HTTPS URL." };
      }

      try {
        const { error: insertError } = await supabase
          .from("tools")
          .insert([{ ...normalizedTool, is_approved: false }]);

        return { error: insertError?.message ?? null };
      } catch (insertError) {
        return {
          error:
            insertError instanceof Error
              ? insertError.message
              : "An unexpected error occurred while submitting the tool.",
        };
      }
    },
    []
  );

  const updateToolApproval = useCallback(
    async (id: string, isApproved: boolean) => {
      if (!isSupabaseConfigured) return { error: "Supabase is not configured." };
      try {
        const { data, error: updateError } = await supabase
          .from("tools")
          .update({ is_approved: isApproved })
          .eq("id", id)
          .select("id")
          .maybeSingle();

        if (updateError) return { error: updateError.message };
        if (!data) {
          return { error: "The tool was not found or could not be updated." };
        }

        await fetchTools();
        return { error: null };
      } catch (updateError) {
        return {
          error:
            updateError instanceof Error
              ? updateError.message
              : "An unexpected error occurred while updating the tool.",
        };
      }
    },
    [fetchTools]
  );

  // Deletes a tool by id and refreshes the local list on success.
  const deleteTool = useCallback(
    async (id: string) => {
      if (!isSupabaseConfigured) return { error: "Supabase is not configured." };
      try {
        const { data, error: deleteError } = await supabase
          .from("tools")
          .delete()
          .eq("id", id)
          .select("id")
          .maybeSingle();

        if (deleteError) return { error: deleteError.message };
        if (!data) {
          return { error: "The tool was not found or could not be deleted." };
        }

        await fetchTools();
        return { error: null };
      } catch (deleteError) {
        return {
          error:
            deleteError instanceof Error
              ? deleteError.message
              : "An unexpected error occurred while deleting the tool.",
        };
      }
    },
    [fetchTools]
  );

  return {
    tools,
    loading,
    error,
    refetch: fetchTools,
    addTool,
    updateToolApproval,
    deleteTool,
  };
}
