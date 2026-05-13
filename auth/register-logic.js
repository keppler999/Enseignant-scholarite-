// auth/register-logic.js

const registerForm = document.getElementById('registerForm');
const msg = document.getElementById('msg');
const btn = document.getElementById('btnRegister');

registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Verrouillage du bouton pendant l'envoi
    btn.disabled = true;
    btn.innerText = "Création en cours...";
    msg.style.color = "white";
    msg.innerText = "Vérification...";

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const fullName = document.getElementById('fullName').value;
    const school = document.getElementById('schoolName').value;

    // 1. Création du compte dans Supabase Auth
    const { data: authData, error: authError } = await supabaseClient.auth.signUp({
        email: email,
        password: password
    });

    if (authError) {
        msg.style.color = "#ff4d4d";
        msg.innerText = "Erreur : " + authError.message;
        btn.disabled = false;
        btn.innerText = "Créer mon compte";
        return;
    }

    // 2. Insertion des infos dans la table 'enseignants'
    if (authData.user) {
        const { error: dbError } = await supabaseClient
            .from('enseignants')
            .insert([
                { 
                    id: authData.user.id, 
                    nom_complet: fullName, 
                    ecole: school,
                    email: email
                }
            ]);

        if (dbError) {
            console.error("Erreur DB:", dbError);
            msg.style.color = "#ff4d4d";
            msg.innerText = "Compte créé, mais erreur de profil. Contactez l'admin.";
        } else {
            msg.style.color = "#4dff4d";
            msg.innerText = "Inscription réussie ! Redirection...";
            
            // On enregistre le début de session (24h)
            localStorage.setItem('scholarite_session_start', Date.now());
            localStorage.setItem('teacher_id', authData.user.id);
            
            setTimeout(() => {
                window.location.href = "../dashboard/index.html";
            }, 2000);
        }
    }
});

