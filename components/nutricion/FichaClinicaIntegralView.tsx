'use client';

import React, { useState } from 'react';
import { 
  FileCheck2, 
  User, 
  Stethoscope, 
  AlertTriangle, 
  Pill, 
  HeartHandshake, 
  Printer, 
  RotateCcw, 
  Sparkles, 
  CheckCircle2, 
  Eye, 
  Heart,
  ShieldCheck,
  Brain
} from 'lucide-react';

export const FichaClinicaIntegralView: React.FC = () => {
  // Datos Generales
  const [patientName, setPatientName] = useState('Mariana Quispe Mamani');
  const [age, setAge] = useState<number>(24);
  const [gender, setGender] = useState<'F' | 'M'>('F');
  const [consultReason, setConsultReason] = useState('Evaluación nutricional integral y fatiga crónica');
  const [consultDate, setConsultDate] = useState(new Date().toISOString().split('T')[0]);

  // Hábitos y Tóxicos (Excel Fabiola SG.B)
  const [tobacco, setTobacco] = useState(false);
  const [vape, setVape] = useState(false);
  const [alcohol, setAlcohol] = useState(true);
  const [drugs, setDrugs] = useState(false);
  const [stressLevel, setStressLevel] = useState<'Bajo' | 'Moderado' | 'Alto' | 'Muy Alto'>('Alto');
  const [headache, setHeadache] = useState(true);
  const [migraine, setMigraine] = useState(false);

  // Medicación y Suplementos
  const [currentMedication, setCurrentMedication] = useState('Paracetamol ocasional');
  const [supplements, setSupplements] = useState([
    { type: 'Hierro polimaltosado', dose: '100 mg/día', reason: 'Anemia ferropénica' },
    { type: 'Vitamina C', dose: '500 mg/día', reason: 'Favorecer absorción de hierro' }
  ]);
  const [newSuppType, setNewSuppType] = useState('');
  const [newSuppDose, setNewSuppDose] = useState('');
  const [newSuppReason, setNewSuppReason] = useState('');

  // Problemas Gastrointestinales
  const [giIssues, setGiIssues] = useState({
    reflujo: true,
    ulceras: false,
    estrenimiento: true,
    diarrea: false,
    nauseas: false,
    vomitos: false,
    laxantes: false,
    diureticos: false,
    antiacidos: true,
    analgesicos: false
  });

  // Trastornos de Conducta Alimentaria (TCA)
  const [tcaIssues, setTcaIssues] = useState({
    anorexia: false,
    bulimia: false,
    atracon: false,
    pica: false,
    rumiacion: false
  });

  // Alergias e Intolerancias
  const [intolerances, setIntolerances] = useState({
    lactosa: true,
    gluten: false,
    frutosSecos: false,
    mariscos: false,
    otras: 'Ninguna conocida'
  });

  // Antecedentes Patológicos Familiares
  const [familyHistory, setFamilyHistory] = useState({
    diabetes: true,
    hta: true,
    dislipidemia: true,
    cardiovascular: false,
    renal: false,
    hepatica: false,
    cancer: false,
    crohn: false
  });

  // Examen Físico Carencial (10 Zonas Anatómicas del Excel de Fabiola SG.B)
  const [physicalExam, setPhysicalExam] = useState({
    ojos: 'Conjuntivas ligeramente pálidas (sugestivo de anemia)',
    piel: 'Xerosis leve en extremidades, sin hematomas',
    cabello: 'Ligeramente quebradizo, caída moderada',
    unas: 'Sin coiloniquia, estrías longitudinales finas',
    labios: 'Queilitis angular ausente, hidratados',
    encias: 'Normales, sin gingivorragia ni sangrado',
    lengua: 'Papilas conservadas, sin glositis atrófica',
    dientes: 'Piezas completas, sin fluorosis',
    cuello: 'Tiroides no palpable, sin acantosis nigricans',
    mucosas: 'Mucosa oral ligeramente pálida'
  });

  const handleAddSupplement = () => {
    if (!newSuppType.trim()) return;
    setSupplements(prev => [...prev, { type: newSuppType, dose: newSuppDose, reason: newSuppReason }]);
    setNewSuppType('');
    setNewSuppDose('');
    setNewSuppReason('');
  };

  const handleRemoveSupplement = (index: number) => {
    setSupplements(prev => prev.filter((_, i) => i !== index));
  };

  const handleReset = () => {
    setPatientName('Paciente Consulta Nutricional');
    setAge(22);
    setGender('F');
    setConsultReason('');
    setTobacco(false);
    setVape(false);
    setAlcohol(false);
    setDrugs(false);
    setStressLevel('Moderado');
    setHeadache(false);
    setMigraine(false);
    setCurrentMedication('');
    setSupplements([]);
  };

  return (
    <div className="space-y-6 pb-16 animate-in fade-in duration-200">
      
      {/* 1. ENCABEZADO */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-100 dark:border-gray-800">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-100 text-indigo-800 dark:bg-indigo-950/60 dark:text-indigo-300 text-xs font-bold mb-2">
            <FileCheck2 className="w-3.5 h-3.5" />
            <span>Módulo Clínico • Excel Nutricional Fabiola SG.B</span>
          </div>
          <h2 className="text-2xl font-extrabold text-gray-900 dark:text-gray-100 tracking-tight">
            Ficha Clínica Nutricional Integral
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
            Historia clínica nutricional, hábitos, antecedentes patológicos y examen físico orientado a carencias.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => window.print()}
            className="px-3.5 py-2 text-xs font-bold rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Imprimir Ficha</span>
          </button>
          <button
            onClick={handleReset}
            className="p-2 text-xs font-semibold rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:text-red-600 transition-all cursor-pointer"
            title="Reiniciar ficha"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 2. IDENTIFICACIÓN Y MOTIVO DE CONSULTA */}
      <div className="bg-white dark:bg-[#141526] p-5 rounded-2xl border border-gray-100 dark:border-[#262840] shadow-xs">
        <h3 className="font-extrabold text-sm text-gray-900 dark:text-gray-100 mb-3 flex items-center gap-2">
          <User className="w-4 h-4 text-indigo-500" />
          <span>1. Identificación del Paciente</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2">
            <label className="text-[10px] font-bold uppercase text-gray-400 block mb-1">Nombre Completo</label>
            <input
              type="text"
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
              className="w-full p-2 text-xs font-bold rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
            />
          </div>

          <div>
            <label className="text-[10px] font-bold uppercase text-gray-400 block mb-1">Edad & Sexo</label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(parseInt(e.target.value) || 0)}
                className="w-16 p-2 text-xs font-bold rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-center"
              />
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value as any)}
                className="flex-1 p-2 text-xs font-bold rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
              >
                <option value="F">Mujer</option>
                <option value="M">Hombre</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-[10px] font-bold uppercase text-gray-400 block mb-1">Fecha de Consulta</label>
            <input
              type="date"
              value={consultDate}
              onChange={(e) => setConsultDate(e.target.value)}
              className="w-full p-2 text-xs font-bold rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
            />
          </div>

          <div className="md:col-span-4">
            <label className="text-[10px] font-bold uppercase text-gray-400 block mb-1">Motivo de Consulta Nutricional</label>
            <input
              type="text"
              value={consultReason}
              onChange={(e) => setConsultReason(e.target.value)}
              className="w-full p-2 text-xs rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
            />
          </div>
        </div>
      </div>

      {/* 3. TÓXICOS, ESTRÉS, GASTROINTESTINAL Y TCA */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Hábitos, Tóxicos y Estrés */}
        <div className="bg-white dark:bg-[#141526] p-5 rounded-2xl border border-gray-100 dark:border-[#262840] shadow-xs space-y-4">
          <h3 className="font-extrabold text-sm text-gray-900 dark:text-gray-100 flex items-center gap-2">
            <Brain className="w-4 h-4 text-purple-500" />
            <span>2. Tóxicos, Estrés y Síntomas</span>
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <label className={`p-2 rounded-xl border text-xs font-bold cursor-pointer transition-all flex items-center justify-between ${
              tobacco ? 'bg-rose-50 border-rose-300 text-rose-700 dark:bg-rose-950/40' : 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-500'
            }`}>
              <span>🚬 Tabaco</span>
              <input type="checkbox" checked={tobacco} onChange={(e) => setTobacco(e.target.checked)} className="rounded" />
            </label>

            <label className={`p-2 rounded-xl border text-xs font-bold cursor-pointer transition-all flex items-center justify-between ${
              vape ? 'bg-rose-50 border-rose-300 text-rose-700 dark:bg-rose-950/40' : 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-500'
            }`}>
              <span>💨 Vapeador</span>
              <input type="checkbox" checked={vape} onChange={(e) => setVape(e.target.checked)} className="rounded" />
            </label>

            <label className={`p-2 rounded-xl border text-xs font-bold cursor-pointer transition-all flex items-center justify-between ${
              alcohol ? 'bg-amber-50 border-amber-300 text-amber-700 dark:bg-amber-950/40' : 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-500'
            }`}>
              <span>🍷 Alcohol</span>
              <input type="checkbox" checked={alcohol} onChange={(e) => setAlcohol(e.target.checked)} className="rounded" />
            </label>

            <label className={`p-2 rounded-xl border text-xs font-bold cursor-pointer transition-all flex items-center justify-between ${
              drugs ? 'bg-rose-50 border-rose-300 text-rose-700 dark:bg-rose-950/40' : 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-500'
            }`}>
              <span>⚠️ Drogas</span>
              <input type="checkbox" checked={drugs} onChange={(e) => setDrugs(e.target.checked)} className="rounded" />
            </label>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <div>
              <label className="text-[10px] font-bold uppercase text-gray-400 block mb-1">Nivel de Estrés</label>
              <select
                value={stressLevel}
                onChange={(e) => setStressLevel(e.target.value as any)}
                className="w-full p-2 text-xs font-bold rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
              >
                <option value="Bajo">Bajo</option>
                <option value="Moderado">Moderado</option>
                <option value="Alto">Alto</option>
                <option value="Muy Alto">Muy Alto</option>
              </select>
            </div>

            <div className="flex items-center gap-3 pt-5">
              <label className="flex items-center gap-1.5 text-xs cursor-pointer">
                <input type="checkbox" checked={headache} onChange={(e) => setHeadache(e.target.checked)} className="rounded text-purple-600" />
                <span className="font-semibold text-gray-700 dark:text-gray-300">Dolor de Cabeza</span>
              </label>
              <label className="flex items-center gap-1.5 text-xs cursor-pointer">
                <input type="checkbox" checked={migraine} onChange={(e) => setMigraine(e.target.checked)} className="rounded text-purple-600" />
                <span className="font-semibold text-gray-700 dark:text-gray-300">Migraña</span>
              </label>
            </div>
          </div>

          {/* Problemas Gastrointestinales */}
          <div className="pt-3 border-t border-gray-100 dark:border-gray-800">
            <label className="text-[10px] font-bold uppercase text-gray-400 block mb-2">Síntomas Gastrointestinales</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
              {Object.entries(giIssues).map(([key, val]) => (
                <label key={key} className="flex items-center gap-1.5 cursor-pointer capitalize">
                  <input
                    type="checkbox"
                    checked={val}
                    onChange={(e) => setGiIssues(prev => ({ ...prev, [key]: e.target.checked }))}
                    className="rounded text-indigo-600"
                  />
                  <span className="text-gray-700 dark:text-gray-300">{key}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Medicación, Suplementos e Intolerancias */}
        <div className="bg-white dark:bg-[#141526] p-5 rounded-2xl border border-gray-100 dark:border-[#262840] shadow-xs space-y-4">
          <h3 className="font-extrabold text-sm text-gray-900 dark:text-gray-100 flex items-center gap-2">
            <Pill className="w-4 h-4 text-emerald-500" />
            <span>3. Medicación, Suplementos & Alergias</span>
          </h3>

          <div>
            <label className="text-[10px] font-bold uppercase text-gray-400 block mb-1">Medicación Actual Prescrita</label>
            <input
              type="text"
              value={currentMedication}
              onChange={(e) => setCurrentMedication(e.target.value)}
              className="w-full p-2 text-xs rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
            />
          </div>

          {/* Lista de Suplementos */}
          <div>
            <label className="text-[10px] font-bold uppercase text-gray-400 block mb-1">Suplementos Nutricionales</label>
            <div className="space-y-1.5 mb-2">
              {supplements.map((s, idx) => (
                <div key={idx} className="flex items-center justify-between p-2 rounded-xl bg-gray-50 dark:bg-gray-800/80 text-xs">
                  <div>
                    <span className="font-bold text-gray-900 dark:text-gray-100">{s.type}</span>
                    <span className="text-gray-400 ml-2">({s.dose}) — {s.reason}</span>
                  </div>
                  <button onClick={() => handleRemoveSupplement(idx)} className="text-red-500 hover:text-red-700 text-xs font-bold">×</button>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-2">
              <input
                type="text"
                placeholder="Tipo suplemento..."
                value={newSuppType}
                onChange={(e) => setNewSuppType(e.target.value)}
                className="p-1.5 text-xs rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
              />
              <input
                type="text"
                placeholder="Dosis..."
                value={newSuppDose}
                onChange={(e) => setNewSuppDose(e.target.value)}
                className="p-1.5 text-xs rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
              />
              <button
                type="button"
                onClick={handleAddSupplement}
                className="p-1.5 text-xs font-bold rounded-lg bg-emerald-600 text-white hover:bg-emerald-700"
              >
                + Añadir
              </button>
            </div>
          </div>

          {/* Alergias e Intolerancias */}
          <div className="pt-3 border-t border-gray-100 dark:border-gray-800">
            <label className="text-[10px] font-bold uppercase text-gray-400 block mb-2">Intolerancias y Alergias Alimentarias</label>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={intolerances.lactosa} onChange={(e) => setIntolerances(prev => ({ ...prev, lactosa: e.target.checked }))} className="rounded text-emerald-600" />
                <span>Intolerancia a la Lactosa</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={intolerances.gluten} onChange={(e) => setIntolerances(prev => ({ ...prev, gluten: e.target.checked }))} className="rounded text-emerald-600" />
                <span>Intolerancia al Gluten / Celíaco</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={intolerances.frutosSecos} onChange={(e) => setIntolerances(prev => ({ ...prev, frutosSecos: e.target.checked }))} className="rounded text-emerald-600" />
                <span>Alergia a Frutos Secos</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={intolerances.mariscos} onChange={(e) => setIntolerances(prev => ({ ...prev, mariscos: e.target.checked }))} className="rounded text-emerald-600" />
                <span>Alergia a Mariscos</span>
              </label>
            </div>
          </div>
        </div>

      </div>

      {/* 4. EXAMEN FÍSICO ORIENTADO A CARENCIAS NUTRICIONALES (10 ZONAS ANATÓMICAS) */}
      <div className="bg-white dark:bg-[#141526] p-5 rounded-2xl border border-gray-100 dark:border-[#262840] shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-extrabold text-sm text-gray-900 dark:text-gray-100 flex items-center gap-2">
              <Eye className="w-4 h-4 text-amber-500" />
              <span>4. Examen Físico Nutricional (Signos Carenciales Clínicos)</span>
            </h3>
            <p className="text-xs text-gray-400 mt-0.5">
              Evaluación semiológica de 10 zonas anatómicas para detectar deficiencias de micronutrientes y proteínas.
            </p>
          </div>
          <span className="text-[10px] font-bold px-2 py-1 rounded-md bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300">
            Semiología Clínica
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 text-xs">
          {Object.entries(physicalExam).map(([zone, text]) => (
            <div key={zone} className="p-3 rounded-xl bg-gray-50 dark:bg-[#191b31] border border-gray-100 dark:border-[#262840]">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-indigo-500 dark:text-indigo-400 block mb-1">
                {zone}
              </span>
              <textarea
                rows={2}
                value={text}
                onChange={(e) => setPhysicalExam(prev => ({ ...prev, [zone]: e.target.value }))}
                className="w-full text-[11px] bg-transparent border-0 resize-none focus:outline-none text-gray-800 dark:text-gray-200"
              />
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
