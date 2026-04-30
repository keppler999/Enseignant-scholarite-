/**
 * SCHOLARITE - Module de Saisie (Intelligence)
 * Nom du fichier : notes-app.js
 * Mise à jour : Sécurisation du rendu et de l'interactivité
 */

(function() {
    const listeEleves = [
        "MALU Jean-Pierre", "YENGO Rebecca", "TSHIMANGA Paul", 
        "MUSAU Julie", "KABASELE Luc", "BAHATI Sarah", 
        "LUVUMBU Robert", "DIALLO Mariam", "ZOLA Claire", 
        "NDOKI Jean", "BIOLA Anne", "YENGO Raoul"
    ];

    function initModuleNotes() {
        const container = document.getElementById('students-list-container');
        if (!container) return;

        // Génération des lignes de saisie
        container.innerHTML = listeEleves.map((nom, index) => `
            <div class="list-item-black" style="padding: 15px; margin-bottom: 8px; border: 1px solid rgba(255,255,255,0.05);">
                <div style="display: flex; align-items: center; gap: 12px;">
                    <span style="opacity: 0.2; font-size: 0.7rem; font-weight: 900;">${index + 1}</span>
                    <span style="font-weight: 600; font-size: 0.9rem; letter-spacing: -0.3px;">${nom}</span>
                </div>
                <div style="display: flex; align-items: center; gap: 8px;">
                    <input type="number" class="note-input" data-index="${index}" 
                        placeholder="--" min="0" max="20" 
                        style="width: 55px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.1); color: var(--gold); text-align: center; padding: 10px; border-radius: 10px; font-weight: 900; font-size: 1.1rem; outline: none; transition: 0.3s;">
                    <span style="opacity: 0.3; font-size: 0.6rem; font-weight: 700;">/20</span>
                </div>
            </div>
        `).join('');

        // Attachement des écouteurs d'événements
        container.querySelectorAll('.note-input').forEach(input => {
            input.addEventListener('input', updateUI);
        });
    }

    function updateUI() {
        const inputs = document.querySelectorAll('.note-input');
        if (!inputs.length) return;

        const remplis = Array.from(inputs).filter(i => i.value !== "").length;
        const total = inputs.length;
        const pourcentage = (remplis / total) * 100;

        const bar = document.getElementById('progress-bar');
        const txt = document.getElementById('points-counter');
        
        if (bar) {
            bar.style.width = `${pourcentage}%`;
            bar.style.boxShadow = (remplis === total) ? "0 0 15px var(--gold)" : "none";
        }
        if (txt) {
            txt.innerText = `${remplis} / ${total}`;
        }
    }

    // Gestion du bouton Enregistrer avec délégation d'événements
    document.addEventListener('click', function(e) {
        const btn = e.target.closest('#save-all-btn');
        if (!btn) return;

        const courseSelect = document.getElementById('course-select');
        const matiere = courseSelect ? courseSelect.value : "cette matière";
        
        btn.disabled = true;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> ENREGISTREMENT...';
        btn.style.background = "#fff";
        btn.style.color = "#000";

        // Simulation d'envoi DB
        setTimeout(() => {
            alert(`Félicitations ! Les notes de ${matiere.toUpperCase()} sont enregistrées avec succès.`);
            btn.disabled = false;
            btn.innerHTML = 'Enregistrer les notes';
            btn.style.background = "var(--gold)";
            btn.style.color = "#000";
        }, 1500);
    });

    // Lancement du module
    initModuleNotes();
})();

