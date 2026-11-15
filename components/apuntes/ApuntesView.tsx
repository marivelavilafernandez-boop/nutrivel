'use client';

import React, { useState } from 'react';
import { useNutriStore } from '@/lib/store/useNutriStore';
import { Note } from '@/lib/types';
import { 
  FileText, 
  Search, 
  Plus, 
  Star, 
  Tag, 
  Paperclip, 
  BookOpen, 
  Download, 
  Clock, 
  Edit3, 
  Trash2, 
  X,
  FileCheck
} from 'lucide-react';

export const ApuntesView: React.FC = () => {
  const { notes, subjects, addNote, updateNote, deleteNote, toggleFavoriteNote } = useNutriStore();

  const [selectedNote, setSelectedNote] = useState<Note | null>(notes[0] || null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterSubject, setFilterSubject] = useState<string>('todas');
  const [filterTag, setFilterTag] = useState<string>('todos');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Formulario nuevo apunte
  const [newTitle, setNewTitle] = useState('');
  const [newTopic, setNewTopic] = useState('');
  const [newSubjectId, setNewSubjectId] = useState(subjects[0]?.id || '');
  const [newContent, setNewContent] = useState('');
  const [newTagsStr, setNewTagsStr] = useState('Nutrición Clínica, Fórmulas');

  // Extraer todos los tags únicos
  const allTags = Array.from(new Set(notes.flatMap(n => n.tags)));

  const filteredNotes = notes.filter(n => {
    if (filterSubject !== 'todas' && n.subjectId !== filterSubject) return false;
    if (filterTag !== 'todos' && !n.tags.includes(filterTag)) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return n.title.toLowerCase().includes(q) || n.topic.toLowerCase().includes(q) || n.content.toLowerCase().includes(q);
    }
    return true;
  });

  const handleCreateNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle) return;
    const tags = newTagsStr.split(',').map(t => t.trim()).filter(Boolean);
    addNote({
      subjectId: newSubjectId,
      title: newTitle,
      topic: newTopic || 'Tema general',
      content: newContent || '# ' + newTitle,
      tags: tags.length ? tags : ['General'],
      isFavorite: false
    });
    setIsAddModalOpen(false);
    setNewTitle('');
    setNewTopic('');
    setNewContent('');
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-200">
      {/* Encabezado */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#e2ddd3] dark:border-[#293a34]">
        <div>
          <h2 className="text-2xl font-extrabold text-gray-900 dark:text-gray-100 flex items-center gap-2">
            <FileText className="w-6 h-6 text-[#2a9d8f]" />
            Apuntes y Repositorio de Documentos
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
            Notas de clase enriquecidas, algoritmos clínicos, guías del Ministerio de Salud y PDFs.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#1e5e4b] hover:bg-[#184a3b] text-white text-xs sm:text-sm font-bold shadow-md shadow-[#1e5e4b]/20 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Nuevo Apunte
        </button>
      </div>

      {/* Layout de Dos Columnas: Lista de Apuntes + Lector / Editor */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Columna Izquierda: Lista de Apuntes (5 cols) */}
        <div className="lg:col-span-5 space-y-3">
          {/* Barra de Filtro y Búsqueda */}
          <div className="p-3 rounded-2xl bg-white dark:bg-[#18221f] border border-[#e2ddd3] dark:border-[#293a34] space-y-2.5">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Buscar en apuntes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-gray-50 dark:bg-[#121816] border border-gray-200 dark:border-gray-700 text-xs"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <select
                value={filterSubject}
                onChange={(e) => setFilterSubject(e.target.value)}
                className="px-2 py-1.5 rounded-xl bg-gray-50 dark:bg-[#121816] border border-gray-200 dark:border-gray-700 text-xs truncate"
              >
                <option value="todas">Todas las materias</option>
                {subjects.map(s => (
                  <option key={s.id} value={s.id}>{s.name}</option>
                ))}
              </select>

              <select
                value={filterTag}
                onChange={(e) => setFilterTag(e.target.value)}
                className="px-2 py-1.5 rounded-xl bg-gray-50 dark:bg-[#121816] border border-gray-200 dark:border-gray-700 text-xs"
              >
                <option value="todos">Todos los tags</option>
                {allTags.map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Lista de Tarjetas */}
          <div className="space-y-2.5 max-h-[650px] overflow-y-auto pr-1">
            {filteredNotes.map(note => {
              const sub = subjects.find(s => s.id === note.subjectId);
              const isSelected = selectedNote?.id === note.id;

              return (
                <div
                  key={note.id}
                  onClick={() => setSelectedNote(note)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer relative overflow-hidden ${
                    isSelected
                      ? 'bg-emerald-50/70 dark:bg-emerald-950/30 border-emerald-500 shadow-md ring-1 ring-emerald-500'
                      : 'bg-white dark:bg-[#18221f] border-[#e2ddd3] dark:border-[#293a34] hover:bg-gray-50 dark:hover:bg-gray-900/40'
                  }`}
                >
                  <div
                    className="absolute left-0 top-0 bottom-0 w-1.5"
                    style={{ backgroundColor: sub?.colorHex || '#1e5e4b' }}
                  />

                  <div className="flex items-start justify-between gap-2 pl-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span 
                          className="text-[9px] font-bold px-1.5 py-0.5 rounded text-white"
                          style={{ backgroundColor: sub?.colorHex || '#1e5e4b' }}
                        >
                          {sub?.code}
                        </span>
                        <span className="text-[10px] text-gray-400 font-medium truncate">{note.topic}</span>
                      </div>
                      <h4 className="font-bold text-sm text-gray-900 dark:text-gray-100 leading-snug">
                        {note.title}
                      </h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
                        {note.content.replace(/[#*`_]/g, '')}
                      </p>

                      <div className="flex flex-wrap items-center gap-1.5 mt-2.5">
                        {note.tags.map(t => (
                          <span key={t} className="text-[9px] font-semibold px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300">
                            #{t}
                          </span>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavoriteNote(note.id);
                      }}
                      className="text-gray-300 hover:text-amber-400 transition-colors p-1"
                    >
                      <Star className={`w-4 h-4 ${note.isFavorite ? 'text-amber-400 fill-amber-400' : ''}`} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Columna Derecha: Lector / Editor Enriquecido (7 cols) */}
        <div className="lg:col-span-7">
          {selectedNote ? (
            <div className="p-6 rounded-3xl bg-white dark:bg-[#18221f] border border-[#e2ddd3] dark:border-[#293a34] shadow-xs space-y-4">
              <div className="flex items-start justify-between gap-3 pb-3 border-b border-gray-100 dark:border-gray-800">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 px-2.5 py-0.5 rounded-full">
                      {subjects.find(s => s.id === selectedNote.subjectId)?.name || 'Materia'}
                    </span>
                    <span className="text-xs text-gray-400">• {selectedNote.topic}</span>
                  </div>
                  <h3 className="text-xl font-extrabold text-gray-900 dark:text-gray-100">
                    {selectedNote.title}
                  </h3>
                  <div className="text-[11px] text-gray-400 mt-1 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" /> Actualizado: {selectedNote.updatedAt.split('T')[0]}
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => toggleFavoriteNote(selectedNote.id)}
                    className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 hover:text-amber-400 transition-colors"
                  >
                    <Star className={`w-4 h-4 ${selectedNote.isFavorite ? 'text-amber-400 fill-amber-400' : ''}`} />
                  </button>
                  <button
                    onClick={() => deleteNote(selectedNote.id)}
                    className="p-2 rounded-xl hover:bg-red-50 dark:hover:bg-red-950/30 text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Contenido en formato formateado */}
              <div className="prose dark:prose-invert max-w-none text-xs sm:text-sm text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line py-2">
                {selectedNote.content}
              </div>

              {/* Repositorio de Archivos y Adjuntos */}
              {selectedNote.attachments && selectedNote.attachments.length > 0 && (
                <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-800">
                  <div className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2 flex items-center gap-1.5">
                    <Paperclip className="w-3.5 h-3.5 text-gray-400" />
                    Archivos y Guías Adjuntas ({selectedNote.attachments.length})
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {selectedNote.attachments.map(att => (
                      <div
                        key={att.name}
                        className="p-2.5 rounded-xl bg-gray-50 dark:bg-[#121816] border border-gray-200 dark:border-gray-800 flex items-center justify-between gap-2"
                      >
                        <div className="flex items-center gap-2 overflow-hidden">
                          <FileCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                          <div className="overflow-hidden">
                            <span className="text-xs font-semibold text-gray-800 dark:text-gray-200 truncate block">
                              {att.name}
                            </span>
                            <span className="text-[10px] text-gray-400">{att.size}</span>
                          </div>
                        </div>
                        <button
                          onClick={() => alert(`Descargando archivo de referencia: ${att.name}`)}
                          className="p-1.5 rounded-lg text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950 transition-colors"
                          title="Descargar"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="p-12 text-center bg-white dark:bg-[#18221f] rounded-3xl border border-[#e2ddd3] dark:border-[#293a34]">
              <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Selecciona un apunte para visualizarlo</p>
            </div>
          )}
        </div>
      </div>

      {/* Modal: Crear Nuevo Apunte */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <form 
            onSubmit={handleCreateNote}
            className="w-full max-w-lg bg-white dark:bg-[#18221f] rounded-3xl shadow-2xl border border-[#e2ddd3] dark:border-[#293a34] p-6 animate-in fade-in zoom-in-95 duration-150 space-y-4 max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between pb-2 border-b border-gray-100 dark:border-gray-800">
              <h3 className="font-bold text-base text-gray-900 dark:text-gray-100">
                Nuevo Apunte de Clase
              </h3>
              <button 
                type="button" 
                onClick={() => setIsAddModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">Título del Apunte</label>
              <input
                type="text"
                required
                placeholder="Ej. Requerimientos de Proteína en Falla Renal Crónica"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-[#121816] border border-gray-200 dark:border-gray-700 text-xs font-medium"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">Materia</label>
                <select
                  value={newSubjectId}
                  onChange={(e) => setNewSubjectId(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-[#121816] border border-gray-200 dark:border-gray-700 text-xs font-medium"
                >
                  {subjects.map(s => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">Tema / Unidad</label>
                <input
                  type="text"
                  placeholder="Ej. Fisiopatología Renal"
                  value={newTopic}
                  onChange={(e) => setNewTopic(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-[#121816] border border-gray-200 dark:border-gray-700 text-xs font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">Etiquetas (separadas por coma)</label>
              <input
                type="text"
                placeholder="Proteínas, Diálisis, Nefropatía"
                value={newTagsStr}
                onChange={(e) => setNewTagsStr(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-[#121816] border border-gray-200 dark:border-gray-700 text-xs font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">Contenido del Apunte (Texto enriquecido / Markdown)</label>
              <textarea
                rows={8}
                required
                placeholder="Escribe tus notas, fórmulas, dosis o resúmenes aquí..."
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-[#121816] border border-gray-200 dark:border-gray-700 text-xs font-mono"
              />
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-gray-500 hover:bg-gray-100"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-[#1e5e4b] text-white text-xs font-bold hover:bg-[#184a3b]"
              >
                Guardar Apunte
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
