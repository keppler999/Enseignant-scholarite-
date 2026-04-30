/**
 * Fichier : supabase-client.js
 * Rôle : Initialisation unique du client Supabase pour toute l'application.
 * Sécurité : Utilise la clé publique. La protection des données est gérée par RLS dans Supabase.
 */

import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

// Configuration
const supabaseUrl = 'https://wkyqesqmfthcpemqpjvo.supabase.co';
const supabaseKey = 'sb_publishable_EW4WRdcYH_6y8rlen9Pn2A_e8_cKveu';

// Initialisation du client
export const supabase = createClient(supabaseUrl, supabaseKey);

// Log pour le développement (pour vérifier que le moteur est prêt)
console.log("Scholarite v3.0 : Tunnel Supabase établi.");

