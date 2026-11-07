import { Exercise } from '../types/course';

export interface ValidationResult {
  isValid: boolean;
  score: number;
  feedback: string;
  userFacingExplanation: string;
}

/**
 * Validador Universal de Ejercicios de Nodu
 * Maneja los 8 tipos de ejercicios de forma pura y determinista.
 */
export function validateExercise(exercise: Exercise, userInput: any): ValidationResult {
  switch (exercise.type) {
    case 'multiple_choice': {
      const selectedOptionId = String(userInput);
      const option = exercise.options.find((o) => o.id === selectedOptionId);
      const isValid = Boolean(option && option.isCorrect);
      return {
        isValid,
        score: isValid ? exercise.points : 0,
        feedback: isValid ? '¡Excelente deducción!' : 'Esa no es la opción correcta.',
        userFacingExplanation: exercise.explanation
      };
    }

    case 'true_false': {
      const boolInput = Boolean(userInput);
      const isValid = boolInput === exercise.correctValue;
      return {
        isValid,
        score: isValid ? exercise.points : 0,
        feedback: isValid ? '¡Correcto!' : 'Respuesta errónea.',
        userFacingExplanation: exercise.explanation
      };
    }

    case 'fill_blank': {
      const token = String(userInput || '').trim();
      const isValid = exercise.acceptableAnswers.some(
        (ans) => ans.trim().toLowerCase() === token.toLowerCase()
      );
      return {
        isValid,
        score: isValid ? exercise.points : 0,
        feedback: isValid ? '¡Hueco rellenado con precisión!' : 'El token introducido no es el esperado.',
        userFacingExplanation: exercise.explanation
      };
    }

    case 'parsons_order': {
      const userOrder = Array.isArray(userInput) ? userInput : [];
      const isValid =
        userOrder.length === exercise.correctOrder.length &&
        userOrder.every((id, idx) => id === exercise.correctOrder[idx]);
      return {
        isValid,
        score: isValid ? exercise.points : 0,
        feedback: isValid ? '¡Líneas ordenadas a la perfección!' : 'El orden del flujo de código no es el adecuado.',
        userFacingExplanation: exercise.explanation
      };
    }

    case 'spot_bug': {
      const lineIndex = Number(userInput);
      const isValid = lineIndex === exercise.buggyLineIndex;
      return {
        isValid,
        score: isValid ? exercise.points : 0,
        feedback: isValid ? '¡Bug identificado!' : 'Esa línea es sintácticamente válida.',
        userFacingExplanation: isValid ? exercise.bugExplanation : exercise.explanation
      };
    }

    case 'predict_output': {
      const optionIdx = Number(userInput);
      const isValid = optionIdx === exercise.correctOptionIndex;
      return {
        isValid,
        score: isValid ? exercise.points : 0,
        feedback: isValid ? '¡Salida predicha correctamente!' : 'La salida de consola no coincide.',
        userFacingExplanation: exercise.explanation
      };
    }

    case 'match_pairs': {
      const userPairs = typeof userInput === 'object' && userInput !== null ? userInput : {};
      const allCorrect = exercise.pairs.every((pair) => userPairs[pair.left] === pair.right);
      return {
        isValid: allCorrect,
        score: allCorrect ? exercise.points : 0,
        feedback: allCorrect ? '¡Todos los conceptos emparejados!' : 'Algunos pares no corresponden.',
        userFacingExplanation: exercise.explanation
      };
    }

    case 'code_runner': {
      // Normalización de salida de consola
      const output = String(userInput || '').trim();
      const expected = exercise.expectedOutput.trim();
      const isValid = output === expected;
      return {
        isValid,
        score: isValid ? exercise.points : 0,
        feedback: isValid ? '¡Todos los tests han pasado!' : `Salida esperada "${expected}", obtenida "${output}".`,
        userFacingExplanation: exercise.explanation
      };
    }

    default:
      return {
        isValid: false,
        score: 0,
        feedback: 'Tipo de ejercicio no reconocido.',
        userFacingExplanation: ''
      };
  }
}
