export interface AchievementDefinition {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'streak' | 'xp' | 'courses' | 'mastery';
  target: number;
}

export const ACHIEVEMENTS_CATALOG: AchievementDefinition[] = [
  {
    id: 'first_commit',
    title: 'Primer Commit',
    description: 'Completa tu primera lección interactiva con éxito.',
    icon: '🌱',
    category: 'mastery',
    target: 1
  },
  {
    id: 'streak_3',
    title: 'Calentando Motores',
    description: 'Mantén una racha activa de 3 días consecutivos.',
    icon: '🔥',
    category: 'streak',
    target: 3
  },
  {
    id: 'streak_7',
    title: 'Hábito de Código',
    description: 'Alcanza una semana completa programando cada día.',
    icon: '⚡',
    category: 'streak',
    target: 7
  },
  {
    id: 'xp_100',
    title: 'Centenario de XP',
    description: 'Acumula tus primeros 100 puntos de experiencia.',
    icon: '✨',
    category: 'xp',
    target: 100
  },
  {
    id: 'xp_500',
    title: 'Desarrollador en Alza',
    description: 'Alcanza los 500 puntos de experiencia totales.',
    icon: '🚀',
    category: 'xp',
    target: 500
  },
  {
    id: 'polyglot',
    title: 'Políglota Técnico',
    description: 'Inicia al menos dos tecnologías diferentes en Nodu.',
    icon: '🌐',
    category: 'courses',
    target: 2
  }
];
