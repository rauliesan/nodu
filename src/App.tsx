import React, { useEffect, useState } from 'react';
import { useAppStore } from './store/appStore';
import { initializeLocalUser } from './services/db';
import { generateCertificatePDF } from './services/certificate';
import { LearningPathView } from './components/LearningPathView';
import { LessonPlayerModal } from './components/LessonPlayerModal';
import { CheckpointExamModal } from './components/CheckpointExamModal';
import { ProfileGamificationView } from './components/ProfileGamificationView';
import { Lesson, UnitCheckpoint } from './types/course';

export const App: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    activeCourseId,
    setActiveCourseId,
    courses,
    profile,
    progress,
    loadInitialData,
    completeLesson,
    exportBackupJSON
  } = useAppStore();

  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [activeCheckpoint, setActiveCheckpoint] = useState<{ checkpoint: UnitCheckpoint; unitTitle: string } | null>(null);

  useEffect(() => {
    initializeLocalUser().then(() => {
      loadInitialData();
    });
  }, []);

  const course = courses[activeCourseId] || courses['nodu-course-python-101'];

  const handleOpenLesson = (lessonId: string) => {
    for (const unit of course.units) {
      const found = unit.lessons.find((l) => l.id === lessonId);
      if (found) {
        setActiveLesson(found);
        return;
      }
    }
  };

  const handleFinishLesson = (earnedXp: number) => {
    if (activeLesson) {
      completeLesson(activeLesson.id, earnedXp);
    }
  };

  const handlePassCheckpoint = (earnedXp: number) => {
    if (activeCheckpoint) {
      completeLesson(`checkpoint-${activeCheckpoint.checkpoint.id}`, earnedXp);
    }
  };

  const handleDownloadDemoCert = () => {
    generateCertificatePDF({
      id: 'NODU-PY-7F3B-C410',
      courseId: activeCourseId,
      courseTitle: course.title,
      recipientName: profile?.name || 'Alex Dev',
      issueDate: '07 Noviembre, 2026',
      finalScore: 98,
      verificationHash: '8a93e3902f1b4c8d91a27e456bcf2189a01e389d71c42f31a298bf0912e8412'
    });
  };

  return (
    <div className="app-frame">
      {/* 1. Header Global con Iconos SVG Vectoriales */}
      <header style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '16px 20px 12px',
        backgroundColor: '#171e2e',
        borderBottom: '1px solid #2d3748',
        zIndex: 10
      }}>
        <div
          onClick={() => setActiveTab('explore')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: '#1e293b',
            padding: '6px 12px',
            borderRadius: '100px',
            border: '1px solid #2d3748',
            fontSize: '13px',
            fontWeight: 700,
            cursor: 'pointer'
          }}
        >
          <span>⚡</span>
          <span>{course.title.split(' ')[0]}</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {/* Llama de Racha */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '13px',
            fontWeight: 700,
            fontFamily: 'var(--font-code)',
            color: '#fb8500',
            background: 'rgba(30, 41, 59, 0.6)',
            padding: '4px 8px',
            borderRadius: '8px',
            border: '1px solid #2d3748'
          }}>
            <svg style={{ width: '16px', height: '16px' }} viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2c-.3 2.1-1.8 3.8-3.3 5.4C7.1 9 5.5 11 5.5 13.5c0 3.6 2.9 6.5 6.5 6.5s6.5-2.9 6.5-6.5c0-3.3-2.5-6.1-4.2-8.5C13.2 3.6 12.4 2.8 12 2zm.2 16.5c-2.3 0-4.2-1.8-4.2-4.1 0-1.4 1-2.7 2-3.8.8-.9 1.7-1.9 2-3 1.1 1.4 2.4 3 2.4 4.8 0 3.4-1 6.1-2.2 6.1z"/>
            </svg>
            <span>{profile?.streakDays || 5}</span>
          </div>

          {/* Rayo de XP */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '13px',
            fontWeight: 700,
            fontFamily: 'var(--font-code)',
            color: '#ffb703',
            background: 'rgba(30, 41, 59, 0.6)',
            padding: '4px 8px',
            borderRadius: '8px',
            border: '1px solid #2d3748'
          }}>
            <svg style={{ width: '16px', height: '16px' }} viewBox="0 0 24 24" fill="currentColor">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
            </svg>
            <span>{profile?.totalXp || 140} XP</span>
          </div>

          {/* Diamante de Gemas */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '13px',
            fontWeight: 700,
            fontFamily: 'var(--font-code)',
            color: '#e63946',
            background: 'rgba(30, 41, 59, 0.6)',
            padding: '4px 8px',
            borderRadius: '8px',
            border: '1px solid #2d3748'
          }}>
            <svg style={{ width: '16px', height: '16px' }} viewBox="0 0 24 24" fill="currentColor">
              <path d="M6 3h12l5 7-11 11L1 10l5-7zm1.6 2l-3.3 4.6h3.6L9.6 5H7.6zm3.9 0l-1.5 4.6h4l-1.5-4.6H11.5zm3.9 0l1.7 4.6h3.6L16.4 5h-1zm3.6 6.6H5l7 7 7-7z"/>
            </svg>
            <span>{profile?.gems || 28}</span>
          </div>
        </div>
      </header>

      {/* 2. Cuerpo Principal de Vistas según Tab Activo */}
      <main style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
        
        {/* PESTAÑA: APRENDER (Ruta de Nodos Dinámica e Interactiva) */}
        {activeTab === 'learn' && (
          <LearningPathView
            course={course}
            completedLessonIds={progress?.completedLessons || []}
            activeLessonId={progress?.activeLessonId || 'py-u1-l1'}
            onOpenLesson={handleOpenLesson}
            onOpenCheckpoint={(checkpoint, unitTitle) => setActiveCheckpoint({ checkpoint, unitTitle })}
          />
        )}

        {/* PESTAÑA: EXPLORAR (Cursos Disponibles) */}
        {activeTab === 'explore' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 800 }}>Catálogo de Tecnologías</h2>
            {Object.values(courses).map((c) => (
              <div
                key={c.id}
                onClick={() => {
                  setActiveCourseId(c.id);
                  setActiveTab('learn');
                }}
                style={{
                  background: '#1e293b',
                  border: `2px solid ${activeCourseId === c.id ? '#00b4d8' : '#2d3748'}`,
                  borderRadius: '16px',
                  padding: '16px',
                  cursor: 'pointer'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ fontSize: '16px', fontWeight: 800, color: 'white' }}>{c.title}</div>
                  <span style={{
                    fontSize: '11px',
                    background: '#0f172a',
                    padding: '3px 8px',
                    borderRadius: '6px',
                    color: '#38bdf8'
                  }}>
                    {c.difficulty}
                  </span>
                </div>
                <p style={{ fontSize: '13px', color: '#94a3b8', margin: '8px 0 12px' }}>{c.shortDescription}</p>
                <button style={{
                  background: activeCourseId === c.id ? '#00b4d8' : '#334155',
                  color: 'white',
                  border: 'none',
                  padding: '8px 14px',
                  borderRadius: '8px',
                  fontWeight: 700,
                  fontSize: '12px'
                }}>
                  {activeCourseId === c.id ? 'Curso Activo' : 'Comenzar →'}
                </button>
              </div>
            ))}
          </div>
        )}

        {/* PESTAÑA: RETOS (Desafíos y Rachas) */}
        {activeTab === 'challenges' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 800 }}>Desafíos Diarios</h2>
            <div style={{ background: '#1e293b', border: '1px solid #2d3748', borderRadius: '16px', padding: '16px' }}>
              <div style={{ fontSize: '15px', fontWeight: 700 }}>🔥 Mantén tu Racha Activa</div>
              <p style={{ fontSize: '12px', color: '#94a3b8', margin: '4px 0 10px' }}>
                Completa 1 lección hoy para alcanzar los 6 días consecutivos.
              </p>
              <div style={{ height: '8px', background: '#0f172a', borderRadius: '100px', overflow: 'hidden' }}>
                <div style={{ width: '80%', height: '100%', background: '#fb8500' }}></div>
              </div>
            </div>

            <div style={{ background: '#1e293b', border: '1px solid #2d3748', borderRadius: '16px', padding: '16px' }}>
              <div style={{ fontSize: '15px', fontWeight: 700 }}>⚡ Objetivo de XP Diario</div>
              <p style={{ fontSize: '12px', color: '#94a3b8', margin: '4px 0 10px' }}>
                Acumula 50 XP resolviendo lecciones. Progreso: {profile?.totalXp || 0} / 50 XP.
              </p>
              <div style={{ height: '8px', background: '#0f172a', borderRadius: '100px', overflow: 'hidden' }}>
                <div style={{ width: `${Math.min(100, ((profile?.totalXp || 0) / 50) * 100)}%`, height: '100%', background: '#ffb703' }}></div>
              </div>
            </div>
          </div>
        )}

        {/* PESTAÑA: PERFIL & GAMIFICACIÓN EXTENDIDA */}
        {activeTab === 'profile' && (
          <ProfileGamificationView
            profile={profile}
            completedLessonsCount={progress?.completedLessons?.length || 0}
            activeCoursesCount={Object.keys(courses).length}
            onDownloadCert={handleDownloadDemoCert}
            onExportBackup={exportBackupJSON}
          />
        )}

      </main>

      {/* 3. Barra Inferior Global con Iconos de Identidad */}
      <nav style={{
        height: '68px',
        backgroundColor: '#171e2e',
        borderTop: '1px solid #2d3748',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: '0 10px',
        zIndex: 10
      }}>
        {/* Aprender */}
        <button
          onClick={() => setActiveTab('learn')}
          style={{
            background: 'none',
            border: 'none',
            color: activeTab === 'learn' ? '#00b4d8' : '#94a3b8',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '4px',
            cursor: 'pointer',
            fontSize: '11px',
            fontWeight: 700
          }}
        >
          <svg style={{ width: '22px', height: '22px' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="6" cy="18" r="3"></circle>
            <circle cx="18" cy="6" r="3"></circle>
            <circle cx="18" cy="18" r="3"></circle>
            <path d="M6 15V9a3 3 0 0 1 3-3h6"></path>
            <path d="M9 18h6"></path>
          </svg>
          <span>Aprender</span>
        </button>

        {/* Explorar */}
        <button
          onClick={() => setActiveTab('explore')}
          style={{
            background: 'none',
            border: 'none',
            color: activeTab === 'explore' ? '#00b4d8' : '#94a3b8',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '4px',
            cursor: 'pointer',
            fontSize: '11px',
            fontWeight: 700
          }}
        >
          <svg style={{ width: '22px', height: '22px' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="18" height="18" x="3" y="3" rx="4"></rect>
            <path d="m8 10 3 2-3 2"></path>
            <path d="M13 15h3"></path>
          </svg>
          <span>Explorar</span>
        </button>

        {/* Retos */}
        <button
          onClick={() => setActiveTab('challenges')}
          style={{
            background: 'none',
            border: 'none',
            color: activeTab === 'challenges' ? '#00b4d8' : '#94a3b8',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '4px',
            cursor: 'pointer',
            fontSize: '11px',
            fontWeight: 700
          }}
        >
          <svg style={{ width: '22px', height: '22px' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
            <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
            <path d="M4 22h16"></path>
            <path d="M10 14.66V17c0 .55-.45 1-1 1H8v4h8v-4h-1c-.55 0-1-.45-1-1v-2.34"></path>
            <path d="M6 4h12v6a6 6 0 0 1-12 0V4Z"></path>
          </svg>
          <span>Retos</span>
        </button>

        {/* Perfil */}
        <button
          onClick={() => setActiveTab('profile')}
          style={{
            background: 'none',
            border: 'none',
            color: activeTab === 'profile' ? '#00b4d8' : '#94a3b8',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '4px',
            cursor: 'pointer',
            fontSize: '11px',
            fontWeight: 700
          }}
        >
          <svg style={{ width: '22px', height: '22px' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="16" height="13" x="4" y="3" rx="3"></rect>
            <circle cx="9" cy="9.5" r="1.5" fill="currentColor"></circle>
            <circle cx="15" cy="9.5" r="1.5" fill="currentColor"></circle>
            <path d="M12 3v-1"></path>
            <path d="M7 21v-2a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v2"></path>
          </svg>
          <span>Perfil</span>
        </button>
      </nav>

      {/* 4. Modal Inmersivo de Lección Conectado */}
      {activeLesson && (
        <LessonPlayerModal
          lesson={activeLesson}
          onClose={() => setActiveLesson(null)}
          onCompleteLesson={handleFinishLesson}
        />
      )}

      {/* 5. Modal Inmersivo de Evaluación de Hito (Checkpoint) */}
      {activeCheckpoint && (
        <CheckpointExamModal
          checkpoint={activeCheckpoint.checkpoint}
          unitTitle={activeCheckpoint.unitTitle}
          onClose={() => setActiveCheckpoint(null)}
          onPassCheckpoint={handlePassCheckpoint}
        />
      )}
    </div>
  );
};

export default App;
