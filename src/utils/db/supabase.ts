import { createClient } from '@supabase/supabase-js'
import { SUPABASE_SECRET_KEY } from "$env/static/private"

const supabaseUrl = 'https://msrttzvmxmhwktgferof.supabase.co'
const supabase = createClient(supabaseUrl, SUPABASE_SECRET_KEY)

export { supabase }