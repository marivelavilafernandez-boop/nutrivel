'use client';

import React, { useState } from 'react';
import { initialBiochemicalIndicators } from '@/lib/data/excelNutricionalData';
import { BiochemicalIndicator } from '@/lib/types';
import { 
  FlaskConical, 
  Search, 
  Filter, 
  Printer, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowDownCircle, 
  ArrowUpCircle, 
  Info, 
  RotateCcw,
  Sparkles,
  Download
} from 'lucide-react';

export const FichaBioquimicaView: React.FC = () => {
  const [indicators, setIndicators] = useState<BiochemicalIndicator[]>(initialBiochemicalIndicators);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('todas');
  const [patientName, setPatientName] = useState('Paciente Consulta Nutricional');
  const [evaluationDate, setEvaluationDate] = useState(new Date().toISOString().split('T')[0]);

  // Manejo de cambio de valor
  const handleResultChange = (id: string, valStr: string) => {
    const val = valStr === '' ? undefined : parseFloat(valStr);

    setIndicators(prev => prev.map(item => {
      if (item.id !== id) return item;

      let interp: 'NIVELES BAJOS' | 'NORMAL' | 'NIVELES ELEVADOS' | undefined = undefined;
      if (val !== undefined) {
        if (item.minVal !== undefined && val < item.minVal) {
          interp = 'NIVELES BAJOS';
        } else if (item.maxVal !== undefined && val > item.maxVal) {
          interp = 'NIVELES ELEVADOS';
        } else {
          interp = 'NORMAL';
        }
      }

      return {
        ...item,
        result: val,
        interpretation: interp
      };
    }));
  };

  const handleReset = () => {
    setIndicators(initialBiochemicalIndicators);
  };

  const categories = [
    { id: 'todas', label: 'Todos los Indicadores' },
    { id: 'Metabolismo & Glucosa', label: 'Glucosa & Metabolismo' },
    { id: 'Perfil Lipídico', label: 'Perfil Lipídico' },
    { id: 'Función Renal & Hepática', label: 'Función Renal / Proteínas' },
    { id: 'Hematología & Hierro', label: 'Hematología / Anemia' },
    { id: 'Electrolitos & Minerales', label: 'Electrolitos' },
    { id: 'Vitaminas', label: 'Vitaminas' }
  ];

  const filteredIndicators = indicators.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.clinicalMeaning.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = selectedCategory === 'todas' || item.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  // Estadísticas rápidas
  const evaluatedCount = indicators.filter(i => i.result !== undefined).length;
  const normalCount = indicators.filter(i => i.interpretation === 'NORMAL').length;
  const alteredCount = indicators.filter(i => i.interpretation === 'NIVELES BAJOS' || i.interpretation === 'NIVELES ELEVADOS').length;

  return (
    <div className="space-y-6 pb-16 animate-in fade-in duration-200">
      
      {/* 1. ENCABEZADO Y ACCIONES */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-100 dark:border-gray-800">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 text-xs font-bold mb-2">
            <FlaskConical className="w-3.5 h-3.5" />
            <span>Módulo Clínico • Excel Nutricional Fabiola SG.B</span>
          </div>
          <h2 className="text-2xl font-extrabold text-gray-900 dark:text-gray-100 tracking-tight">
            Ficha de Indicadores Bioquímicos
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
            Valores de referencia clínicos e interpretación automatizada para consultas, pasantías y casos de estudio.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white dark:bg-[#18221f] border border-gray-200 dark:border-gray-700 text-xs font-bold text-gray-700 dark:text-gray-200 hover:bg-gray-50 shadow-xs cursor-pointer transition-all"
          >
            <Printer className="w-4 h-4 text-pink-500" />
            <span>Imprimir Ficha</span>
          </button>
          <button
            onClick={handleReset}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-xs font-bold text-gray-600 dark:text-gray-300 hover:bg-gray-200 cursor-pointer transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Limpiar</span>
          </button>
        </div>
      </div>

      {/* 2. DATOS DEL PACIENTE Y RESUMEN DIAGNÓSTICO */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        <div className="md:col-span-8 p-5 rounded-3xl bg-white dark:bg-[#18221f] border border-gray-200/80 dark:border-gray-800 shadow-xs space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1">
                Nombre del Paciente / Caso Clínico
              </label>
              <input
                type="text"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-gray-50 dark:bg-[#121816] border border-gray-200 dark:border-gray-700 text-xs font-semibold text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-500"
                placeholder="Ej. Paciente DM2 / Renal"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1">
                Fecha de Evaluación de Laboratorio
              </label>
              <input
                type="date"
                value={evaluationDate}
                onChange={(e) => setEvaluationDate(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-gray-50 dark:bg-[#121816] border border-gray-200 dark:border-gray-700 text-xs font-semibold text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>
          </div>
          <div className="pt-2 text-[11px] text-gray-400 flex items-center justify-between">
            <span>Evaluador: <strong>Lic. Marivel Avila Fernandez</strong> • UNIVIOR</span>
            <span>Plataforma Nutrivel</span>
          </div>
        </div>

        {/* Resumen numérico */}
        <div className="md:col-span-4 p-5 rounded-3xl bg-gradient-to-br from-emerald-950/20 via-[#18221f] to-[#121816] border border-emerald-900/40 text-white flex flex-col justify-between shadow-xs">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-300">
              Estado de los Laboratorios
            </span>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-white">{evaluatedCount}</span>
              <span className="text-xs text-emerald-200/80">/ {indicators.length} analizados</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-emerald-800/40 text-xs">
            <div className="flex items-center gap-1.5 text-emerald-400">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span><strong>{normalCount}</strong> en rango</span>
            </div>
            <div className="flex items-center gap-1.5 text-amber-400">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span><strong>{alteredCount}</strong> alterados</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. FILTROS Y BÚSQUEDA */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Barra de Búsqueda */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por analito (ej: colesterol, glucemia, albúmina)..."
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white dark:bg-[#18221f] border border-gray-200 dark:border-gray-800 text-xs text-gray-800 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 shadow-xs"
          />
        </div>

        {/* Chips de categorías */}
        <div className="flex overflow-x-auto gap-1.5 p-1 bg-gray-100 dark:bg-[#121816] rounded-2xl border border-gray-200/60 dark:border-gray-800 max-w-full">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-[11px] font-bold shrink-0 transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-white dark:bg-[#252847] text-pink-600 dark:text-pink-400 shadow-xs'
                  : 'text-gray-500 hover:text-gray-800 dark:hover:text-gray-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* 4. TABLA CLÍNICA DE INDICADORES BIOQUÍMICOS */}
      <div className="bg-white dark:bg-[#18221f] rounded-3xl border border-gray-200/80 dark:border-gray-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-gray-50 dark:bg-[#141a18] text-gray-500 dark:text-gray-400 font-bold uppercase tracking-wider text-[10px] border-b border-gray-200 dark:border-gray-800">
                <th className="py-3 px-4">Indicador Bioquímico</th>
                <th className="py-3 px-3">Valores de Referencia</th>
                <th className="py-3 px-4 w-36">Resultado Paciente</th>
                <th className="py-3 px-3">Unidad</th>
                <th className="py-3 px-4">Interpretación Clínica</th>
                <th className="py-3 px-4">Importancia Nutricional</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800/80">
              {filteredIndicators.map(item => {
                const hasValue = item.result !== undefined;
                let badgeClass = 'bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400';
                let icon = null;

                if (item.interpretation === 'NORMAL') {
                  badgeClass = 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 font-bold';
                  icon = <CheckCircle2 className="w-3.5 h-3.5" />;
                } else if (item.interpretation === 'NIVELES BAJOS') {
                  badgeClass = 'bg-blue-100 text-blue-800 dark:bg-blue-950/80 dark:text-blue-300 border border-blue-300 dark:border-blue-800 font-bold';
                  icon = <ArrowDownCircle className="w-3.5 h-3.5" />;
                } else if (item.interpretation === 'NIVELES ELEVADOS') {
                  badgeClass = 'bg-rose-100 text-rose-800 dark:bg-rose-950/80 dark:text-rose-300 border border-rose-300 dark:border-rose-800 font-bold';
                  icon = <ArrowUpCircle className="w-3.5 h-3.5" />;
                }

                return (
                  <tr 
                    key={item.id}
                    className="hover:bg-gray-50/70 dark:hover:bg-[#141d1a] transition-colors"
                  >
                    <td className="py-3 px-4 font-bold text-gray-900 dark:text-gray-100">
                      <div className="flex flex-col">
                        <span>{item.name}</span>
                        <span className="text-[10px] text-gray-400 font-normal">{item.category}</span>
                      </div>
                    </td>
                    <td className="py-3 px-3 font-mono font-semibold text-gray-600 dark:text-gray-300">
                      {item.referenceRange}
                    </td>
                    <td className="py-3 px-4">
                      <input
                        type="number"
                        step="any"
                        value={item.result !== undefined ? item.result : ''}
                        onChange={(e) => handleResultChange(item.id, e.target.value)}
                        placeholder="Ingresar..."
                        className={`w-full px-3 py-1.5 rounded-xl font-bold font-mono text-xs border focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all ${
                          hasValue 
                            ? item.interpretation === 'NORMAL'
                              ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-700 text-emerald-900 dark:text-emerald-200'
                              : 'bg-rose-50 dark:bg-rose-950/30 border-rose-300 dark:border-rose-700 text-rose-900 dark:text-rose-200'
                            : 'bg-gray-50 dark:bg-[#121816] border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200'
                        }`}
                      />
                    </td>
                    <td className="py-3 px-3 text-gray-400 font-mono text-[11px]">
                      {item.unit}
                    </td>
                    <td className="py-3 px-4">
                      {hasValue ? (
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] ${badgeClass}`}>
                          {icon}
                          <span>{item.interpretation}</span>
                        </span>
                      ) : (
                        <span className="text-[11px] text-gray-400 italic">Pendiente</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-300 text-[11px] leading-relaxed max-w-xs">
                      {item.clinicalMeaning}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
