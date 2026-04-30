import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

const SUPABASE_URL = 'https://wkyqesqmfthcpemqpjvo.supabase.co';
const SUPABASE_KEY = 'sb_publishable_EW4WRdcYH_6y8rlen9Pn2A_e8_cKveu';

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

console.log("Scholarite Engine : Connexion établie.");

