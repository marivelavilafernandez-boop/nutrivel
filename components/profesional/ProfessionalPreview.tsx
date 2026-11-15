'use client';

import React from 'react';
import { useNutriStore } from '@/lib/store/useNutriStore';
import { 
  Briefcase, 
  Users, 
  Activity, 
  UtensilsCrossed, 
  Calendar, 
  DollarSign, 
  Sparkles, 
  Lock, 
  ArrowRight,
  ShieldCheck,
  FileCheck
} from 'lucide-react';

export const ProfessionalPreview: React.FC = () => {
  const { appMode, setAppMode, setActiveTab } = useNutriStore();

  const isUnlocked = appMode === 'professional';

  const modules = [
    { title: 'CRM Pacientes', desc: 'Fichas clínicas completas, antecedentes, alergias, medicación y notas privadas protegidas.', icon: Users, count: '0 pacientes' },
    { title: 'Historial de Consultas', desc: 'Anamnesis nutricional, recordatorio de 24h, notas de evolución y diagnósticos.', icon: Activity, count: 'Historial digital' },
    { title: 'Antropometría y Gráficos', desc: 'Control de peso, perímetros, pliegues cutáneos, % grasa y masa muscular con evolución.', icon: Activity, count: 'Gráficos visuales' },
    { title: 'Creador de Planes Nutricionales', desc: 'Planes dietéticos personalizados, cálculo de macros, lista de compras y exportación a PDF.', icon: UtensilsCrossed, count: 'Exportable a PDF' },
    { title: 'Agenda y Citas', desc: 'Control de asistencia, horarios de atención y recordatorios automáticos por WhatsApp.', icon: Calendar, count: 'Sincronizado' },
    { title: 'Finanzas y Cobros Simples', desc: 'Registro de cobros por consulta, paquetes nutricionales, ingresos mensuales y recibos.', icon: DollarSign, count: 'Balance en BOB' }
  ];

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-200">
      {/* Banner Principal */}
      <div className={`p-6 sm:p-8 rounded-3xl border relative overflow-hidden transition-all ${
        isUnlocked 
          ? 'bg-linear-to-r from-[#e07a5f] to-[#d45b3a] text-white shadow-xl' 
          : 'bg-white dark:bg-[#18221f] border-[#e2ddd3] dark:border-[#293a34]'
      }`}>
        <div className="max-w-2xl relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold mb-3 bg-white/20 dark:bg-gray-800 text-white dark:text-gray-100 border border-white/30 dark:border-gray-700">
            {isUnlocked ? <Sparkles className="w-3.5 h-3.5" /> : <Lock className="w-3.5 h-3.5" />}
            <span>Fase 2 • Herramienta de Consulta Nutricional</span>
          </div>

          <h2 className={`text-2xl sm:text-3xl font-extrabold ${isUnlocked ? 'text-white' : 'text-gray-900 dark:text-gray-100'}`}>
            {isUnlocked ? 'Consultorio Profesional Activo' : 'Modo Profesional (Próximamente)'}
          </h2>

          <p className={`mt-2 text-sm sm:text-base ${isUnlocked ? 'text-orange-100' : 'text-gray-500 dark:text-gray-400'}`}>
            {isUnlocked
              ? 'Has activado el Modo Profesional. Aquí administrarás tus pacientes privados, consultas clínicas, evaluaciones antropométricas y planes alimentarios con tu marca personal.'
              : 'Diseñado para activarse una vez que defiendas tu tesis y obtengas tu título de Licenciada en Nutrición. Todos tus datos, apuntes y materias del modo estudiante se conservarán intactos.'}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            {!isUnlocked ? (
              <button
                onClick={() => setAppMode('professional')}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#e07a5f] hover:bg-[#d45b3a] text-white text-xs sm:text-sm font-bold shadow-md shadow-[#e07a5f]/20 transition-all cursor-pointer"
              >
                <Sparkles className="w-4 h-4" /> Desbloquear y Probar Modo Profesional
              </button>
            ) : (
              <button
                onClick={() => setAppMode('student')}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white text-[#e07a5f] text-xs sm:text-sm font-bold shadow-md hover:bg-orange-50 transition-all cursor-pointer"
              >
                Volver a Modo Estudiante
              </button>
            )}

            <button
              onClick={() => setActiveTab('configuracion')}
              className="text-xs font-semibold underline text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              Ver configuración y permisos
            </button>
          </div>
        </div>
      </div>

      {/* Módulos de la Suite Profesional */}
      <div>
        <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
          <Briefcase className="w-5 h-5 text-[#e07a5f]" />
          Módulos de Práctica Profesional
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {modules.map((m, i) => {
            const Icon = m.icon;
            return (
              <div
                key={i}
                className="p-5 rounded-2xl bg-white dark:bg-[#18221f] border border-[#e2ddd3] dark:border-[#293a34] shadow-xs hover:shadow-md transition-shadow relative overflow-hidden flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-2.5 rounded-xl bg-[#e07a5f]/10 text-[#e07a5f] dark:text-[#f39c82]">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400">
                      {m.count}
                    </span>
                  </div>

                  <h4 className="font-bold text-base text-gray-900 dark:text-gray-100">
                    {m.title}
                  </h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">
                    {m.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-xs">
                  <span className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" /> Esquema Listo
                  </span>
                  <span className="text-gray-400">Fase 2</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
