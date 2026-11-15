'use client';

import React from 'react';
import { useNutriStore } from '@/lib/store/useNutriStore';
import { Sidebar } from '../navigation/Sidebar';
import { Header } from '../navigation/Header';
import { MobileNav } from '../navigation/MobileNav';
import { GlobalSearchModal } from '../modals/GlobalSearchModal';

import { DashboardView } from '../dashboard/DashboardView';
import { MateriasView } from '../materias/MateriasView';
import { TareasView } from '../tareas/TareasView';
import { CalendarioView } from '../calendario/CalendarioView';
import { ApuntesView } from '../apuntes/ApuntesView';
import { ProfessionalPreview } from '../profesional/ProfessionalPreview';
import { ConfiguracionView } from '../configuracion/ConfiguracionView';

export const AppShell: React.FC = () => {
  const { activeTab } = useNutriStore();

  const renderCurrentView = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardView />;
      case 'materias':
        return <MateriasView />;
      case 'trabajos':
        return <TareasView />;
      case 'calendario':
        return <CalendarioView />;
      case 'apuntes':
        return <ApuntesView />;
      case 'profesional':
        return <ProfessionalPreview />;
      case 'configuracion':
        return <ConfiguracionView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="min-h-screen flex bg-[#fbf9f5] dark:bg-[#111715] text-[#1c2826] dark:text-[#f3efe6]">
      {/* Sidebar Desktop */}
      <Sidebar />

      {/* Área de Contenido Principal */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto pb-20 lg:pb-8">
          {renderCurrentView()}
        </main>
      </div>

      {/* Barra de Navegación Inferior Móvil */}
      <MobileNav />

      {/* Buscador Global Omnibox */}
      <GlobalSearchModal />
    </div>
  );
};
