/**
 * SCHOLARITE - Module Appel (Signature Edition)
 * Logique : Gestion dynamique des présences, calcul temps réel & sync Supabase
 */

// État local de l'application
let state = {
    date: new Date().toISOString().split('T')[0],
    session: 'Morning',
    eleves: [
        { id: 1, nom: "Jean DUPONT", present: true },
        { id: 2, nom: "Malu Jean-Pierre", present: true },
        { id: 3, nom: "Lim classs", present: true }
    ]
};

/**
 * Initialisation du module Appel
 */
function initAppel() {
    const container = document.getElementById('appel-list-container');
    if (!container) return;
    
    renderAppelUI();
}

function renderAppelUI() {
    const container = document.getElementById('appel-list-container');
    const summary = calculateSummary();

    // Mise à jour du résumé en haut (Total/Presents/Absents)
    document.getElementById('dash-presents').innerText = summary.present;
    document.getElementById('dash-absents').innerText = summary.absent;
    document.getElementById('dash-total').innerText = state.eleves.length;

    // Rendu de la liste
    container.innerHTML = state.eleves.map((eleve, index) => `
        <div class="list-item-black" style="margin-bottom: 10px;">
            <span style="font-size: 0.8rem; font-weight: 600;">${eleve.nom}</span>
            <div style="display: flex; gap: 10px;">
                <button onclick="togglePresence(${index}, true)" 
                        style="background: ${eleve.present ? '#4ade80' : 'rgba(255,255,255,0.05)'}; border:none; padding: 5px 15px; border-radius: 8px; font-weight: 800; cursor: pointer;">P</button>
                <button onclick="togglePresence(${index}, false)" 
                        style="background: ${!eleve.present ? '#fb7185' : 'rgba(255,255,255,0.05)'}; border:none; padding: 5px 15px; border-radius: 8px; font-weight: 800; cursor: pointer;">A</button>
            </div>
        </div>
    `).join('');
}

// Logique de bascule (Interaction)
window.togglePresence = (index, isPresent) => {
    state.eleves[index].present = isPresent;
    renderAppelUI();
};

// Calcul dynamique
function calculateSummary() {
    const present = state.eleves.filter(e => e.present).length;
    return {
        present: present,
        absent: state.eleves.length - present
    };
}

// Enregistrement (Sync Supabase)
async function saveAppel() {
    const btn = document.getElementById('save-appel-btn');
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> SYNC...';
    
    try {
        // Logique de push Supabase ici
        console.log("Données envoyées à Supabase:", state);
        setTimeout(() => {
            alert("Appel synchronisé avec succès !");
            btn.innerHTML = 'Sauvegarder l\'Appel';
        }, 1000);
    } catch (e) {
        alert("Erreur de synchronisation");
    }
}

// Lancement
document.addEventListener('DOMContentLoaded', initAppel);
