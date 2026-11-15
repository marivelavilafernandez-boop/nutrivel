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
  Sparkles,
  Calculator,
  Apple,
  ClipboardList,
  Stethoscope,
  BookmarkCheck,
  Heart,
  Scale,
  AlertTriangle
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const { activeTab, setActiveTab, appMode, setAppMode, profile, tasks } = useNutriStore();

  const pendingTasksCount = tasks.filter(t => t.status === 'pendiente' || t.status === 'en_progreso').length;

  const academicItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'materias', label: 'Mis Materias', icon: BookOpen },
    { id: 'trabajos', label: 'Tareas y Entregas', icon: CheckSquare, badge: pendingTasksCount },
    { id: 'calendario', label: 'Calendario & Turnos', icon: Calendar },
    { id: 'apuntes', label: 'Apuntes y Guías', icon: FileText }
  ];

  const nutritionTools = [
    { id: 'calculadoras', label: 'Calculadoras Clínicas', icon: Calculator },
    { id: 'antropometria', label: 'Antropometría & Grasa', icon: Scale },
    { id: 'tamizaje', label: 'Tamizaje MUST Hospital', icon: AlertTriangle },
    { id: 'anamnesis', label: 'Ficha Anamnesis (R24h)', icon: FileText },
    { id: 'tbca', label: 'Tabla de Alimentos (TBCA)', icon: Apple },
    { id: 'minutas', label: 'Armador de Minutas', icon: ClipboardList },
    { id: 'casos', label: 'Casos Clínicos (PES)', icon: Stethoscope },
    { id: 'tesis', label: 'Proyecto de Grado', icon: GraduationCap },
    { id: 'apa', label: 'Citas APA 7', icon: BookmarkCheck }
  ];

  return (
    <aside className="hidden lg:flex flex-col w-64 bg-[#141526] text-gray-300 border-r border-[#262840] shrink-0 h-screen sticky top-0 shadow-xl z-20">
      
      {/* 1. BRAND HEADER */}
      <div className="p-5 pb-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-pink-500 via-rose-500 to-emerald-400 text-white flex items-center justify-center font-bold text-lg shadow-md shadow-pink-500/20">
            🌿
          </div>
          <div>
            <h1 className="font-extrabold text-lg tracking-tight text-white flex items-center gap-1.5">
              Nutrivel
            </h1>
            <span className="text-[11px] font-medium text-pink-300/80 block">
              Nutrición & Dietética • UNIVIOR
            </span>
          </div>
        </div>
      </div>

      {/* 2. PROMINENT ACTION BUTTON (+ NUEVA TAREA / MINUTA) */}
      <div className="px-4 mb-3">
        <button
          onClick={() => setActiveTab('minutas')}
          className="w-full py-2.5 px-4 rounded-2xl bg-gradient-to-r from-[#d946ef] to-[#ec4899] text-white font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-lg shadow-pink-500/30 hover:opacity-95 hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>+ Nueva Minuta</span>
        </button>
      </div>

      {/* 3. SWITCHER DE MODO (Estudiante / Profesional) */}
      <div className="px-4 mb-2">
        <div className="p-2 rounded-2xl bg-[#1e2038] border border-[#2e3152]">
          <div className="grid grid-cols-2 gap-1 bg-[#141526] p-0.5 rounded-xl border border-[#2e3152]/60">
            <button
              onClick={() => setAppMode('student')}
              className={`text-[11px] py-1.5 rounded-lg font-semibold transition-all ${
                appMode === 'student' 
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-xs' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              🎓 Estudiante
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

      {/* 3.5 BOTÓN ESPECIAL DE TU AMOR */}
      <div className="px-4 mb-2">
        <button
          onClick={() => setActiveTab('amor')}
          className={`w-full p-2.5 rounded-2xl text-left border transition-all cursor-pointer flex items-center gap-2.5 ${
            activeTab === 'amor'
              ? 'bg-gradient-to-r from-pink-600 to-rose-600 border-pink-400 text-white shadow-lg shadow-pink-500/25'
              : 'bg-gradient-to-r from-pink-950/30 to-[#1e2038] border-pink-500/30 text-pink-200 hover:border-pink-400/60'
          }`}
        >
          <div className="w-7 h-7 rounded-full bg-pink-500/30 flex items-center justify-center shrink-0">
            <Heart className="w-3.5 h-3.5 text-pink-400 fill-pink-400 animate-pulse" />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-bold text-white flex items-center gap-1">
              <span>De tu Amor</span> <span>💖</span>
            </p>
            <p className="text-[10px] text-pink-300/80 truncate">Toca para ver tu sorpresa</p>
          </div>
        </button>
      </div>

      {/* 4. LISTA DE NAVEGACIÓN */}
      <nav className="flex-1 px-3 space-y-1 overflow-y-auto pr-1">
        
        {/* Grupo 1: Académico */}
        <div className="px-3 pt-2 pb-1 text-[10px] font-bold uppercase tracking-wider text-gray-500">
          Académico
        </div>
        {academicItems.map(item => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-3.5 py-2 rounded-xl font-medium text-xs transition-all cursor-pointer ${
                isActive
                  ? 'bg-[#252847] text-white font-bold border-l-4 border-pink-500 shadow-sm'
                  : 'text-gray-400 hover:bg-[#1c1e36] hover:text-gray-200'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-pink-400' : 'text-gray-400'}`} />
                <span>{item.label}</span>
              </div>
              {item.badge !== undefined && item.badge > 0 && (
                <span className="text-[10px] font-extrabold px-1.5 py-0.2 rounded-full bg-pink-500 text-white">
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}

        {/* Grupo 2: Herramientas de Nutrición Clínica */}
        <div className="px-3 pt-3 pb-1 text-[10px] font-bold uppercase tracking-wider text-pink-400/90 flex items-center justify-between">
          <span>Herramientas de Nutrición</span>
          <span className="text-[9px] px-1 py-0.2 rounded-sm bg-pink-500/20 text-pink-300 font-bold">Pro</span>
        </div>
        {nutritionTools.map(item => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-3.5 py-2 rounded-xl font-medium text-xs transition-all cursor-pointer ${
                isActive
                  ? 'bg-[#252847] text-white font-bold border-l-4 border-pink-500 shadow-sm'
                  : 'text-gray-400 hover:bg-[#1c1e36] hover:text-gray-200'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-pink-400' : 'text-pink-300/70'}`} />
                <span>{item.label}</span>
              </div>
            </button>
          );
        })}

        {/* Ajustes */}
        <div className="pt-3 px-3 pb-1 text-[10px] font-bold uppercase tracking-wider text-gray-500">
          Ajustes
        </div>
        <button
          onClick={() => setActiveTab('configuracion')}
          className={`w-full flex items-center gap-2.5 px-3.5 py-2 rounded-xl font-medium text-xs transition-all cursor-pointer ${
            activeTab === 'configuracion'
              ? 'bg-[#252847] text-white font-bold border-l-4 border-pink-500'
              : 'text-gray-400 hover:bg-[#1c1e36] hover:text-gray-200'
          }`}
        >
          <Settings className="w-3.5 h-3.5 text-gray-400" />
          <span>Configuración & Respaldo</span>
        </button>
      </nav>

      {/* 5. TARJETA DE PERFIL (Marivel Avila) */}
      <div className="p-3.5 border-t border-[#262840] bg-[#101120]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-pink-500 to-rose-400 text-white flex items-center justify-center font-bold text-xs ring-2 ring-pink-500/30">
            MA
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-bold text-white truncate">Marivel Avila F.</p>
            <p className="text-[10px] text-pink-300/80 truncate">Estudiante de Nutrición • UNIVIOR</p>
          </div>
        </div>
      </div>

    </aside>
  );
};
