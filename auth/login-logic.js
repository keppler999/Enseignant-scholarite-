// auth/login-logic.js

const loginForm = document.getElementById('loginForm');
const errorMessage = document.getElementById('errorMessage');

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Tentative de connexion via Supabase
    const { data, error } = await supabaseClient.auth.signInWithPassword({
        email: email,
        password: password,
    });

    if (error) {
        errorMessage.innerText = "Identifiants incorrects ou problème réseau.";
        console.error(error.message);
    } else {
        // SUCCÈS : On lance le chrono des 24 heures
        localStorage.setItem('scholarite_session_start', Date.now().toString());
        localStorage.setItem('teacher_id', data.user.id);
        
        // Direction le Dashboard
        window.location.href = "../dashboard/index.html";
    }
});

