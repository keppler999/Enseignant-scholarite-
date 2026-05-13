// shared/js/config.js

const SB_URL = "https://icmliupsyomblifvkezh.supabase.co";
const SB_KEY = "sb_publishable_kLQJPXQRqLKbpx1KP0be7Q_zHaCzO9c";

// Initialisation sécurisée
const supabaseClient = supabase.createClient(SB_URL, SB_KEY);

/**
 * Logique unique pour vérifier la session
 * @returns {boolean} true si la session est valide (-24h)
 */
function isSessionValid() {
    const sessionStart = localStorage.getItem('scholarite_session_start');
    if (!sessionStart) return false;

    const now = Date.now();
    const twentyFourHours = 24 * 60 * 60 * 1000;
    
    return (now - parseInt(sessionStart) < twentyFourHours);
}

/**
 * Fonction à appeler sur les pages de travail (Dashboard, Appel, etc.)
 * Elle redirige vers le login si la session est expirée.
 */
function forceAuth() {
    if (!isSessionValid()) {
        localStorage.clear();
        // On retourne vers la racine du dépôt pour trouver le login
        window.location.href = window.location.origin + "/Enseignant-scholarite-/auth/index.html";
    }
}
