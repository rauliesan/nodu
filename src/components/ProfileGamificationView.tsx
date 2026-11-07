import React from 'react';
import { UserProfile } from '../services/db';
import { ACHIEVEMENTS_CATALOG } from '../types/achievements';

interface ProfileGamificationViewProps {
  profile: UserProfile | null;
  completedLessonsCount: number;
  activeCoursesCount: number;
  onDownloadCert: () => void;
  onExportBackup: () => void;
}

export const ProfileGamificationView: React.FC<ProfileGamificationViewProps> = ({
  profile,
  completedLessonsCount,
  activeCoursesCount,
  onDownloadCert,
  onExportBackup
}) => {
  const streakDays = profile?.streakDays || 5;
  const totalXp = profile?.totalXp || 140;

  // Días de la semana para el heatmap de constancia
  const weekDays = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];

  // Determinar nivel y rango
  const getLevelInfo = (xp: number) => {
    if (xp < 150) return { level: 1, title: 'Script Novice', nextTarget: 150, prevTarget: 0 };
    if (xp < 450) return { level: 2, title: 'Code Apprentice', nextTarget: 450, prevTarget: 150 };
    if (xp < 1000) return { level: 3, title: 'Logic Crafter', nextTarget: 1000, prevTarget: 450 };
    return { level: 4, title: 'System Architect', nextTarget: 2500, prevTarget: 1000 };
  };

  const levelInfo = getLevelInfo(totalXp);
  const levelProgress = Math.min(
    100,
    Math.round(((totalXp - levelInfo.prevTarget) / (levelInfo.nextTarget - levelInfo.prevTarget)) * 100)
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
      {/* 1. Tarjeta Principal de Desarrollador */}
      <div
        style={{
          background: '#1e293b',
          border: '1px solid #2d3748',
          borderRadius: '20px',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div
            style={{
              width: '60px',
              height: '60px',
              background: 'linear-gradient(135deg, #00b4d8, #03045e)',
              borderRadius: '18px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '26px',
              border: '2px solid #38bdf8',
              boxShadow: '0 4px 12px rgba(0, 180, 216, 0.3)'
            }}
          >
            💻
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '18px', fontWeight: 800, color: 'white' }}>
              {profile?.name || 'Alex Dev'}
            </div>
            <div style={{ fontSize: '12px', color: '#38bdf8', fontFamily: 'var(--font-code)', marginTop: '2px' }}>
              {levelInfo.title} • Nivel {levelInfo.level}
            </div>
          </div>
        </div>

        {/* Barra de Progreso de Nivel */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#94a3b8', marginBottom: '6px' }}>
            <span>Progreso hacia Nivel {levelInfo.level + 1}</span>
            <span style={{ fontFamily: 'var(--font-code)' }}>{totalXp} / {levelInfo.nextTarget} XP</span>
          </div>
          <div style={{ height: '8px', background: '#0f172a', borderRadius: '100px', overflow: 'hidden' }}>
            <div
              style={{
                width: `${levelProgress}%`,
                height: '100%',
                background: 'linear-gradient(90deg, #00b4d8, #ffb703)',
                transition: 'width 0.3s ease'
              }}
            />
          </div>
        </div>
      </div>

      {/* 2. Métricas Clave y Calendario de Constancia */}
      <div
        style={{
          background: '#1e293b',
          border: '1px solid #2d3748',
          borderRadius: '20px',
          padding: '18px',
          display: 'flex',
          flexDirection: 'column',
          gap: '14px'
        }}
      >
        <div style={{ fontSize: '14px', fontWeight: 800, color: 'white' }}>
          📅 Actividad y Racha Semanal
        </div>

        {/* Círculos Semanales */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '8px', textAlign: 'center' }}>
          {weekDays.map((day, idx) => {
            const isActiveDay = idx < 5; // Simular 5 días activos
            return (
              <div key={day} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                <span style={{ fontSize: '11px', color: '#64748b', fontWeight: 700 }}>{day}</span>
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '10px',
                    background: isActiveDay ? 'rgba(251, 133, 0, 0.2)' : '#0f172a',
                    border: `2px solid ${isActiveDay ? '#fb8500' : '#2d3748'}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '13px'
                  }}
                >
                  {isActiveDay ? '🔥' : '•'}
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ fontSize: '12px', color: '#94a3b8', lineHeight: 1.4 }}>
          Llevas <strong style={{ color: '#fb8500' }}>{streakDays} días consecutivos</strong> de aprendizaje. ¡Estás a 2 días de tu insignia semanal!
        </div>
      </div>

      {/* 3. Vitrina de Insignias y Logros */}
      <div
        style={{
          background: '#1e293b',
          border: '1px solid #2d3748',
          borderRadius: '20px',
          padding: '18px',
          display: 'flex',
          flexDirection: 'column',
          gap: '14px'
        }}
      >
        <div style={{ fontSize: '14px', fontWeight: 800, color: 'white' }}>
          🏆 Vitrina de Logros ({ACHIEVEMENTS_CATALOG.filter((a) => {
            if (a.id === 'first_commit') return completedLessonsCount >= 1;
            if (a.id === 'streak_3') return streakDays >= 3;
            if (a.id === 'streak_7') return streakDays >= 7;
            if (a.id === 'xp_100') return totalXp >= 100;
            if (a.id === 'xp_500') return totalXp >= 500;
            if (a.id === 'polyglot') return activeCoursesCount >= 2;
            return false;
          }).length} / {ACHIEVEMENTS_CATALOG.length})
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {ACHIEVEMENTS_CATALOG.map((ach) => {
            let isUnlocked = false;
            if (ach.id === 'first_commit') isUnlocked = completedLessonsCount >= 1;
            if (ach.id === 'streak_3') isUnlocked = streakDays >= 3;
            if (ach.id === 'streak_7') isUnlocked = streakDays >= 7;
            if (ach.id === 'xp_100') isUnlocked = totalXp >= 100;
            if (ach.id === 'xp_500') isUnlocked = totalXp >= 500;
            if (ach.id === 'polyglot') isUnlocked = activeCoursesCount >= 2;

            return (
              <div
                key={ach.id}
                style={{
                  background: isUnlocked ? 'rgba(0, 180, 216, 0.08)' : '#0f172a',
                  border: `1px solid ${isUnlocked ? '#00b4d8' : '#2d3748'}`,
                  borderRadius: '12px',
                  padding: '12px 14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  opacity: isUnlocked ? 1 : 0.6
                }}
              >
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '10px',
                    background: isUnlocked ? '#00b4d8' : '#1e293b',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '20px'
                  }}
                >
                  {isUnlocked ? ach.icon : '🔒'}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: isUnlocked ? 'white' : '#94a3b8' }}>
                    {ach.title}
                  </div>
                  <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>
                    {ach.description}
                  </div>
                </div>
                {isUnlocked && (
                  <span style={{ fontSize: '11px', color: '#10b981', fontWeight: 800 }}>
                    ✓
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Certificados y Copias de Seguridad */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <button
          type="button"
          onClick={onDownloadCert}
          style={{
            height: '48px',
            background: '#00b4d8',
            color: 'white',
            border: 'none',
            borderRadius: '12px',
            fontSize: '14px',
            fontWeight: 800,
            cursor: 'pointer',
            boxShadow: '0 4px 0 #0077b6'
          }}
        >
          📄 Descargar Certificado de Python en PDF
        </button>

        <button
          type="button"
          onClick={onExportBackup}
          style={{
            height: '44px',
            background: '#334155',
            color: '#f8fafc',
            border: 'none',
            borderRadius: '12px',
            fontSize: '13px',
            fontWeight: 700,
            cursor: 'pointer'
          }}
        >
          💾 Exportar Copia de Seguridad Local (JSON)
        </button>
      </div>
    </div>
  );
};
