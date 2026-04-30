/**
 * SCHOLARITE - Module Journal (Flux Direction)
 * Logique : Affichage des communiqués administratifs
 * Mise à jour : Stabilisation du rendu et des sélecteurs
 */

(function() {
    // Simulation des données envoyées par la direction
    const communiques = [
        {
            id: 1,
            emetteur: "DIRECTION GÉNÉRALE",
            titre: "Réunion Pédagogique Mensuelle",
            message: "La présence de tous les titulaires est obligatoire ce samedi à 10h00 en salle des professeurs.",
            date: "Il y a 2h",
            priorite: "important",
            icon: "fa-users"
        },
        {
            id: 2,
            emetteur: "COMPTABILITÉ",
            titre: "Clôture des Frais S1",
            message: "Veuillez rappeler aux élèves que la date limite pour le solde du premier semestre est fixée au 05 mai.",
            date: "Mardi 28/04",
            priorite: "info",
            icon: "fa-wallet"
        },
        {
            id: 3,
            emetteur: "SECRÉTARIAT",
            titre: "Nouveau Professeur d'Anglais",
            message: "Nous accueillons M. Bakongo qui rejoindra l'équipe dès lundi pour les classes de 5ème et 6ème EP.",
            date: "Hier",
            priorite: "success",
            icon: "fa-user-plus"
        }
    ];

    function initJournal() {
        const container = document.getElementById('news-feed-container');
        if (!container) return;

        // Génération des cartes de communiqués
        container.innerHTML = communiques.map(item => `
            <div class="list-item-black" style="flex-direction: column; align-items: flex-start; gap: 10px; padding: 18px; position: relative; overflow: hidden; margin-bottom: 12px; border-radius: 15px;">
                
                <div style="position: absolute; top: 0; left: 0; width: 4px; height: 100%; background: ${getPriorityColor(item.priorite)};"></div>

                <div style="display: flex; justify-content: space-between; width: 100%; align-items: center;">
                    <span style="font-size: 0.6rem; font-weight: 800; color: ${getPriorityColor(item.priorite)}; text-transform: uppercase; letter-spacing: 1px;">
                        <i class="fas ${item.icon}"></i> ${item.emetteur}
                    </span>
                    <span style="font-size: 0.6rem; opacity: 0.4;">${item.date}</span>
                </div>

                <h4 style="margin: 0; font-size: 0.9rem; color: #fff; font-weight: 700;">${item.titre}</h4>
                
                <p style="margin: 0; font-size: 0.75rem; opacity: 0.7; line-height: 1.4; font-weight: 400;">
                    ${item.message}
                </p>

                <div style="display: flex; gap: 10px; margin-top: 5px;">
                    <button style="background: rgba(255,255,255,0.05); border: none; color: var(--gold); font-size: 0.65rem; padding: 5px 12px; border-radius: 5px; font-weight: 700; cursor: pointer;">
                        LIRE PLUS
                    </button>
                    <button style="background: transparent; border: none; color: rgba(255,255,255,0.3); font-size: 0.65rem; font-weight: 700; cursor: pointer;">
                        IGNORER
                    </button>
                </div>
            </div>
        `).join('');
    }

    function getPriorityColor(priorite) {
        switch(priorite) {
            case 'important': return '#fb7185'; // Rose/Rouge
            case 'success': return '#4ade80';   // Vert
            case 'info': return '#D4AF37';      // Gold
            default: return 'rgba(255,255,255,0.2)';
        }
    }

    // Initialisation
    initJournal();
})();

