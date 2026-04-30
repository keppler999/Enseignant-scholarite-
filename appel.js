/**
 * Fichier : appel.js
 * Rôle : Gestion du registre d'appel quotidien.
 */
import { supabase } from './supabase-client.js';

export async function renderAppel(container) {
    const today = new Date().toISOString().split('T')[0];
    
    container.innerHTML = `
        <div class="glass-card">
            <h2>Registre d'Appel : ${today}</h2>
            <div id="appel-list" style="margin-top: 20px;">
                <p>Chargement des élèves...</p>
            </div>
            <button id="save-appel" class="btn-gold" style="width: 100%; margin-top: 20px; padding: 15px; border-radius: 8px; border: none; font-weight: bold; cursor: pointer;">
                Valider le Registre
            </button>
        </div>
    `;

    loadStudentsForAppel();
    document.getElementById('save-appel').addEventListener('click', saveAppel);
}

async function loadStudentsForAppel() {
    const listContainer = document.getElementById('appel-list');
    const { data: students, error } = await supabase.from('students').select('*');

    if (error) {
        listContainer.innerHTML = `<p style="color:red">Erreur : ${error.message}</p>`;
        return;
    }

    listContainer.innerHTML = students.map(s => `
        <div class="data-strip" style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px; padding: 10px;">
            <span>${s.name}</span>
            <select class="status-select" data-student-id="${s.id}" style="background: rgba(0,0,0,0.5); color: #fff; border: 1px solid var(--gold); padding: 5px;">
                <option value="P">Présent</option>
                <option value="A">Absent</option>
            </select>
        </div>
    `).join('');
}

async function saveAppel() {
    const selects = document.querySelectorAll('.status-select');
    const date = new Date().toISOString().split('T')[0];
    const appelData = [];

    selects.forEach(select => {
        appelData.push({
            student_id: select.dataset.studentId,
            status: select.value,
            date: date
        });
    });

    const { error } = await supabase.from('attendance').insert(appelData);

    if (error) alert("Erreur lors de l'enregistrement : " + error.message);
    else alert("Registre validé pour aujourd'hui !");
}

