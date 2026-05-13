// auth/login-logic.js

const loginForm = document.getElementById('loginForm');
const errorMessage = document.getElementById('errorMessage');

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // 1. Récupération des valeurs
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    // 2. Vérification de sécurité (au cas où le script config.js chargerait mal)
    if (typeof supabaseClient === 'undefined') {
        errorMessage.innerText = "Erreur système : Connexion à la base de données impossible.";
        return;
    }

    // 3. UI Feedback (Désactiver le bouton pour éviter les doubles clics)
    const submitBtn = loginForm.querySelector('button');
    submitBtn.disabled = true;
    submitBtn.innerText = "Connexion...";
    errorMessage.innerText = "";

    try {
        // 4. Tentative de connexion via Supabase
        const { data, error } = await supabaseClient.auth.signInWithPassword({
            email: email,
            password: password,
        });

        if (error) {
            // Erreur d'identifiants ou de réseau
            errorMessage.innerText = "Identifiants incorrects ou accès refusé.";
            console.error("Auth Error:", error.message);
            submitBtn.disabled = false;
            submitBtn.innerText = "SE CONNECTER";
        } else {
            // 5. SUCCÈS : Stockage des données de session
            // On utilise Date.now() pour la règle des 24 heures
            localStorage.setItem('scholarite_session_start', Date.now().toString());
            localStorage.setItem('teacher_id', data.user.id);
            
            // 6. Redirection Dynamique
            // Utiliser window.location.origin permet d'éviter les erreurs "File not found" sur GitHub
            const dashboardUrl = window.location.origin + "/Enseignant-scholarite-/dashboard/index.html";
            window.location.href = dashboardUrl;
        }
    } catch (err) {
        console.error("Critical Error:", err);
        errorMessage.innerText = "Une erreur inattendue est survenue.";
        submitBtn.disabled = false;
        submitBtn.innerText = "SE CONNECTER";
    }
});
