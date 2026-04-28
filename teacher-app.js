/**
 * SCHOLARITE - Brain Module (Mobile Native Edition)
 * Focus : Moteur de navigation & Intégration Carnet
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
            <small style="color: var(--gold); text-transform: uppercase; font-size: 0.6rem; letter-spacing: 1px;">Système Scholarite v2.0 - Actif</small>
        </div>
    `;
}

/**
 * 2. MOTEUR DE NAVIGATION (ROUTER)
 */
async function navigationRouter(target) {
    const mainView = document.getElementById('main-view');

    const dashElement = document.getElementById('view-dashboard');
    if (dashElement && !dashboardBackup) {
        dashboardBackup = dashElement.outerHTML;
    }

    if (target === 'view-dashboard') {
        mainView.innerHTML = dashboardBackup;
        initDashboard();
        return;
    }

    // --- ROUTES MISES À JOUR (Carnet inclus) ---
    const routes = {
        'view-saisie': 'notes.html',
        'view-appel': 'appel.html',
        'view-carnet': 'carnet.html', 
        'view-journal': 'journal.html'
    };

    const fileName = routes[target];
    if (!fileName) return;

    mainView.innerHTML = `
        <div style="display:flex; flex-direction:column; justify-content:center; align-items:center; height:50vh; gap:15px;">
            <div class="txt-gold" style="font-weight:800; letter-spacing:2px; animation: pulse 1.5s infinite;">SPIRAL AGENCE</div>
            <small style="opacity:0.5;">Accès au module sécurisé...</small>
        </div>`;

    try {
        const response = await fetch(`${fileName}?v=${new Date().getTime()}`);
        if (!response.ok) throw new Error("Fichier absent");
        
        const html = await response.text();
        mainView.innerHTML = html;

        setTimeout(() => {
            handlePageScripts(target);
        }, 100);

    } catch (error) {
        mainView.innerHTML = `
            <div class="glass-box" style="margin:20px; text-align:center;">
                <i class="fas fa-plug txt-red" style="font-size:2rem; margin-bottom:15px;"></i>
                <h3 class="txt-red">MODULE NON DISPONIBLE</h3>
                <p style="font-size:0.8rem; opacity:0.6;">Le fichier <b>${fileName}</b> est manquant.</p>
            </div>`;
    }
}

/**
 * 3. GESTION DES SCRIPTS DYNAMIQUES
 */
function handlePageScripts(target) {
    // --- SCRIPT MAP MIS À JOUR ---
    const scriptMap = {
        'view-saisie': 'notes-app.js',
        'view-appel': 'appel-app.js',
        'view-carnet': 'carnet-app.js'
    };

    const scriptFile = scriptMap[target];
    if (!scriptFile) return;

    document.querySelectorAll('.dynamic-script').forEach(s => s.remove());

    const script = document.createElement('script');
    script.src = `${scriptFile}?v=${new Date().getTime()}`;
    script.className = 'dynamic-script';
    document.body.appendChild(script);
}

/**
 * 4. EVENT LISTENERS
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

