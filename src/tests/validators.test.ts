import { describe, it, expect } from 'vitest';
import { validateExercise } from '../services/exerciseValidator';
import { MultipleChoiceExercise, FillBlankExercise, SpotBugExercise, ParsonsOrderExercise } from '../types/course';

describe('Exercise Engine Validators', () => {
  it('validates multiple_choice correctly', () => {
    const ex: MultipleChoiceExercise = {
      id: 'mc1',
      type: 'multiple_choice',
      prompt: '¿Función de salida?',
      explanation: 'print es la correcta',
      points: 10,
      options: [
        { id: '1', text: 'print()', isCorrect: true },
        { id: '2', text: 'echo', isCorrect: false }
      ]
    };

    expect(validateExercise(ex, '1').isValid).toBe(true);
    expect(validateExercise(ex, '2').isValid).toBe(false);
  });

  it('validates fill_blank with whitespace trimming and case insensitivity', () => {
    const ex: FillBlankExercise = {
      id: 'fb1',
      type: 'fill_blank',
      prompt: 'Completa',
      codeTemplate: '___("Hola")',
      blankToken: '___',
      acceptableAnswers: ['print'],
      availableTokens: ['print', 'scan'],
      explanation: 'print imprime',
      points: 15
    };

    expect(validateExercise(ex, 'print').isValid).toBe(true);
    expect(validateExercise(ex, ' PRINT ').isValid).toBe(true);
    expect(validateExercise(ex, 'scan').isValid).toBe(false);
  });

  it('validates spot_bug line selection', () => {
    const ex: SpotBugExercise = {
      id: 'sb1',
      type: 'spot_bug',
      prompt: 'Encuentra el error',
      codeLines: ['a = 1', '2b = 3', 'c = 4'],
      buggyLineIndex: 1,
      bugExplanation: 'Variable no puede empezar por número',
      explanation: 'Regla de identificadores',
      points: 15
    };

    expect(validateExercise(ex, 1).isValid).toBe(true);
    expect(validateExercise(ex, 0).isValid).toBe(false);
  });

  it('validates parsons_order exact sequence', () => {
    const ex: ParsonsOrderExercise = {
      id: 'po1',
      type: 'parsons_order',
      prompt: 'Ordena',
      shuffledBlocks: [
        { id: 'b2', code: 'print(x)' },
        { id: 'b1', code: 'x = 10' }
      ],
      correctOrder: ['b1', 'b2'],
      explanation: 'Primero define, luego imprime',
      points: 20
    };

    expect(validateExercise(ex, ['b1', 'b2']).isValid).toBe(true);
    expect(validateExercise(ex, ['b2', 'b1']).isValid).toBe(false);
  });
});
