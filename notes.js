/**
 * Fichier : notes.js
 * Rôle : Gestion de la saisie des notes par cours.
 */
import { supabase } from './supabase-client.js';

export async function renderNotes(container) {
    container.innerHTML = `
        <div class="glass-card">
            <h2>Saisie des Cotes</h2>
            <div style="margin-bottom: 20px;">
                <label>Choisir le cours :</label>
                <select id="course-select" style="width: 100%; padding: 10px; background: rgba(0,0,0,0.5); color: #fff; border: 1px solid var(--gold); border-radius: 8px;">
                    <option value="Mathématiques">Mathématiques</option>
                    <option value="Français">Français</option>
                    <option value="Informatique">Informatique</option>
                </select>
            </div>
            <div id="notes-list">
                <p>Chargement des élèves...</p>
            </div>
        </div>
    `;

    loadStudentsForNotes();
}

async function loadStudentsForNotes() {
    const listContainer = document.getElementById('notes-list');
    
    // Récupérer la liste des élèves
    const { data: students, error } = await supabase.from('students').select('*');
    
    if (error) {
        listContainer.innerHTML = `<p style="color:red">Erreur : ${error.message}</p>`;
        return;
    }

    listContainer.innerHTML = students.map(s => `
        <div class="data-strip" style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
            <span>${s.name}</span>
            <input type="number" class="grade-input" data-student-id="${s.id}" placeholder="/20" 
                   style="width: 60px; background: rgba(255,255,255,0.1); border: 1px solid var(--gold); color: #fff; padding: 5px; border-radius: 4px;">
        </div>
    `).join('') + `<button id="save-grades" class="btn-gold" style="width: 100%; padding: 15px; margin-top: 15px; background: var(--gold); border: none; border-radius: 8px; font-weight: bold;">Enregistrer les Notes</button>`;

    document.getElementById('save-grades').addEventListener('click', saveGrades);
}

async function saveGrades() {
    const inputs = document.querySelectorAll('.grade-input');
    const course = document.getElementById('course-select').value;
    const gradesData = [];

    inputs.forEach(input => {
        if (input.value) {
            gradesData.push({
                student_id: input.dataset.studentId,
                course: course,
                score: parseFloat(input.value),
                date: new Date().toISOString()
            });
        }
    });

    const { error } = await supabase.from('grades').insert(gradesData);

    if (error) alert("Erreur lors de l'enregistrement : " + error.message);
    else alert("Notes enregistrées avec succès !");
      }
