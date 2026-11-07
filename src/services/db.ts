import Dexie, { Table } from 'dexie';

export interface UserProfile {
  id: string; // 'local_user'
  name: string;
  avatarId: string;
  dailyGoalMinutes: number;
  streakDays: number;
  lastActiveDate: string; // YYYY-MM-DD
  totalXp: number;
  currentLevel: number;
  gems: number;
  streakFreezeAvailable: number;
  createdAt: number;
}

export interface UserCourseProgress {
  courseId: string;
  status: 'not_started' | 'in_progress' | 'completed';
  activeUnitId: string;
  activeLessonId: string;
  completedLessons: string[];
  unlockedUnits: string[];
  examScores: Record<string, number>;
  projectCompleted: boolean;
  percentComplete: number;
  updatedAt: number;
}

export interface ActivityDayLog {
  id?: number;
  date: string;
  xpGained: number;
  lessonsCompleted: number;
  minutesSpent: number;
}

export interface StoredCertificate {
  id: string;
  courseId: string;
  courseTitle: string;
  recipientName: string;
  issueDate: string;
  finalScore: number;
  verificationHash: string;
}

export class NoduDatabase extends Dexie {
  profile!: Table<UserProfile, string>;
  courseProgress!: Table<UserCourseProgress, string>;
  activityLogs!: Table<ActivityDayLog, number>;
  certificates!: Table<StoredCertificate, string>;

  constructor() {
    super('NoduLocalDatabase');
    this.version(1).stores({
      profile: 'id',
      courseProgress: 'courseId, status, updatedAt',
      activityLogs: '++id, date',
      certificates: 'id, courseId, issueDate'
    });
  }
}

export const db = new NoduDatabase();

// Función de inicialización automática de perfil por defecto si no existe
export async function initializeLocalUser() {
  const existing = await db.profile.get('local_user');
  if (!existing) {
    const today = new Date().toISOString().split('T')[0];
    await db.profile.put({
      id: 'local_user',
      name: 'Alex Dev',
      avatarId: 'byte-avatar',
      dailyGoalMinutes: 10,
      streakDays: 5,
      lastActiveDate: today,
      totalXp: 140,
      currentLevel: 1,
      gems: 28,
      streakFreezeAvailable: 1,
      createdAt: Date.now()
    });

    // Iniciar progreso de Python por defecto
    await db.courseProgress.put({
      courseId: 'nodu-course-python-101',
      status: 'in_progress',
      activeUnitId: 'py-u1',
      activeLessonId: 'py-u1-l2',
      completedLessons: ['py-u1-l1'],
      unlockedUnits: ['py-u1'],
      examScores: {},
      projectCompleted: false,
      percentComplete: 33,
      updatedAt: Date.now()
    });
  }
}
