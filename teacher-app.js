/**
 * SCHOLARITE - Brain Module (Enseignant)
 * Version Corrigée pour Injection Dynamique
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

// On stocke le contenu initial proprement
let dashboardBackup = "";

/**
 * 1. INITIALISATION DU DASHBOARD
 */
function initDashboard() {
    const mainView = document.getElementById('main-view');
    const scrollBox = document.getElementById('scroll-averages');
    
    if(!scrollBox) return;

    // Remplissage des moyennes
    scrollBox.innerHTML = eleves.map(e => `
        <div class="list-item-black">
            <span>${e.nom}</span>
            <span class="${e.moyenne < 50 ? 'txt-red' : 'txt-green'}">${e.moyenne}%</span>
        </div>
    `).join('');

    const sorted = [...eleves].sort((a,b) => b.moyenne - a.moyenne);
    renderList('top-5', sorted.slice(0, 5), 'txt-green');
    renderList('bottom-5', sorted.slice(-5).reverse(), 'txt-red');
}

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
 * 2. MOTEUR DE NAVIGATION
 */
async function navigationRouter(target) {
    const mainView = document.getElementById('main-view');

    // Sauvegarde du dashboard si ce n'est pas fait
    if (!dashboardBackup) {
        dashboardBackup = document.getElementById('view-dashboard').outerHTML;
    }

    if (target === 'view-dashboard') {
        mainView.innerHTML = dashboardBackup;
        initDashboard();
        return;
    }

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
        if (!response.ok) throw new Error("Fichier introuvable");
        const html = await response.text();
        
        // On remplace le contenu de main-view
        mainView.innerHTML = html;

        // CRUCIAL : On attend un tout petit peu que le DOM soit prêt avant de lancer le script
        setTimeout(() => {
            handlePageScripts(target);
        }, 50);

    } catch (error) {
        mainView.innerHTML = `<div class="glass-box" style="margin:20px;">Erreur : ${error.message}</div>`;
    }
}

/**
 * 3. GESTION DES SCRIPTS
 */
function handlePageScripts(target) {
    if (target === 'view-saisie') {
        // On force le re-chargement du script pour être sûr qu'il s'exécute sur le nouveau HTML
        const oldScript = document.querySelector('script[src="cote-app.js"]');
        if (oldScript) oldScript.remove();

        const script = document.createElement('script');
        script.src = 'cote-app.js';
        document.body.appendChild(script);
    }
}

/**
 * 4. ÉCOUTEURS
 */
document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        if (this.classList.contains('active')) return;
        document.querySelector('.nav-btn.active').classList.remove('active');
        this.classList.add('active');
        navigationRouter(this.getAttribute('data-target'));
    });
});

window.addEventListener('DOMContentLoaded', () => {
    initDashboard();
});
        
