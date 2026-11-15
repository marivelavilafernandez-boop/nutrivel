'use client';

import React, { useState } from 'react';
import { useNutriStore } from '@/lib/store/useNutriStore';
import { 
  Search, 
  Sun, 
  Moon, 
  Bell, 
  Clock, 
  Sparkles, 
  GraduationCap, 
  X,
  CheckCircle2,
  Menu,
  Heart
} from 'lucide-react';

export const Header: React.FC = () => {
  const { 
    theme, 
    toggleTheme, 
    setIsSearchOpen, 
    notifications, 
    markNotificationRead, 
    clearAllNotifications,
    appMode,
    activeTab,
    setActiveTab,
    setIsMobileMenuOpen
  } = useNutriStore();

  const [showNotifications, setShowNotifications] = useState(false);
  const unreadCount = notifications.filter(n => !n.read).length;

  const tabTitles: Record<string, string> = {
    dashboard: 'Panel de Control (Dashboard)',
    materias: 'Mis Materias & Calculadora de Notas',
    trabajos: 'Trabajos, Tareas & Entregas',
    calendario: 'Calendario Académico y Turnos',
    apuntes: 'Apuntes Clínicos y Guías',
    calculadoras: 'Calculadoras Nutricionales (IMC, TMB, GET, Proteínas)',
    tbca: 'Tabla Boliviana de Composición de Alimentos (TBCA)',
    minutas: 'Armador de Minutas y Planes de Alimentación',
    casos: 'Casos Clínicos & Diagnóstico PES',
    tesis: 'Proyecto de Grado & Titulación UNIVIOR',
    apa: 'Generador de Citas Bibliográficas (APA 7)',
    profesional: 'Vista Previa • Consultorio Profesional',
    configuracion: 'Configuración y Respaldo',
    amor: 'Para Ti, con Todo Mi Amor 💖'
  };

  return (
    <header className="sticky top-0 z-30 h-16 bg-white/95 dark:bg-[#141526]/95 backdrop-blur-md border-b border-gray-100 dark:border-[#262840] px-3 sm:px-4 lg:px-8 flex items-center justify-between shadow-2xs">
      
      {/* Izquierda: Botón Menú Móvil + Breadcrumbs */}
      <div className="flex items-center gap-2.5 sm:gap-3">
        {/* Botón Hamburguesa Móvil */}
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="lg:hidden p-2 rounded-xl text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
          aria-label="Abrir menú"
        >
          <Menu className="w-5 h-5 stroke-[2.5]" />
        </button>

        <div>
          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-gray-400">
            <span>Nutrivel</span>
            <span>/</span>
            <span className="text-pink-600 dark:text-pink-400 capitalize">{activeTab}</span>
          </div>
          <h2 className="text-sm font-extrabold text-gray-900 dark:text-gray-100 hidden sm:block truncate max-w-[200px] md:max-w-none">
            {tabTitles[activeTab] || 'Dashboard'}
          </h2>
        </div>
      </div>

      {/* Centro: Buscador estilo pill como en el diseño */}
      <div className="flex-1 max-w-md mx-4 hidden md:block">
        <button
          onClick={() => setIsSearchOpen(true)}
          className="w-full flex items-center justify-between px-4 py-2 rounded-2xl bg-gray-50 dark:bg-[#1a1c30] border border-gray-200/70 dark:border-[#2b2e4c] text-xs text-gray-400 hover:border-pink-300 dark:hover:border-pink-500/50 transition-all cursor-pointer shadow-2xs"
        >
          <div className="flex items-center gap-2">
            <Search className="w-3.5 h-3.5 text-gray-400" />
            <span>Buscar materias, tareas, dietas, apuntes...</span>
          </div>
          <kbd className="px-1.5 py-0.5 text-[10px] bg-white dark:bg-[#141526] rounded-md border border-gray-200 dark:border-gray-700 text-gray-400 font-mono">
            Ctrl K
          </kbd>
        </button>
      </div>

      {/* Derecha: Hora local, Notificaciones, Modo, Perfil */}
      <div className="flex items-center gap-2 sm:gap-3">
        
        {/* Hora La Paz */}
        <div className="hidden xl:flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 px-2.5 py-1 rounded-xl bg-gray-50 dark:bg-[#1a1c30] border border-gray-100 dark:border-gray-800">
          <Clock className="w-3.5 h-3.5 text-pink-500" />
          <span className="font-medium">La Paz (UTC-4)</span>
        </div>

        {/* Botón Buscar Móvil */}
        <button
          onClick={() => setIsSearchOpen(true)}
          className="p-2 rounded-xl text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 md:hidden"
          title="Buscar"
        >
          <Search className="w-4 h-4" />
        </button>

        {/* Notificaciones */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 relative transition-colors cursor-pointer"
            title="Notificaciones"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-pink-500 ring-2 ring-white dark:ring-[#141526] animate-pulse" />
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white dark:bg-[#1a1c30] rounded-3xl shadow-2xl border border-gray-100 dark:border-[#2b2e4c] p-4 z-50 animate-in fade-in zoom-in-95 duration-100">
              <div className="flex items-center justify-between pb-2 border-b border-gray-100 dark:border-gray-800">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
                  Notificaciones ({unreadCount})
                </span>
                {unreadCount > 0 && (
                  <button
                    onClick={clearAllNotifications}
                    className="text-[11px] text-pink-600 dark:text-pink-400 hover:underline font-semibold"
                  >
                    Marcar todo leído
                  </button>
                )}
              </div>

              <div className="max-h-72 overflow-y-auto divide-y divide-gray-100 dark:divide-gray-800 my-2">
                {notifications.length === 0 ? (
                  <div className="py-6 text-center text-xs text-gray-400">
                    No tienes notificaciones pendientes
                  </div>
                ) : (
                  notifications.map(n => (
                    <div
                      key={n.id}
                      onClick={() => markNotificationRead(n.id)}
                      className={`py-2.5 px-2 rounded-xl cursor-pointer transition-colors ${
                        !n.read ? 'bg-pink-50/50 dark:bg-pink-950/20' : 'hover:bg-gray-50 dark:hover:bg-gray-800/50'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className="text-xs font-bold text-gray-800 dark:text-gray-200">
                          {n.title}
                        </span>
                        {!n.read && (
                          <span className="w-1.5 h-1.5 rounded-full bg-pink-500 shrink-0 mt-1" />
                        )}
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-2">
                        {n.message}
                      </p>
                      <span className="text-[10px] text-gray-400 mt-1 block">
                        {new Date(n.createdAt).toLocaleTimeString('es-BO', { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* Botón Romántico Especial: De tu Amor */}
        <button
          onClick={() => setActiveTab('amor')}
          className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full border transition-all cursor-pointer ${
            activeTab === 'amor'
              ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white border-pink-400 shadow-md shadow-pink-500/30'
              : 'bg-pink-50 dark:bg-pink-950/40 text-pink-600 dark:text-pink-300 border-pink-200 dark:border-pink-800/60 hover:bg-pink-100'
          }`}
          title="Ver mensaje de tu amor"
        >
          <Heart className={`w-3.5 h-3.5 ${activeTab === 'amor' ? 'fill-white' : 'fill-pink-500 text-pink-500 animate-pulse'}`} />
          <span className="text-xs font-extrabold hidden sm:inline">De tu Amor</span>
          <span className="text-xs">💖</span>
        </button>

        {/* Modo Oscuro / Claro */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
          title={theme === 'light' ? 'Activar Modo Oscuro' : 'Activar Modo Claro'}
        >
          {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4 text-amber-400" />}
        </button>

        {/* Avatar Usuario como en la esquina de la imagen de referencia */}
        <div className="flex items-center gap-2 pl-2 border-l border-gray-100 dark:border-gray-800">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-pink-500 to-rose-400 text-white flex items-center justify-center font-bold text-xs ring-2 ring-pink-500/20">
            MA
          </div>
          <span className="text-xs font-bold text-gray-800 dark:text-gray-200 hidden lg:inline">
            Marivel Avila
          </span>
        </div>

      </div>

    </header>
  );
};
