// dashboard/dashboard-logic.js

// 1. Mise à jour de l'heure
function updateClock() {
    const now = new Date();
    document.getElementById('currentTime').innerText = now.toLocaleTimeString('fr-FR');
    document.getElementById('currentDate').innerText = now.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' });
}
setInterval(updateClock, 1000);

// 2. Récupération des données Supabase
async function fetchDashboardData() {
    const teacherId = localStorage.getItem('teacher_id');

    // Effectif Total
    const { data: totalData } = await supabaseClient.from('eleves').select('genre');
    if (totalData) {
        document.getElementById('effectifTotal').innerText = totalData.length;
        document.getElementById('totalFilles').innerText = totalData.filter(e => e.genre === 'F').length;
        document.getElementById('totalGarcons').innerText = totalData.filter(e => e.genre === 'M').length;
    }

    // Présences du jour
    const today = new Date().toISOString().split('T')[0];
    const { data: presenceData } = await supabaseClient.from('presences').select('*, eleves(genre)').eq('date', today);
    // ... Logique similaire pour filtrer les présents/absents

    // Moyennes avec défilement
    const { data: notesData } = await supabaseClient.from('moyennes_view').select('*').order('moyenne', { ascending: false });
    const listMoyennes = document.getElementById('listMoyennes');
    notesData?.forEach(item => {
        listMoyennes.innerHTML += `<div style="padding:5px 0; border-bottom:1px dashed rgba(255,255,255,0.1)">
            ${item.nom_eleve} : <span style="color:#BF953F">${item.moyenne}/20</span>
        </div>`;
    });

    // Communiqués
    const { data: msgData } = await supabaseClient.from('communiques').select('*').order('created_at', { descending: true }).limit(3);
    const listMsg = document.getElementById('listMessages');
    listMsg.innerHTML = msgData?.map(m => `<p><b>${m.titre}</b>: ${m.contenu}</p>`).join('') || "Aucun message.";
}

// Lancement au chargement
window.onload = () => {
    verifySession(); // Sécurité 24h
    updateClock();
    fetchDashboardData();
};
