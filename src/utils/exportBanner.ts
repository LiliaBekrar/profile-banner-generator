/**
 * Utilitaire pour exporter la bannière en image PNG
 * ALIGNEMENT CORRECT : Contenu à droite, espace pour photo à gauche
 */

import type { BannerData, GithubStats, StatConfig } from '../types';

/**
 * Exporte la bannière en image PNG haute résolution (1500x500px)
 * @param bannerRef - Référence React vers l'élément DOM de la bannière
 * @param bannerData - Configuration de la bannière
 * @param githubStats - Stats GitHub (optionnel)
 */
export const exportBanner = async (
  bannerRef: React.RefObject<HTMLDivElement | null>,
  bannerData: BannerData,
  githubStats: GithubStats | null
): Promise<void> => {
  if (!bannerRef.current) return;

  try {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Dimensions finales
    canvas.width = 1500;
    canvas.height = 500;

    // Config des stats (copié ici pour éviter les problèmes d'import)
    const availableStatsLocal: StatConfig[] = [
      { key: 'repos', label: 'repos publics', icon: '📦', description: '' },
      { key: 'stars', label: 'total stars', icon: '⭐', description: '' },
      { key: 'followers', label: 'followers', icon: '👥', description: '' },
      { key: 'following', label: 'following', icon: '👤', description: '' },
      { key: 'gists', label: 'gists', icon: '📝', description: '' },
      { key: 'contributions', label: 'contributions', icon: '🔥', description: '' },
      { key: 'topLanguage', label: 'top langage', icon: '💻', description: '' },
      { key: 'totalCommits', label: 'commits', icon: '📊', description: '' },
      { key: 'pullRequests', label: 'pull requests', icon: '🔀', description: '' },
      { key: 'issues', label: 'issues', icon: '🐛', description: '' }
    ];

    // Fonction pour formater les valeurs
    const formatValue = (key: string, value: number | string): string => {
      if (key === 'topLanguage') return String(value);
      const num = Number(value);
      if (num >= 1000) return `${(num / 1000).toFixed(1)}k`;
      return String(num);
    };

    // ========== BACKGROUND ==========
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    
    switch (bannerData.theme) {
      case 'gradient':
        gradient.addColorStop(0, '#9333ea');
        gradient.addColorStop(0.5, '#db2777');
        gradient.addColorStop(1, '#2563eb');
        break;
      case 'glassmorphism':
        gradient.addColorStop(0, '#60a5fa');
        gradient.addColorStop(1, '#a855f7');
        break;
      case 'cyberpunk':
        gradient.addColorStop(0, '#000000');
        gradient.addColorStop(1, '#000000');
        break;
      case 'minimal':
        gradient.addColorStop(0, '#111827');
        gradient.addColorStop(1, '#1f2937');
        break;
    }
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // ========== CONTENU ALIGNÉ À DROITE ==========
    const rightZoneEnd = canvas.width - 80;
    let currentY = 180;

    // ========== NOM ==========
    ctx.fillStyle = bannerData.theme === 'cyberpunk' ? '#22d3ee' : '#ffffff';
    ctx.font = 'bold 72px system-ui, -apple-system, sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText(bannerData.name, rightZoneEnd, currentY);
    currentY += 70;

    // ========== TITRE ==========
    ctx.fillStyle = bannerData.theme === 'cyberpunk' ? '#67e8f9' : 'rgba(255, 255, 255, 0.9)';
    ctx.font = '32px system-ui, -apple-system, sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText(bannerData.title, rightZoneEnd, currentY);
    currentY += 60;

    // ========== COMPÉTENCES (avec bords arrondis) ==========
    ctx.font = '24px system-ui, -apple-system, sans-serif';
    ctx.textAlign = 'left';
    
    const badgePadding = 20;
    const badgeGap = 15;
    const badgeRadius = 25;
    let totalBadgesWidth = 0;
    const badgeWidths: number[] = [];
    
    bannerData.skills.forEach((skill) => {
      const textWidth = ctx.measureText(skill).width;
      const badgeWidth = textWidth + badgePadding * 2;
      badgeWidths.push(badgeWidth);
      totalBadgesWidth += badgeWidth;
    });
    totalBadgesWidth += badgeGap * (bannerData.skills.length - 1);
    
    let xPos = rightZoneEnd - totalBadgesWidth;
    const badgeY = currentY;
    const badgeHeight = 50;
    
    bannerData.skills.forEach((skill, index) => {
      const badgeWidth = badgeWidths[index];
      const badgeX = xPos;
      const badgeYTop = badgeY - 35;
      
      // Dessiner rectangle arrondi
      ctx.beginPath();
      ctx.moveTo(badgeX + badgeRadius, badgeYTop);
      ctx.lineTo(badgeX + badgeWidth - badgeRadius, badgeYTop);
      ctx.arcTo(badgeX + badgeWidth, badgeYTop, badgeX + badgeWidth, badgeYTop + badgeRadius, badgeRadius);
      ctx.lineTo(badgeX + badgeWidth, badgeYTop + badgeHeight - badgeRadius);
      ctx.arcTo(badgeX + badgeWidth, badgeYTop + badgeHeight, badgeX + badgeWidth - badgeRadius, badgeYTop + badgeHeight, badgeRadius);
      ctx.lineTo(badgeX + badgeRadius, badgeYTop + badgeHeight);
      ctx.arcTo(badgeX, badgeYTop + badgeHeight, badgeX, badgeYTop + badgeHeight - badgeRadius, badgeRadius);
      ctx.lineTo(badgeX, badgeYTop + badgeRadius);
      ctx.arcTo(badgeX, badgeYTop, badgeX + badgeRadius, badgeYTop, badgeRadius);
      ctx.closePath();
      
      if (bannerData.theme === 'cyberpunk') {
        ctx.fillStyle = 'rgba(34, 211, 238, 0.2)';
        ctx.fill();
        ctx.strokeStyle = '#22d3ee';
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.fillStyle = '#22d3ee';
      } else {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.fill();
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.fillStyle = '#ffffff';
      }
      
      ctx.fillText(skill, xPos + badgePadding, badgeY);
      xPos += badgeWidth + badgeGap;
    });
    
    currentY += 70;

    // ========== STATS GITHUB (avec titre et labels complets) ==========
    if (bannerData.showGithubStats && githubStats && bannerData.selectedStats.length > 0) {
      // Titre "Stats GitHub pour {username}"
      ctx.font = 'bold 20px system-ui, -apple-system, sans-serif';
      ctx.fillStyle = bannerData.theme === 'cyberpunk' ? '#67e8f9' : 'rgba(255, 255, 255, 0.6)';
      ctx.textAlign = 'right';
      const titleText = `Stats GitHub pour ${bannerData.githubUsername}`;
      ctx.fillText(titleText, rightZoneEnd, currentY);
      currentY += 35;
      
      // Stats avec labels complets
      ctx.font = '22px system-ui, -apple-system, sans-serif';
      ctx.fillStyle = bannerData.theme === 'cyberpunk' ? '#67e8f9' : 'rgba(255, 255, 255, 0.8)';
      
      const statsTexts: string[] = [];
      const statsWidths: number[] = [];
      let totalStatsWidth = 0;
      const statsGap = 40;
      
      bannerData.selectedStats.forEach((statKey) => {
        const statConfig = availableStatsLocal.find(s => s.key === statKey);
        if (!statConfig) return;
        
        const value = githubStats[statKey];
        const displayValue = formatValue(statKey, value);
        
        // Format avec label complet
        const text = statKey === 'topLanguage' 
          ? `${statConfig.icon} ${displayValue} ${statConfig.label}`  // Ajoute "top langage"
          : `${statConfig.icon} ${displayValue} ${statConfig.label}`;
        
        statsTexts.push(text);
        const width = ctx.measureText(text).width;
        statsWidths.push(width);
        totalStatsWidth += width;
      });
      
      totalStatsWidth += statsGap * (statsTexts.length - 1);
      
      let statsX = rightZoneEnd - totalStatsWidth;
      const statsY = currentY;
      
      statsTexts.forEach((text, index) => {
        ctx.fillText(text, statsX, statsY);
        statsX += statsWidths[index] + statsGap;
      });
    }

    // ========== TÉLÉCHARGEMENT ==========
    const link = document.createElement('a');
    link.download = `profile-banner-${bannerData.theme}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
    
  } catch (error) {
    console.error('Erreur lors de l\'export:', error);
    alert('Erreur lors du téléchargement. Réessaye !');
  }
};