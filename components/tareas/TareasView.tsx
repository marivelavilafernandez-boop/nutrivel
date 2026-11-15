'use client';

import React, { useState } from 'react';
import { useNutriStore } from '@/lib/store/useNutriStore';
import { Task, TaskPriority, TaskStatus, TaskType, TaskAttachment } from '@/lib/types';
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
  FileText,
  FileSpreadsheet,
  Presentation,
  Paperclip,
  Download,
  Trash2,
  UploadCloud,
  Eye,
  Tag,
  BookOpen
} from 'lucide-react';

export const TareasView: React.FC = () => {
  const { tasks, subjects, addTask, updateTask, deleteTask, toggleChecklistItem, changeTaskStatus } = useNutriStore();

  const [currentView, setCurrentView] = useState<'lista' | 'kanban' | 'calendario'>('kanban');
  const [filterSubject, setFilterSubject] = useState<string>('todas');
  const [filterStatus, setFilterStatus] = useState<string>('todos');
  const [filterPriority, setFilterPriority] = useState<string>('todas');
  const [searchQuery, setSearchQuery] = useState('');

  // Tarea seleccionada para ver detalle y adjuntar documentos
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

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
  const [detailSubtaskText, setDetailSubtaskText] = useState('');

  // Sincronizar selectedTask con el store cuando cambie
  const liveSelectedTask = selectedTask ? tasks.find(t => t.id === selectedTask.id) || selectedTask : null;

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

  const handleAddSubtaskToSelectedTask = () => {
    if (!liveSelectedTask || !detailSubtaskText.trim()) return;
    const newSubtask = {
      id: Date.now().toString(),
      text: detailSubtaskText.trim(),
      completed: false
    };
    updateTask(liveSelectedTask.id, {
      checklist: [...liveSelectedTask.checklist, newSubtask]
    });
    setDetailSubtaskText('');
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
      checklist: checklistItems,
      attachments: []
    });
    setIsModalOpen(false);
    setTitle('');
    setDescription('');
    setChecklistItems([
      { id: '1', text: 'Revisar bibliografía y fuentes', completed: false },
      { id: '2', text: 'Redactar borrador', completed: false }
    ]);
  };

  // Subir cualquier tipo de documento (Excel, Word, PowerPoint, PDF, etc.)
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, targetTaskId: string) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      const sizeStr = file.size > 1024 * 1024 
        ? `${(file.size / (1024 * 1024)).toFixed(1)} MB`
        : `${Math.round(file.size / 1024)} KB`;

      const newAttachment: TaskAttachment = {
        id: `att_${Date.now()}`,
        name: file.name,
        size: sizeStr,
        type: file.type || file.name.split('.').pop() || 'archivo',
        dataUrl: dataUrl,
        uploadedAt: new Date().toLocaleDateString('es-BO', { day: '2-digit', month: 'short' })
      };

      const taskToUpdate = tasks.find(t => t.id === targetTaskId);
      const currentAttachments = taskToUpdate?.attachments || [];

      updateTask(targetTaskId, {
        attachments: [...currentAttachments, newAttachment]
      });
    };
    reader.readAsDataURL(file);
    e.target.value = ''; // reset input
  };

  const handleDeleteAttachment = (targetTaskId: string, attachmentId: string) => {
    const taskToUpdate = tasks.find(t => t.id === targetTaskId);
    if (!taskToUpdate) return;
    const updated = (taskToUpdate.attachments || []).filter(a => a.id !== attachmentId);
    updateTask(targetTaskId, { attachments: updated });
  };

  // Obtener Icono y Color según extensión de archivo
  const getFileBadge = (fileName: string) => {
    const ext = fileName.toLowerCase().split('.').pop() || '';
    if (['xlsx', 'xls', 'csv'].includes(ext)) {
      return {
        icon: FileSpreadsheet,
        color: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800',
        label: 'Excel'
      };
    }
    if (['docx', 'doc'].includes(ext)) {
      return {
        icon: FileText,
        color: 'text-blue-600 bg-blue-50 dark:bg-blue-950/40 border-blue-200 dark:border-blue-800',
        label: 'Word'
      };
    }
    if (['pptx', 'ppt'].includes(ext)) {
      return {
        icon: Presentation,
        color: 'text-orange-600 bg-orange-50 dark:bg-orange-950/40 border-orange-200 dark:border-orange-800',
        label: 'PowerPoint'
      };
    }
    if (['pdf'].includes(ext)) {
      return {
        icon: FileText,
        color: 'text-rose-600 bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800',
        label: 'PDF'
      };
    }
    return {
      icon: Paperclip,
      color: 'text-purple-600 bg-purple-50 dark:bg-purple-950/40 border-purple-200 dark:border-purple-800',
      label: ext.toUpperCase() || 'Archivo'
    };
  };

  const kanbanColumns: { id: TaskStatus; label: string; color: string }[] = [
    { id: 'pendiente', label: 'Pendientes', color: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300' },
    { id: 'en_progreso', label: 'En Progreso', color: 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300' },
    { id: 'entregado', label: 'Entregados', color: 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300' },
    { id: 'calificado', label: 'Calificados', color: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' }
  ];

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-200">
      
      {/* BARRA SUPERIOR */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#e2ddd3] dark:border-[#293a34]">
        <div>
          <h2 className="text-2xl font-extrabold text-gray-900 dark:text-gray-100 flex items-center gap-2">
            <CheckSquare className="w-6 h-6 text-pink-500" />
            Trabajos, Tareas y Entregas
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-0.5">
            Haz clic sobre cualquier tarea para ver sus detalles, consignas y adjuntar documentos (Excel, Word, PowerPoint, PDF).
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Selector de Vistas */}
          <div className="flex bg-[#f0ebe1] dark:bg-[#1e2b26] p-1 rounded-xl border border-[#e2ddd3] dark:border-[#293a34]">
            <button
              onClick={() => setCurrentView('lista')}
              className={`p-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                currentView === 'lista' ? 'bg-white dark:bg-[#121816] text-pink-600 dark:text-pink-400 shadow-xs' : 'text-gray-500'
              }`}
              title="Vista Lista"
            >
              <List className="w-4 h-4" />
              <span className="hidden md:inline">Lista</span>
            </button>
            <button
              onClick={() => setCurrentView('kanban')}
              className={`p-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                currentView === 'kanban' ? 'bg-white dark:bg-[#121816] text-pink-600 dark:text-pink-400 shadow-xs' : 'text-gray-500'
              }`}
              title="Tablero Kanban"
            >
              <Columns3 className="w-4 h-4" />
              <span className="hidden md:inline">Kanban</span>
            </button>
            <button
              onClick={() => setCurrentView('calendario')}
              className={`p-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                currentView === 'calendario' ? 'bg-white dark:bg-[#121816] text-pink-600 dark:text-pink-400 shadow-xs' : 'text-gray-500'
              }`}
              title="Vista Calendario"
            >
              <CalendarIcon className="w-4 h-4" />
              <span className="hidden md:inline">Calendario</span>
            </button>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-extrabold text-xs shadow-md shadow-pink-500/25 active:scale-95 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>+ Nueva Tarea</span>
          </button>
        </div>
      </div>

      {/* FILTROS Y BÚSQUEDA */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar tarea por título..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-white dark:bg-[#121816] border border-gray-200 dark:border-gray-700 text-xs outline-none focus:border-pink-500"
          />
        </div>

        <select
          value={filterSubject}
          onChange={(e) => setFilterSubject(e.target.value)}
          className="px-3 py-2 rounded-xl bg-white dark:bg-[#121816] border border-gray-200 dark:border-gray-700 text-xs font-medium"
        >
          <option value="todas">Todas las materias</option>
          {subjects.map(s => (
            <option key={s.id} value={s.id}>{s.name}</option>
          ))}
        </select>

        <select
          value={filterPriority}
          onChange={(e) => setFilterPriority(e.target.value)}
          className="px-3 py-2 rounded-xl bg-white dark:bg-[#121816] border border-gray-200 dark:border-gray-700 text-xs font-medium"
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
                className="rounded-2xl bg-gray-50 dark:bg-[#141526] border border-gray-200/70 dark:border-[#262840] p-3 space-y-3"
              >
                <div className="flex items-center justify-between px-2 py-1">
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-md uppercase tracking-wider ${col.color}`}>
                    {col.label} ({colTasks.length})
                  </span>
                </div>

                <div className="space-y-3 min-h-[350px]">
                  {colTasks.length === 0 ? (
                    <div className="py-8 text-center text-xs text-gray-400">
                      Sin tareas en esta columna
                    </div>
                  ) : (
                    colTasks.map(task => {
                      const subject = subjects.find(s => s.id === task.subjectId);
                      const rem = getDaysRemaining(task.dueDate);
                      const completedCount = task.checklist.filter(c => c.completed).length;
                      const attachmentsCount = task.attachments?.length || 0;

                      return (
                        <div
                          key={task.id}
                          onClick={() => setSelectedTask(task)}
                          className="p-3.5 rounded-2xl bg-white dark:bg-[#18221f] border border-gray-100 dark:border-[#293a34] shadow-xs hover:shadow-md hover:border-pink-300 dark:hover:border-pink-800 transition-all cursor-pointer relative overflow-hidden group"
                        >
                          <div
                            className="absolute left-0 top-0 bottom-0 w-1.5"
                            style={{ backgroundColor: subject?.colorHex || '#ec4899' }}
                          />

                          <div className="flex items-center justify-between text-[10px] text-gray-400 mb-1 pl-1">
                            <span 
                              className="font-bold px-1.5 py-0.5 rounded text-white text-[9px]"
                              style={{ backgroundColor: subject?.colorHex || '#ec4899' }}
                            >
                              {subject?.code}
                            </span>
                            <span className={`px-1.5 py-0.5 rounded uppercase font-bold text-[9px] ${
                              task.priority === 'urgente' 
                                ? 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300' 
                                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300'
                            }`}>
                              {task.priority}
                            </span>
                          </div>

                          <h4 className="font-bold text-xs text-gray-900 dark:text-gray-100 leading-snug pl-1 group-hover:text-pink-600 transition-colors">
                            {task.title}
                          </h4>

                          <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-1 pl-1 line-clamp-2">
                            {task.description}
                          </p>

                          {/* Subtareas */}
                          {task.checklist.length > 0 && (
                            <div className="mt-2.5 pt-2 border-t border-gray-100 dark:border-gray-800 text-[10px] pl-1">
                              <div className="flex items-center justify-between text-gray-400 mb-1">
                                <span>Subtareas ({completedCount}/{task.checklist.length})</span>
                                <span>{Math.round((completedCount / task.checklist.length) * 100)}%</span>
                              </div>
                              <div className="w-full h-1.5 rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden">
                                <div
                                  className="h-full rounded-full bg-pink-500 transition-all"
                                  style={{ width: `${(completedCount / task.checklist.length) * 100}%` }}
                                />
                              </div>
                            </div>
                          )}

                          {/* Footer con Fecha y Archivos Adjuntos */}
                          <div className="mt-3 pt-2 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-[10px] text-gray-400 pl-1">
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3 text-pink-500" />
                              <span className={rem.days < 2 ? 'text-rose-500 font-bold' : ''}>
                                {rem.text}
                              </span>
                            </div>

                            {/* Badge de Documentos Adjuntos */}
                            {attachmentsCount > 0 ? (
                              <div className="flex items-center gap-1 text-emerald-600 font-bold bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-full">
                                <Paperclip className="w-3 h-3" />
                                <span>{attachmentsCount} doc{attachmentsCount > 1 ? 's' : ''}</span>
                              </div>
                            ) : (
                              <div className="flex items-center gap-1 text-gray-400 hover:text-pink-500">
                                <Paperclip className="w-3 h-3" />
                                <span>+ Adjuntar</span>
                              </div>
                            )}
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

      {/* VISTA 2: LISTA DETALLADA */}
      {currentView === 'lista' && (
        <div className="bg-white dark:bg-[#18221f] rounded-3xl border border-gray-100 dark:border-[#293a34] shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50 dark:bg-[#141526] text-gray-400 font-bold uppercase tracking-wider border-b border-gray-100 dark:border-gray-800">
                <tr>
                  <th className="py-3.5 px-4">Trabajo / Tarea</th>
                  <th className="py-3.5 px-3">Materia</th>
                  <th className="py-3.5 px-3">Entrega</th>
                  <th className="py-3.5 px-3">Prioridad</th>
                  <th className="py-3.5 px-3">Documentos</th>
                  <th className="py-3.5 px-3">Estado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {filteredTasks.map(task => {
                  const subject = subjects.find(s => s.id === task.subjectId);
                  const rem = getDaysRemaining(task.dueDate);
                  const attCount = task.attachments?.length || 0;

                  return (
                    <tr 
                      key={task.id}
                      onClick={() => setSelectedTask(task)}
                      className="hover:bg-pink-50/30 dark:hover:bg-[#1a1c30]/50 transition-colors cursor-pointer"
                    >
                      <td className="py-3 px-4 font-bold text-gray-900 dark:text-gray-100">
                        <div>{task.title}</div>
                        <div className="text-[10px] font-normal text-gray-400 line-clamp-1">{task.description}</div>
                      </td>
                      <td className="py-3 px-3">
                        <span 
                          className="px-2 py-0.5 rounded text-[10px] font-bold text-white"
                          style={{ backgroundColor: subject?.colorHex || '#ec4899' }}
                        >
                          {subject?.name || 'Materia'}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-gray-500">
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-pink-500" />
                          <span>{rem.text}</span>
                        </div>
                      </td>
                      <td className="py-3 px-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          task.priority === 'urgente' ? 'bg-red-100 text-red-700' : 'bg-gray-100 dark:bg-gray-800 text-gray-600'
                        }`}>
                          {task.priority}
                        </span>
                      </td>
                      <td className="py-3 px-3">
                        {attCount > 0 ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 font-bold text-[10px]">
                            <Paperclip className="w-3 h-3" />
                            <span>{attCount} adjunto{attCount > 1 ? 's' : ''}</span>
                          </span>
                        ) : (
                          <span className="text-gray-400 text-[10px]">+ Añadir</span>
                        )}
                      </td>
                      <td className="py-3 px-3">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold capitalize bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                          {task.status.replace('_', ' ')}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* VISTA 3: CALENDARIO */}
      {currentView === 'calendario' && (
        <div className="bg-white dark:bg-[#18221f] rounded-3xl p-6 border border-gray-100 dark:border-[#293a34] shadow-xs">
          <h3 className="font-bold text-sm text-gray-700 dark:text-gray-300 mb-4">
            Cronograma de Entregas del Semestre
          </h3>
          <div className="space-y-3">
            {filteredTasks.map(t => {
              const sub = subjects.find(s => s.id === t.subjectId);
              return (
                <div
                  key={t.id}
                  onClick={() => setSelectedTask(t)}
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-gray-50 dark:bg-[#121816] border border-gray-100 dark:border-gray-800 hover:border-pink-300 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-10 rounded-full" style={{ backgroundColor: sub?.colorHex || '#ec4899' }} />
                    <div>
                      <div className="font-bold text-xs text-gray-900 dark:text-gray-100">{t.title}</div>
                      <div className="text-[10px] text-gray-400">{sub?.name} • Entrega: {new Date(t.dueDate).toLocaleDateString('es-BO')}</div>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full capitalize bg-pink-50 dark:bg-pink-950/40 text-pink-700 dark:text-pink-300 font-bold text-[10px]">
                    {t.status.replace('_', ' ')}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* MODAL DETALLADO DE TAREA (Al darle clic a cualquier tarea) */}
      {liveSelectedTask && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div 
            className="w-full max-w-2xl bg-white dark:bg-[#141526] rounded-3xl shadow-2xl border border-gray-100 dark:border-[#262840] p-6 max-h-[90vh] overflow-y-auto space-y-5 animate-in zoom-in-95 duration-150"
          >
            {/* Cabecera del Detalle */}
            <div className="flex items-start justify-between pb-3 border-b border-gray-100 dark:border-gray-800 gap-3">
              <div>
                {/* Materia y Tipo */}
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  {(() => {
                    const sub = subjects.find(s => s.id === liveSelectedTask.subjectId);
                    return (
                      <span 
                        className="px-2.5 py-0.5 rounded-full text-white text-[10px] font-bold"
                        style={{ backgroundColor: sub?.colorHex || '#ec4899' }}
                      >
                        {sub?.name || 'Materia'}
                      </span>
                    );
                  })()}
                  <span className="px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-[10px] font-bold uppercase">
                    {liveSelectedTask.taskType.replace('_', ' ')}
                  </span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                    liveSelectedTask.priority === 'urgente' 
                      ? 'bg-red-100 text-red-700' 
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-600'
                  }`}>
                    Prioridad {liveSelectedTask.priority}
                  </span>
                </div>

                <h3 className="text-lg font-extrabold text-gray-900 dark:text-gray-100 leading-snug">
                  {liveSelectedTask.title}
                </h3>
              </div>

              <button
                onClick={() => setSelectedTask(null)}
                className="p-1.5 rounded-xl text-gray-400 hover:text-gray-800 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Selector de Estado Rápido */}
            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-gray-400 block mb-1.5">
                Estado Actual de la Tarea:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 bg-gray-50 dark:bg-[#101120] p-1.5 rounded-2xl border border-gray-100 dark:border-gray-800">
                {(['pendiente', 'en_progreso', 'entregado', 'calificado'] as TaskStatus[]).map(st => (
                  <button
                    key={st}
                    onClick={() => changeTaskStatus(liveSelectedTask.id, st)}
                    className={`py-1.5 px-2 rounded-xl text-xs font-bold capitalize transition-all ${
                      liveSelectedTask.status === st
                        ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-xs'
                        : 'text-gray-500 hover:text-gray-800 dark:hover:text-gray-200'
                    }`}
                  >
                    {st.replace('_', ' ')}
                  </button>
                ))}
              </div>
            </div>

            {/* Fecha Límite */}
            <div className="p-3 rounded-2xl bg-pink-50/50 dark:bg-pink-950/20 border border-pink-200/60 dark:border-pink-900/40 text-xs flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-pink-500" />
                <span className="font-semibold text-gray-700 dark:text-gray-300">
                  Fecha de Entrega: {new Date(liveSelectedTask.dueDate).toLocaleString('es-BO', { dateStyle: 'full', timeStyle: 'short' })}
                </span>
              </div>
              <span className="font-extrabold text-pink-600 dark:text-pink-400">
                {getDaysRemaining(liveSelectedTask.dueDate).text}
              </span>
            </div>

            {/* Descripción Detallada */}
            <div>
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-gray-400 mb-1">
                Descripción & Consigna del Trabajo:
              </h4>
              <div className="p-3.5 rounded-2xl bg-gray-50 dark:bg-[#121816] border border-gray-100 dark:border-gray-800 text-xs text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                {liveSelectedTask.description || 'Sin descripción adicional para esta tarea.'}
              </div>
            </div>

            {/* Subtareas Checklist */}
            <div>
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-gray-400 mb-2">
                Subtareas & Pasos a Realizar ({liveSelectedTask.checklist.filter(c => c.completed).length}/{liveSelectedTask.checklist.length}):
              </h4>
              
              <div className="space-y-1.5 mb-2">
                {liveSelectedTask.checklist.map(ci => (
                  <div
                    key={ci.id}
                    onClick={() => toggleChecklistItem(liveSelectedTask.id, ci.id)}
                    className="flex items-center gap-2.5 p-2.5 rounded-xl bg-gray-50 dark:bg-[#121816] border border-gray-100 dark:border-gray-800 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800/60 transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={ci.completed}
                      onChange={() => {}}
                      className="w-4 h-4 rounded text-pink-600 focus:ring-pink-500"
                    />
                    <span className={`text-xs ${ci.completed ? 'line-through text-gray-400' : 'text-gray-800 dark:text-gray-200 font-medium'}`}>
                      {ci.text}
                    </span>
                  </div>
                ))}
              </div>

              {/* Agregar subtarea al vuelo */}
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Agregar nuevo paso o subtarea..."
                  value={detailSubtaskText}
                  onChange={e => setDetailSubtaskText(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleAddSubtaskToSelectedTask()}
                  className="flex-1 text-xs bg-gray-50 dark:bg-[#121816] border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-1.5 outline-none focus:border-pink-500"
                />
                <button
                  type="button"
                  onClick={handleAddSubtaskToSelectedTask}
                  className="px-3 py-1.5 rounded-xl bg-gray-200 dark:bg-gray-700 text-xs font-bold hover:bg-gray-300"
                >
                  + Añadir
                </button>
              </div>
            </div>

            {/* SECCIÓN DE DOCUMENTOS ADJUNTOS (Excel, Word, PowerPoint, PDF...) */}
            <div className="pt-2 border-t border-gray-100 dark:border-gray-800">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h4 className="text-xs font-extrabold uppercase tracking-wider text-pink-600 dark:text-pink-400 flex items-center gap-1.5">
                    <Paperclip className="w-3.5 h-3.5" />
                    <span>Documentos Adjuntos ({liveSelectedTask.attachments?.length || 0})</span>
                  </h4>
                  <span className="text-[11px] text-gray-400">
                    Soporta Excel (.xlsx, .csv), Word (.docx), PowerPoint (.pptx), PDF y fotos.
                  </span>
                </div>

                {/* Botón para subir archivo */}
                <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-bold text-xs shadow-xs cursor-pointer active:scale-95 transition-all">
                  <UploadCloud className="w-3.5 h-3.5" />
                  <span>+ Subir Archivo</span>
                  <input
                    type="file"
                    className="hidden"
                    accept=".pdf,.doc,.docx,.xls,.xlsx,.csv,.ppt,.pptx,.png,.jpg,.jpeg,.txt"
                    onChange={e => handleFileUpload(e, liveSelectedTask.id)}
                  />
                </label>
              </div>

              {/* Lista de archivos adjuntos */}
              {(!liveSelectedTask.attachments || liveSelectedTask.attachments.length === 0) ? (
                <div className="p-6 rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-800 text-center text-xs text-gray-400">
                  <Paperclip className="w-6 h-6 mx-auto mb-1 text-gray-300" />
                  <p>Aún no has adjuntado ningún documento a este trabajo.</p>
                  <p className="text-[10px] text-gray-400 mt-0.5">
                    Presiona el botón &quot;+ Subir Archivo&quot; para cargar tu minuta en Excel, diapositivas de PowerPoint o informe de Word.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {liveSelectedTask.attachments.map(att => {
                    const badge = getFileBadge(att.name);
                    const IconComponent = badge.icon;

                    return (
                      <div
                        key={att.id}
                        className="p-3 rounded-2xl bg-gray-50 dark:bg-[#121816] border border-gray-200/70 dark:border-gray-800 flex items-center justify-between gap-2 shadow-2xs"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className={`w-9 h-9 rounded-xl border flex items-center justify-center shrink-0 ${badge.color}`}>
                            <IconComponent className="w-4 h-4" />
                          </div>
                          <div className="min-w-0">
                            <span className="text-xs font-bold text-gray-800 dark:text-gray-200 block truncate" title={att.name}>
                              {att.name}
                            </span>
                            <span className="text-[10px] text-gray-400">
                              {badge.label} • {att.size} • {att.uploadedAt}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-1 shrink-0">
                          {att.dataUrl && (
                            <a
                              href={att.dataUrl}
                              download={att.name}
                              className="p-1.5 rounded-lg text-gray-500 hover:text-pink-600 hover:bg-white dark:hover:bg-gray-800 transition-colors"
                              title="Descargar documento"
                            >
                              <Download className="w-4 h-4" />
                            </a>
                          )}
                          <button
                            onClick={() => handleDeleteAttachment(liveSelectedTask.id, att.id)}
                            className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-white dark:hover:bg-gray-800 transition-colors"
                            title="Eliminar documento"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Footer con Eliminar y Cerrar */}
            <div className="pt-3 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
              <button
                type="button"
                onClick={() => {
                  deleteTask(liveSelectedTask.id);
                  setSelectedTask(null);
                }}
                className="text-xs font-bold text-red-500 hover:text-red-700 flex items-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Eliminar Trabajo</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedTask(null)}
                className="px-5 py-2 rounded-xl bg-gray-900 text-white dark:bg-white dark:text-gray-900 text-xs font-extrabold hover:opacity-90"
              >
                Cerrar
              </button>
            </div>

          </div>
        </div>
      )}

      {/* MODAL: CREAR NUEVA TAREA */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <form 
            onSubmit={handleCreateTask}
            className="w-full max-w-lg bg-white dark:bg-[#18221f] rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 p-6 space-y-4 max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between pb-2 border-b border-gray-100 dark:border-gray-800">
              <h3 className="font-extrabold text-base text-gray-900 dark:text-gray-100">
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
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Título del Trabajo</label>
              <input
                type="text"
                required
                placeholder="Ej. Caso Clínico: Paciente con Síndrome Metabólico"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-[#121816] border border-gray-200 dark:border-gray-700 text-xs font-medium outline-none focus:border-pink-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Descripción / Consigna</label>
              <textarea
                rows={2}
                placeholder="Detalles de la entrega, formato y rúbrica..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-[#121816] border border-gray-200 dark:border-gray-700 text-xs outline-none focus:border-pink-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Materia</label>
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
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Tipo de Trabajo</label>
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
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Fecha y Hora Límite (La Paz)</label>
                <input
                  type="datetime-local"
                  required
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-[#121816] border border-gray-200 dark:border-gray-700 text-xs font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Prioridad</label>
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
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">Subtareas Iniciales</label>
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
                  className="flex-1 px-3 py-1.5 rounded-xl bg-gray-50 dark:bg-[#121816] border border-gray-200 dark:border-gray-700 text-xs outline-none focus:border-pink-500"
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
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 text-white text-xs font-bold hover:opacity-95"
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
