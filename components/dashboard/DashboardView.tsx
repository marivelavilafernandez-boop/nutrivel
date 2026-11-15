'use client';

import React from 'react';
import { useNutriStore } from '@/lib/store/useNutriStore';
import { getGreeting, getDaysRemaining, formatDateLaPaz } from '@/lib/utils';
import { 
  CheckCircle2, 
  Clock, 
  Calendar, 
  BookOpen, 
  AlertCircle, 
  Flame, 
  Plus, 
  ArrowRight, 
  GraduationCap, 
  Sparkles,
  TrendingUp,
  Award
} from 'lucide-react';

export const DashboardView: React.FC = () => {
  const { profile, tasks, subjects, events, setActiveTab, toggleChecklistItem } = useNutriStore();

  const greeting = getGreeting();

  // Tareas pendientes ordenadas por fecha de vencimiento
  const pendingTasks = [...tasks]
    .filter(t => t.status === 'pendiente' || t.status === 'en_progreso')
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());

  const upcoming7DaysTasks = pendingTasks.slice(0, 5);

  // Exámenes próximos
  const upcomingExams = tasks
    .filter(t => t.taskType === 'examen' && t.status !== 'calificado')
    .concat(
      events.filter(e => e.eventType === 'examen').map(e => ({
        id: e.id,
        subjectId: e.subjectId || '',
        title: e.title,
        description: e.description || '',
        taskType: 'examen' as const,
        dueDate: `${e.date}T${e.startTime}`,
        priority: 'urgente' as const,
        status: 'pendiente' as const,
        checklist: [],
        createdAt: ''
      }))
    )
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
    .slice(0, 3);

  // Promedio actual ponderado
  const averageGrade = Math.round(
    subjects.reduce((acc, s) => acc + s.currentGrade, 0) / (subjects.length || 1)
  );

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-200">
      {/* Banner de Bienvenida */}
      <div className="relative overflow-hidden rounded-3xl bg-linear-to-r from-[#1e5e4b] via-[#246b56] to-[#2e7d62] text-white p-6 sm:p-8 shadow-xl shadow-[#1e5e4b]/15">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-xs text-xs font-semibold mb-3 border border-white/20">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Último Año de Carrera • Lic. en Nutrición</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            {greeting}, Marivel
          </h2>
          <p className="mt-2 text-sm sm:text-base text-emerald-100 font-normal leading-relaxed">
            Tienes <span className="font-bold underline decoration-amber-300">{pendingTasks.length} trabajos pendientes</span> y el semestre avanza con un promedio destacado de <span className="font-bold text-amber-300">{averageGrade}/100</span>. ¡Cada día más cerca de tu título profesional!
          </p>

          {/* Accesos rápidos en banner */}
          <div className="mt-6 flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => setActiveTab('trabajos')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white text-[#1e5e4b] text-xs sm:text-sm font-bold shadow-md hover:bg-emerald-50 transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" /> Nueva Tarea
            </button>
            <button
              onClick={() => setActiveTab('apuntes')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/20 hover:bg-white/30 text-white text-xs sm:text-sm font-semibold backdrop-blur-xs transition-all cursor-pointer"
            >
              Nuevo Apunte
            </button>
            <button
              onClick={() => setActiveTab('materias')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/20 hover:bg-white/30 text-white text-xs sm:text-sm font-semibold backdrop-blur-xs transition-all cursor-pointer"
            >
              Calculadora de Notas
            </button>
          </div>
        </div>

        {/* Decoración gráfica de fondo */}
        <div className="absolute -right-8 -bottom-10 opacity-15 pointer-events-none select-none text-9xl">
          🥗
        </div>
      </div>

      {/* Tarjetas de Métricas Rápidas */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#18221f] border border-[#e2ddd3] dark:border-[#293a34] shadow-xs">
          <div className="flex items-center justify-between text-gray-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Entregas 7 Días</span>
            <Clock className="w-4 h-4 text-[#e07a5f]" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-gray-100">{upcoming7DaysTasks.length}</span>
            <span className="text-xs text-[#e07a5f] font-semibold">Urgentes</span>
          </div>
          <div className="mt-1 text-[11px] text-gray-400">De {pendingTasks.length} pendientes en total</div>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#18221f] border border-[#e2ddd3] dark:border-[#293a34] shadow-xs">
          <div className="flex items-center justify-between text-gray-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Promedio Actual</span>
            <Award className="w-4 h-4 text-[#1e5e4b] dark:text-[#82c4ae]" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-[#1e5e4b] dark:text-[#82c4ae]">{averageGrade}</span>
            <span className="text-xs text-gray-400">/ 100 pts</span>
          </div>
          <div className="mt-1 text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">Meta aprobatoria superada</div>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#18221f] border border-[#e2ddd3] dark:border-[#293a34] shadow-xs">
          <div className="flex items-center justify-between text-gray-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Racha de Estudio</span>
            <Flame className="w-4 h-4 text-orange-500" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-orange-500">{profile.studyStreakDays}</span>
            <span className="text-xs text-gray-400">días seguidos</span>
          </div>
          <div className="mt-1 text-[11px] text-orange-600 dark:text-orange-400 font-medium">¡Constancia ejemplar! 🔥</div>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#18221f] border border-[#e2ddd3] dark:border-[#293a34] shadow-xs">
          <div className="flex items-center justify-between text-gray-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Progreso Carrera</span>
            <TrendingUp className="w-4 h-4 text-blue-500" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-blue-600 dark:text-blue-400">88%</span>
            <span className="text-xs text-gray-400">Semestre 9/10</span>
          </div>
          <div className="mt-1 text-[11px] text-gray-400">Graduación: {profile.expectedGraduation}</div>
        </div>
      </div>

      {/* Grid Principal: Entregas próximas vs Exámenes / Horario */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Columna Izquierda: Entregas de los próximos 7 días (2 cols en desktop) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-[#e07a5f]" />
              <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100">
                Próximas Entregas (7 Días)
              </h3>
            </div>
            <button
              onClick={() => setActiveTab('trabajos')}
              className="text-xs font-bold text-[#1e5e4b] dark:text-[#82c4ae] hover:underline flex items-center gap-1"
            >
              Ver todas ({pendingTasks.length}) <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {upcoming7DaysTasks.length === 0 ? (
              <div className="p-8 text-center bg-white dark:bg-[#18221f] rounded-2xl border border-[#e2ddd3] dark:border-[#293a34]">
                <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">¡Al día! No tienes entregas urgentes</p>
                <p className="text-xs text-gray-400 mt-1">Buen momento para avanzar tu tesis o repasar flashcards.</p>
              </div>
            ) : (
              upcoming7DaysTasks.map(task => {
                const subject = subjects.find(s => s.id === task.subjectId);
                const remaining = getDaysRemaining(task.dueDate);
                const completedCount = task.checklist.filter(c => c.completed).length;

                return (
                  <div
                    key={task.id}
                    className="p-4 rounded-2xl bg-white dark:bg-[#18221f] border border-[#e2ddd3] dark:border-[#293a34] hover:shadow-md transition-shadow relative overflow-hidden"
                  >
                    {/* Borde izquierdo con color de materia */}
                    <div 
                      className="absolute left-0 top-0 bottom-0 w-1.5" 
                      style={{ backgroundColor: subject?.colorHex || '#1e5e4b' }}
                    />

                    <div className="flex items-start justify-between gap-3 ml-2">
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <span 
                            className="text-[10px] font-bold px-2 py-0.5 rounded-full text-white"
                            style={{ backgroundColor: subject?.colorHex || '#1e5e4b' }}
                          >
                            {subject?.name || 'Materia'}
                          </span>
                          <span className={`text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded-md ${
                            task.priority === 'urgente' 
                              ? 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300' 
                              : 'bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-300'
                          }`}>
                            {task.priority}
                          </span>
                          <span className="text-xs text-gray-400">• {task.taskType.replace('_', ' ')}</span>
                        </div>

                        <h4 className="font-bold text-sm text-gray-900 dark:text-gray-100 leading-snug">
                          {task.title}
                        </h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
                          {task.description}
                        </p>

                        {/* Checklist de subtareas interactivo */}
                        {task.checklist.length > 0 && (
                          <div className="mt-3 pt-2.5 border-t border-gray-100 dark:border-gray-800">
                            <div className="flex items-center justify-between text-[11px] text-gray-400 mb-1.5">
                              <span>Progreso de subtareas ({completedCount}/{task.checklist.length})</span>
                              <span>{Math.round((completedCount / task.checklist.length) * 100)}%</span>
                            </div>
                            <div className="space-y-1">
                              {task.checklist.slice(0, 2).map(item => (
                                <label 
                                  key={item.id}
                                  className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-300 cursor-pointer select-none"
                                >
                                  <input
                                    type="checkbox"
                                    checked={item.completed}
                                    onChange={() => toggleChecklistItem(task.id, item.id)}
                                    className="w-3.5 h-3.5 rounded text-[#1e5e4b] focus:ring-[#1e5e4b]"
                                  />
                                  <span className={item.completed ? 'line-through text-gray-400' : ''}>
                                    {item.text}
                                  </span>
                                </label>
                              ))}
                              {task.checklist.length > 2 && (
                                <div className="text-[10px] text-gray-400 pl-5">
                                  + {task.checklist.length - 2} subtareas más en el detalle
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Indicador de Vencimiento */}
                      <div className="text-right shrink-0">
                        <span className={`inline-block px-2 py-1 rounded-lg text-xs font-bold ${
                          remaining.isUrgent 
                            ? 'bg-rose-50 text-rose-700 dark:bg-rose-950/80 dark:text-rose-300 border border-rose-200 dark:border-rose-900' 
                            : 'bg-emerald-50 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300'
                        }`}>
                          {remaining.text}
                        </span>
                        <div className="text-[10px] text-gray-400 mt-1">
                          {task.dueDate.split('T')[0]}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Columna Derecha: Exámenes próximos y Horario de hoy */}
        <div className="space-y-6">
          {/* Exámenes Próximos */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-amber-500" />
              <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100">
                Exámenes Cercanos
              </h3>
            </div>

            <div className="space-y-2.5">
              {upcomingExams.map(ex => {
                const sub = subjects.find(s => s.id === ex.subjectId);
                const rem = getDaysRemaining(ex.dueDate);
                return (
                  <div
                    key={ex.id}
                    className="p-3.5 rounded-2xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40"
                  >
                    <div className="flex items-center justify-between text-[11px] font-bold text-amber-800 dark:text-amber-300">
                      <span>{sub?.name || 'Examen'}</span>
                      <span className="px-2 py-0.5 rounded-md bg-amber-200 dark:bg-amber-900 text-amber-900 dark:text-amber-100">
                        {rem.text}
                      </span>
                    </div>
                    <div className="text-xs font-bold text-gray-800 dark:text-gray-200 mt-1">{ex.title}</div>
                    <div className="text-[10px] text-gray-500 dark:text-gray-400 mt-1 flex items-center gap-1">
                      <Calendar className="w-3 h-3" /> {ex.dueDate.replace('T', ' ')}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Horario de Clases Semanal */}
          <div className="p-4 rounded-2xl bg-white dark:bg-[#18221f] border border-[#e2ddd3] dark:border-[#293a34]">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-bold text-sm text-gray-900 dark:text-gray-100 flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-[#1e5e4b]" /> Horario de Clases
              </h4>
              <button
                onClick={() => setActiveTab('calendario')}
                className="text-[11px] font-bold text-[#1e5e4b] dark:text-[#82c4ae] hover:underline"
              >
                Ver calendario
              </button>
            </div>
            <div className="space-y-2 text-xs divide-y divide-gray-100 dark:divide-gray-800">
              {subjects.slice(0, 4).map(s => (
                <div key={s.id} className="pt-2 first:pt-0 flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-gray-800 dark:text-gray-200">{s.name}</div>
                    <div className="text-[10px] text-gray-400">{s.schedule[0]?.day} • {s.schedule[0]?.startTime} - {s.schedule[0]?.endTime}</div>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 font-mono">
                    {s.classroom}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
