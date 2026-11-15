'use client';

import React from 'react';
import { useNutriStore } from '@/lib/store/useNutriStore';
import { 
  LayoutDashboard, 
  Calculator, 
  ClipboardList, 
  Heart, 
  Menu 
} from 'lucide-react';

export const MobileNav: React.FC = () => {
  const { 
    activeTab, 
    setActiveTab, 
    tasks, 
    isMobileMenuOpen, 
    setIsMobileMenuOpen 
  } = useNutriStore();
  
  const pendingCount = tasks.filter(t => t.status === 'pendiente' || t.status === 'en_progreso').length;

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-[#141526]/95 backdrop-blur-md border-t border-gray-200/80 dark:border-[#262840] px-1 py-1.5 flex items-center justify-around shadow-xl">
      
      {/* 1. Inicio / Dashboard */}
      <button
        onClick={() => setActiveTab('dashboard')}
        className={`flex-1 flex flex-col items-center justify-center py-1 px-1 rounded-xl transition-all ${
          activeTab === 'dashboard'
            ? 'text-pink-600 dark:text-pink-400 font-bold'
            : 'text-gray-500 dark:text-gray-400 hover:text-gray-800'
        }`}
      >
        <LayoutDashboard className={`w-5 h-5 ${activeTab === 'dashboard' ? 'stroke-[2.5]' : ''}`} />
        <span className="text-[10px] mt-0.5">Inicio</span>
      </button>

      {/* 2. Calculadoras Clínicas */}
      <button
        onClick={() => setActiveTab('calculadoras')}
        className={`flex-1 flex flex-col items-center justify-center py-1 px-1 rounded-xl transition-all ${
          activeTab === 'calculadoras'
            ? 'text-pink-600 dark:text-pink-400 font-bold'
            : 'text-gray-500 dark:text-gray-400 hover:text-gray-800'
        }`}
      >
        <Calculator className={`w-5 h-5 ${activeTab === 'calculadoras' ? 'stroke-[2.5]' : ''}`} />
        <span className="text-[10px] mt-0.5">Cálculos</span>
      </button>

      {/* 3. Minutas y Planes */}
      <button
        onClick={() => setActiveTab('minutas')}
        className={`flex-1 flex flex-col items-center justify-center py-1 px-1 rounded-xl transition-all ${
          activeTab === 'minutas'
            ? 'text-pink-600 dark:text-pink-400 font-bold'
            : 'text-gray-500 dark:text-gray-400 hover:text-gray-800'
        }`}
      >
        <ClipboardList className={`w-5 h-5 ${activeTab === 'minutas' ? 'stroke-[2.5]' : ''}`} />
        <span className="text-[10px] mt-0.5">Minutas</span>
      </button>

      {/* 4. Romántico Especial: De tu Amor */}
      <button
        onClick={() => setActiveTab('amor')}
        className={`flex-1 flex flex-col items-center justify-center py-1 px-1 rounded-xl transition-all relative ${
          activeTab === 'amor'
            ? 'text-pink-600 dark:text-pink-400 font-bold'
            : 'text-pink-500/80 hover:text-pink-600'
        }`}
      >
        <div className="relative">
          <Heart className={`w-5 h-5 fill-pink-500 text-pink-500 ${activeTab === 'amor' ? 'scale-110' : 'animate-pulse'}`} />
          <span className="absolute -top-1 -right-1 text-[8px]">✨</span>
        </div>
        <span className="text-[10px] mt-0.5 font-bold">De tu Amor</span>
      </button>

      {/* 5. Menú Completo / Más (Abre el Drawer) */}
      <button
        onClick={() => setIsMobileMenuOpen(true)}
        className={`flex-1 flex flex-col items-center justify-center py-1 px-1 rounded-xl transition-all relative ${
          isMobileMenuOpen
            ? 'text-pink-600 dark:text-pink-400 font-bold'
            : 'text-gray-500 dark:text-gray-400 hover:text-gray-800'
        }`}
      >
        <div className="relative">
          <Menu className="w-5 h-5 stroke-[2.2]" />
          {pendingCount > 0 && (
            <span className="absolute -top-1 -right-2 w-3.5 h-3.5 rounded-full bg-pink-500 text-white text-[8px] font-bold flex items-center justify-center">
              {pendingCount}
            </span>
          )}
        </div>
        <span className="text-[10px] mt-0.5">Más</span>
      </button>

    </div>
  );
};
