// Liste des 12 élèves (Exemple conforme RDC)
const listeEleves = [
    "MALU, Jean-Pierre", "YENGO, Rebecca", "TSHIMANGA, Paul", 
    "MUSAU, Julie", "KABASELE, Luc", "BAHATI, Sarah", 
    "LUVUMBU, Robert", "DIALLO, Mariam", "ZOLA, Claire", 
    "NDOKI, Jean", "BIOLA, Anne", "YENGO, Raoul"
];

// Initialisation de la date
document.getElementById('current-date').value = "28 Avril 2026";

function genererTableau() {
    const container = document.getElementById('students-list-container');
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
}

// Action du bouton principal
document.getElementById('save-all-btn').addEventListener('click', () => {
    alert("🚀 Envoi des cotes vers Supabase pour la classe 6e EP...");
    // Ici on ajoutera la logique Supabase .insert()
});

genererTableau();
