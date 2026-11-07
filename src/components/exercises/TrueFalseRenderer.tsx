import React from 'react';
import { TrueFalseExercise } from '../../types/course';

interface TrueFalseRendererProps {
  exercise: TrueFalseExercise;
  selectedValue: boolean | null;
  onSelectValue: (val: boolean) => void;
  isLocked: boolean;
}

export const TrueFalseRenderer: React.FC<TrueFalseRendererProps> = ({
  exercise,
  selectedValue,
  onSelectValue,
  isLocked
}) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '16px' }}>
      {/* Declaración a evaluar */}
      <div
        style={{
          background: '#080c14',
          border: '1px solid #1e293b',
          borderRadius: '12px',
          padding: '16px',
          fontFamily: 'var(--font-code)',
          fontSize: '14px',
          color: '#e2e8f0',
          lineHeight: 1.5
        }}
      >
        "{exercise.statement}"
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        <button
          type="button"
          disabled={isLocked}
          onClick={() => onSelectValue(true)}
          style={{
            height: '52px',
            background: selectedValue === true ? 'rgba(16, 185, 129, 0.15)' : '#1e293b',
            border: `2px solid ${selectedValue === true ? '#10b981' : '#2d3748'}`,
            borderRadius: '12px',
            color: selectedValue === true ? '#34d399' : 'white',
            fontWeight: 800,
            fontSize: '15px',
            cursor: isLocked ? 'default' : 'pointer',
            boxShadow: selectedValue === true ? '0 3px 0 #059669' : '0 3px 0 #0f172a'
          }}
        >
          ✓ Verdadero
        </button>

        <button
          type="button"
          disabled={isLocked}
          onClick={() => onSelectValue(false)}
          style={{
            height: '52px',
            background: selectedValue === false ? 'rgba(239, 68, 68, 0.15)' : '#1e293b',
            border: `2px solid ${selectedValue === false ? '#ef4444' : '#2d3748'}`,
            borderRadius: '12px',
            color: selectedValue === false ? '#f87171' : 'white',
            fontWeight: 800,
            fontSize: '15px',
            cursor: isLocked ? 'default' : 'pointer',
            boxShadow: selectedValue === false ? '0 3px 0 #b91c1c' : '0 3px 0 #0f172a'
          }}
        >
          ✕ Falso
        </button>
      </div>
    </div>
  );
};
