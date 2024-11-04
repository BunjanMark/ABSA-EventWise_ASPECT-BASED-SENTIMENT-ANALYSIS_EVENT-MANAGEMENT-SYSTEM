// src/config/supabaseConfig.js
import { createClient } from "@supabase/supabase-js";
import Config from "react-native-config"; // Import from react-native-config

// Use environment variables for Supabase URL and key
export const supabase = createClient(Config.SUPABASE_URL, Config.SUPABASE_KEY, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
