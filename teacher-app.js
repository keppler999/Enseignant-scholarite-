const eleves = [
    {nom: "MALU Jean-Pierre", sex: "M", moyenne: 88.5},
    {nom: "YENGO Rebecca", sex: "F", moyenne: 92.1},
    {nom: "TSHIMANGA Paul", sex: "M", moyenne: 75.0},
    {nom: "MUSAU Julie", sex: "F", moyenne: 45.2},
    {nom: "KABASELE Luc", sex: "M", moyenne: 82.4},
    {nom: "BAHATI Sarah", sex: "F", moyenne: 91.0},
    {nom: "LUVUMBU Robert", sex: "M", moyenne: 52.8},
    {nom: "DIALLO Mariam", sex: "F", moyenne: 89.2},
    {nom: "ZOLA Claire", sex: "F", moyenne: 38.5},
    {nom: "NDOKI Jean", sex: "M", moyenne: 66.7},
    {nom: "BIOLA Anne", sex: "F", moyenne: 94.5},
    {nom: "YENGO Raoul", sex: "M", moyenne: 41.0}
];

// 1. CHARGEMENT DU DASHBOARD (Initialisation)
function loadDashboard() {
    const scrollBox = document.getElementById('scroll-averages');
    if(!scrollBox) return; // Sécurité si on n'est pas sur le dash

    scrollBox.innerHTML = ""; // On vide avant de remplir
    eleves.forEach(e => {
        scrollBox.innerHTML += `
            <div class="list-item-black">
                <span>${e.nom}</span>
                <span class="${e.moyenne < 50 ? 'txt-red' : 'txt-green'}">${e.moyenne}%</span>
            </div>
        `;
    });

    const sorted = [...eleves].sort((a,b) => b.moyenne - a.moyenne);
    const topBox = document.getElementById('top-5');
    const bottomBox = document.getElementById('bottom-5');

    topBox.innerHTML = ""; 
    bottomBox.innerHTML = "";

    sorted.slice(0, 5).forEach(e => {
        topBox.innerHTML += `<div class="list-item-black"><span>${e.nom}</span> <span class="txt-green">${e.moyenne}%</span></div>`;
    });

    sorted.slice(-5).reverse().forEach(e => {
        bottomBox.innerHTML += `<div class="list-item-black"><span>${e.nom}</span> <span class="txt-red">${e.moyenne}%</span></div>`;
    });
}

// 2. LE MOTEUR DE NAVIGATION (Chargement des fichiers externes)
async function chargerPage(target, fileName) {
    const mainView = document.getElementById('main-view');
    
    try {
        const response = await fetch(fileName);
        if (!response.ok) throw new Error("Fichier non trouvé");
        const html = await response.text();
        
        // On injecte le contenu dans la zone d'affichage
        mainView.innerHTML = html;

        // LOGIQUE SPÉCIFIQUE SELON LA PAGE
        if (target === 'view-saisie') {
            // Si on charge la page cote, on active sa logique
            if (typeof genererTableau === "function") {
                genererTableau(); 
            } else {
                // Charge le script si pas encore présent
                let script = document.createElement('script');
                script.src = 'cote-app.js';
                document.body.appendChild(script);
            }
        }
    } catch (error) {
        mainView.innerHTML = `<div class="glass-box">Erreur de chargement : ${error.message}</div>`;
    }
}

// 3. ÉCOUTEUR DE CLICS SUR LE MENU
document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        // Style visuel du menu
        document.querySelector('.nav-btn.active').classList.remove('active');
        btn.classList.add('active');

        const target = btn.getAttribute('data-target');

        // ROUTAGE DES PAGES
        if (target === 'view-dashboard') {
            // On peut soit recharger le contenu HTML du dash, soit rafraîchir
            location.reload(); 
        } 
        else if (target === 'view-saisie') {
            chargerPage('view-saisie', 'cote.html');
        }
        else if (target === 'view-carnet') {
            chargerPage('view-carnet', 'carnet.html'); // Prépare déjà le futur fichier
        }
    });
});

// Lancement au démarrage
window.onload = loadDashboard;
        
