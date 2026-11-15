'use client';

import React from 'react';
import { useNutriStore } from '@/lib/store/useNutriStore';
import { Sidebar } from '../navigation/Sidebar';
import { Header } from '../navigation/Header';
import { MobileNav } from '../navigation/MobileNav';
import { MobileDrawer } from '../navigation/MobileDrawer';
import { GlobalSearchModal } from '../modals/GlobalSearchModal';
import { NutriAiAssistant } from '../ai/NutriAiAssistant';

import { DashboardView } from '../dashboard/DashboardView';
import { MateriasView } from '../materias/MateriasView';
import { TareasView } from '../tareas/TareasView';
import { CalendarioView } from '../calendario/CalendarioView';
import { ApuntesView } from '../apuntes/ApuntesView';
import { ProfessionalPreview } from '../profesional/ProfessionalPreview';
import { ConfiguracionView } from '../configuracion/ConfiguracionView';
import { LoveLetterView } from '../love/LoveLetterView';

// Nuevas herramientas clínicas de nutrición (Etapa 2)
import { CalculadorasNutricionales } from '../nutricion/CalculadorasNutricionales';
import { TablaAlimentosView } from '../nutricion/TablaAlimentosView';
import { ArmadorPlanesView } from '../nutricion/ArmadorPlanesView';
import { CasosClinicosView } from '../nutricion/CasosClinicosView';
import { TesisGradoView } from '../nutricion/TesisGradoView';
import { GeneradorApaView } from '../nutricion/GeneradorApaView';
import { AntropometriaAvanzadaView } from '../nutricion/AntropometriaAvanzadaView';
import { TamizajeNutricionalView } from '../nutricion/TamizajeNutricionalView';
import { AnamnesisClinicaView } from '../nutricion/AnamnesisClinicaView';

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
      case 'calculadoras':
        return <CalculadorasNutricionales />;
      case 'tbca':
        return <TablaAlimentosView />;
      case 'minutas':
        return <ArmadorPlanesView />;
      case 'casos':
        return <CasosClinicosView />;
      case 'tesis':
        return <TesisGradoView />;
      case 'apa':
        return <GeneradorApaView />;
      case 'antropometria':
        return <AntropometriaAvanzadaView />;
      case 'tamizaje':
        return <TamizajeNutricionalView />;
      case 'anamnesis':
        return <AnamnesisClinicaView />;
      case 'profesional':
        return <ProfessionalPreview />;
      case 'configuracion':
        return <ConfiguracionView />;
      case 'amor':
        return <LoveLetterView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="min-h-screen flex bg-[#f8f9fd] dark:bg-[#0c0d17] text-gray-800 dark:text-gray-100 overflow-x-hidden">
      {/* Sidebar Desktop */}
      <Sidebar />

      {/* Drawer Móvil Lateral */}
      <MobileDrawer />

      {/* Área de Contenido Principal */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header />

        <main className="flex-1 p-3.5 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto pb-24 lg:pb-8">
          {renderCurrentView()}
        </main>
      </div>

      {/* Barra de Navegación Inferior Móvil */}
      <MobileNav />

      {/* Buscador Global Omnibox */}
      <GlobalSearchModal />

      {/* Asistente IA NutriIA (Gemini) */}
      <NutriAiAssistant />
    </div>
  );
};
