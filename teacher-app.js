/**
 * SCHOLARITE - Brain Module (Mobile Native Edition)
 * Mise à jour : Connexion au nouveau module "Notes"
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
    const quickPointage = document.getElementById('top-5');
    if(!quickPointage) return;

    // Affichage rapide sur le Dashboard (3 élèves)
    quickPointage.innerHTML = eleves.slice(0, 3).map(e => `
        <div class="list-item-black" style="border-left: 3px solid var(--gold);">
            <div style="display: flex; align-items: center; gap: 10px;">
                <div style="width: 8px; height: 8px; border-radius: 50%; background: #4ade80;"></div>
                <span>${e.nom}</span>
            </div>
            <i class="fas fa-chevron-right" style="opacity: 0.3; font-size: 0.7rem;"></i>
        </div>
    `).join('') + `
        <div style="text-align: center; padding: 10px;">
            <small style="color: var(--gold); text-transform: uppercase; font-size: 0.6rem; letter-spacing: 1px;">Accès rapide - Module Notes actif</small>
        </div>
    `;
}

/**
 * 2. MOTEUR DE NAVIGATION (ROUTER)
 */
async function navigationRouter(target) {
    const mainView = document.getElementById('main-view');

    // On sauvegarde le dashboard s'il est présent
    const dashElement = document.getElementById('view-dashboard');
    if (dashElement && !dashboardBackup) {
        dashboardBackup = dashElement.outerHTML;
    }

    if (target === 'view-dashboard') {
        mainView.innerHTML = dashboardBackup;
        initDashboard();
        return;
    }

    // --- CORRECTION DES ROUTES ICI ---
    const routes = {
        'view-saisie': 'notes.html', // Nouveau nom
        'view-appel': 'appel.html',
        'view-carnet': 'carnet.html',
        'view-journal': 'journal.html'
    };

    const fileName = routes[target];
    if (!fileName) return;

    mainView.innerHTML = `
        <div style="display:flex; flex-direction:column; justify-content:center; align-items:center; height:50vh; gap:15px;">
            <div class="txt-gold" style="font-weight:800; letter-spacing:2px; animation: pulse 1.5s infinite;">SPIRAL AGENCE</div>
            <small style="opacity:0.5;">Chargement du module...</small>
        </div>`;

    try {
        const response = await fetch(`${fileName}?v=${new Date().getTime()}`);
        if (!response.ok) throw new Error("Fichier non trouvé");
        
        const html = await response.text();
        mainView.innerHTML = html;

        // On laisse un petit délai pour que le HTML soit rendu avant de charger le JS
        setTimeout(() => {
            handlePageScripts(target);
        }, 100);

    } catch (error) {
        mainView.innerHTML = `
            <div class="glass-box" style="margin:20px; text-align:center; border: 1px solid rgba(251, 113, 133, 0.3);">
                <i class="fas fa-exclamation-triangle txt-red" style="font-size:2rem; margin-bottom:15px;"></i>
                <h3 class="txt-red">ERREUR DE CHARGEMENT</h3>
                <p style="font-size:0.8rem; opacity:0.7;">Le fichier <b>${fileName}</b> est introuvable sur le serveur.</p>
                <button onclick="location.reload()" style="margin-top:15px; padding:10px 20px; background:var(--gold); border:none; border-radius:10px; font-weight:800;">REESSAYER</button>
            </div>`;
    }
}

/**
 * 3. GESTION DES SCRIPTS DYNAMIQUES
 */
function handlePageScripts(target) {
    // --- CORRECTION DU SCRIPT MAP ICI ---
    const scriptMap = {
        'view-saisie': 'notes-app.js', // Nouveau nom
        'view-appel': 'appel-app.js'
    };

    const scriptFile = scriptMap[target];
    if (!scriptFile) return;

    // Nettoyage des anciens scripts pour éviter les bugs
    document.querySelectorAll('.dynamic-script').forEach(s => s.remove());

    const script = document.createElement('script');
    script.src = `${scriptFile}?v=${new Date().getTime()}`;
    script.className = 'dynamic-script';
    document.body.appendChild(script);
}

/**
 * 4. INITIALISATION
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

// Premier chargement
window.addEventListener('DOMContentLoaded', () => {
    initDashboard();
});
