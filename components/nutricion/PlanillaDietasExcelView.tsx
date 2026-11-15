'use client';

import React, { useState, useMemo } from 'react';
import tbcaDataRaw from '@/lib/data/fullTbcaFoods.json';
import { TbcaFoodItem } from '@/lib/types';
import { 
  ClipboardCheck, 
  Plus, 
  Trash2, 
  Printer, 
  RotateCcw, 
  Sparkles, 
  CheckCircle2, 
  PieChart,
  Search,
  Scale,
  Flame,
  Info
} from 'lucide-react';

interface DietFoodEntry {
  id: string;
  code: string;
  name: string;
  grams: number;
  energyKcal: number;
  moistureG: number;
  proteinG: number;
  fatG: number;
  carbsG: number;
  fiberMg: number;
  ashMg: number;
  calciumMg: number;
  phosphorusMg: number;
  ironMg: number;
  vitAMcg: number;
  thiaminB1Mg: number;
  riboflavinB2Mg: number;
  niacinB3Mg: number;
  vitCMg: number;
}

export const PlanillaDietasExcelView: React.FC = () => {
  const allFoods = tbcaDataRaw as TbcaFoodItem[];

  const [patientName, setPatientName] = useState('Mariana Quispe Mamani');
  const [dietGoal, setDietGoal] = useState<'MANTENER' | 'BAJAR' | 'SUBIR'>('SUBIR');
  const [totalKcalTarget, setTotalKcalTarget] = useState<number>(2765);

  // Distribución de Macronutrientes (del Excel Fabiola SG.B)
  const [proteinPct, setProteinPct] = useState<number>(20);
  const [carbsPct, setCarbsPct] = useState<number>(40);
  const [fatPct, setFatPct] = useState<number>(40);

  // Comidas con datos reales precargados del Excel de Fabiola SG.B
  const [meals, setMeals] = useState<Record<string, DietFoodEntry[]>>({
    'DESAYUNO': [
      { id: 'd_1', code: '1', name: 'Arroz carolina', grams: 100, energyKcal: 347, moistureG: 10.7, proteinG: 7.21, fatG: 0.42, carbsG: 78.55, fiberMg: 600, ashMg: 780, calciumMg: 10.2, phosphorusMg: 110.7, ironMg: 1.42, vitAMcg: 0, thiaminB1Mg: 0.08, riboflavinB2Mg: 0.07, niacinB3Mg: 2.1, vitCMg: 0 },
      { id: 'd_2', code: '2', name: 'Limón variedad vila franca', grams: 13, energyKcal: 5.72, moistureG: 1.7, proteinG: 0.07, fatG: 0.04, carbsG: 1.26, fiberMg: 70, ashMg: 94, calciumMg: 1.3, phosphorusMg: 15.2, ironMg: 0.2, vitAMcg: 0, thiaminB1Mg: 0.01, riboflavinB2Mg: 0.0, niacinB3Mg: 0.27, vitCMg: 0 },
      { id: 'd_3', code: '3', name: 'Amaranto', grams: 100, energyKcal: 382, moistureG: 11.23, proteinG: 13.2, fatG: 7.0, carbsG: 66.5, fiberMg: 6600, ashMg: 980, calciumMg: 11.7, phosphorusMg: 105, ironMg: 1.56, vitAMcg: 0, thiaminB1Mg: 0.06, riboflavinB2Mg: 0.03, niacinB3Mg: 2.06, vitCMg: 0 }
    ],
    'MERIENDA 1': [
      { id: 'd_4', code: '14', name: 'Arroz carolina', grams: 5, energyKcal: 17.35, moistureG: 0.48, proteinG: 0.36, fatG: 0.02, carbsG: 3.93, fiberMg: 30, ashMg: 129, calciumMg: 2.7, phosphorusMg: 16.15, ironMg: 0.29, vitAMcg: 0.18, thiaminB1Mg: 0.01, riboflavinB2Mg: 0.01, niacinB3Mg: 0.31, vitCMg: 0 },
      { id: 'd_5', code: '9', name: 'Tarhui crudo con cáscara', grams: 60, energyKcal: 254.4, moistureG: 5.92, proteinG: 9.18, fatG: 7.21, carbsG: 38.22, fiberMg: 3240, ashMg: 1152, calciumMg: 31.62, phosphorusMg: 244.8, ironMg: 2.58, vitAMcg: 0, thiaminB1Mg: 0.38, riboflavinB2Mg: 0.28, niacinB3Mg: 0.75, vitCMg: 0 },
      { id: 'd_6', code: '10', name: 'Tarhui tierno', grams: 80, energyKcal: 93.6, moistureG: 8.64, proteinG: 8.8, fatG: 1.63, carbsG: 11.02, fiberMg: 3424, ashMg: 3520, calciumMg: 46.72, phosphorusMg: 282.4, ironMg: 4.24, vitAMcg: 0, thiaminB1Mg: 0.55, riboflavinB2Mg: 0.38, niacinB3Mg: 1.54, vitCMg: 0 }
    ],
    'ALMUERZO': [
      { id: 'd_7', code: '1', name: 'Tarhui tierno', grams: 2, energyKcal: 2.34, moistureG: 0.21, proteinG: 0.22, fatG: 0.04, carbsG: 0.28, fiberMg: 86, ashMg: 16, calciumMg: 0.2, phosphorusMg: 2.21, ironMg: 0.03, vitAMcg: 0, thiaminB1Mg: 0.0, riboflavinB2Mg: 0.0, niacinB3Mg: 0.04, vitCMg: 0 },
      { id: 'd_8', code: '2', name: 'Locro tradicional', grams: 40, energyKcal: 35.2, moistureG: 5.24, proteinG: 5.04, fatG: 1.28, carbsG: 0.86, fiberMg: 292, ashMg: 288, calciumMg: 4.0, phosphorusMg: 46.8, ironMg: 0.62, vitAMcg: 0, thiaminB1Mg: 0.02, riboflavinB2Mg: 0.01, niacinB3Mg: 0.82, vitCMg: 0 }
    ],
    'MERIENDA 2': [
      { id: 'd_9', code: '112', name: 'Pan marraqueta', grams: 5, energyKcal: 14.65, moistureG: 0.44, proteinG: 0.44, fatG: 0.03, carbsG: 3.15, fiberMg: 13, ashMg: 20, calciumMg: 1.8, phosphorusMg: 5.65, ironMg: 0.23, vitAMcg: 0, thiaminB1Mg: 0.0, riboflavinB2Mg: 0.01, niacinB3Mg: 0.14, vitCMg: 0 }
    ],
    'CENA': [
      { id: 'd_10', code: '3', name: 'Arroz perla', grams: 7, energyKcal: 24.64, moistureG: 0.55, proteinG: 0.55, fatG: 0.02, carbsG: 5.58, fiberMg: 50, ashMg: 69, calciumMg: 0.82, phosphorusMg: 7.35, ironMg: 0.11, vitAMcg: 0, thiaminB1Mg: 0.0, riboflavinB2Mg: 0.0, niacinB3Mg: 0.14, vitCMg: 0 },
      { id: 'd_11', code: '308', name: 'Plátano harina', grams: 98, energyKcal: 368.48, moistureG: 5.04, proteinG: 5.04, fatG: 3.34, carbsG: 79.54, fiberMg: 2215, ashMg: 3156, calciumMg: 32.34, phosphorusMg: 76.44, ironMg: 2.25, vitAMcg: 35.28, thiaminB1Mg: 0.06, riboflavinB2Mg: 0.24, niacinB3Mg: 2.65, vitCMg: 54.39 }
    ]
  });

  // Modal para agregar alimento
  const [activeMealName, setActiveMealName] = useState<string | null>(null);
  const [modalSearch, setModalSearch] = useState('');
  const [modalSelectedFood, setModalSelectedFood] = useState<TbcaFoodItem>(allFoods[0]);
  const [modalGrams, setModalGrams] = useState<number>(100);

  const mealNames = ['DESAYUNO', 'MERIENDA 1', 'ALMUERZO', 'MERIENDA 2', 'CENA'];

  const filteredFoodsForModal = useMemo(() => {
    if (!modalSearch.trim()) return allFoods.slice(0, 20);
    const q = modalSearch.toLowerCase().trim();
    return allFoods.filter(f => f.name.toLowerCase().includes(q) || f.code.includes(q)).slice(0, 30);
  }, [allFoods, modalSearch]);

  const handleAddItemToMeal = () => {
    if (!activeMealName || !modalSelectedFood) return;
    const factor = modalGrams / 100;

    const newItem: DietFoodEntry = {
      id: `diet_${Date.now()}`,
      code: modalSelectedFood.code,
      name: modalSelectedFood.name,
      grams: modalGrams,
      energyKcal: Math.round(modalSelectedFood.energyKcal * factor * 10) / 10,
      moistureG: Math.round(modalSelectedFood.moistureG * factor * 10) / 10,
      proteinG: Math.round(modalSelectedFood.proteinG * factor * 100) / 100,
      fatG: Math.round(modalSelectedFood.fatG * factor * 100) / 100,
      carbsG: Math.round(modalSelectedFood.carbsG * factor * 100) / 100,
      fiberMg: Math.round(modalSelectedFood.fiberG * 1000 * factor),
      ashMg: Math.round(modalSelectedFood.ashG * 1000 * factor),
      calciumMg: Math.round(modalSelectedFood.calciumMg * factor * 10) / 10,
      phosphorusMg: Math.round(modalSelectedFood.phosphorusMg * factor * 10) / 10,
      ironMg: Math.round(modalSelectedFood.ironMg * factor * 100) / 100,
      vitAMcg: Math.round(modalSelectedFood.vitAMcg * factor * 10) / 10,
      thiaminB1Mg: Math.round(modalSelectedFood.thiaminB1Mg * factor * 100) / 100,
      riboflavinB2Mg: Math.round(modalSelectedFood.riboflavinB2Mg * factor * 100) / 100,
      niacinB3Mg: Math.round(modalSelectedFood.niacinB3Mg * factor * 100) / 100,
      vitCMg: Math.round(modalSelectedFood.vitCMg * factor * 10) / 10
    };

    setMeals(prev => ({
      ...prev,
      [activeMealName]: [...(prev[activeMealName] || []), newItem]
    }));
    setActiveMealName(null);
  };

  const handleRemoveItem = (mealName: string, id: string) => {
    setMeals(prev => ({
      ...prev,
      [mealName]: prev[mealName].filter(i => i.id !== id)
    }));
  };

  // Cálculos de macros objetivo
  const targetProteinGrams = Math.round((totalKcalTarget * (proteinPct / 100)) / 4);
  const targetCarbsGrams = Math.round((totalKcalTarget * (carbsPct / 100)) / 4);
  const targetFatGrams = Math.round((totalKcalTarget * (fatPct / 100)) / 9);

  // Totales generales calculados
  const grandTotal = useMemo(() => {
    let energyKcal = 0, moistureG = 0, proteinG = 0, fatG = 0, carbsG = 0, fiberMg = 0, ashMg = 0;
    let calciumMg = 0, phosphorusMg = 0, ironMg = 0, vitAMcg = 0, thiaminB1Mg = 0, riboflavinB2Mg = 0, niacinB3Mg = 0, vitCMg = 0;

    Object.values(meals).forEach(items => {
      items.forEach(i => {
        energyKcal += i.energyKcal;
        moistureG += i.moistureG;
        proteinG += i.proteinG;
        fatG += i.fatG;
        carbsG += i.carbsG;
        fiberMg += i.fiberMg;
        ashMg += i.ashMg;
        calciumMg += i.calciumMg;
        phosphorusMg += i.phosphorusMg;
        ironMg += i.ironMg;
        vitAMcg += i.vitAMcg;
        thiaminB1Mg += i.thiaminB1Mg;
        riboflavinB2Mg += i.riboflavinB2Mg;
        niacinB3Mg += i.niacinB3Mg;
        vitCMg += i.vitCMg;
      });
    });

    return {
      energyKcal: Math.round(energyKcal),
      moistureG: Math.round(moistureG * 10) / 10,
      proteinG: Math.round(proteinG * 10) / 10,
      fatG: Math.round(fatG * 10) / 10,
      carbsG: Math.round(carbsG * 10) / 10,
      fiberMg: Math.round(fiberMg),
      ashMg: Math.round(ashMg),
      calciumMg: Math.round(calciumMg * 10) / 10,
      phosphorusMg: Math.round(phosphorusMg * 10) / 10,
      ironMg: Math.round(ironMg * 100) / 100,
      vitAMcg: Math.round(vitAMcg * 10) / 10,
      thiaminB1Mg: Math.round(thiaminB1Mg * 100) / 100,
      riboflavinB2Mg: Math.round(riboflavinB2Mg * 100) / 100,
      niacinB3Mg: Math.round(niacinB3Mg * 100) / 100,
      vitCMg: Math.round(vitCMg * 10) / 10
    };
  }, [meals]);

  // % de adecuación para kcal y macros
  const adequacyKcal = totalKcalTarget > 0 ? Math.round((grandTotal.energyKcal / totalKcalTarget) * 100) : 0;
  const adequacyProtein = targetProteinGrams > 0 ? Math.round((grandTotal.proteinG / targetProteinGrams) * 100) : 0;
  const adequacyCarbs = targetCarbsGrams > 0 ? Math.round((grandTotal.carbsG / targetCarbsGrams) * 100) : 0;
  const adequacyFat = targetFatGrams > 0 ? Math.round((grandTotal.fatG / targetFatGrams) * 100) : 0;

  return (
    <div className="space-y-6 pb-16 animate-in fade-in duration-200">
      
      {/* 1. ENCABEZADO */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-100 dark:border-gray-800">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-100 text-indigo-800 dark:bg-indigo-950/60 dark:text-indigo-300 text-xs font-bold mb-2">
            <ClipboardCheck className="w-3.5 h-3.5" />
            <span>Módulo Clínico • Hoja DIETAS (Excel Fabiola SG.B)</span>
          </div>
          <h2 className="text-2xl font-extrabold text-gray-900 dark:text-gray-100 tracking-tight">
            Planilla de Elaboración de Dietas
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
            Distribución por 5 tiempos de comida con desglose completo de 15 micro y macronutrientes y porcentaje de adecuación.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => window.print()}
            className="px-3.5 py-2 text-xs font-bold rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Imprimir Planilla</span>
          </button>
        </div>
      </div>

      {/* 2. DISTRIBUCIÓN DE MACRONUTRIENTES Y METAS DEL PACIENTE */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Paciente y Kcal Meta */}
        <div className="bg-white dark:bg-[#141526] p-5 rounded-2xl border border-gray-100 dark:border-[#262840] shadow-xs space-y-3">
          <label className="text-[10px] font-bold uppercase text-gray-400 block mb-1">Paciente</label>
          <input
            type="text"
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
            className="w-full font-bold text-sm bg-transparent border-b border-gray-200 dark:border-gray-700 pb-1 text-gray-900 dark:text-gray-100"
          />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <div>
              <label className="text-[10px] font-bold uppercase text-gray-400 block mb-1">Requerimiento Kcal</label>
              <input
                type="number"
                value={totalKcalTarget}
                onChange={(e) => setTotalKcalTarget(parseInt(e.target.value) || 0)}
                className="w-full p-2 text-sm font-extrabold rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-center text-orange-600 dark:text-orange-400"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase text-gray-400 block mb-1">Objetivo General</label>
              <select
                value={dietGoal}
                onChange={(e) => setDietGoal(e.target.value as any)}
                className="w-full p-2 text-xs font-bold rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
              >
                <option value="MANTENER">Mantener (0%)</option>
                <option value="BAJAR">Bajar (-20%)</option>
                <option value="SUBIR">Subir (+15%)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Tabla de Distribución de Macronutrientes (Exacto del Excel) */}
        <div className="lg:col-span-2 bg-white dark:bg-[#141526] p-5 rounded-2xl border border-gray-100 dark:border-[#262840] shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-extrabold text-xs uppercase tracking-wider text-gray-500">
              Distribución de Macronutrientes (Fórmula Dietética)
            </h4>
            <span className={`text-xs font-bold ${proteinPct + carbsPct + fatPct === 100 ? 'text-emerald-500' : 'text-rose-500'}`}>
              Total: {proteinPct + carbsPct + fatPct}%
            </span>
          </div>

          <div className="grid grid-cols-3 gap-3 text-center">
            
            <div className="p-3 rounded-2xl bg-rose-50/60 dark:bg-rose-950/20 border border-rose-200/60">
              <span className="text-[10px] font-bold uppercase text-rose-600 block">Proteínas ({proteinPct}%)</span>
              <span className="text-xl font-black text-rose-700 dark:text-rose-300 mt-1 block">{targetProteinGrams} g</span>
              <span className="text-[10px] text-gray-400">{Math.round(totalKcalTarget * (proteinPct / 100))} kcal</span>
            </div>

            <div className="p-3 rounded-2xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200/60">
              <span className="text-[10px] font-bold uppercase text-amber-600 block">Carbohidratos ({carbsPct}%)</span>
              <span className="text-xl font-black text-amber-700 dark:text-amber-300 mt-1 block">{targetCarbsGrams} g</span>
              <span className="text-[10px] text-gray-400">{Math.round(totalKcalTarget * (carbsPct / 100))} kcal</span>
            </div>

            <div className="p-3 rounded-2xl bg-blue-50/60 dark:bg-blue-950/20 border border-blue-200/60">
              <span className="text-[10px] font-bold uppercase text-blue-600 block">Grasas ({fatPct}%)</span>
              <span className="text-xl font-black text-blue-700 dark:text-blue-300 mt-1 block">{targetFatGrams} g</span>
              <span className="text-[10px] text-gray-400">{Math.round(totalKcalTarget * (fatPct / 100))} kcal</span>
            </div>

          </div>
        </div>

      </div>

      {/* 3. PLANILLA DE DIETA POR TIEMPOS DE COMIDA */}
      <div className="space-y-4">
        {mealNames.map((mealName) => {
          const items = meals[mealName] || [];
          const mealKcal = Math.round(items.reduce((s, i) => s + i.energyKcal, 0));

          return (
            <div 
              key={mealName}
              className="bg-white dark:bg-[#141526] rounded-2xl border border-gray-100 dark:border-[#262840] overflow-hidden shadow-xs"
            >
              <div className="p-3.5 bg-gray-50/70 dark:bg-[#181a30] border-b border-gray-100 dark:border-[#262840] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
                  <h4 className="font-extrabold text-xs text-gray-900 dark:text-gray-100 tracking-wider">
                    {mealName}
                  </h4>
                  <span className="text-[10px] font-bold text-gray-400">({items.length} alimentos)</span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-orange-600 dark:text-orange-400">
                    Subtotal: {mealKcal} kcal
                  </span>
                  <button
                    onClick={() => { setActiveMealName(mealName); setModalSearch(''); }}
                    className="px-2.5 py-1 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-300 font-bold text-xs hover:bg-indigo-100 transition-all flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Agregar Alimento</span>
                  </button>
                </div>
              </div>

              {items.length === 0 ? (
                <div className="p-4 text-center text-xs text-gray-400 italic">
                  Sin alimentos planificados en este tiempo de comida.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs whitespace-nowrap">
                    <thead>
                      <tr className="border-b border-gray-100 dark:border-[#202238] text-gray-400 uppercase text-[9px] font-bold">
                        <th className="py-2 px-3">Cód #</th>
                        <th className="py-2 px-3">Alimento</th>
                        <th className="py-2 px-2 text-right">Cant (g)</th>
                        <th className="py-2 px-2 text-right">Kcal</th>
                        <th className="py-2 px-2 text-right">Prot (g)</th>
                        <th className="py-2 px-2 text-right">Grasa (g)</th>
                        <th className="py-2 px-2 text-right">CH (g)</th>
                        <th className="py-2 px-2 text-right">Fibra (mg)</th>
                        <th className="py-2 px-2 text-right">Ca (mg)</th>
                        <th className="py-2 px-2 text-right">P (mg)</th>
                        <th className="py-2 px-2 text-right">Fe (mg)</th>
                        <th className="py-2 px-2 text-right">Vit A (ug)</th>
                        <th className="py-2 px-2 text-right">Vit C (mg)</th>
                        <th className="py-2 px-2 text-center">Acción</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-[#202238]">
                      {items.map(i => (
                        <tr key={i.id} className="hover:bg-gray-50/50 dark:hover:bg-[#1a1c35]/50">
                          <td className="py-2 px-3 font-mono text-gray-400 text-[10px]">#{i.code}</td>
                          <td className="py-2 px-3 font-bold text-gray-800 dark:text-gray-200">{i.name}</td>
                          <td className="py-2 px-2 text-right font-semibold">{i.grams}g</td>
                          <td className="py-2 px-2 text-right font-black text-orange-600 dark:text-orange-400">{i.energyKcal}</td>
                          <td className="py-2 px-2 text-right text-rose-600 dark:text-rose-400">{i.proteinG}</td>
                          <td className="py-2 px-2 text-right text-blue-600 dark:text-blue-400">{i.fatG}</td>
                          <td className="py-2 px-2 text-right text-amber-600 dark:text-amber-400">{i.carbsG}</td>
                          <td className="py-2 px-2 text-right text-emerald-600 dark:text-emerald-400">{i.fiberMg}</td>
                          <td className="py-2 px-2 text-right text-teal-600 dark:text-teal-400">{i.calciumMg}</td>
                          <td className="py-2 px-2 text-right text-indigo-600 dark:text-indigo-400">{i.phosphorusMg}</td>
                          <td className="py-2 px-2 text-right text-purple-600 dark:text-purple-400">{i.ironMg}</td>
                          <td className="py-2 px-2 text-right text-gray-600 dark:text-gray-300">{i.vitAMcg}</td>
                          <td className="py-2 px-2 text-right text-cyan-600 dark:text-cyan-400">{i.vitCMg}</td>
                          <td className="py-2 px-2 text-center">
                            <button
                              onClick={() => handleRemoveItem(mealName, i.id)}
                              className="text-gray-400 hover:text-red-500 p-1"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* 4. TOTAL GENERAL & PORCENTAJES DE ADECUACIÓN (EXACTO DEL EXCEL) */}
      <div className="bg-white dark:bg-[#141526] rounded-2xl border border-gray-100 dark:border-[#262840] p-5 shadow-xs space-y-4">
        <h4 className="font-extrabold text-sm text-gray-900 dark:text-gray-100 flex items-center gap-2">
          <PieChart className="w-4 h-4 text-indigo-500" />
          <span>EVALUACIÓN DE ADECUACIÓN NUTRICIONAL TOTAL</span>
        </h4>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs whitespace-nowrap">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700 text-gray-400 uppercase text-[10px] font-extrabold">
                <th className="py-2.5 px-3">CONCEPTO</th>
                <th className="py-2.5 px-3 text-right">Energía (kcal)</th>
                <th className="py-2.5 px-3 text-right">Proteína (g)</th>
                <th className="py-2.5 px-3 text-right">Grasa (g)</th>
                <th className="py-2.5 px-3 text-right">CH (g)</th>
                <th className="py-2.5 px-3 text-right">Calcio (mg)</th>
                <th className="py-2.5 px-3 text-right">Fósforo (mg)</th>
                <th className="py-2.5 px-3 text-right">Hierro (mg)</th>
                <th className="py-2.5 px-3 text-right">Vit C (mg)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-[#202238]">
              <tr>
                <td className="py-2.5 px-3 font-bold text-gray-900 dark:text-gray-100">Total Planilla</td>
                <td className="py-2.5 px-3 text-right font-black text-orange-600 dark:text-orange-400">{grandTotal.energyKcal}</td>
                <td className="py-2.5 px-3 text-right font-black text-rose-600 dark:text-rose-400">{grandTotal.proteinG}</td>
                <td className="py-2.5 px-3 text-right font-black text-blue-600 dark:text-blue-400">{grandTotal.fatG}</td>
                <td className="py-2.5 px-3 text-right font-black text-amber-600 dark:text-amber-400">{grandTotal.carbsG}</td>
                <td className="py-2.5 px-3 text-right font-black text-teal-600 dark:text-teal-400">{grandTotal.calciumMg}</td>
                <td className="py-2.5 px-3 text-right font-black text-indigo-600 dark:text-indigo-400">{grandTotal.phosphorusMg}</td>
                <td className="py-2.5 px-3 text-right font-black text-purple-600 dark:text-purple-400">{grandTotal.ironMg}</td>
                <td className="py-2.5 px-3 text-right font-black text-cyan-600 dark:text-cyan-400">{grandTotal.vitCMg}</td>
              </tr>
              <tr className="text-gray-500">
                <td className="py-2.5 px-3 font-semibold">Requerimiento Meta</td>
                <td className="py-2.5 px-3 text-right">{totalKcalTarget}</td>
                <td className="py-2.5 px-3 text-right">{targetProteinGrams}</td>
                <td className="py-2.5 px-3 text-right">{targetFatGrams}</td>
                <td className="py-2.5 px-3 text-right">{targetCarbsGrams}</td>
                <td className="py-2.5 px-3 text-right">1000</td>
                <td className="py-2.5 px-3 text-right">700</td>
                <td className="py-2.5 px-3 text-right">18</td>
                <td className="py-2.5 px-3 text-right">60</td>
              </tr>
            </tbody>
            <tfoot>
              <tr className="bg-indigo-50/70 dark:bg-indigo-950/30 font-black text-sm text-indigo-900 dark:text-indigo-200 border-t-2 border-indigo-400">
                <td className="py-3 px-3 uppercase">Porcentaje de Adecuación (%)</td>
                <td className="py-3 px-3 text-right">{adequacyKcal}%</td>
                <td className="py-3 px-3 text-right">{adequacyProtein}%</td>
                <td className="py-3 px-3 text-right">{adequacyFat}%</td>
                <td className="py-3 px-3 text-right">{adequacyCarbs}%</td>
                <td className="py-3 px-3 text-right">{Math.round((grandTotal.calciumMg / 1000) * 100)}%</td>
                <td className="py-3 px-3 text-right">{Math.round((grandTotal.phosphorusMg / 700) * 100)}%</td>
                <td className="py-3 px-3 text-right">{Math.round((grandTotal.ironMg / 18) * 100)}%</td>
                <td className="py-3 px-3 text-right">{Math.round((grandTotal.vitCMg / 60) * 100)}%</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* 5. MODAL PARA AGREGAR ALIMENTO TBCA */}
      {activeMealName && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white dark:bg-[#141526] rounded-3xl border border-gray-100 dark:border-[#262840] p-6 max-w-lg w-full shadow-2xl space-y-4">
            
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-gray-800">
              <div>
                <span className="text-[10px] font-extrabold uppercase text-indigo-500">Planificar {activeMealName}</span>
                <h3 className="text-base font-extrabold text-gray-900 dark:text-gray-100">
                  Seleccionar de la Tabla Boliviana (918 alimentos)
                </h3>
              </div>
              <button onClick={() => setActiveMealName(null)} className="text-gray-400 hover:text-gray-600">×</button>
            </div>

            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
              <input
                type="text"
                value={modalSearch}
                onChange={(e) => setModalSearch(e.target.value)}
                placeholder="Buscar por nombre o código (ej: tarhui, quinua, amaranto)..."
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:outline-none"
              />
            </div>

            <div className="max-h-48 overflow-y-auto space-y-1 pr-1 text-xs">
              {filteredFoodsForModal.map(food => (
                <div
                  key={food.id}
                  onClick={() => setModalSelectedFood(food)}
                  className={`p-2 rounded-xl cursor-pointer flex items-center justify-between transition-all ${
                    modalSelectedFood.id === food.id
                      ? 'bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-400 text-indigo-800 dark:text-indigo-200 font-bold'
                      : 'hover:bg-gray-50 dark:hover:bg-gray-800/60 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  <span className="truncate max-w-[280px]">#{food.code} — {food.name}</span>
                  <span className="text-[10px] text-gray-400">{food.energyKcal} kcal</span>
                </div>
              ))}
            </div>

            <div className="p-3 rounded-xl bg-gray-50 dark:bg-[#181a30] flex items-center justify-between">
              <span className="text-xs font-bold text-gray-700 dark:text-gray-300">Cantidad en la dieta:</span>
              <div className="flex items-center gap-1.5">
                <input
                  type="number"
                  value={modalGrams}
                  onChange={(e) => setModalGrams(parseFloat(e.target.value) || 0)}
                  className="w-20 p-1.5 text-xs font-bold rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-center"
                />
                <span className="text-xs font-semibold text-gray-500">gramos</span>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                type="button"
                onClick={() => setActiveMealName(null)}
                className="flex-1 py-2 text-xs font-semibold rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleAddItemToMeal}
                className="flex-1 py-2 text-xs font-bold rounded-xl bg-indigo-600 text-white shadow-md shadow-indigo-500/20 hover:bg-indigo-700"
              >
                Agregar a {activeMealName}
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
