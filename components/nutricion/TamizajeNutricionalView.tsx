'use client';

import React, { useState } from 'react';
import { 
  Stethoscope, 
  AlertTriangle, 
  CheckCircle2, 
  HelpCircle, 
  FileText, 
  ShieldAlert,
  ArrowRight,
  Sparkles
} from 'lucide-react';

export const TamizajeNutricionalView: React.FC = () => {
  // Parámetros MUST (Malnutrition Universal Screening Tool)
  const [patientName, setPatientName] = useState<string>('Paciente de Turno');
  const [currentWeight, setCurrentWeight] = useState<number>(54);
  const [usualWeight, setUsualWeight] = useState<number>(62);
  const [heightCm, setHeightCm] = useState<number>(160);
  const [acuteDiseaseEffect, setAcuteDiseaseEffect] = useState<boolean>(false); // Ingesta nula o casi nula > 5 días

  // Cálculos MUST
  const heightM = heightCm / 100;
  const imc = heightM > 0 ? parseFloat((currentWeight / (heightM * heightM)).toFixed(1)) : 0;

  // Paso 1: Puntuación IMC
  let scoreImc = 0;
  if (imc < 18.5) scoreImc = 2;
  else if (imc >= 18.5 && imc <= 20.0) scoreImc = 1;
  else scoreImc = 0;

  // Paso 2: Porcentaje de Pérdida Involuntaria de Peso en 3 a 6 meses
  // % Pérdida = ((Peso Habitual - Peso Actual) / Peso Habitual) * 100
  const weightLossPercent = usualWeight > 0 
    ? parseFloat((((usualWeight - currentWeight) / usualWeight) * 100).toFixed(1))
    : 0;

  let scoreWeightLoss = 0;
  if (weightLossPercent > 10) scoreWeightLoss = 2;
  else if (weightLossPercent >= 5 && weightLossPercent <= 10) scoreWeightLoss = 1;
  else scoreWeightLoss = 0;

  // Paso 3: Efecto de Enfermedad Aguda (ayuno > 5 días o paciente en estado hipercatabólico crítico)
  const scoreAcute = acuteDiseaseEffect ? 2 : 0;

  // Puntuación Total MUST
  const totalScore = scoreImc + scoreWeightLoss + scoreAcute;

  // Determinación de Riesgo y Plan de Acción
  let riskLevel = 'Bajo Riesgo';
  let riskBadgeColor = 'bg-emerald-100 text-emerald-800 border-emerald-200';
  let actionPlan = 'Atención y cuidado clínico habitual. Re-evaluar semanalmente en pacientes hospitalizados o mensualmente en consulta externa.';

  if (totalScore === 1) {
    riskLevel = 'Riesgo Medio';
    riskBadgeColor = 'bg-amber-100 text-amber-800 border-amber-200';
    actionPlan = 'Observación clínica y registro de ingesta por 3 días. Optimizar densidad calórica de la dieta hospitalaria y re-evaluar en 3 a 5 días.';
  } else if (totalScore >= 2) {
    riskLevel = 'Riesgo Alto (Desnutrición Inminente / Presente)';
    riskBadgeColor = 'bg-rose-100 text-rose-800 border-rose-200';
    actionPlan = 'Tratamiento y soporte nutricional especializado urgente. Prescripción de Suplementación Nutricional Oral (SNO) hipercalórica/hiperproteica o inicio de Nutrición Enteral precoz guiada por la Nutrióloga.';
  }

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-200">
      
      {/* Encabezado */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-100 dark:border-gray-800">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-pink-100 dark:bg-pink-950/50 text-pink-700 dark:text-pink-300 text-[10px] font-bold mb-1">
            <Sparkles className="w-3 h-3" />
            <span>Herramienta Clínica Hospitalaria • BAPEN & ESPEN</span>
          </div>
          <h2 className="text-2xl font-extrabold text-gray-900 dark:text-gray-100 flex items-center gap-2">
            <Stethoscope className="w-6 h-6 text-pink-500" />
            Tamizaje Nutricional Clínico (MUST & Riesgo de Malnutrición)
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
            Algoritmo validado para identificar riesgo de desnutrición en pacientes hospitalizados (Hospital de Clínicas, Clínicas privadas y centros de salud).
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* COLUMNA 1: PASOS DEL TAMIZAJE (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* Identificación del Paciente */}
          <div className="bg-white dark:bg-[#18221f] rounded-3xl p-5 border border-gray-100 dark:border-[#293a34] shadow-xs">
            <label className="text-xs font-bold text-gray-500 block mb-1">
              Nombre o N° Cama / Historia Clínica
            </label>
            <input
              type="text"
              value={patientName}
              onChange={e => setPatientName(e.target.value)}
              className="w-full text-xs font-bold bg-gray-50 dark:bg-[#121816] border border-gray-200 dark:border-gray-700 rounded-xl p-2.5 focus:border-pink-500 outline-none"
              placeholder="Ej. Paciente Cama 14 - Medicina Interna"
            />
          </div>

          {/* PASO 1: Puntuación IMC */}
          <div className="bg-white dark:bg-[#18221f] rounded-3xl p-5 border border-gray-100 dark:border-[#293a34] shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold uppercase tracking-wider text-pink-600 dark:text-pink-400">
                Paso 1: Puntuación de IMC
              </span>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-pink-100 text-pink-700">
                +{scoreImc} pts
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-bold text-gray-500 block mb-1">
                  Peso Actual (kg)
                </label>
                <input
                  type="number"
                  step="0.5"
                  value={currentWeight}
                  onChange={e => setCurrentWeight(Math.max(1, parseFloat(e.target.value) || 0))}
                  className="w-full text-xs font-bold bg-gray-50 dark:bg-[#121816] border border-gray-200 dark:border-gray-700 rounded-xl p-2.5 outline-none"
                />
              </div>
              <div>
                <label className="text-[11px] font-bold text-gray-500 block mb-1">
                  Talla (cm)
                </label>
                <input
                  type="number"
                  value={heightCm}
                  onChange={e => setHeightCm(Math.max(1, parseInt(e.target.value) || 0))}
                  className="w-full text-xs font-bold bg-gray-50 dark:bg-[#121816] border border-gray-200 dark:border-gray-700 rounded-xl p-2.5 outline-none"
                />
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-gray-50 dark:bg-[#141526] text-xs flex items-center justify-between">
              <span className="text-gray-500">IMC calculado: <strong className="text-gray-900 dark:text-gray-100">{imc} kg/m²</strong></span>
              <span className="text-[11px] text-gray-400">
                {imc > 20 ? '&gt;20 (0 pts)' : imc >= 18.5 ? '18.5-20 (1 pt)' : '&lt;18.5 (2 pts)'}
              </span>
            </div>
          </div>

          {/* PASO 2: Pérdida involuntaria de peso */}
          <div className="bg-white dark:bg-[#18221f] rounded-3xl p-5 border border-gray-100 dark:border-[#293a34] shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold uppercase tracking-wider text-pink-600 dark:text-pink-400">
                Paso 2: Pérdida Involuntaria de Peso (3 a 6 meses)
              </span>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-pink-100 text-pink-700">
                +{scoreWeightLoss} pts
              </span>
            </div>

            <div>
              <label className="text-[11px] font-bold text-gray-500 block mb-1">
                Peso Habitual / Previo a la enfermedad (kg)
              </label>
              <input
                type="number"
                step="0.5"
                value={usualWeight}
                onChange={e => setUsualWeight(Math.max(1, parseFloat(e.target.value) || 0))}
                className="w-full text-xs font-bold bg-gray-50 dark:bg-[#121816] border border-gray-200 dark:border-gray-700 rounded-xl p-2.5 outline-none"
              />
            </div>

            <div className="p-3 rounded-2xl bg-gray-50 dark:bg-[#141526] text-xs flex items-center justify-between">
              <span className="text-gray-500">
                Pérdida porcentual: <strong className={weightLossPercent >= 10 ? 'text-rose-600 font-extrabold' : 'text-gray-900 dark:text-gray-100'}>{weightLossPercent}%</strong>
              </span>
              <span className="text-[11px] text-gray-400">
                {weightLossPercent < 5 ? '&lt;5% (0 pts)' : weightLossPercent <= 10 ? '5-10% (1 pt)' : '&gt;10% (2 pts)'}
              </span>
            </div>
          </div>

          {/* PASO 3: Efecto de enfermedad aguda */}
          <div className="bg-white dark:bg-[#18221f] rounded-3xl p-5 border border-gray-100 dark:border-[#293a34] shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-extrabold uppercase tracking-wider text-pink-600 dark:text-pink-400">
                Paso 3: Efecto de Enfermedad Aguda
              </span>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-pink-100 text-pink-700">
                +{scoreAcute} pts
              </span>
            </div>

            <label className="flex items-start gap-3 p-3 rounded-2xl bg-gray-50 dark:bg-[#141526] cursor-pointer hover:bg-gray-100 transition-colors">
              <input
                type="checkbox"
                checked={acuteDiseaseEffect}
                onChange={e => setAcuteDiseaseEffect(e.target.checked)}
                className="mt-0.5 w-4 h-4 rounded text-pink-600 focus:ring-pink-500"
              />
              <div className="text-xs">
                <strong className="text-gray-900 dark:text-gray-100 block">
                  ¿El paciente cursa una enfermedad aguda severa y no ha comido o es probable que no ingiera alimentos por más de 5 días?
                </strong>
                <span className="text-[11px] text-gray-500 mt-0.5 block">
                  (Ej. Sepsis, pancreatitis aguda, cirugía mayor abdominal, traumatismo grave, paciente intubado).
                </span>
              </div>
            </label>
          </div>

        </div>

        {/* COLUMNA 2: RESULTADO FINAL Y PLAN DE ACCIÓN NUTRICIONAL (5 cols) */}
        <div className="lg:col-span-5 bg-white dark:bg-[#18221f] rounded-3xl p-6 border border-gray-100 dark:border-[#293a34] shadow-xs space-y-5 sticky top-20">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 block">
              Puntuación Total MUST
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <div className="text-4xl font-extrabold text-gray-900 dark:text-gray-100">
                {totalScore}
              </div>
              <span className="text-xs text-gray-400 font-medium">puntos</span>
            </div>
          </div>

          {/* Nivel de Riesgo */}
          <div className={`p-4 rounded-2xl border ${riskBadgeColor}`}>
            <div className="flex items-center gap-2 font-extrabold text-sm mb-1">
              {totalScore >= 2 ? <AlertTriangle className="w-4 h-4 shrink-0" /> : <CheckCircle2 className="w-4 h-4 shrink-0" />}
              <span>{riskLevel}</span>
            </div>
            <p className="text-xs mt-1 leading-relaxed opacity-95">
              {actionPlan}
            </p>
          </div>

          {/* Recomendación Clínica Directa */}
          <div className="p-4 rounded-2xl bg-pink-50/50 dark:bg-pink-950/20 border border-pink-200 dark:border-pink-900/40 text-xs space-y-2">
            <span className="font-extrabold text-pink-600 dark:text-pink-400 block uppercase tracking-wider text-[10px]">
              Directriz para la Evaluación Clínica (UNIVIOR)
            </span>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Registrar este puntaje en la <strong>Hoja de Evolución Nutricional</strong> del expediente hospitalario. Si la puntuación es &ge; 2, proceder al cálculo del requerimiento calórico por Harris-Benedict/Mifflin y pautar régimen hiperproteico (1.5 - 2.0 g/kg/d).
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};
