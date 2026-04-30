/**
 * SCHOLARITE - Brain Module (Spiral Agence Premium Edition)
 * Logic : Supabase Real-time Sync & Casier Management
 * Mise à jour : Stabilisation de la navigation et gestion robuste des données
 */

// Global State
let allEleves = [];

/**
 * 1. INITIALISATION & NAVIGATION
 */
window.addEventListener('DOMContentLoaded', () => {
    initDashboard();
    setupSideDrawer();
    fetchEleves(); // Charger les données au démarrage
});

// Récupération des élèves depuis Supabase
async function fetchEleves() {
    try {
        const { data, error } = await supabase.from('eleves').select('*');
        if (error) throw error;
        allEleves = data || [];
        updateDashboard(allEleves);
    } catch (err) {
        console.error("Erreur Sync Supabase:", err);
    }
}

/**
 * 2. SYSTÈME DE TIROIR (SIDE DRAWER)
 */
function setupSideDrawer() {
    const trigger = document.getElementById('menu-trigger');
    const drawer = document.getElementById('side-drawer');
    const closeBtn = document.getElementById('close-drawer');

    if (!trigger || !drawer) return;

    trigger.onclick = () => drawer.classList.add('active');
    closeBtn.onclick = () => drawer.classList.remove('active');

    // Navigation Drawer
    document.querySelectorAll('.drawer-item').forEach(item => {
        item.onclick = function() {
            const target = this.getAttribute('data-target');
            if (drawer) drawer.classList.remove('active');
            triggerNavigation(target);
        };
    });
}

/**
 * 3. ROUTER DE NAVIGATION
 */
function triggerNavigation(target) {
    // Masquer toutes les sections
    document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
    
    // Afficher la cible
    const targetEl = document.getElementById(target);
    if (targetEl) targetEl.classList.add('active');

    // Mise à jour visuelle Nav Basse
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-target') === target);
    });

    // Chargement spécifique si nécessaire
    if (target === 'view-casier') {
        renderCasierView();
    }
}

// Event Listeners Nav Basse (Délégation)
document.querySelector('.mobile-nav')?.addEventListener('click', (e) => {
    const btn = e.target.closest('.nav-btn');
    if (btn) triggerNavigation(btn.getAttribute('data-target'));
});

/**
 * 4. LOGIQUE CASIER ÉLÈVE
 */
function renderCasierView() {
    const container = document.getElementById('view-casier');
    if (!container) return;

    container.innerHTML = `
        <div class="casier-header-actions" style="padding: 10px; display: flex; justify-content: space-between;">
            <div class="search-wrapper" style="flex: 1;">
                <i class="fas fa-search txt-gold" style="opacity:0.5; margin-right: 8px;"></i>
                <input type="text" id="search-eleve" placeholder="Rechercher..." onkeyup="filterEleves()" style="background:transparent; border:none; color:#fff; outline:none;">
            </div>
            <button class="btn-add-eleve" onclick="openModal()" style="background:var(--gold); border:none; padding:8px 15px; border-radius:10px; cursor:pointer;"><i class="fas fa-plus"></i></button>
        </div>
        <div class="eleves-grid" id="eleves-grid" style="padding: 10px; display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px;"></div>
    `;
    renderElevesGrid(allEleves);
}

function renderElevesGrid(elevesList) {
    const grid = document.getElementById('eleves-grid');
    if (!grid) return;
    
    grid.innerHTML = elevesList.map(e => `
        <div class="eleve-card" onclick="openStudentDetail('${e.id}')" style="background:rgba(255,255,255,0.05); padding:15px; border-radius:15px; text-align:center; cursor:pointer;">
            <img src="${e.photo_url || 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix'}" alt="Photo" style="width:50px; border-radius:50%; margin-bottom:10px;">
            <div style="font-weight:600; font-size:0.8rem;">${e.nom || ''}</div>
            <small style="opacity:0.6; font-size:0.7rem;">${e.prenom || ''}</small>
        </div>
    `).join('');
}

function filterEleves() {
    const input = document.getElementById('search-eleve');
    if (!input) return;
    const val = input.value.toLowerCase();
    const filtered = allEleves.filter(e => 
        (e.nom && e.nom.toLowerCase().includes(val)) || 
        (e.prenom && e.prenom.toLowerCase().includes(val))
    );
    renderElevesGrid(filtered);
}

/**
 * 5. GESTION MODAL & FORMULAIRE
 */
function openModal() { const m = document.getElementById('modal-eleve'); if(m) m.style.display = 'flex'; }
function closeModal() { const m = document.getElementById('modal-eleve'); if(m) m.style.display = 'none'; }

document.getElementById('btn-close-modal')?.addEventListener('click', closeModal);

// Soumission du formulaire (Supabase Insert)
document.getElementById('form-eleve')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const newEleve = {
        nom: document.getElementById('f-nom')?.value,
        postnom: document.getElementById('f-postnom')?.value,
        prenom: document.getElementById('f-prenom')?.value,
        sexe: document.getElementById('f-sexe')?.value,
        date_naissance: document.getElementById('f-birth')?.value,
        nom_parents: document.getElementById('f-parents')?.value,
        coordonnees_parents: document.getElementById('f-tel')?.value,
        adresse: document.getElementById('f-adresse')?.value
    };

    const { data, error } = await supabase.from('eleves').insert([newEleve]);
    if (!error) {
        closeModal();
        fetchEleves().then(() => renderCasierView()); 
    } else {
        alert("Erreur de publication : " + error.message);
    }
});

/**
 * 6. MISES À JOUR DASHBOARD
 */
function updateDashboard(eleves) {
    const presentCount = document.getElementById('dash-presents');
    if (presentCount) presentCount.innerText = eleves.length;
}

// Fonction placeholder pour initialisation (Dashboard)
function initDashboard() {
    // Initialisation spécifique au tableau de bord si nécessaire
}
