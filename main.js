/**
 * Fichier : main.js
 * Rôle : Routeur principal. Gère la navigation entre les modules sans rechargement.
 */

// Importation des modules nécessaires
import { supabase } from './supabase-client.js';
import { renderCasier } from './casier.js'; 
import { renderNotes } from './notes.js'; 
import { renderAppel } from './appel.js';
import { renderJournal } from './journal.js';
import { renderSettings } from './settings.js'; // Import du module Settings

// Sélection des éléments du DOM
const appRoot = document.getElementById('app-root');
const navButtons = document.querySelectorAll('.nav-btn');

/**
 * Fonction de routage : Charge le bon module selon la vue demandée
 */
async function loadView(viewName) {
    // 1. Mise à jour de l'UI (bouton actif)
    navButtons.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.view === viewName);
    });

    // 2. Chargement du contenu
    appRoot.innerHTML = `<div class="glass-card"><p>Chargement du module ${viewName}...</p></div>`;

    try {
        switch(viewName) {
            case 'dashboard':
                appRoot.innerHTML = `<h1>Dashboard</h1><p>Vue d'ensemble et statistiques...</p>`;
                break;
                
            case 'notes':
                renderNotes(appRoot);
                break;
                
            case 'appel':
                renderAppel(appRoot);
                break;
                
            case 'journal':
                renderJournal(appRoot);
                break;
                
            case 'casier':
                renderCasier(appRoot);
                break;
                
            case 'settings':
                renderSettings(appRoot); // Appel du module Settings
                break;
                
            default:
                appRoot.innerHTML = `<h1>Bienvenue sur Scholarite</h1>`;
        }
    } catch (error) {
        console.error("Erreur de routage :", error);
        appRoot.innerHTML = `<p style="color:red">Erreur lors du chargement du module.</p>`;
    }
}

// 3. Écoute des événements sur la barre de navigation
navButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const view = btn.dataset.view;
        loadView(view);
    });
});

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
    loadView('dashboard');
    console.log("Scholarite Router : Système complet (Casier, Notes, Appel, Journal, Settings).");
});
            
