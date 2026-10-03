/// <reference types="vite/client" />
import { createClient } from "@supabase/supabase-js";

// Read connection details from environment variables.
// See .env.example for the required variable names.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

if (!supabaseUrl || !supabaseAnonKey) {
  // Fail loudly in development if the environment is not configured.
  // This avoids confusing runtime errors deeper in the app.
  console.warn(
    "Supabase environment variables are missing. Copy .env.example to .env and fill in your project values."
  );
}

// Single shared Supabase client used across the app.
// Fall back to placeholder values so a missing env var cannot crash the whole app
// at import time (createClient throws on an empty URL, which causes a blank page).
export const supabase = createClient(
  supabaseUrl || "https://placeholder.supabase.co",
  supabaseAnonKey || "placeholder-anon-key"
);