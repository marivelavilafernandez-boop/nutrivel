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
  Plus,
  Sparkles
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const { activeTab, setActiveTab, appMode, setAppMode, profile, tasks } = useNutriStore();

  const pendingTasksCount = tasks.filter(t => t.status === 'pendiente' || t.status === 'en_progreso').length;

  const studentNavItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'materias', label: 'Mis Materias', icon: BookOpen },
    { id: 'trabajos', label: 'Trabajos y Tareas', icon: CheckSquare, badge: pendingTasksCount },
    { id: 'calendario', label: 'Calendario', icon: Calendar },
    { id: 'apuntes', label: 'Apuntes y Guías', icon: FileText }
  ];

  return (
    <aside className="hidden lg:flex flex-col w-64 bg-[#141526] text-gray-300 border-r border-[#262840] shrink-0 h-screen sticky top-0 shadow-xl z-20">
      
      {/* 1. BRAND HEADER */}
      <div className="p-5 pb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-pink-500 via-rose-500 to-emerald-400 text-white flex items-center justify-center font-bold text-lg shadow-md shadow-pink-500/20">
            🌿
          </div>
          <div>
            <h1 className="font-extrabold text-lg tracking-tight text-white flex items-center gap-1.5">
              Nutrivel
            </h1>
            <span className="text-[11px] font-medium text-pink-300/80 block">
              Nutrición & Dietética • UMSA
            </span>
          </div>
        </div>
      </div>

      {/* 2. PROMINENT ACTION BUTTON (+ CREATE NEW como en la imagen de referencia) */}
      <div className="px-4 mb-4">
        <button
          onClick={() => setActiveTab('trabajos')}
          className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-[#d946ef] to-[#ec4899] text-white font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-lg shadow-pink-500/30 hover:opacity-95 hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>+ Nueva Tarea</span>
        </button>
      </div>

      {/* 3. SWITCHER DE MODO (Estudiante / Próximamente Profesional) */}
      <div className="px-4 mb-3">
        <div className="p-2.5 rounded-2xl bg-[#1e2038] border border-[#2e3152]">
          <div className="flex items-center justify-between mb-1.5 px-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
              Modo Activo
            </span>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
              appMode === 'student' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-pink-500/20 text-pink-300'
            }`}>
              {appMode === 'student' ? '🎓 Estudiante' : '👩‍⚕️ Profesional'}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-1 bg-[#141526] p-0.5 rounded-xl border border-[#2e3152]/60">
            <button
              onClick={() => setAppMode('student')}
              className={`text-[11px] py-1.5 rounded-lg font-semibold transition-all ${
                appMode === 'student' 
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-xs' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Estudiante
            </button>
            <button
              onClick={() => setActiveTab('profesional')}
              className={`text-[11px] py-1.5 rounded-lg font-semibold transition-all flex items-center justify-center gap-1 ${
                appMode === 'professional' || activeTab === 'profesional'
                  ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-xs' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Sparkles className="w-2.5 h-2.5" /> Profesional
            </button>
          </div>
        </div>
      </div>

      {/* 4. LISTA DE NAVEGACIÓN */}
      <nav className="flex-1 px-3 space-y-1 overflow-y-auto">
        <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-gray-400">
          Panel Académico
        </div>
        {studentNavItems.map(item => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl font-medium text-xs transition-all cursor-pointer ${
                isActive
                  ? 'bg-[#252847] text-white font-bold border-l-4 border-pink-500 shadow-sm'
                  : 'text-gray-400 hover:bg-[#1c1e36] hover:text-gray-200'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 ${isActive ? 'text-pink-400' : 'text-gray-400'}`} />
                <span>{item.label}</span>
              </div>
              {item.badge !== undefined && item.badge > 0 && (
                <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded-full bg-pink-500 text-white">
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}

        <div className="pt-4 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-gray-400">
          Ajustes
        </div>
        <button
          onClick={() => setActiveTab('configuracion')}
          className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl font-medium text-xs transition-all cursor-pointer ${
            activeTab === 'configuracion'
              ? 'bg-[#252847] text-white font-bold border-l-4 border-pink-500'
              : 'text-gray-400 hover:bg-[#1c1e36] hover:text-gray-200'
          }`}
        >
          <Settings className="w-4 h-4 text-gray-400" />
          <span>Configuración</span>
        </button>
      </nav>

      {/* 5. TARJETA DE PERFIL (Marivel Avila) */}
      <div className="p-4 border-t border-[#262840] bg-[#101120]">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-pink-500 to-rose-400 text-white flex items-center justify-center font-bold text-xs ring-2 ring-pink-500/30">
            MA
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-bold text-white truncate">Marivel Avila F.</p>
            <p className="text-[10px] text-pink-300/80 truncate">Futura Lic. en Nutrición</p>
          </div>
        </div>
      </div>

    </aside>
  );
};
