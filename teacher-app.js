/**
 * SCHOLARITE - Brain Module (Mobile Native Edition)
 * Logic : Navigation, Side Drawer & Data Rendering
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
 * Rendu des "Bandes Noires" Massives
 */
function initDashboard() {
    const quickPointage = document.getElementById('top-5');
    if(!quickPointage) return;

    quickPointage.innerHTML = eleves.slice(0, 3).map(e => `
        <div class="list-item-black" style="border-left: 3px solid var(--gold); margin-bottom:12px;">
            <div style="display: flex; align-items: center; gap: 12px;">
                <div style="width: 8px; height: 8px; border-radius: 50%; background: #32D74B; box-shadow: 0 0 10px #32D74B;"></div>
                <span style="font-size: 0.9rem; font-weight: 600; letter-spacing: 0.3px;">${e.nom}</span>
            </div>
            <i class="fas fa-chevron-right txt-gold" style="opacity: 0.5; font-size: 0.8rem;"></i>
        </div>
    `).join('') + `
        <div style="text-align: center; padding-top: 15px; opacity: 0.3;">
            <small style="text-transform: uppercase; font-size: 0.55rem; letter-spacing: 2.5px;">Spiral Engine • Sync Active</small>
        </div>
    `;
}

/**
 * 2. GESTION DU MENU LATÉRAL (Side Drawer)
 * Blindage du Trigger (Deux barres)
 */
function setupSideDrawer() {
    const trigger = document.getElementById('menu-trigger');
    const drawer = document.getElementById('side-drawer');
    const closeBtn = document.getElementById('close-drawer');

    if (!trigger || !drawer) return;

    // Suppression des anciens écouteurs pour éviter les bugs
    trigger.replaceWith(trigger.cloneNode(true));
    const activeTrigger = document.getElementById('menu-trigger');

    activeTrigger.addEventListener('click', (e) => {
        e.preventDefault();
        drawer.classList.add('active');
    });

    if (closeBtn) {
        closeBtn.onclick = () => drawer.classList.remove('active');
    }

    // Gestion des options du menu
    document.querySelectorAll('.drawer-item').forEach(item => {
        item.onclick = function() {
            const target = this.getAttribute('data-target');
            drawer.classList.remove('active');
            console.log("Navigating to: " + target);
            // navigationRouter(target); 
        };
    });
}

/**
 * 3. MOTEUR DE NAVIGATION (ROUTER)
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
        setupSideDrawer(); // Relance le menu après retour au dash
        return;
    }

    const routes = {
        'view-saisie': 'notes.html',
        'view-appel': 'appel.html',
        'view-carnet': 'carnet.html', 
        'view-journal': 'journal.html'
    };

    const fileName = routes[target];
    if (!fileName) return;

    mainView.innerHTML = `
        <div style="display:flex; flex-direction:column; justify-content:center; align-items:center; height:60vh; gap:20px;">
            <div class="txt-gold" style="font-weight:900; letter-spacing:5px; animation: pulse 1.5s infinite; font-size: 1rem;">SCHOLARITE</div>
            <div style="width: 40px; height: 2px; background: var(--gold); border-radius: 10px;"></div>
        </div>`;

    try {
        const response = await fetch(`${fileName}?v=${new Date().getTime()}`);
        if (!response.ok) throw new Error();
        
        const html = await response.text();
        mainView.innerHTML = html;

        setTimeout(() => {
            handlePageScripts(target);
            setupSideDrawer(); // Toujours garder le menu actif
        }, 150);

    } catch (error) {
        mainView.innerHTML = `
            <div class="glass-box" style="margin:20px; text-align:center; border: 1px solid var(--border-white);">
                <i class="fas fa-wifi-slash txt-red" style="font-size:2rem; margin-bottom:15px;"></i>
                <h3 class="txt-red" style="font-size:0.8rem; letter-spacing:1px;">MODULE INDISPONIBLE</h3>
                <p style="font-size:0.7rem; opacity:0.5;">Vérifiez l'existence de <b>${fileName}</b>.</p>
            </div>`;
    }
}

/**
 * 4. EVENT BINDING & BOOTSTRAP
 */
document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        if (this.classList.contains('active')) return;
        const currentActive = document.querySelector('.nav-btn.active');
        if(currentActive) currentActive.classList.remove('active');
        this.classList.add('active');
        navigationRouter(this.getAttribute('data-target'));
    });
});

window.addEventListener('DOMContentLoaded', () => {
    initDashboard();
    setupSideDrawer();
});
                   
