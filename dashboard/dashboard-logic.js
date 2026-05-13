// dashboard/dashboard-logic.js

// 1. Mise à jour de l'heure
function updateClock() {
    const now = new Date();
    const timeEl = document.getElementById('currentTime');
    const dateEl = document.getElementById('currentDate');
    
    if(timeEl) timeEl.innerText = now.toLocaleTimeString('fr-FR');
    if(dateEl) dateEl.innerText = now.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' });
}
setInterval(updateClock, 1000);

// 2. Récupération des données Supabase
async function fetchDashboardData() {
    const teacherId = localStorage.getItem('teacher_id');
    if (!teacherId) return;

    // --- EFFECTIF GLOBAL (TES ÉLÈVES UNIQUEMENT) ---
    const { data: totalData } = await supabaseClient
        .from('eleves')
        .select('genre')
        .eq('enseignant_id', teacherId);

    if (totalData) {
        const nbFilles = totalData.filter(e => e.genre === 'F').length;
        const nbGarcons = totalData.filter(e => e.genre === 'M').length;
        
        document.getElementById('effectifTotal').innerText = totalData.length;
        document.getElementById('totalFilles').innerText = nbFilles;
        document.getElementById('totalGarcons').innerText = nbGarcons;
    }

    // --- PRÉSENCES ET ARCHIVES DU JOUR ---
    const today = new Date().toISOString().split('T')[0];
    const { data: presences } = await supabaseClient
        .from('presences')
        .select('est_present, eleves(genre)')
        .eq('date', today)
        .eq('enseignant_id', teacherId);

    // Initialisation propre des compteurs
    let pF = 0, pG = 0, aF = 0, aG = 0;

    if (presences && presences.length > 0) {
        presences.forEach(p => {
            if (p.eleves) {
                const isFille = p.eleves.genre === 'F';
                if (p.est_present) {
                    isFille ? pF++ : pG++;
                } else {
                    isFille ? aF++ : aG++;
                }
            }
        });
    }

    // Mise à jour groupée (Si presences est vide, tout passera à 0)
    document.getElementById('presentTotal').innerText = pF + pG;
    document.getElementById('presentFilles').innerText = pF;
    document.getElementById('presentGarcons').innerText = pG;
    
    document.getElementById('absentTotal').innerText = aF + aG;
    document.getElementById('absentFilles').innerText = aF;
    document.getElementById('absentGarcons').innerText = aG;

    // --- MOYENNES (AFFICHAGE ARCHIVÉ) ---
    const { data: notesData } = await supabaseClient
        .from('moyennes_view')
        .select('*')
        .order('moyenne', { ascending: false });

    const listMoyennes = document.getElementById('listMoyennes');
    if (listMoyennes) {
        listMoyennes.innerHTML = (notesData && notesData.length > 0) 
            ? notesData.map(item => `
                <div style="padding:8px 0; border-bottom:1px dashed rgba(255,255,255,0.1); font-size:0.85rem;">
                    ${item.nom_eleve} : <span style="color:#BF953F; font-weight:bold;">${item.moyenne}/20</span>
                </div>`).join('')
            : "<p style='opacity:0.5; font-size:0.8rem;'>Aucune note disponible.</p>";
    }

    // --- COMMUNIQUÉS ---
    const { data: msgData } = await supabaseClient
        .from('communiques')
        .select('*')
        .order('created_at', { descending: true })
        .limit(3);

    const listMsg = document.getElementById('listMessages');
    if (listMsg) {
        listMsg.innerHTML = (msgData && msgData.length > 0)
            ? msgData.map(m => `
                <div style="margin-bottom:12px; padding-left:10px; border-left:2px solid #BF953F;">
                    <div style="font-weight:bold; color:#BF953F; font-size:0.8rem;">${m.titre}</div>
                    <div style="font-size:0.85rem; opacity:0.9;">${m.contenu}</div>
                </div>`).join('')
            : "Aucun communiqué récent.";
    }
}

// 3. Lancement au chargement
window.onload = () => {
    if (typeof verifySession === "function") verifySession();
    updateClock();
    fetchDashboardData();
};
