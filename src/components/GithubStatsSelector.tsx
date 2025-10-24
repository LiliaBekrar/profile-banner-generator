/**
 * Composant pour sélectionner les stats GitHub à afficher
 */

import React from 'react';
import type { GithubStats, GithubStatType } from '../types';
import { availableStats } from '../utils/statsConfig';

interface Props {
  showGithubStats: boolean;
  githubUsername: string;
  githubStats: GithubStats | null;
  selectedStats: GithubStatType[];
  loadingStats: boolean;
  onToggleStats: (show: boolean) => void;
  onUsernameChange: (username: string) => void;
  onFetchStats: () => void;
  onSelectStat: (stat: GithubStatType) => void;
}

export const GithubStatsSelector: React.FC<Props> = ({
  showGithubStats,
  githubUsername,
  githubStats,
  selectedStats,
  loadingStats,
  onToggleStats,
  onUsernameChange,
  onFetchStats,
  onSelectStat
}) => {
  // Limite de stats sélectionnables
  const MAX_STATS = 4;
  const canSelectMore = selectedStats.length < MAX_STATS;

  return (
    <div className="border-t border-white/20 pt-6">
      {/* Checkbox principale */}
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
        <div className="space-y-4 pl-8">
          {/* Input username */}
          <input
            type="text"
            value={githubUsername}
            onChange={(e) => onUsernameChange(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Ton username GitHub"
          />
          
          {/* Bouton de récupération */}
          <button
            onClick={onFetchStats}
            disabled={loadingStats || !githubUsername.trim()}
            className="w-full px-4 py-3 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors"
          >
            {loadingStats ? 'Chargement...' : 'Récupérer les stats'}
          </button>
          
          {/* Sélection des stats à afficher */}
          {githubStats && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-white text-sm">
                <span className="font-medium">Choisis tes stats (max {MAX_STATS})</span>
                <span className="text-purple-300">
                  {selectedStats.length}/{MAX_STATS}
                </span>
              </div>
              
              {/* Grille de stats disponibles */}
              <div className="grid grid-cols-2 gap-2">
                {availableStats.map((stat) => {
                  const isSelected = selectedStats.includes(stat.key);
                  const isDisabled = !isSelected && !canSelectMore;
                  const value = githubStats[stat.key];
                  
                  return (
                    <button
                      key={stat.key}
                      onClick={() => !isDisabled && onSelectStat(stat.key)}
                      disabled={isDisabled}
                      className={`
                        p-3 rounded-lg text-left transition-all text-sm
                        ${isSelected 
                          ? 'bg-purple-600 text-white ring-2 ring-purple-400' 
                          : isDisabled
                          ? 'bg-white/5 text-white/30 cursor-not-allowed'
                          : 'bg-white/10 text-white hover:bg-white/20'
                        }
                      `}
                      title={stat.description}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span>{stat.icon}</span>
                        <span className="font-medium">{stat.label}</span>
                      </div>
                      <div className={`text-xs ${isSelected ? 'text-purple-100' : 'text-white/60'}`}>
                        {value !== undefined ? String(value) : 'N/A'}
                      </div>
                    </button>
                  );
                })}
              </div>
              
              <p className="text-xs text-purple-200">
                💡 Clique sur une stat pour l'ajouter/retirer de ta bannière
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};