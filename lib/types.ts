export type Role = 'student' | 'nutritionist';
export type AppMode = 'student' | 'professional';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  university: string;
  career: string;
  currentSemester: number;
  totalSemesters: number;
  expectedGraduation: string;
  avatarUrl: string;
  role: Role;
  currentMode: AppMode;
  theme: 'light' | 'dark';
  timezone: string;
  studyStreakDays: number;
}

export interface SubjectSchedule {
  day: 'Lunes' | 'Martes' | 'Miércoles' | 'Jueves' | 'Viernes' | 'Sábado';
  startTime: string; // "08:00"
  endTime: string;   // "10:00"
  classroom: string;
}

export interface Subject {
  id: string;
  name: string;
  code: string;
  teacherName: string;
  teacherEmail: string;
  classroom: string;
  credits: number;
  currentGrade: number;
  targetGrade: number;
  minPassingGrade: number;
  colorHex: string;
  semester: number;
  status: 'in_progress' | 'passed' | 'failed';
  schedule: SubjectSchedule[];
  syllabusTopicCount?: number;
  completedTopicsCount?: number;
}

export type TaskType = 
  | 'informe' 
  | 'exposicion' 
  | 'practica' 
  | 'examen' 
  | 'caso_clinico' 
  | 'proyecto' 
  | 'lectura';

export type TaskPriority = 'baja' | 'media' | 'alta' | 'urgente';

export type TaskStatus = 'pendiente' | 'en_progreso' | 'entregado' | 'calificado';

export interface TaskChecklistItem {
  id: string;
  text: string;
  completed: boolean;
}

export interface Task {
  id: string;
  subjectId: string;
  title: string;
  description: string;
  taskType: TaskType;
  dueDate: string; // ISO string o "YYYY-MM-DDTHH:mm"
  priority: TaskPriority;
  status: TaskStatus;
  grade?: number;
  maxGrade?: number;
  checklist: TaskChecklistItem[];
  attachments?: { name: string; size: string; type: string }[];
  createdAt: string;
}

export type EventType = 'clase' | 'examen' | 'entrega' | 'pasantia' | 'reunion_tutor';

export interface CalendarEvent {
  id: string;
  title: string;
  eventType: EventType;
  subjectId?: string;
  date: string; // "YYYY-MM-DD"
  startTime: string; // "14:00"
  endTime: string;   // "16:00"
  location: string;
  description?: string;
}

export interface Note {
  id: string;
  subjectId: string;
  title: string;
  topic: string;
  content: string;
  tags: string[];
  isFavorite: boolean;
  updatedAt: string;
  attachments?: { name: string; size: string; type: string }[];
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'alert';
  createdAt: string;
  read: boolean;
  linkTab?: string;
}
