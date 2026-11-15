'use client';

import React, { useState } from 'react';
import { 
  FileText, 
  Printer, 
  CheckCircle2, 
  Sparkles, 
  User, 
  Heart, 
  Activity,
  AlertCircle,
  Download
} from 'lucide-react';

export const AnamnesisClinicaView: React.FC = () => {
  // Datos del Paciente
  const [patientName, setPatientName] = useState<string>('Lucía Mendoza Paredes');
  const [patientAge, setPatientAge] = useState<number>(34);
  const [patientGender, setPatientGender] = useState<'Femenino' | 'Masculino'>('Femenino');
  const [patientOccupation, setPatientOccupation] = useState<string>('Docente de Secundaria');
  const [medicalDiagnosis, setMedicalDiagnosis] = useState<string>('Gastritis crónica y Resistencia a la Insulina');
  const [consultationReason, setConsultationReason] = useState<string>('Pérdida de peso controlada y mejoría de síntomas digestivos');

  // Antecedentes Patológicos
  const [hasDiabetes, setHasDiabetes] = useState<boolean>(false);
  const [hasHta, setHasHta] = useState<boolean>(false);
  const [hasDyslipidemia, setHasDyslipidemia] = useState<boolean>(true);
  const [hasGastritis, setHasGastritis] = useState<boolean>(true);
  const [hasHypothyroidism, setHasHypothyroidism] = useState<boolean>(false);
  const [foodAllergies, setFoodAllergies] = useState<string>('Intolerancia a la lactosa entera');

  // Antropometría Rápida
  const [weightKg, setWeightKg] = useState<number>(68);
  const [heightCm, setHeightCm] = useState<number>(162);
  const [waistCm, setWaistCm] = useState<number>(79);

  // Recordatorio de 24 Horas (R24h)
  const [breakfast, setBreakfast] = useState<string>('Té con leche deslactosada, 2 panes marraqueta con queso criollo.');
  const [midMorning, setMidMorning] = useState<string>('1 manzana verde mediana.');
  const [lunch, setLunch] = useState<string>('Sopa de verduras con fideo, milanesa de pollo al horno con arroz y ensalada de lechuga con tomate.');
  const [afternoonSnack, setAfternoonSnack] = useState<string>('Yogurt deslactosado con 3 galletas integrales.');
  const [dinner, setDinner] = useState<string>('Té de hierbas y sándwich de jamón de pavo con huevo revuelto.');

  // Diagnóstico PES y Prescripción
  const [pesProblem, setPesProblem] = useState<string>('Ingesta excesiva de carbohidratos simples y grasas saturadas');
  const [pesEtiology, setPesEtiology] = useState<string>('Falta de tiempo para planificar alimentos y elecciones dietéticas poco saludables en el trabajo');
  const [pesSigns, setPesSigns] = useState<string>('HOMA-IR elevado (3.2), dislipidemia e IMC de 25.9 kg/m²');
  const [calorieTarget, setCalorieTarget] = useState<number>(1650);

  const heightM = heightCm / 100;
  const imc = heightM > 0 ? (weightKg / (heightM * heightM)).toFixed(1) : '0';

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-200">
      
      {/* Encabezado y Acción de Imprimir */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-100 dark:border-gray-800 print:hidden">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-pink-100 dark:bg-pink-950/50 text-pink-700 dark:text-pink-300 text-[10px] font-bold mb-1">
            <Sparkles className="w-3 h-3" />
            <span>Gabinete de Consulta Nutricional Privada & Clínica</span>
          </div>
          <h2 className="text-2xl font-extrabold text-gray-900 dark:text-gray-100 flex items-center gap-2">
            <FileText className="w-6 h-6 text-pink-500" />
            Ficha de Anamnesis Nutricional & Historia Clínica
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
            Historia clínica completa con recordatorio 24h, diagnóstico PES y generación de hoja para imprimir para el paciente.
          </p>
        </div>

        <button
          onClick={handlePrint}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-extrabold text-xs shadow-md shadow-pink-500/25 active:scale-98 transition-all cursor-pointer"
        >
          <Printer className="w-4 h-4" />
          <span>Imprimir / Guardar en PDF</span>
        </button>
      </div>

      {/* DOCUMENTO CLINICO IMPRIMIBLE */}
      <div className="bg-white dark:bg-[#18221f] rounded-3xl p-6 sm:p-8 border border-gray-100 dark:border-[#293a34] shadow-md space-y-6 print:border-none print:shadow-none print:p-0">
        
        {/* Membrete Profesional */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b-2 border-pink-500/80 gap-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-pink-500 via-rose-500 to-emerald-400 text-white flex items-center justify-center font-bold text-xl shadow-md">
              🌿
            </div>
            <div>
              <h1 className="text-lg font-extrabold text-gray-900 dark:text-gray-100">
                Nutrivel • Gabinete Nutricional
              </h1>
              <p className="text-xs font-semibold text-pink-600 dark:text-pink-400">
                Lic. Marivel Avila Fernandez • Nutrición y Dietética
              </p>
              <p className="text-[10px] text-gray-400">
                Universidad Villa de Oropesa (UNIVIOR) • La Paz, Bolivia
              </p>
            </div>
          </div>

          <div className="text-left sm:text-right text-xs text-gray-500">
            <span className="font-bold text-gray-900 dark:text-gray-100 block">Ficha Clínica N° 2026-084</span>
            <span>Fecha: {new Date().toLocaleDateString('es-BO', { day: '2-digit', month: 'long', year: 'numeric' })}</span>
          </div>
        </div>

        {/* 1. Datos Personales */}
        <div className="space-y-3">
          <h3 className="text-xs font-extrabold uppercase tracking-wider text-pink-600 dark:text-pink-400 flex items-center gap-1.5">
            <User className="w-3.5 h-3.5" />
            <span>1. Datos del Paciente</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div>
              <label className="text-[11px] font-bold text-gray-400 block mb-0.5">Nombre Completo:</label>
              <input
                type="text"
                value={patientName}
                onChange={e => setPatientName(e.target.value)}
                className="w-full font-bold text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-[#121816] p-2 rounded-xl border border-gray-200 dark:border-gray-700 outline-none"
              />
            </div>
            <div>
              <label className="text-[11px] font-bold text-gray-400 block mb-0.5">Edad:</label>
              <input
                type="number"
                value={patientAge}
                onChange={e => setPatientAge(parseInt(e.target.value) || 0)}
                className="w-full font-bold text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-[#121816] p-2 rounded-xl border border-gray-200 dark:border-gray-700 outline-none"
              />
            </div>
            <div>
              <label className="text-[11px] font-bold text-gray-400 block mb-0.5">Ocupación:</label>
              <input
                type="text"
                value={patientOccupation}
                onChange={e => setPatientOccupation(e.target.value)}
                className="w-full font-bold text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-[#121816] p-2 rounded-xl border border-gray-200 dark:border-gray-700 outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div>
              <label className="text-[11px] font-bold text-gray-400 block mb-0.5">Diagnóstico Médico Remitido:</label>
              <input
                type="text"
                value={medicalDiagnosis}
                onChange={e => setMedicalDiagnosis(e.target.value)}
                className="w-full font-bold text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-[#121816] p-2 rounded-xl border border-gray-200 dark:border-gray-700 outline-none"
              />
            </div>
            <div>
              <label className="text-[11px] font-bold text-gray-400 block mb-0.5">Motivo de Consulta:</label>
              <input
                type="text"
                value={consultationReason}
                onChange={e => setConsultationReason(e.target.value)}
                className="w-full font-bold text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-[#121816] p-2 rounded-xl border border-gray-200 dark:border-gray-700 outline-none"
              />
            </div>
          </div>
        </div>

        {/* 2. Antropometría Inicial */}
        <div className="space-y-3 pt-3 border-t border-gray-100 dark:border-gray-800">
          <h3 className="text-xs font-extrabold uppercase tracking-wider text-pink-600 dark:text-pink-400 flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5" />
            <span>2. Antropometría Básica</span>
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3 rounded-2xl bg-gray-50 dark:bg-[#121816] border border-gray-100 dark:border-gray-800 text-center">
              <span className="text-[10px] text-gray-400 block">Peso Actual</span>
              <input
                type="number"
                step="0.5"
                value={weightKg}
                onChange={e => setWeightKg(parseFloat(e.target.value) || 0)}
                className="text-base font-extrabold text-center text-gray-900 dark:text-gray-100 bg-transparent w-full outline-none"
              />
              <span className="text-[10px] text-gray-400">kg</span>
            </div>

            <div className="p-3 rounded-2xl bg-gray-50 dark:bg-[#121816] border border-gray-100 dark:border-gray-800 text-center">
              <span className="text-[10px] text-gray-400 block">Talla</span>
              <input
                type="number"
                value={heightCm}
                onChange={e => setHeightCm(parseInt(e.target.value) || 0)}
                className="text-base font-extrabold text-center text-gray-900 dark:text-gray-100 bg-transparent w-full outline-none"
              />
              <span className="text-[10px] text-gray-400">cm</span>
            </div>

            <div className="p-3 rounded-2xl bg-gray-50 dark:bg-[#121816] border border-gray-100 dark:border-gray-800 text-center">
              <span className="text-[10px] text-gray-400 block">IMC</span>
              <span className="text-base font-extrabold text-pink-600 block mt-1">
                {imc}
              </span>
              <span className="text-[10px] text-gray-400">kg/m² (Sobrepeso)</span>
            </div>

            <div className="p-3 rounded-2xl bg-gray-50 dark:bg-[#121816] border border-gray-100 dark:border-gray-800 text-center">
              <span className="text-[10px] text-gray-400 block">Circunferencia Cintura</span>
              <input
                type="number"
                value={waistCm}
                onChange={e => setWaistCm(parseFloat(e.target.value) || 0)}
                className="text-base font-extrabold text-center text-gray-900 dark:text-gray-100 bg-transparent w-full outline-none"
              />
              <span className="text-[10px] text-gray-400">cm</span>
            </div>
          </div>
        </div>

        {/* 3. Recordatorio de 24 Horas */}
        <div className="space-y-3 pt-3 border-t border-gray-100 dark:border-gray-800">
          <h3 className="text-xs font-extrabold uppercase tracking-wider text-pink-600 dark:text-pink-400 flex items-center gap-1.5">
            <span>3. Recordatorio de 24 Horas Habitual (R24h)</span>
          </h3>

          <div className="space-y-2 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 items-center">
              <span className="sm:col-span-3 font-bold text-gray-600 dark:text-gray-400">Desayuno (08:00):</span>
              <input
                type="text"
                value={breakfast}
                onChange={e => setBreakfast(e.target.value)}
                className="sm:col-span-9 bg-gray-50 dark:bg-[#121816] p-2 rounded-xl border border-gray-200 dark:border-gray-700 outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 items-center">
              <span className="sm:col-span-3 font-bold text-gray-600 dark:text-gray-400">Colación Mañana:</span>
              <input
                type="text"
                value={midMorning}
                onChange={e => setMidMorning(e.target.value)}
                className="sm:col-span-9 bg-gray-50 dark:bg-[#121816] p-2 rounded-xl border border-gray-200 dark:border-gray-700 outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 items-center">
              <span className="sm:col-span-3 font-bold text-gray-600 dark:text-gray-400">Almuerzo (13:00):</span>
              <input
                type="text"
                value={lunch}
                onChange={e => setLunch(e.target.value)}
                className="sm:col-span-9 bg-gray-50 dark:bg-[#121816] p-2 rounded-xl border border-gray-200 dark:border-gray-700 outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 items-center">
              <span className="sm:col-span-3 font-bold text-gray-600 dark:text-gray-400">Merienda Tarde:</span>
              <input
                type="text"
                value={afternoonSnack}
                onChange={e => setAfternoonSnack(e.target.value)}
                className="sm:col-span-9 bg-gray-50 dark:bg-[#121816] p-2 rounded-xl border border-gray-200 dark:border-gray-700 outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 items-center">
              <span className="sm:col-span-3 font-bold text-gray-600 dark:text-gray-400">Cena (20:30):</span>
              <input
                type="text"
                value={dinner}
                onChange={e => setDinner(e.target.value)}
                className="sm:col-span-9 bg-gray-50 dark:bg-[#121816] p-2 rounded-xl border border-gray-200 dark:border-gray-700 outline-none"
              />
            </div>
          </div>
        </div>

        {/* 4. Diagnóstico PES & Plan Dietoterapéutico */}
        <div className="space-y-3 pt-3 border-t border-gray-100 dark:border-gray-800">
          <h3 className="text-xs font-extrabold uppercase tracking-wider text-pink-600 dark:text-pink-400">
            4. Diagnóstico Nutricional PES & Prescripción
          </h3>

          <div className="p-4 rounded-2xl bg-pink-50/40 dark:bg-pink-950/20 border border-pink-200 dark:border-pink-900/40 space-y-2 text-xs">
            <p>
              <strong className="text-pink-600 font-bold">Problema (P):</strong> {pesProblem}
            </p>
            <p>
              <strong className="text-pink-600 font-bold">Etiología (E):</strong> {pesEtiology}
            </p>
            <p>
              <strong className="text-pink-600 font-bold">Signos y Síntomas (S):</strong> {pesSigns}
            </p>
          </div>

          <div className="p-3 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200 text-xs flex items-center justify-between">
            <span className="text-emerald-800 dark:text-emerald-300 font-bold">
              Prescripción Energética Objetivo: {calorieTarget} kcal/día
            </span>
            <span className="text-emerald-600 text-[11px]">
              Fraccionamiento en 5 tiempos de comida
            </span>
          </div>
        </div>

        {/* Pie de Firma de la Licenciada */}
        <div className="pt-8 flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-t border-gray-200 dark:border-gray-800">
          <div className="text-[11px] text-gray-400 max-w-sm">
            Documento emitido con fines clínicos y de seguimiento dietoterapéutico profesional. Válido para control médico.
          </div>

          <div className="text-center sm:text-right border-t border-gray-400 pt-2 min-w-[200px]">
            <p className="text-xs font-bold text-gray-900 dark:text-gray-100">
              Lic. Marivel Avila Fernandez
            </p>
            <p className="text-[10px] text-pink-600 dark:text-pink-400">
              Nutricionista Dietista • UNIVIOR
            </p>
          </div>
        </div>

      </div>

    </div>
  );
};
