// supabase client import
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const SUPABASE_URL = 'https://osquztvfekgnuwpzniwb.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9zcXV6dHZmZWtnbnV3cHpuaXdiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY2Mjc2NDcsImV4cCI6MjA3MjIwMzY0N30.M9BLEDg-ynJ2rhQO5BUWES0Dunnov0rCqoXxlNCkguQ';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
