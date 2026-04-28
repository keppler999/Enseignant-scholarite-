/**
 * SCHOLARITE - Module Appel (Spiral Agence)
 * Version Ultra-Glass avec Avatars
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
            <div class="list-item-black" id="row-${index}" style="align-items: center; padding: 12px; transition: all 0.4s ease;">
                <div style="display: flex; align-items: center; gap: 12px;">
                    <img src="${eleve.img}" style="width: 35px; height: 35px; border-radius: 50%; border: 1px solid rgba(255,255,255,0.2);">
                    <div>
                        <div style="font-weight: 600; font-size: 0.9rem;">${eleve.nom}</div>
                        <div style="font-size: 0.65rem; opacity: 0.6;">Élève n°${index + 1}</div>
                    </div>
                </div>
                
                <div class="status-toggles" style="display: flex; gap: 8px;">
                    <button class="btn-status p-btn" onclick="setPresence(${index}, 'present')" 
                        style="width: 32px; height: 32px; border-radius: 8px; border: 1px solid rgba(46, 204, 113, 0.4); background: transparent; color: #fff; cursor: pointer;">P</button>
                    <button class="btn-status a-btn" onclick="setPresence(${index}, 'absent')" 
                        style="width: 32px; height: 32px; border-radius: 8px; border: 1px solid rgba(231, 76, 60, 0.4); background: transparent; color: #fff; cursor: pointer;">A</button>
                </div>
            </div>
        `).join('');
    }

    window.setPresence = function(index, status) {
        const row = document.getElementById(`row-${index}`);
        const pBtn = row.querySelector('.p-btn');
        const aBtn = row.querySelector('.a-btn');

        // Reset
        pBtn.style.background = "transparent";
        pBtn.style.boxShadow = "none";
        aBtn.style.background = "transparent";
        aBtn.style.boxShadow = "none";
        row.style.background = "rgba(255, 255, 255, 0.05)";

        if (status === 'present') {
            pBtn.style.background = "#2ecc71";
            pBtn.style.boxShadow = "0 0 10px rgba(46, 204, 113, 0.5)";
            row.style.background = "rgba(46, 204, 113, 0.15)";
            row.style.borderLeft = "4px solid #2ecc71";
        } else {
            aBtn.style.background = "#e74c3c";
            aBtn.style.boxShadow = "0 0 10px rgba(231, 76, 60, 0.5)";
            row.style.background = "rgba(231, 76, 60, 0.15)";
            row.style.borderLeft = "4px solid #e74c3c";
        }
        updateStats();
    };

    function updateStats() {
        // On compte les boutons qui ont un fond coloré
        const presents = Array.from(document.querySelectorAll('.p-btn')).filter(b => b.style.background !== "transparent").length;
        const absents = Array.from(document.querySelectorAll('.a-btn')).filter(b => b.style.background !== "transparent").length;
        
        document.getElementById('total-present').innerText = presents;
        document.getElementById('total-absent').innerText = absents;
    }

    initAppel();
})();
            
