import { createClient } from '@supabase/supabase-js'
export const supabaseUrl = 'https://enoyegffjahwqkmolsbl.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVub3llZ2ZmamFod3FrbW9sc2JsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ1OTI4ODgsImV4cCI6MjA0MDE2ODg4OH0.qA1mOGV_OZgLom31ESzPTXW7CcLuFNMNL5dlVFp9oe8'
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;