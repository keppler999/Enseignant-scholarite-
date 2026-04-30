/**
 * Fichier : casier.js
 * Rôle : Gestion des élèves (CRUD) - Ajout, Lecture, Suppression.
 */
import { supabase } from './supabase-client.js';

// 1. Point d'entrée du module
export async function renderCasier(container) {
    container.innerHTML = `
        <div class="glass-card" style="margin-bottom: 20px;">
            <h2 style="margin-bottom: 15px;">Gestion des Élèves</h2>
            <form id="add-student-form" style="display: flex; flex-direction: column; gap: 10px;">
                <input type="text" id="student-name" placeholder="Nom complet de l'élève" required 
                       style="background: rgba(255,255,255,0.1); border: 1px solid var(--gold); padding: 10px; color: #fff; border-radius: 8px;">
                <input type="text" id="student-parent" placeholder="Nom des parents" required
                       style="background: rgba(255,255,255,0.1); border: 1px solid var(--gold); padding: 10px; color: #fff; border-radius: 8px;">
                <button type="submit" class="btn-gold" 
                        style="background: var(--gold); color: #000; border: none; padding: 10px; border-radius: 8px; font-weight: bold; cursor: pointer;">
                    Ajouter à la base
                </button>
            </form>
        </div>
        
        <div id="students-list">
            <div class="glass-card"><p>Connexion au Data Hub...</p></div>
        </div>
    `;

    // Attacher l'événement au formulaire
    document.getElementById('add-student-form').addEventListener('submit', handleAddStudent);
    
    // Charger la liste initiale
    loadStudents();
}

// 2. Lire les élèves depuis Supabase
async function loadStudents() {
    const listContainer = document.getElementById('students-list');
    
    const { data, error } = await supabase
        .from('students')
        .select('*')
        .order('name', { ascending: true });

    if (error) {
        listContainer.innerHTML = `<div class="glass-card"><p style="color:red">Erreur : ${error.message}</p></div>`;
        return;
    }

    if (data.length === 0) {
        listContainer.innerHTML = `<div class="glass-card"><p>Aucun élève enregistré.</p></div>`;
        return;
    }

    // Affichage avec le design "Data Strip"
    listContainer.innerHTML = data.map(s => `
        <div class="glass-card" style="margin-bottom: 10px; display:flex; justify-content:space-between; align-items:center;">
            <div>
                <strong style="color: var(--gold);">${s.name}</strong><br>
                <small style="opacity: 0.7;">Parents : ${s.parent}</small>
            </div>
            <button onclick="window.deleteStudent('${s.id}')" style="background:transparent; border:none; color: #ff4d4d; font-size: 1.2rem;">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `).join('');
}

// 3. Ajouter un élève
async function handleAddStudent(e) {
    e.preventDefault();
    const name = document.getElementById('student-name').value;
    const parent = document.getElementById('student-parent').value;

    const { error } = await supabase.from('students').insert([{ name, parent }]);

    if (error) {
        alert("Erreur lors de l'ajout : " + error.message);
    } else {
        document.getElementById('student-name').value = ''; // Reset champ
        document.getElementById('student-parent').value = '';
        loadStudents(); // Rafraîchir la liste
    }
}

// 4. Supprimer un élève (Exposé à la fenêtre pour le onclick)
window.deleteStudent = async (id) => {
    if(confirm("Confirmer la suppression de cet élève ?")) {
        const { error } = await supabase.from('students').delete().eq('id', id);
        if (error) alert("Erreur : " + error.message);
        else loadStudents();
    }
};

