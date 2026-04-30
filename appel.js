/**
 * Fichier : appel.js
 * Rôle : Gestion du registre d'appel quotidien.
 */
import { supabase } from './supabase-client.js';

export async function renderAppel(container) {
    const today = new Date().toISOString().split('T')[0];
    
    container.innerHTML = `
        <div class="glass-card">
            <h2>Registre d'Appel - ${today}</h2>
            <div id="appel-list">
                <p>Chargement des élèves...</p>
            </div>
            <button id="save-appel" class="btn-gold" style="width: 100%; margin-top: 20px; padding: 15px; border-radius: 8px; border: none;">
                Valider le Registre
            </button>
        </div>
    `;

    loadStudentsForAppel();
}

async function loadStudentsForAppel() {
    const listContainer = document.getElementById('appel-list');
    const { data: students, error } = await supabase.from('students').select('*');

    if (error) {
        listContainer.innerHTML = `<p style="color:red">Erreur : ${error.message}</p>`;
        return;
    }

    listContainer.innerHTML = students.map(s => `
        <div class="data-strip" style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
            <span>${s.name}</span>
            <select class="status-select" data-student-id="${s.id}">
                <option value="P">Présent</option>
                <option value="A">Absent</option>
            </select>
        </div>
    `).join('');
}
