'use client';

import React, { useState } from 'react';
import { useNutriStore } from '@/lib/store/useNutriStore';
import { 
  Search, 
  Sun, 
  Moon, 
  Bell, 
  Clock, 
  Settings, 
  Sparkles, 
  GraduationCap, 
  CheckCircle2, 
  X
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
    setAppMode,
    setActiveTab
  } = useNutriStore();

  const [showNotifications, setShowNotifications] = useState(false);
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="sticky top-0 z-30 h-16 bg-white/90 dark:bg-[#18221f]/90 backdrop-blur-md border-b border-[#e2ddd3] dark:border-[#293a34] px-4 lg:px-8 flex items-center justify-between">
      {/* Izquierda: Buscador Global */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setIsSearchOpen(true)}
          className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-xl bg-[#f0ebe1] dark:bg-[#1e2b26] border border-[#e2ddd3] dark:border-[#293a34] text-xs text-gray-500 dark:text-gray-400 hover:border-gray-400 transition-colors cursor-pointer"
        >
          <Search className="w-3.5 h-3.5 text-gray-400" />
          <span className="hidden sm:inline">Buscar materias, tareas, apuntes...</span>
          <span className="sm:hidden">Buscar...</span>
          <kbd className="hidden md:inline px-1.5 py-0.5 text-[10px] bg-white dark:bg-[#121816] rounded border border-gray-200 dark:border-gray-700 text-gray-400">
            Ctrl K
          </kbd>
        </button>

        {/* Zona Horaria */}
        <div className="hidden xl:flex items-center gap-1.5 text-xs text-gray-400 border-l border-gray-200 dark:border-gray-800 pl-3">
          <Clock className="w-3.5 h-3.5 text-emerald-600" />
          <span>La Paz (UTC-4)</span>
        </div>
      </div>

      {/* Derecha: Notificaciones, Modo, Tema, Perfil */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Badge de Modo */}
        <div className="flex items-center">
          {appMode === 'student' ? (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-[#1e5e4b]/10 text-[#1e5e4b] dark:bg-[#2e7d62]/20 dark:text-[#82c4ae] border border-[#1e5e4b]/20">
              <GraduationCap className="w-3.5 h-3.5" />
              <span className="hidden xs:inline">Modo Estudiante</span>
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-[#e07a5f]/15 text-[#e07a5f] border border-[#e07a5f]/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span className="hidden xs:inline">Modo Profesional</span>
            </span>
          )}
        </div>

        {/* Notificaciones */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-[#f0ebe1] dark:hover:bg-[#1e2b26] relative transition-colors"
            title="Notificaciones"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#e07a5f] animate-pulse" />
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white dark:bg-[#18221f] rounded-2xl shadow-xl border border-[#e2ddd3] dark:border-[#293a34] p-3 z-50 animate-in fade-in zoom-in-95 duration-100">
              <div className="flex items-center justify-between pb-2 border-b border-gray-100 dark:border-gray-800">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
                  Notificaciones ({unreadCount} sin leer)
                </span>
                {unreadCount > 0 && (
                  <button
                    onClick={clearAllNotifications}
                    className="text-[11px] text-[#1e5e4b] dark:text-[#82c4ae] hover:underline"
                  >
                    Marcar todo leído
                  </button>
                )}
              </div>
              <div className="max-h-72 overflow-y-auto divide-y divide-gray-100 dark:divide-gray-800 py-1">
                {notifications.map(n => (
                  <div
                    key={n.id}
                    onClick={() => {
                      markNotificationRead(n.id);
                      if (n.linkTab) setActiveTab(n.linkTab);
                      setShowNotifications(false);
                    }}
                    className={`p-2.5 rounded-xl text-left cursor-pointer transition-colors ${
                      n.read ? 'opacity-70 hover:bg-gray-50 dark:hover:bg-gray-900/40' : 'bg-[#1e5e4b]/5 dark:bg-[#2e7d62]/10 hover:bg-[#1e5e4b]/10'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-xs font-semibold text-gray-900 dark:text-gray-100">{n.title}</span>
                      {!n.read && <span className="w-1.5 h-1.5 rounded-full bg-[#e07a5f] shrink-0 mt-1" />}
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-2">{n.message}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Toggle Tema Claro / Oscuro */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-[#f0ebe1] dark:hover:bg-[#1e2b26] transition-colors"
          title={theme === 'light' ? 'Cambiar a modo oscuro' : 'Cambiar a modo claro'}
        >
          {theme === 'light' ? <Moon className="w-4 h-4 text-gray-700" /> : <Sun className="w-4 h-4 text-amber-400" />}
        </button>

        {/* Configuración rápida en móvil */}
        <button
          onClick={() => setActiveTab('configuracion')}
          className="lg:hidden p-2 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-[#f0ebe1] dark:hover:bg-[#1e2b26]"
          title="Ajustes"
        >
          <Settings className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};
