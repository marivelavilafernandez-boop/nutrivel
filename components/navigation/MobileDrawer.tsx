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
  Settings, 
  Plus,
  Sparkles,
  Calculator,
  Apple,
  ClipboardList,
  Stethoscope,
  BookmarkCheck,
  Heart,
  X,
  Briefcase,
  Scale,
  AlertTriangle,
  FlaskConical,
  ClipboardCheck,
  Flame,
  Droplets,
  FileCheck2
} from 'lucide-react';

export const MobileDrawer: React.FC = () => {
  const { 
    isMobileMenuOpen, 
    setIsMobileMenuOpen, 
    activeTab, 
    setActiveTab, 
    appMode, 
    setAppMode, 
    tasks 
  } = useNutriStore();

  if (!isMobileMenuOpen) return null;

  const pendingTasksCount = tasks.filter(t => t.status === 'pendiente' || t.status === 'en_progreso').length;

  const handleSelectTab = (tabId: string) => {
    setActiveTab(tabId);
    setIsMobileMenuOpen(false);
  };

  const academicItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'materias', label: 'Mis Materias', icon: BookOpen },
    { id: 'trabajos', label: 'Tareas y Entregas', icon: CheckSquare, badge: pendingTasksCount },
    { id: 'calendario', label: 'Calendario & Turnos', icon: Calendar },
    { id: 'apuntes', label: 'Apuntes y Guías', icon: FileText }
  ];

  const nutritionTools = [
    { id: 'calculadoras', label: 'Calculadoras Clínicas', icon: Calculator },
    { id: 'requerimiento', label: 'Requerimiento Multi-Fórmula', icon: Flame },
    { id: 'hidrico', label: 'Requerimiento Hídrico', icon: Droplets },
    { id: 'fichaclinica', label: 'Ficha Clínica Integral', icon: FileCheck2 },
    { id: 'bioquimica', label: 'Ficha Bioquímica (Lab)', icon: FlaskConical },
    { id: 'frecuencia', label: 'Frecuencia de Consumo (FFQ)', icon: ClipboardCheck },
    { id: 'antropometria', label: 'Antropometría & Grasa', icon: Scale },
    { id: 'tamizaje', label: 'Tamizaje MUST Hospital', icon: AlertTriangle },
    { id: 'anamnesis', label: 'Ficha Anamnesis (R24h)', icon: FileText },
    { id: 'tbca', label: 'Tabla Alimentos (TBCA)', icon: Apple },
    { id: 'minutas', label: 'Armador de Minutas', icon: ClipboardList },
    { id: 'casos', label: 'Casos Clínicos (PES)', icon: Stethoscope },
    { id: 'tesis', label: 'Proyecto de Grado', icon: GraduationCap },
    { id: 'apa', label: 'Citas APA 7', icon: BookmarkCheck }
  ];

  return (
    <div className="lg:hidden fixed inset-0 z-50 flex animate-in fade-in duration-200">
      
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Slide-over panel */}
      <div className="relative w-80 max-w-[85vw] bg-[#141526] text-gray-200 h-full flex flex-col shadow-2xl z-10 animate-in slide-in-from-left duration-200">
        
        {/* 1. Header con Brand y botón Cerrar */}
        <div className="p-4 border-b border-[#262840] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-pink-500 via-rose-500 to-emerald-400 text-white flex items-center justify-center font-bold text-base shadow-md shadow-pink-500/20">
              🌿
            </div>
            <div>
              <h2 className="font-extrabold text-base tracking-tight text-white flex items-center gap-1.5">
                Nutrivel
              </h2>
              <span className="text-[10px] font-medium text-pink-300/80 block">
                Nutrición & Dietética • UNIVIOR
              </span>
            </div>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="p-1.5 rounded-xl bg-gray-800/60 text-gray-400 hover:text-white hover:bg-gray-800"
            aria-label="Cerrar menú"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 2. TARJETA ESPECIAL ROMÁNTICA: "DE TU AMOR 💖" */}
        <div className="p-3">
          <button
            onClick={() => handleSelectTab('amor')}
            className={`w-full p-3 rounded-2xl text-left border transition-all cursor-pointer relative overflow-hidden group ${
              activeTab === 'amor'
                ? 'bg-gradient-to-r from-pink-600 to-rose-600 border-pink-400 text-white shadow-lg shadow-pink-500/30'
                : 'bg-gradient-to-r from-pink-950/40 via-rose-950/30 to-[#1e2038] border-pink-500/40 text-pink-200 hover:border-pink-400'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-pink-500/30 flex items-center justify-center shrink-0">
                <Heart className="w-4 h-4 text-pink-400 fill-pink-400 animate-pulse" />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-extrabold text-white flex items-center gap-1">
                  <span>De tu Amor</span>
                  <span>💖</span>
                </div>
                <p className="text-[10px] text-pink-200/90 truncate">
                  Un mensaje especial para ti • Toca aquí
                </p>
              </div>
            </div>
          </button>
        </div>

        {/* 3. Botón de acción rápida: + Nueva Minuta */}
        <div className="px-3 pb-2">
          <button
            onClick={() => handleSelectTab('minutas')}
            className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-[#d946ef] to-[#ec4899] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md shadow-pink-500/20 active:scale-98 transition-all"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>+ Nueva Minuta</span>
          </button>
        </div>

        {/* 4. Switcher Modo */}
        <div className="px-3 pb-3">
          <div className="grid grid-cols-2 gap-1 bg-[#101120] p-1 rounded-xl border border-[#262840]">
            <button
              onClick={() => setAppMode('student')}
              className={`text-[11px] py-1 rounded-lg font-semibold transition-all ${
                appMode === 'student'
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              🎓 Estudiante
            </button>
            <button
              onClick={() => handleSelectTab('profesional')}
              className={`text-[11px] py-1 rounded-lg font-semibold transition-all flex items-center justify-center gap-1 ${
                appMode === 'professional' || activeTab === 'profesional'
                  ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Sparkles className="w-2.5 h-2.5" /> Profesional
            </button>
          </div>
        </div>

        {/* 5. Lista de Navegación con Scroll */}
        <div className="flex-1 overflow-y-auto px-3 space-y-1">
          
          {/* Académico */}
          <div className="px-3 pt-2 pb-1 text-[10px] font-bold uppercase tracking-wider text-gray-500">
            Académico
          </div>
          {academicItems.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleSelectTab(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-[#252847] text-white font-bold border-l-4 border-pink-500'
                    : 'text-gray-300 hover:bg-[#1c1e36]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-pink-400' : 'text-gray-400'}`} />
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

          {/* Herramientas de Nutrición */}
          <div className="px-3 pt-3 pb-1 text-[10px] font-bold uppercase tracking-wider text-pink-400 flex items-center justify-between">
            <span>Herramientas de Nutrición</span>
            <span className="text-[9px] px-1 rounded-sm bg-pink-500/20 text-pink-300 font-bold">Pro</span>
          </div>
          {nutritionTools.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleSelectTab(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-[#252847] text-white font-bold border-l-4 border-pink-500'
                    : 'text-gray-300 hover:bg-[#1c1e36]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-pink-400' : 'text-pink-300/70'}`} />
                  <span>{item.label}</span>
                </div>
              </button>
            );
          })}

          {/* Ajustes */}
          <div className="px-3 pt-3 pb-1 text-[10px] font-bold uppercase tracking-wider text-gray-500">
            Ajustes
          </div>
          <button
            onClick={() => handleSelectTab('configuracion')}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
              activeTab === 'configuracion'
                ? 'bg-[#252847] text-white font-bold border-l-4 border-pink-500'
                : 'text-gray-300 hover:bg-[#1c1e36]'
            }`}
          >
            <Settings className="w-4 h-4 text-gray-400" />
            <span>Configuración & Respaldo</span>
          </button>

        </div>

        {/* 6. Footer con Perfil */}
        <div className="p-3 border-t border-[#262840] bg-[#101120]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-pink-500 to-rose-400 text-white flex items-center justify-center font-bold text-xs ring-2 ring-pink-500/30">
              MA
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold text-white truncate">Marivel Avila F.</p>
              <p className="text-[10px] text-pink-300/80 truncate">Nutrición & Dietética • UNIVIOR</p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
