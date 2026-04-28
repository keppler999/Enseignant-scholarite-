/**
 * SCHOLARITE - Brain Module (Admin Edition)
 * Optimisé pour le design "Bandes Noires" & Glassmorphism
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
 * Génère les bandes noires semi-transparentes
 */
function initDashboard() {
    const scrollBox = document.getElementById('scroll-averages');
    if(!scrollBox) return;

    // Remplissage avec le style "Admin Row"
    scrollBox.innerHTML = eleves.map(e => `
        <div class="list-item-black">
            <span style="font-weight: 500;">${e.nom}</span>
            <span class="${e.moyenne < 50 ? 'txt-red' : 'txt-gold'}" style="font-weight: 800;">
                ${e.moyenne}%
            </span>
        </div>
    `).join('');

    const sorted = [...eleves].sort((a,b) => b.moyenne - a.moyenne);
    
    // Top 5 avec badges Gold
    renderList('top-5', sorted.slice(0, 5), 'txt-gold');
    // Bottom 5 avec alertes Rouges
    renderList('bottom-5', sorted.slice(-5).reverse(), 'txt-red');
}

function renderList(id, data, colorClass) {
    const container = document.getElementById(id);
    if(container) {
        container.innerHTML = data.map((e, index) => `
            <div class="list-item-black">
                <div style="display:flex; align-items:center; gap:8px;">
                    <small style="opacity:0.4; font-size:0.6rem;">0${index+1}</small>
                    <span>${e.nom}</span>
                </div>
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
        // Cache-breaker pour forcer la mise à jour sur GitHub
        const response = await fetch(`${fileName}?v=${new Date().getTime()}`);
        if (!response.ok) throw new Error(`Fichier ${fileName} introuvable`);
        
        const html = await response.text();
        mainView.innerHTML = html;

        setTimeout(() => {
            handlePageScripts(target);
        }, 100);

    } catch (error) {
        mainView.innerHTML = `
            <div class="glass-box" style="margin:20px; text-align:center;">
                <i class="fas fa-plug txt-red" style="font-size:2rem; margin-bottom:10px;"></i>
                <h3 class="txt-red">ERREUR DE CHARGEMENT</h3>
                <p style="font-size:0.8rem;">Module <b>${fileName}</b> non détecté.</p>
            </div>`;
    }
}

/**
 * 3. GESTION DES SCRIPTS DYNAMIQUES
 */
function handlePageScripts(target) {
    const scriptMap = {
        'view-saisie': 'cote-app.js',
        'view-appel': 'appel-app.js'
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
 * 4. INITIALISATION GLOBALE
 */
document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        if (this.classList.contains('active')) return;
        document.querySelector('.nav-btn.active').classList.remove('active');
        this.classList.add('active');
        navigationRouter(this.getAttribute('data-target'));
    });
});

window.addEventListener('DOMContentLoaded', initDashboard);
        
