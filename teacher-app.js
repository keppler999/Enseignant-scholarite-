/**
 * SCHOLARITE - Brain Module (Spiral Agence Premium Edition)
 * Logic : High-End Navigation & Interactive Header
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
 * 1. RENDU DU DASHBOARD (Bandes Noires Premium)
 */
function initDashboard() {
    const quickPointage = document.getElementById('top-5');
    if(!quickPointage) return;

    quickPointage.innerHTML = eleves.slice(0, 3).map(e => `
        <div class="list-item-black" style="border-left: 4px solid var(--gold);">
            <div style="display: flex; align-items: center; gap: 15px;">
                <div style="width: 10px; height: 10px; border-radius: 50%; background: #32D74B; box-shadow: 0 0 15px rgba(50, 215, 75, 0.4);"></div>
                <div style="display:flex; flex-direction:column;">
                    <span style="font-size: 0.95rem; font-weight: 700; letter-spacing: 0.2px;">${e.nom}</span>
                    <small style="font-size: 0.6rem; opacity: 0.5; text-transform: uppercase;">Élève en règle</small>
                </div>
            </div>
            <i class="fas fa-chevron-right txt-gold" style="opacity: 0.3; font-size: 0.8rem;"></i>
        </div>
    `).join('') + `
        <div style="text-align: center; padding-top: 20px; opacity: 0.2;">
            <small style="text-transform: uppercase; font-size: 0.5rem; letter-spacing: 4px;">Spiral Engine 3.0 • Kinshasa</small>
        </div>
    `;
}

/**
 * 2. SYSTÈME DE TIROIR (SIDE DRAWER)
 * Optimisé pour le nouveau Header semi-transparent
 */
function setupSideDrawer() {
    const trigger = document.getElementById('menu-trigger');
    const drawer = document.getElementById('side-drawer');
    const closeBtn = document.getElementById('close-drawer');

    if (!trigger || !drawer) return;

    // Réinitialisation propre du trigger
    const newTrigger = trigger.cloneNode(true);
    trigger.parentNode.replaceChild(newTrigger, trigger);

    newTrigger.addEventListener('click', (e) => {
        e.stopPropagation();
        // Petite animation de pression avant ouverture
        newTrigger.style.transform = "scale(0.9)";
        setTimeout(() => {
            newTrigger.style.transform = "scale(1)";
            drawer.classList.add('active');
        }, 100);
    });

    if (closeBtn) {
        closeBtn.onclick = () => drawer.classList.remove('active');
    }

    // Fermeture intelligente
    document.addEventListener('click', (e) => {
        if (drawer.classList.contains('active') && !drawer.contains(e.target) && e.target !== newTrigger) {
            drawer.classList.remove('active');
        }
    });

    // Navigation dans les options
    document.querySelectorAll('.drawer-item').forEach(item => {
        item.onclick = function() {
            const target = this.getAttribute('data-target');
            drawer.classList.remove('active');
            console.log("Spiral Logic : Redirecting to " + target);
        };
    });
}

/**
 * 3. ROUTER DE NAVIGATION (Ultra-Fast)
 */
async function navigationRouter(target) {
    const mainView = document.getElementById('main-view');
    const dashElement = document.getElementById('view-dashboard');

    if (dashElement && !dashboardBackup) {
        dashboardBackup = dashElement.outerHTML;
    }

    // Ferme le tiroir si on navigue
    const drawer = document.getElementById('side-drawer');
    if(drawer) drawer.classList.remove('active');

    if (target === 'view-dashboard') {
        mainView.style.opacity = "0";
        setTimeout(() => {
            mainView.innerHTML = dashboardBackup;
            initDashboard();
            setupSideDrawer();
            mainView.style.opacity = "1";
        }, 150);
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

    // Loader Premium
    mainView.innerHTML = `
        <div style="display:flex; flex-direction:column; justify-content:center; align-items:center; height:55vh; gap:25px;">
            <div style="font-size: 0.9rem; font-weight: 900; letter-spacing: 8px; color: var(--gold); opacity: 0.6; animation: pulse 1s infinite;">SCHOLARITE</div>
            <div style="width: 40px; height: 1.5px; background: var(--gold); position: relative; overflow: hidden;">
                <div style="position: absolute; width: 20px; height: 100%; background: #fff; animation: loadingLine 1s infinite linear;"></div>
            </div>
        </div>`;

    try {
        const response = await fetch(`${fileName}?v=${new Date().getTime()}`);
        if (!response.ok) throw new Error();
        
        const html = await response.text();
        mainView.style.opacity = "0";
        
        setTimeout(() => {
            mainView.innerHTML = html;
            setupSideDrawer();
            mainView.style.opacity = "1";
        }, 200);

    } catch (error) {
        mainView.innerHTML = `
            <div class="glass-box" style="margin:20px; text-align:center; border: 1px solid rgba(212, 175, 55, 0.1);">
                <i class="fas fa-exclamation-triangle txt-gold" style="font-size:1.5rem; margin-bottom:15px; opacity:0.5;"></i>
                <h3 style="font-size:0.7rem; letter-spacing:1px; opacity:0.8;">MODULE EN COURS DE DÉPLOIEMENT</h3>
                <p style="font-size:0.6rem; opacity:0.4;">Spiral Agence travaille sur le fichier ${fileName}</p>
            </div>`;
    }
}

/**
 * 4. BOOTSTRAP INITIAL
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
