import React from 'react';
import { Exercise } from '../../types/course';
import { MultipleChoiceRenderer } from './MultipleChoiceRenderer';
import { TrueFalseRenderer } from './TrueFalseRenderer';
import { FillBlankRenderer } from './FillBlankRenderer';
import { ParsonsOrderRenderer } from './ParsonsOrderRenderer';
import { SpotBugRenderer } from './SpotBugRenderer';
import { PredictOutputRenderer } from './PredictOutputRenderer';

interface ExerciseUniversalHostProps {
  exercise: Exercise;
  userInput: any;
  onInputChange: (val: any) => void;
  isLocked: boolean;
}

export const ExerciseUniversalHost: React.FC<ExerciseUniversalHostProps> = ({
  exercise,
  userInput,
  onInputChange,
  isLocked
}) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {/* Enunciado del Ejercicio */}
      <div style={{ fontSize: '18px', fontWeight: 700, lineHeight: 1.4, color: 'white' }}>
        {exercise.prompt}
      </div>

      {/* Renderizado Polimórfico según el Tipo Declarado */}
      {(() => {
        switch (exercise.type) {
          case 'multiple_choice':
            return (
              <MultipleChoiceRenderer
                exercise={exercise}
                selectedOptionId={userInput || null}
                onSelectOption={onInputChange}
                isLocked={isLocked}
              />
            );

          case 'true_false':
            return (
              <TrueFalseRenderer
                exercise={exercise}
                selectedValue={userInput !== undefined && userInput !== null ? Boolean(userInput) : null}
                onSelectValue={onInputChange}
                isLocked={isLocked}
              />
            );

          case 'fill_blank':
            return (
              <FillBlankRenderer
                exercise={exercise}
                selectedToken={userInput || null}
                onSelectToken={onInputChange}
                isLocked={isLocked}
              />
            );

          case 'parsons_order':
            return (
              <ParsonsOrderRenderer
                exercise={exercise}
                currentOrder={Array.isArray(userInput) ? userInput : []}
                onChangeOrder={onInputChange}
                isLocked={isLocked}
              />
            );

          case 'spot_bug':
            return (
              <SpotBugRenderer
                exercise={exercise}
                selectedLineIndex={typeof userInput === 'number' ? userInput : null}
                onSelectLine={onInputChange}
                isLocked={isLocked}
              />
            );

          case 'predict_output':
            return (
              <PredictOutputRenderer
                exercise={exercise}
                selectedOptionIndex={typeof userInput === 'number' ? userInput : null}
                onSelectOption={onInputChange}
                isLocked={isLocked}
              />
            );

          default:
            return (
              <div style={{ padding: '20px', color: '#94a3b8', fontStyle: 'italic' }}>
                Formato de reto en ejecución...
              </div>
            );
        }
      })()}
    </div>
  );
};
