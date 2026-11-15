'use client';

import React, { useState } from 'react';
import { initialClinicalCases } from '@/lib/data/nutritionData';
import { ClinicalCase } from '@/lib/types';
import { 
  Stethoscope, 
  Plus, 
  User, 
  Activity, 
  FileText, 
  CheckCircle2, 
  AlertCircle,
  X,
  HeartPulse,
  Sparkles
} from 'lucide-react';

export const CasosClinicosView: React.FC = () => {
  const [cases, setCases] = useState<ClinicalCase[]>(initialClinicalCases);
  const [selectedCase, setSelectedCase] = useState<ClinicalCase>(initialClinicalCases[0]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Formulario nuevo caso
  const [patientFakeName, setPatientFakeName] = useState('');
  const [age, setAge] = useState<number>(45);
  const [gender, setGender] = useState<'Femenino' | 'Masculino'>('Femenino');
  const [medicalDiagnosis, setMedicalDiagnosis] = useState('');
  const [hospitalWard, setHospitalWard] = useState('Hospital de Clínicas • Sala Medicina Interna');
  const [weightKg, setWeightKg] = useState<number>(65);
  const [heightCm, setHeightCm] = useState<number>(160);
  const [problem, setProblem] = useState('');
  const [etiology, setEtiology] = useState('');
  const [signsSymptoms, setSignsSymptoms] = useState('');
  const [dietaryPrescription, setDietaryPrescription] = useState('');
  const [targetKcal, setTargetKcal] = useState<number>(1800);
  const [targetProteinGrams, setTargetProteinGrams] = useState<number>(75);
  const [clinicalNotes, setClinicalNotes] = useState('');

  const handleAddCase = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientFakeName.trim() || !medicalDiagnosis.trim()) return;

    const heightM = heightCm / 100;
    const imc = heightM > 0 ? parseFloat((weightKg / (heightM * heightM)).toFixed(1)) : 0;
    let bmiCat = 'Normopeso';
    if (imc < 18.5) bmiCat = 'Bajo Peso';
    else if (imc >= 25 && imc < 30) bmiCat = 'Sobrepeso';
    else if (imc >= 30) bmiCat = 'Obesidad';

    const newCase: ClinicalCase = {
      id: `case_${Date.now()}`,
      patientFakeName: patientFakeName.trim(),
      age: Number(age) || 0,
      gender,
      medicalDiagnosis: medicalDiagnosis.trim(),
      hospitalWard: hospitalWard.trim(),
      weightKg: Number(weightKg) || 0,
      heightCm: Number(heightCm) || 0,
      bmi: imc,
      bmiCategory: bmiCat,
      biochemistry: {
        glucose: 95,
        creatinine: 1.0,
        albumin: 4.0
      },
      pesDiagnosis: {
        problem: problem.trim(),
        etiology: etiology.trim(),
        signsSymptoms: signsSymptoms.trim()
      },
      dietaryPrescription: dietaryPrescription.trim(),
      targetKcal: Number(targetKcal) || 1800,
      targetProteinGrams: Number(targetProteinGrams) || 75,
      clinicalNotes: clinicalNotes.trim(),
      status: 'en_analisis'
    };

    setCases([newCase, ...cases]);
    setSelectedCase(newCase);
    setIsAddModalOpen(false);
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-200">
      
      {/* Encabezado */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-100 dark:border-gray-800">
        <div>
          <h2 className="text-2xl font-extrabold text-gray-900 dark:text-gray-100 flex items-center gap-2">
            <Stethoscope className="w-6 h-6 text-pink-500" />
            Casos Clínicos y Formato PES
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
            Registro y resolución de casos de práctica hospitalaria (Proceso de Atención Nutricional - PAN).
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-2 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 text-white text-xs font-bold shadow-md shadow-pink-500/20 hover:opacity-95 transition-all flex items-center gap-2 cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>+ Nuevo Caso Clínico</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Columna Izquierda: Lista de Casos Clínicos */}
        <div className="space-y-3">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block px-1">
            Pacientes y Casos en Estudio ({cases.length})
          </span>

          {cases.map((c) => {
            const isSelected = selectedCase?.id === c.id;
            return (
              <div
                key={c.id}
                onClick={() => setSelectedCase(c)}
                className={`p-4 rounded-3xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'border-pink-500 bg-white dark:bg-[#18221f] shadow-md shadow-pink-500/10'
                    : 'border-gray-100 dark:border-gray-800 bg-white/70 dark:bg-[#141526]/70 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-pink-100 dark:bg-pink-950/40 text-pink-600 font-bold text-xs flex items-center justify-center">
                      {c.patientFakeName.substring(0, 2).toUpperCase()}
                    </div>
                    <span className="text-sm font-bold text-gray-900 dark:text-gray-100">
                      {c.patientFakeName}
                    </span>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300">
                    {c.age} años • {c.gender}
                  </span>
                </div>

                <div className="text-xs font-medium text-pink-600 dark:text-pink-400 line-clamp-1 mt-1">
                  {c.medicalDiagnosis}
                </div>

                <div className="flex items-center justify-between text-[11px] text-gray-400 mt-2 pt-2 border-t border-gray-50 dark:border-gray-800">
                  <span>IMC: {c.bmi} ({c.bmiCategory.split(' ')[0]})</span>
                  <span className="font-semibold text-gray-700 dark:text-gray-300">{c.targetKcal} kcal/día</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Columna Derecha: Ficha Completa del Caso Seleccionado */}
        {selectedCase && (
          <div className="lg:col-span-2 space-y-6">
            
            {/* Cabecera del Caso */}
            <div className="bg-white dark:bg-[#18221f] rounded-3xl p-6 border border-gray-100 dark:border-[#293a34] shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-gray-100 dark:border-gray-800 gap-3">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-pink-50 dark:bg-pink-950/40 text-pink-600 dark:text-pink-300 text-[11px] font-bold mb-2">
                    <HeartPulse className="w-3.5 h-3.5" />
                    <span>{selectedCase.hospitalWard}</span>
                  </div>
                  <h3 className="text-xl font-extrabold text-gray-900 dark:text-gray-100">
                    {selectedCase.patientFakeName} ({selectedCase.age} años, {selectedCase.gender})
                  </h3>
                  <p className="text-sm font-semibold text-pink-600 dark:text-pink-400 mt-0.5">
                    Dx Médico: {selectedCase.medicalDiagnosis}
                  </p>
                </div>

                <div className="text-right">
                  <div className="text-2xl font-extrabold text-gray-900 dark:text-gray-100">
                    {selectedCase.targetKcal} <span className="text-xs font-normal text-gray-400">kcal/día</span>
                  </div>
                  <div className="text-xs font-bold text-orange-600">
                    {selectedCase.targetProteinGrams} g proteína
                  </div>
                </div>
              </div>

              {/* Antropometría y Bioquímica */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-4 border-b border-gray-100 dark:border-gray-800 text-xs">
                <div className="p-3 rounded-2xl bg-gray-50 dark:bg-[#121816]">
                  <span className="text-gray-400 block text-[10px] uppercase font-bold">Peso & Talla</span>
                  <span className="font-extrabold text-gray-800 dark:text-gray-200">{selectedCase.weightKg} kg • {selectedCase.heightCm} cm</span>
                </div>
                <div className="p-3 rounded-2xl bg-gray-50 dark:bg-[#121816]">
                  <span className="text-gray-400 block text-[10px] uppercase font-bold">IMC & Estado</span>
                  <span className="font-extrabold text-gray-800 dark:text-gray-200">{selectedCase.bmi} kg/m² ({selectedCase.bmiCategory.split(' ')[0]})</span>
                </div>
                <div className="p-3 rounded-2xl bg-gray-50 dark:bg-[#121816]">
                  <span className="text-gray-400 block text-[10px] uppercase font-bold">Albúmina Sérica</span>
                  <span className="font-extrabold text-gray-800 dark:text-gray-200">{selectedCase.biochemistry.albumin || '--'} g/dL</span>
                </div>
                <div className="p-3 rounded-2xl bg-gray-50 dark:bg-[#121816]">
                  <span className="text-gray-400 block text-[10px] uppercase font-bold">Creatinina / Glucosa</span>
                  <span className="font-extrabold text-gray-800 dark:text-gray-200">
                    {selectedCase.biochemistry.creatinine ? `${selectedCase.biochemistry.creatinine} mg/dL` : `${selectedCase.biochemistry.glucose} mg/dL`}
                  </span>
                </div>
              </div>

              {/* DIAGNÓSTICO NUTRICIONAL PES (PROBLEMA - ETIOLOGÍA - SIGNOS/SÍNTOMAS) */}
              <div className="pt-4">
                <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-pink-500" />
                  Diagnóstico Nutricional Estructurado (Método PES)
                </h4>

                <div className="space-y-2 text-xs">
                  <div className="p-3 rounded-2xl bg-pink-50/60 dark:bg-pink-950/20 border border-pink-100 dark:border-pink-900/40">
                    <span className="font-bold text-pink-700 dark:text-pink-300 block mb-0.5">
                      P (Problema / Diagnóstico):
                    </span>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      {selectedCase.pesDiagnosis.problem}
                    </p>
                  </div>

                  <div className="p-3 rounded-2xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/40">
                    <span className="font-bold text-amber-700 dark:text-amber-300 block mb-0.5">
                      E (Etiología / Causa):
                    </span>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      {selectedCase.pesDiagnosis.etiology}
                    </p>
                  </div>

                  <div className="p-3 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/40">
                    <span className="font-bold text-emerald-700 dark:text-emerald-300 block mb-0.5">
                      S (Signos y Síntomas / Evidencia clínica):
                    </span>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      {selectedCase.pesDiagnosis.signsSymptoms}
                    </p>
                  </div>
                </div>
              </div>

              {/* Prescripción Dietética e Intervención */}
              <div className="pt-5 mt-5 border-t border-gray-100 dark:border-gray-800">
                <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                  Prescripción Dietética y Plan de Alimentación
                </h4>
                <div className="p-4 rounded-2xl bg-gray-50 dark:bg-[#121816] border border-gray-200/60 dark:border-gray-800 text-xs text-gray-800 dark:text-gray-200 leading-relaxed font-medium">
                  {selectedCase.dietaryPrescription}
                </div>
              </div>

              {/* Notas Clínicas y Pasantía */}
              {selectedCase.clinicalNotes && (
                <div className="pt-4 text-xs text-gray-400">
                  <span className="font-bold text-gray-500">Notas de Pasantía:</span> {selectedCase.clinicalNotes}
                </div>
              )}
            </div>

          </div>
        )}

      </div>

      {/* MODAL PARA CREAR NUEVO CASO CLÍNICO */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white dark:bg-[#18221f] rounded-3xl p-6 max-w-2xl w-full border border-gray-100 dark:border-gray-800 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-gray-800 mb-4">
              <h3 className="text-base font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                <Plus className="w-5 h-5 text-pink-500" />
                Registrar Nuevo Caso Clínico de Práctica
              </h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 rounded-lg text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddCase} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="font-semibold text-gray-600 dark:text-gray-300 block mb-1">Nombre Ficticio *</label>
                  <input
                    type="text"
                    required
                    value={patientFakeName}
                    onChange={(e) => setPatientFakeName(e.target.value)}
                    placeholder="ej: Paciente Carlos B."
                    className="w-full bg-gray-50 dark:bg-[#121816] border border-gray-200 dark:border-gray-700 rounded-xl p-2.5"
                  />
                </div>
                <div>
                  <label className="font-semibold text-gray-600 dark:text-gray-300 block mb-1">Edad</label>
                  <input
                    type="number"
                    value={age}
                    onChange={(e) => setAge(parseInt(e.target.value) || 0)}
                    className="w-full bg-gray-50 dark:bg-[#121816] border border-gray-200 dark:border-gray-700 rounded-xl p-2.5"
                  />
                </div>
                <div>
                  <label className="font-semibold text-gray-600 dark:text-gray-300 block mb-1">Sexo</label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value as any)}
                    className="w-full bg-gray-50 dark:bg-[#121816] border border-gray-200 dark:border-gray-700 rounded-xl p-2.5"
                  >
                    <option value="Femenino">Femenino</option>
                    <option value="Masculino">Masculino</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-semibold text-gray-600 dark:text-gray-300 block mb-1">Diagnóstico Médico Principal *</label>
                <input
                  type="text"
                  required
                  value={medicalDiagnosis}
                  onChange={(e) => setMedicalDiagnosis(e.target.value)}
                  placeholder="ej: Cirrosis Hepática Compensada / Falla Renal / Síndrome Metabólico"
                  className="w-full bg-gray-50 dark:bg-[#121816] border border-gray-200 dark:border-gray-700 rounded-xl p-2.5"
                />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div>
                  <label className="font-semibold text-gray-600 dark:text-gray-300 block mb-1">Peso (kg)</label>
                  <input
                    type="number"
                    value={weightKg}
                    onChange={(e) => setWeightKg(parseFloat(e.target.value) || 0)}
                    className="w-full bg-gray-50 dark:bg-[#121816] border border-gray-200 dark:border-gray-700 rounded-xl p-2"
                  />
                </div>
                <div>
                  <label className="font-semibold text-gray-600 dark:text-gray-300 block mb-1">Talla (cm)</label>
                  <input
                    type="number"
                    value={heightCm}
                    onChange={(e) => setHeightCm(parseFloat(e.target.value) || 0)}
                    className="w-full bg-gray-50 dark:bg-[#121816] border border-gray-200 dark:border-gray-700 rounded-xl p-2"
                  />
                </div>
                <div>
                  <label className="font-semibold text-gray-600 dark:text-gray-300 block mb-1">Meta Kcal</label>
                  <input
                    type="number"
                    value={targetKcal}
                    onChange={(e) => setTargetKcal(parseInt(e.target.value) || 0)}
                    className="w-full bg-gray-50 dark:bg-[#121816] border border-gray-200 dark:border-gray-700 rounded-xl p-2"
                  />
                </div>
                <div>
                  <label className="font-semibold text-gray-600 dark:text-gray-300 block mb-1">Proteína (g)</label>
                  <input
                    type="number"
                    value={targetProteinGrams}
                    onChange={(e) => setTargetProteinGrams(parseFloat(e.target.value) || 0)}
                    className="w-full bg-gray-50 dark:bg-[#121816] border border-gray-200 dark:border-gray-700 rounded-xl p-2"
                  />
                </div>
              </div>

              {/* Formulario PES */}
              <div className="p-3.5 rounded-2xl bg-gray-50 dark:bg-[#121816] border border-gray-200/60 dark:border-gray-800 space-y-3">
                <span className="font-bold text-pink-600 uppercase tracking-wider block">Redacción del Diagnóstico PES:</span>
                <div>
                  <label className="font-semibold block mb-0.5 text-gray-600">P - Problema</label>
                  <input
                    type="text"
                    value={problem}
                    onChange={(e) => setProblem(e.target.value)}
                    placeholder="ej: Ingesta proteico-calórica subóptima"
                    className="w-full bg-white dark:bg-[#18221f] border border-gray-200 dark:border-gray-700 rounded-lg p-2"
                  />
                </div>
                <div>
                  <label className="font-semibold block mb-0.5 text-gray-600">E - Etiología (Relacionado con...)</label>
                  <input
                    type="text"
                    value={etiology}
                    onChange={(e) => setEtiology(e.target.value)}
                    placeholder="ej: Relacionado con náuseas y dificultad masticatoria"
                    className="w-full bg-white dark:bg-[#18221f] border border-gray-200 dark:border-gray-700 rounded-lg p-2"
                  />
                </div>
                <div>
                  <label className="font-semibold block mb-0.5 text-gray-600">S - Signos / Síntomas (Evidenciado por...)</label>
                  <input
                    type="text"
                    value={signsSymptoms}
                    onChange={(e) => setSignsSymptoms(e.target.value)}
                    placeholder="ej: Evidenciado por pérdida de 5% de peso en 1 mes"
                    className="w-full bg-white dark:bg-[#18221f] border border-gray-200 dark:border-gray-700 rounded-lg p-2"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-gray-600 dark:text-gray-300 block mb-1">Prescripción Dietética</label>
                <textarea
                  rows={2}
                  value={dietaryPrescription}
                  onChange={(e) => setDietaryPrescription(e.target.value)}
                  placeholder="Detallar distribución de macronutrientes, textura de la dieta y recomendaciones..."
                  className="w-full bg-gray-50 dark:bg-[#121816] border border-gray-200 dark:border-gray-700 rounded-xl p-2.5"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 font-bold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-pink-500 text-white font-bold shadow-md hover:bg-pink-600"
                >
                  Guardar Caso
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
