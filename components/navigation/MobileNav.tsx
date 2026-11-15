'use client';

import React from 'react';
import { useNutriStore } from '@/lib/store/useNutriStore';
import { 
  LayoutDashboard, 
  BookOpen, 
  CheckSquare, 
  Calendar, 
  FileText 
} from 'lucide-react';

export const MobileNav: React.FC = () => {
  const { activeTab, setActiveTab, tasks } = useNutriStore();
  const pendingCount = tasks.filter(t => t.status === 'pendiente' || t.status === 'en_progreso').length;

  const items = [
    { id: 'dashboard', label: 'Inicio', icon: LayoutDashboard },
    { id: 'materias', label: 'Materias', icon: BookOpen },
    { id: 'trabajos', label: 'Tareas', icon: CheckSquare, badge: pendingCount },
    { id: 'calendario', label: 'Agenda', icon: Calendar },
    { id: 'apuntes', label: 'Apuntes', icon: FileText }
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-[#18221f]/95 backdrop-blur-md border-t border-[#e2ddd3] dark:border-[#293a34] px-2 py-1.5 flex items-center justify-around shadow-lg">
      {items.map(item => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;
        return (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all relative ${
              isActive
                ? 'text-pink-600 dark:text-pink-400 font-bold'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-800'
            }`}
          >
            <div className="relative">
              <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : ''}`} />
              {item.badge !== undefined && item.badge > 0 && (
                <span className="absolute -top-1 -right-2 w-4 h-4 rounded-full bg-pink-500 text-white text-[9px] font-bold flex items-center justify-center">
                  {item.badge}
                </span>
              )}
            </div>
            <span className="text-[10px] mt-0.5">{item.label}</span>
          </button>
        );
      })}
    </div>
  );
};
