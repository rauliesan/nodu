import React from 'react';
import { SpotBugExercise } from '../../types/course';

interface SpotBugRendererProps {
  exercise: SpotBugExercise;
  selectedLineIndex: number | null;
  onSelectLine: (index: number) => void;
  isLocked: boolean;
}

export const SpotBugRenderer: React.FC<SpotBugRendererProps> = ({
  exercise,
  selectedLineIndex,
  onSelectLine,
  isLocked
}) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '16px' }}>
      <div
        style={{
          background: '#080c14',
          border: '1px solid #1e293b',
          borderRadius: '12px',
          padding: '12px',
          display: 'flex',
          flexDirection: 'column',
          gap: '6px'
        }}
      >
        {exercise.codeLines.map((line: string, idx: number) => {
          const isSelected = selectedLineIndex === idx;
          return (
            <div
              key={idx}
              onClick={() => !isLocked && onSelectLine(idx)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '8px 12px',
                borderRadius: '6px',
                fontFamily: 'var(--font-code)',
                fontSize: '13px',
                background: isSelected ? 'rgba(239, 68, 68, 0.2)' : 'transparent',
                border: isSelected ? '1px solid #ef4444' : '1px solid transparent',
                cursor: isLocked ? 'default' : 'pointer'
              }}
            >
              <span style={{ color: '#475569', fontSize: '11px', width: '16px' }}>{idx + 1}</span>
              <span style={{ color: isSelected ? '#f87171' : '#e2e8f0' }}>{line}</span>
              {isSelected && <span style={{ marginLeft: 'auto', fontSize: '12px' }}>🐛</span>}
            </div>
          );
        })}
      </div>
    </div>
  );
};
