(function() {
    const listeEleves = [
        "MALU Jean-Pierre", "YENGO Rebecca", "TSHIMANGA Paul", 
        "MUSAU Julie", "KABASELE Luc", "BAHATI Sarah", 
        "LUVUMBU Robert", "DIALLO Mariam", "ZOLA Claire", 
        "NDOKI Jean", "BIOLA Anne", "YENGO Raoul"
    ];

    function initAppel() {
        const container = document.getElementById('appel-list-container');
        if (!container) return;

        container.innerHTML = listeEleves.map((nom, index) => `
            <div class="appel-row" id="row-${index}">
                <div class="student-info">
                    <h4>${nom}</h4>
                    <small>N° ${index + 1}</small>
                </div>
                <div class="status-toggles">
                    <button class="btn-status p-btn" onclick="setPresence(${index}, 'present')">P</button>
                    <button class="btn-status a-btn" onclick="setPresence(${index}, 'absent')">A</button>
                </div>
            </div>
        `).join('');
    }

    window.setPresence = function(index, status) {
        const row = document.getElementById(`row-${index}`);
        const pBtn = row.querySelector('.p-btn');
        const aBtn = row.querySelector('.a-btn');

        row.classList.remove('present', 'absent');
        pBtn.classList.remove('active-p');
        aBtn.classList.remove('active-a');

        if (status === 'present') {
            row.classList.add('present');
            pBtn.classList.add('active-p');
        } else {
            row.classList.add('absent');
            aBtn.classList.add('active-a');
        }
        updateStats();
    };

    function updateStats() {
        const presents = document.querySelectorAll('.active-p').length;
        const absents = document.querySelectorAll('.active-a').length;
        document.getElementById('total-present').innerText = presents;
        document.getElementById('total-absent').innerText = absents;
    }

    initAppel();
})();

