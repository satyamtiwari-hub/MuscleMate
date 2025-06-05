import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://jwrhsffhtzwuigbgmgdr.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp3cmhzZmZodHp3dWlnYmdtZ2RyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQyMjg3OTMsImV4cCI6MjA1OTgwNDc5M30.GaxaAGasFs_S9PeK07X-HqlkDW3B1V30eRn2nGzvnDs';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
