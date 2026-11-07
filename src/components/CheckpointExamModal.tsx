import React, { useState } from 'react';
import { UnitCheckpoint } from '../types/course';
import { ExerciseUniversalHost } from './exercises/ExerciseUniversalHost';
import { validateExercise } from '../services/exerciseValidator';

interface CheckpointExamModalProps {
  checkpoint: UnitCheckpoint;
  unitTitle: string;
  onClose: () => void;
  onPassCheckpoint: (earnedXp: number, scorePercent: number) => void;
}

export const CheckpointExamModal: React.FC<CheckpointExamModalProps> = ({
  checkpoint,
  unitTitle,
  onClose,
  onPassCheckpoint
}) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [userInput, setUserInput] = useState<any>(null);
  const [userAnswers, setUserAnswers] = useState<{ exerciseId: string; isValid: boolean }[]>([]);
  const [examFinished, setExamFinished] = useState(false);

  const currentExercise = checkpoint.exercises[currentIdx];
  const progressPercent = Math.round((currentIdx / checkpoint.exercises.length) * 100);

  const handleNextQuestion = () => {
    if (userInput === null || userInput === undefined) return;
    const result = validateExercise(currentExercise, userInput);
    
    const updatedAnswers = [...userAnswers, { exerciseId: currentExercise.id, isValid: result.isValid }];
    setUserAnswers(updatedAnswers);
    setUserInput(null);

    if (currentIdx + 1 < checkpoint.exercises.length) {
      setCurrentIdx((prev) => prev + 1);
    } else {
      setExamFinished(true);
    }
  };

  const correctCount = userAnswers.filter((a) => a.isValid).length;
  const scorePercent = Math.round((correctCount / (checkpoint.exercises.length || 1)) * 100);
  const passed = scorePercent >= checkpoint.minimumPassPercentage;

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background: '#0e131f',
        zIndex: 110,
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
          gap: '16px',
          borderBottom: '1px solid #2d3748'
        }}
      >
        <button
          type="button"
          onClick={onClose}
          style={{ background: 'none', border: 'none', color: '#94a3b8', fontSize: '20px', cursor: 'pointer', fontWeight: 800 }}
        >
          ✕
        </button>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: '11px', color: '#fb8500', fontWeight: 800, fontFamily: 'var(--font-code)' }}>
            EVALUACIÓN DE HITO • {unitTitle.toUpperCase()}
          </div>
          <div style={{ height: '8px', background: '#1e293b', borderRadius: '100px', overflow: 'hidden', marginTop: '6px' }}>
            <div
              style={{
                width: `${examFinished ? 100 : progressPercent}%`,
                height: '100%',
                background: '#fb8500',
                transition: 'width 0.3s ease'
              }}
            />
          </div>
        </div>
      </header>

      {/* Cuerpo del Examen */}
      {!examFinished ? (
        <div style={{ flex: 1, padding: '24px 20px', overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              display: 'inline-block',
              background: 'rgba(251, 133, 0, 0.15)',
              color: '#fb8500',
              padding: '4px 10px',
              borderRadius: '6px',
              fontSize: '11px',
              fontWeight: 700,
              fontFamily: 'var(--font-code)',
              marginBottom: '14px',
              width: 'fit-content'
            }}
          >
            PREGUNTA {currentIdx + 1} DE {checkpoint.exercises.length} • SIN PISTAS
          </div>

          <ExerciseUniversalHost
            exercise={currentExercise}
            userInput={userInput}
            onInputChange={setUserInput}
            isLocked={false}
          />

          <div style={{ marginTop: 'auto', paddingTop: '20px' }}>
            <button
              type="button"
              disabled={userInput === null || userInput === undefined}
              onClick={handleNextQuestion}
              style={{
                width: '100%',
                height: '52px',
                background: userInput !== null && userInput !== undefined ? '#fb8500' : '#334155',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                fontSize: '16px',
                fontWeight: 800,
                cursor: userInput !== null && userInput !== undefined ? 'pointer' : 'not-allowed',
                boxShadow: userInput !== null && userInput !== undefined ? '0 4px 0 #b25e00' : 'none'
              }}
            >
              {currentIdx + 1 < checkpoint.exercises.length ? 'Siguiente Pregunta →' : 'Finalizar Evaluación'}
            </button>
          </div>
        </div>
      ) : (
        /* Pantalla de Resultados del Checkpoint */
        <div
          style={{
            flex: 1,
            padding: '32px 20px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center'
          }}
        >
          <div
            style={{
              width: '84px',
              height: '84px',
              borderRadius: '50%',
              background: passed ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)',
              border: `3px solid ${passed ? '#10b981' : '#ef4444'}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '36px',
              marginBottom: '20px'
            }}
          >
            {passed ? '🏆' : '📚'}
          </div>

          <h2 style={{ fontSize: '22px', fontWeight: 800, marginBottom: '8px', color: 'white' }}>
            {passed ? '¡Evaluación Superada!' : 'Necesitas Practicar un Poco Más'}
          </h2>

          <p style={{ fontSize: '14px', color: '#94a3b8', maxWidth: '300px', lineHeight: 1.5, marginBottom: '24px' }}>
            {passed
              ? `Has obtenido un ${scorePercent}% de aciertos (mínimo requerido: ${checkpoint.minimumPassPercentage}%). La siguiente unidad ha quedado desbloqueada.`
              : `Has obtenido un ${scorePercent}% de aciertos. Revisa las lecciones de la unidad y vuelve a intentarlo cuando estés listo.`}
          </p>

          <div
            style={{
              background: '#1e293b',
              border: '1px solid #2d3748',
              borderRadius: '16px',
              padding: '16px 24px',
              marginBottom: '32px',
              display: 'flex',
              gap: '24px'
            }}
          >
            <div>
              <div style={{ fontSize: '11px', color: '#94a3b8', textTransform: 'uppercase' }}>Aciertos</div>
              <div style={{ fontSize: '20px', fontWeight: 800, color: 'white' }}>
                {correctCount} / {checkpoint.exercises.length}
              </div>
            </div>
            <div style={{ width: '1px', background: '#2d3748' }} />
            <div>
              <div style={{ fontSize: '11px', color: '#94a3b8', textTransform: 'uppercase' }}>Recompensa</div>
              <div style={{ fontSize: '20px', fontWeight: 800, color: '#ffb703' }}>
                {passed ? '+35 XP' : '0 XP'}
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              if (passed) onPassCheckpoint(35, scorePercent);
              onClose();
            }}
            style={{
              width: '100%',
              maxWidth: '320px',
              height: '52px',
              background: passed ? '#10b981' : '#334155',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              fontSize: '16px',
              fontWeight: 800,
              cursor: 'pointer',
              boxShadow: passed ? '0 4px 0 #059669' : 'none'
            }}
          >
            {passed ? 'Continuar y Desbloquear Unidad →' : 'Volver a la Unidad'}
          </button>
        </div>
      )}
    </div>
  );
};
