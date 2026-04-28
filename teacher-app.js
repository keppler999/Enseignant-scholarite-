/**
 * SCHOLARITE - Brain Module (Mobile Native Edition)
 * Logic : Navigation, Side Drawer & High-Speed Rendering
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
 * 1. RENDU DU DASHBOARD
 */
function initDashboard() {
    const quickPointage = document.getElementById('top-5');
    if(!quickPointage) return;

    quickPointage.innerHTML = eleves.slice(0, 3).map(e => `
        <div class="list-item-black" style="border-left: 3.5px solid var(--gold);">
            <div style="display: flex; align-items: center; gap: 14px;">
                <div style="width: 8px; height: 8px; border-radius: 50%; background: #32D74B; box-shadow: 0 0 12px rgba(50, 215, 75, 0.6);"></div>
                <span style="font-size: 0.95rem; font-weight: 600;">${e.nom}</span>
            </div>
            <i class="fas fa-chevron-right txt-gold" style="opacity: 0.4; font-size: 0.75rem;"></i>
        </div>
    `).join('') + `
        <div style="text-align: center; padding-top: 15px; opacity: 0.2;">
            <small style="text-transform: uppercase; font-size: 0.5rem; letter-spacing: 3px;">Spiral Engine 2.1 • Kinshasa</small>
        </div>
    `;
}

/**
 * 2. SYSTÈME DE TIROIR (SIDE DRAWER)
 * Blindage contre le déploiement accidentel
 */
function setupSideDrawer() {
    const trigger = document.getElementById('menu-trigger');
    const drawer = document.getElementById('side-drawer');
    const closeBtn = document.getElementById('close-drawer');

    if (!trigger || !drawer) return;

    // Reset des écouteurs pour éviter les ouvertures multiples
    const newTrigger = trigger.cloneNode(true);
    trigger.parentNode.replaceChild(newTrigger, trigger);

    newTrigger.addEventListener('click', (e) => {
        e.stopPropagation();
        drawer.classList.add('active');
    });

    if (closeBtn) {
        closeBtn.onclick = () => drawer.classList.remove('active');
    }

    // Fermeture si on clique en dehors du menu
    document.addEventListener('click', (e) => {
        if (drawer.classList.contains('active') && !drawer.contains(e.target) && e.target !== newTrigger) {
            drawer.classList.remove('active');
        }
    });

    // Navigation interne au menu
    document.querySelectorAll('.drawer-item').forEach(item => {
        item.onclick = function() {
            const target = this.getAttribute('data-target');
            drawer.classList.remove('active');
            // navigationRouter(target); // Activer pour les pages de profil/stats
        };
    });
}

/**
 * 3. ROUTER DE NAVIGATION
 */
async function navigationRouter(target) {
    const mainView = document.getElementById('main-view');
    const dashElement = document.getElementById('view-dashboard');

    // Sauvegarde du Dash pour retour rapide
    if (dashElement && !dashboardBackup) {
        dashboardBackup = dashElement.outerHTML;
    }

    // Fermeture forcée du tiroir lors d'une navigation
    const drawer = document.getElementById('side-drawer');
    if(drawer) drawer.classList.remove('active');

    if (target === 'view-dashboard') {
        mainView.innerHTML = dashboardBackup;
        initDashboard();
        setupSideDrawer();
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

    // Transition State
    mainView.innerHTML = `
        <div style="display:flex; flex-direction:column; justify-content:center; align-items:center; height:60vh; gap:20px;">
            <div class="brand-small" style="animation: pulse 1s infinite;">SCHOLARITE</div>
            <div style="width: 30px; height: 2px; background: var(--gold); border-radius: 5px;"></div>
        </div>`;

    try {
        const response = await fetch(`${fileName}?v=${new Date().getTime()}`);
        if (!response.ok) throw new Error();
        
        const html = await response.text();
        mainView.innerHTML = html;

        setTimeout(() => {
            setupSideDrawer(); // Réactive le menu sur la nouvelle page
            // handlePageScripts(target); // Activer si chaque page a son propre .js
        }, 100);

    } catch (error) {
        mainView.innerHTML = `
            <div class="glass-box" style="margin:20px; text-align:center; border: 1px solid rgba(255, 69, 58, 0.2);">
                <i class="fas fa-wifi-slash txt-red" style="font-size:1.8rem; margin-bottom:15px;"></i>
                <h3 class="txt-red" style="font-size:0.75rem;">CONNEXION MODULE ÉCHOUÉE</h3>
                <p style="font-size:0.6rem; opacity:0.6;">Le fichier ${fileName} est introuvable.</p>
            </div>`;
    }
}

/**
 * 4. BOOTSTRAP
 */
document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        if (this.classList.contains('active')) return;
        document.querySelector('.nav-btn.active')?.classList.remove('active');
        this.classList.add('active');
        navigationRouter(this.getAttribute('data-target'));
    });
});

window.addEventListener('DOMContentLoaded', () => {
    initDashboard();
    setupSideDrawer();
});
