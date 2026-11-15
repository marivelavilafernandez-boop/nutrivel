'use client';

import React, { useState } from 'react';
import { 
  Droplets, 
  Sparkles, 
  Printer, 
  RotateCcw, 
  Info, 
  AlertTriangle, 
  CheckCircle2, 
  Baby, 
  User, 
  Flame,
  Activity,
  GlassWater
} from 'lucide-react';

export const RequerimientoHidricoView: React.FC = () => {
  // Parámetros del paciente
  const [patientName, setPatientName] = useState('Paciente Consulta Nutricional');
  const [age, setAge] = useState<number>(22);
  const [weightKg, setWeightKg] = useState<number>(55);
  const [gender, setGender] = useState<'F' | 'M'>('F');
  const [caloriesTarget, setCaloriesTarget] = useState<number>(2000);

  // Condiciones clínicas especiales (del Excel Fabiola SG.B)
  const [isPregnant, setIsPregnant] = useState<boolean>(false);
  const [isLactating, setIsLactating] = useState<boolean>(false);
  const [bodyTempC, setBodyTempC] = useState<number>(36.5);
  const [physicalActivityLevel, setPhysicalActivityLevel] = useState<'ligera' | 'moderada' | 'intensa'>('moderada');
  const [digestiveLossesMl, setDigestiveLossesMl] = useState<number>(0);

  // 1. Holliday-Segar (Pediátrica / Universal)
  let hollidayMl = 0;
  if (weightKg <= 10) {
    hollidayMl = weightKg * 100;
  } else if (weightKg <= 20) {
    hollidayMl = 1000 + ((weightKg - 10) * 50);
  } else {
    hollidayMl = 1500 + ((weightKg - 20) * 20);
  }

  // 2. Regla de ml/kg según edad (Exacto del Excel de Fabiola SG.B)
  let mlPerKgFactor = 35;
  if (age <= 30) {
    mlPerKgFactor = 40;
  } else if (age <= 55) {
    mlPerKgFactor = 35;
  } else if (age <= 64) {
    mlPerKgFactor = 30;
  } else {
    mlPerKgFactor = 25;
  }
  let adultAgeMl = weightKg * mlPerKgFactor;

  // 3. Regla por gasto calórico (1.0 ml/kcal en adultos, 1.5 ml/kcal en lactantes)
  const calorieMl = age < 2 ? caloriesTarget * 1.5 : caloriesTarget * 1.0;

  // Ajustes especiales
  let pregnancyAddMl = isPregnant ? 300 : 0;
  let lactationAddMl = isLactating ? 1000 : 0;

  // Ajuste por fiebre: por cada 1°C sobre 37°C -> +10% del basal
  let feverAddMl = 0;
  if (bodyTempC > 37.0) {
    const degreesAbove = bodyTempC - 37.0;
    feverAddMl = Math.round(adultAgeMl * 0.10 * degreesAbove);
  }

  // Ajuste por actividad física
  let activityAddMl = 0;
  if (physicalActivityLevel === 'moderada') activityAddMl = 350;
  if (physicalActivityLevel === 'intensa') activityAddMl = 700;

  // Totales
  const isChild = age <= 15;
  const baseMl = isChild ? hollidayMl : adultAgeMl;
  const totalWaterMl = Math.round(baseMl + pregnancyAddMl + lactationAddMl + feverAddMl + activityAddMl + digestiveLossesMl);
  const totalWaterLiters = (totalWaterMl / 1000).toFixed(2);
  const glassesOfWater = (totalWaterMl / 250).toFixed(1);
  const bottles500ml = (totalWaterMl / 500).toFixed(1);

  const handleReset = () => {
    setAge(22);
    setWeightKg(55);
    setGender('F');
    setIsPregnant(false);
    setIsLactating(false);
    setBodyTempC(36.5);
    setPhysicalActivityLevel('moderada');
    setDigestiveLossesMl(0);
    setCaloriesTarget(2000);
  };

  return (
    <div className="space-y-6 pb-16 animate-in fade-in duration-200">
      
      {/* 1. ENCABEZADO */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-100 dark:border-gray-800">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-100 text-cyan-800 dark:bg-cyan-950/60 dark:text-cyan-300 text-xs font-bold mb-2">
            <Droplets className="w-3.5 h-3.5" />
            <span>Módulo Clínico • Excel Nutricional Fabiola SG.B</span>
          </div>
          <h2 className="text-2xl font-extrabold text-gray-900 dark:text-gray-100 tracking-tight">
            Requerimiento Hídrico Clínico
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
            Cálculo de volumen hídrico diario según edad, peso corporal, condición fisiológica y pérdidas clínicas.
          </p>
        </div>

        <div className="flex items-center gap-2">
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
            title="Reiniciar valores"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 2. ENTRADAS CLÍNICAS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Columna Izquierda: Parámetros del Paciente */}
        <div className="bg-white dark:bg-[#141526] p-5 rounded-2xl border border-gray-100 dark:border-[#262840] shadow-xs space-y-4">
          <h3 className="font-extrabold text-sm text-gray-900 dark:text-gray-100 flex items-center gap-2">
            <User className="w-4 h-4 text-cyan-500" />
            <span>1. Parámetros del Paciente</span>
          </h3>

          <div>
            <label className="text-[10px] font-bold uppercase text-gray-400 block mb-1">Nombre del Paciente</label>
            <input
              type="text"
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
              className="w-full p-2 text-xs font-bold rounded-xl bg-gray-50 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[10px] font-bold uppercase text-gray-400 block mb-1">Edad (años)</label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(parseInt(e.target.value) || 0)}
                className="w-full p-2 text-sm font-bold rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-center"
              />
              <span className="text-[10px] text-gray-400 mt-1 block">
                {age <= 15 ? '👶 Pediatría (Holliday)' : '🧑 Adulto (ml/kg)'}
              </span>
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase text-gray-400 block mb-1">Peso (kg)</label>
              <input
                type="number"
                step="0.5"
                value={weightKg}
                onChange={(e) => setWeightKg(parseFloat(e.target.value) || 0)}
                className="w-full p-2 text-sm font-bold rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-center"
              />
            </div>
          </div>

          <div>
            <label className="text-[10px] font-bold uppercase text-gray-400 block mb-1">Sexo Biológico</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setGender('F')}
                className={`py-1.5 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  gender === 'F' ? 'bg-pink-600 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300'
                }`}
              >
                👩 Femenino
              </button>
              <button
                type="button"
                onClick={() => { setGender('M'); setIsPregnant(false); setIsLactating(false); }}
                className={`py-1.5 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  gender === 'M' ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300'
                }`}
              >
                👨 Masculino
              </button>
            </div>
          </div>

          <div>
            <label className="text-[10px] font-bold uppercase text-gray-400 block mb-1">Calorías Totales de la Dieta (kcal)</label>
            <input
              type="number"
              value={caloriesTarget}
              onChange={(e) => setCaloriesTarget(parseInt(e.target.value) || 0)}
              className="w-full p-2 text-xs font-bold rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-center"
            />
            <span className="text-[10px] text-gray-400 mt-0.5 block">Para regla 1.0 ml/kcal</span>
          </div>

          {/* Condiciones Especiales */}
          <div className="pt-2 border-t border-gray-100 dark:border-gray-800 space-y-2">
            <span className="text-[10px] font-bold uppercase text-gray-400 block">Condiciones Especiales (Fabiola SG.B)</span>
            
            {gender === 'F' && (
              <>
                <label className="flex items-center gap-2 text-xs cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isPregnant}
                    onChange={(e) => setIsPregnant(e.target.checked)}
                    className="rounded text-cyan-600 focus:ring-0"
                  />
                  <span className="text-gray-700 dark:text-gray-300 font-medium">Embarazo (+300 ml/día)</span>
                </label>

                <label className="flex items-center gap-2 text-xs cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isLactating}
                    onChange={(e) => setIsLactating(e.target.checked)}
                    className="rounded text-cyan-600 focus:ring-0"
                  />
                  <span className="text-gray-700 dark:text-gray-300 font-medium">Lactancia Materna (+1,000 ml/día)</span>
                </label>
              </>
            )}

            <div>
              <label className="text-[10px] font-bold uppercase text-gray-400 block mb-1">
                Temperatura Corporal (°C)
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  step="0.1"
                  value={bodyTempC}
                  onChange={(e) => setBodyTempC(parseFloat(e.target.value) || 36.5)}
                  className="w-24 p-1.5 text-xs font-bold rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-center"
                />
                <span className="text-[10px] text-gray-500">
                  {bodyTempC > 37 ? `🔥 Fiebre (+${feverAddMl} ml)` : 'Normal (36.5°C)'}
                </span>
              </div>
            </div>

            <div>
              <label className="text-[10px] font-bold uppercase text-gray-400 block mb-1">
                Actividad Física / Sudoración
              </label>
              <select
                value={physicalActivityLevel}
                onChange={(e) => setPhysicalActivityLevel(e.target.value as any)}
                className="w-full p-2 text-xs font-semibold rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200"
              >
                <option value="ligera">Ligera / Sedentario (+0 ml)</option>
                <option value="moderada">Moderada (ejercicio regular +350 ml)</option>
                <option value="intensa">Intensa (calor o deporte alto +700 ml)</option>
              </select>
            </div>

            <div>
              <label className="text-[10px] font-bold uppercase text-gray-400 block mb-1">
                Pérdidas Digestivas Estimadas (ml)
              </label>
              <input
                type="number"
                value={digestiveLossesMl}
                onChange={(e) => setDigestiveLossesMl(parseInt(e.target.value) || 0)}
                placeholder="Vómitos, diarreas..."
                className="w-full p-2 text-xs font-bold rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-center"
              />
            </div>
          </div>

        </div>

        {/* Columna Derecha: Tarjetas de Resultados */}
        <div className="lg:col-span-2 space-y-4">
          
          {/* Tarjeta Principal de Prescripción Hídrica */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-cyan-500 via-teal-600 to-emerald-600 text-white shadow-xl relative overflow-hidden">
            <div className="absolute right-0 top-0 translate-x-4 -translate-y-4 w-40 h-40 bg-white/10 rounded-full blur-2xl pointer-events-none" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-100 flex items-center gap-1.5">
              <Droplets className="w-4 h-4" />
              <span>Prescripción Hídrica Total Diaria</span>
            </span>

            <div className="mt-3 flex flex-wrap items-baseline gap-3">
              <span className="text-4xl sm:text-5xl font-black tracking-tight">{totalWaterMl}</span>
              <span className="text-xl font-bold text-cyan-100">ml / día</span>
              <span className="text-lg font-bold text-cyan-200">({totalWaterLiters} Litros)</span>
            </div>

            <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="p-3 rounded-2xl bg-white/15 backdrop-blur-xs">
                <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-100 block">Vasos de Agua</span>
                <span className="text-xl font-extrabold flex items-center gap-1.5 mt-0.5">
                  <GlassWater className="w-5 h-5 text-cyan-200" />
                  <span>{glassesOfWater} vasos (250ml)</span>
                </span>
              </div>

              <div className="p-3 rounded-2xl bg-white/15 backdrop-blur-xs">
                <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-100 block">Botellas de Agua</span>
                <span className="text-xl font-extrabold flex items-center gap-1.5 mt-0.5">
                  <span>🍼 {bottles500ml} de 500ml</span>
                </span>
              </div>

              <div className="p-3 rounded-2xl bg-white/15 backdrop-blur-xs col-span-2 sm:col-span-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-100 block">Fórmula de Base</span>
                <span className="text-xs font-extrabold mt-1 block">
                  {isChild ? `Holliday-Segar (${hollidayMl} ml)` : `Adulto ${mlPerKgFactor} ml/kg (${adultAgeMl} ml)`}
                </span>
              </div>
            </div>
          </div>

          {/* Comparación de Métodos de Cálculo */}
          <div className="bg-white dark:bg-[#141526] p-5 rounded-2xl border border-gray-100 dark:border-[#262840] shadow-xs">
            <h4 className="font-extrabold text-sm text-gray-900 dark:text-gray-100 mb-3 flex items-center gap-2">
              <Activity className="w-4 h-4 text-cyan-500" />
              <span>Comparativa Clínica de Ecuaciones Hídricas</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              
              <div className="p-3 rounded-xl bg-gray-50 dark:bg-[#191b31] border border-gray-100 dark:border-[#262840]">
                <span className="text-[10px] font-bold uppercase text-gray-400 block">1. Por Edad / Peso (Fabiola)</span>
                <span className="text-base font-extrabold text-gray-900 dark:text-gray-100 mt-1 block">{adultAgeMl} ml</span>
                <p className="text-[10px] text-gray-500 mt-1">
                  Regla de {mlPerKgFactor} ml/kg para paciente de {age} años.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-gray-50 dark:bg-[#191b31] border border-gray-100 dark:border-[#262840]">
                <span className="text-[10px] font-bold uppercase text-gray-400 block">2. Holliday-Segar</span>
                <span className="text-base font-extrabold text-gray-900 dark:text-gray-100 mt-1 block">{hollidayMl} ml</span>
                <p className="text-[10px] text-gray-500 mt-1">
                  Ecuación pediátrica e hidroelectrolítica estándar de la OMS.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-gray-50 dark:bg-[#191b31] border border-gray-100 dark:border-[#262840]">
                <span className="text-[10px] font-bold uppercase text-gray-400 block">3. Por Calorías (1 ml/kcal)</span>
                <span className="text-base font-extrabold text-gray-900 dark:text-gray-100 mt-1 block">{calorieMl} ml</span>
                <p className="text-[10px] text-gray-500 mt-1">
                  Basado en {caloriesTarget} kcal de ingesta energética programada.
                </p>
              </div>

            </div>
          </div>

          {/* Distribución Horaria Sugerida */}
          <div className="bg-white dark:bg-[#141526] p-5 rounded-2xl border border-gray-100 dark:border-[#262840] shadow-xs">
            <h4 className="font-extrabold text-sm text-gray-900 dark:text-gray-100 mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-500" />
              <span>Cronograma de Hidratación Sugerido para el Paciente</span>
            </h4>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
              <div className="p-2.5 rounded-xl bg-cyan-50/60 dark:bg-cyan-950/20 border border-cyan-100 dark:border-cyan-900/40 text-center">
                <span className="text-[10px] font-bold text-cyan-800 dark:text-cyan-300 block">Al Despertar</span>
                <span className="font-extrabold text-gray-900 dark:text-gray-100">1 vaso (250 ml)</span>
                <span className="text-[9px] text-gray-400 block mt-0.5">Activa metabolismo</span>
              </div>
              <div className="p-2.5 rounded-xl bg-cyan-50/60 dark:bg-cyan-950/20 border border-cyan-100 dark:border-cyan-900/40 text-center">
                <span className="text-[10px] font-bold text-cyan-800 dark:text-cyan-300 block">Media Mañana</span>
                <span className="font-extrabold text-gray-900 dark:text-gray-100">2 vasos (500 ml)</span>
                <span className="text-[9px] text-gray-400 block mt-0.5">Sorbos constantes</span>
              </div>
              <div className="p-2.5 rounded-xl bg-cyan-50/60 dark:bg-cyan-950/20 border border-cyan-100 dark:border-cyan-900/40 text-center">
                <span className="text-[10px] font-bold text-cyan-800 dark:text-cyan-300 block">Tarde</span>
                <span className="font-extrabold text-gray-900 dark:text-gray-100">2 vasos (500 ml)</span>
                <span className="text-[9px] text-gray-400 block mt-0.5">Previo o post estudio</span>
              </div>
              <div className="p-2.5 rounded-xl bg-cyan-50/60 dark:bg-cyan-950/20 border border-cyan-100 dark:border-cyan-900/40 text-center">
                <span className="text-[10px] font-bold text-cyan-800 dark:text-cyan-300 block">Noche (antes 20:00)</span>
                <span className="font-extrabold text-gray-900 dark:text-gray-100">1 vaso (250 ml)</span>
                <span className="text-[9px] text-gray-400 block mt-0.5">Evita nicturia</span>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
