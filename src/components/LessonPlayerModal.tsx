import React, { useState } from 'react';
import { Lesson } from '../types/course';
import { ExerciseUniversalHost } from './exercises/ExerciseUniversalHost';
import { validateExercise, ValidationResult } from '../services/exerciseValidator';

interface LessonPlayerModalProps {
  lesson: Lesson;
  onClose: () => void;
  onCompleteLesson: (earnedXp: number) => void;
}

export const LessonPlayerModal: React.FC<LessonPlayerModalProps> = ({
  lesson,
  onClose,
  onCompleteLesson
}) => {
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [userInput, setUserInput] = useState<any>(null);
  const [validationResult, setValidationResult] = useState<ValidationResult | null>(null);
  const [accumulatedXp, setAccumulatedXp] = useState(0);
  const [isIntroStage, setIsIntroStage] = useState(true);

  const currentExercise = lesson.exercises[currentExerciseIndex];
  const progressPercent = Math.round(((currentExerciseIndex) / lesson.exercises.length) * 100);

  const handleCheck = () => {
    if (userInput === null || userInput === undefined) return;
    const result = validateExercise(currentExercise, userInput);
    setValidationResult(result);

    if (result.isValid) {
      setAccumulatedXp((prev) => prev + result.score);
    }
  };

  const handleNext = () => {
    setValidationResult(null);
    setUserInput(null);

    if (currentExerciseIndex + 1 < lesson.exercises.length) {
      setCurrentExerciseIndex((prev) => prev + 1);
    } else {
      // Lección finalizada con éxito
      onCompleteLesson(accumulatedXp || lesson.xpReward);
      onClose();
    }
  };

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background: '#0e131f',
        zIndex: 100,
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {/* Cabecera de Lección */}
      <header
        style={{
          padding: '16px 20px',
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          borderBottom: '1px solid #2d3748'
        }}
      >
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

        <div style={{ flex: 1, height: '10px', background: '#1e293b', borderRadius: '100px', overflow: 'hidden' }}>
          <div
            style={{
              width: `${isIntroStage ? 10 : progressPercent}%`,
              height: '100%',
              background: 'linear-gradient(90deg, #00b4d8, #10b981)',
              transition: 'width 0.3s ease'
            }}
          />
        </div>
      </header>

      {/* Pantalla de Introducción Teórica Rápida (<30 seg) */}
      {isIntroStage ? (
        <div style={{ flex: 1, padding: '24px 20px', overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              display: 'inline-block',
              background: 'rgba(0, 180, 216, 0.15)',
              color: '#38bdf8',
              padding: '4px 10px',
              borderRadius: '6px',
              fontSize: '11px',
              fontWeight: 700,
              fontFamily: 'var(--font-code)',
              marginBottom: '14px',
              width: 'fit-content'
            }}
          >
            CONCEPTO CLAVE • {lesson.title}
          </div>

          <h2 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '12px', color: 'white' }}>
            {lesson.intro.headline}
          </h2>

          <p style={{ fontSize: '14px', color: '#cbd5e1', lineHeight: 1.6, marginBottom: '20px' }}>
            {lesson.intro.markdownContent}
          </p>

          {lesson.intro.codeSnippet && (
            <div
              style={{
                background: '#080c14',
                border: '1px solid #1e293b',
                borderRadius: '12px',
                padding: '16px',
                fontFamily: 'var(--font-code)',
                fontSize: '13px',
                color: '#38bdf8',
                whiteSpace: 'pre-wrap',
                marginBottom: '24px'
              }}
            >
              {lesson.intro.codeSnippet}
            </div>
          )}

          <div style={{ marginTop: 'auto' }}>
            <button
              type="button"
              onClick={() => setIsIntroStage(false)}
              style={{
                width: '100%',
                height: '52px',
                background: '#00b4d8',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                fontSize: '16px',
                fontWeight: 800,
                cursor: 'pointer',
                boxShadow: '0 4px 0 #0077b6'
              }}
            >
              Comenzar Ejercicios →
            </button>
          </div>
        </div>
      ) : (
        /* Pantalla de Ejercicios Interactivos */
        <div style={{ flex: 1, padding: '24px 20px', overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              display: 'inline-block',
              background: 'rgba(0, 180, 216, 0.15)',
              color: '#38bdf8',
              padding: '4px 10px',
              borderRadius: '6px',
              fontSize: '11px',
              fontWeight: 700,
              fontFamily: 'var(--font-code)',
              marginBottom: '14px',
              width: 'fit-content'
            }}
          >
            EJERCICIO {currentExerciseIndex + 1} DE {lesson.exercises.length} • {currentExercise.type.toUpperCase()}
          </div>

          <ExerciseUniversalHost
            exercise={currentExercise}
            userInput={userInput}
            onInputChange={setUserInput}
            isLocked={Boolean(validationResult)}
          />

          {/* Botón Comprobar */}
          <div style={{ marginTop: 'auto', paddingTop: '20px' }}>
            <button
              type="button"
              disabled={userInput === null || userInput === undefined || Boolean(validationResult)}
              onClick={handleCheck}
              style={{
                width: '100%',
                height: '52px',
                background: userInput !== null && !validationResult ? '#00b4d8' : '#334155',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                fontSize: '16px',
                fontWeight: 800,
                cursor: userInput !== null && !validationResult ? 'pointer' : 'not-allowed',
                boxShadow: userInput !== null && !validationResult ? '0 4px 0 #0077b6' : 'none'
              }}
            >
              Comprobar
            </button>
          </div>
        </div>
      )}

      {/* Panel Deslizable Inferior de Feedback Constructivo */}
      {validationResult && (
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            padding: '24px 20px 20px',
            borderTopLeftRadius: '24px',
            borderTopRightRadius: '24px',
            background: validationResult.isValid ? '#064e3b' : '#7f1d1d',
            borderTop: `3px solid ${validationResult.isValid ? '#10b981' : '#ef4444'}`,
            zIndex: 150,
            boxShadow: '0 -10px 25px rgba(0,0,0,0.5)'
          }}
        >
          <div style={{ fontSize: '18px', fontWeight: 800, color: 'white', marginBottom: '6px' }}>
            {validationResult.isValid ? '🎉 ¡Respuesta Correcta!' : '💡 Pista Pedagógica'}
          </div>
          <p style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.95)', lineHeight: 1.5, marginBottom: '16px' }}>
            {validationResult.userFacingExplanation}
          </p>
          <button
            type="button"
            onClick={handleNext}
            style={{
              width: '100%',
              height: '48px',
              background: 'white',
              color: '#0f172a',
              border: 'none',
              borderRadius: '10px',
              fontSize: '15px',
              fontWeight: 800,
              cursor: 'pointer'
            }}
          >
            {currentExerciseIndex + 1 < lesson.exercises.length ? 'Continuar →' : 'Completar Lección 🏆'}
          </button>
        </div>
      )}
    </div>
  );
};
