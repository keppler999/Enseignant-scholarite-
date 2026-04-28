/**
 * SCHOLARITE - Module Carnet (Journal de Classe)
 * Logique : Gestion de l'emploi du temps et planification
 */

(function() {
    // Emploi du temps type pour une journée en 6ème EP (RDC)
    const planningJour = [
        { heure: "08h00 - 09h30", cours: "Mathématiques", statut: "Terminé", icon: "fa-calculator" },
        { heure: "09h30 - 11h00", cours: "Français / Lecture", statut: "En cours", icon: "fa-book-open" },
        { heure: "11h00 - 12h00", cours: "Géographie", statut: "Planifié", icon: "fa-globe-africa" },
        { heure: "12h00 - 12h30", cours: "Récréation", statut: "Planifié", icon: "fa-coffee" }
    ];

    function initCarnet() {
        const container = document.getElementById('schedule-container');
        if (!container) return;

        // Génération des bandes noires de l'emploi du temps
        container.innerHTML = planningJour.map((item, index) => `
            <div class="list-item-black" style="padding: 15px; border-left: 4px solid ${getStatusColor(item.statut)};">
                <div style="display: flex; flex-direction: column; gap: 4px;">
                    <span style="font-size: 0.65rem; opacity: 0.5; font-weight: 700;">${item.heure}</span>
                    <span style="font-weight: 700; font-size: 0.95rem;">${item.cours}</span>
                </div>
                <div style="text-align: right;">
                    <i class="fas ${item.icon}" style="color: var(--gold); opacity: 0.2; font-size: 1.2rem; position: absolute; right: 60px; top: 20px;"></i>
                    <span style="font-size: 0.6rem; text-transform: uppercase; font-weight: 800; color: ${getStatusColor(item.statut)};">
                        ${item.statut}
                    </span>
                </div>
            </div>
        `).join('');
    }

    function getStatusColor(statut) {
        switch(statut) {
            case 'Terminé': return '#4ade80'; // Vert
            case 'En cours': return '#D4AF37'; // Gold
            default: return 'rgba(255,255,255,0.2)'; // Gris/Blanc
        }
    }

    // Gestion de la sauvegarde du Journal
    document.addEventListener('click', function(e) {
        const btn = e.target.closest('#save-journal-btn');
        if (btn) {
            const sujet = document.getElementById('lesson-topic').value;
            
            if (!sujet) {
                alert("Veuillez saisir le sujet de la leçon avant d'enregistrer.");
                return;
            }

            btn.disabled = true;
            btn.innerHTML = '<i class="fas fa-sync fa-spin"></i> SYNCHRONISATION...';
            btn.style.opacity = "0.7";

            // Simulation d'enregistrement cloud
            setTimeout(() => {
                alert("Journal de classe mis à jour et synchronisé avec la direction.");
                btn.disabled = false;
                btn.innerHTML = 'Enregistrer le journal';
                btn.style.opacity = "1";
                // Nettoyage du champ
                document.getElementById('lesson-topic').value = "";
                document.getElementById('lesson-obs').value = "";
            }, 1800);
        }
    });

    // Lancer l'initialisation
    initCarnet();
})();

