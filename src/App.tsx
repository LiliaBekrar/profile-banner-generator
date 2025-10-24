/**
 * Composant principal de l'application
 * Gère l'état global et orchestre les sous-composants
 */

// @ts-ignore
import React, { useState, useRef } from 'react';
import { Sparkles } from 'lucide-react';
import type { BannerData, GithubStats, GithubStatType } from './types';
import { themes } from './styles/themes';
import { fetchGithubStats } from './utils/fetchGithubStats';
import { exportBanner } from './utils/exportBanner';
import { BannerControls } from './components/BannerControls';
import { BannerPreview } from './components/BannerPreview';

function App() {
  // État principal de la bannière
  const [bannerData, setBannerData] = useState<BannerData>({
    name: 'Jane Dev',
    title: 'Full-Stack Developer',
    skills: ['React', 'TypeScript', 'Node.js', 'Python'],
    theme: 'gradient',
    showGithubStats: false,
    githubUsername: '',
    selectedStats: ['repos', 'stars', 'followers'] // Stats par défaut
  });

  // États pour la gestion des compétences et stats GitHub
  const [skillInput, setSkillInput] = useState('');
  const [githubStats, setGithubStats] = useState<GithubStats | null>(null);
  const [loadingStats, setLoadingStats] = useState(false);
  
  // Référence vers l'élément DOM de la bannière (pour l'export)
  const bannerRef = useRef<HTMLDivElement>(null);

  // Thème actuel sélectionné
  const currentTheme = themes[bannerData.theme];

  /**
   * Met à jour une partie des données de la bannière
   */
  const handleBannerDataChange = (updates: Partial<BannerData>) => {
    setBannerData({ ...bannerData, ...updates });
  };

  /**
   * Gère la sélection/désélection d'une stat GitHub
   */
  const handleSelectStat = (stat: GithubStatType) => {
    const isSelected = bannerData.selectedStats.includes(stat);
    
    if (isSelected) {
      // Retirer la stat
      setBannerData({
        ...bannerData,
        selectedStats: bannerData.selectedStats.filter(s => s !== stat)
      });
    } else if (bannerData.selectedStats.length < 4) {
      // Ajouter la stat (max 4)
      setBannerData({
        ...bannerData,
        selectedStats: [...bannerData.selectedStats, stat]
      });
    }
  };

  /**
   * Ajoute une nouvelle compétence (max 8)
   */
  const handleAddSkill = () => {
    if (skillInput.trim() && bannerData.skills.length < 8) {
      setBannerData({
        ...bannerData,
        skills: [...bannerData.skills, skillInput.trim()]
      });
      setSkillInput('');
    }
  };

  /**
   * Supprime une compétence de la liste
   */
  const handleRemoveSkill = (index: number) => {
    setBannerData({
      ...bannerData,
      skills: bannerData.skills.filter((_, i) => i !== index)
    });
  };

  /**
   * Récupère les stats GitHub via l'API
   */
  const handleFetchStats = async () => {
    if (!bannerData.githubUsername.trim()) return;

    setLoadingStats(true);
    const stats = await fetchGithubStats(bannerData.githubUsername);
    
    if (stats) {
      setGithubStats(stats);
    } else {
      alert('Impossible de récupérer les stats. Vérifie le username !');
    }
    
    setLoadingStats(false);
  };

  /**
   * Exporte la bannière en PNG
   */
  const handleExport = () => {
    exportBanner(bannerRef, bannerData, githubStats);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-white mb-4 flex items-center justify-center gap-3">
            <Sparkles className="text-yellow-400" />
            Profile Banner Generator
          </h1>
          <p className="text-purple-200 text-lg">
            Crée ta bannière GitHub/LinkedIn en quelques clics
          </p>
        </div>

        {/* Aperçu de la bannière EN HAUT */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
            <Sparkles className="text-yellow-400" />
            Aperçu de ta bannière
          </h2>
          <BannerPreview
            bannerRef={bannerRef}
            bannerData={bannerData}
            githubStats={githubStats}
            theme={currentTheme}
          />
        </div>

        {/* Panneau de contrôle EN DESSOUS */}
        <div className="max-w-4xl mx-auto">
          <BannerControls
            bannerData={bannerData}
            skillInput={skillInput}
            githubStats={githubStats}
            loadingStats={loadingStats}
            onBannerDataChange={handleBannerDataChange}
            onSkillInputChange={setSkillInput}
            onAddSkill={handleAddSkill}
            onRemoveSkill={handleRemoveSkill}
            onFetchStats={handleFetchStats}
            onExport={handleExport}
            onSelectStat={handleSelectStat}
          />
        </div>
      </div>
      {/* Footer avec cœur animé */}
      <footer className="mt-12 pt-8 border-t border-white/10">
        <div className="text-center">
          <a href="https://www.linkedin.com/in/liliabekrar/">
            <p className="text-purple-200 text-sm flex items-center justify-center gap-2">
              © {new Date().getFullYear()} Made with
              <svg 
                className="heart-svg" 
                viewBox="0 0 24 24" 
                width="22" 
                height="22" 
                aria-hidden="true"
              >
                <path
                  d="M12 21s-6.7-4.36-9.33-7A6.25 6.25 0 1 1 12 5.23 6.25 6.25 0 1 1 21.33 14c-2.63 2.64-9.33 7-9.33 7z"
                  fill="currentColor"
                />
              </svg>
              by <span className="font-semibold text-purple-100">Lilia</span>
            </p>
          </a>
        </div>
      </footer>
    </div>
  );
}

export default App;