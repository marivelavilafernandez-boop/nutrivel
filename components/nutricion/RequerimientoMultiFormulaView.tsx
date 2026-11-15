'use client';

import React, { useState } from 'react';
import { calculateMultiFormulaEnergy } from '@/lib/data/excelNutricionalData';
import { 
  Calculator, 
  Flame, 
  Activity, 
  PieChart, 
  Sparkles, 
  Printer, 
  CheckCircle2, 
  Info,
  Scale,
  Zap,
  ShieldAlert
} from 'lucide-react';

export const RequerimientoMultiFormulaView: React.FC = () => {
  // Parámetros antropométricos
  const [weightKg, setWeightKg] = useState<number>(55);
  const [heightCm, setHeightCm] = useState<number>(158);
  const [age, setAge] = useState<number>(22);
  const [gender, setGender] = useState<'F' | 'M'>('F');
  const [activityFactor, setActivityFactor] = useState<number>(1.55); // Moderada
  const [objectiveAdjustment, setObjectiveAdjustment] = useState<number>(0); // 0 = Mantener

  // Parámetros especiales clínicos
  const [isPregnant, setIsPregnant] = useState<boolean>(false);
  const [isTrauma, setIsTrauma] = useState<boolean>(false);
  const [isBurned, setIsBurned] = useState<boolean>(false);

  // Fórmula seleccionada para prescripción
  const [selectedFormulaIndex, setSelectedFormulaIndex] = useState<number>(1); // Mifflin por defecto

  // Distribución de Macronutrientes
  const [carbsPercent, setCarbsPercent] = useState<number>(55);
  const [proteinPercent, setProteinPercent] = useState<number>(20);
  const [fatPercent, setFatPercent] = useState<number>(25);

  // Cálculo de IMC
  const heightM = heightCm / 100;
  const imc = heightM > 0 ? parseFloat((weightKg / (heightM * heightM)).toFixed(1)) : 0;

  let imcCategory = 'Normopeso';
  let imcColor = 'text-emerald-600 dark:text-emerald-400';
  if (imc < 18.5) {
    imcCategory = 'Bajo Peso';
    imcColor = 'text-amber-600 dark:text-amber-400';
  } else if (imc >= 25 && imc < 30) {
    imcCategory = 'Sobrepeso';
    imcColor = 'text-amber-600 dark:text-amber-400';
  } else if (imc >= 30) {
    imcCategory = 'Obesidad';
    imcColor = 'text-rose-600 dark:text-rose-400';
  }

  // Ejecución del cálculo multi-fórmula
  const formulaResults = calculateMultiFormulaEnergy({
    weightKg,
    heightCm,
    age,
    gender,
    activityFactor,
    objectiveAdjustment,
    isPregnant,
    isTrauma,
    isBurned
  });

  const activeResult = formulaResults[selectedFormulaIndex] || formulaResults[0];

  // Cálculo de gramos de macronutrientes
  const targetKcal = activeResult.adjustedGet;
  const carbsGrams = Math.round((targetKcal * (carbsPercent / 100)) / 4);
  const proteinGrams = Math.round((targetKcal * (proteinPercent / 100)) / 4);
  const fatGrams = Math.round((targetKcal * (fatPercent / 100)) / 9);

  const proteinPerKg = (proteinGrams / weightKg).toFixed(2);
  const carbsPerKg = (carbsGrams / weightKg).toFixed(2);
  const fatPerKg = (fatGrams / weightKg).toFixed(2);

  const totalMacroPercent = carbsPercent + proteinPercent + fatPercent;

  return (
    <div className="space-y-6 pb-16 animate-in fade-in duration-200">
      
      {/* 1. ENCABEZADO */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-100 dark:border-gray-800">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 text-orange-800 dark:bg-orange-950/60 dark:text-orange-300 text-xs font-bold mb-2">
            <Flame className="w-3.5 h-3.5" />
            <span>Módulo Clínico • Excel Nutricional Fabiola SG.B</span>
          </div>
          <h2 className="text-2xl font-extrabold text-gray-900 dark:text-gray-100 tracking-tight">
            Requerimiento Energético Multi-Fórmula
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
            Comparación simultánea de 7 ecuaciones predictivas validadas (Harris-Benedict, Mifflin, Lyle, Butte, Schofield, Ireton-Jones).
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => window.print()}
            className="px-3.5 py-2 text-xs font-bold rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Imprimir Resumen</span>
          </button>
        </div>
      </div>

      {/* 2. PARÁMETROS ANTROPOMÉTRICOS Y CLÍNICOS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Columna Izquierda: Entradas Antropométricas */}
        <div className="bg-white dark:bg-[#141526] p-5 rounded-2xl border border-gray-100 dark:border-[#262840] shadow-xs space-y-4">
          <h3 className="font-extrabold text-sm text-gray-900 dark:text-gray-100 flex items-center gap-2">
            <Scale className="w-4 h-4 text-pink-500" />
            <span>1. Datos del Paciente</span>
          </h3>

          {/* Sexo */}
          <div>
            <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
              Sexo Biológico
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setGender('F')}
                className={`py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  gender === 'F'
                    ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-xs'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300'
                }`}
              >
                👩 Femenino
              </button>
              <button
                type="button"
                onClick={() => setGender('M')}
                className={`py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  gender === 'M'
                    ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-xs'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300'
                }`}
              >
                👨 Masculino
              </button>
            </div>
          </div>

          {/* Peso, Talla, Edad */}
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="text-[10px] font-bold text-gray-400 uppercase block mb-1">Peso (kg)</label>
              <input
                type="number"
                step="0.5"
                value={weightKg}
                onChange={(e) => setWeightKg(parseFloat(e.target.value) || 0)}
                className="w-full p-2 text-sm font-bold rounded-xl bg-gray-50 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 text-center"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-gray-400 uppercase block mb-1">Talla (cm)</label>
              <input
                type="number"
                value={heightCm}
                onChange={(e) => setHeightCm(parseFloat(e.target.value) || 0)}
                className="w-full p-2 text-sm font-bold rounded-xl bg-gray-50 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 text-center"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-gray-400 uppercase block mb-1">Edad (años)</label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(parseInt(e.target.value) || 0)}
                className="w-full p-2 text-sm font-bold rounded-xl bg-gray-50 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 text-center"
              />
            </div>
          </div>

          {/* Tarjeta de IMC Rápido */}
          <div className="p-3 rounded-xl bg-gray-50 dark:bg-[#181a2f] border border-gray-100 dark:border-[#262840] flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase text-gray-400 block">Índice de Masa Corporal</span>
              <p className="text-base font-extrabold text-gray-900 dark:text-gray-100">{imc} kg/m²</p>
            </div>
            <span className={`text-xs font-bold px-2.5 py-1 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 ${imcColor}`}>
              {imcCategory}
            </span>
          </div>

          {/* Actividad Física */}
          <div>
            <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
              Factor de Actividad Física (FA)
            </label>
            <select
              value={activityFactor}
              onChange={(e) => setActivityFactor(parseFloat(e.target.value))}
              className="w-full p-2 text-xs font-semibold rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none"
            >
              <option value={1.2}>Sedentario (Oficina / Reposo) — 1.20</option>
              <option value={1.375}>Actividad Ligera (1-3 días ejerc.) — 1.375</option>
              <option value={1.55}>Actividad Moderada (3-5 días ejerc.) — 1.55</option>
              <option value={1.725}>Actividad Intensa (6-7 días ejerc.) — 1.725</option>
              <option value={1.9}>Atleta de Alto Rendimiento — 1.90</option>
            </select>
          </div>

          {/* Objetivo Calórico */}
          <div>
            <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
              Objetivo Dietoterapéutico
            </label>
            <div className="grid grid-cols-3 gap-1.5">
              <button
                type="button"
                onClick={() => setObjectiveAdjustment(-0.20)}
                className={`py-1.5 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
                  objectiveAdjustment === -0.20
                    ? 'bg-rose-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                }`}
              >
                Bajar (-20%)
              </button>
              <button
                type="button"
                onClick={() => setObjectiveAdjustment(0)}
                className={`py-1.5 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
                  objectiveAdjustment === 0
                    ? 'bg-emerald-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                }`}
              >
                Mantener (0%)
              </button>
              <button
                type="button"
                onClick={() => setObjectiveAdjustment(0.15)}
                className={`py-1.5 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
                  objectiveAdjustment === 0.15
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                }`}
              >
                Subir (+15%)
              </button>
            </div>
          </div>

          {/* Condiciones Especiales (Gestación, Trauma, Quemaduras) */}
          <div className="pt-2 border-t border-gray-100 dark:border-gray-800">
            <span className="text-[10px] font-bold uppercase text-gray-400 block mb-2">Condiciones Especiales Clínicas</span>
            <div className="space-y-1.5 text-xs">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isPregnant}
                  onChange={(e) => setIsPregnant(e.target.checked)}
                  className="rounded text-pink-600 focus:ring-0"
                />
                <span className="text-gray-700 dark:text-gray-300 font-medium">Gestante (+300 kcal Butte)</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isTrauma}
                  onChange={(e) => setIsTrauma(e.target.checked)}
                  className="rounded text-pink-600 focus:ring-0"
                />
                <span className="text-gray-700 dark:text-gray-300 font-medium">Trauma Hospitalario (Ireton-Jones)</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isBurned}
                  onChange={(e) => setIsBurned(e.target.checked)}
                  className="rounded text-pink-600 focus:ring-0"
                />
                <span className="text-gray-700 dark:text-gray-300 font-medium">Gran Quemado (Ireton-Jones)</span>
              </label>
            </div>
          </div>

        </div>

        {/* Columna Central y Derecha: Comparativa de 7 Fórmulas */}
        <div className="lg:col-span-2 space-y-4">
          
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-sm text-gray-900 dark:text-gray-100 flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-500" />
              <span>2. Comparación Simultánea de Fórmulas</span>
            </h3>
            <span className="text-xs text-gray-400">Selecciona una para prescribir</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {formulaResults.map((f, idx) => {
              const isSelected = selectedFormulaIndex === idx;

              return (
                <div
                  key={f.formulaName}
                  onClick={() => setSelectedFormulaIndex(idx)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer relative ${
                    isSelected
                      ? 'bg-gradient-to-br from-pink-500/10 via-rose-500/5 to-transparent border-pink-500 shadow-md shadow-pink-500/10 dark:bg-[#1c1d35]'
                      : 'bg-white dark:bg-[#141526] border-gray-100 dark:border-[#262840] hover:border-pink-300/60'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-gray-400 block">
                        Fórmula #{idx + 1}
                      </span>
                      <h4 className="font-extrabold text-xs text-gray-900 dark:text-gray-100">
                        {f.formulaName}
                      </h4>
                    </div>
                    {isSelected && (
                      <span className="px-2 py-0.5 rounded-full bg-pink-500 text-white text-[9px] font-bold">
                        Activa
                      </span>
                    )}
                  </div>

                  <div className="mt-3 grid grid-cols-2 gap-2 text-center">
                    <div className="bg-gray-50 dark:bg-[#1a1c32] p-2 rounded-xl">
                      <span className="text-[9px] font-bold uppercase text-gray-400 block">TMB Basal</span>
                      <span className="text-sm font-extrabold text-gray-800 dark:text-gray-200">
                        {f.tmb} <span className="text-[10px] font-normal">kcal</span>
                      </span>
                    </div>

                    <div className="bg-pink-50 dark:bg-pink-950/40 p-2 rounded-xl border border-pink-200/50 dark:border-pink-800/40">
                      <span className="text-[9px] font-bold uppercase text-pink-600 dark:text-pink-400 block">GET Objetivo</span>
                      <span className="text-sm font-extrabold text-pink-700 dark:text-pink-300">
                        {f.adjustedGet} <span className="text-[10px] font-normal">kcal</span>
                      </span>
                    </div>
                  </div>

                  <p className="mt-2 text-[10px] text-gray-500 dark:text-gray-400 line-clamp-2">
                    {f.notes}
                  </p>
                </div>
              );
            })}
          </div>

          {/* 3. DESGLOSE DE MACRONUTRIENTES PARA LA FÓRMULA ACTIVA */}
          <div className="bg-white dark:bg-[#141526] p-5 rounded-2xl border border-gray-100 dark:border-[#262840] shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-gray-100 dark:border-gray-800">
              <div>
                <span className="text-[10px] font-bold uppercase text-pink-500 tracking-wider">Prescripción Seleccionada</span>
                <h4 className="text-base font-extrabold text-gray-900 dark:text-gray-100">
                  {activeResult.formulaName} — {targetKcal} kcal/día
                </h4>
              </div>
              <div className="text-right">
                <span className="text-xs font-bold text-gray-500">Suma Macro: </span>
                <span className={`text-xs font-extrabold ${totalMacroPercent === 100 ? 'text-emerald-500' : 'text-rose-500'}`}>
                  {totalMacroPercent}% {totalMacroPercent !== 100 && '(Ajustar a 100%)'}
                </span>
              </div>
            </div>

            {/* Sliders de Macronutrientes */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              
              {/* Carbohidratos */}
              <div className="bg-amber-50/60 dark:bg-amber-950/20 p-3.5 rounded-xl border border-amber-200/60 dark:border-amber-800/30">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-bold text-amber-800 dark:text-amber-300">🌾 Carbohidratos</span>
                  <span className="font-extrabold text-amber-900 dark:text-amber-200">{carbsPercent}%</span>
                </div>
                <input
                  type="range"
                  min="40"
                  max="70"
                  value={carbsPercent}
                  onChange={(e) => setCarbsPercent(parseInt(e.target.value))}
                  className="w-full accent-amber-500"
                />
                <div className="mt-2 flex items-center justify-between text-xs">
                  <span className="font-extrabold text-gray-900 dark:text-gray-100">{carbsGrams} g</span>
                  <span className="text-[10px] text-gray-500">{carbsPerKg} g/kg</span>
                </div>
              </div>

              {/* Proteínas */}
              <div className="bg-rose-50/60 dark:bg-rose-950/20 p-3.5 rounded-xl border border-rose-200/60 dark:border-rose-800/30">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-bold text-rose-800 dark:text-rose-300">🥩 Proteínas</span>
                  <span className="font-extrabold text-rose-900 dark:text-rose-200">{proteinPercent}%</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="35"
                  value={proteinPercent}
                  onChange={(e) => setProteinPercent(parseInt(e.target.value))}
                  className="w-full accent-rose-500"
                />
                <div className="mt-2 flex items-center justify-between text-xs">
                  <span className="font-extrabold text-gray-900 dark:text-gray-100">{proteinGrams} g</span>
                  <span className="text-[10px] text-gray-500">{proteinPerKg} g/kg</span>
                </div>
              </div>

              {/* Grasas */}
              <div className="bg-blue-50/60 dark:bg-blue-950/20 p-3.5 rounded-xl border border-blue-200/60 dark:border-blue-800/30">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-bold text-blue-800 dark:text-blue-300">🥑 Grasas / Lípidos</span>
                  <span className="font-extrabold text-blue-900 dark:text-blue-200">{fatPercent}%</span>
                </div>
                <input
                  type="range"
                  min="15"
                  max="40"
                  value={fatPercent}
                  onChange={(e) => setFatPercent(parseInt(e.target.value))}
                  className="w-full accent-blue-500"
                />
                <div className="mt-2 flex items-center justify-between text-xs">
                  <span className="font-extrabold text-gray-900 dark:text-gray-100">{fatGrams} g</span>
                  <span className="text-[10px] text-gray-500">{fatPerKg} g/kg</span>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
