/**
 * Fichier : journal.js
 * Rôle : Planification pédagogique et cahier de textes.
 */
import { supabase } from './supabase-client.js';

export async function renderJournal(container) {
    container.innerHTML = `
        <div class="glass-card">
            <h2>Cahier de Textes</h2>
            <form id="journal-form" style="display: flex; flex-direction: column; gap: 10px; margin-bottom: 20px;">
                <input type="date" id="lesson-date" required style="background: rgba(0,0,0,0.5); border: 1px solid var(--gold); color: #fff; padding: 10px; border-radius: 8px;">
                <input type="text" id="lesson-subject" placeholder="Matière" required style="background: rgba(0,0,0,0.5); border: 1px solid var(--gold); color: #fff; padding: 10px; border-radius: 8px;">
                <input type="text" id="lesson-topic" placeholder="Sujet de la leçon" required style="background: rgba(0,0,0,0.5); border: 1px solid var(--gold); color: #fff; padding: 10px; border-radius: 8px;">
                <textarea id="lesson-objectives" placeholder="Objectifs pédagogiques..." style="background: rgba(0,0,0,0.5); border: 1px solid var(--gold); color: #fff; padding: 10px; border-radius: 8px; height: 80px;"></textarea>
                <button type="submit" class="btn-gold" style="background: var(--gold); border: none; padding: 10px; border-radius: 8px; font-weight: bold; cursor: pointer;">
                    Planifier la leçon
                </button>
            </form>
        </div>
        <div id="journal-list">
            <p>Chargement du planning...</p>
        </div>
    `;

    document.getElementById('journal-form').addEventListener('submit', handleSaveLesson);
    loadLessons();
}

async function loadLessons() {
    const listContainer = document.getElementById('journal-list');
    const { data, error } = await supabase.from('journal').select('*').order('date', { ascending: true });

    if (error) {
        listContainer.innerHTML = `<p style="color:red">Erreur : ${error.message}</p>`;
        return;
    }

    if (data.length === 0) {
        listContainer.innerHTML = `<div class="glass-card"><p>Aucune leçon planifiée.</p></div>`;
        return;
    }

    listContainer.innerHTML = data.map(l => `
        <div class="glass-card" style="margin-bottom: 10px;">
            <strong style="color: var(--gold);">${l.date} - ${l.subject}</strong>
            <p style="margin: 5px 0;"><strong>Sujet :</strong> ${l.topic}</p>
            <p style="opacity: 0.8; font-size: 0.9em;"><em>Objectifs :</em> ${l.objectives}</p>
            <button onclick="window.deleteLesson('${l.id}')" style="background:none; border:none; color: #ff4d4d; float:right;">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `).join('');
}

async function handleSaveLesson(e) {
    e.preventDefault();
    const entry = {
        date: document.getElementById('lesson-date').value,
        subject: document.getElementById('lesson-subject').value,
        topic: document.getElementById('lesson-topic').value,
        objectives: document.getElementById('lesson-objectives').value
    };

    const { error } = await supabase.from('journal').insert([entry]);
    if (error) alert("Erreur : " + error.message);
    else {
        document.getElementById('journal-form').reset();
        loadLessons();
    }
}

window.deleteLesson = async (id) => {
    await supabase.from('journal').delete().eq('id', id);
    loadLessons();
};

