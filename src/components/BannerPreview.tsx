/**
 * Composant d'aperçu de la bannière en temps réel
 * ALIGNEMENT CORRECT : Contenu à droite, espace pour la photo de profil à gauche
 * RESPONSIVE : Garde le ratio 3:1
 */

import React from 'react';
import type { BannerData, GithubStats, ThemeConfig } from '../types';
import { availableStats, formatStatValue } from '../utils/statsConfig';

interface Props {
  bannerRef: React.RefObject<HTMLDivElement | null>;
  bannerData: BannerData;
  githubStats: GithubStats | null;
  theme: ThemeConfig;
}

export const BannerPreview: React.FC<Props> = ({
  bannerRef,
  bannerData,
  githubStats,
  theme
}) => {
  return (
    <div className="w-full">
      {/* Container responsive avec ratio 3:1 */}
      <div className="w-full relative" style={{ paddingBottom: '33.33%' }}>
        <div
          ref={bannerRef}
          className={`absolute inset-0 rounded-xl overflow-hidden shadow-2xl ${theme.bg}`}
        >
          {/* Zone de la photo de profil (indication visuelle) */}
          <div className="absolute left-[3%] top-1/2 -translate-y-1/2 w-[13%] aspect-square rounded-full border-4 border-white/30 border-dashed flex items-center justify-center backdrop-blur-sm bg-white/5">
            <span className="text-white/40 text-[0.5vw] text-center px-2 leading-tight">
              Zone<br/>photo<br/>profil
            </span>
          </div>
          
          {/* Contenu aligné à DROITE */}
          <div className="absolute inset-0 flex items-center justify-end pr-[5%]">
            <div className="max-w-[55%] text-right">
              {/* Nom */}
              <h1 className={`text-[3.3vw] font-bold mb-[0.6vw] ${theme.text} leading-tight`}>
                {bannerData.name}
              </h1>
              
              {/* Titre/Poste */}
              <p className={`text-[1.3vw] mb-[1vw] ${theme.text} opacity-90 leading-tight`}>
                {bannerData.title}
              </p>
              
              {/* Badges de compétences */}
              <div className="flex flex-wrap gap-[0.4vw] mb-[0.8vw] justify-end">
                {bannerData.skills.map((skill, index) => (
                  <span
                    key={index}
                    className={`px-[0.8vw] py-[0.3vw] rounded-full text-[1vw] font-medium ${theme.badge} ${theme.text} leading-tight`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
              
              {/* Stats GitHub (si activées) */}
              {bannerData.showGithubStats && githubStats && bannerData.selectedStats.length > 0 && (
                <div className="space-y-[0.4vw]">
                  {/* Titre Stats GitHub */}
                  <p className={`text-[0.9vw] ${theme.text} opacity-60 font-medium leading-tight`}>
                    Stats GitHub pour {bannerData.githubUsername}
                  </p>
                  
                  {/* Stats - UNE SEULE LIGNE */}
                  <div className={`flex gap-[1vw] text-[1vw] ${theme.text} opacity-80 justify-end leading-tight flex-wrap`}>
                    {bannerData.selectedStats.map((statKey) => {
                      const statConfig = availableStats.find(s => s.key === statKey);
                      if (!statConfig) return null;
                      
                      const value = githubStats[statKey];
                      const displayValue = formatStatValue(statKey, value);
                      
                      return (
                        <span key={statKey} className="whitespace-nowrap">
                          {statConfig.icon} {displayValue} {statConfig.label.toLowerCase()}
                        </span>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-3 space-y-1">
        <p className="text-purple-200 text-sm text-center">
          📐 Dimensions: 1500 × 500px (ratio 3:1, parfait pour GitHub/LinkedIn)
        </p>
        <p className="text-purple-300 text-xs text-center">
          💡 Ta photo de profil LinkedIn se mettra automatiquement dans la zone à gauche
        </p>
      </div>
    </div>
  );
};