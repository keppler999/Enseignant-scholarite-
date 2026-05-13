// appel/appel-logic.js
const dateSelector = document.getElementById('dateSelector');
const listContainer = document.getElementById('studentList');
const lockBadge = document.getElementById('lockBadge');
const saveBtn = document.getElementById('saveAppel');
const editBtn = document.getElementById('editMode');

let currentPresenceMap = {}; // Stocke { eleve_id: status }
let isLocked = false;

// Initialiser la date à aujourd'hui
dateSelector.valueAsDate = new Date();

async function initAppel() {
    const teacherId = localStorage.getItem('teacher_id');
    const selectedDate = dateSelector.value;
    
    // 1. Charger les élèves
    const { data: eleves } = await supabaseClient
        .from('eleves')
        .select('*')
        .eq('enseignant_id', teacherId)
        .order('nom_complet');

    // 2. Charger les présences existantes pour cette date
    const { data: existingAppel } = await supabaseClient
        .from('presences')
        .select('*')
        .eq('date', selectedDate)
        .eq('enseignant_id', teacherId);

    // 3. Mapper les données
    currentPresenceMap = {};
    isLocked = existingAppel.length > 0;
    existingAppel.forEach(p => currentPresenceMap[p.eleve_id] = p.status);

    renderList(eleves);
    updateUIState();
}

function renderList(eleves) {
    listContainer.innerHTML = eleves.map(e => {
        const status = currentPresenceMap[e.id] || 'present';
        return `
        <div class="student-card">
            <span style="font-weight:500;">${e.nom_complet}</span>
            <div class="status-group">
                <button class="btn-status p ${status==='present'?'active':''}" onclick="setStatus('${e.id}', 'present', this)">P</button>
                <button class="btn-status r ${status==='retard'?'active':''}" onclick="setStatus('${e.id}', 'retard', this)">R</button>
                <button class="btn-status a ${status==='absent'?'active':''}" onclick="setStatus('${e.id}', 'absent', this)">A</button>
            </div>
        </div>`;
    }).join('');
}

function setStatus(id, status, btn) {
    if(isLocked) return; // Empêche la modif si verrouillé
    currentPresenceMap[id] = status;
    const parent = btn.parentElement;
    parent.querySelectorAll('.btn-status').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
}

function updateUIState() {
    if (isLocked) {
        lockBadge.style.display = 'block';
        saveBtn.style.display = 'none';
        editBtn.style.display = 'block';
        listContainer.style.opacity = '0.7';
    } else {
        lockBadge.style.display = 'none';
        saveBtn.style.display = 'block';
        editBtn.style.display = 'none';
        listContainer.style.opacity = '1';
    }
}

editBtn.onclick = () => {
    isLocked = false;
    updateUIState();
};

saveBtn.onclick = async () => {
    const teacherId = localStorage.getItem('teacher_id');
    const selectedDate = dateSelector.value;
    
    const records = Object.keys(currentPresenceMap).map(eleveId => ({
        eleve_id: eleveId,
        enseignant_id: teacherId,
        date: selectedDate,
        status: currentPresenceMap[eleveId],
        est_present: currentPresenceMap[eleveId] !== 'absent' // Pour compatibilité dashboard
    }));

    // Nettoyage avant ré-insertion (Atomic update)
    await supabaseClient.from('presences').delete().eq('date', selectedDate).eq('enseignant_id', teacherId);
    
    const { error } = await supabaseClient.from('presences').insert(records);
    
    if(!error) {
        alert("Registre mis à jour.");
        initAppel();
    }
};

dateSelector.onchange = initAppel;
initAppel();

