/**
 * Fichier : settings.js
 * Rôle : Configuration de l'application et gestion des données locales.
 */

export async function renderSettings(container) {
    // Récupérer les réglages actuels
    const schoolName = localStorage.getItem('schoolName') || '';
    const teacherName = localStorage.getItem('teacherName') || '';

    container.innerHTML = `
        <div class="glass-card">
            <h2>Paramètres</h2>
            <form id="settings-form" style="display: flex; flex-direction: column; gap: 15px; margin-top: 20px;">
                <div>
                    <label style="display:block; margin-bottom:5px;">Nom de l'École :</label>
                    <input type="text" id="school-name" value="${schoolName}" placeholder="Ex: Collège Maranatha" style="width: 100%; padding: 10px; background: rgba(0,0,0,0.5); border: 1px solid var(--gold); color: #fff; border-radius: 8px;">
                </div>
                <div>
                    <label style="display:block; margin-bottom:5px;">Nom de l'Enseignant :</label>
                    <input type="text" id="teacher-name" value="${teacherName}" placeholder="Ton nom" style="width: 100%; padding: 10px; background: rgba(0,0,0,0.5); border: 1px solid var(--gold); color: #fff; border-radius: 8px;">
                </div>
                <button type="submit" class="btn-gold" style="padding: 10px; border: none; border-radius: 8px; font-weight: bold; cursor: pointer;">
                    Enregistrer les préférences
                </button>
            </form>
            
            <hr style="border: 0; border-top: 1px solid var(--gold); margin: 30px 0;">
            
            <button id="clear-data" style="width: 100%; padding: 10px; background: #ff4d4d; color: #fff; border: none; border-radius: 8px;">
                Réinitialiser les données locales
            </button>
        </div>
    `;

    // Événements
    document.getElementById('settings-form').addEventListener('submit', saveSettings);
    document.getElementById('clear-data').addEventListener('click', clearData);
}

function saveSettings(e) {
    e.preventDefault();
    localStorage.setItem('schoolName', document.getElementById('school-name').value);
    localStorage.setItem('teacherName', document.getElementById('teacher-name').value);
    alert("Paramètres enregistrés !");
}

function clearData() {
    if(confirm("Attention : Cela va effacer tous les réglages locaux. Continuer ?")) {
        localStorage.clear();
        alert("Données effacées. Recharge l'application.");
        location.reload();
    }
}

