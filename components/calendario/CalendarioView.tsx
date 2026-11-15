'use client';

import React, { useState } from 'react';
import { useNutriStore } from '@/lib/store/useNutriStore';
import { CalendarEvent, EventType } from '@/lib/types';
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight, 
  Clock, 
  MapPin, 
  Plus, 
  X, 
  BookOpen, 
  AlertCircle, 
  CheckCircle2,
  Briefcase
} from 'lucide-react';

export const CalendarioView: React.FC = () => {
  const { events, subjects, tasks, addEvent } = useNutriStore();

  const [calendarMode, setCalendarMode] = useState<'semanal' | 'mensual'>('mensual');
  const [filterType, setFilterType] = useState<string>('todos');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Formulario nuevo evento
  const [title, setTitle] = useState('');
  const [eventType, setEventType] = useState<EventType>('clase');
  const [date, setDate] = useState('2026-11-20');
  const [startTime, setStartTime] = useState('08:00');
  const [endTime, setEndTime] = useState('10:00');
  const [location, setLocation] = useState('Aula 302');
  const [description, setDescription] = useState('');

  // Unificar eventos de calendario + tareas con fecha límite
  const allEvents: {
    id: string;
    title: string;
    date: string;
    startTime: string;
    endTime: string;
    location: string;
    type: string;
    color: string;
  }[] = [
    ...events.map(e => {
      const sub = subjects.find(s => s.id === e.subjectId);
      return {
        id: e.id,
        title: e.title,
        date: e.date,
        startTime: e.startTime,
        endTime: e.endTime,
        location: e.location,
        type: e.eventType,
        color: sub?.colorHex || '#1e5e4b'
      };
    }),
    ...tasks.map(t => {
      const sub = subjects.find(s => s.id === t.subjectId);
      const [d, time] = t.dueDate.split('T');
      return {
        id: `tsk-ev-${t.id}`,
        title: `Entrega: ${t.title}`,
        date: d,
        startTime: time || '23:59',
        endTime: time || '23:59',
        location: 'Entrega virtual / presencial',
        type: 'entrega',
        color: '#e07a5f'
      };
    })
  ];

  const filteredEvents = allEvents.filter(e => {
    if (filterType !== 'todos' && e.type !== filterType) return false;
    return true;
  });

  // Generar días para vista mensual (Noviembre 2026, mes que inicia en domingo 1 y termina en lunes 30)
  // Días de la semana
  const weekDays = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
  const daysInMonth = Array.from({ length: 30 }, (_, i) => i + 1);

  const handleCreateEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;
    addEvent({
      title,
      eventType,
      date,
      startTime,
      endTime,
      location,
      description
    });
    setIsAddModalOpen(false);
    setTitle('');
    setDescription('');
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-200">
      {/* Encabezado */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#e2ddd3] dark:border-[#293a34]">
        <div>
          <h2 className="text-2xl font-extrabold text-gray-900 dark:text-gray-100 flex items-center gap-2">
            <CalendarIcon className="w-6 h-6 text-[#1e5e4b]" />
            Calendario Académico y Clínico
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
            Clases semanales, exámenes, fechas de entrega y turnos de pasantía hospitalaria.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex bg-[#f0ebe1] dark:bg-[#1e2b26] p-1 rounded-xl border border-[#e2ddd3] dark:border-[#293a34]">
            <button
              onClick={() => setCalendarMode('semanal')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                calendarMode === 'semanal' ? 'bg-white dark:bg-[#121816] text-[#1e5e4b] dark:text-[#82c4ae] shadow-xs' : 'text-gray-500'
              }`}
            >
              Semanal
            </button>
            <button
              onClick={() => setCalendarMode('mensual')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                calendarMode === 'mensual' ? 'bg-white dark:bg-[#121816] text-[#1e5e4b] dark:text-[#82c4ae] shadow-xs' : 'text-gray-500'
              }`}
            >
              Mensual
            </button>
          </div>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#1e5e4b] hover:bg-[#184a3b] text-white text-xs sm:text-sm font-bold shadow-md shadow-[#1e5e4b]/20 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" /> Agregar Evento
          </button>
        </div>
      </div>

      {/* Barra de Filtros */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-2xl bg-white dark:bg-[#18221f] border border-[#e2ddd3] dark:border-[#293a34]">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-gray-400 mr-1">Filtrar:</span>
          {['todos', 'clase', 'examen', 'entrega', 'pasantia', 'reunion_tutor'].map(t => (
            <button
              key={t}
              onClick={() => setFilterType(t)}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold capitalize transition-colors ${
                filterType === t 
                  ? 'bg-[#1e5e4b] text-white' 
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200'
              }`}
            >
              {t.replace('_', ' ')}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 text-xs font-bold text-gray-800 dark:text-gray-200">
          <span>Noviembre 2026</span>
          <span className="text-gray-400">(Hora La Paz)</span>
        </div>
      </div>

      {/* VISTA MENSUAL */}
      {calendarMode === 'mensual' && (
        <div className="bg-white dark:bg-[#18221f] rounded-2xl border border-[#e2ddd3] dark:border-[#293a34] p-4 sm:p-6 shadow-xs">
          {/* Días de la semana */}
          <div className="grid grid-cols-7 gap-1 text-center font-bold text-xs text-gray-400 pb-2 border-b border-gray-100 dark:border-gray-800">
            {weekDays.map(d => (
              <div key={d} className="py-1">{d}</div>
            ))}
          </div>

          {/* Cuadrícula de días */}
          <div className="grid grid-cols-7 gap-1 sm:gap-2 mt-2">
            {daysInMonth.map(dayNum => {
              const dayStr = `2026-11-${String(dayNum).padStart(2, '0')}`;
              const dayEvents = filteredEvents.filter(e => e.date === dayStr);
              const isToday = dayNum === 15; // Fecha de contexto actual (15 Nov 2026)

              return (
                <div
                  key={dayNum}
                  className={`min-h-[95px] sm:min-h-[110px] p-1.5 sm:p-2 rounded-xl border transition-all ${
                    isToday
                      ? 'bg-emerald-50/60 dark:bg-emerald-950/20 border-emerald-400 dark:border-emerald-700 shadow-xs ring-1 ring-emerald-400'
                      : 'bg-gray-50/50 dark:bg-[#121816]/50 border-gray-100 dark:border-gray-800/80 hover:bg-white dark:hover:bg-[#18221f]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className={`text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center ${
                      isToday ? 'bg-[#1e5e4b] text-white' : 'text-gray-700 dark:text-gray-300'
                    }`}>
                      {dayNum}
                    </span>
                    {isToday && (
                      <span className="hidden sm:inline text-[9px] font-bold text-[#1e5e4b] dark:text-[#82c4ae]">Hoy</span>
                    )}
                  </div>

                  <div className="space-y-1">
                    {dayEvents.slice(0, 2).map(ev => (
                      <div
                        key={ev.id}
                        className="px-1.5 py-0.5 rounded text-[10px] font-semibold truncate border"
                        style={{
                          backgroundColor: `${ev.color}15`,
                          borderColor: `${ev.color}40`,
                          color: ev.color
                        }}
                        title={`${ev.title} (${ev.startTime})`}
                      >
                        {ev.startTime !== '23:59' && <span className="opacity-75">{ev.startTime} </span>}
                        {ev.title}
                      </div>
                    ))}
                    {dayEvents.length > 2 && (
                      <div className="text-[9px] text-gray-400 pl-1 font-bold">
                        +{dayEvents.length - 2} más
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* VISTA SEMANAL / AGENDA DETALLADA */}
      {calendarMode === 'semanal' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {['Lunes 16 Nov', 'Martes 17 Nov', 'Miércoles 18 Nov', 'Jueves 19 Nov', 'Viernes 20 Nov'].map((dia, idx) => {
            const dayNum = 16 + idx;
            const dayStr = `2026-11-${dayNum}`;
            const dayEvents = filteredEvents.filter(e => e.date === dayStr);

            return (
              <div key={dia} className="p-4 rounded-2xl bg-white dark:bg-[#18221f] border border-[#e2ddd3] dark:border-[#293a34] space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-gray-100 dark:border-gray-800">
                  <span className="font-bold text-sm text-gray-900 dark:text-gray-100">{dia}</span>
                  <span className="text-xs text-gray-400">{dayEvents.length} eventos</span>
                </div>

                <div className="space-y-2">
                  {dayEvents.length === 0 ? (
                    <div className="py-4 text-center text-xs text-gray-400">Sin actividades programadas</div>
                  ) : (
                    dayEvents.map(ev => (
                      <div key={ev.id} className="p-2.5 rounded-xl bg-gray-50 dark:bg-[#121816] border border-gray-100 dark:border-gray-800 space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-xs text-gray-800 dark:text-gray-200">{ev.title}</span>
                          <span className="text-[10px] px-1.5 py-0.5 rounded capitalize font-medium bg-gray-200 dark:bg-gray-800">
                            {ev.type}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 text-[11px] text-gray-500 dark:text-gray-400">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3 text-emerald-600" /> {ev.startTime} - {ev.endTime}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-gray-400" /> {ev.location}
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal: Crear Evento */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <form 
            onSubmit={handleCreateEvent}
            className="w-full max-w-md bg-white dark:bg-[#18221f] rounded-3xl shadow-2xl border border-[#e2ddd3] dark:border-[#293a34] p-6 animate-in fade-in zoom-in-95 duration-150 space-y-4"
          >
            <div className="flex items-center justify-between pb-2 border-b border-gray-100 dark:border-gray-800">
              <h3 className="font-bold text-base text-gray-900 dark:text-gray-100">
                Nuevo Evento o Clase
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
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">Título del Evento</label>
              <input
                type="text"
                required
                placeholder="Ej. Clase Práctica de Soporte Enteral"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-[#121816] border border-gray-200 dark:border-gray-700 text-xs font-medium"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">Tipo de Evento</label>
                <select
                  value={eventType}
                  onChange={(e) => setEventType(e.target.value as EventType)}
                  className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-[#121816] border border-gray-200 dark:border-gray-700 text-xs font-medium capitalize"
                >
                  <option value="clase">Clase</option>
                  <option value="examen">Examen</option>
                  <option value="entrega">Entrega</option>
                  <option value="pasantia">Pasantía</option>
                  <option value="reunion_tutor">Reunión con Tutor</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">Fecha</label>
                <input
                  type="date"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-[#121816] border border-gray-200 dark:border-gray-700 text-xs font-medium"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">Hora Inicio</label>
                <input
                  type="time"
                  required
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-[#121816] border border-gray-200 dark:border-gray-700 text-xs font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">Hora Fin</label>
                <input
                  type="time"
                  required
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-[#121816] border border-gray-200 dark:border-gray-700 text-xs font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">Lugar / Aula</label>
              <input
                type="text"
                placeholder="Aula 302 o Sala de Postgrado"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-[#121816] border border-gray-200 dark:border-gray-700 text-xs font-medium"
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
                Guardar Evento
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
