'use client';

import React, { useState } from 'react';
import { useNutriStore } from '@/lib/store/useNutriStore';
import { Task, TaskPriority, TaskStatus, TaskType } from '@/lib/types';
import { getDaysRemaining } from '@/lib/utils';
import { 
  CheckSquare, 
  List, 
  Columns3, 
  Calendar as CalendarIcon, 
  Plus, 
  Search, 
  Filter, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  ChevronRight, 
  X,
  FileText
} from 'lucide-react';

export const TareasView: React.FC = () => {
  const { tasks, subjects, addTask, updateTask, deleteTask, toggleChecklistItem, changeTaskStatus } = useNutriStore();

  const [currentView, setCurrentView] = useState<'lista' | 'kanban' | 'calendario'>('kanban');
  const [filterSubject, setFilterSubject] = useState<string>('todas');
  const [filterStatus, setFilterStatus] = useState<string>('todos');
  const [filterPriority, setFilterPriority] = useState<string>('todas');
  const [searchQuery, setSearchQuery] = useState('');

  // Modal para nueva tarea
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [subjectId, setSubjectId] = useState(subjects[0]?.id || '');
  const [taskType, setTaskType] = useState<TaskType>('informe');
  const [dueDate, setDueDate] = useState('2026-11-20T23:59');
  const [priority, setPriority] = useState<TaskPriority>('media');
  const [checklistItems, setChecklistItems] = useState<{ id: string; text: string; completed: boolean }[]>([
    { id: '1', text: 'Revisar bibliografía y fuentes', completed: false },
    { id: '2', text: 'Redactar borrador', completed: false }
  ]);
  const [newChecklistText, setNewChecklistText] = useState('');

  // Filtrado
  const filteredTasks = tasks.filter(t => {
    if (filterSubject !== 'todas' && t.subjectId !== filterSubject) return false;
    if (filterStatus !== 'todos' && t.status !== filterStatus) return false;
    if (filterPriority !== 'todas' && t.priority !== filterPriority) return false;
    if (searchQuery && !t.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const handleAddChecklistItem = () => {
    if (!newChecklistText.trim()) return;
    setChecklistItems(prev => [
      ...prev,
      { id: Date.now().toString(), text: newChecklistText.trim(), completed: false }
    ]);
    setNewChecklistText('');
  };

  const handleRemoveChecklistItem = (id: string) => {
    setChecklistItems(prev => prev.filter(c => c.id !== id));
  };

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;
    addTask({
      subjectId: subjectId || subjects[0]?.id || '',
      title,
      description,
      taskType,
      dueDate,
      priority,
      status: 'pendiente',
      checklist: checklistItems
    });
    setIsModalOpen(false);
    setTitle('');
    setDescription('');
    setChecklistItems([
      { id: '1', text: 'Revisar bibliografía y fuentes', completed: false },
      { id: '2', text: 'Redactar borrador', completed: false }
    ]);
  };

  const kanbanColumns: { id: TaskStatus; label: string; color: string }[] = [
    { id: 'pendiente', label: 'Pendientes', color: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300' },
    { id: 'en_progreso', label: 'En Progreso', color: 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300' },
    { id: 'entregado', label: 'Entregados', color: 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300' },
    { id: 'calificado', label: 'Calificados', color: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' }
  ];

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-200">
      {/* Barra Superior */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#e2ddd3] dark:border-[#293a34]">
        <div>
          <h2 className="text-2xl font-extrabold text-gray-900 dark:text-gray-100 flex items-center gap-2">
            <CheckSquare className="w-6 h-6 text-[#e07a5f]" />
            Trabajos y Tareas
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
            Organizador de informes, casos clínicos, exposiciones y entregas del semestre.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Selector de Vistas */}
          <div className="flex bg-[#f0ebe1] dark:bg-[#1e2b26] p-1 rounded-xl border border-[#e2ddd3] dark:border-[#293a34]">
            <button
              onClick={() => setCurrentView('lista')}
              className={`p-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                currentView === 'lista' ? 'bg-white dark:bg-[#121816] text-[#1e5e4b] dark:text-[#82c4ae] shadow-xs' : 'text-gray-500'
              }`}
              title="Vista Lista"
            >
              <List className="w-4 h-4" />
              <span className="hidden md:inline">Lista</span>
            </button>
            <button
              onClick={() => setCurrentView('kanban')}
              className={`p-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                currentView === 'kanban' ? 'bg-white dark:bg-[#121816] text-[#1e5e4b] dark:text-[#82c4ae] shadow-xs' : 'text-gray-500'
              }`}
              title="Tablero Kanban"
            >
              <Columns3 className="w-4 h-4" />
              <span className="hidden md:inline">Kanban</span>
            </button>
            <button
              onClick={() => setCurrentView('calendario')}
              className={`p-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                currentView === 'calendario' ? 'bg-white dark:bg-[#121816] text-[#1e5e4b] dark:text-[#82c4ae] shadow-xs' : 'text-gray-500'
              }`}
              title="Vista Calendario"
            >
              <CalendarIcon className="w-4 h-4" />
              <span className="hidden md:inline">Mes</span>
            </button>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#e07a5f] hover:bg-[#d45b3a] text-white text-xs sm:text-sm font-bold shadow-md shadow-[#e07a5f]/20 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" /> Nueva Tarea
          </button>
        </div>
      </div>

      {/* Filtros y Buscador */}
      <div className="flex flex-wrap items-center gap-2.5 p-3 rounded-2xl bg-white dark:bg-[#18221f] border border-[#e2ddd3] dark:border-[#293a34] text-xs">
        <div className="flex-1 min-w-[200px] relative">
          <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Filtrar por título..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-gray-50 dark:bg-[#121816] border border-gray-200 dark:border-gray-700 text-xs"
          />
        </div>

        <select
          value={filterSubject}
          onChange={(e) => setFilterSubject(e.target.value)}
          className="px-3 py-1.5 rounded-xl bg-gray-50 dark:bg-[#121816] border border-gray-200 dark:border-gray-700 text-xs font-medium"
        >
          <option value="todas">Todas las materias</option>
          {subjects.map(s => (
            <option key={s.id} value={s.id}>{s.name}</option>
          ))}
        </select>

        <select
          value={filterPriority}
          onChange={(e) => setFilterPriority(e.target.value)}
          className="px-3 py-1.5 rounded-xl bg-gray-50 dark:bg-[#121816] border border-gray-200 dark:border-gray-700 text-xs font-medium"
        >
          <option value="todas">Cualquier prioridad</option>
          <option value="urgente">Urgente</option>
          <option value="alta">Alta</option>
          <option value="media">Media</option>
          <option value="baja">Baja</option>
        </select>
      </div>

      {/* VISTA 1: TABLERO KANBAN */}
      {currentView === 'kanban' && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 items-start">
          {kanbanColumns.map(col => {
            const colTasks = filteredTasks.filter(t => t.status === col.id);
            return (
              <div
                key={col.id}
                className="rounded-2xl bg-[#f0ebe1]/70 dark:bg-[#18221f]/60 border border-[#e2ddd3] dark:border-[#293a34] p-3 space-y-3"
              >
                <div className="flex items-center justify-between px-2 py-1">
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-md uppercase tracking-wider ${col.color}`}>
                    {col.label} ({colTasks.length})
                  </span>
                </div>

                <div className="space-y-3 min-h-[400px]">
                  {colTasks.length === 0 ? (
                    <div className="py-8 text-center text-xs text-gray-400">
                      Sin tareas en esta columna
                    </div>
                  ) : (
                    colTasks.map(task => {
                      const subject = subjects.find(s => s.id === task.subjectId);
                      const rem = getDaysRemaining(task.dueDate);
                      const completedCount = task.checklist.filter(c => c.completed).length;

                      return (
                        <div
                          key={task.id}
                          className="p-3.5 rounded-xl bg-white dark:bg-[#121816] border border-[#e2ddd3] dark:border-[#293a34] shadow-xs hover:shadow-md transition-shadow relative overflow-hidden"
                        >
                          <div
                            className="absolute left-0 top-0 bottom-0 w-1"
                            style={{ backgroundColor: subject?.colorHex || '#1e5e4b' }}
                          />

                          <div className="flex items-center justify-between text-[10px] text-gray-400 mb-1 pl-1">
                            <span 
                              className="font-bold px-1.5 py-0.5 rounded text-white text-[9px]"
                              style={{ backgroundColor: subject?.colorHex || '#1e5e4b' }}
                            >
                              {subject?.code}
                            </span>
                            <span className={`px-1.5 py-0.5 rounded uppercase font-semibold ${
                              task.priority === 'urgente' ? 'bg-red-100 text-red-700' : 'bg-gray-100 dark:bg-gray-800'
                            }`}>
                              {task.priority}
                            </span>
                          </div>

                          <h4 className="font-bold text-xs text-gray-900 dark:text-gray-100 leading-snug pl-1">
                            {task.title}
                          </h4>

                          <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-1 pl-1 line-clamp-2">
                            {task.description}
                          </p>

                          {/* Checklist preview */}
                          {task.checklist.length > 0 && (
                            <div className="mt-2.5 pt-2 border-t border-gray-100 dark:border-gray-800 text-[10px] pl-1">
                              <div className="flex items-center justify-between text-gray-400 mb-1">
                                <span>Subtareas ({completedCount}/{task.checklist.length})</span>
                                <span>{Math.round((completedCount / task.checklist.length) * 100)}%</span>
                              </div>
                              <div className="w-full h-1.5 rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden">
                                <div
                                  className="h-full rounded-full bg-[#1e5e4b] transition-all"
                                  style={{ width: `${(completedCount / task.checklist.length) * 100}%` }}
                                />
                              </div>
                            </div>
                          )}

                          {/* Footer tarjeta */}
                          <div className="mt-3 pt-2 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-[10px] pl-1">
                            <span className={`font-semibold ${rem.isUrgent ? 'text-red-500' : 'text-gray-400'}`}>
                              {rem.text}
                            </span>

                            {/* Selector rápido de estado */}
                            <select
                              value={task.status}
                              onChange={(e) => changeTaskStatus(task.id, e.target.value as TaskStatus)}
                              className="text-[10px] py-0.5 px-1.5 rounded bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 cursor-pointer font-medium"
                            >
                              <option value="pendiente">Pendiente</option>
                              <option value="en_progreso">En Progreso</option>
                              <option value="entregado">Entregado</option>
                              <option value="calificado">Calificado</option>
                            </select>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* VISTA 2: LISTA */}
      {currentView === 'lista' && (
        <div className="bg-white dark:bg-[#18221f] rounded-2xl border border-[#e2ddd3] dark:border-[#293a34] overflow-hidden">
          <div className="divide-y divide-gray-100 dark:divide-gray-800">
            {filteredTasks.map(task => {
              const subject = subjects.find(s => s.id === task.subjectId);
              const rem = getDaysRemaining(task.dueDate);
              const completedCount = task.checklist.filter(c => c.completed).length;

              return (
                <div key={task.id} className="p-4 hover:bg-gray-50/70 dark:hover:bg-gray-900/30 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-start gap-3 flex-1">
                    <button
                      onClick={() => {
                        const next: TaskStatus = task.status === 'calificado' ? 'pendiente' : 'calificado';
                        changeTaskStatus(task.id, next);
                      }}
                      className="mt-0.5 text-gray-300 hover:text-emerald-600 transition-colors"
                    >
                      <CheckCircle2 className={`w-5 h-5 ${task.status === 'calificado' ? 'text-emerald-600 fill-emerald-100' : ''}`} />
                    </button>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span 
                          className="text-[10px] font-bold px-2 py-0.5 rounded text-white"
                          style={{ backgroundColor: subject?.colorHex || '#1e5e4b' }}
                        >
                          {subject?.name}
                        </span>
                        <span className="text-xs text-gray-400 capitalize">• {task.taskType.replace('_', ' ')}</span>
                        <span className={`text-[10px] uppercase font-bold px-1.5 py-0.5 rounded ${
                          task.priority === 'urgente' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-600'
                        }`}>
                          {task.priority}
                        </span>
                      </div>
                      <h4 className="font-bold text-sm text-gray-900 dark:text-gray-100">{task.title}</h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{task.description}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 self-end sm:self-center shrink-0">
                    {task.checklist.length > 0 && (
                      <span className="text-xs text-gray-400">
                        {completedCount}/{task.checklist.length} listas
                      </span>
                    )}
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-lg ${rem.isUrgent ? 'bg-red-50 text-red-700' : 'bg-gray-100 text-gray-600'}`}>
                      {rem.text}
                    </span>
                    <select
                      value={task.status}
                      onChange={(e) => changeTaskStatus(task.id, e.target.value as TaskStatus)}
                      className="text-xs py-1 px-2 rounded-lg bg-gray-100 dark:bg-gray-800 border-0 font-medium"
                    >
                      <option value="pendiente">Pendiente</option>
                      <option value="en_progreso">En Progreso</option>
                      <option value="entregado">Entregado</option>
                      <option value="calificado">Calificado</option>
                    </select>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* VISTA 3: CALENDARIO RESUMIDO */}
      {currentView === 'calendario' && (
        <div className="bg-white dark:bg-[#18221f] rounded-2xl border border-[#e2ddd3] dark:border-[#293a34] p-5">
          <h3 className="font-bold text-sm text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
            <CalendarIcon className="w-4 h-4 text-[#e07a5f]" />
            Fechas Límite del Mes (Noviembre 2026)
          </h3>
          <div className="space-y-2">
            {filteredTasks.sort((a,b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()).map(t => {
              const sub = subjects.find(s => s.id === t.subjectId);
              return (
                <div key={t.id} className="p-3 rounded-xl bg-gray-50 dark:bg-[#121816] flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <span className="font-mono font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950 px-2 py-1 rounded">
                      {t.dueDate.replace('T', ' ')}
                    </span>
                    <div>
                      <div className="font-semibold text-gray-900 dark:text-gray-100">{t.title}</div>
                      <div className="text-[10px] text-gray-400">{sub?.name} • {t.taskType}</div>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded capitalize bg-gray-200 dark:bg-gray-800 font-semibold text-[10px]">
                    {t.status.replace('_', ' ')}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Modal: Crear Nueva Tarea */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <form 
            onSubmit={handleCreateTask}
            className="w-full max-w-lg bg-white dark:bg-[#18221f] rounded-3xl shadow-2xl border border-[#e2ddd3] dark:border-[#293a34] p-6 animate-in fade-in zoom-in-95 duration-150 space-y-4 max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between pb-2 border-b border-gray-100 dark:border-gray-800">
              <h3 className="font-bold text-base text-gray-900 dark:text-gray-100">
                Nueva Tarea o Trabajo Académico
              </h3>
              <button 
                type="button" 
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">Título del Trabajo</label>
              <input
                type="text"
                required
                placeholder="Ej. Caso Clínico: Paciente con Síndrome Metabólico"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-[#121816] border border-gray-200 dark:border-gray-700 text-xs font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">Descripción / Pautas</label>
              <textarea
                rows={2}
                placeholder="Detalles de la entrega, formato y rúbrica..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-[#121816] border border-gray-200 dark:border-gray-700 text-xs"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">Materia</label>
                <select
                  value={subjectId}
                  onChange={(e) => setSubjectId(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-[#121816] border border-gray-200 dark:border-gray-700 text-xs font-medium"
                >
                  {subjects.map(s => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">Tipo de Trabajo</label>
                <select
                  value={taskType}
                  onChange={(e) => setTaskType(e.target.value as TaskType)}
                  className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-[#121816] border border-gray-200 dark:border-gray-700 text-xs font-medium capitalize"
                >
                  <option value="caso_clinico">Caso Clínico</option>
                  <option value="informe">Informe</option>
                  <option value="practica">Práctica</option>
                  <option value="exposicion">Exposición</option>
                  <option value="examen">Examen</option>
                  <option value="proyecto">Proyecto / Tesis</option>
                  <option value="lectura">Lectura</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">Fecha y Hora Límite (La Paz)</label>
                <input
                  type="datetime-local"
                  required
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-[#121816] border border-gray-200 dark:border-gray-700 text-xs font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">Prioridad</label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value as TaskPriority)}
                  className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-[#121816] border border-gray-200 dark:border-gray-700 text-xs font-medium capitalize"
                >
                  <option value="baja">Baja</option>
                  <option value="media">Media</option>
                  <option value="alta">Alta</option>
                  <option value="urgente">Urgente</option>
                </select>
              </div>
            </div>

            {/* Checklist interactivo */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">Subtareas / Checklist</label>
              <div className="space-y-1.5 mb-2">
                {checklistItems.map(item => (
                  <div key={item.id} className="flex items-center justify-between p-2 rounded-lg bg-gray-50 dark:bg-[#121816] text-xs">
                    <span>{item.text}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveChecklistItem(item.id)}
                      className="text-gray-400 hover:text-red-500"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Agregar subtarea..."
                  value={newChecklistText}
                  onChange={(e) => setNewChecklistText(e.target.value)}
                  className="flex-1 px-3 py-1.5 rounded-xl bg-gray-50 dark:bg-[#121816] border border-gray-200 dark:border-gray-700 text-xs"
                />
                <button
                  type="button"
                  onClick={handleAddChecklistItem}
                  className="px-3 py-1.5 rounded-xl bg-gray-200 dark:bg-gray-700 text-xs font-bold"
                >
                  Añadir
                </button>
              </div>
            </div>

            <div className="pt-3 flex justify-end gap-2 border-t border-gray-100 dark:border-gray-800">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-gray-500 hover:bg-gray-100"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-[#e07a5f] text-white text-xs font-bold hover:bg-[#d45b3a]"
              >
                Crear Tarea
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
