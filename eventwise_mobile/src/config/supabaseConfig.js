// src/config/supabaseConfig.js
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ktmddejbdwjeremvbzbl.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt0bWRkZWpiZHdqZXJlbXZiemJsIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyODgzNTU3MSwiZXhwIjoyMDQ0NDExNTcxfQ.jXOW4DixYvrYp-2ctv2hUhILI-E_wAtDTuepyDNtuOE";
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
