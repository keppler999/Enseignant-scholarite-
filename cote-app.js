/**
 * SCHOLARITE - Module Saisie des Cotes (Mobile Native)
 * Logique : Bandes Noires & Progression en temps réel
 */

(function() {
    const listeEleves = [
        "MALU Jean-Pierre", "YENGO Rebecca", "TSHIMANGA Paul", 
        "MUSAU Julie", "KABASELE Luc", "BAHATI Sarah", 
        "LUVUMBU Robert", "DIALLO Mariam", "ZOLA Claire", 
        "NDOKI Jean", "BIOLA Anne", "YENGO Raoul"
    ];

    function initModuleCotes() {
        const container = document.getElementById('students-list-container');
        if (!container) return;

        container.innerHTML = listeEleves.map((nom, index) => `
            <div class="list-item-black" style="padding: 12px 15px;">
                <div style="display: flex; align-items: center; gap: 12px;">
                    <span style="opacity: 0.3; font-size: 0.7rem; font-weight: 800;">${index + 1}</span>
                    <span style="font-weight: 600; font-size: 0.9rem;">${nom}</span>
                </div>
                <div style="display: flex; align-items: center; gap: 5px;">
                    <input type="number" class="cote-input-field" data-index="${index}" 
                        placeholder="--" min="0" max="20" 
                        style="width: 50px; background: rgba(255,255,255,0.05); border: 1px solid var(--border); color: var(--gold); text-align: center; padding: 8px; border-radius: 8px; font-weight: 800; font-size: 1rem;">
                    <small style="opacity: 0.4; font-size: 0.6rem;">/20</small>
                </div>
            </div>
        `).join('');

        // Ecouter la saisie pour mettre à jour la progression
        container.querySelectorAll('.cote-input-field').forEach(input => {
            input.addEventListener('input', updateProgress);
        });
    }

    function updateProgress() {
        const fields = document.querySelectorAll('.cote-input-field');
        const filled = Array.from(fields).filter(f => f.value !== "").length;
        const total = fields.length;
        const percent = (filled / total) * 100;

        // Mise à jour visuelle (Bandes et compteurs)
        const progressBar = document.getElementById('progress-bar');
        const counter = document.getElementById('points-counter');
        
        if(progressBar) progressBar.style.width = `${percent}%`;
        if(counter) counter.innerText = `${filled} / ${total}`;
        
        // Effet de brillance si terminé
        if(filled === total && progressBar) {
            progressBar.style.boxShadow = "0 0 15px var(--gold)";
        }
    }

    // Gestion du clic sur Enregistrer
    document.addEventListener('click', (e) => {
        const btn = e.target.closest('#save-all-btn');
        if (btn) {
            const course = document.getElementById('course-select')?.value || "Non défini";
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> ENREGISTREMENT...';
            btn.style.opacity = "0.7";
            
            setTimeout(() => {
                alert(`Succès : Les cotes de [${course.toUpperCase()}] ont été envoyées au serveur.`);
                btn.innerHTML = 'VALIDER LA COTATION';
                btn.style.opacity = "1";
            }, 1500);
        }
    });

    // Lancer l'initialisation
    initModuleCotes();
})();
           
