/**
 * Utilitaire pour récupérer TOUTES les statistiques GitHub d'un utilisateur
 */

import type { GithubStats } from '../types';

/**
 * Récupère les stats GitHub complètes d'un utilisateur
 * @param username - Le nom d'utilisateur GitHub
 * @returns Toutes les stats disponibles ou null en cas d'erreur
 */
export const fetchGithubStats = async (username: string): Promise<GithubStats | null> => {
  try {
    // Étape 1 : Info de base de l'utilisateur
    const userResponse = await fetch(`https://api.github.com/users/${username}`);
    
    if (!userResponse.ok) {
      throw new Error('Utilisateur introuvable');
    }
    
    const userData = await userResponse.json();
    
    // Étape 2 : Tous les repos (max 100, pagination possible pour plus)
    const reposResponse = await fetch(
      `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`
    );
    const repos = await reposResponse.json();
    
    // Calculer le total de stars
    const totalStars = repos.reduce(
      (acc: number, repo: any) => acc + repo.stargazers_count, 
      0
    );
    
    // Calculer le langage le plus utilisé
    const languageCounts: Record<string, number> = {};
    repos.forEach((repo: any) => {
      if (repo.language) {
        languageCounts[repo.language] = (languageCounts[repo.language] || 0) + 1;
      }
    });
    
    const topLanguage = Object.keys(languageCounts).length > 0
      ? Object.entries(languageCounts).sort((a, b) => b[1] - a[1])[0][0]
      : 'N/A';
    
    // Étape 3 : Contributions de l'année en cours (approximatif via events)
    let contributions = 0;
    try {
      const eventsResponse = await fetch(
        `https://api.github.com/users/${username}/events/public?per_page=100`
      );
      const events = await eventsResponse.json();
      
      // Filtrer les événements de type "PushEvent" de cette année
      const currentYear = new Date().getFullYear();
      contributions = events.filter((event: any) => {
        const eventYear = new Date(event.created_at).getFullYear();
        return event.type === 'PushEvent' && eventYear === currentYear;
      }).length * 3; // Approximation : chaque push = ~3 commits
      
    } catch (error) {
      console.warn('Impossible de récupérer les contributions');
    }
    
    // Étape 4 : Issues et PRs (approximatif)
    let totalIssues = 0;
    let totalPRs = 0;
    
    try {
      const issuesResponse = await fetch(
        `https://api.github.com/search/issues?q=author:${username}+type:issue`
      );
      const issuesData = await issuesResponse.json();
      totalIssues = issuesData.total_count || 0;
      
      const prsResponse = await fetch(
        `https://api.github.com/search/issues?q=author:${username}+type:pr`
      );
      const prsData = await prsResponse.json();
      totalPRs = prsData.total_count || 0;
      
    } catch (error) {
      console.warn('Impossible de récupérer issues/PRs');
    }
    
    // Retourner toutes les stats
    return {
      repos: userData.public_repos,
      stars: totalStars,
      followers: userData.followers,
      following: userData.following,
      gists: userData.public_gists,
      contributions: contributions,
      topLanguage: topLanguage,
      totalCommits: contributions, // Approximation
      pullRequests: totalPRs,
      issues: totalIssues
    };
    
  } catch (error) {
    console.error('Erreur lors de la récupération des stats GitHub:', error);
    return null;
  }
};