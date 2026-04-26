// Données de Test (12 élèves)
const eleves = [
    { nom: "Malu Jean-Pierre", sex: "M", moyenne: 88.5 },
    { nom: "Yengo Rebecca", sex: "F", moyenne: 93.8 },
    { nom: "Tshimanga Paul", sex: "M", moyenne: 54.2 },
    { nom: "Bahati Sarah", sex: "F", moyenne: 76.0 },
    { nom: "Kabasele Luc", sex: "M", moyenne: 42.1 },
    { nom: "Musau Julie", sex: "F", moyenne: 91.2 },
    { nom: "Luvumbu Guy", sex: "M", moyenne: 65.4 },
    { nom: "Zola Claire", sex: "F", moyenne: 48.9 },
    { nom: "Diallo Moussa", sex: "M", moyenne: 77.3 },
    { nom: "Ngalula Marie", sex: "F", moyenne: 82.1 },
    { nom: "Mpemba Anne", sex: "F", moyenne: 39.5 },
    { nom: "Ilunga Joel", sex: "M", moyenne: 69.8 }
];

// 1. Initialisation de la Date
document.getElementById('current-date').innerText = new Date().toLocaleDateString('fr-FR');

// 2. Boucle des 12 élèves (Moyennes)
const allStudentsBox = document.getElementById('all-students-loop');
let loopHTML = '<div class="scrolling">';
eleves.forEach(e => {
    loopHTML += `<div class="row-data"><span>${e.nom}</span><span class="val-gold">${e.moyenne}%</span></div>`;
});
allStudentsBox.innerHTML = loopHTML + loopHTML + '</div>';

// 3. Top 5 et Flop 5
const sorted = [...eleves].sort((a, b) => b.moyenne - a.moyenne);
const top5 = sorted.slice(0, 5);
const bottom5 = sorted.slice(-5).reverse();

document.getElementById('top-5-loop').innerHTML = top5.map(e => `<div class="row-data"><span>${e.nom}</span><span style="color: #2ecc71">${e.moyenne}%</span></div>`).join('');
document.getElementById('bottom-5-loop').innerHTML = bottom5.map(e => `<div class="row-data"><span>${e.nom}</span><span style="color: #e74c3c">${e.moyenne}%</span></div>`).join('');

// 4. Statistiques Filles/Garçons
const filles = eleves.filter(e => e.sex === "F").length;
const garcons = eleves.filter(e => e.sex === "M").length;
document.getElementById('gender-stats-loop').innerHTML = `F: <span class="val-gold">${filles}</span> | G: <span class="val-gold">${garcons}</span>`;

// 5. Checklist Tâches
const tasks = [
    { label: "Appel du matin", status: "OK", color: "#2ecc71" },
    { label: "Journal de classe", status: "VIDE", color: "#e74c3c" },
    { label: "Cotes Français", status: "COMPLET", color: "#2ecc71" }
];
document.getElementById('tasks-loop').innerHTML = tasks.map(t => `<div class="row-data"><span>${t.label}</span><span style="color:${t.color}">${t.status}</span></div>`).join('');

// 6. Navigation
document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
        
        this.classList.add('active');
        document.getElementById('page-' + this.dataset.page).classList.add('active');
    });
});

