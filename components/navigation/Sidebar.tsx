'use client';

import React from 'react';
import { useNutriStore } from '@/lib/store/useNutriStore';
import { 
  LayoutDashboard, 
  BookOpen, 
  CheckSquare, 
  Calendar, 
  FileText, 
  GraduationCap, 
  Briefcase, 
  Settings, 
  Flame,
  Sparkles
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const { activeTab, setActiveTab, appMode, setAppMode, profile, tasks } = useNutriStore();

  const pendingTasksCount = tasks.filter(t => t.status === 'pendiente' || t.status === 'en_progreso').length;

  const studentNavItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'materias', label: 'Materias', icon: BookOpen },
    { id: 'trabajos', label: 'Trabajos y Tareas', icon: CheckSquare, badge: pendingTasksCount },
    { id: 'calendario', label: 'Calendario', icon: Calendar },
    { id: 'apuntes', label: 'Apuntes y Guías', icon: FileText }
  ];

  return (
    <aside className="hidden lg:flex flex-col w-64 bg-white dark:bg-[#18221f] border-r border-[#e2ddd3] dark:border-[#293a34] shrink-0 h-screen sticky top-0">
      {/* Brand Header */}
      <div className="p-5 border-b border-[#e2ddd3] dark:border-[#293a34] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#1e5e4b] dark:bg-[#2e7d62] text-white flex items-center justify-center font-bold text-lg shadow-md shadow-[#1e5e4b]/20">
            🌿
          </div>
          <div>
            <h1 className="font-bold text-base tracking-tight text-gray-900 dark:text-gray-100 flex items-center gap-1.5">
              Nutrivel
            </h1>
            <span className="text-[11px] font-medium text-gray-400 block">
              {appMode === 'student' ? 'Modo Estudiante' : 'Modo Profesional'}
            </span>
          </div>
        </div>
      </div>

      {/* Switcher de Modo Rápido */}
      <div className="p-3 mx-3 my-2 rounded-xl bg-[#f0ebe1] dark:bg-[#1e2b26] border border-[#e2ddd3] dark:border-[#293a34]">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
            Modo Actual
          </span>
          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${appMode === 'student' ? 'bg-[#1e5e4b] text-white' : 'bg-[#e07a5f] text-white'}`}>
            {appMode === 'student' ? 'Académico' : 'Clínico'}
          </span>
        </div>
        <div className="grid grid-cols-2 gap-1 bg-white dark:bg-[#121816] p-0.5 rounded-lg border border-[#e2ddd3]/60 dark:border-[#293a34]">
          <button
            onClick={() => setAppMode('student')}
            className={`text-xs py-1.5 rounded-md font-medium transition-all ${
              appMode === 'student' 
                ? 'bg-[#1e5e4b] text-white shadow-xs' 
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900'
            }`}
          >
            Estudiante
          </button>
          <button
            onClick={() => {
              setActiveTab('profesional');
            }}
            className={`text-xs py-1.5 rounded-md font-medium transition-all flex items-center justify-center gap-1 ${
              appMode === 'professional' || activeTab === 'profesional'
                ? 'bg-[#e07a5f] text-white shadow-xs' 
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900'
            }`}
          >
            <Sparkles className="w-3 h-3" /> Profesional
          </button>
        </div>
      </div>

      {/* Navegación Principal */}
      <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto">
        <div className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-gray-400">
          Académico (Último Año)
        </div>
        {studentNavItems.map(item => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all ${
                isActive
                  ? 'bg-[#1e5e4b] text-white shadow-sm shadow-[#1e5e4b]/20 font-semibold'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-[#f0ebe1] dark:hover:bg-[#1e2b26]'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-gray-500 dark:text-gray-400'}`} />
                <span>{item.label}</span>
              </div>
              {item.badge !== undefined && item.badge > 0 && (
                <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                  isActive 
                    ? 'bg-white/20 text-white' 
                    : 'bg-[#e07a5f]/15 text-[#e07a5f] dark:text-[#f39c82]'
                }`}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}

        <div className="pt-4 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-gray-400">
          Consultorio (Fase 2)
        </div>
        <button
          onClick={() => setActiveTab('profesional')}
          className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all ${
            activeTab === 'profesional'
              ? 'bg-[#e07a5f] text-white font-semibold'
              : 'text-gray-700 dark:text-gray-300 hover:bg-[#f0ebe1] dark:hover:bg-[#1e2b26]'
          }`}
        >
          <div className="flex items-center gap-3">
            <Briefcase className="w-4 h-4 text-gray-400" />
            <span>Consultorio CRM</span>
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-md bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300">
            Pronto
          </span>
        </button>
      </nav>

      {/* Footer Profile & Streak */}
      <div className="p-3 border-t border-[#e2ddd3] dark:border-[#293a34] space-y-2">
        {/* Racha Card */}
        <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-orange-50 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-900/50">
          <div className="flex items-center gap-2">
            <Flame className="w-4 h-4 text-[#e07a5f] animate-pulse" />
            <span className="text-xs font-semibold text-orange-900 dark:text-orange-200">Racha de estudio</span>
          </div>
          <span className="text-xs font-bold text-[#e07a5f]">{profile.studyStreakDays} días 🔥</span>
        </div>

        {/* Perfil & Config */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#1e5e4b] text-white flex items-center justify-center font-bold text-xs ring-2 ring-[#1e5e4b]/20">
              MA
            </div>
            <div className="overflow-hidden">
              <div className="text-xs font-bold text-gray-800 dark:text-gray-200 truncate">Marivel Avila</div>
              <div className="text-[10px] text-gray-400 truncate">Semestre IX • UMSA</div>
            </div>
          </div>
          <button
            onClick={() => setActiveTab('configuracion')}
            className={`p-2 rounded-xl hover:bg-[#f0ebe1] dark:hover:bg-[#1e2b26] transition-colors ${
              activeTab === 'configuracion' ? 'text-[#1e5e4b] bg-[#f0ebe1] dark:bg-[#1e2b26]' : 'text-gray-400'
            }`}
            title="Configuración"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};
