import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://cpkmsuokwcymgwzqqrxz.supabase.co';
const supabaseKey = 'sb_publishable_5Oia6PSB5xK9GwxotVd_MA_Q7lDLA03';

export const supabase = createClient(supabaseUrl, supabaseKey);
