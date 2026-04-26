// DONNÉES FICTIVES (Extraits demandés)
const eleves = ["Malu J.", "Yengo R.", "Tshimanga P.", "Bakengo S.", "Luvumbu F.", "Ngalula M.", "Kabasele D.", "Musau T.", "Diallo A.", "Banza G.", "Yombo C.", "Mbala K."];

// 1. Remplissage Moyenne Élèves (12 élèves)
const avgLoop = document.getElementById('loop-avg');
eleves.forEach(e => {
    avgLoop.innerHTML += `<div class="step-item"><span>${e}</span><span class="txt-gold">${(Math.random()*20 + 60).toFixed(1)}%</span></div>`;
});

// 2. Remplissage Top 5
const top5Loop = document.getElementById('loop-top5');
eleves.slice(0,5).forEach(e => {
    top5Loop.innerHTML += `<div class="step-item"><span>${e}</span><span class="txt-green">A</span></div>`;
});

// 3. Remplissage Bottom 5
const bottom5Loop = document.getElementById('loop-bottom5');
eleves.slice(7,12).forEach(e => {
    bottom5Loop.innerHTML += `<div class="step-item"><span>${e}</span><span class="txt-red">E</span></div>`;
});

// NAVIGATION ENTRE PAGES
function showPage(pageId) {
    // Retirer 'active' de tous les boutons et pages
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.page-view').forEach(page => page.classList.remove('active'));
    
    // Activer la page choisie
    // Note: Pour cet exemple, on reste sur le dashboard, mais tu créeras les autres ID de section
    document.getElementById('teacher-dashboard').classList.add('active');
    event.currentTarget.classList.add('active');
    
    console.log("Navigation vers : " + pageId);
}

// MISE À JOUR DATE
const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
document.getElementById('current-date').innerText = new Date().toLocaleDateString('fr-FR', options);
