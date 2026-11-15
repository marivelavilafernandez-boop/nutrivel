'use client';

import React, { useState } from 'react';
import { useNutriStore } from '@/lib/store/useNutriStore';
import { 
  ShieldCheck, 
  Users, 
  Award, 
  Clock, 
  Calendar, 
  Plus, 
  ArrowRight, 
  ChevronLeft, 
  ChevronRight, 
  Check, 
  Sparkles,
  TrendingUp,
  Apple,
  BookOpen,
  GraduationCap
} from 'lucide-react';

export const DashboardView: React.FC = () => {
  const { 
    tasks, 
    subjects, 
    events, 
    setActiveTab, 
    toggleChecklistItem, 
    addTask, 
    changeTaskStatus 
  } = useNutriStore();

  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [selectedChartPeriod, setSelectedChartPeriod] = useState<'semana' | 'mes'>('semana');

  // Tareas pendientes
  const pendingTasks = [...tasks]
    .filter(t => t.status === 'pendiente' || t.status === 'en_progreso')
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());

  // Promedio actual
  const averageGrade = Math.round(
    subjects.reduce((acc, s) => acc + s.currentGrade, 0) / (subjects.length || 1)
  );

  // Agregar tarea rápida desde el To-Do list
  const handleQuickAddTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodoTitle.trim()) return;

    addTask({
      title: newTodoTitle.trim(),
      subjectId: subjects[0]?.id || '1',
      taskType: 'practica',
      dueDate: new Date(Date.now() + 86400000 * 2).toISOString(),
      priority: 'media',
      status: 'pendiente',
      description: 'Tarea rápida agregada desde el To-Do list',
      checklist: [
        { id: 'c1', text: 'Completar actividad', completed: false }
      ]
    });
    setNewTodoTitle('');
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-200">
      
      {/* 1. TOP SIGNATURE GRADIENT BANNER (Inspirado en el diseño de referencia: Barra magenta/rosa con 4 KPIs) */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#d946ef] via-[#ec4899] to-[#f43f5e] text-white p-6 sm:p-7 shadow-lg shadow-pink-500/20">
        {/* Decoración sutil de fondo */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

        <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-4 divide-y sm:divide-y-0 sm:divide-x divide-white/20">
          
          {/* KPI 1: Materias Activas */}
          <div className="pt-2 sm:pt-0 sm:px-4 first:sm:pl-0">
            <div className="flex items-center gap-2 text-pink-100 text-xs font-medium uppercase tracking-wider mb-1">
              <ShieldCheck className="w-4 h-4 text-white" />
              <span>Materias 2026</span>
            </div>
            <div className="flex items-baseline justify-between mt-1">
              <div className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                {subjects.length}
              </div>
              <span className="text-[11px] font-semibold text-emerald-200 bg-white/15 px-2 py-0.5 rounded-full flex items-center gap-0.5">
                ▲ Al día
              </span>
            </div>
            <p className="text-[11px] text-pink-100/90 mt-1">6to Semestre • UMSA</p>
          </div>

          {/* KPI 2: Horas de Práctica Clínica */}
          <div className="pt-2 sm:pt-0 sm:px-4">
            <div className="flex items-center gap-2 text-pink-100 text-xs font-medium uppercase tracking-wider mb-1">
              <Users className="w-4 h-4 text-white" />
              <span>Pasantía Clínica</span>
            </div>
            <div className="flex items-baseline justify-between mt-1">
              <div className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                80 h
              </div>
              <span className="text-[11px] font-semibold text-emerald-200 bg-white/15 px-2 py-0.5 rounded-full">
                ▲ 66%
              </span>
            </div>
            <p className="text-[11px] text-pink-100/90 mt-1">Hospital de Clínicas LP</p>
          </div>

          {/* KPI 3: Promedio General */}
          <div className="pt-2 sm:pt-0 sm:px-4">
            <div className="flex items-center gap-2 text-pink-100 text-xs font-medium uppercase tracking-wider mb-1">
              <Award className="w-4 h-4 text-white" />
              <span>Promedio Nota</span>
            </div>
            <div className="flex items-baseline justify-between mt-1">
              <div className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                {averageGrade} <span className="text-sm font-normal text-pink-200">/ 100</span>
              </div>
              <span className="text-[11px] font-semibold text-emerald-200 bg-white/15 px-2 py-0.5 rounded-full">
                ▲ +4.2 pts
              </span>
            </div>
            <p className="text-[11px] text-pink-100/90 mt-1">Nivel: Sobresaliente</p>
          </div>

          {/* KPI 4: Tareas Pendientes */}
          <div className="pt-2 sm:pt-0 sm:px-4">
            <div className="flex items-center gap-2 text-pink-100 text-xs font-medium uppercase tracking-wider mb-1">
              <Clock className="w-4 h-4 text-white" />
              <span>Entregas 7 Días</span>
            </div>
            <div className="flex items-baseline justify-between mt-1">
              <div className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                {pendingTasks.length}
              </div>
              <span className="text-[11px] font-semibold text-amber-200 bg-white/15 px-2 py-0.5 rounded-full">
                ▲ Próxima: Lun
              </span>
            </div>
            <p className="text-[11px] text-pink-100/90 mt-1">2 con prioridad alta</p>
          </div>

        </div>
      </div>

      {/* 2. MIDDLE SECTION: 2 COLUMNAS (Gráfico de Progreso a la izquierda, Tarjeta destacada a la derecha) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Gráfico de Progreso de Estudio y Casos (Ocupa 2 columnas) */}
        <div className="lg:col-span-2 bg-white dark:bg-[#18221f] rounded-3xl p-6 border border-gray-100 dark:border-[#293a34] shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-gray-100 dark:border-gray-800 gap-3">
            <div>
              <h3 className="text-base font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-pink-500" />
                Rendimiento y Horas de Estudio Semestral
              </h3>
              <p className="text-xs text-gray-400 mt-0.5">
                Seguimiento de preparación de casos clínicos, prácticas hospitalarias y tesis
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setSelectedChartPeriod('semana')}
                className={`text-xs px-3 py-1.5 rounded-xl font-medium transition-colors ${
                  selectedChartPeriod === 'semana'
                    ? 'bg-pink-50 text-pink-600 font-bold dark:bg-pink-950/40 dark:text-pink-300'
                    : 'text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
              >
                Semana
              </button>
              <button 
                onClick={() => setSelectedChartPeriod('mes')}
                className={`text-xs px-3 py-1.5 rounded-xl font-medium transition-colors ${
                  selectedChartPeriod === 'mes'
                    ? 'bg-pink-50 text-pink-600 font-bold dark:bg-pink-950/40 dark:text-pink-300'
                    : 'text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
              >
                Semestre
              </button>
            </div>
          </div>

          {/* Curvas del gráfico en SVG */}
          <div className="mt-4 pt-2">
            <div className="h-48 w-full relative">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 500 150">
                <defs>
                  <linearGradient id="pinkGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#ec4899" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#ec4899" stopOpacity="0.0" />
                  </linearGradient>
                  <linearGradient id="emeraldGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#10b981" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Líneas de guía horizontales */}
                <line x1="0" y1="25" x2="500" y2="25" stroke="#f1f5f9" strokeDasharray="4 4" />
                <line x1="0" y1="65" x2="500" y2="65" stroke="#f1f5f9" strokeDasharray="4 4" />
                <line x1="0" y1="105" x2="500" y2="105" stroke="#f1f5f9" strokeDasharray="4 4" />
                <line x1="0" y1="140" x2="500" y2="140" stroke="#e2e8f0" />

                {/* Área bajo la curva 1: Horas de Estudio */}
                <path
                  d="M 20 120 Q 90 70, 150 90 T 280 40 T 400 65 T 480 30 L 480 140 L 20 140 Z"
                  fill="url(#pinkGrad)"
                />
                {/* Línea Curva 1 (Rosa - Nutrición Clínica) */}
                <path
                  d="M 20 120 Q 90 70, 150 90 T 280 40 T 400 65 T 480 30"
                  fill="none"
                  stroke="#ec4899"
                  strokeWidth="3"
                  strokeLinecap="round"
                />

                {/* Área bajo la curva 2: Dietoterapia */}
                <path
                  d="M 20 135 Q 100 110, 170 80 T 300 95 T 420 50 T 480 45 L 480 140 L 20 140 Z"
                  fill="url(#emeraldGrad)"
                />
                {/* Línea Curva 2 (Verde Esmeralda - Dietoterapia) */}
                <path
                  d="M 20 135 Q 100 110, 170 80 T 300 95 T 420 50 T 480 45"
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="3"
                  strokeLinecap="round"
                />

                {/* Puntos destacados */}
                <circle cx="280" cy="40" r="5" fill="#ec4899" className="animate-pulse" />
                <circle cx="420" cy="50" r="5" fill="#10b981" />
              </svg>
            </div>

            {/* Eje X y Leyenda */}
            <div className="flex items-center justify-between text-xs text-gray-400 mt-3 pt-2 border-t border-gray-50 dark:border-gray-800">
              <span>Feb</span>
              <span>Mar</span>
              <span>Abr</span>
              <span>May</span>
              <span>Jun</span>
              <span>Jul</span>
            </div>

            <div className="flex items-center justify-center gap-6 mt-3 text-xs">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#ec4899]"></span>
                <span className="text-gray-600 dark:text-gray-300 font-medium">Nutrición Clínica & Casos</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#10b981]"></span>
                <span className="text-gray-600 dark:text-gray-300 font-medium">Dietoterapia & Cálculos</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#3b82f6]"></span>
                <span className="text-gray-600 dark:text-gray-300 font-medium">Horas Hospital</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tarjeta Destacada de Caso Clínico (Inspirada en la tarjeta con foto del diseño) */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-900 via-gray-800 to-[#1e1b4b] text-white p-6 flex flex-col justify-between shadow-md">
          {/* Fondo estético con blur y calidez */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-pink-500/20 via-transparent to-transparent pointer-events-none"></div>
          
          <div className="relative z-10">
            {/* Cabecera de la tarjeta con avatar */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-full bg-pink-500/30 border border-pink-400/40 flex items-center justify-center text-sm font-bold text-pink-200">
                MA
              </div>
              <div>
                <span className="text-xs font-semibold text-pink-300 block">Marivel Avila • Caso del Mes</span>
                <span className="text-[11px] text-gray-400">Nutrición Clínica II</span>
              </div>
            </div>

            <div className="inline-block px-2.5 py-1 rounded-full bg-pink-500/20 text-pink-300 text-[10px] font-bold uppercase tracking-wider mb-2">
              Diabetes Mellitus Tipo 2
            </div>

            <h4 className="text-lg font-bold leading-snug tracking-tight text-white">
              Evaluación Dietoterapéutica y Plan de 1,800 Kcal
            </h4>

            <p className="text-xs text-gray-300 mt-2 leading-relaxed">
              Manejo de paciente de 54 años con hiperglucemia y esteatosis hepática. Conteo de carbohidratos usando quinua, tarwi y alimentos bolivianos.
            </p>
          </div>

          <div className="relative z-10 mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
            <button
              onClick={() => setActiveTab('casos')}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold text-xs shadow-md shadow-pink-500/30 hover:opacity-95 transition-all cursor-pointer flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" /> REVISAR CASO
            </button>
            <span className="text-[11px] text-gray-400">Entrega: 18 Nov</span>
          </div>
        </div>

      </div>

      {/* 3. BOTTOM SECTION: 2 COLUMNAS (To-Do List a la izquierda, Donut Chart de Macros a la derecha) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* TO-DO LIST (Exacto como el diseño de referencia: checkboxes interactivos y caja de texto para agregar) */}
        <div className="lg:col-span-2 bg-white dark:bg-[#18221f] rounded-3xl p-6 border border-gray-100 dark:border-[#293a34] shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-gray-800">
              <div>
                <h3 className="text-base font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-500" />
                  Lista de Tareas y Pendientes (To-Do List)
                </h3>
                <span className="text-xs text-gray-400">Semana del 15 al 22 de Noviembre</span>
              </div>
              <div className="flex items-center gap-1 text-gray-400">
                <button className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Lista de tareas */}
            <div className="divide-y divide-gray-100 dark:divide-gray-800/60 mt-2">
              {tasks.slice(0, 5).map((task) => {
                const isCompleted = task.status === 'calificado' || task.status === 'entregado';
                return (
                  <div 
                    key={task.id}
                    className="py-3 flex items-center justify-between gap-3 group transition-colors"
                  >
                    <label className="flex items-center gap-3 cursor-pointer flex-1">
                      <input
                        type="checkbox"
                        checked={isCompleted}
                        onChange={() => {
                          changeTaskStatus(
                            task.id, 
                            isCompleted ? 'pendiente' : 'entregado'
                          );
                        }}
                        className="w-4 h-4 rounded-md text-pink-600 focus:ring-pink-500 border-gray-300 dark:border-gray-700 cursor-pointer transition-all"
                      />
                      <span className={`text-sm ${
                        isCompleted 
                          ? 'line-through text-gray-400 dark:text-gray-500 font-normal' 
                          : 'text-gray-800 dark:text-gray-200 font-medium'
                      }`}>
                        {task.title}
                      </span>
                    </label>

                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                        task.priority === 'urgente' 
                          ? 'bg-red-50 text-red-600 dark:bg-red-950/40 dark:text-red-300'
                          : task.priority === 'alta'
                          ? 'bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-300'
                          : 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-300'
                      }`}>
                        {task.priority}
                      </span>
                      <span className="text-xs text-gray-400 hidden sm:inline">
                        {new Date(task.dueDate).toLocaleDateString('es-BO', { day: '2-digit', month: 'short' })}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Formulario rápido para escribir tarea ("Type Here...") como en la imagen */}
          <form onSubmit={handleQuickAddTodo} className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-800 flex items-center gap-2">
            <input
              type="text"
              value={newTodoTitle}
              onChange={(e) => setNewTodoTitle(e.target.value)}
              placeholder="Escribe una tarea nueva aquí (ej: 'Revisar informe de pasantía')..."
              className="flex-1 text-xs sm:text-sm bg-gray-50 dark:bg-[#121816] border border-gray-200 dark:border-gray-700 rounded-xl px-3.5 py-2.5 focus:outline-hidden focus:ring-2 focus:ring-pink-400 transition-all text-gray-800 dark:text-gray-200 placeholder:text-gray-400"
            />
            <button
              type="submit"
              className="w-9 h-9 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 text-white flex items-center justify-center shrink-0 shadow-sm hover:opacity-90 transition-opacity cursor-pointer"
              title="Agregar tarea"
            >
              <Plus className="w-5 h-5" />
            </button>
          </form>
        </div>

        {/* DONUT CHART: DISTRIBUCIÓN DE MACRONUTRIENTES & DIETA (Exacto al Donut Chart del diseño de referencia) */}
        <div className="bg-white dark:bg-[#18221f] rounded-3xl p-6 border border-gray-100 dark:border-[#293a34] shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-gray-800">
              <h3 className="text-base font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                <Apple className="w-4 h-4 text-emerald-500" />
                Distribución de Macros (2,100 kcal)
              </h3>
            </div>
            <p className="text-xs text-gray-400 mt-1">
              Fórmula dietética estándar para adultos activos (Minuta Boliviana TBCA)
            </p>

            {/* Donut Chart SVG con centro circular */}
            <div className="my-6 flex items-center justify-center relative">
              <svg className="w-44 h-44 -rotate-90" viewBox="0 0 100 100">
                {/* Fondo círculo */}
                <circle cx="50" cy="50" r="38" fill="transparent" stroke="#f1f5f9" strokeWidth="12" />
                
                {/* Segmento 1: Carbohidratos 55% (Rosa / Magenta) */}
                <circle
                  cx="50"
                  cy="50"
                  r="38"
                  fill="transparent"
                  stroke="#ec4899"
                  strokeWidth="12"
                  strokeDasharray="131 239"
                  strokeDashoffset="0"
                />

                {/* Segmento 2: Proteínas 20% (Naranja / Coral) */}
                <circle
                  cx="50"
                  cy="50"
                  r="38"
                  fill="transparent"
                  stroke="#f97316"
                  strokeWidth="12"
                  strokeDasharray="48 239"
                  strokeDashoffset="-131"
                />

                {/* Segmento 3: Grasas saludables 25% (Esmeralda / Menta) */}
                <circle
                  cx="50"
                  cy="50"
                  r="38"
                  fill="transparent"
                  stroke="#10b981"
                  strokeWidth="12"
                  strokeDasharray="60 239"
                  strokeDashoffset="-179"
                />
              </svg>

              {/* Centro del Donut */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
                <span className="text-xl font-extrabold text-gray-900 dark:text-gray-100 tracking-tight">2,100</span>
                <span className="text-[10px] uppercase font-semibold tracking-wider text-pink-500">Kcal / Día</span>
              </div>
            </div>
          </div>

          {/* Leyenda con valores exactos */}
          <div className="space-y-2 text-xs pt-2 border-t border-gray-50 dark:border-gray-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ec4899]"></span>
                <span className="text-gray-600 dark:text-gray-300 font-medium">Carbohidratos (55%)</span>
              </div>
              <span className="font-bold text-gray-800 dark:text-gray-200">289 g • 1,155 kcal</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#f97316]"></span>
                <span className="text-gray-600 dark:text-gray-300 font-medium">Proteínas (20%)</span>
              </div>
              <span className="font-bold text-gray-800 dark:text-gray-200">105 g • 420 kcal</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#10b981]"></span>
                <span className="text-gray-600 dark:text-gray-300 font-medium">Lípidos / Grasas (25%)</span>
              </div>
              <span className="font-bold text-gray-800 dark:text-gray-200">58 g • 525 kcal</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
