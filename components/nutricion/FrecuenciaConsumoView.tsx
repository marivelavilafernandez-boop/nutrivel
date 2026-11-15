'use client';

import React, { useState } from 'react';
import { initialFoodFrequencyList } from '@/lib/data/excelNutricionalData';
import { FoodFrequencyEntry } from '@/lib/types';
import { 
  ClipboardCheck, 
  Search, 
  Filter, 
  Printer, 
  RotateCcw, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  HeartPulse,
  Apple,
  Info
} from 'lucide-react';

type AllowedFrequency = 'cada_dia' | '2_veces_semana' | 'cada_mes' | '1_a_2_mes' | 'a_veces' | 'nunca';

const FREQUENCY_OPTIONS: { value: AllowedFrequency; label: string; color: string }[] = [
  { value: 'cada_dia', label: 'Cada día', color: 'bg-emerald-500 text-white' },
  { value: '2_veces_semana', label: '2 veces/sem', color: 'bg-teal-500 text-white' },
  { value: 'cada_mes', label: 'Cada mes', color: 'bg-blue-500 text-white' },
  { value: '1_a_2_mes', label: '1 a 2 / mes', color: 'bg-amber-500 text-white' },
  { value: 'a_veces', label: 'A veces', color: 'bg-purple-500 text-white' },
  { value: 'nunca', label: 'Nunca', color: 'bg-gray-400 text-white' }
];

export const FrecuenciaConsumoView: React.FC = () => {
  const [items, setItems] = useState<FoodFrequencyEntry[]>(initialFoodFrequencyList);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('TODAS');
  const [patientName, setPatientName] = useState('Paciente Consulta Nutricional');
  const [evaluationDate, setEvaluationDate] = useState(new Date().toISOString().split('T')[0]);

  const categories = [
    { id: 'TODAS', label: 'Todos los Alimentos (61)' },
    { id: 'CARNES Y PROCESADOS', label: 'Carnes & Lácteos' },
    { id: 'VERDURAS', label: 'Verduras & Hortalizas' },
    { id: 'TUBÉRCULOS', label: 'Tubérculos Andinos' },
    { id: 'FRUTAS', label: 'Frutas Frescas' },
    { id: 'LEGUMINOSAS Y CEREALES', label: 'Cereales & Granos Andinos' },
    { id: 'FRECUENTES / ULTRAPROCESADOS', label: 'Ultraprocesados & Comida Rápida' }
  ];

  const handleFrequencyChange = (id: string, freq: AllowedFrequency) => {
    setItems(prev => prev.map(item => item.id === id ? { ...item, frequency: freq } : item));
  };

  const handleReset = () => {
    setItems(initialFoodFrequencyList);
  };

  // Cargar ejemplo típico boliviano
  const handleLoadSample = () => {
    setItems(prev => prev.map(item => {
      let freq: AllowedFrequency = '2_veces_semana';
      // Hábitos típicos
      if (item.foodName.includes('Papa') || item.foodName.includes('Pan marraqueta') || item.foodName.includes('Cebolla') || item.foodName.includes('Tomate')) {
        freq = 'cada_dia';
      } else if (item.foodName.includes('Pollo') || item.foodName.includes('Arroz') || item.foodName.includes('Huevo') || item.foodName.includes('Quinua')) {
        freq = '2_veces_semana';
      } else if (item.foodName.includes('Gaseosas') || item.foodName.includes('Frituras')) {
        freq = 'cada_dia';
      } else if (item.foodName.includes('Pescado') || item.foodName.includes('Espinaca') || item.foodName.includes('Tarwi')) {
        freq = '1_a_2_mes';
      } else if (item.foodName.includes('Charque') || item.foodName.includes('Cordero')) {
        freq = 'a_veces';
      }
      return { ...item, frequency: freq };
    }));
  };

  const filteredItems = items.filter(item => {
    const matchesSearch = item.foodName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = selectedCategory === 'TODAS' || item.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  // Métricas cualitativas
  const answeredCount = items.filter(i => Boolean(i.frequency)).length;
  const progressPercent = Math.round((answeredCount / items.length) * 100);

  // Alimentos protectores (frutas, verduras, leguminosas andinas) con consumo frecuente (cada día o 2 veces semana)
  const healthyCount = items.filter(i => 
    (i.category === 'VERDURAS' || i.category === 'FRUTAS' || i.category === 'LEGUMINOSAS Y CEREALES') &&
    (i.frequency === 'cada_dia' || i.frequency === '2_veces_semana')
  ).length;

  // Ultraprocesados y fritos frecuentes
  const ultraCount = items.filter(i => 
    i.category === 'FRECUENTES / ULTRAPROCESADOS' && 
    (i.frequency === 'cada_dia' || i.frequency === '2_veces_semana')
  ).length;

  return (
    <div className="space-y-6 pb-16 animate-in fade-in duration-200">
      
      {/* 1. ENCABEZADO */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-100 dark:border-gray-800">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-100 text-pink-800 dark:bg-pink-950/60 dark:text-pink-300 text-xs font-bold mb-2">
            <ClipboardCheck className="w-3.5 h-3.5" />
            <span>Módulo Clínico • Excel Nutricional Fabiola SG.B</span>
          </div>
          <h2 className="text-2xl font-extrabold text-gray-900 dark:text-gray-100 tracking-tight">
            Cuestionario de Frecuencia de Consumo de Alimentos (FFQ)
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
            Evaluación dietética retrospectiva cuali-cuantitativa de 61 alimentos habituales y autóctonos de Bolivia.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleLoadSample}
            className="px-3 py-2 text-xs font-bold rounded-xl bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800/60 hover:bg-purple-100 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Ejemplo Típico</span>
          </button>

          <button
            onClick={() => window.print()}
            className="px-3.5 py-2 text-xs font-bold rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Imprimir</span>
          </button>

          <button
            onClick={handleReset}
            className="p-2 text-xs font-semibold rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:text-red-600 transition-all cursor-pointer"
            title="Reiniciar cuestionario"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 2. DATOS DEL PACIENTE Y RESUMEN CUALITATIVO */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Paciente y Fecha */}
        <div className="bg-white dark:bg-[#141526] p-4 rounded-2xl border border-gray-100 dark:border-[#262840] shadow-xs">
          <label className="text-[11px] font-bold uppercase tracking-wider text-gray-400 block mb-1">
            Paciente / Caso de Estudio
          </label>
          <input
            type="text"
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
            className="w-full font-bold text-sm bg-transparent border-b border-gray-200 dark:border-gray-700 pb-1 focus:outline-none focus:border-pink-500 text-gray-900 dark:text-gray-100"
          />
          <div className="flex items-center justify-between text-xs text-gray-500 mt-2">
            <span>Fecha de valoración:</span>
            <input
              type="date"
              value={evaluationDate}
              onChange={(e) => setEvaluationDate(e.target.value)}
              className="bg-transparent text-gray-700 dark:text-gray-300 text-xs font-semibold focus:outline-none"
            />
          </div>
        </div>

        {/* Progreso del Cuestionario */}
        <div className="bg-white dark:bg-[#141526] p-4 rounded-2xl border border-gray-100 dark:border-[#262840] shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">Progreso del FFQ</span>
            <span className="text-xs font-bold text-pink-600 dark:text-pink-400">{answeredCount} / 61 respondidos</span>
          </div>
          <div className="w-full bg-gray-100 dark:bg-gray-800 h-2.5 rounded-full overflow-hidden my-2">
            <div 
              className="bg-gradient-to-r from-pink-500 to-rose-500 h-full rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <p className="text-[11px] text-gray-400">
            {progressPercent === 100 ? '✅ Cuestionario 100% completado' : `Faltan ${61 - answeredCount} ítems por responder`}
          </p>
        </div>

        {/* Semáforo de Calidad Dietética */}
        <div className="bg-white dark:bg-[#141526] p-4 rounded-2xl border border-gray-100 dark:border-[#262840] shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-pink-500 to-rose-400 text-white flex items-center justify-center shrink-0 shadow-md shadow-pink-500/20">
            <HeartPulse className="w-6 h-6" />
          </div>
          <div className="min-w-0">
            <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 block">Patrón Alimentario</span>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                🌿 {healthyCount} protectores
              </span>
              <span className="text-xs font-bold text-rose-600 dark:text-rose-400">
                ⚠️ {ultraCount} ultraprocesados
              </span>
            </div>
            <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-1">
              {ultraCount >= 3 ? 'Riesgo: Alto consumo de ultraprocesados y frituras.' : 'Consumo balanceado de alimentos.'}
            </p>
          </div>
        </div>
      </div>

      {/* 3. BARRA DE BÚSQUEDA Y FILTRO DE CATEGORÍAS */}
      <div className="space-y-3">
        <div className="relative">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Buscar alimento boliviano (ej: charque, chuño, quinua, papaya, tarwi)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white dark:bg-[#141526] border border-gray-200/80 dark:border-[#262840] text-sm text-gray-800 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:border-pink-500 shadow-2xs transition-all"
          />
        </div>

        {/* Categorías pill */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-pink-600 text-white shadow-xs'
                  : 'bg-white dark:bg-[#141526] text-gray-600 dark:text-gray-300 border border-gray-200/80 dark:border-[#262840] hover:border-pink-300'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* 4. TABLA DE FRECUENCIA DE CONSUMO */}
      <div className="bg-white dark:bg-[#141526] rounded-2xl border border-gray-100 dark:border-[#262840] overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-gray-50/80 dark:bg-[#181a2f] border-b border-gray-100 dark:border-[#262840] text-gray-500 uppercase tracking-wider font-extrabold text-[10px]">
                <th className="py-3 px-4">#</th>
                <th className="py-3 px-4">Alimento</th>
                <th className="py-3 px-4">Grupo / Categoría</th>
                <th className="py-3 px-4 text-center">Frecuencia de Consumo</th>
                <th className="py-3 px-4 text-right">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-[#202238]">
              {filteredItems.map((item, idx) => {
                const currentOpt = FREQUENCY_OPTIONS.find(o => o.value === item.frequency);

                return (
                  <tr 
                    key={item.id}
                    className="hover:bg-gray-50/50 dark:hover:bg-[#181a30]/50 transition-colors"
                  >
                    <td className="py-3 px-4 text-gray-400 font-mono text-[11px]">
                      {idx + 1}
                    </td>
                    <td className="py-3 px-4 font-bold text-gray-900 dark:text-gray-100">
                      {item.foodName}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`inline-block px-2 py-0.5 rounded-md text-[10px] font-bold ${
                        item.category === 'CARNES Y PROCESADOS' ? 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300' :
                        item.category === 'VERDURAS' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300' :
                        item.category === 'TUBÉRCULOS' ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300' :
                        item.category === 'FRUTAS' ? 'bg-orange-100 text-orange-800 dark:bg-orange-950/60 dark:text-orange-300' :
                        item.category === 'LEGUMINOSAS Y CEREALES' ? 'bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300' :
                        'bg-purple-100 text-purple-800 dark:bg-purple-950/60 dark:text-purple-300'
                      }`}>
                        {item.category}
                      </span>
                    </td>
                    <td className="py-2.5 px-4 text-center">
                      <div className="inline-flex items-center gap-1 bg-gray-100 dark:bg-gray-800/80 p-1 rounded-xl">
                        {FREQUENCY_OPTIONS.map(opt => {
                          const isSelected = item.frequency === opt.value;
                          return (
                            <button
                              key={opt.value}
                              onClick={() => handleFrequencyChange(item.id, opt.value)}
                              className={`px-2 py-1 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
                                isSelected 
                                  ? `${opt.color} shadow-xs scale-105` 
                                  : 'text-gray-500 hover:text-gray-800 dark:hover:text-gray-200'
                              }`}
                              title={opt.label}
                            >
                              {opt.label.split(' ')[0]}
                            </button>
                          );
                        })}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-right">
                      {currentOpt ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-gray-700 dark:text-gray-200">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                          <span>{currentOpt.label}</span>
                        </span>
                      ) : (
                        <span className="text-[11px] text-gray-400 italic">
                          Sin responder
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* 5. RESUMEN CLÍNICO Y NOTAS ACADÉMICAS */}
      <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-800/40 text-amber-900 dark:text-amber-200 text-xs flex items-start gap-3">
        <Info className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
        <div>
          <p className="font-bold">Guía para el Estudiante de Nutrición (UNIVIOR):</p>
          <p className="mt-1 text-[11px] leading-relaxed">
            El FFQ cuantifica la regularidad del consumo durante el último mes o año. Identifica hábitos protectores (ej: consumo diario de quinua, cañahua o legumbres) frente a riesgos aterogénicos (embutidos o comida rápida &gt; 3 veces por semana). Úsalo antes de elaborar la minuta para saber qué alimentos el paciente acepta con agrado.
          </p>
        </div>
      </div>

    </div>
  );
};
