'use client';

import React, { useState, useMemo } from 'react';
import tbcaDataRaw from '@/lib/data/fullTbcaFoods.json';
import { TbcaFoodItem } from '@/lib/types';
import { 
  ClipboardList, 
  Plus, 
  Trash2, 
  Printer, 
  RotateCcw, 
  Sparkles, 
  CheckCircle2, 
  PieChart,
  Flame,
  Scale,
  Search,
  Info
} from 'lucide-react';

interface R24Item {
  id: string;
  foodId: string;
  code: string;
  name: string;
  grams: number;
  kcal: number;
  protein: number;
  fat: number;
  carbs: number;
  fiberMg: number;
}

interface MealTimeSlot {
  name: string;
  items: R24Item[];
}

export const Recordatorio24hExcelView: React.FC = () => {
  const allFoods = tbcaDataRaw as TbcaFoodItem[];

  const [patientName, setPatientName] = useState('Mariana Quispe Mamani');
  const [evaluationDate, setEvaluationDate] = useState(new Date().toISOString().split('T')[0]);
  const [targetKcal, setTargetKcal] = useState<number>(2200);

  // Comidas con el ejemplo clínico típico del Excel Fabiola SG.B
  const [meals, setMeals] = useState<Record<string, R24Item[]>>({
    'DESAYUNO': [
      { id: 'item_1', foodId: 'tbca_112', code: '112', name: 'Pan marraqueta', grams: 100, kcal: 293, protein: 8.84, fat: 0.61, carbs: 62.96, fiberMg: 260 },
      { id: 'item_2', foodId: 'tbca_163', code: '163', name: 'Brócoli al vapor', grams: 44, kcal: 19.8, protein: 1.56, fat: 0.32, carbs: 2.7, fiberMg: 1262 },
      { id: 'item_3', foodId: 'tbca_108', code: '108', name: 'Pan con harina de trigo y cañahua', grams: 69, kcal: 247.02, protein: 8.97, fat: 6.21, carbs: 38.76, fiberMg: 1842 }
    ],
    'COLACIÓN 1': [
      { id: 'item_4', foodId: 'tbca_112', code: '112', name: 'Pan marraqueta con queso criollo', grams: 50, kcal: 146.5, protein: 4.42, fat: 0.31, carbs: 31.48, fiberMg: 130 }
    ],
    'ALMUERZO': [
      { id: 'item_5', foodId: 'tbca_103', code: '103', name: 'Mezcla de harina de soya, quinua y chocolate', grams: 100, kcal: 392, protein: 10, fat: 8, carbs: 70, fiberMg: 2010 },
      { id: 'item_6', foodId: 'tbca_112', code: '112', name: 'Pan marraqueta', grams: 50, kcal: 146.5, protein: 4.42, fat: 0.31, carbs: 31.48, fiberMg: 130 }
    ],
    'COLACIÓN 2': [
      { id: 'item_7', foodId: 'tbca_678', code: '678', name: 'Fruto de palmera', grams: 50, kcal: 166.5, protein: 1.25, fat: 6.27, carbs: 26.33, fiberMg: 19150 },
      { id: 'item_8', foodId: 'tbca_254', code: '254', name: 'Granadilla fresca', grams: 100, kcal: 102, protein: 2.2, fat: 0.22, carbs: 22.85, fiberMg: 3960 }
    ],
    'CENA': [
      { id: 'item_9', foodId: 'tbca_144', code: '144', name: 'Salvado de arroz', grams: 50, kcal: 201, protein: 6.16, fat: 7.42, carbs: 27.47, fiberMg: 4825 },
      { id: 'item_10', foodId: 'tbca_112', code: '112', name: 'Pan marraqueta', grams: 100, kcal: 293, protein: 8.84, fat: 0.61, carbs: 62.96, fiberMg: 260 }
    ]
  });

  // Modal para agregar alimento
  const [activeMealName, setActiveMealName] = useState<string | null>(null);
  const [modalSearch, setModalSearch] = useState('');
  const [modalSelectedFood, setModalSelectedFood] = useState<TbcaFoodItem>(allFoods[0]);
  const [modalGrams, setModalGrams] = useState<number>(100);

  const mealNames = ['DESAYUNO', 'COLACIÓN 1', 'ALMUERZO', 'COLACIÓN 2', 'CENA'];

  const filteredFoodsForModal = useMemo(() => {
    if (!modalSearch.trim()) return allFoods.slice(0, 20);
    const q = modalSearch.toLowerCase().trim();
    return allFoods.filter(f => f.name.toLowerCase().includes(q) || f.code.includes(q)).slice(0, 30);
  }, [allFoods, modalSearch]);

  const handleAddItemToMeal = () => {
    if (!activeMealName || !modalSelectedFood) return;
    const factor = modalGrams / 100;
    const newItem: R24Item = {
      id: `r24_${Date.now()}`,
      foodId: modalSelectedFood.id,
      code: modalSelectedFood.code,
      name: modalSelectedFood.name,
      grams: modalGrams,
      kcal: Math.round(modalSelectedFood.energyKcal * factor * 10) / 10,
      protein: Math.round(modalSelectedFood.proteinG * factor * 100) / 100,
      fat: Math.round(modalSelectedFood.fatG * factor * 100) / 100,
      carbs: Math.round(modalSelectedFood.carbsG * factor * 100) / 100,
      fiberMg: Math.round(modalSelectedFood.fiberG * 1000 * factor)
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

  const handleReset = () => {
    setMeals({
      'DESAYUNO': [],
      'COLACIÓN 1': [],
      'ALMUERZO': [],
      'COLACIÓN 2': [],
      'CENA': []
    });
  };

  // Cálculos por tiempo de comida
  const mealTotals = useMemo(() => {
    const res: Record<string, { kcal: number; protein: number; fat: number; carbs: number; fiberMg: number }> = {};
    mealNames.forEach(m => {
      const items = meals[m] || [];
      res[m] = {
        kcal: Math.round(items.reduce((sum, i) => sum + i.kcal, 0) * 10) / 10,
        protein: Math.round(items.reduce((sum, i) => sum + i.protein, 0) * 10) / 10,
        fat: Math.round(items.reduce((sum, i) => sum + i.fat, 0) * 10) / 10,
        carbs: Math.round(items.reduce((sum, i) => sum + i.carbs, 0) * 10) / 10,
        fiberMg: Math.round(items.reduce((sum, i) => sum + i.fiberMg, 0))
      };
    });
    return res;
  }, [meals, mealNames]);

  // Totales generales
  const grandTotal = useMemo(() => {
    let kcal = 0, protein = 0, fat = 0, carbs = 0, fiberMg = 0;
    Object.values(mealTotals).forEach(t => {
      kcal += t.kcal;
      protein += t.protein;
      fat += t.fat;
      carbs += t.carbs;
      fiberMg += t.fiberMg;
    });
    return {
      kcal: Math.round(kcal),
      protein: Math.round(protein * 10) / 10,
      fat: Math.round(fat * 10) / 10,
      carbs: Math.round(carbs * 10) / 10,
      fiberMg: Math.round(fiberMg)
    };
  }, [mealTotals]);

  // % de adecuación
  const kcalAdequacy = targetKcal > 0 ? Math.round((grandTotal.kcal / targetKcal) * 100) : 0;

  return (
    <div className="space-y-6 pb-16 animate-in fade-in duration-200">
      
      {/* 1. ENCABEZADO */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-100 dark:border-gray-800">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 text-xs font-bold mb-2">
            <ClipboardList className="w-3.5 h-3.5" />
            <span>Módulo Clínico • Hoja RECORD. 24HRS (Excel Fabiola SG.B)</span>
          </div>
          <h2 className="text-2xl font-extrabold text-gray-900 dark:text-gray-100 tracking-tight">
            Recordatorio de 24 Horas (R24H)
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
            Encuesta dietética retrospectiva cuantitativa por 5 tiempos de comida con cálculo de macronutrientes y porcentaje de adecuación.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => window.print()}
            className="px-3.5 py-2 text-xs font-bold rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Imprimir R24H</span>
          </button>
          <button
            onClick={handleReset}
            className="p-2 text-xs font-semibold rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:text-red-600 transition-all cursor-pointer"
            title="Limpiar recordatorio"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 2. DATOS DEL PACIENTE Y RESUMEN GENERAL DE ADECUACIÓN */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        
        <div className="bg-white dark:bg-[#141526] p-4 rounded-2xl border border-gray-100 dark:border-[#262840] shadow-xs">
          <label className="text-[10px] font-bold uppercase text-gray-400 block mb-1">Paciente</label>
          <input
            type="text"
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
            className="w-full font-bold text-sm bg-transparent border-b border-gray-200 dark:border-gray-700 pb-1 focus:outline-none focus:border-pink-500 text-gray-900 dark:text-gray-100"
          />
          <div className="flex items-center justify-between text-xs text-gray-500 mt-3">
            <span>Fecha R24H:</span>
            <input
              type="date"
              value={evaluationDate}
              onChange={(e) => setEvaluationDate(e.target.value)}
              className="bg-transparent text-gray-700 dark:text-gray-300 font-semibold focus:outline-none"
            />
          </div>
        </div>

        <div className="bg-white dark:bg-[#141526] p-4 rounded-2xl border border-gray-100 dark:border-[#262840] shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase text-gray-400">Requerimiento Objetivo</span>
            <span className="text-xs font-extrabold text-pink-600 dark:text-pink-400">Kcal Meta</span>
          </div>
          <div className="mt-2 flex items-center gap-2">
            <input
              type="number"
              value={targetKcal}
              onChange={(e) => setTargetKcal(parseInt(e.target.value) || 0)}
              className="w-28 p-1.5 text-base font-extrabold rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-center"
            />
            <span className="text-xs font-bold text-gray-400">kcal / día</span>
          </div>
          <div className="mt-2 flex items-center justify-between text-xs">
            <span className="text-gray-500">Consumo R24H:</span>
            <span className="font-extrabold text-orange-600 dark:text-orange-400">{grandTotal.kcal} kcal</span>
          </div>
        </div>

        {/* Tarjeta de Adecuación Calórica */}
        <div className="bg-white dark:bg-[#141526] p-4 rounded-2xl border border-gray-100 dark:border-[#262840] shadow-xs flex items-center gap-4">
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-sm text-white shadow-md ${
            kcalAdequacy >= 90 && kcalAdequacy <= 110
              ? 'bg-gradient-to-tr from-emerald-500 to-teal-500'
              : kcalAdequacy < 90
              ? 'bg-gradient-to-tr from-amber-500 to-orange-500'
              : 'bg-gradient-to-tr from-rose-500 to-red-600'
          }`}>
            {kcalAdequacy}%
          </div>
          <div className="min-w-0">
            <span className="text-[10px] font-bold uppercase text-gray-400 block">Adecuación Calórica</span>
            <span className="text-xs font-extrabold text-gray-900 dark:text-gray-100">
              {kcalAdequacy >= 90 && kcalAdequacy <= 110 ? '✅ Dieta Normocalórica (Adecuada)' :
               kcalAdequacy < 90 ? '⚠️ Ingesta Insuficiente (Déficit)' : '⚠️ Ingesta Excesiva (Superávit)'}
            </span>
            <p className="text-[10px] text-gray-400 mt-0.5">Rango normal esperado: 90% a 110%</p>
          </div>
        </div>

      </div>

      {/* 3. TABLAS POR TIEMPO DE COMIDA (EXACTO DEL EXCEL) */}
      <div className="space-y-4">
        {mealNames.map((mealName) => {
          const items = meals[mealName] || [];
          const totals = mealTotals[mealName];

          return (
            <div 
              key={mealName}
              className="bg-white dark:bg-[#141526] rounded-2xl border border-gray-100 dark:border-[#262840] overflow-hidden shadow-xs"
            >
              <div className="p-3.5 bg-gray-50/70 dark:bg-[#181a30] border-b border-gray-100 dark:border-[#262840] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-pink-500" />
                  <h4 className="font-extrabold text-xs text-gray-900 dark:text-gray-100 tracking-wider">
                    {mealName}
                  </h4>
                  <span className="text-[10px] font-bold text-gray-400">({items.length} alimentos)</span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-orange-600 dark:text-orange-400 hidden sm:inline">
                    {totals.kcal} kcal | P: {totals.protein}g | G: {totals.fat}g | C: {totals.carbs}g
                  </span>
                  <button
                    onClick={() => { setActiveMealName(mealName); setModalSearch(''); }}
                    className="px-2.5 py-1 rounded-xl bg-pink-50 dark:bg-pink-950/40 text-pink-600 dark:text-pink-300 font-bold text-xs hover:bg-pink-100 transition-all flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Agregar</span>
                  </button>
                </div>
              </div>

              {items.length === 0 ? (
                <div className="p-4 text-center text-xs text-gray-400 italic">
                  No se registraron alimentos en este tiempo de comida.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="border-b border-gray-100 dark:border-[#202238] text-gray-400 uppercase text-[9px] font-bold">
                        <th className="py-2 px-3">Cód #</th>
                        <th className="py-2 px-4">Alimento</th>
                        <th className="py-2 px-3 text-right">Cant. (g)</th>
                        <th className="py-2 px-3 text-right">Energía (kcal)</th>
                        <th className="py-2 px-3 text-right">Proteína (g)</th>
                        <th className="py-2 px-3 text-right">Grasa (g)</th>
                        <th className="py-2 px-3 text-right">CH (g)</th>
                        <th className="py-2 px-3 text-right">Fibra (mg)</th>
                        <th className="py-2 px-3 text-center">Acción</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-[#202238]">
                      {items.map(item => (
                        <tr key={item.id} className="hover:bg-gray-50/50 dark:hover:bg-[#1a1c35]/50">
                          <td className="py-2 px-3 font-mono text-gray-400 text-[10px]">#{item.code}</td>
                          <td className="py-2 px-4 font-bold text-gray-800 dark:text-gray-200">{item.name}</td>
                          <td className="py-2 px-3 text-right font-semibold">{item.grams} g</td>
                          <td className="py-2 px-3 text-right font-extrabold text-orange-600 dark:text-orange-400">{item.kcal}</td>
                          <td className="py-2 px-3 text-right text-rose-600 dark:text-rose-400">{item.protein}</td>
                          <td className="py-2 px-3 text-right text-blue-600 dark:text-blue-400">{item.fat}</td>
                          <td className="py-2 px-3 text-right text-amber-600 dark:text-amber-400">{item.carbs}</td>
                          <td className="py-2 px-3 text-right text-emerald-600 dark:text-emerald-400">{item.fiberMg}</td>
                          <td className="py-2 px-3 text-center">
                            <button
                              onClick={() => handleRemoveItem(mealName, item.id)}
                              className="text-gray-400 hover:text-red-500 text-xs p-1"
                              title="Eliminar alimento"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr className="bg-gray-50/60 dark:bg-[#1a1c32]/60 font-extrabold text-[11px] text-gray-800 dark:text-gray-200">
                        <td colSpan={2} className="py-2 px-3 text-pink-600 dark:text-pink-400">Total {mealName}</td>
                        <td className="py-2 px-3 text-right">{items.reduce((s, i) => s + i.grams, 0)} g</td>
                        <td className="py-2 px-3 text-right text-orange-600 dark:text-orange-400">{totals.kcal}</td>
                        <td className="py-2 px-3 text-right text-rose-600 dark:text-rose-400">{totals.protein}</td>
                        <td className="py-2 px-3 text-right text-blue-600 dark:text-blue-400">{totals.fat}</td>
                        <td className="py-2 px-3 text-right text-amber-600 dark:text-amber-400">{totals.carbs}</td>
                        <td className="py-2 px-3 text-right text-emerald-600 dark:text-emerald-400">{totals.fiberMg}</td>
                        <td></td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* 4. TOTAL GENERAL RECORDATORIO DE 24 HRS (TABLA OFICIAL FABIOLA SG.B) */}
      <div className="bg-white dark:bg-[#141526] rounded-2xl border border-gray-100 dark:border-[#262840] p-5 shadow-xs space-y-4">
        <h4 className="font-extrabold text-sm text-gray-900 dark:text-gray-100 flex items-center gap-2">
          <PieChart className="w-4 h-4 text-pink-500" />
          <span>TOTAL RECORDATORIO DE 24 HORAS (CONSOLIDADO)</span>
        </h4>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700 text-gray-400 uppercase text-[10px] font-extrabold">
                <th className="py-2.5 px-3">TIEMPO DE COMIDA</th>
                <th className="py-2.5 px-3 text-right">Proteína (g)</th>
                <th className="py-2.5 px-3 text-right">Grasa (g)</th>
                <th className="py-2.5 px-3 text-right">Carbohidratos (g)</th>
                <th className="py-2.5 px-3 text-right">Energía (kcal)</th>
                <th className="py-2.5 px-3 text-right">% del Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-[#202238]">
              {mealNames.map(m => {
                const t = mealTotals[m];
                const pct = grandTotal.kcal > 0 ? Math.round((t.kcal / grandTotal.kcal) * 100) : 0;
                return (
                  <tr key={m}>
                    <td className="py-2 px-3 font-bold text-gray-800 dark:text-gray-200">{m}</td>
                    <td className="py-2 px-3 text-right text-rose-600 dark:text-rose-400 font-semibold">{t.protein}</td>
                    <td className="py-2 px-3 text-right text-blue-600 dark:text-blue-400 font-semibold">{t.fat}</td>
                    <td className="py-2 px-3 text-right text-amber-600 dark:text-amber-400 font-semibold">{t.carbs}</td>
                    <td className="py-2 px-3 text-right text-orange-600 dark:text-orange-400 font-extrabold">{t.kcal}</td>
                    <td className="py-2 px-3 text-right text-gray-400 font-bold">{pct}%</td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr className="bg-pink-50/70 dark:bg-pink-950/30 font-black text-sm text-gray-900 dark:text-gray-100 border-t-2 border-pink-400">
                <td className="py-3 px-3 uppercase text-pink-700 dark:text-pink-300">TOTAL DÍA</td>
                <td className="py-3 px-3 text-right text-rose-600 dark:text-rose-400">{grandTotal.protein} g</td>
                <td className="py-3 px-3 text-right text-blue-600 dark:text-blue-400">{grandTotal.fat} g</td>
                <td className="py-3 px-3 text-right text-amber-600 dark:text-amber-400">{grandTotal.carbs} g</td>
                <td className="py-3 px-3 text-right text-orange-600 dark:text-orange-400">{grandTotal.kcal} kcal</td>
                <td className="py-3 px-3 text-right text-pink-600 dark:text-pink-400">100%</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* 5. MODAL PARA SELECCIONAR ALIMENTO DE LA BASE TBCA */}
      {activeMealName && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white dark:bg-[#141526] rounded-3xl border border-gray-100 dark:border-[#262840] p-6 max-w-lg w-full shadow-2xl space-y-4">
            
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-gray-800">
              <div>
                <span className="text-[10px] font-extrabold uppercase text-pink-500">Agregar a {activeMealName}</span>
                <h3 className="text-base font-extrabold text-gray-900 dark:text-gray-100">
                  Seleccionar Alimento de la Tabla Boliviana (TBCA)
                </h3>
              </div>
              <button onClick={() => setActiveMealName(null)} className="text-gray-400 hover:text-gray-600">×</button>
            </div>

            {/* Buscador interno */}
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
              <input
                type="text"
                value={modalSearch}
                onChange={(e) => setModalSearch(e.target.value)}
                placeholder="Buscar entre los 918 alimentos bolivianos..."
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:outline-none"
              />
            </div>

            {/* Lista desplegable rápida */}
            <div className="max-h-48 overflow-y-auto space-y-1 pr-1 text-xs">
              {filteredFoodsForModal.map(food => (
                <div
                  key={food.id}
                  onClick={() => setModalSelectedFood(food)}
                  className={`p-2 rounded-xl cursor-pointer flex items-center justify-between transition-all ${
                    modalSelectedFood.id === food.id
                      ? 'bg-pink-50 dark:bg-pink-950/60 border border-pink-400 text-pink-800 dark:text-pink-200 font-bold'
                      : 'hover:bg-gray-50 dark:hover:bg-gray-800/60 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  <span className="truncate max-w-[280px]">#{food.code} — {food.name}</span>
                  <span className="text-[10px] text-gray-400">{food.energyKcal} kcal/100g</span>
                </div>
              ))}
            </div>

            {/* Cantidad en gramos */}
            <div className="p-3 rounded-xl bg-gray-50 dark:bg-[#181a30] flex items-center justify-between">
              <span className="text-xs font-bold text-gray-700 dark:text-gray-300">Cantidad consumida:</span>
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
                className="flex-1 py-2 text-xs font-bold rounded-xl bg-pink-600 text-white shadow-md shadow-pink-500/20 hover:bg-pink-700"
              >
                Agregar al {activeMealName}
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
