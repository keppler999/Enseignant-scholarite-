// shared/js/supabase-config.js
const SUPABASE_URL = "https://icmliupsyomblifvkezh.supabase.co";
const SUPABASE_KEY = "sb_publishable_kLQJPXQRqLKbpx1KP0be7Q_zHaCzO9c";

// Initialisation globale
const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// Fonction pour vérifier la session de 24h
function checkSession() {
    const sessionStart = localStorage.getItem('scholarite_session_timestamp');
    if (!sessionStart) return false;
    
    const hours = (Date.now() - parseInt(sessionStart)) / (1000 * 60 * 60);
    return hours < 24;
}

