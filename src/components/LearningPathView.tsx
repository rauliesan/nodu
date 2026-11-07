import React from 'react';
import { CourseUnit, CourseMetadata, UnitCheckpoint } from '../types/course';

interface LearningPathViewProps {
  course: CourseMetadata;
  completedLessonIds: string[];
  activeLessonId: string;
  onOpenLesson: (lessonId: string) => void;
  onOpenCheckpoint: (checkpoint: UnitCheckpoint, unitTitle: string) => void;
}

export const LearningPathView: React.FC<LearningPathViewProps> = ({
  course,
  completedLessonIds,
  activeLessonId,
  onOpenLesson,
  onOpenCheckpoint
}) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {course.units.map((unit: CourseUnit, unitIdx: number) => {
        // La evaluación se habilita si se han completado todas las lecciones de la unidad
        const allLessonsCompleted = unit.lessons.every((l) => completedLessonIds.includes(l.id));

        return (
          <div key={unit.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {/* Banner de Unidad Temática */}
            <div
              style={{
                width: '100%',
                background: `linear-gradient(135deg, ${unit.colorAccent}22 0%, #0f1d32 100%)`,
                border: `1px solid ${unit.colorAccent}55`,
                borderRadius: '20px',
                padding: '18px 20px',
                marginBottom: '28px',
                boxShadow: '0 4px 0 #0f172a'
              }}
            >
              <div
                style={{
                  fontSize: '11px',
                  color: unit.colorAccent,
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  letterSpacing: '1px'
                }}
              >
                UNIDAD {unitIdx + 1} • {course.language.toUpperCase()}
              </div>
              <div style={{ fontSize: '17px', fontWeight: 800, color: 'white', margin: '4px 0 6px' }}>
                {unit.title}
              </div>
              <div style={{ fontSize: '12px', color: '#94a3b8', lineHeight: 1.4 }}>
                {unit.description}
              </div>
            </div>

            {/* Camino Vertical de Nodos de la Unidad */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '28px', width: '100%' }}>
              {unit.lessons.map((lesson) => {
                const isCompleted = completedLessonIds.includes(lesson.id);
                const isActive = lesson.id === activeLessonId || (!isCompleted && completedLessonIds.length === 0);
                const isLocked = !isCompleted && !isActive;

                return (
                  <div
                    key={lesson.id}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      position: 'relative'
                    }}
                  >
                    {isActive && (
                      <div
                        style={{
                          background: '#0284c7',
                          color: 'white',
                          padding: '6px 14px',
                          borderRadius: '100px',
                          fontSize: '11px',
                          fontWeight: 800,
                          marginBottom: '8px',
                          boxShadow: '0 4px 12px rgba(2, 132, 199, 0.4)',
                          letterSpacing: '0.5px'
                        }}
                      >
                        ¡EN CURSO!
                      </div>
                    )}

                    <button
                      type="button"
                      disabled={isLocked}
                      onClick={() => onOpenLesson(lesson.id)}
                      style={{
                        width: '74px',
                        height: '74px',
                        borderRadius: '50%',
                        border: 'none',
                        background: isCompleted ? '#10b981' : isActive ? '#00b4d8' : '#1e293b',
                        color: isLocked ? '#64748b' : 'white',
                        boxShadow: isCompleted
                          ? '0 6px 0 #059669'
                          : isActive
                          ? '0 6px 0 #0077b6'
                          : '0 5px 0 #0f172a',
                        cursor: isLocked ? 'not-allowed' : 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'relative',
                        transition: 'transform 0.15s ease'
                      }}
                    >
                      {isCompleted && (
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      )}
                      {isActive && (
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                          <polygon points="5 3 19 12 5 21 5 3"></polygon>
                        </svg>
                      )}
                      {isLocked && (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                          <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                        </svg>
                      )}
                    </button>

                    <span style={{ fontSize: '13px', fontWeight: 700, marginTop: '8px', textAlign: 'center' }}>
                      {lesson.title}
                    </span>
                    <span
                      style={{
                        fontSize: '11px',
                        color: isCompleted ? '#10b981' : isActive ? '#38bdf8' : '#64748b',
                        fontFamily: 'var(--font-code)'
                      }}
                    >
                      {isCompleted ? '✓ Completado' : isActive ? `+${lesson.xpReward} XP` : 'Bloqueado'}
                    </span>
                  </div>
                );
              })}

              {/* Hito de Checkpoint de la Unidad */}
              {unit.checkpoint && (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <button
                    type="button"
                    disabled={!allLessonsCompleted}
                    onClick={() => onOpenCheckpoint(unit.checkpoint, unit.title)}
                    style={{
                      width: '68px',
                      height: '68px',
                      borderRadius: '18px',
                      background: allLessonsCompleted ? '#fb8500' : '#1e293b',
                      color: allLessonsCompleted ? 'white' : '#64748b',
                      border: `2px solid ${allLessonsCompleted ? '#b25e00' : '#2d3748'}`,
                      boxShadow: allLessonsCompleted ? '0 5px 0 #7c3f00' : '0 5px 0 #0f172a',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: allLessonsCompleted ? 'pointer' : 'not-allowed',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                    </svg>
                  </button>
                  <span style={{ fontSize: '13px', fontWeight: 700, marginTop: '8px', color: allLessonsCompleted ? '#fb8500' : 'white' }}>
                    {unit.checkpoint.title}
                  </span>
                  <span style={{ fontSize: '11px', color: '#64748b' }}>
                    {allLessonsCompleted ? '¡Disponible para evaluar!' : 'Completa las lecciones previas'}
                  </span>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
