import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

if(process.argv[2] === '../.env'){
    dotenv.config({path: process.argv[2]});
}else{
    dotenv.config();
}

let SUPABASE_SECRET_KEY = process.env.SUPABASE_SECRET_KEY;

const supabaseUrl = 'https://msrttzvmxmhwktgferof.supabase.co'
const supabase = createClient(supabaseUrl, SUPABASE_SECRET_KEY as string)

export { supabase }