/**
 * Configuration des thèmes visuels pour les bannières
 */

import type { ThemeConfig, ThemeType } from '../types';

export const themes: Record<ThemeType, ThemeConfig> = {
  // Thème avec dégradé coloré (défaut)
  gradient: {
    bg: 'bg-gradient-to-br from-purple-600 via-pink-600 to-blue-600',
    text: 'text-white',
    badge: 'bg-white/20 backdrop-blur-sm border border-white/30'
  },
  
  // Thème glassmorphism (effet verre)
  glassmorphism: {
    bg: 'bg-gradient-to-br from-blue-400 to-purple-500',
    text: 'text-white',
    badge: 'bg-white/10 backdrop-blur-md border border-white/20'
  },
  
  // Thème cyberpunk (néons cyan sur fond noir)
  cyberpunk: {
    bg: 'bg-black',
    text: 'text-cyan-400',
    badge: 'bg-cyan-500/20 border-2 border-cyan-400'
  },
  
  // Thème minimal (noir et blanc élégant)
  minimal: {
    bg: 'bg-gradient-to-br from-gray-900 to-gray-800',
    text: 'text-white',
    badge: 'bg-gray-700 border border-gray-600'
  }
};