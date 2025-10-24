/**
 * Types pour les données de la bannière
 */

// Configuration de la bannière
export interface BannerData {
  name: string;              // Nom affiché sur la bannière
  title: string;             // Titre/poste
  skills: string[];          // Liste des compétences (max 8)
  theme: ThemeType;          // Thème visuel sélectionné
  showGithubStats: boolean;  // Afficher ou non les stats GitHub
  githubUsername: string;    // Username GitHub
  selectedStats: GithubStatType[]; // Stats sélectionnées par l'utilisateur
}

// Stats récupérées depuis l'API GitHub
export interface GithubStats {
  repos: number;              // Nombre de repositories publics
  stars: number;              // Total de stars
  followers: number;          // Nombre de followers
  following: number;          // Nombre de following
  gists: number;              // Nombre de gists
  contributions: number;      // Contributions cette année
  topLanguage: string;        // Langage le plus utilisé
  totalCommits: number;       // Commits (approximatif)
  pullRequests: number;       // PRs ouvertes
  issues: number;             // Issues ouvertes
}

// Types de stats disponibles
export type GithubStatType = 
  | 'repos' 
  | 'stars' 
  | 'followers' 
  | 'following'
  | 'gists'
  | 'contributions'
  | 'topLanguage'
  | 'totalCommits'
  | 'pullRequests'
  | 'issues';

// Configuration d'affichage pour chaque stat
export interface StatConfig {
  key: GithubStatType;
  label: string;       // Nom affiché dans l'interface
  icon: string;        // Emoji pour la bannière
  description: string; // Description pour l'utilisateur
}

// Types de thèmes disponibles
export type ThemeType = 'gradient' | 'glassmorphism' | 'cyberpunk' | 'minimal';

// Configuration d'un thème
export interface ThemeConfig {
  bg: string;      // Classes Tailwind pour le background
  text: string;    // Classes Tailwind pour le texte
  badge: string;   // Classes Tailwind pour les badges de compétences
}