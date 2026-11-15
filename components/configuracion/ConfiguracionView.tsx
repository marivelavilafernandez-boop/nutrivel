'use client';

import React from 'react';
import { useNutriStore } from '@/lib/store/useNutriStore';
import { 
  Settings, 
  User, 
  GraduationCap, 
  Briefcase, 
  Sun, 
  Moon, 
  Clock, 
  Download, 
  RotateCcw, 
  ShieldCheck, 
  Sparkles,
  CheckCircle2
} from 'lucide-react';

export const ConfiguracionView: React.FC = () => {
  const { 
    profile, 
    appMode, 
    setAppMode, 
    theme, 
    toggleTheme, 
    resetToDefaultData,
    tasks,
    subjects,
    notes,
    events
  } = useNutriStore();

  const handleExportBackup = () => {
    const backupData = {
      profile,
      subjects,
      tasks,
      notes,
      events,
      exportedAt: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `NutriPanel_Backup_Marivel_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 pb-12 max-w-4xl mx-auto animate-in fade-in duration-200">
      <div className="pb-2 border-b border-[#e2ddd3] dark:border-[#293a34]">
        <h2 className="text-2xl font-extrabold text-gray-900 dark:text-gray-100 flex items-center gap-2">
          <Settings className="w-6 h-6 text-[#1e5e4b]" />
          Configuración y Preferencias
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
          Perfil académico, alternancia de modos, copia de seguridad y apariencia.
        </p>
      </div>

      {/* Perfil de Marivel */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#18221f] border border-[#e2ddd3] dark:border-[#293a34] shadow-xs">
        <h3 className="font-bold text-base text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
          <User className="w-4 h-4 text-[#1e5e4b]" />
          Perfil de Usuario
        </h3>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-[#1e5e4b] text-white flex items-center justify-center font-bold text-2xl shadow-md shadow-[#1e5e4b]/20">
            MA
          </div>
          <div className="flex-1 space-y-1">
            <h4 className="text-lg font-extrabold text-gray-900 dark:text-gray-100">{profile.name}</h4>
            <p className="text-xs text-gray-500 dark:text-gray-400 font-mono">{profile.email}</p>
            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 font-semibold border border-emerald-200 dark:border-emerald-900">
                {profile.career}
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                {profile.university}
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-medium">
                Semestre {profile.currentSemester} de {profile.totalSemesters}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Interruptor de Modo de Aplicación */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#18221f] border border-[#e2ddd3] dark:border-[#293a34] shadow-xs space-y-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-bold text-base text-gray-900 dark:text-gray-100 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#e07a5f]" />
              Modo de Operación de NutriPanel
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 max-w-xl">
              Permite alternar entre la plataforma académica de estudio y la suite profesional de atención a pacientes. Todos los datos de ambos modos se conservan de forma permanente.
            </p>
          </div>

          <span className={`text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider ${
            appMode === 'student' ? 'bg-[#1e5e4b] text-white' : 'bg-[#e07a5f] text-white'
          }`}>
            {appMode === 'student' ? 'Modo Estudiante' : 'Modo Profesional'}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          {/* Opción Estudiante */}
          <div
            onClick={() => setAppMode('student')}
            className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
              appMode === 'student'
                ? 'border-[#1e5e4b] bg-emerald-50/50 dark:bg-emerald-950/20 shadow-sm'
                : 'border-gray-200 dark:border-gray-800 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2 font-bold text-sm text-[#1e5e4b] dark:text-[#82c4ae]">
                <GraduationCap className="w-4 h-4" />
                <span>Modo Estudiante (Activo)</span>
              </div>
              {appMode === 'student' && <CheckCircle2 className="w-4 h-4 text-[#1e5e4b]" />}
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
              Enfocado en materias, calculadora de notas para aprobar, tareas, exámenes, apuntes enriquecidos y calendario académico.
            </p>
          </div>

          {/* Opción Profesional */}
          <div
            onClick={() => setAppMode('professional')}
            className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
              appMode === 'professional'
                ? 'border-[#e07a5f] bg-orange-50/50 dark:bg-orange-950/20 shadow-sm'
                : 'border-gray-200 dark:border-gray-800 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2 font-bold text-sm text-[#e07a5f]">
                <Briefcase className="w-4 h-4" />
                <span>Modo Profesional (Licenciada)</span>
              </div>
              {appMode === 'professional' && <CheckCircle2 className="w-4 h-4 text-[#e07a5f]" />}
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
              Enfocado en CRM de pacientes, consultas, antropometría con gráficos, planes alimentarios clínicos y agenda.
            </p>
          </div>
        </div>
      </div>

      {/* Preferencias de Sistema */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#18221f] border border-[#e2ddd3] dark:border-[#293a34] shadow-xs space-y-4">
        <h3 className="font-bold text-base text-gray-900 dark:text-gray-100">
          Preferencias Regionales y Apariencia
        </h3>

        <div className="divide-y divide-gray-100 dark:divide-gray-800 text-xs">
          <div className="py-3 flex items-center justify-between">
            <div>
              <span className="font-bold text-gray-800 dark:text-gray-200 block">Tema Visual</span>
              <span className="text-gray-400">Alterna entre modo claro (Crema cálido) y oscuro</span>
            </div>
            <button
              onClick={toggleTheme}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gray-100 dark:bg-gray-800 font-bold"
            >
              {theme === 'light' ? (
                <>
                  <Moon className="w-4 h-4 text-gray-600" />
                  <span>Modo Oscuro</span>
                </>
              ) : (
                <>
                  <Sun className="w-4 h-4 text-amber-400" />
                  <span>Modo Claro</span>
                </>
              )}
            </button>
          </div>

          <div className="py-3 flex items-center justify-between">
            <div>
              <span className="font-bold text-gray-800 dark:text-gray-200 block">Zona Horaria Oficial</span>
              <span className="text-gray-400">Fijada para Bolivia y la universidad</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 font-mono font-bold">
              <Clock className="w-3.5 h-3.5 text-emerald-600" />
              <span>America/La_Paz (UTC-4)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Respaldo y Copia de Seguridad */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#18221f] border border-[#e2ddd3] dark:border-[#293a34] shadow-xs space-y-4">
        <h3 className="font-bold text-base text-gray-900 dark:text-gray-100 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          Seguridad y Respaldo de Datos
        </h3>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Descarga en cualquier momento una copia de seguridad completa en JSON con todas tus materias, tareas, notas y eventos.
        </p>

        <div className="flex flex-wrap items-center gap-3 pt-1">
          <button
            onClick={handleExportBackup}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#1e5e4b] hover:bg-[#184a3b] text-white text-xs font-bold shadow-md shadow-[#1e5e4b]/20 transition-all cursor-pointer"
          >
            <Download className="w-4 h-4" /> Exportar Copia de Seguridad (JSON)
          </button>

          <button
            onClick={() => {
              if (confirm('¿Deseas restablecer todos los datos de demostración iniciales de Marivel?')) {
                resetToDefaultData();
              }
            }}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 text-gray-700 dark:text-gray-300 text-xs font-bold transition-all cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" /> Restablecer Datos de Demostración
          </button>
        </div>
      </div>
    </div>
  );
};
