// appel/appel-logic.js
const listContainer = document.getElementById('studentList');
let presenceData = {}; // Stocke id_eleve: true/false

async function loadStudents() {
    const { data, error } = await supabaseClient.from('eleves').select('*').order('nom_complet');
    
    if (error) { listContainer.innerText = "Erreur de chargement."; return; }

    listContainer.innerHTML = data.map(eleve => `
        <div class="student-row">
            <div>
                <div style="font-weight: bold;">${eleve.nom_complet}</div>
                <div style="font-size: 0.7rem; color: #BF953F;">${eleve.genre === 'F' ? 'Fille' : 'Garçon'}</div>
            </div>
            <div style="display: flex; gap: 10px;">
                <button class="status-btn" onclick="togglePresence('${eleve.id}', true, this)">P</button>
                <button class="status-btn" onclick="togglePresence('${eleve.id}', false, this)">A</button>
            </div>
        </div>
    `).join('');
}

function togglePresence(id, status, btn) {
    presenceData[id] = status;
    // Reset des boutons du même parent
    const parent = btn.parentElement;
    parent.querySelectorAll('.status-btn').forEach(b => b.classList.remove('active-present', 'active-absent'));
    // Activation visuelle
    btn.classList.add(status ? 'active-present' : 'active-absent');
}

document.getElementById('saveAppel').addEventListener('click', async () => {
    const teacherId = localStorage.getItem('teacher_id');
    const records = Object.keys(presenceData).map(eleveId => ({
        eleve_id: eleveId,
        enseignant_id: teacherId,
        est_present: presenceData[eleveId]
    }));

    const { error } = await supabaseClient.from('presences').insert(records);

    if (error) { alert("Erreur d'enregistrement."); } 
    else { 
        alert("Appel enregistré avec succès !"); 
        window.location.href = "../dashboard/index.html";
    }
});

loadStudents();

