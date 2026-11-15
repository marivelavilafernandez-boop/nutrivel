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

export interface TaskAttachment {
  id: string;
  name: string;
  size: string;
  type: string;
  dataUrl?: string;
  uploadedAt: string;
}

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
  attachments?: TaskAttachment[];
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

// ----------------- MÓDULOS DE NUTRICIÓN CLÍNICA Y ACADÉMICA (FASE 1 - ETAPA 2) -----------------

export interface FoodItem {
  id: string;
  name: string;
  category: 
    | 'Cereales Andinos y Granos' 
    | 'Tubérculos y Raíces' 
    | 'Leguminosas y Semillas' 
    | 'Carnes, Aves y Pescados' 
    | 'Lácteos y Derivados' 
    | 'Verduras y Hortalizas' 
    | 'Frutas Locales' 
    | 'Grasas y Aceites';
  portionGrams: number; // Porción estándar (100g)
  energyKcal: number;
  proteinGrams: number;
  carbsGrams: number;
  fatGrams: number;
  fiberGrams: number;
  ironMg: number;
  calciumMg: number;
  sodiumMg: number;
  isBolivianNative?: boolean; // ej: quinua, cañahua, tarwi, chuño, tunta
  notes?: string;
}

export interface MealFoodItem {
  id: string;
  foodId: string;
  foodName: string;
  grams: number;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export interface MealSlot {
  id: string;
  name: 'Desayuno' | 'Colación Mañana' | 'Almuerzo' | 'Merienda Tarde' | 'Cena';
  time: string;
  items: MealFoodItem[];
}

export interface ClinicalCase {
  id: string;
  patientFakeName: string;
  age: number;
  gender: 'Femenino' | 'Masculino';
  medicalDiagnosis: string;
  hospitalWard: string; // ej: Sala Nefrología, Medicina Interna
  weightKg: number;
  heightCm: number;
  bmi: number;
  bmiCategory: string;
  biochemistry: {
    glucose?: number;
    creatinine?: number;
    urea?: number;
    albumin?: number;
    totalCholesterol?: number;
    triglycerides?: number;
    potassium?: number;
    sodium?: number;
  };
  pesDiagnosis: {
    problem: string;
    etiology: string;
    signsSymptoms: string;
  };
  dietaryPrescription: string;
  targetKcal: number;
  targetProteinGrams: number;
  clinicalNotes: string;
  status: 'en_analisis' | 'plan_completado' | 'evaluado';
}

export interface ThesisMilestone {
  id: string;
  title: string;
  stageName: string;
  dueDate: string;
  status: 'pendiente' | 'en_progreso' | 'aprobado_tutor' | 'completado';
  progressPercentage: number;
  tutorFeedback?: string;
  notes?: string;
}

export interface ApaReference {
  id: string;
  title: string;
  authors: string;
  year: number;
  sourceType: 'libro' | 'articulo' | 'guia_clinica' | 'tesis';
  publisherOrJournal: string;
  doiOrUrl?: string;
  inTextCitation: string;
  fullReference: string;
  subjectId?: string;
}

