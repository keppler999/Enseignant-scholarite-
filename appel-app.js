/**
 * SCHOLARITE - Module Appel (Admin Version)
 * Style : Black-Bands & Gold Accents
 */

(function() {
    const listeEleves = [
        {nom: "MALU Jean-Pierre", img: "https://i.pravatar.cc/150?u=1"},
        {nom: "YENGO Rebecca", img: "https://i.pravatar.cc/150?u=2"},
        {nom: "TSHIMANGA Paul", img: "https://i.pravatar.cc/150?u=3"},
        {nom: "MUSAU Julie", img: "https://i.pravatar.cc/150?u=4"},
        {nom: "KABASELE Luc", img: "https://i.pravatar.cc/150?u=5"},
        {nom: "BAHATI Sarah", img: "https://i.pravatar.cc/150?u=6"},
        {nom: "LUVUMBU Robert", img: "https://i.pravatar.cc/150?u=7"},
        {nom: "DIALLO Mariam", img: "https://i.pravatar.cc/150?u=8"},
        {nom: "ZOLA Claire", img: "https://i.pravatar.cc/150?u=9"},
        {nom: "NDOKI Jean", img: "https://i.pravatar.cc/150?u=10"},
        {nom: "BIOLA Anne", img: "https://i.pravatar.cc/150?u=11"},
        {nom: "YENGO Raoul", img: "https://i.pravatar.cc/150?u=12"}
    ];

    function initAppel() {
        const container = document.getElementById('appel-list-container');
        if (!container) return;

        container.innerHTML = listeEleves.map((eleve, index) => `
            <div class="list-item-black" id="row-${index}" style="margin-bottom: 8px; border-left: 3px solid transparent;">
                <div style="display: flex; align-items: center; gap: 12px;">
                    <img src="${eleve.img}" style="width: 32px; height: 32px; border-radius: 50%; border: 1px solid var(--border);">
                    <div>
                        <div style="font-weight: 600; font-size: 0.85rem;">${eleve.nom}</div>
                        <small style="opacity: 0.4; font-size: 0.6rem;">ID: EP6-${100 + index}</small>
                    </div>
                </div>
                
                <div class="status-toggles" style="display: flex; gap: 6px;">
                    <button class="p-btn" onclick="setPresence(${index}, 'present')" 
                        style="width: 30px; height: 30px; border-radius: 6px; border: 1px solid rgba(255,255,255,0.1); background: rgba(255,255,255,0.05); color: #fff; font-size: 0.7rem; cursor: pointer; transition: 0.3s;">P</button>
                    <button class="a-btn" onclick="setPresence(${index}, 'absent')" 
                        style="width: 30px; height: 30px; border-radius: 6px; border: 1px solid rgba(255,255,255,0.1); background: rgba(255,255,255,0.05); color: #fff; font-size: 0.7rem; cursor: pointer; transition: 0.3s;">A</button>
                </div>
            </div>
        `).join('');
    }

    window.setPresence = function(index, status) {
        const row = document.getElementById(`row-${index}`);
        const pBtn = row.querySelector('.p-btn');
        const aBtn = row.querySelector('.a-btn');

        // Reset des styles pour le mode "Admin Dark"
        pBtn.style.background = "rgba(255,255,255,0.05)";
        pBtn.style.borderColor = "rgba(255,255,255,0.1)";
        pBtn.style.boxShadow = "none";
        
        aBtn.style.background = "rgba(255,255,255,0.05)";
        aBtn.style.borderColor = "rgba(255,255,255,0.1)";
        aBtn.style.boxShadow = "none";

        if (status === 'present') {
            pBtn.style.background = "#4ade80"; // Vert vif Admin
            pBtn.style.borderColor = "#4ade80";
            pBtn.style.boxShadow = "0 0 12px rgba(74, 222, 128, 0.4)";
            row.style.borderLeftColor = "#4ade80";
            row.style.background = "rgba(74, 222, 128, 0.08)";
        } else {
            aBtn.style.background = "#fb7185"; // Rouge vif Admin
            aBtn.style.borderColor = "#fb7185";
            aBtn.style.boxShadow = "0 0 12px rgba(251, 113, 133, 0.4)";
            row.style.borderLeftColor = "#fb7185";
            row.style.background = "rgba(251, 113, 133, 0.08)";
        }
        updateStats();
    };

    function updateStats() {
        const presents = Array.from(document.querySelectorAll('.p-btn')).filter(b => b.style.background !== "rgba(255, 255, 255, 0.05)").length;
        const absents = Array.from(document.querySelectorAll('.a-btn')).filter(b => b.style.background !== "rgba(255, 255, 255, 0.05)").length;
        
        document.getElementById('total-present').innerText = presents;
        document.getElementById('total-absent').innerText = absents;
    }

    // Petit délai pour s'assurer que le DOM est injecté
    setTimeout(initAppel, 50);
})();
        
