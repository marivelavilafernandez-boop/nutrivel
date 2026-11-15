'use client';

import React, { useState, useEffect } from 'react';
import { PatientRecord, PatientAnthropometricControl } from '@/lib/types';
import { 
  Users, 
  UserPlus, 
  Calendar, 
  TrendingUp, 
  TrendingDown, 
  Printer, 
  Camera, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle,
  Clock,
  Phone,
  Baby,
  Scale,
  Save,
  Trash2,
  Plus
} from 'lucide-react';

const initialPatients: PatientRecord[] = [
  {
    id: 'px_1',
    fullName: 'Mariana Quispe Mamani',
    registerDate: '2024-11-04',
    birthDate: '2000-05-14',
    age: 24,
    gender: 'F',
    isPregnant: false,
    pregnancyWeek: 0,
    isLactating: false,
    maritalStatus: 'Soltera',
    childrenCount: 0,
    occupation: 'Estudiante Universitaria',
    hobby: 'Natación y lectura',
    phone: '+591 71542389',
    address: 'Av. 6 de Agosto, La Paz, Bolivia',
    consultReason: 'Mejora de composición corporal y aumento de masa muscular',
    objective: 'SUBIR',
    adjustmentPercent: 0.15,
    observations: 'Metabolismo acelerado. Dificultad para cubrir requerimiento calórico por horarios académicos.',
    controls: [
      { date: '2024-11-04', weightKg: 50.0, heightCm: 150, imc: 22.2, classification: 'NORMAL', waistCm: 68, hipCm: 92, bodyFatPercent: 21.5, notes: 'Evaluación inicial' },
      { date: '2024-11-18', weightKg: 50.8, heightCm: 150, imc: 22.6, classification: 'NORMAL', waistCm: 68, hipCm: 92.5, bodyFatPercent: 21.2, notes: 'Aumento de 800g con adecuada adherencia a la minuta' },
      { date: '2024-12-02', weightKg: 51.5, heightCm: 150, imc: 22.9, classification: 'NORMAL', waistCm: 68.5, hipCm: 93, bodyFatPercent: 21.0, notes: 'Progreso excelente en fuerza y energía' }
    ],
    photos: []
  },
  {
    id: 'px_2',
    fullName: 'Carlos Andrés Mendoza',
    registerDate: '2024-10-15',
    birthDate: '1995-08-20',
    age: 29,
    gender: 'M',
    isPregnant: false,
    isLactating: false,
    maritalStatus: 'Casado',
    childrenCount: 1,
    occupation: 'Ingeniero de Sistemas',
    hobby: 'Fútbol fin de semana',
    phone: '+591 76209841',
    address: 'Zona Sur, La Paz, Bolivia',
    consultReason: 'Reducción de porcentaje de grasa y esteatosis hepática grado 1',
    objective: 'BAJAR',
    adjustmentPercent: 0.20,
    observations: 'Sedentarismo laboral. Alto consumo de comida rápida y bebidas gaseosas.',
    controls: [
      { date: '2024-10-15', weightKg: 86.5, heightCm: 172, imc: 29.2, classification: 'SOBREPESO', waistCm: 98, hipCm: 104, bodyFatPercent: 27.5, notes: 'Inicio plan hipocalórico' },
      { date: '2024-11-01', weightKg: 84.2, heightCm: 172, imc: 28.5, classification: 'SOBREPESO', waistCm: 95, hipCm: 103, bodyFatPercent: 26.2, notes: 'Pérdida de 2.3 kg en 2 semanas' }
    ],
    photos: []
  }
];

export const RegistroPacientesView: React.FC = () => {
  const [patients, setPatients] = useState<PatientRecord[]>(initialPatients);
  const [selectedPatientId, setSelectedPatientId] = useState<string>(initialPatients[0].id);
  const [isEditing, setIsEditing] = useState(false);
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);

  // Formulario nuevo control
  const [newControlDate, setNewControlDate] = useState(new Date().toISOString().split('T')[0]);
  const [newControlWeight, setNewControlWeight] = useState<number>(50);
  const [newControlWaist, setNewControlWaist] = useState<number>(68);
  const [newControlNotes, setNewControlNotes] = useState('');

  // Formulario nuevo paciente
  const [newName, setNewName] = useState('');
  const [newAge, setNewAge] = useState<number>(22);
  const [newGender, setNewGender] = useState<'F' | 'M'>('F');
  const [newIsPregnant, setNewIsPregnant] = useState(false);
  const [newWeek, setNewWeek] = useState(0);
  const [newIsLactating, setNewIsLactating] = useState(false);
  const [newOccupation, setNewOccupation] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newReason, setNewReason] = useState('');
  const [newObjective, setNewObjective] = useState<'MANTENER' | 'BAJAR' | 'SUBIR'>('MANTENER');
  const [newAdjustment, setNewAdjustment] = useState<number>(0);

  // Carga desde localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('nutrivel_patients');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setPatients(parsed);
          setSelectedPatientId(parsed[0].id);
        }
      }
    } catch {}
  }, []);

  const saveToLocalStorage = (updated: PatientRecord[]) => {
    try {
      localStorage.setItem('nutrivel_patients', JSON.stringify(updated));
    } catch {}
  };

  const selectedPatient = patients.find(p => p.id === selectedPatientId) || patients[0];

  // Agregar nuevo control antropométrico
  const handleAddControl = () => {
    if (!selectedPatient) return;
    const heightM = (selectedPatient.controls[0]?.heightCm || 150) / 100;
    const imc = parseFloat((newControlWeight / (heightM * heightM)).toFixed(1));
    let classification = 'NORMAL';
    if (imc < 18.5) classification = 'BAJO PESO';
    else if (imc >= 25 && imc < 30) classification = 'SOBREPESO';
    else if (imc >= 30 && imc < 35) classification = 'OBESIDAD I';
    else if (imc >= 35) classification = 'OBESIDAD II';

    const newControl: PatientAnthropometricControl = {
      date: newControlDate,
      weightKg: newControlWeight,
      heightCm: selectedPatient.controls[0]?.heightCm || 150,
      imc,
      classification,
      waistCm: newControlWaist,
      notes: newControlNotes
    };

    const updated = patients.map(p => {
      if (p.id !== selectedPatient.id) return p;
      return {
        ...p,
        controls: [...p.controls, newControl]
      };
    });

    setPatients(updated);
    saveToLocalStorage(updated);
    setNewControlNotes('');
  };

  // Crear nuevo paciente
  const handleCreatePatient = () => {
    if (!newName.trim()) return;

    const newPatient: PatientRecord = {
      id: `px_${Date.now()}`,
      fullName: newName.trim(),
      registerDate: new Date().toISOString().split('T')[0],
      age: newAge,
      gender: newGender,
      isPregnant: newIsPregnant,
      pregnancyWeek: newWeek,
      isLactating: newIsLactating,
      occupation: newOccupation,
      phone: newPhone,
      consultReason: newReason,
      objective: newObjective,
      adjustmentPercent: newAdjustment,
      observations: '',
      controls: [
        {
          date: new Date().toISOString().split('T')[0],
          weightKg: 55,
          heightCm: 160,
          imc: 21.5,
          classification: 'NORMAL',
          notes: 'Consulta inicial'
        }
      ],
      photos: []
    };

    const updated = [newPatient, ...patients];
    setPatients(updated);
    saveToLocalStorage(updated);
    setSelectedPatientId(newPatient.id);
    setIsNewModalOpen(false);

    // Reset
    setNewName('');
    setNewReason('');
  };

  const initialWeight = selectedPatient.controls[0]?.weightKg || 0;
  const latestWeight = selectedPatient.controls[selectedPatient.controls.length - 1]?.weightKg || 0;
  const weightDiff = parseFloat((latestWeight - initialWeight).toFixed(1));

  return (
    <div className="space-y-6 pb-16 animate-in fade-in duration-200">
      
      {/* 1. ENCABEZADO */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-100 dark:border-gray-800">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-100 text-teal-800 dark:bg-teal-950/60 dark:text-teal-300 text-xs font-bold mb-2">
            <Users className="w-3.5 h-3.5" />
            <span>Módulo Clínico • Hojas REGISTRO DE PX y SEGUIMIENTO</span>
          </div>
          <h2 className="text-2xl font-extrabold text-gray-900 dark:text-gray-100 tracking-tight">
            Expediente de Pacientes & Seguimiento Evolutivo
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
            Ficha de registro individual, evolución de peso/IMC en 5 fechas de control y registro fotográfico.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsNewModalOpen(true)}
            className="px-3.5 py-2 rounded-2xl bg-gradient-to-r from-teal-600 to-emerald-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-emerald-500/20 hover:opacity-95 cursor-pointer"
          >
            <UserPlus className="w-4 h-4" />
            <span>+ Nuevo Paciente</span>
          </button>
          <button
            onClick={() => window.print()}
            className="px-3.5 py-2 text-xs font-bold rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 flex items-center gap-1.5 cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Imprimir Expediente</span>
          </button>
        </div>
      </div>

      {/* 2. SELECTOR DE PACIENTES */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {patients.map(p => (
          <button
            key={p.id}
            onClick={() => setSelectedPatientId(p.id)}
            className={`px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 border ${
              selectedPatientId === p.id
                ? 'bg-teal-600 text-white border-teal-500 shadow-md shadow-teal-500/20'
                : 'bg-white dark:bg-[#141526] text-gray-700 dark:text-gray-300 border-gray-200/80 dark:border-[#262840] hover:border-teal-400'
            }`}
          >
            <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-[10px] font-black">
              {p.fullName.slice(0, 2).toUpperCase()}
            </div>
            <span>{p.fullName}</span>
          </button>
        ))}
      </div>

      {/* 3. FICHA PRINCIPAL DEL PACIENTE SELECCIONADO */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Columna Izquierda: Datos del Registro (Exacto del Excel) */}
        <div className="bg-white dark:bg-[#141526] p-5 rounded-2xl border border-gray-100 dark:border-[#262840] shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-gray-100 dark:border-gray-800">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-teal-600 dark:text-teal-400">
              Datos Personales & Fisiológicos
            </span>
            <span className="text-[10px] font-bold text-gray-400">Reg: {selectedPatient.registerDate}</span>
          </div>

          <div>
            <h3 className="text-lg font-black text-gray-900 dark:text-gray-100">{selectedPatient.fullName}</h3>
            <span className="text-xs text-gray-500">
              {selectedPatient.age} años • Sexo: {selectedPatient.gender === 'F' ? 'Femenino' : 'Masculino'}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-2 rounded-xl bg-gray-50 dark:bg-gray-800/80">
              <span className="text-[9px] font-bold text-gray-400 uppercase block">Objetivo</span>
              <span className="font-extrabold text-teal-600 dark:text-teal-400">{selectedPatient.objective}</span>
              <span className="text-[9px] text-gray-400 block mt-0.5">Ajuste: {selectedPatient.adjustmentPercent * 100}%</span>
            </div>

            <div className="p-2 rounded-xl bg-gray-50 dark:bg-gray-800/80">
              <span className="text-[9px] font-bold text-gray-400 uppercase block">Condición</span>
              <span className="font-extrabold text-gray-800 dark:text-gray-200">
                {selectedPatient.isPregnant ? `Gestante (Sem ${selectedPatient.pregnancyWeek})` :
                 selectedPatient.isLactating ? 'Lactancia Materna' : 'Fisiológico Normal'}
              </span>
            </div>
          </div>

          <div className="space-y-1.5 text-xs text-gray-600 dark:text-gray-400 pt-2 border-t border-gray-100 dark:border-gray-800">
            <p><strong>Ocupación:</strong> {selectedPatient.occupation || 'No especificada'}</p>
            <p><strong>Teléfono:</strong> {selectedPatient.phone || 'No registrado'}</p>
            <p><strong>Dirección:</strong> {selectedPatient.address || 'No registrada'}</p>
            <p><strong>Motivo de Consulta:</strong> {selectedPatient.consultReason}</p>
            {selectedPatient.observations && (
              <p className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/30 text-amber-900 dark:text-amber-200 text-[11px] mt-2">
                <strong>Obs:</strong> {selectedPatient.observations}
              </p>
            )}
          </div>
        </div>

        {/* Columna Derecha: Evolución Antropométrica (5 Fechas de Control) */}
        <div className="lg:col-span-2 space-y-4">
          
          {/* Métricas Rápidas de Evolución */}
          <div className="grid grid-cols-3 gap-3">
            <div className="p-4 rounded-2xl bg-white dark:bg-[#141526] border border-gray-100 dark:border-[#262840] shadow-xs text-center">
              <span className="text-[10px] font-bold uppercase text-gray-400 block">Peso Inicial</span>
              <span className="text-xl font-black text-gray-900 dark:text-gray-100 mt-1 block">{initialWeight} kg</span>
              <span className="text-[10px] text-gray-400">1er Control</span>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-[#141526] border border-gray-100 dark:border-[#262840] shadow-xs text-center">
              <span className="text-[10px] font-bold uppercase text-gray-400 block">Peso Actual</span>
              <span className="text-xl font-black text-teal-600 dark:text-teal-400 mt-1 block">{latestWeight} kg</span>
              <span className="text-[10px] text-gray-400">Último Control</span>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-[#141526] border border-gray-100 dark:border-[#262840] shadow-xs text-center">
              <span className="text-[10px] font-bold uppercase text-gray-400 block">Variación Neta</span>
              <span className={`text-xl font-black mt-1 flex items-center justify-center gap-1 ${
                weightDiff > 0 ? 'text-emerald-600 dark:text-emerald-400' :
                weightDiff < 0 ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500'
              }`}>
                {weightDiff > 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                <span>{weightDiff > 0 ? `+${weightDiff}` : weightDiff} kg</span>
              </span>
              <span className="text-[10px] text-gray-400">{selectedPatient.controls.length} sesiones</span>
            </div>
          </div>

          {/* Tabla de Controles Antropométricos (Exacto Hoja ANTROPOMETRIA) */}
          <div className="bg-white dark:bg-[#141526] rounded-2xl border border-gray-100 dark:border-[#262840] p-4 shadow-xs space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-gray-100 dark:border-gray-800">
              <h4 className="font-extrabold text-xs uppercase tracking-wider text-gray-500">
                Historial de Controles Antropométricos
              </h4>
              <span className="text-[10px] font-bold text-teal-600 dark:text-teal-400">
                {selectedPatient.controls.length} de 5 controles
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs whitespace-nowrap">
                <thead>
                  <tr className="border-b border-gray-100 dark:border-gray-800 text-gray-400 uppercase text-[9px] font-bold">
                    <th className="py-2 px-3">Fecha</th>
                    <th className="py-2 px-3 text-right">Peso (kg)</th>
                    <th className="py-2 px-3 text-right">Talla (m)</th>
                    <th className="py-2 px-3 text-right">IMC</th>
                    <th className="py-2 px-3 text-center">Clasificación</th>
                    <th className="py-2 px-3 text-right">Cintura</th>
                    <th className="py-2 px-3">Notas Clínicas</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-[#202238]">
                  {selectedPatient.controls.map((c, idx) => (
                    <tr key={idx} className="hover:bg-gray-50/50 dark:hover:bg-[#1a1c35]/50">
                      <td className="py-2 px-3 font-semibold text-gray-900 dark:text-gray-100">{c.date}</td>
                      <td className="py-2 px-3 text-right font-black text-teal-600 dark:text-teal-400">{c.weightKg} kg</td>
                      <td className="py-2 px-3 text-right">{(c.heightCm / 100).toFixed(2)} m</td>
                      <td className="py-2 px-3 text-right font-bold text-gray-800 dark:text-gray-200">{c.imc}</td>
                      <td className="py-2 px-3 text-center">
                        <span className={`inline-block px-2 py-0.5 rounded-full text-[9px] font-bold ${
                          c.classification === 'NORMAL' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300' :
                          'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300'
                        }`}>
                          {c.classification}
                        </span>
                      </td>
                      <td className="py-2 px-3 text-right">{c.waistCm ? `${c.waistCm} cm` : '-'}</td>
                      <td className="py-2 px-3 text-gray-500 truncate max-w-[200px]">{c.notes || '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Formulario rápido para añadir nuevo control */}
            <div className="pt-3 border-t border-gray-100 dark:border-gray-800 grid grid-cols-1 sm:grid-cols-4 gap-2">
              <input
                type="date"
                value={newControlDate}
                onChange={(e) => setNewControlDate(e.target.value)}
                className="p-1.5 text-xs rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
              />
              <input
                type="number"
                step="0.1"
                placeholder="Peso en kg..."
                value={newControlWeight}
                onChange={(e) => setNewControlWeight(parseFloat(e.target.value) || 0)}
                className="p-1.5 text-xs rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-center"
              />
              <input
                type="text"
                placeholder="Notas de evolución..."
                value={newControlNotes}
                onChange={(e) => setNewControlNotes(e.target.value)}
                className="p-1.5 text-xs rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 sm:col-span-1"
              />
              <button
                type="button"
                onClick={handleAddControl}
                className="py-1.5 px-3 text-xs font-bold rounded-xl bg-teal-600 text-white hover:bg-teal-700 transition-all flex items-center justify-center gap-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>+ Registrar Cita</span>
              </button>
            </div>
          </div>

          {/* Seguimiento Fotográfico (4 Planos del Excel) */}
          <div className="bg-white dark:bg-[#141526] rounded-2xl border border-gray-100 dark:border-[#262840] p-4 shadow-xs space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-gray-100 dark:border-gray-800">
              <div className="flex items-center gap-2">
                <Camera className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                <h4 className="font-extrabold text-xs uppercase tracking-wider text-gray-900 dark:text-gray-100">
                  Seguimiento Fotográfico Evolutivo (4 Planos Físicos)
                </h4>
              </div>
              <span className="text-[10px] text-gray-400">Hoja FOTOS DEL PX</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
              <div className="p-3 rounded-xl bg-gray-50 dark:bg-[#181a30] border border-dashed border-gray-200 dark:border-gray-700">
                <span className="text-[10px] font-bold text-gray-500 block mb-1">1. Frontal Anterior</span>
                <div className="w-12 h-16 mx-auto bg-gray-200 dark:bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 text-[10px]">
                  Frente
                </div>
                <span className="text-[9px] text-gray-400 block mt-1">4 fechas</span>
              </div>

              <div className="p-3 rounded-xl bg-gray-50 dark:bg-[#181a30] border border-dashed border-gray-200 dark:border-gray-700">
                <span className="text-[10px] font-bold text-gray-500 block mb-1">2. Frontal Posterior</span>
                <div className="w-12 h-16 mx-auto bg-gray-200 dark:bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 text-[10px]">
                  Espalda
                </div>
                <span className="text-[9px] text-gray-400 block mt-1">4 fechas</span>
              </div>

              <div className="p-3 rounded-xl bg-gray-50 dark:bg-[#181a30] border border-dashed border-gray-200 dark:border-gray-700">
                <span className="text-[10px] font-bold text-gray-500 block mb-1">3. Sagital Derecho</span>
                <div className="w-12 h-16 mx-auto bg-gray-200 dark:bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 text-[10px]">
                  Perfil Der
                </div>
                <span className="text-[9px] text-gray-400 block mt-1">4 fechas</span>
              </div>

              <div className="p-3 rounded-xl bg-gray-50 dark:bg-[#181a30] border border-dashed border-gray-200 dark:border-gray-700">
                <span className="text-[10px] font-bold text-gray-500 block mb-1">4. Sagital Izquierdo</span>
                <div className="w-12 h-16 mx-auto bg-gray-200 dark:bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 text-[10px]">
                  Perfil Izq
                </div>
                <span className="text-[9px] text-gray-400 block mt-1">4 fechas</span>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* 4. MODAL CREAR NUEVO PACIENTE */}
      {isNewModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white dark:bg-[#141526] rounded-3xl border border-gray-100 dark:border-[#262840] p-6 max-w-lg w-full shadow-2xl space-y-4">
            
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-gray-800">
              <h3 className="text-base font-extrabold text-gray-900 dark:text-gray-100">
                Nuevo Paciente (Registro de Px)
              </h3>
              <button onClick={() => setIsNewModalOpen(false)} className="text-gray-400 hover:text-gray-600">×</button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-[10px] font-bold uppercase text-gray-400 block mb-1">Nombres y Apellidos *</label>
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="Ej: Ana María Fernández"
                  className="w-full p-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 font-bold"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] font-bold uppercase text-gray-400 block mb-1">Edad (años)</label>
                  <input
                    type="number"
                    value={newAge}
                    onChange={(e) => setNewAge(parseInt(e.target.value) || 0)}
                    className="w-full p-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-center"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase text-gray-400 block mb-1">Sexo Biológico</label>
                  <select
                    value={newGender}
                    onChange={(e) => setNewGender(e.target.value as any)}
                    className="w-full p-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 font-semibold"
                  >
                    <option value="F">Femenino</option>
                    <option value="M">Masculino</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] font-bold uppercase text-gray-400 block mb-1">Objetivo</label>
                  <select
                    value={newObjective}
                    onChange={(e) => setNewObjective(e.target.value as any)}
                    className="w-full p-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 font-semibold"
                  >
                    <option value="MANTENER">Mantener (0%)</option>
                    <option value="BAJAR">Bajar (-20%)</option>
                    <option value="SUBIR">Subir (+15%)</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase text-gray-400 block mb-1">Teléfono / Celular</label>
                  <input
                    type="text"
                    value={newPhone}
                    onChange={(e) => setNewPhone(e.target.value)}
                    placeholder="+591 7..."
                    className="w-full p-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase text-gray-400 block mb-1">Motivo de Consulta</label>
                <input
                  type="text"
                  value={newReason}
                  onChange={(e) => setNewReason(e.target.value)}
                  placeholder="Ej: Control de peso y evaluación de hábitos"
                  className="w-full p-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
                />
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsNewModalOpen(false)}
                className="flex-1 py-2 text-xs font-semibold rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleCreatePatient}
                className="flex-1 py-2 text-xs font-bold rounded-xl bg-teal-600 text-white shadow-md shadow-teal-500/20 hover:bg-teal-700"
              >
                Guardar Paciente
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
