import type { Metadata } from 'next';
import './globals.css';
import { NutriStoreProvider } from '@/lib/store/useNutriStore';

export const metadata: Metadata = {
  title: 'Nutrivel — Marivel Avila | Panel Académico y Profesional',
  description: 'Panel web integral CRM y de gestión académica para Marivel, estudiante de último año de Nutrición y futura licenciada.',
  icons: {
    icon: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🌿</text></svg>'
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning className="h-full">
      <body className="h-full bg-[#fbf9f5] dark:bg-[#111715] text-[#1c2826] dark:text-[#f3efe6]">
        <NutriStoreProvider>
          {children}
        </NutriStoreProvider>
      </body>
    </html>
  );
}
