import React from 'react';
import { FillBlankExercise } from '../../types/course';

interface FillBlankRendererProps {
  exercise: FillBlankExercise;
  selectedToken: string | null;
  onSelectToken: (token: string) => void;
  isLocked: boolean;
}

export const FillBlankRenderer: React.FC<FillBlankRendererProps> = ({
  exercise,
  selectedToken,
  onSelectToken,
  isLocked
}) => {
  // Reemplazar el blankToken ("___") por el slot visual
  const parts = exercise.codeTemplate.split(exercise.blankToken);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '16px' }}>
      {/* Vista previa de código con slot */}
      <div
        style={{
          background: '#080c14',
          border: '1px solid #1e293b',
          borderRadius: '12px',
          padding: '16px',
          fontFamily: 'var(--font-code)',
          fontSize: '14px',
          lineHeight: 1.6
        }}
      >
        <span style={{ color: '#e2e8f0' }}>{parts[0]}</span>
        <span
          style={{
            background: '#1e293b',
            border: '1px dashed #38bdf8',
            borderRadius: '4px',
            padding: '2px 8px',
            color: '#38bdf8',
            fontWeight: 700,
            display: 'inline-block',
            margin: '0 4px'
          }}
        >
          {selectedToken || '[ ? ]'}
        </span>
        <span style={{ color: '#e2e8f0' }}>{parts[1]}</span>
      </div>

      {/* Píldoras de tokens disponibles (teclas contextuales) */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
        {exercise.availableTokens.map((tok: string) => {
          const isSelected = selectedToken === tok;
          return (
            <button
              key={tok}
              type="button"
              disabled={isLocked}
              onClick={() => onSelectToken(tok)}
              style={{
                background: isSelected ? '#00b4d8' : '#1e293b',
                color: isSelected ? 'white' : '#e2e8f0',
                border: `1px solid ${isSelected ? '#0077b6' : '#2d3748'}`,
                borderRadius: '8px',
                padding: '8px 16px',
                fontFamily: 'var(--font-code)',
                fontWeight: 700,
                fontSize: '13px',
                cursor: isLocked ? 'default' : 'pointer',
                boxShadow: isSelected ? '0 3px 0 #0077b6' : '0 3px 0 #0f172a'
              }}
            >
              {tok}
            </button>
          );
        })}
      </div>
    </div>
  );
};
