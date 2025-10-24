/**
 * Composant pour gérer l'affichage et la récupération des stats GitHub
 */

import React from 'react';
import type { GithubStats } from '../types';

interface Props {
  showGithubStats: boolean;
  githubUsername: string;
  githubStats: GithubStats | null;
  loadingStats: boolean;
  onToggleStats: (show: boolean) => void;
  onUsernameChange: (username: string) => void;
  onFetchStats: () => void;
}

export const GithubStatsSection: React.FC<Props> = ({
  showGithubStats,
  githubUsername,
  githubStats,
  loadingStats,
  onToggleStats,
  onUsernameChange,
  onFetchStats
}) => {
  return (
    <div className="border-t border-white/20 pt-6">
      {/* Checkbox pour activer/désactiver les stats */}
      <label className="flex items-center gap-3 text-white mb-4 cursor-pointer group">
        <input
          type="checkbox"
          checked={showGithubStats}
          onChange={(e) => onToggleStats(e.target.checked)}
          className="w-5 h-5 rounded border-2 border-white/30 bg-white/10 checked:bg-purple-600 focus:ring-2 focus:ring-purple-500 cursor-pointer"
        />
        <span className="font-medium group-hover:text-purple-300 transition-colors">
          Afficher mes stats GitHub
        </span>
      </label>

      {/* Section qui apparaît quand la checkbox est cochée */}
      {showGithubStats && (
        <div className="space-y-3 pl-8">
          {/* Input pour le username GitHub */}
          <input
            type="text"
            value={githubUsername}
            onChange={(e) => onUsernameChange(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Ton username GitHub"
          />
          
          {/* Bouton pour récupérer les stats */}
          <button
            onClick={onFetchStats}
            disabled={loadingStats || !githubUsername.trim()}
            className="w-full px-4 py-3 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors"
          >
            {loadingStats ? 'Chargement...' : 'Récupérer les stats'}
          </button>
          
          {/* Affichage des stats récupérées */}
          {githubStats && (
            <div className="bg-white/10 rounded-lg p-4 text-white text-sm space-y-1">
              <div>📦 Repos: {githubStats.repos}</div>
              <div>⭐ Stars: {githubStats.stars}</div>
              <div>👥 Followers: {githubStats.followers}</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};