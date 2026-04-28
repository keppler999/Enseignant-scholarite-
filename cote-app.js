/**
 * SCHOLARITE - Module Saisie des Cotes
 * Logique d'affichage des élèves
 */

(function() {
    const listeEleves = [
        "MALU, Jean-Pierre", "YENGO, Rebecca", "TSHIMANGA, Paul", 
        "MUSAU, Julie", "KABASELE, Luc", "BAHATI, Sarah", 
        "LUVUMBU, Robert", "DIALLO, Mariam", "ZOLA, Claire", 
        "NDOKI, Jean", "BIOLA, Anne", "YENGO, Raoul"
    ];

    function genererTableau() {
        const container = document.getElementById('students-list-container');
        const dateInput = document.getElementById('current-date');

        // Sécurité : Si l'élément n'est pas encore dans le DOM, on attend un peu
        if (!container) {
            console.warn("Conteneur non trouvé, tentative de reconnexion...");
            setTimeout(genererTableau, 100);
            return;
        }

        // Initialisation de la date si l'élément existe
        if (dateInput) {
            dateInput.value = "28 Avril 2026";
        }

        container.innerHTML = "";

        listeEleves.forEach((nom, index) => {
            const row = document.createElement('div');
            row.className = 'student-row';
            row.innerHTML = `
                <div class="st-num">${index + 1}.</div>
                <div class="st-name">${nom}</div>
                <div class="st-input">
                    <input type="number" class="cote-field" placeholder="00" min="0" max="20">
                </div>
                <div class="st-actions">
                    <button class="btn-save-row"><i class="fas fa-save"></i> Save</button>
                </div>
            `;
            container.appendChild(row);
        });

        console.log("Tableau des cotes généré avec succès.");
    }

    // Gestion du bouton d'enregistrement
    // On utilise la délégation d'événement car le bouton est injecté dynamiquement
    document.addEventListener('click', (e) => {
        if (e.target && e.target.id === 'save-all-btn') {
            alert("🚀 Envoi des cotes vers Supabase pour la classe 6e EP...");
        }
    });

    // Lancement immédiat
    genererTableau();

    // On rend la fonction accessible au cerveau (teacher-app.js)
    window.genererTableau = genererTableau;
})();
