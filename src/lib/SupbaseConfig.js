import { createClient } from "@supabase/supabase-js";

// Create a single supabase client for interacting with your database
const supabase = createClient(
  "https://tupcrwdohmwzcdakzall.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR1cGNyd2RvaG13emNkYWt6YWxsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQxNTYwNDYsImV4cCI6MjA0OTczMjA0Nn0.o5kWD-Veftquq1XryfsrDds6c8jwQrbiHt5wVE_l6K4"
);

export default supabase;
