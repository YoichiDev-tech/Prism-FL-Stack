import { useEffect, useState } from "react";
import { isSupabaseConfigured, supabase } from "../lib/supabaseClient";
import { Category } from "../types";
import { tools as localTools } from "../data/tools";

interface UseCategoriesResult {
  categories: Category[];
  loading: boolean;
  error: string | null;
}

// Fetches the list of categories from Supabase.
// Categories are read-only in v1; there is no UI to create or edit them.
export function useCategories(): UseCategoriesResult {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchCategories() {
      if (!isSupabaseConfigured) {
        if (isMounted) {
          const names = [...new Set(localTools.map((tool) => tool.category.trim()).filter(Boolean))].sort((a, b) => a.localeCompare(b));
          setCategories(names.map((name) => ({
            id: name.toLowerCase().replace(/\\s+/g, "-"),
            name,
          })));
          setError(null);
          setLoading(false);
        }
        return;
      }

      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from("categories")
        .select("*")
        .order("name", { ascending: true });

      if (!isMounted) return;

      if (fetchError) {
        setError(fetchError.message);
        setCategories([]);
      } else {
        setCategories(data ?? []);
      }

      setLoading(false);
    }

    fetchCategories();

    return () => {
      isMounted = false;
    };
  }, []);

  return { categories, loading, error };
}
