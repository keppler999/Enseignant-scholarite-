/**
 * Fichier : main.js
 * Rôle : Routeur principal. Gère la navigation entre les modules sans rechargement.
 */

import { supabase } from './supabase-client.js';

// Sélection des éléments
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
                // Implémentation du Dashboard
                appRoot.innerHTML = `<h1>Dashboard</h1><p>Vue d'ensemble et statistiques...</p>`;
                break;
            case 'notes':
                // Implémentation du module Cotes
                appRoot.innerHTML = `<h1>Saisie des Cotes</h1>`;
                break;
            case 'appel':
                // Implémentation du module Appel
                appRoot.innerHTML = `<h1>Registre d'Appel</h1>`;
                break;
            case 'casier':
                // Implémentation du module Casier
                appRoot.innerHTML = `<h1>Casier Élève</h1>`;
                break;
            case 'settings':
                // Implémentation des paramètres
                appRoot.innerHTML = `<h1>Paramètres</h1>`;
                break;
            default:
                appRoot.innerHTML = `<h1>Bienvenue</h1>`;
        }
    } catch (error) {
        appRoot.innerHTML = `<p style="color:red">Erreur de chargement du module.</p>`;
    }
}

// 3. Écoute des événements sur la barre de navigation
navButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const view = btn.dataset.view;
        loadView(view);
    });
});

// Initialisation au chargement
document.addEventListener('DOMContentLoaded', () => {
    loadView('dashboard');
    console.log("Scholarite Router : Prêt.");
});
