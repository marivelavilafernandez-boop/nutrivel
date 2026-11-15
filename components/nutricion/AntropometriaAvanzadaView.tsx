'use client';

import React, { useState } from 'react';
import { 
  Scale, 
  Activity, 
  AlertCircle, 
  CheckCircle2, 
  Sparkles, 
  Info,
  TrendingDown,
  TrendingUp,
  Heart
} from 'lucide-react';

export const AntropometriaAvanzadaView: React.FC = () => {
  // Datos Generales
  const [gender, setGender] = useState<'mujer' | 'hombre'>('mujer');
  const [age, setAge] = useState<number>(23);
  const [weightKg, setWeightKg] = useState<number>(62);
  const [heightCm, setHeightCm] = useState<number>(165);

  // Perímetros y Pliegues (Antropometría ISAK Nivel 1)
  const [waistCm, setWaistCm] = useState<number>(72);
  const [hipCm, setHipCm] = useState<number>(98);
  const [armCircumferenceCm, setArmCircumferenceCm] = useState<number>(27.5); // Circunferencia del brazo
  const [tricepsSkinfoldMm, setTricepsSkinfoldMm] = useState<number>(16); // Pliegue tricipital (PCT)
  const [subscapularSkinfoldMm, setSubscapularSkinfoldMm] = useState<number>(14); // Pliegue subescapular

  // Cálculos Antropométricos Clínicos Reales
  const heightM = heightCm / 100;
  const imc = heightM > 0 ? parseFloat((weightKg / (heightM * heightM)).toFixed(1)) : 0;

  // 1. Índice Cintura-Cadera (ICC)
  const icc = hipCm > 0 ? parseFloat((waistCm / hipCm).toFixed(2)) : 0;
  const isIccHighRisk = gender === 'mujer' ? icc > 0.85 : icc > 0.90;
  const iccDistribution = isIccHighRisk 
    ? 'Distribución Androide (Grasa central/visceral - Alto riesgo cardiovascular)'
    : 'Distribución Ginoide o Normal (Bajo riesgo cardiometabólico)';

  // 2. Índice Cintura-Talla (ICT)
  const ict = heightCm > 0 ? parseFloat((waistCm / heightCm).toFixed(2)) : 0;
  const isIctHighRisk = ict >= 0.50;

  // 3. Circunferencia Muscular del Brazo (CMB) - Fórmula: CMB = CB - (π * (PCT_mm / 10))
  // Evalúa compartimento proteico somático / reserva muscular
  const cmb = parseFloat((armCircumferenceCm - (Math.PI * (tricepsSkinfoldMm / 10))).toFixed(1));

  // 4. Área Muscular del Brazo Corregida (cAMB) en cm²
  // Hombres: (CB - π*PCT/10)² / (4π) - 10
  // Mujeres: (CB - π*PCT/10)² / (4π) - 6.5
  const ambBase = Math.pow(armCircumferenceCm - (Math.PI * (tricepsSkinfoldMm / 10)), 2) / (4 * Math.PI);
  const camb = gender === 'hombre'
    ? parseFloat(Math.max(1, ambBase - 10).toFixed(1))
    : parseFloat(Math.max(1, ambBase - 6.5).toFixed(1));

  // 5. Porcentaje de Grasa Corporal por Fórmula de Deurenberg (OMS/Clínica)
  // %GC = 1.20 * IMC + 0.23 * Edad - 10.8 * Sexo - 5.4 (Sexo: 1 hombre, 0 mujer)
  const sexFactor = gender === 'hombre' ? 1 : 0;
  const bodyFatPercent = imc > 0 
    ? parseFloat(((1.20 * imc) + (0.23 * age) - (10.8 * sexFactor) - 5.4).toFixed(1))
    : 0;

  // Masa Grasa y Masa Magra en Kg
  const fatMassKg = parseFloat(((weightKg * bodyFatPercent) / 100).toFixed(1));
  const leanMassKg = parseFloat((weightKg - fatMassKg).toFixed(1));

  // Clasificación % Grasa según Sexo
  let fatCategory = 'Normal';
  let fatColor = 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200';
  if (gender === 'mujer') {
    if (bodyFatPercent < 18) {
      fatCategory = 'Bajo en Grasa (Atleta o Desnutrición)';
      fatColor = 'text-amber-600 bg-amber-50 dark:bg-amber-950/40 border-amber-200';
    } else if (bodyFatPercent <= 28) {
      fatCategory = 'Rango Saludable Óptimo';
      fatColor = 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200';
    } else if (bodyFatPercent <= 32) {
      fatCategory = 'Límite / Sobrepeso Graso';
      fatColor = 'text-orange-600 bg-orange-50 dark:bg-orange-950/40 border-orange-200';
    } else {
      fatCategory = 'Exceso de Grasa Corporal (Obesidad)';
      fatColor = 'text-rose-600 bg-rose-50 dark:bg-rose-950/40 border-rose-200';
    }
  } else {
    if (bodyFatPercent < 10) {
      fatCategory = 'Bajo en Grasa (Atleta)';
      fatColor = 'text-amber-600 bg-amber-50 dark:bg-amber-950/40 border-amber-200';
    } else if (bodyFatPercent <= 20) {
      fatCategory = 'Rango Saludable Óptimo';
      fatColor = 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200';
    } else if (bodyFatPercent <= 25) {
      fatCategory = 'Límite / Sobrepeso Graso';
      fatColor = 'text-orange-600 bg-orange-50 dark:bg-orange-950/40 border-orange-200';
    } else {
      fatCategory = 'Exceso de Grasa Corporal (Obesidad)';
      fatColor = 'text-rose-600 bg-rose-50 dark:bg-rose-950/40 border-rose-200';
    }
  }

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-200">
      
      {/* Encabezado */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-100 dark:border-gray-800">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-pink-100 dark:bg-pink-950/50 text-pink-700 dark:text-pink-300 text-[10px] font-bold mb-1">
            <Sparkles className="w-3 h-3" />
            <span>Herramienta Clínica Profesional • ISAK & OMS</span>
          </div>
          <h2 className="text-2xl font-extrabold text-gray-900 dark:text-gray-100 flex items-center gap-2">
            <Scale className="w-6 h-6 text-pink-500" />
            Evaluación Antropométrica & Riesgo Cardiometabólico
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
            Cálculo de grasa corporal (Deurenberg), masa muscular somática (CMB/cAMB) y riesgo cardiovascular (ICC / ICT) para pacientes reales.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* COLUMNA 1: FORMULARIO DE ENTRADA (5 cols) */}
        <div className="lg:col-span-5 bg-white dark:bg-[#18221f] rounded-3xl p-5 sm:p-6 border border-gray-100 dark:border-[#293a34] shadow-xs space-y-4">
          <h3 className="text-sm font-extrabold text-gray-900 dark:text-gray-100 uppercase tracking-wider pb-2 border-b border-gray-100 dark:border-gray-800">
            Medidas Antropométricas del Paciente
          </h3>

          {/* Sexo y Edad */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-bold text-gray-500 dark:text-gray-400 block mb-1">
                Sexo Biológico
              </label>
              <div className="grid grid-cols-2 gap-1 bg-gray-100 dark:bg-[#121816] p-1 rounded-xl">
                <button
                  type="button"
                  onClick={() => setGender('mujer')}
                  className={`py-1.5 text-xs font-bold rounded-lg transition-all ${
                    gender === 'mujer' 
                      ? 'bg-pink-500 text-white shadow-xs' 
                      : 'text-gray-500 hover:text-gray-900'
                  }`}
                >
                  Mujer
                </button>
                <button
                  type="button"
                  onClick={() => setGender('hombre')}
                  className={`py-1.5 text-xs font-bold rounded-lg transition-all ${
                    gender === 'hombre' 
                      ? 'bg-pink-500 text-white shadow-xs' 
                      : 'text-gray-500 hover:text-gray-900'
                  }`}
                >
                  Hombre
                </button>
              </div>
            </div>

            <div>
              <label className="text-[11px] font-bold text-gray-500 dark:text-gray-400 block mb-1">
                Edad (años)
              </label>
              <input
                type="number"
                value={age}
                onChange={e => setAge(Math.max(1, parseInt(e.target.value) || 0))}
                className="w-full text-xs font-bold bg-gray-50 dark:bg-[#121816] border border-gray-200 dark:border-gray-700 rounded-xl p-2.5 focus:border-pink-500 outline-none"
              />
            </div>
          </div>

          {/* Peso y Talla */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-bold text-gray-500 dark:text-gray-400 block mb-1">
                Peso Actual (kg)
              </label>
              <input
                type="number"
                step="0.1"
                value={weightKg}
                onChange={e => setWeightKg(Math.max(1, parseFloat(e.target.value) || 0))}
                className="w-full text-xs font-bold bg-gray-50 dark:bg-[#121816] border border-gray-200 dark:border-gray-700 rounded-xl p-2.5 focus:border-pink-500 outline-none"
              />
            </div>
            <div>
              <label className="text-[11px] font-bold text-gray-500 dark:text-gray-400 block mb-1">
                Talla / Estatura (cm)
              </label>
              <input
                type="number"
                value={heightCm}
                onChange={e => setHeightCm(Math.max(1, parseInt(e.target.value) || 0))}
                className="w-full text-xs font-bold bg-gray-50 dark:bg-[#121816] border border-gray-200 dark:border-gray-700 rounded-xl p-2.5 focus:border-pink-500 outline-none"
              />
            </div>
          </div>

          {/* Perímetros (Cintura y Cadera) */}
          <div className="grid grid-cols-2 gap-3 pt-2 border-t border-gray-100 dark:border-gray-800">
            <div>
              <label className="text-[11px] font-bold text-gray-500 dark:text-gray-400 block mb-1">
                Cintura Mínima (cm)
              </label>
              <input
                type="number"
                step="0.5"
                value={waistCm}
                onChange={e => setWaistCm(Math.max(1, parseFloat(e.target.value) || 0))}
                className="w-full text-xs font-bold bg-gray-50 dark:bg-[#121816] border border-gray-200 dark:border-gray-700 rounded-xl p-2.5 focus:border-pink-500 outline-none"
              />
            </div>
            <div>
              <label className="text-[11px] font-bold text-gray-500 dark:text-gray-400 block mb-1">
                Cadera Máxima (cm)
              </label>
              <input
                type="number"
                step="0.5"
                value={hipCm}
                onChange={e => setHipCm(Math.max(1, parseFloat(e.target.value) || 0))}
                className="w-full text-xs font-bold bg-gray-50 dark:bg-[#121816] border border-gray-200 dark:border-gray-700 rounded-xl p-2.5 focus:border-pink-500 outline-none"
              />
            </div>
          </div>

          {/* Perímetro Braquial y Pliegues */}
          <div className="space-y-3 pt-2 border-t border-gray-100 dark:border-gray-800">
            <div>
              <label className="text-[11px] font-bold text-gray-500 dark:text-gray-400 block mb-1">
                Circunferencia del Brazo (CB en cm)
              </label>
              <input
                type="number"
                step="0.1"
                value={armCircumferenceCm}
                onChange={e => setArmCircumferenceCm(Math.max(1, parseFloat(e.target.value) || 0))}
                className="w-full text-xs font-bold bg-gray-50 dark:bg-[#121816] border border-gray-200 dark:border-gray-700 rounded-xl p-2.5 focus:border-pink-500 outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-bold text-gray-500 dark:text-gray-400 block mb-1">
                  Pliegue Tricipital (PCT en mm)
                </label>
                <input
                  type="number"
                  step="0.5"
                  value={tricepsSkinfoldMm}
                  onChange={e => setTricepsSkinfoldMm(Math.max(1, parseFloat(e.target.value) || 0))}
                  className="w-full text-xs font-bold bg-gray-50 dark:bg-[#121816] border border-gray-200 dark:border-gray-700 rounded-xl p-2.5 focus:border-pink-500 outline-none"
                />
              </div>
              <div>
                <label className="text-[11px] font-bold text-gray-500 dark:text-gray-400 block mb-1">
                  Pliegue Subescapular (mm)
                </label>
                <input
                  type="number"
                  step="0.5"
                  value={subscapularSkinfoldMm}
                  onChange={e => setSubscapularSkinfoldMm(Math.max(1, parseFloat(e.target.value) || 0))}
                  className="w-full text-xs font-bold bg-gray-50 dark:bg-[#121816] border border-gray-200 dark:border-gray-700 rounded-xl p-2.5 focus:border-pink-500 outline-none"
                />
              </div>
            </div>
          </div>

        </div>

        {/* COLUMNA 2: RESULTADOS Y DIAGNÓSTICO CLÍNICO (7 cols) */}
        <div className="lg:col-span-7 space-y-5">
          
          {/* Tarjeta 1: Composición Corporal (% Grasa & Masa Magra) */}
          <div className="bg-white dark:bg-[#18221f] rounded-3xl p-6 border border-gray-100 dark:border-[#293a34] shadow-xs">
            <span className="text-[11px] font-bold uppercase tracking-wider text-pink-600 dark:text-pink-400 block mb-2">
              1. Composición Corporal (Deurenberg / OMS)
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-3">
              <div className="p-3.5 rounded-2xl bg-pink-50/60 dark:bg-pink-950/20 border border-pink-200 dark:border-pink-900 text-center">
                <span className="text-[11px] text-gray-500 block">% Grasa Estimado</span>
                <span className="text-2xl font-extrabold text-pink-600 dark:text-pink-400 mt-0.5 block">
                  {bodyFatPercent}%
                </span>
                <span className="text-[10px] text-gray-500">Masa Grasa: {fatMassKg} kg</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900 text-center">
                <span className="text-[11px] text-gray-500 block">Masa Magra / Libre</span>
                <span className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-0.5 block">
                  {leanMassKg} kg
                </span>
                <span className="text-[10px] text-gray-500">{(100 - bodyFatPercent).toFixed(1)}% del peso</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-blue-50/60 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900 text-center">
                <span className="text-[11px] text-gray-500 block">IMC Actual</span>
                <span className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 mt-0.5 block">
                  {imc}
                </span>
                <span className="text-[10px] text-gray-500">kg/m²</span>
              </div>
            </div>

            <div className={`p-3 rounded-xl border text-xs flex items-center gap-2 ${fatColor}`}>
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span><strong>Clasificación:</strong> {fatCategory}</span>
            </div>
          </div>

          {/* Tarjeta 2: Riesgo Cardiometabólico (ICC & ICT) */}
          <div className="bg-white dark:bg-[#18221f] rounded-3xl p-6 border border-gray-100 dark:border-[#293a34] shadow-xs">
            <span className="text-[11px] font-bold uppercase tracking-wider text-pink-600 dark:text-pink-400 block mb-2">
              2. Índices de Riesgo Cardiometabólico
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-2">
              {/* ICC */}
              <div className="p-4 rounded-2xl bg-gray-50 dark:bg-[#141526] border border-gray-200/70 dark:border-gray-800">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-700 dark:text-gray-300">Índice Cintura/Cadera (ICC)</span>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                    isIccHighRisk ? 'bg-rose-100 text-rose-800' : 'bg-emerald-100 text-emerald-800'
                  }`}>
                    {icc}
                  </span>
                </div>
                <p className="text-[11px] text-gray-500 mt-2 leading-relaxed">
                  {iccDistribution}
                </p>
                <span className="text-[10px] text-gray-400 block mt-1">
                  Valores de corte OMS: Mujer &le; 0.85 | Hombre &le; 0.90
                </span>
              </div>

              {/* ICT */}
              <div className="p-4 rounded-2xl bg-gray-50 dark:bg-[#141526] border border-gray-200/70 dark:border-gray-800">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-700 dark:text-gray-300">Índice Cintura/Talla (ICT)</span>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                    isIctHighRisk ? 'bg-orange-100 text-orange-800' : 'bg-emerald-100 text-emerald-800'
                  }`}>
                    {ict}
                  </span>
                </div>
                <p className="text-[11px] text-gray-500 mt-2 leading-relaxed">
                  {isIctHighRisk 
                    ? 'Riesgo aumentado (La cintura supera la mitad de la estatura). Sugiere adiposidad visceral.'
                    : 'Riesgo bajo/normal (Cintura menor a la mitad de la estatura).'}
                </p>
                <span className="text-[10px] text-gray-400 block mt-1">
                  Punto de corte internacional: &lt; 0.50
                </span>
              </div>
            </div>
          </div>

          {/* Tarjeta 3: Reserva Proteico-Muscular (CMB & cAMB) */}
          <div className="bg-white dark:bg-[#18221f] rounded-3xl p-6 border border-gray-100 dark:border-[#293a34] shadow-xs">
            <span className="text-[11px] font-bold uppercase tracking-wider text-pink-600 dark:text-pink-400 block mb-2">
              3. Compartimento Proteico Somático (Masa Muscular)
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-2">
              <div className="p-3.5 rounded-2xl bg-gray-50 dark:bg-[#141526] border border-gray-200/70 dark:border-gray-800">
                <span className="text-[11px] text-gray-500 block">Circunferencia Muscular del Brazo (CMB)</span>
                <span className="text-xl font-extrabold text-gray-900 dark:text-gray-100 mt-1 block">
                  {cmb} cm
                </span>
                <span className="text-[10px] text-gray-400">
                  Fórmula: CB - (&pi; &times; PCT/10)
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-gray-50 dark:bg-[#141526] border border-gray-200/70 dark:border-gray-800">
                <span className="text-[11px] text-gray-500 block">Área Muscular del Brazo Corregida (cAMB)</span>
                <span className="text-xl font-extrabold text-gray-900 dark:text-gray-100 mt-1 block">
                  {camb} cm²
                </span>
                <span className="text-[10px] text-gray-400">
                  Corrección ósea ({gender === 'hombre' ? '-10 cm²' : '-6.5 cm²'})
                </span>
              </div>
            </div>

            <div className="mt-3 p-3 rounded-2xl bg-gray-50 dark:bg-[#141526] text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
              💡 <strong>Criterio para Pasantías Hospitalarias:</strong> Si el CMB o cAMB se encuentra por debajo del percentil 15 de Frisancho, sugiere depleción de masa muscular (desnutrición proteico-calórica o sarcopenia).
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
