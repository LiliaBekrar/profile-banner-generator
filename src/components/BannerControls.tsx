/**
 * Composant du panneau de contrôle (formulaire)
 */

import React from 'react';
import { Code, Palette, Download } from 'lucide-react';
import type { BannerData, ThemeType, GithubStats, GithubStatType } from '../types';
import { GithubStatsSelector } from './GithubStatsSelector';

interface Props {
  bannerData: BannerData;
  skillInput: string;
  githubStats: GithubStats | null;
  loadingStats: boolean;
  onBannerDataChange: (data: Partial<BannerData>) => void;
  onSkillInputChange: (value: string) => void;
  onAddSkill: () => void;
  onRemoveSkill: (index: number) => void;
  onFetchStats: () => void;
  onExport: () => void;
  onSelectStat: (stat: GithubStatType) => void;
}

export const BannerControls: React.FC<Props> = ({
  bannerData,
  skillInput,
  githubStats,
  loadingStats,
  onBannerDataChange,
  onSkillInputChange,
  onAddSkill,
  onRemoveSkill,
  onFetchStats,
  onExport,
  onSelectStat
}) => {
  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
        <Code className="text-cyan-400" />
        Personnalisation
      </h2>

      <div className="space-y-6">
        {/* Input Nom */}
        <div>
          <label className="block text-white mb-2 font-medium">Nom</label>
          <input
            type="text"
            value={bannerData.name}
            onChange={(e) => onBannerDataChange({ name: e.target.value })}
            className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Ton nom"
          />
        </div>

        {/* Input Titre */}
        <div>
          <label className="block text-white mb-2 font-medium">Titre</label>
          <input
            type="text"
            value={bannerData.title}
            onChange={(e) => onBannerDataChange({ title: e.target.value })}
            className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Ton titre"
          />
        </div>

        {/* Gestion des compétences */}
        <div>
          <label className="block text-white mb-2 font-medium">
            Compétences (max 8)
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={skillInput}
              onChange={(e) => onSkillInputChange(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && onAddSkill()}
              className="flex-1 px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Ajoute une compétence"
            />
            <button
              onClick={onAddSkill}
              className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors"
            >
              +
            </button>
          </div>
          
          {/* Liste des compétences ajoutées */}
          <div className="flex flex-wrap gap-2 mt-3">
            {bannerData.skills.map((skill, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-purple-500/30 text-white rounded-full text-sm flex items-center gap-2 border border-purple-400/50"
              >
                {skill}
                <button
                  onClick={() => onRemoveSkill(index)}
                  className="hover:text-red-400 transition-colors"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Sélection du thème */}
        <div>
          <label className="block text-white mb-3 font-medium flex items-center gap-2">
            <Palette className="text-pink-400" />
            Thème
          </label>
          <div className="grid grid-cols-2 gap-3">
            {(['gradient', 'glassmorphism', 'cyberpunk', 'minimal'] as ThemeType[]).map((theme) => (
              <button
                key={theme}
                onClick={() => onBannerDataChange({ theme })}
                className={`px-4 py-3 rounded-lg font-medium transition-all ${
                  bannerData.theme === theme
                    ? 'bg-purple-600 text-white ring-2 ring-purple-400'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                {theme.charAt(0).toUpperCase() + theme.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Section Stats GitHub */}
        <GithubStatsSelector
          showGithubStats={bannerData.showGithubStats}
          githubUsername={bannerData.githubUsername}
          githubStats={githubStats}
          selectedStats={bannerData.selectedStats}
          loadingStats={loadingStats}
          onToggleStats={(show) => onBannerDataChange({ showGithubStats: show })}
          onUsernameChange={(username) => onBannerDataChange({ githubUsername: username })}
          onFetchStats={onFetchStats}
          onSelectStat={onSelectStat}
        />

        {/* Bouton d'export */}
        <button
          onClick={onExport}
          className="w-full px-6 py-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-lg font-bold text-lg flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-xl"
        >
          <Download />
          Télécharger PNG
        </button>
      </div>
    </div>
  );
};