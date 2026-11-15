'use client';

import React, { useState } from 'react';
import { initialThesisMilestones } from '@/lib/data/nutritionData';
import { ThesisMilestone } from '@/lib/types';
import { 
  GraduationCap, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Award, 
  BookOpen, 
  FileCheck, 
  Calendar,
  Sparkles
} from 'lucide-react';

export const TesisGradoView: React.FC = () => {
  const [milestones, setMilestones] = useState<ThesisMilestone[]>(initialThesisMilestones);

  // Progreso general ponderado
  const overallProgress = Math.round(
    milestones.reduce((acc, m) => acc + m.progressPercentage, 0) / (milestones.length || 1)
  );

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-200">
      
      {/* Encabezado */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-100 dark:border-gray-800">
        <div>
          <h2 className="text-2xl font-extrabold text-gray-900 dark:text-gray-100 flex items-center gap-2">
            <GraduationCap className="w-6 h-6 text-pink-500" />
            Tesis y Proyecto de Grado • Licenciatura
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
            Seguimiento de hitos, reuniones con el tutor y requisitos del último año para la obtención del título profesional.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-gray-500">Graduación prevista:</span>
          <span className="px-3 py-1 rounded-full bg-pink-100 text-pink-700 dark:bg-pink-950/60 dark:text-pink-300 text-xs font-extrabold">
            Febrero 2027 🎓
          </span>
        </div>
      </div>

      {/* Banner de Estado del Proyecto de Grado */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-600 via-teal-600 to-[#1e5e4b] text-white p-6 sm:p-7 shadow-lg shadow-emerald-600/15">
        <div className="relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-xs font-bold mb-3 backdrop-blur-xs">
            <Award className="w-3.5 h-3.5" />
            <span>Modalidad: Proyecto de Grado • Carrera de Nutrición y Salud Dietética UNIVIOR</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight">
            Adherencia Dietoterapéutica y Estado Nutricional en Pacientes con ERC en Hemodiálisis
          </h3>

          <p className="text-xs sm:text-sm text-emerald-100 mt-2 max-w-3xl leading-relaxed">
            Tutor de Tesis: <strong className="text-white">Dra. María Eugenia Quispe</strong> • Centro: Unidad de Hemodiálisis, Hospital de Clínicas de La Paz.
          </p>

          {/* Barra de progreso de titulación */}
          <div className="mt-5 pt-4 border-t border-white/20">
            <div className="flex items-center justify-between text-xs font-bold mb-2">
              <span>Avance Global de Titulación</span>
              <span className="text-amber-300 font-extrabold text-sm">{overallProgress}% completado</span>
            </div>
            <div className="w-full h-3 rounded-full bg-black/20 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-300 to-emerald-300 transition-all duration-500 rounded-full"
                style={{ width: `${overallProgress}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Tablero de Hitos y Fases */}
      <div className="space-y-4">
        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider px-1">
          Fases del Proyecto de Grado ({milestones.length})
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {milestones.map((m, index) => {
            const isDone = m.status === 'completado';
            const inProgress = m.status === 'en_progreso';

            return (
              <div
                key={m.id}
                className={`p-5 rounded-3xl border transition-all ${
                  isDone 
                    ? 'bg-white dark:bg-[#18221f] border-emerald-200 dark:border-emerald-800/60 shadow-2xs' 
                    : inProgress
                    ? 'bg-white dark:bg-[#18221f] border-pink-400 dark:border-pink-500/60 shadow-md shadow-pink-500/10 ring-1 ring-pink-400/30'
                    : 'bg-white/60 dark:bg-[#141526]/60 border-gray-100 dark:border-gray-800'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-xs font-bold flex items-center justify-center">
                      {index + 1}
                    </span>
                    <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                      {m.stageName}
                    </span>
                  </div>

                  <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                    isDone 
                      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                      : inProgress
                      ? 'bg-pink-100 text-pink-700 dark:bg-pink-950/60 dark:text-pink-300'
                      : 'bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400'
                  }`}>
                    {isDone ? '✓ Aprobado' : inProgress ? '⏳ En curso' : 'Pendiente'}
                  </span>
                </div>

                <h4 className="text-sm font-bold text-gray-900 dark:text-gray-100">
                  {m.title}
                </h4>

                {m.notes && (
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1.5 leading-relaxed">
                    {m.notes}
                  </p>
                )}

                {m.tutorFeedback && (
                  <div className="mt-3 p-2.5 rounded-xl bg-pink-50/60 dark:bg-pink-950/20 border border-pink-100 dark:border-pink-900/40 text-[11px] text-pink-800 dark:text-pink-300">
                    <strong>Comentario del Tutor:</strong> {m.tutorFeedback}
                  </div>
                )}

                <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-xs text-gray-400">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Límite: {new Date(m.dueDate).toLocaleDateString('es-BO', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
                  </span>
                  <span className="font-bold text-gray-700 dark:text-gray-300">
                    {m.progressPercentage}%
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
