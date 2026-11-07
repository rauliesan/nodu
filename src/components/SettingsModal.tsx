import React from 'react';
import { UserPreferences } from '../services/db';
import { soundFX } from '../services/sound';

interface SettingsModalProps {
  settings: UserPreferences;
  onUpdateSettings: (newSettings: Partial<UserPreferences>) => void;
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  settings,
  onUpdateSettings,
  onClose
}) => {
  const isDark = settings.theme === 'dark';

  const handleToggleTheme = () => {
    onUpdateSettings({ theme: isDark ? 'light' : 'dark' });
  };

  const handleToggleSound = () => {
    const nextSound = !settings.soundEnabled;
    soundFX.setMuted(!nextSound);
    onUpdateSettings({ soundEnabled: nextSound });
    if (nextSound) soundFX.playSuccess();
  };

  const handleToggleReducedMotion = () => {
    onUpdateSettings({ reducedMotion: !settings.reducedMotion });
  };

  const handleToggleLargeFont = () => {
    onUpdateSettings({ largeFont: !settings.largeFont });
  };

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background: '#0e131f',
        zIndex: 120,
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {/* Cabecera */}
      <header
        style={{
          padding: '16px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid #2d3748'
        }}
      >
        <div style={{ fontSize: '17px', fontWeight: 800, color: 'white' }}>
          ⚙️ Ajustes y Accesibilidad
        </div>
        <button
          type="button"
          onClick={onClose}
          style={{
            background: 'none',
            border: 'none',
            color: '#94a3b8',
            fontSize: '20px',
            cursor: 'pointer',
            fontWeight: 800
          }}
        >
          ✕
        </button>
      </header>

      {/* Contenido de Opciones */}
      <div style={{ flex: 1, padding: '20px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        
        {/* Sección: Apariencia */}
        <div>
          <div style={{ fontSize: '11px', color: '#38bdf8', fontWeight: 800, textTransform: 'uppercase', marginBottom: '10px' }}>
            APARIENCIA VISUAL
          </div>
          <div
            style={{
              background: '#1e293b',
              border: '1px solid #2d3748',
              borderRadius: '16px',
              padding: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <div>
              <div style={{ fontSize: '14px', fontWeight: 700, color: 'white' }}>Tema de la Interfaz</div>
              <div style={{ fontSize: '12px', color: '#94a3b8' }}>
                {isDark ? 'Oscuro OLED (Ahorro de batería)' : 'Claro Cristal'}
              </div>
            </div>
            <button
              type="button"
              onClick={handleToggleTheme}
              style={{
                background: '#0f172a',
                border: '1px solid #38bdf8',
                borderRadius: '8px',
                padding: '8px 14px',
                color: '#38bdf8',
                fontWeight: 800,
                fontSize: '12px',
                cursor: 'pointer'
              }}
            >
              {isDark ? '🌙 Oscuro' : '☀️ Claro'}
            </button>
          </div>
        </div>

        {/* Sección: Efectos y Sonido */}
        <div>
          <div style={{ fontSize: '11px', color: '#ffb703', fontWeight: 800, textTransform: 'uppercase', marginBottom: '10px' }}>
            EFECTOS Y FEEDBACK
          </div>
          <div
            style={{
              background: '#1e293b',
              border: '1px solid #2d3748',
              borderRadius: '16px',
              padding: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <div>
              <div style={{ fontSize: '14px', fontWeight: 700, color: 'white' }}>Efectos de Sonido</div>
              <div style={{ fontSize: '12px', color: '#94a3b8' }}>
                Síntesis nativa para aciertos y celebraciones
              </div>
            </div>
            <button
              type="button"
              onClick={handleToggleSound}
              style={{
                background: settings.soundEnabled ? 'rgba(16, 185, 129, 0.15)' : '#0f172a',
                border: `1px solid ${settings.soundEnabled ? '#10b981' : '#2d3748'}`,
                borderRadius: '8px',
                padding: '8px 14px',
                color: settings.soundEnabled ? '#34d399' : '#64748b',
                fontWeight: 800,
                fontSize: '12px',
                cursor: 'pointer'
              }}
            >
              {settings.soundEnabled ? '🔊 Activado' : '🔇 Silencio'}
            </button>
          </div>
        </div>

        {/* Sección: Accesibilidad */}
        <div>
          <div style={{ fontSize: '11px', color: '#10b981', fontWeight: 800, textTransform: 'uppercase', marginBottom: '10px' }}>
            ACCESIBILIDAD Y COGNICIÓN
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            
            {/* Reducción de movimiento */}
            <div
              style={{
                background: '#1e293b',
                border: '1px solid #2d3748',
                borderRadius: '16px',
                padding: '14px 16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: 'white' }}>Reducir Movimiento</div>
                <div style={{ fontSize: '11px', color: '#94a3b8' }}>Minimiza transiciones y pulsos visuales</div>
              </div>
              <button
                type="button"
                onClick={handleToggleReducedMotion}
                style={{
                  background: settings.reducedMotion ? 'rgba(0, 180, 216, 0.15)' : '#0f172a',
                  border: `1px solid ${settings.reducedMotion ? '#00b4d8' : '#2d3748'}`,
                  borderRadius: '6px',
                  padding: '6px 12px',
                  color: settings.reducedMotion ? '#38bdf8' : '#64748b',
                  fontSize: '11px',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                {settings.reducedMotion ? 'SÍ' : 'NO'}
              </button>
            </div>

            {/* Texto Aumentado */}
            <div
              style={{
                background: '#1e293b',
                border: '1px solid #2d3748',
                borderRadius: '16px',
                padding: '14px 16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: 'white' }}>Texto Aumentado</div>
                <div style={{ fontSize: '11px', color: '#94a3b8' }}>Aumenta el tamaño en explicaciones y código</div>
              </div>
              <button
                type="button"
                onClick={handleToggleLargeFont}
                style={{
                  background: settings.largeFont ? 'rgba(0, 180, 216, 0.15)' : '#0f172a',
                  border: `1px solid ${settings.largeFont ? '#00b4d8' : '#2d3748'}`,
                  borderRadius: '6px',
                  padding: '6px 12px',
                  color: settings.largeFont ? '#38bdf8' : '#64748b',
                  fontSize: '11px',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                {settings.largeFont ? 'SÍ' : 'NO'}
              </button>
            </div>

          </div>
        </div>

        {/* Información de Versión y Estado Local */}
        <div style={{ marginTop: 'auto', textAlign: 'center', padding: '10px 0' }}>
          <div style={{ fontSize: '11px', color: '#64748b', fontFamily: 'var(--font-code)' }}>
            NODU // LOCAL-FIRST ENGINE v1.0.0 • PWA VERIFIED
          </div>
          <div style={{ fontSize: '10px', color: '#475569', marginTop: '4px' }}>
            Almacenamiento seguro en IndexedDB (Dexie.js) • Cero rastreadores
          </div>
        </div>

      </div>
    </div>
  );
};
