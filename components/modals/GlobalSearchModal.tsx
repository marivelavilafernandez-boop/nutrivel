'use client';

import React, { useState, useEffect } from 'react';
import { useNutriStore } from '@/lib/store/useNutriStore';
import { Search, X, BookOpen, CheckSquare, Calendar, FileText, ArrowRight } from 'lucide-react';

export const GlobalSearchModal: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, subjects, tasks, notes, events, setActiveTab } = useNutriStore();
  const [query, setQuery] = useState('');

  // Atajo de teclado Cmd+K o Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
      if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, setIsSearchOpen]);

  if (!isSearchOpen) return null;

  const q = query.toLowerCase().trim();

  const filteredSubjects = q ? subjects.filter(s => s.name.toLowerCase().includes(q) || s.code.toLowerCase().includes(q) || s.teacherName.toLowerCase().includes(q)) : [];
  const filteredTasks = q ? tasks.filter(t => t.title.toLowerCase().includes(q) || t.description.toLowerCase().includes(q)) : [];
  const filteredNotes = q ? notes.filter(n => n.title.toLowerCase().includes(q) || n.topic.toLowerCase().includes(q) || n.tags.some(tag => tag.toLowerCase().includes(q))) : [];
  const filteredEvents = q ? events.filter(e => e.title.toLowerCase().includes(q) || (e.description && e.description.toLowerCase().includes(q))) : [];

  const handleSelect = (tab: string) => {
    setActiveTab(tab);
    setIsSearchOpen(false);
    setQuery('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/50 backdrop-blur-xs">
      <div className="w-full max-w-2xl bg-white dark:bg-[#18221f] rounded-2xl shadow-2xl border border-[#e2ddd3] dark:border-[#293a34] overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Barra de entrada */}
        <div className="flex items-center px-4 py-3.5 border-b border-[#e2ddd3] dark:border-[#293a34]">
          <Search className="w-5 h-5 text-gray-400 mr-3 shrink-0" />
          <input
            type="text"
            placeholder="Buscar materias, tareas, apuntes, eventos de calendario..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full bg-transparent border-0 outline-hidden text-base text-gray-900 dark:text-gray-100 placeholder-gray-400"
          />
          <button 
            onClick={() => setIsSearchOpen(false)}
            className="p-1 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Resultados */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-4">
          {!q ? (
            <div className="py-8 text-center text-sm text-gray-400">
              Escribe para buscar en todas las áreas de <span className="font-semibold text-[#1e5e4b] dark:text-[#82c4ae]">NutriPanel</span>.
              <p className="mt-1 text-xs">Atajo rápido: <kbd className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-gray-600 dark:text-gray-300">Ctrl</kbd> + <kbd className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-gray-600 dark:text-gray-300">K</kbd></p>
            </div>
          ) : (
            <>
              {filteredSubjects.length === 0 && filteredTasks.length === 0 && filteredNotes.length === 0 && filteredEvents.length === 0 ? (
                <div className="py-8 text-center text-sm text-gray-400">
                  No se encontraron resultados para &quot;{query}&quot;
                </div>
              ) : null}

              {/* Materias */}
              {filteredSubjects.length > 0 && (
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-[#1e5e4b]" /> Materias ({filteredSubjects.length})
                  </div>
                  <div className="space-y-1">
                    {filteredSubjects.map(s => (
                      <button
                        key={s.id}
                        onClick={() => handleSelect('materias')}
                        className="w-full text-left p-2.5 rounded-xl hover:bg-[#f0ebe1] dark:hover:bg-[#1e2b26] flex items-center justify-between group transition-colors"
                      >
                        <div>
                          <div className="text-sm font-medium text-gray-800 dark:text-gray-200">{s.name} ({s.code})</div>
                          <div className="text-xs text-gray-400">{s.teacherName} • {s.classroom}</div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-[#1e5e4b] group-hover:translate-x-0.5 transition-all" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Tareas */}
              {filteredTasks.length > 0 && (
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2 flex items-center gap-1.5">
                    <CheckSquare className="w-3.5 h-3.5 text-[#e07a5f]" /> Tareas y Trabajos ({filteredTasks.length})
                  </div>
                  <div className="space-y-1">
                    {filteredTasks.map(t => (
                      <button
                        key={t.id}
                        onClick={() => handleSelect('trabajos')}
                        className="w-full text-left p-2.5 rounded-xl hover:bg-[#f0ebe1] dark:hover:bg-[#1e2b26] flex items-center justify-between group transition-colors"
                      >
                        <div>
                          <div className="text-sm font-medium text-gray-800 dark:text-gray-200">{t.title}</div>
                          <div className="text-xs text-gray-400">Vence: {t.dueDate.replace('T', ' ')} • Prioridad: {t.priority}</div>
                        </div>
                        <span className="text-xs px-2 py-0.5 rounded-md capitalize bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300">{t.status.replace('_', ' ')}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Apuntes */}
              {filteredNotes.length > 0 && (
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-[#2a9d8f]" /> Apuntes y Guías ({filteredNotes.length})
                  </div>
                  <div className="space-y-1">
                    {filteredNotes.map(n => (
                      <button
                        key={n.id}
                        onClick={() => handleSelect('apuntes')}
                        className="w-full text-left p-2.5 rounded-xl hover:bg-[#f0ebe1] dark:hover:bg-[#1e2b26] flex items-center justify-between group transition-colors"
                      >
                        <div>
                          <div className="text-sm font-medium text-gray-800 dark:text-gray-200">{n.title}</div>
                          <div className="text-xs text-gray-400">{n.topic} • Tags: {n.tags.join(', ')}</div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-[#1e5e4b] group-hover:translate-x-0.5 transition-all" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Calendario */}
              {filteredEvents.length > 0 && (
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#457b9d]" /> Eventos ({filteredEvents.length})
                  </div>
                  <div className="space-y-1">
                    {filteredEvents.map(e => (
                      <button
                        key={e.id}
                        onClick={() => handleSelect('calendario')}
                        className="w-full text-left p-2.5 rounded-xl hover:bg-[#f0ebe1] dark:hover:bg-[#1e2b26] flex items-center justify-between group transition-colors"
                      >
                        <div>
                          <div className="text-sm font-medium text-gray-800 dark:text-gray-200">{e.title}</div>
                          <div className="text-xs text-gray-400">{e.date} ({e.startTime} - {e.endTime}) • {e.location}</div>
                        </div>
                        <span className="text-xs px-2 py-0.5 rounded-md capitalize bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300">{e.eventType}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
