import { create } from 'zustand';
import { db, UserProfile, UserCourseProgress } from '../services/db';
import { pythonFundamentalsCourse } from '../courses/python-fundamentals';
import { sqlFundamentalsCourse } from '../courses/sql-fundamentals';
import { javascriptBasicsCourse } from '../courses/javascript-basics';
import { CourseMetadata } from '../types/course';

interface AppState {
  activeTab: 'learn' | 'explore' | 'challenges' | 'profile';
  activeCourseId: string;
  courses: Record<string, CourseMetadata>;
  profile: UserProfile | null;
  progress: UserCourseProgress | null;
  
  // Acciones
  setActiveTab: (tab: 'learn' | 'explore' | 'challenges' | 'profile') => void;
  setActiveCourseId: (courseId: string) => void;
  loadInitialData: () => void;
  completeLesson: (lessonId: string, earnedXp: number) => Promise<void>;
  updateSettings: (newSettings: Partial<UserProfile['settings']>) => Promise<void>;
  exportBackupJSON: () => Promise<void>;
}

export const useAppStore = create<AppState>((set, get) => ({
  activeTab: 'learn',
  activeCourseId: 'nodu-course-python-101',
  courses: {
    'nodu-course-python-101': pythonFundamentalsCourse,
    'nodu-course-sql-101': sqlFundamentalsCourse,
    'nodu-course-js-101': javascriptBasicsCourse
  },
  profile: null,
  progress: null,

  setActiveTab: (tab) => set({ activeTab: tab }),
  setActiveCourseId: (courseId) => set({ activeCourseId: courseId }),

  loadInitialData: async () => {
    const prof = await db.profile.get('local_user');
    const prog = await db.courseProgress.get(get().activeCourseId);
    if (prof) set({ profile: prof });
    if (prog) set({ progress: prog });
  },

  completeLesson: async (lessonId: string, earnedXp: number) => {
    const { profile, progress, activeCourseId } = get();
    if (!profile || !progress) return;

    const newXp = profile.totalXp + earnedXp;
    const completed = progress.completedLessons.includes(lessonId)
      ? progress.completedLessons
      : [...progress.completedLessons, lessonId];

    await db.profile.update('local_user', { totalXp: newXp });
    await db.courseProgress.update(activeCourseId, {
      completedLessons: completed,
      percentComplete: Math.min(100, Math.round((completed.length / 3) * 100)),
      updatedAt: Date.now()
    });

    set({
      profile: { ...profile, totalXp: newXp },
      progress: {
        ...progress,
        completedLessons: completed,
        percentComplete: Math.min(100, Math.round((completed.length / 3) * 100))
      }
    });
  },

  updateSettings: async (newSettings) => {
    const { profile } = get();
    if (!profile) return;
    const merged = { ...profile.settings, ...newSettings };
    await db.profile.update('local_user', { settings: merged });
    set({ profile: { ...profile, settings: merged } });
  },

  exportBackupJSON: async () => {
    const profile = await db.profile.get('local_user');
    const courses = await db.courseProgress.toArray();
    const certs = await db.certificates.toArray();

    const backupData = {
      app: 'Nodu',
      version: '1.0.0',
      exportedAt: new Date().toISOString(),
      profile,
      courses,
      certificates: certs
    };

    const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `nodu-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }
}));
