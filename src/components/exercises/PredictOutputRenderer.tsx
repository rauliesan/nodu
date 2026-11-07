import React from 'react';
import { PredictOutputExercise } from '../../types/course';

interface PredictOutputRendererProps {
  exercise: PredictOutputExercise;
  selectedOptionIndex: number | null;
  onSelectOption: (idx: number) => void;
  isLocked: boolean;
}

export const PredictOutputRenderer: React.FC<PredictOutputRendererProps> = ({
  exercise,
  selectedOptionIndex,
  onSelectOption,
  isLocked
}) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '16px' }}>
      {/* Bloque de Código de la Terminal */}
      <div
        style={{
          background: '#080c14',
          border: '1px solid #1e293b',
          borderRadius: '12px',
          padding: '16px',
          fontFamily: 'var(--font-code)',
          fontSize: '13px',
          lineHeight: 1.6,
          color: '#e2e8f0',
          whiteSpace: 'pre-wrap'
        }}
      >
        {exercise.code}
      </div>

      <div style={{ fontSize: '13px', fontWeight: 700, color: '#94a3b8' }}>
        ¿Qué valor imprimirá la terminal?
      </div>

      {/* Opciones de Salida */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
        {exercise.options.map((opt: string, idx: number) => {
          const isSelected = selectedOptionIndex === idx;
          return (
            <button
              key={idx}
              type="button"
              disabled={isLocked}
              onClick={() => onSelectOption(idx)}
              style={{
                height: '48px',
                background: isSelected ? 'rgba(0, 180, 216, 0.15)' : '#1e293b',
                border: `2px solid ${isSelected ? '#00b4d8' : '#2d3748'}`,
                borderRadius: '10px',
                fontFamily: 'var(--font-code)',
                fontWeight: 700,
                fontSize: '13px',
                color: isSelected ? '#38bdf8' : 'white',
                cursor: isLocked ? 'default' : 'pointer',
                boxShadow: isSelected ? '0 3px 0 #0077b6' : '0 3px 0 #0f172a'
              }}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
};
