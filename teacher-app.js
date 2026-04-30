/**
 * SCHOLARITE - Brain Module (Spiral Agence Premium Edition)
 * Logic : Supabase Real-time Sync & Casier Management
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
            drawer.classList.remove('active');
            triggerNavigation(target);
        };
    });
}

/**
 * 3. ROUTER DE NAVIGATION
 */
function triggerNavigation(target) {
    document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
    document.getElementById(target)?.classList.add('active');

    // Mise à jour visuelle Nav Basse
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-target') === target);
    });

    if (target === 'view-casier') {
        renderCasierView();
    }
}

// Event Listeners Nav Basse
document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', () => triggerNavigation(btn.getAttribute('data-target')));
});

/**
 * 4. LOGIQUE CASIER ÉLÈVE
 */
function renderCasierView() {
    const container = document.getElementById('view-casier');
    container.innerHTML = `
        <div class="casier-header-actions">
            <div class="search-wrapper">
                <i class="fas fa-search txt-gold" style="opacity:0.5;"></i>
                <input type="text" id="search-eleve" placeholder="Rechercher un élève..." onkeyup="filterEleves()">
            </div>
            <button class="btn-add-eleve" onclick="openModal()"><i class="fas fa-plus"></i></button>
        </div>
        <div class="eleves-grid" id="eleves-grid"></div>
    `;
    renderElevesGrid(allEleves);
}

function renderElevesGrid(elevesList) {
    const grid = document.getElementById('eleves-grid');
    if (!grid) return;
    grid.innerHTML = elevesList.map(e => `
        <div class="eleve-card" onclick="openStudentDetail('${e.id}')">
            <img src="${e.photo_url || 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix'}" alt="Photo">
            <span>${e.nom}</span>
            <small>${e.prenom || ''}</small>
        </div>
    `).join('');
}

function filterEleves() {
    const val = document.getElementById('search-eleve').value.toLowerCase();
    const filtered = allEleves.filter(e => 
        e.nom.toLowerCase().includes(val) || 
        e.prenom?.toLowerCase().includes(val)
    );
    renderElevesGrid(filtered);
}

/**
 * 5. GESTION MODAL & FORMULAIRE
 */
function openModal() { document.getElementById('modal-eleve').style.display = 'flex'; }
function closeModal() { document.getElementById('modal-eleve').style.display = 'none'; }

document.getElementById('btn-close-modal').onclick = closeModal;

// Soumission du formulaire (Supabase Insert)
document.getElementById('form-eleve').onsubmit = async (e) => {
    e.preventDefault();
    const newEleve = {
        nom: document.getElementById('f-nom').value,
        postnom: document.getElementById('f-postnom').value,
        prenom: document.getElementById('f-prenom').value,
        sexe: document.getElementById('f-sexe').value,
        date_naissance: document.getElementById('f-birth').value,
        nom_parents: document.getElementById('f-parents').value,
        coordonnees_parents: document.getElementById('f-tel').value,
        adresse: document.getElementById('f-adresse').value
    };

    const { data, error } = await supabase.from('eleves').insert([newEleve]);
    if (!error) {
        closeModal();
        fetchEleves().then(() => renderCasierView()); // Rechargement
    } else {
        alert("Erreur de publication : " + error.message);
    }
};

/**
 * 6. MISES À JOUR DASHBOARD
 */
function updateDashboard(eleves) {
    const presentCount = document.getElementById('dash-presents');
    if (presentCount) presentCount.innerText = eleves.length;
}
