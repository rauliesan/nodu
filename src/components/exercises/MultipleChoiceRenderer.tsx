import React from 'react';
import { MultipleChoiceExercise } from '../../types/course';

interface MultipleChoiceRendererProps {
  exercise: MultipleChoiceExercise;
  selectedOptionId: string | null;
  onSelectOption: (id: string) => void;
  isLocked: boolean;
}

export const MultipleChoiceRenderer: React.FC<MultipleChoiceRendererProps> = ({
  exercise,
  selectedOptionId,
  onSelectOption,
  isLocked
}) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '16px' }}>
      {exercise.options.map((option: { id: string; text: string; isCorrect: boolean }, idx: number) => {
        const isSelected = selectedOptionId === option.id;
        return (
          <button
            key={option.id}
            type="button"
            disabled={isLocked}
            onClick={() => onSelectOption(option.id)}
            style={{
              background: isSelected ? 'rgba(0, 180, 216, 0.12)' : '#1e293b',
              border: `2px solid ${isSelected ? '#00b4d8' : '#2d3748'}`,
              borderRadius: '12px',
              padding: '14px 16px',
              fontSize: '15px',
              fontWeight: 600,
              color: isSelected ? '#38bdf8' : 'white',
              cursor: isLocked ? 'default' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              textAlign: 'left',
              boxShadow: isSelected ? '0 3px 0 #0077b6' : '0 3px 0 #0f172a',
              transition: 'all 0.15s ease'
            }}
          >
            <span
              style={{
                width: '24px',
                height: '24px',
                background: '#0e131f',
                border: '1px solid #2d3748',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '11px',
                fontFamily: 'var(--font-code)',
                color: isSelected ? '#38bdf8' : '#94a3b8'
              }}
            >
              {idx + 1}
            </span>
            <span style={{ flex: 1 }}>{option.text}</span>
          </button>
        );
      })}
    </div>
  );
};
