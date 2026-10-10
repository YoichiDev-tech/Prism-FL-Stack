/// <reference types="vite/client" />
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.trim();
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim();

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

if (!isSupabaseConfigured) {
  console.warn(
    "Tool Index is running without Supabase configuration. Database and admin features will not work until VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set."
  );
}

// This fallback prevents import-time crashes in local previews. It is not a
// production configuration. Never expose service-role keys in VITE_* variables.
export const supabase = createClient(
  supabaseUrl || "https://placeholder.supabase.co",
  supabaseAnonKey || "placeholder-anon-key"
);
