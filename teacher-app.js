const eleves = [
    {nom: "MALU Jean-Pierre", sex: "M", moyenne: 88.5},
    {nom: "YENGO Rebecca", sex: "F", moyenne: 92.1},
    {nom: "TSHIMANGA Paul", sex: "M", moyenne: 75.0},
    {nom: "MUSAU Julie", sex: "F", moyenne: 45.2},
    {nom: "KABASELE Luc", sex: "M", moyenne: 82.4},
    {nom: "BAHATI Sarah", sex: "F", moyenne: 91.0},
    {nom: "LUVUMBU Robert", sex: "M", moyenne: 52.8},
    {nom: "DIALLO Mariam", sex: "F", moyenne: 89.2},
    {nom: "ZOLA Claire", sex: "F", moyenne: 38.5},
    {nom: "NDOKI Jean", sex: "M", moyenne: 66.7},
    {nom: "BIOLA Anne", sex: "F", moyenne: 94.5},
    {nom: "YENGO Raoul", sex: "M", moyenne: 41.0}
];

// 1. REMPLISSAGE DASHBOARD
function loadDashboard() {
    // Moyennes défilantes
    const scrollBox = document.getElementById('scroll-averages');
    eleves.forEach(e => {
        scrollBox.innerHTML += `
            <div class="list-item-black">
                <span>${e.nom}</span>
                <span class="${e.moyenne < 50 ? 'txt-red' : 'txt-green'}">${e.moyenne}%</span>
            </div>
        `;
    });

    // Top 5 et Bottom 5
    const sorted = [...eleves].sort((a,b) => b.moyenne - a.moyenne);
    const topBox = document.getElementById('top-5');
    const bottomBox = document.getElementById('bottom-5');

    sorted.slice(0, 5).forEach(e => {
        topBox.innerHTML += `<div class="list-item-black"><span>${e.nom}</span> <span class="txt-green">${e.moyenne}%</span></div>`;
    });

    sorted.slice(-5).reverse().forEach(e => {
        bottomBox.innerHTML += `<div class="list-item-black"><span>${e.nom}</span> <span class="txt-red">${e.moyenne}%</span></div>`;
    });
}

// 2. GESTION NAVIGATION (TABS)
document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        // Switch active menu
        document.querySelector('.nav-btn.active').classList.remove('active');
        btn.classList.add('active');

        // Switch active view
        const target = btn.getAttribute('data-target');
        document.querySelectorAll('.tab-content').forEach(v => v.classList.remove('active'));
        document.getElementById(target).classList.add('active');

        if(target === 'view-saisie') renderSaisie();
    });
});

// 3. FONCTION DE RENDU SAISIE (Exemple intelligent)
function renderSaisie() {
    const view = document.getElementById('view-saisie');
    view.innerHTML = `
        <div class="glass-box" style="margin: 15px;">
            <h3>Saisie des Cotes</h3>
            <select class="input-glass"><option>Français</option><option>Maths</option></select>
            <div class="saisie-table">
                ${eleves.map(e => `
                    <div class="list-item-black">
                        <span>${e.nom}</span>
                        <input type="number" placeholder="/20" class="mini-input">
                    </div>
                `).join('')}
            </div>
            <button class="btn-gold">ENREGISTRER TOUT</button>
        </div>
    `;
}

loadDashboard();
