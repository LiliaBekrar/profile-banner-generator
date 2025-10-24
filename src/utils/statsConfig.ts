/**
 * Configuration des stats GitHub disponibles
 */

import type { StatConfig } from '../types';

// Liste de toutes les stats disponibles avec leurs infos
export const availableStats: StatConfig[] = [
  {
    key: 'repos',
    label: 'Repos publics',
    icon: '📦',
    description: 'Nombre de repositories publics'
  },
  {
    key: 'stars',
    label: 'Total stars',
    icon: '⭐',
    description: 'Stars totales sur tous tes repos'
  },
  {
    key: 'followers',
    label: 'Followers',
    icon: '👥',
    description: 'Nombre de personnes qui te suivent'
  },
  {
    key: 'following',
    label: 'Following',
    icon: '👤',
    description: 'Nombre de personnes que tu suis'
  },
  {
    key: 'gists',
    label: 'Gists',
    icon: '📝',
    description: 'Nombre de gists publics'
  },
  {
    key: 'contributions',
    label: 'Contributions',
    icon: '🔥',
    description: 'Contributions cette année (approximatif)'
  },
  {
    key: 'topLanguage',
    label: 'Top langage',
    icon: '💻',
    description: 'Ton langage le plus utilisé'
  },
  {
    key: 'totalCommits',
    label: 'Commits',
    icon: '📊',
    description: 'Commits cette année (approximatif)'
  },
  {
    key: 'pullRequests',
    label: 'Pull Requests',
    icon: '🔀',
    description: 'PRs créées (total)'
  },
  {
    key: 'issues',
    label: 'Issues',
    icon: '🐛',
    description: 'Issues créées (total)'
  }
];

/**
 * Formate une valeur de stat pour l'affichage
 */
export const formatStatValue = (key: string, value: number | string): string => {
  // Si c'est le langage, retourner tel quel
  if (key === 'topLanguage') {
    return String(value);
  }
  
  // Pour les nombres, formater avec des milliers
  const num = Number(value);
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}k`;
  }
  
  return String(num);
};