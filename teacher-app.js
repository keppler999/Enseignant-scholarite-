/**
 * SCHOLARITE - Brain Module (Enseignant)
 * Optimisé par Spiral Agence
 */

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

// Variable pour stocker le HTML original du Dashboard
let dashboardBackup = "";

/**
 * 1. INITIALISATION DU DASHBOARD
 */
function initDashboard() {
    const mainView = document.getElementById('main-view');
    // On sauvegarde la structure du dashboard la première fois
    if (!dashboardBackup) {
        dashboardBackup = mainView.innerHTML;
    }

    const scrollBox = document.getElementById('scroll-averages');
    if(!scrollBox) return;

    // Remplissage optimisé (un seul passage dans le DOM)
    let averagesHtml = eleves.map(e => `
        <div class="list-item-black">
            <span>${e.nom}</span>
            <span class="${e.moyenne < 50 ? 'txt-red' : 'txt-green'}">${e.moyenne}%</span>
        </div>
    `).join('');
    
    scrollBox.innerHTML = averagesHtml;

    // Calcul Top/Bottom 5
    const sorted = [...eleves].sort((a,b) => b.moyenne - a.moyenne);
    renderList('top-5', sorted.slice(0, 5), 'txt-green');
    renderList('bottom-5', sorted.slice(-5).reverse(), 'txt-red');
}

// Fonction utilitaire pour éviter la répétition de code
function renderList(id, data, colorClass) {
    const container = document.getElementById(id);
    if(container) {
        container.innerHTML = data.map(e => `
            <div class="list-item-black">
                <span>${e.nom}</span> 
                <span class="${colorClass}">${e.moyenne}%</span>
            </div>
        `).join('');
    }
}

/**
 * 2. MOTEUR DE CHARGEMENT DYNAMIQUE
 */
async function navigationRouter(target) {
    const mainView = document.getElementById('main-view');

    // Cas particulier : Retour au Dashboard
    if (target === 'view-dashboard') {
        mainView.innerHTML = dashboardBackup;
        initDashboard();
        return;
    }

    // Définition des fichiers selon la cible
    const routes = {
        'view-saisie': 'cote.html',
        'view-appel': 'appel.html',
        'view-carnet': 'carnet.html',
        'view-journal': 'journal.html'
    };

    const fileName = routes[target];
    if (!fileName) return;

    try {
        const response = await fetch(fileName);
        if (!response.ok) throw new Error(`Fichier ${fileName} introuvable`);
        const html = await response.text();
        
        mainView.innerHTML = html;

        // Activation de la logique spécifique après injection
        handlePageScripts(target);

    } catch (error) {
        mainView.innerHTML = `
            <div class="glass-box" style="margin:20px; text-align:center;">
                <i class="fas fa-exclamation-triangle txt-red"></i>
                <p>Erreur de connexion au module : ${target}</p>
                <small>${error.message}</small>
            </div>`;
    }
}

/**
 * 3. GESTIONNAIRE DE SCRIPTS EXTERNES
 */
function handlePageScripts(target) {
    if (target === 'view-saisie') {
        // Si genererTableau existe déjà (script déjà chargé)
        if (typeof genererTableau === "function") {
            genererTableau(); 
        } else {
            const script = document.createElement('script');
            script.src = 'cote-app.js';
            document.body.appendChild(script);
        }
    }
    // Tu pourras ajouter ici d'autres scripts pour appel-app.js, etc.
}

/**
 * 4. ÉCOUTEURS D'ÉVÉNEMENTS
 */
document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        if (this.classList.contains('active')) return;

        // UI Update
        document.querySelector('.nav-btn.active').classList.remove('active');
        this.classList.add('active');

        // Navigation
        const target = this.getAttribute('data-target');
        navigationRouter(target);
    });
});

// Lancement au chargement de la fenêtre
window.addEventListener('DOMContentLoaded', initDashboard);
    
