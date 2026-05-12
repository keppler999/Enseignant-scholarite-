// shared/js/config.js

// Tes clés d'accès (Vérifie qu'elles sont exactes)
const SB_URL = "https://icmliupsyomblifvkezh.supabase.co";
const SB_KEY = "sb_publishable_kLQJPXQRqLKbpx1KP0be7Q_zHaCzO9c";

// Initialisation du client Supabase
const supabaseClient = supabase.createClient(SB_URL, SB_KEY);

/**
 * GESTION DE LA SESSION 24H
 * Cette fonction sera appelée sur CHAQUE page pour vérifier si l'enseignant 
 * doit être redirigé vers le login.
 */
function verifySession() {
    const sessionStart = localStorage.getItem('scholarite_session_start');
    
    if (!sessionStart) {
        window.location.href = "../auth/index.html";
        return;
    }

    const now = Date.now();
    const twentyFourHours = 24 * 60 * 60 * 1000;

    if (now - parseInt(sessionStart) > twentyFourHours) {
        localStorage.clear(); // On vide tout pour la sécurité
        window.location.href = "../auth/index.html";
    }
}
