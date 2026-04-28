/**
 * SCHOLARITE - Brain Module (Enseignant)
 * Optimisé pour GitHub Pages & Navigation Multi-Modules
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

let dashboardBackup = "";

/**
 * 1. INITIALISATION DU DASHBOARD
 */
function initDashboard() {
    const scrollBox = document.getElementById('scroll-averages');
    if(!scrollBox) return;

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
 * 2. MOTEUR DE NAVIGATION (ROUTER)
 */
async function navigationRouter(target) {
    const mainView = document.getElementById('main-view');

    // Sauvegarde du dashboard au premier clic
    if (!dashboardBackup) {
        const dashElement = document.getElementById('view-dashboard');
        if(dashElement) dashboardBackup = dashElement.outerHTML;
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
        // Ajout d'un cache-breaker pour GitHub Pages (?v=...)
        const response = await fetch(`${fileName}?v=${new Date().getTime()}`);
        if (!response.ok) throw new Error(`Fichier ${fileName} non trouvé (Erreur ${response.status})`);
        
        const html = await response.text();
        mainView.innerHTML = html;

        // On laisse le DOM respirer avant d'injecter la logique
        setTimeout(() => {
            handlePageScripts(target);
        }, 100);

    } catch (error) {
        mainView.innerHTML = `
            <div class="glass-box" style="margin:20px; border: 1px solid rgba(255,0,0,0.3)">
                <h3 class="txt-red"><i class="fas fa-exclamation-triangle"></i> Module Indisponible</h3>
                <p>Le fichier <b>${fileName}</b> semble manquant ou mal nommé sur GitHub.</p>
                <small>${error.message}</small>
            </div>`;
    }
}

/**
 * 3. GESTIONNAIRE DE SCRIPTS DYNAMIQUE
 */
function handlePageScripts(target) {
    // Liste des scripts par module
    const scriptMap = {
        'view-saisie': 'cote-app.js',
        'view-appel': 'appel-app.js'
    };

    const scriptFile = scriptMap[target];
    if (!scriptFile) return;

    // 1. On nettoie les anciens scripts injectés pour éviter les doublons
    const dynamicScripts = document.querySelectorAll('.dynamic-script');
    dynamicScripts.forEach(s => s.remove());

    // 2. On crée le nouveau script
    const script = document.createElement('script');
    script.src = `${scriptFile}?v=${new Date().getTime()}`;
    script.className = 'dynamic-script';
    document.body.appendChild(script);
}

/**
 * 4. ÉCOUTEURS DE NAVIGATION
 */
document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        if (this.classList.contains('active')) return;
        
        const activeBtn = document.querySelector('.nav-btn.active');
        if(activeBtn) activeBtn.classList.remove('active');
        
        this.classList.add('active');
        navigationRouter(this.getAttribute('data-target'));
    });
});

window.addEventListener('DOMContentLoaded', initDashboard);

