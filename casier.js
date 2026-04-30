/**
 * Fichier : casier.js
 * Rôle : Gestion complète (CRUD) des élèves.
 */
import { supabase } from './supabase-client.js';

// 1. Fonction pour afficher le formulaire et la liste
export async function renderCasier(container) {
    container.innerHTML = `
        <div class="glass-card">
            <h2>Gestion des Élèves</h2>
            <form id="add-student-form">
                <input type="text" id="student-name" placeholder="Nom complet de l'élève" required>
                <input type="text" id="student-parent" placeholder="Nom des parents" required>
                <button type="submit" class="btn-gold">Ajouter Élève</button>
            </form>
        </div>
        <div id="students-list" class="glass-card">
            <p>Chargement des élèves...</p>
        </div>
    `;

    // Gestion du formulaire d'ajout
    document.getElementById('add-student-form').addEventListener('submit', handleAddStudent);
    
    // Charger la liste
    loadStudents();
}

// 2. Lire les élèves depuis Supabase
async function loadStudents() {
    const { data, error } = await supabase.from('students').select('*');
    const listContainer = document.getElementById('students-list');

    if (error) {
        listContainer.innerHTML = `<p style="color:red">Erreur : ${error.message}</p>`;
        return;
    }

    if (data.length === 0) {
        listContainer.innerHTML = `<p>Aucun élève enregistré.</p>`;
        return;
    }

    listContainer.innerHTML = data.map(s => `
        <div class="data-strip" style="display:flex; justify-content:space-between; margin-bottom:10px;">
            <span>${s.name} (${s.parent})</span>
            <button onclick="deleteStudent(${s.id})" style="background:none; border:none; color:red;">
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

    const { data, error } = await supabase.from('students').insert([{ name, parent }]);

    if (error) alert("Erreur d'ajout : " + error.message);
    else {
        alert("Élève ajouté !");
        loadStudents(); // Rafraîchir
    }
}

// 4. Supprimer (accessible globalement pour le bouton)
window.deleteStudent = async (id) => {
    if(confirm("Supprimer cet élève ?")) {
        await supabase.from('students').delete().eq('id', id);
        loadStudents();
    }
};

