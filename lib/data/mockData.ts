import { Subject, Task, CalendarEvent, Note, UserProfile, AppNotification } from '../types';

export const initialProfile: UserProfile = {
  id: 'usr-marivel-01',
  name: 'Marivel Avila Fernandez',
  email: 'marivelavilafernandez@gmail.com',
  university: 'Universidad Villa de Oropesa (UNIVIOR)',
  career: 'Licenciatura en Nutrición y Dietética',
  currentSemester: 6,
  totalSemesters: 10,
  expectedGraduation: 'Diciembre 2027',
  avatarUrl: 'https://images.unsplash.com/photo-1594824813515-5853f0cf871e?auto=format&fit=crop&q=80&w=250',
  role: 'student',
  currentMode: 'student',
  theme: 'light',
  timezone: 'America/La_Paz',
  studyStreakDays: 14
};

export const initialSubjects: Subject[] = [
  {
    id: 'sub-01',
    name: 'Nutrición Clínica II',
    code: 'NUT-501',
    teacherName: 'Dra. Patricia Montesinos',
    teacherEmail: 'pmontesinos@univior.edu.bo',
    classroom: 'Aula 302 - Pabellón Salud',
    credits: 6,
    currentGrade: 78,
    targetGrade: 85,
    minPassingGrade: 51,
    colorHex: '#1E5E4B', // Esmeralda clínico
    semester: 6,
    status: 'in_progress',
    syllabusTopicCount: 16,
    completedTopicsCount: 11,
    schedule: [
      { day: 'Lunes', startTime: '08:00', endTime: '10:00', classroom: 'Aula 302' },
      { day: 'Miércoles', startTime: '08:00', endTime: '10:00', classroom: 'Aula 302' }
    ]
  },
  {
    id: 'sub-02',
    name: 'Dietoterapia del Adulto y Adulto Mayor',
    code: 'NUT-502',
    teacherName: 'Lic. Claudia Salinas R.',
    teacherEmail: 'csalinas@univior.edu.bo',
    classroom: 'Laboratorio de Dietética 2',
    credits: 5,
    currentGrade: 82,
    targetGrade: 90,
    minPassingGrade: 51,
    colorHex: '#E07A5F', // Terracota cálido
    semester: 6,
    status: 'in_progress',
    syllabusTopicCount: 14,
    completedTopicsCount: 10,
    schedule: [
      { day: 'Martes', startTime: '10:00', endTime: '12:00', classroom: 'Lab Dietética 2' },
      { day: 'Jueves', startTime: '10:00', endTime: '12:00', classroom: 'Lab Dietética 2' }
    ]
  },
  {
    id: 'sub-03',
    name: 'Bromatología y Análisis de Alimentos',
    code: 'NUT-503',
    teacherName: 'Dr. Fernando Quiroga',
    teacherEmail: 'fquiroga@univior.edu.bo',
    classroom: 'Lab. Químico INLASA',
    credits: 5,
    currentGrade: 71,
    targetGrade: 80,
    minPassingGrade: 51,
    colorHex: '#2A9D8F', // Verde mar
    semester: 6,
    status: 'in_progress',
    syllabusTopicCount: 12,
    completedTopicsCount: 8,
    schedule: [
      { day: 'Viernes', startTime: '08:00', endTime: '12:00', classroom: 'Lab INLASA' }
    ]
  },
  {
    id: 'sub-04',
    name: 'Salud Pública y Nutrición Comunitaria',
    code: 'NUT-504',
    teacherName: 'Dra. Elizabeth Choque',
    teacherEmail: 'echoque@minsalud.gob.bo',
    classroom: 'Aula Magna Salud',
    credits: 4,
    currentGrade: 88,
    targetGrade: 90,
    minPassingGrade: 51,
    colorHex: '#D4A373', // Ocre andino
    semester: 6,
    status: 'in_progress',
    syllabusTopicCount: 10,
    completedTopicsCount: 7,
    schedule: [
      { day: 'Miércoles', startTime: '14:00', endTime: '16:00', classroom: 'Aula Magna' }
    ]
  },
  {
    id: 'sub-05',
    name: 'Taller de Grado I (Tesis)',
    code: 'NUT-505',
    teacherName: 'Dr. Marcelo Alarcón',
    teacherEmail: 'malarcon@univior.edu.bo',
    classroom: 'Sala de Postgrado',
    credits: 4,
    currentGrade: 85,
    targetGrade: 90,
    minPassingGrade: 51,
    colorHex: '#457B9D', // Azul acero
    semester: 6,
    status: 'in_progress',
    syllabusTopicCount: 8,
    completedTopicsCount: 5,
    schedule: [
      { day: 'Jueves', startTime: '16:00', endTime: '18:00', classroom: 'Sala Postgrado' }
    ]
  },
  {
    id: 'sub-06',
    name: 'Práctica Hospitalaria / Pasantía I',
    code: 'NUT-506',
    teacherName: 'Lic. Silvia Paredes (Tutora Hospital de Clínicas)',
    teacherEmail: 'sparedes@hospitalclinicas.bo',
    classroom: 'Hospital de Clínicas La Paz - Servicio Nutrición',
    credits: 6,
    currentGrade: 92,
    targetGrade: 95,
    minPassingGrade: 51,
    colorHex: '#8338EC', // Violeta clínico
    semester: 6,
    status: 'in_progress',
    syllabusTopicCount: 10,
    completedTopicsCount: 8,
    schedule: [
      { day: 'Lunes', startTime: '14:00', endTime: '18:00', classroom: 'Piso 3 Medicina Interna' },
      { day: 'Martes', startTime: '14:00', endTime: '18:00', classroom: 'Piso 3 Medicina Interna' }
    ]
  }
];

export const initialTasks: Task[] = [
  {
    id: 'tsk-01',
    subjectId: 'sub-01',
    title: 'Resolución de Caso Clínico: Paciente DM2 con Nefropatía Diabética',
    description: 'Calcular el requerimiento calórico (Mifflin) y proteico ajustado a 0.8 g/kg/día con control estricto de potasio y fósforo.',
    taskType: 'caso_clinico',
    dueDate: '2026-11-18T23:59',
    priority: 'urgente',
    status: 'en_progreso',
    maxGrade: 100,
    checklist: [
      { id: 'c1', text: 'Calcular TMB y GET con factor de estrés clínico', completed: true },
      { id: 'c2', text: 'Formular diagnóstico nutricional PES (Problema, Etiología, Signos)', completed: true },
      { id: 'c3', text: 'Elaborar menú de 1800 kcal con baja carga renal', completed: false },
      { id: 'c4', text: 'Redactar recomendaciones dietoterapéuticas para el alta', completed: false }
    ],
    createdAt: '2026-11-12T10:00'
  },
  {
    id: 'tsk-02',
    subjectId: 'sub-02',
    title: 'Minuta Patrón de 2100 kcal con Tabla Boliviana de Alimentos (TBCA)',
    description: 'Elaborar minuta completa de 5 tiempos de comida con quinua real, papa imilla y castaña amazónica, verificando adecuación de hierro y calcio.',
    taskType: 'practica',
    dueDate: '2026-11-20T18:00',
    priority: 'alta',
    status: 'pendiente',
    maxGrade: 100,
    checklist: [
      { id: 'c5', text: 'Seleccionar alimentos típicos bolivianos de la TBCA', completed: true },
      { id: 'c6', text: 'Cuadrar balance calórico a 2100 kcal exactas (±1%)', completed: true },
      { id: 'c7', text: 'Generar tabla en formato Excel con fórmulas bromatológicas', completed: false }
    ],
    createdAt: '2026-11-13T14:30'
  },
  {
    id: 'tsk-03',
    subjectId: 'sub-05',
    title: 'Entrega de Marco Teórico y Antecedentes (Tesis de Grado)',
    description: 'Capítulo II: Estado del arte sobre estado nutricional y rendimiento académico en adolescentes del área periurbana de El Alto.',
    taskType: 'proyecto',
    dueDate: '2026-11-25T20:00',
    priority: 'alta',
    status: 'en_progreso',
    maxGrade: 100,
    checklist: [
      { id: 'c8', text: 'Revisar 15 artículos indexados en SciELO y PubMed', completed: true },
      { id: 'c9', text: 'Redactar antecedentes nacionales y locales', completed: true },
      { id: 'c10', text: 'Formular bases teóricas y operativización de variables', completed: false },
      { id: 'c11', text: 'Revisión final con citas en formato APA 7', completed: false }
    ],
    createdAt: '2026-11-05T09:00'
  },
  {
    id: 'tsk-04',
    subjectId: 'sub-03',
    title: 'Informe de Laboratorio: Humedad y Cenizas en Granos Andinos',
    description: 'Análisis gravimétrico de quinua real y cañahua en laboratorio bromatológico.',
    taskType: 'informe',
    dueDate: '2026-11-22T12:00',
    priority: 'media',
    status: 'pendiente',
    maxGrade: 100,
    checklist: [
      { id: 'c12', text: 'Tabular datos de crisoles y peso seco', completed: false },
      { id: 'c13', text: 'Calcular porcentaje de humedad y cenizas totales', completed: false },
      { id: 'c14', text: 'Discusión comparativa con la norma boliviana IBNORCA', completed: false }
    ],
    createdAt: '2026-11-14T11:00'
  },
  {
    id: 'tsk-05',
    subjectId: 'sub-01',
    title: 'Segundo Examen Parcial: Nutrición Enteral y Parenteral',
    description: 'Evaluación teórica sobre vías de acceso, osmolaridad de fórmulas y cálculo de requerimientos en UCI.',
    taskType: 'examen',
    dueDate: '2026-11-27T08:00',
    priority: 'urgente',
    status: 'pendiente',
    maxGrade: 100,
    checklist: [
      { id: 'c15', text: 'Repasar flashcards de fórmulas enterales poliméricas vs oligoméricas', completed: false },
      { id: 'c16', text: 'Practicar cálculos de nitrógeno ureico y balance nitrogenado', completed: false }
    ],
    createdAt: '2026-11-10T16:00'
  },
  {
    id: 'tsk-06',
    subjectId: 'sub-04',
    title: 'Exposición: Estrategias de Prevención de Anemia Ferropénica en Bolivia',
    description: 'Presentación en diapositivas sobre el programa nacional de suplementación con chispitas nutricionales y micronutrientes.',
    taskType: 'exposicion',
    dueDate: '2026-11-16T14:00',
    priority: 'alta',
    status: 'entregado',
    grade: 94,
    maxGrade: 100,
    checklist: [
      { id: 'c17', text: 'Diseñar presentación en PowerPoint / Canva', completed: true },
      { id: 'c18', text: 'Revisar datos de la EDSA / INE Bolivia', completed: true },
      { id: 'c19', text: 'Preparar dinámicas participativas para el aula', completed: true }
    ],
    createdAt: '2026-11-08T18:00'
  }
];

export const initialCalendarEvents: CalendarEvent[] = [
  {
    id: 'ev-01',
    title: 'Clase: Nutrición Clínica II',
    eventType: 'clase',
    subjectId: 'sub-01',
    date: '2026-11-16',
    startTime: '08:00',
    endTime: '10:00',
    location: 'Aula 302 - Pabellón Salud',
    description: 'Tema: Manejo nutricional del paciente hepatópata y ascitis.'
  },
  {
    id: 'ev-02',
    title: 'Exposición: Prevención de Anemia en Bolivia',
    eventType: 'entrega',
    subjectId: 'sub-04',
    date: '2026-11-16',
    startTime: '14:00',
    endTime: '16:00',
    location: 'Aula Magna Salud',
    description: 'Presentación grupal de salud pública.'
  },
  {
    id: 'ev-03',
    title: 'Práctica Hospitalaria - Turno Tarde',
    eventType: 'pasantia',
    subjectId: 'sub-06',
    date: '2026-11-17',
    startTime: '14:00',
    endTime: '18:00',
    location: 'Hospital de Clínicas - Medicina Interna',
    description: 'Valoración nutricional a pacientes de camas 12 a 20.'
  },
  {
    id: 'ev-04',
    title: 'Entrega: Caso Clínico Paciente DM2',
    eventType: 'entrega',
    subjectId: 'sub-01',
    date: '2026-11-18',
    startTime: '23:59',
    endTime: '23:59',
    location: 'Plataforma Virtual UNIVIOR',
    description: 'Subir PDF con el cálculo dietoterápico y diagnóstico PES.'
  },
  {
    id: 'ev-05',
    title: 'Reunión con Tutor de Tesis',
    eventType: 'reunion_tutor',
    subjectId: 'sub-05',
    date: '2026-11-19',
    startTime: '16:00',
    endTime: '17:00',
    location: 'Oficina Dr. Alarcón - Postgrado',
    description: 'Revisión del instrumento de recolección de datos y muestra.'
  },
  {
    id: 'ev-06',
    title: 'Segundo Examen Parcial Nutrición Clínica II',
    eventType: 'examen',
    subjectId: 'sub-01',
    date: '2026-11-27',
    startTime: '08:00',
    endTime: '10:00',
    location: 'Auditorio Central',
    description: 'Nutrición enteral y parenteral, síndromes de malabsorción.'
  }
];

export const initialNotes: Note[] = [
  {
    id: 'not-01',
    subjectId: 'sub-01',
    title: 'Algoritmo de Elección de Soporte Nutricional (Enteral vs Parenteral)',
    topic: 'Soporte Nutricional Especializado',
    content: `# Algoritmo de Soporte Nutricional Clínico

Regla de oro: **"Si el intestino funciona, ¡úsalo!"**

## 1. Criterios para Nutrición Enteral (NE):
- Tracto gastrointestinal funcional (al menos 100 cm de intestino delgado funcionante).
- Ingesta oral < 60% del requerimiento estimado por más de 5 a 7 días en normonutridos, o > 3 días en desnutridos.
- Vías de acceso:
  - **Sonda Nasogástrica (SNG)**: Corto plazo (< 4-6 semanas), vaciamiento gástrico conservado, bajo riesgo de broncoaspiración.
  - **Sonda Nasoyeyunal (SNY)**: Pacientes con gastroparesia, pancreatitis aguda severa o reflujo grave.
  - **Gastrostomía Percutánea (PEG)**: Largo plazo (> 4 a 6 semanas).

## 2. Tipos de Fórmulas:
- **Poliméricas**: Proteína intacta, carbohidratos complejos, con o sin fibra. Osmolaridad: 300 - 350 mOsm/L.
- **Oligoméricas / Peptídicas**: Péptidos hidrolizados, TCM (triglicéridos de cadena media), absorción facilitada en falla intestinal leve/moderada.

## 3. Complicaciones a Vigilar:
- Síndrome de Realimentación: Caída crítica de fósforo, potasio y magnesio tras reintroducir carbohidratos en ayuno prolongado.`,
    tags: ['Soporte Nutricional', 'Nutrición Enteral', 'Fórmulas', 'UCI'],
    isFavorite: true,
    updatedAt: '2026-11-14T18:20',
    attachments: [
      { name: 'Guia_ASPEN_Soporte_Nutricional_2024.pdf', size: '2.4 MB', type: 'application/pdf' },
      { name: 'Algoritmo_Soporte_UCI.png', size: '640 KB', type: 'image/png' }
    ]
  },
  {
    id: 'not-02',
    subjectId: 'sub-02',
    title: 'Fórmulas de Estimación del Gasto Energético en Adultos',
    topic: 'Evaluación y Requerimiento Energético',
    content: `# Fórmulas Predictivas del Gasto Energético Basal (GEB)

## 1. Fórmula de Mifflin-St Jeor (Más recomendada en adultos sanos y con sobrepeso):
- **Hombres**: GEB = (10 × peso en kg) + (6.25 × talla en cm) - (5 × edad en años) + 5
- **Mujeres**: GEB = (10 × peso en kg) + (6.25 × talla en cm) - (5 × edad en años) - 161

## 2. Fórmula de Harris-Benedict (Revisada por Roza y Shizgal, 1984):
- **Hombres**: GEB = 88.362 + (13.397 × kg) + (4.799 × cm) - (5.677 × edad)
- **Mujeres**: GEB = 447.593 + (9.247 × kg) + (3.098 × cm) - (4.330 × edad)

## 3. Factores de Actividad Física (FA):
- Sedentario: 1.2
- Actividad Ligera (1-3 días/sem): 1.375
- Actividad Moderada (3-5 días/sem): 1.55
- Muy Activo (6-7 días/sem): 1.725

## 4. Gasto Energético Total (GET):
GET = GEB × FA × (Factor de Estrés si aplica) + Efecto Térmico de los Alimentos (ETA ~10%)`,
    tags: ['Cálculo Calórico', 'Mifflin', 'Harris Benedict', 'GET'],
    isFavorite: true,
    updatedAt: '2026-11-13T11:45',
    attachments: [
      { name: 'Tabla_Factores_Actividad_OMS.pdf', size: '420 KB', type: 'application/pdf' }
    ]
  },
  {
    id: 'not-03',
    subjectId: 'sub-03',
    title: 'Tabla Boliviana de Composición de Alimentos (TBCA - INLASA): Aspectos Clave',
    topic: 'Bromatología de Alimentos Nativos',
    content: `# Análisis de Alimentos Nativos Bolivianos en la TBCA

## 1. Quinua Real (*Chenopodium quinoa*):
- Energía: ~374 kcal/100g cruda.
- Proteína: 12.5 - 13.8 g/100g con cómputo aminoacídico completo (lisina y metionina en balance óptimo).
- Minerales: Calcio (60 mg), Hierro no hemo (5.2 mg).
- **Tratamiento culinario**: Lavado minucioso para eliminar saponinas antes de la cocción.

## 2. Castaña Amazónica de Bolivia (*Bertholletia excelsa*):
- Excelente fuente de selenio orgánico (antioxidante celular y modulador tiroideo).
- Aporte lipídico: 66.4% de grasas mono y poliinsaturadas.

## 3. Harina de Trigo Fortificada (Normativa Boliviana):
- Conforme al D.S. 24424, toda harina de trigo en Bolivia debe estar fortificada con hierro (30 mg/kg), tiamina, riboflavina, niacina y ácido fólico para prevenir defectos del tubo neural y anemia.`,
    tags: ['TBCA', 'Alimentos Bolivianos', 'Quinua', 'Bromatología'],
    isFavorite: false,
    updatedAt: '2026-11-11T16:10'
  }
];

export const initialNotifications: AppNotification[] = [
  {
    id: 'notif-01',
    title: 'Entrega próxima en 3 días',
    message: 'Caso Clínico Paciente DM2 de Nutrición Clínica vence el 18 de noviembre.',
    type: 'alert',
    createdAt: '2026-11-15T08:00',
    read: false,
    linkTab: 'trabajos'
  },
  {
    id: 'notif-02',
    title: 'Examen Parcial programado',
    message: 'Segundo Parcial de Nutrición Clínica II fijado para el 27 de noviembre.',
    type: 'warning',
    createdAt: '2026-11-14T10:30',
    read: false,
    linkTab: 'calendario'
  },
  {
    id: 'notif-03',
    title: '¡14 días de racha de estudio!',
    message: 'Has mantenido una constancia admirable esta quincena. ¡Sigue así, futura licenciada!',
    type: 'success',
    createdAt: '2026-11-14T21:00',
    read: true,
    linkTab: 'dashboard'
  }
];
