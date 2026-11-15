'use client';

import React, { useState } from 'react';
import { 
  Calculator, 
  Flame, 
  Activity, 
  Droplet, 
  Scale, 
  CheckCircle2, 
  AlertCircle, 
  Info, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

export const CalculadorasNutricionales: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'imc' | 'get' | 'proteina' | 'agua'>('imc');

  // ------------------ ESTADOS IMC ------------------
  const [weightKg, setWeightKg] = useState<number>(62);
  const [heightCm, setHeightCm] = useState<number>(165);
  const [age, setAge] = useState<number>(23);
  const [gender, setGender] = useState<'mujer' | 'hombre'>('mujer');
  const [population, setPopulation] = useState<'adulto' | 'adulto_mayor'>('adulto');

  // Cálculo IMC
  const heightM = heightCm / 100;
  const imc = heightM > 0 ? parseFloat((weightKg / (heightM * heightM)).toFixed(1)) : 0;

  // Clasificación OMS
  let imcCategory = 'Normopeso';
  let imcColor = 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800';
  let imcAdvice = 'Estado nutricional normal. Mantener hábitos de alimentación equilibrada y actividad física.';

  if (population === 'adulto') {
    if (imc < 18.5) {
      imcCategory = 'Bajo Peso';
      imcColor = 'text-amber-600 bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800';
      imcAdvice = 'Riesgo de déficit calórico y micronutricional. Evaluar ingesta proteica y causas subyacentes.';
    } else if (imc >= 18.5 && imc <= 24.9) {
      imcCategory = 'Normopeso (Rango Saludable)';
      imcColor = 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800';
      imcAdvice = 'Excelente. Peso adecuado para la talla según parámetros de la Organización Mundial de la Salud.';
    } else if (imc >= 25.0 && imc <= 29.9) {
      imcCategory = 'Sobrepeso';
      imcColor = 'text-orange-600 bg-orange-50 dark:bg-orange-950/40 border-orange-200 dark:border-orange-800';
      imcAdvice = 'Recomendar plan dietético con déficit moderado (300-500 kcal) y reeducación alimentaria.';
    } else if (imc >= 30.0 && imc <= 34.9) {
      imcCategory = 'Obesidad Grado I';
      imcColor = 'text-rose-600 bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800';
      imcAdvice = 'Riesgo cardiovascular aumentado. Intervención multidisciplinaria y plan hipocalórico individualizado.';
    } else if (imc >= 35.0 && imc <= 39.9) {
      imcCategory = 'Obesidad Grado II';
      imcColor = 'text-red-600 bg-red-50 dark:bg-red-950/40 border-red-200 dark:border-red-800';
      imcAdvice = 'Riesgo alto de comorbilidades metabólicas (DM2, dislipidemias, hipertensión arterial).';
    } else {
      imcCategory = 'Obesidad Grado III (Mórbida)';
      imcColor = 'text-purple-600 bg-purple-50 dark:bg-purple-950/40 border-purple-200 dark:border-purple-800';
      imcAdvice = 'Riesgo muy severo. Requiere abordaje clínico estricto y valoración integral.';
    }
  } else {
    // Adulto Mayor (Lipschitz)
    if (imc < 23) {
      imcCategory = 'Bajo Peso (Adulto Mayor)';
      imcColor = 'text-amber-600 bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800';
      imcAdvice = 'Criterio Lipschitz: Riesgo de fragilidad y sarcopenia. Priorizar densidad calórica y proteínas.';
    } else if (imc >= 23 && imc <= 28) {
      imcCategory = 'Normopeso (Adulto Mayor)';
      imcColor = 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800';
      imcAdvice = 'Rango protector óptimo para adultos mayores (reserva fisiológica).';
    } else {
      imcCategory = 'Sobrepeso / Obesidad (Adulto Mayor)';
      imcColor = 'text-rose-600 bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800';
      imcAdvice = 'Control sin dietas restrictivas drásticas para preservar masa muscular magra.';
    }
  }

  // Peso Ideal Hamwi
  const inchesOver5ft = Math.max(0, (heightCm / 2.54) - 60);
  const idealWeightHamwi = gender === 'hombre'
    ? parseFloat((48 + (2.7 * inchesOver5ft)).toFixed(1))
    : parseFloat((45.5 + (2.2 * inchesOver5ft)).toFixed(1));

  // Peso Ideal Lorentz
  const idealWeightLorentz = gender === 'hombre'
    ? parseFloat(((heightCm - 100) - ((heightCm - 150) / 4)).toFixed(1))
    : parseFloat(((heightCm - 100) - ((heightCm - 150) / 2.5)).toFixed(1));

  // Rango saludable (18.5 - 24.9)
  const minHealthyWeight = parseFloat((18.5 * heightM * heightM).toFixed(1));
  const maxHealthyWeight = parseFloat((24.9 * heightM * heightM).toFixed(1));

  // Peso Ajustado para Obesidad (Fórmula de Wilkens para IMC >= 30)
  // PA = PI + 0.25 * (Peso Actual - PI)
  const adjustedWeightWilkens = parseFloat(
    (idealWeightLorentz + (0.25 * Math.max(0, weightKg - idealWeightLorentz))).toFixed(1)
  );

  // ------------------ ESTADOS GET / TMB ------------------
  const [formulaTmb, setFormulaTmb] = useState<'mifflin' | 'harris' | 'oms' | 'katch'>('mifflin');
  const [bodyFatKatch, setBodyFatKatch] = useState<number>(24); // % Grasa para Katch-McArdle
  const [useAdjustedWeight, setUseAdjustedWeight] = useState<boolean>(imc >= 30);
  const [activityFactor, setActivityFactor] = useState<number>(1.55); // Moderado
  const [stressFactor, setStressFactor] = useState<number>(1.0); // Sin estrés
  const [includeEta, setIncludeEta] = useState<boolean>(true); // ETA 10%

  // Peso de cálculo (Actual o Ajustado si tiene obesidad)
  const effectiveWeight = (useAdjustedWeight && imc >= 30) ? adjustedWeightWilkens : weightKg;

  // Cálculo TMB
  let tmb = 0;
  if (formulaTmb === 'mifflin') {
    // Mifflin-St Jeor (1990)
    tmb = gender === 'hombre'
      ? (10 * effectiveWeight) + (6.25 * heightCm) - (5 * age) + 5
      : (10 * effectiveWeight) + (6.25 * heightCm) - (5 * age) - 161;
  } else if (formulaTmb === 'harris') {
    // Harris-Benedict revisada por Roza & Shizgal (1984)
    tmb = gender === 'hombre'
      ? 88.362 + (13.397 * effectiveWeight) + (4.799 * heightCm) - (5.677 * age)
      : 447.593 + (9.247 * effectiveWeight) + (3.098 * heightCm) - (4.330 * age);
  } else if (formulaTmb === 'katch') {
    // Katch-McArdle (Basado en Masa Magra)
    const leanMass = effectiveWeight * (1 - (bodyFatKatch / 100));
    tmb = 370 + (21.6 * leanMass);
  } else {
    // OMS / FAO / UNU
    if (gender === 'hombre') {
      if (age < 30) tmb = (15.3 * effectiveWeight) + 679;
      else if (age <= 60) tmb = (11.6 * effectiveWeight) + 879;
      else tmb = (13.5 * effectiveWeight) + 487;
    } else {
      if (age < 30) tmb = (14.7 * effectiveWeight) + 496;
      else if (age <= 60) tmb = (8.7 * effectiveWeight) + 829;
      else tmb = (10.5 * effectiveWeight) + 596;
    }
  }

  tmb = Math.round(tmb);
  const etaCalories = includeEta ? Math.round(tmb * 0.10) : 0;
  const getCalculated = Math.round((tmb * activityFactor * stressFactor) + etaCalories);

  // ------------------ ESTADOS PROTEÍNA ------------------
  const [proteinCategory, setProteinCategory] = useState<number>(1.2); // 1.2 g/kg por defecto

  const proteinGramsTotal = parseFloat((effectiveWeight * proteinCategory).toFixed(1));
  const proteinKcalTotal = Math.round(proteinGramsTotal * 4);
  const proteinPercentageOfGet = getCalculated > 0 
    ? Math.round((proteinKcalTotal / getCalculated) * 100) 
    : 0;

  // ------------------ ESTADOS AGUA / HIDRATACIÓN ------------------
  // Método 1: 30-35 ml/kg
  const waterByWeight = Math.round(effectiveWeight * 35);
  // Método 2: 1 ml/kcal
  const waterByKcal = Math.round(getCalculated * 1.0);
  // Método 3: Holliday-Segar
  const waterHolliday = effectiveWeight <= 10 
    ? Math.round(effectiveWeight * 100)
    : effectiveWeight <= 20
      ? Math.round(1000 + ((effectiveWeight - 10) * 50))
      : Math.round(1500 + ((effectiveWeight - 20) * 20));

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-200">
      
      {/* Encabezado */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-100 dark:border-gray-800">
        <div>
          <h2 className="text-2xl font-extrabold text-gray-900 dark:text-gray-100 flex items-center gap-2">
            <Calculator className="w-6 h-6 text-pink-500" />
            Calculadoras Nutricionales Clínicas
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
            Herramientas validadas para tus evaluaciones clínicas, trabajos de dietoterapia y pasantías.
          </p>
        </div>

        {/* Selector de Calculadora */}
        <div className="flex overflow-x-auto max-w-full p-1 rounded-2xl bg-gray-100 dark:bg-[#1a1c30] border border-gray-200/60 dark:border-[#2b2e4c]">
          <button
            onClick={() => setActiveTab('imc')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 ${
              activeTab === 'imc'
                ? 'bg-white dark:bg-[#252847] text-pink-600 dark:text-pink-400 shadow-xs'
                : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            IMC & Peso Ideal
          </button>
          <button
            onClick={() => setActiveTab('get')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 ${
              activeTab === 'get'
                ? 'bg-white dark:bg-[#252847] text-pink-600 dark:text-pink-400 shadow-xs'
                : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            TMB & GET
          </button>
          <button
            onClick={() => setActiveTab('proteina')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 ${
              activeTab === 'proteina'
                ? 'bg-white dark:bg-[#252847] text-pink-600 dark:text-pink-400 shadow-xs'
                : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            Proteínas
          </button>
          <button
            onClick={() => setActiveTab('agua')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 ${
              activeTab === 'agua'
                ? 'bg-white dark:bg-[#252847] text-pink-600 dark:text-pink-400 shadow-xs'
                : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            Hidratación
          </button>
        </div>
      </div>

      {/* ------------------ SECCIÓN 1: IMC Y PESO IDEAL ------------------ */}
      {activeTab === 'imc' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Formulario de Datos Antropométricos */}
          <div className="bg-white dark:bg-[#18221f] rounded-3xl p-6 border border-gray-100 dark:border-[#293a34] shadow-xs space-y-4">
            <h3 className="text-base font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
              <Scale className="w-4 h-4 text-pink-500" />
              Datos Antropométricos del Paciente
            </h3>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-gray-600 dark:text-gray-300 block mb-1">
                  Sexo
                </label>
                <div className="grid grid-cols-2 gap-1 bg-gray-50 dark:bg-[#121816] p-1 rounded-xl border border-gray-200 dark:border-gray-700">
                  <button
                    type="button"
                    onClick={() => setGender('mujer')}
                    className={`text-xs py-1.5 rounded-lg font-bold transition-all ${
                      gender === 'mujer' ? 'bg-pink-500 text-white shadow-xs' : 'text-gray-500'
                    }`}
                  >
                    Mujer
                  </button>
                  <button
                    type="button"
                    onClick={() => setGender('hombre')}
                    className={`text-xs py-1.5 rounded-lg font-bold transition-all ${
                      gender === 'hombre' ? 'bg-pink-500 text-white shadow-xs' : 'text-gray-500'
                    }`}
                  >
                    Hombre
                  </button>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-600 dark:text-gray-300 block mb-1">
                  Población
                </label>
                <select
                  value={population}
                  onChange={(e) => setPopulation(e.target.value as any)}
                  className="w-full text-xs bg-gray-50 dark:bg-[#121816] border border-gray-200 dark:border-gray-700 rounded-xl px-2.5 py-2 text-gray-800 dark:text-gray-200 focus:outline-hidden focus:ring-2 focus:ring-pink-400"
                >
                  <option value="adulto">Adulto (18-59 años)</option>
                  <option value="adulto_mayor">Adulto Mayor (≥60 años)</option>
                </select>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-semibold text-gray-600 dark:text-gray-300">
                  Peso Actual
                </label>
                <span className="text-xs font-extrabold text-pink-600 dark:text-pink-400">{weightKg} kg</span>
              </div>
              <input
                type="number"
                step="0.5"
                min="30"
                max="250"
                value={weightKg}
                onChange={(e) => setWeightKg(parseFloat(e.target.value) || 0)}
                className="w-full text-sm bg-gray-50 dark:bg-[#121816] border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2 text-gray-800 dark:text-gray-200 focus:outline-hidden focus:ring-2 focus:ring-pink-400 font-bold"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-semibold text-gray-600 dark:text-gray-300">
                  Estatura / Talla
                </label>
                <span className="text-xs font-extrabold text-pink-600 dark:text-pink-400">{heightCm} cm</span>
              </div>
              <input
                type="number"
                min="100"
                max="230"
                value={heightCm}
                onChange={(e) => setHeightCm(parseFloat(e.target.value) || 0)}
                className="w-full text-sm bg-gray-50 dark:bg-[#121816] border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2 text-gray-800 dark:text-gray-200 focus:outline-hidden focus:ring-2 focus:ring-pink-400 font-bold"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-semibold text-gray-600 dark:text-gray-300">
                  Edad
                </label>
                <span className="text-xs font-extrabold text-pink-600 dark:text-pink-400">{age} años</span>
              </div>
              <input
                type="number"
                min="10"
                max="110"
                value={age}
                onChange={(e) => setAge(parseInt(e.target.value) || 0)}
                className="w-full text-sm bg-gray-50 dark:bg-[#121816] border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2 text-gray-800 dark:text-gray-200 focus:outline-hidden focus:ring-2 focus:ring-pink-400 font-bold"
              />
            </div>
          </div>

          {/* Resultado y Diagnóstico Nutricional (Ocupa 2 columnas) */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Tarjeta de Diagnóstico IMC */}
            <div className="bg-white dark:bg-[#18221f] rounded-3xl p-6 border border-gray-100 dark:border-[#293a34] shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-100 dark:border-gray-800">
                <div>
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Índice de Masa Corporal (IMC)</span>
                  <div className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100 mt-1 flex items-baseline gap-2">
                    {imc} <span className="text-base font-semibold text-gray-400">kg/m²</span>
                  </div>
                </div>

                <div className={`px-4 py-2 rounded-2xl border text-sm font-bold inline-flex items-center gap-2 ${imcColor}`}>
                  <Activity className="w-4 h-4" />
                  <span>{imcCategory}</span>
                </div>
              </div>

              {/* Barra visual de rangos de IMC */}
              <div className="mt-4">
                <div className="flex justify-between text-[11px] font-semibold text-gray-400 mb-1">
                  <span>Bajo &lt;18.5</span>
                  <span>Normal 18.5-24.9</span>
                  <span>Sobrepeso 25-29.9</span>
                  <span>Obesidad ≥30</span>
                </div>
                <div className="w-full h-3 rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden flex">
                  <div className="w-[20%] bg-amber-400 h-full" title="Bajo peso"></div>
                  <div className="w-[30%] bg-emerald-500 h-full" title="Normopeso"></div>
                  <div className="w-[25%] bg-orange-400 h-full" title="Sobrepeso"></div>
                  <div className="w-[25%] bg-rose-500 h-full" title="Obesidad"></div>
                </div>
              </div>

              <div className="mt-4 p-3.5 rounded-2xl bg-gray-50 dark:bg-[#121816] border border-gray-200/60 dark:border-gray-800 text-xs text-gray-600 dark:text-gray-300 flex items-start gap-2.5">
                <Info className="w-4 h-4 text-pink-500 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-gray-900 dark:text-gray-100">Criterio Clínico OMS: </span>
                  {imcAdvice}
                </div>
              </div>
            </div>

            {/* Fórmulas de Peso Ideal y Rango Saludable */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              
              {/* Peso Ideal Hamwi */}
              <div className="bg-white dark:bg-[#18221f] rounded-3xl p-5 border border-gray-100 dark:border-[#293a34] shadow-xs">
                <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">Fórmula de Hamwi</span>
                <div className="text-2xl font-extrabold text-gray-900 dark:text-gray-100 mt-1">
                  {idealWeightHamwi} <span className="text-xs text-gray-400 font-normal">kg</span>
                </div>
                <p className="text-[11px] text-gray-400 mt-1">
                  Referencia clínica clásica en dietoterapia.
                </p>
              </div>

              {/* Peso Ideal Lorentz */}
              <div className="bg-white dark:bg-[#18221f] rounded-3xl p-5 border border-gray-100 dark:border-[#293a34] shadow-xs">
                <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">Fórmula de Lorentz</span>
                <div className="text-2xl font-extrabold text-gray-900 dark:text-gray-100 mt-1">
                  {idealWeightLorentz} <span className="text-xs text-gray-400 font-normal">kg</span>
                </div>
                <p className="text-[11px] text-gray-400 mt-1">
                  Ajustado por sexo y talla corporal.
                </p>
              </div>

              {/* Rango Saludable */}
              <div className="bg-white dark:bg-[#18221f] rounded-3xl p-5 border border-gray-100 dark:border-[#293a34] shadow-xs">
                <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">Rango Saludable OMS</span>
                <div className="text-lg font-extrabold text-emerald-600 dark:text-emerald-400 mt-1">
                  {minHealthyWeight} - {maxHealthyWeight} <span className="text-xs font-normal">kg</span>
                </div>
                <p className="text-[11px] text-gray-400 mt-1">
                  Para mantener IMC entre 18.5 y 24.9.
                </p>
              </div>

            </div>

          </div>

        </div>
      )}

      {/* ------------------ SECCIÓN 2: TMB & GET (GASTO ENERGÉTICO) ------------------ */}
      {activeTab === 'get' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Ajustes de Fórmulas y Factores */}
          <div className="bg-white dark:bg-[#18221f] rounded-3xl p-6 border border-gray-100 dark:border-[#293a34] shadow-xs space-y-4">
            <h3 className="text-base font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
              <Flame className="w-4 h-4 text-orange-500" />
              Parámetros de Cálculo Metabólico
            </h3>

            {/* Selección de Fórmula */}
            <div>
              <label className="text-xs font-semibold text-gray-600 dark:text-gray-300 block mb-1">
                Ecuación Predictiva de TMB
              </label>
              <select
                value={formulaTmb}
                onChange={(e) => setFormulaTmb(e.target.value as any)}
                className="w-full text-xs bg-gray-50 dark:bg-[#121816] border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2 text-gray-800 dark:text-gray-200 font-medium focus:ring-2 focus:ring-pink-400"
              >
                <option value="mifflin">Mifflin-St Jeor (Recomendada ADA / AND)</option>
                <option value="harris">Harris-Benedict (Revisada 1984)</option>
                <option value="oms">OMS / FAO / UNU</option>
                <option value="katch">Katch-McArdle (Basada en Masa Magra)</option>
              </select>
            </div>

            {/* Input adicional si seleccionó Katch-McArdle */}
            {formulaTmb === 'katch' && (
              <div className="p-3 rounded-2xl bg-pink-50 dark:bg-pink-950/20 border border-pink-200 dark:border-pink-900/50">
                <label className="text-xs font-bold text-gray-700 dark:text-gray-300 block mb-1">
                  % Grasa Corporal del Paciente (Bioimpedancia o Pliegues):
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    step="0.5"
                    value={bodyFatKatch}
                    onChange={e => setBodyFatKatch(parseFloat(e.target.value) || 0)}
                    className="w-20 text-xs font-extrabold bg-white dark:bg-[#121816] border border-gray-300 dark:border-gray-700 rounded-xl p-2 outline-none"
                  />
                  <span className="text-xs font-bold text-gray-500">%</span>
                  <span className="text-[11px] text-gray-400">
                    Masa magra: {(effectiveWeight * (1 - (bodyFatKatch / 100))).toFixed(1)} kg
                  </span>
                </div>
              </div>
            )}

            {/* Toggle Clínico: Peso Ajustado para Obesidad */}
            {imc >= 30 && (
              <div className="p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 text-xs">
                <label className="flex items-start gap-2 cursor-pointer font-bold text-amber-900 dark:text-amber-200">
                  <input
                    type="checkbox"
                    checked={useAdjustedWeight}
                    onChange={e => setUseAdjustedWeight(e.target.checked)}
                    className="mt-0.5 rounded text-amber-600 focus:ring-amber-500"
                  />
                  <div>
                    <span>Usar Peso Ajustado de Wilkens ({adjustedWeightWilkens} kg)</span>
                    <p className="font-normal text-[11px] text-amber-700 dark:text-amber-300 mt-0.5 leading-relaxed">
                      Criterio clínico: En obesidad (IMC &ge; 30), el tejido adiposo no activo distorsiona los requerimientos. Se aconseja usar el peso ajustado en lugar de los {weightKg} kg actuales.
                    </p>
                  </div>
                </label>
              </div>
            )}

            {/* Factor de Actividad Física (FA) */}
            <div>
              <label className="text-xs font-semibold text-gray-600 dark:text-gray-300 block mb-1">
                Factor de Actividad Física (FA)
              </label>
              <select
                value={activityFactor}
                onChange={(e) => setActivityFactor(parseFloat(e.target.value))}
                className="w-full text-xs bg-gray-50 dark:bg-[#121816] border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2 text-gray-800 dark:text-gray-200 font-medium focus:ring-2 focus:ring-pink-400"
              >
                <option value="1.2">Sedentario / Reposo en cama (1.20)</option>
                <option value="1.375">Ligero (1-3 días de ejercicio/sem) (1.375)</option>
                <option value="1.55">Moderado (3-5 días/sem o estudiante activa) (1.55)</option>
                <option value="1.725">Intenso (6-7 días/sem) (1.725)</option>
                <option value="1.9">Muy Intenso / Atleta de competición (1.90)</option>
              </select>
            </div>

            {/* Factor de Estrés Patológico (FE) */}
            <div>
              <label className="text-xs font-semibold text-gray-600 dark:text-gray-300 block mb-1">
                Factor de Estrés Patológico (Clínica)
              </label>
              <select
                value={stressFactor}
                onChange={(e) => setStressFactor(parseFloat(e.target.value))}
                className="w-full text-xs bg-gray-50 dark:bg-[#121816] border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2 text-gray-800 dark:text-gray-200 font-medium focus:ring-2 focus:ring-pink-400"
              >
                <option value="1.0">Sin estrés patológico (1.0)</option>
                <option value="1.1">Cirugía menor ambulatoria (1.1)</option>
                <option value="1.2">Infección moderada / Diálisis ambulatoria (1.2)</option>
                <option value="1.35">Trauma esquelético / Cirugía mayor (1.35)</option>
                <option value="1.5">Sepsis / Paciente crítico (1.5)</option>
                <option value="1.8">Gran quemado (1.8)</option>
              </select>
            </div>

            {/* Checkbox ETA */}
            <div className="pt-2 border-t border-gray-100 dark:border-gray-800">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-gray-700 dark:text-gray-300">
                <input
                  type="checkbox"
                  checked={includeEta}
                  onChange={(e) => setIncludeEta(e.target.checked)}
                  className="rounded-sm text-pink-600 focus:ring-pink-500"
                />
                <span>Incluir Efecto Termogénico de los Alimentos (ETA +10%)</span>
              </label>
            </div>
          </div>

          {/* Resultados de Calorías y Distribución */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Tarjeta Destacada GET */}
            <div className="bg-gradient-to-r from-orange-500 via-pink-500 to-rose-500 text-white rounded-3xl p-6 shadow-md shadow-pink-500/15">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-bold text-orange-100 uppercase tracking-wider">
                    Gasto Energético Total (GET Meta)
                  </span>
                  <div className="text-4xl font-extrabold tracking-tight mt-1 flex items-baseline gap-2">
                    {getCalculated} <span className="text-lg font-medium text-pink-100">Kcal / día</span>
                  </div>
                  <p className="text-xs text-pink-100 mt-1">
                    Tasa Metabólica Basal (TMB): <span className="font-bold text-white">{tmb} kcal</span> • ETA: {etaCalories} kcal
                  </p>
                </div>

                <div className="bg-white/20 backdrop-blur-xs p-3 rounded-2xl border border-white/30 text-xs">
                  <div className="font-bold">Fórmula Activa:</div>
                  <div className="capitalize">{formulaTmb}</div>
                  <div className="text-[11px] text-pink-100 mt-0.5">Peso: {weightKg}kg | Talla: {heightCm}cm</div>
                </div>
              </div>
            </div>

            {/* Objetivos Calóricos según Intervención */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              
              {/* Pérdida de Grasa */}
              <div className="bg-white dark:bg-[#18221f] rounded-3xl p-5 border border-gray-100 dark:border-[#293a34] shadow-xs">
                <span className="text-[11px] font-bold uppercase tracking-wider text-rose-500">Déficit Hipocalórico (-500)</span>
                <div className="text-2xl font-extrabold text-gray-900 dark:text-gray-100 mt-1">
                  {Math.max(1200, getCalculated - 500)} <span className="text-xs text-gray-400 font-normal">kcal/día</span>
                </div>
                <p className="text-[11px] text-gray-400 mt-1">
                  Para descenso de peso gradual y seguro (~0.5 kg por semana).
                </p>
              </div>

              {/* Mantenimiento */}
              <div className="bg-white dark:bg-[#18221f] rounded-3xl p-5 border border-gray-100 dark:border-[#293a34] shadow-xs">
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600">Normocalórico (Equilibrio)</span>
                <div className="text-2xl font-extrabold text-gray-900 dark:text-gray-100 mt-1">
                  {getCalculated} <span className="text-xs text-gray-400 font-normal">kcal/día</span>
                </div>
                <p className="text-[11px] text-gray-400 mt-1">
                  Mantenimiento de masa magra y balance energético neutro.
                </p>
              </div>

              {/* Aumento / Superávit */}
              <div className="bg-white dark:bg-[#18221f] rounded-3xl p-5 border border-gray-100 dark:border-[#293a34] shadow-xs">
                <span className="text-[11px] font-bold uppercase tracking-wider text-purple-600">Superávit (+300 kcal)</span>
                <div className="text-2xl font-extrabold text-gray-900 dark:text-gray-100 mt-1">
                  {getCalculated + 300} <span className="text-xs text-gray-400 font-normal">kcal/día</span>
                </div>
                <p className="text-[11px] text-gray-400 mt-1">
                  Para hipertrofia muscular o recuperación nutricional.
                </p>
              </div>

            </div>

          </div>

        </div>
      )}

      {/* ------------------ SECCIÓN 3: REQUERIMIENTO PROTEICO ------------------ */}
      {activeTab === 'proteina' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          <div className="bg-white dark:bg-[#18221f] rounded-3xl p-6 border border-gray-100 dark:border-[#293a34] shadow-xs space-y-4">
            <h3 className="text-base font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
              <Activity className="w-4 h-4 text-pink-500" />
              Condición Clínica y g/kg/día
            </h3>

            <div className="space-y-2">
              {[
                { label: 'Adulto Sano Sedentario', val: 0.8, desc: 'Recomendación mínima DRI (0.8 g/kg)' },
                { label: 'Adulto Moderadamente Activo', val: 1.0, desc: 'Mantenimiento saludable (1.0 g/kg)' },
                { label: 'Adulto Mayor (Antisarcopenia)', val: 1.2, desc: 'Preservación de masa muscular (1.2 g/kg)' },
                { label: 'Enfermedad Renal (No Diálisis)', val: 0.7, desc: 'Hipoproteica estricta (0.6 - 0.8 g/kg)' },
                { label: 'Paciente en Hemodiálisis (HD)', val: 1.3, desc: 'Hiperproteica para compensar pérdidas (1.2 - 1.4 g/kg)' },
                { label: 'Deportista de Fuerza / Fitness', val: 1.8, desc: 'Síntesis proteica muscular (1.6 - 2.0 g/kg)' },
                { label: 'Paciente Hipercatabólico / Quemado', val: 2.0, desc: 'Reparación tisular masiva (2.0 g/kg)' }
              ].map((item) => (
                <button
                  key={item.label}
                  onClick={() => setProteinCategory(item.val)}
                  className={`w-full text-left p-3 rounded-2xl border transition-all cursor-pointer ${
                    proteinCategory === item.val
                      ? 'border-pink-500 bg-pink-50/50 dark:bg-pink-950/30 font-bold text-pink-700 dark:text-pink-300'
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                  }`}
                >
                  <div className="flex justify-between items-center text-xs">
                    <span>{item.label}</span>
                    <span className="font-extrabold text-sm">{item.val} g/kg</span>
                  </div>
                  <div className="text-[10px] text-gray-400 mt-0.5">{item.desc}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2 bg-white dark:bg-[#18221f] rounded-3xl p-6 border border-gray-100 dark:border-[#293a34] shadow-xs flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                Prescripción Proteica Diaria
              </span>
              <div className="text-4xl font-extrabold text-gray-900 dark:text-gray-100 mt-2 flex items-baseline gap-2">
                {proteinGramsTotal} <span className="text-xl font-normal text-gray-400">g de proteína pura</span>
              </div>
              <p className="text-sm text-gray-500 mt-1">
                Aporte calórico: <span className="font-bold text-pink-600">{proteinKcalTotal} kcal</span> (equivalente a aprox. {proteinPercentageOfGet}% del GET total).
              </p>

              {/* Guía práctica de equivalencia en alimentos bolivianos */}
              <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-800">
                <h4 className="text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-3">
                  Ejemplo de Alimentos para Cubrir esta Meta ({proteinGramsTotal} g):
                </h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-gray-50 dark:bg-[#121816] border border-gray-200/60 dark:border-gray-800">
                    <div className="font-bold text-gray-800 dark:text-gray-200">Carne de Llama magra (150g)</div>
                    <div className="text-gray-400 text-[11px]">Aporta ~37g proteína de alto valor biológico</div>
                  </div>
                  <div className="p-3 rounded-xl bg-gray-50 dark:bg-[#121816] border border-gray-200/60 dark:border-gray-800">
                    <div className="font-bold text-gray-800 dark:text-gray-200">2 Huevos duros (100g)</div>
                    <div className="text-gray-400 text-[11px]">Aporta ~13g proteína patrón</div>
                  </div>
                  <div className="p-3 rounded-xl bg-gray-50 dark:bg-[#121816] border border-gray-200/60 dark:border-gray-800">
                    <div className="font-bold text-gray-800 dark:text-gray-200">Quinua real cocida (200g)</div>
                    <div className="text-gray-400 text-[11px]">Aporta ~9g proteína vegetal completa</div>
                  </div>
                  <div className="p-3 rounded-xl bg-gray-50 dark:bg-[#121816] border border-gray-200/60 dark:border-gray-800">
                    <div className="font-bold text-gray-800 dark:text-gray-200">Tarwi desamargado (100g)</div>
                    <div className="text-gray-400 text-[11px]">Aporta ~17.5g proteína andina</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-pink-50 dark:bg-pink-950/20 border border-pink-200 dark:border-pink-800 text-xs text-pink-700 dark:text-pink-300 mt-6 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>Ajustado al peso del paciente ({weightKg} kg) con factor de {proteinCategory} g/kg/día.</span>
            </div>
          </div>

        </div>
      )}

      {/* ------------------ SECCIÓN 4: HIDRATACIÓN ------------------ */}
      {activeTab === 'agua' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <div className="bg-white dark:bg-[#18221f] rounded-3xl p-6 border border-gray-100 dark:border-[#293a34] shadow-xs space-y-4">
            <h3 className="text-base font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
              <Droplet className="w-4 h-4 text-blue-500" />
              Requerimiento Hídrico Diario
            </h3>

            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800">
                <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600">Método por Peso Corporal (35 ml/kg)</span>
                <div className="text-3xl font-extrabold text-blue-700 dark:text-blue-300 mt-1">
                  {(waterByWeight / 1000).toFixed(2)} <span className="text-base font-normal">Litros / día</span>
                </div>
                <div className="text-xs text-gray-500 mt-1">Equivalente a {Math.round(waterByWeight / 250)} vasos estándar de 250 ml.</div>
              </div>

              <div className="p-4 rounded-2xl bg-cyan-50/50 dark:bg-cyan-950/20 border border-cyan-200 dark:border-cyan-800">
                <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-600">Método Calórico (1.0 ml / kcal de GET)</span>
                <div className="text-3xl font-extrabold text-cyan-700 dark:text-cyan-300 mt-1">
                  {(waterByKcal / 1000).toFixed(2)} <span className="text-base font-normal">Litros / día</span>
                </div>
                <div className="text-xs text-gray-500 mt-1">Basado en el GET calculado ({getCalculated} kcal).</div>
              </div>

              <div className="p-4 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-200 dark:border-indigo-800">
                <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600">Método Holliday-Segar (Clínico Hospitalario)</span>
                <div className="text-3xl font-extrabold text-indigo-700 dark:text-indigo-300 mt-1">
                  {(waterHolliday / 1000).toFixed(2)} <span className="text-base font-normal">Litros / día</span>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  Primeros 10kg: 100 ml/kg • 11-20kg: 50 ml/kg • &gt;20kg: 20 ml/kg.
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-[#18221f] rounded-3xl p-6 border border-gray-100 dark:border-[#293a34] shadow-xs flex flex-col justify-between">
            <div>
              <h3 className="text-base font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2 mb-3">
                <AlertCircle className="w-4 h-4 text-amber-500" />
                Consideraciones Especiales en La Paz (3,640 msnm)
              </h3>
              <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed space-y-2">
                <span>• En la altura de La Paz y el altiplano boliviano, la sequedad del aire y la hiperventilación compensatoria aumentan las pérdidas insensibles de agua en un 10-15%.</span>
                <br /><br />
                <span>• <strong>Restricción para Paciente Renal / Hemodiálisis:</strong> En anuria u oliguria se debe restringir a: 500 ml + diuresis residual de 24 horas, controlando el edema y la ganancia interdialítica (&lt; 2-2.5 kg).</span>
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-gray-50 dark:bg-[#121816] border border-gray-200 dark:border-gray-800 text-xs text-gray-500 mt-6">
              💡 Tip dietético: Incluir infusiones andinas (manzanilla, muña, cedrón) sin azúcar dentro del balance hídrico.
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
