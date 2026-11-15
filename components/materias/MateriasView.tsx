'use client';

import React, { useState } from 'react';
import { useNutriStore } from '@/lib/store/useNutriStore';
import { Subject } from '@/lib/types';
import { 
  BookOpen, 
  Calculator, 
  User, 
  Clock, 
  MapPin, 
  Award, 
  Target, 
  Plus, 
  X, 
  Sparkles,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';

export const MateriasView: React.FC = () => {
  const { subjects, addSubject, updateSubject, deleteSubject } = useNutriStore();

  // Estados de modales
  const [selectedSubjectForCalc, setSelectedSubjectForCalc] = useState<Subject | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Estados de la calculadora de notas
  const [p1, setP1] = useState<number>(75);
  const [p2, setP2] = useState<number>(70);
  const [practicas, setPracticas] = useState<number>(85);
  const [weightP1, setWeightP1] = useState<number>(25);
  const [weightP2, setWeightP2] = useState<number>(25);
  const [weightPracticas, setWeightPracticas] = useState<number>(25);
  const [weightFinal, setWeightFinal] = useState<number>(25);
  const [targetGoal, setTargetGoal] = useState<number>(80);

  // Formulario de nueva materia
  const [newName, setNewName] = useState('');
  const [newCode, setNewCode] = useState('');
  const [newTeacher, setNewTeacher] = useState('');
  const [newClassroom, setNewClassroom] = useState('');
  const [newCredits, setNewCredits] = useState(5);
  const [newTargetGrade, setNewTargetGrade] = useState(85);
  const [newColor, setNewColor] = useState('#1e5e4b');

  const openCalculator = (subject: Subject) => {
    setSelectedSubjectForCalc(subject);
    setTargetGoal(subject.targetGrade || 80);
    // Prellenar con aproximados basados en la nota actual
    setP1(subject.currentGrade);
    setP2(subject.currentGrade - 4);
    setPracticas(Math.min(100, subject.currentGrade + 8));
  };

  // Cálculo matemático de nota necesaria
  // Nota final esperada = (P1*w1 + P2*w2 + Practicas*wPracticas + Final*wFinal) / 100
  const accumulatedPoints = (p1 * weightP1 + p2 * weightP2 + practicas * weightPracticas) / 100;
  
  // Para aprobar con 51:
  // 51 = accumulatedPoints + Final*(wFinal/100) => Final = (51 - accumulatedPoints) / (wFinal/100)
  const requiredForPassing = Math.max(0, Math.ceil((51 - accumulatedPoints) / (weightFinal / 100)));
  const requiredForTarget = Math.max(0, Math.ceil((targetGoal - accumulatedPoints) / (weightFinal / 100)));

  const handleCreateSubject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName) return;
    addSubject({
      name: newName,
      code: newCode || 'NUT-GEN',
      teacherName: newTeacher || 'Docente titular',
      teacherEmail: '',
      classroom: newClassroom || 'Aula asignada',
      credits: Number(newCredits),
      currentGrade: 75,
      targetGrade: Number(newTargetGrade),
      minPassingGrade: 51,
      colorHex: newColor,
      semester: 6,
      status: 'in_progress',
      schedule: [
        { day: 'Lunes', startTime: '08:00', endTime: '10:00', classroom: newClassroom || 'Aula 1' }
      ]
    });
    setIsAddModalOpen(false);
    setNewName('');
    setNewCode('');
    setNewTeacher('');
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-200">
      {/* Encabezado */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#e2ddd3] dark:border-[#293a34]">
        <div>
          <h2 className="text-2xl font-extrabold text-gray-900 dark:text-gray-100 flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-[#1e5e4b]" />
            Materias del Semestre
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
            Gestión académica, horarios, créditos y calculadora de notas para aprobar.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#1e5e4b] hover:bg-[#184a3b] text-white text-xs sm:text-sm font-bold shadow-md shadow-[#1e5e4b]/20 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Agregar Materia
        </button>
      </div>

      {/* Grid de Materias */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {subjects.map(subject => {
          const isPassing = subject.currentGrade >= subject.minPassingGrade;
          const progressPercent = Math.min(100, Math.round((subject.currentGrade / subject.targetGrade) * 100));

          return (
            <div
              key={subject.id}
              className="rounded-2xl bg-white dark:bg-[#18221f] border border-[#e2ddd3] dark:border-[#293a34] p-5 shadow-xs hover:shadow-md transition-shadow relative overflow-hidden flex flex-col justify-between"
            >
              {/* Barra superior de color de la materia */}
              <div 
                className="absolute top-0 left-0 right-0 h-2" 
                style={{ backgroundColor: subject.colorHex }}
              />

              <div>
                <div className="flex items-start justify-between gap-2 mt-1">
                  <div>
                    <span className="text-[11px] font-mono font-bold text-gray-400 uppercase">
                      {subject.code} • {subject.credits} Créditos
                    </span>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mt-0.5 leading-snug">
                      {subject.name}
                    </h3>
                  </div>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-md ${
                    isPassing ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/80 dark:text-emerald-300' : 'bg-red-50 text-red-700'
                  }`}>
                    {subject.currentGrade} / 100
                  </span>
                </div>

                {/* Docente y Aula */}
                <div className="mt-3 space-y-1.5 text-xs text-gray-600 dark:text-gray-300">
                  <div className="flex items-center gap-2">
                    <User className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                    <span className="truncate">{subject.teacherName}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                    <span>{subject.classroom}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                    <span>
                      {subject.schedule.map(s => `${s.day} ${s.startTime}-${s.endTime}`).join(' | ')}
                    </span>
                  </div>
                </div>

                {/* Barra de Meta */}
                <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-800">
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="text-gray-400 font-medium">Meta: {subject.targetGrade} pts</span>
                    <span className="font-bold text-[#1e5e4b] dark:text-[#82c4ae]">{progressPercent}% alcanzado</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden">
                    <div 
                      className="h-full rounded-full transition-all duration-500"
                      style={{ 
                        width: `${progressPercent}%`,
                        backgroundColor: subject.colorHex 
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Botón de Calculadora de Nota */}
              <div className="mt-5 pt-3 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
                <span className="text-[11px] text-gray-400">
                  Aprobación: {subject.minPassingGrade} pts
                </span>
                <button
                  onClick={() => openCalculator(subject)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#f0ebe1] dark:bg-[#1e2b26] hover:bg-[#e2ddd3] dark:hover:bg-[#293a34] text-xs font-bold text-[#1e5e4b] dark:text-[#82c4ae] transition-colors cursor-pointer"
                >
                  <Calculator className="w-3.5 h-3.5" />
                  Calcular Examen Final
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal: Calculadora de Nota Necesaria para Aprobar */}
      {selectedSubjectForCalc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="w-full max-w-lg bg-white dark:bg-[#18221f] rounded-3xl shadow-2xl border border-[#e2ddd3] dark:border-[#293a34] p-6 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-start justify-between pb-3 border-b border-gray-100 dark:border-gray-800">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-[#1e5e4b]/10 text-[#1e5e4b] dark:text-[#82c4ae]">
                  <Calculator className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-gray-900 dark:text-gray-100">
                    Calculadora de Nota de Aprobación
                  </h3>
                  <p className="text-xs text-gray-400">
                    {selectedSubjectForCalc.name} ({selectedSubjectForCalc.code})
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedSubjectForCalc(null)}
                className="p-1 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Inputs de Notas y Ponderaciones */}
            <div className="mt-4 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    1er Parcial (pts / 100)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={p1}
                    onChange={(e) => setP1(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-[#121816] border border-gray-200 dark:border-gray-700 text-sm font-semibold text-gray-900 dark:text-gray-100"
                  />
                  <span className="text-[10px] text-gray-400">Peso: {weightP1}%</span>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    2do Parcial (pts / 100)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={p2}
                    onChange={(e) => setP2(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-[#121816] border border-gray-200 dark:border-gray-700 text-sm font-semibold text-gray-900 dark:text-gray-100"
                  />
                  <span className="text-[10px] text-gray-400">Peso: {weightP2}%</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    Prácticas / Casos (pts / 100)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={practicas}
                    onChange={(e) => setPracticas(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-[#121816] border border-gray-200 dark:border-gray-700 text-sm font-semibold text-gray-900 dark:text-gray-100"
                  />
                  <span className="text-[10px] text-gray-400">Peso: {weightPracticas}%</span>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    Meta Objetivo (pts)
                  </label>
                  <input
                    type="number"
                    min="51"
                    max="100"
                    value={targetGoal}
                    onChange={(e) => setTargetGoal(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-[#121816] border border-gray-200 dark:border-gray-700 text-sm font-semibold text-[#1e5e4b] dark:text-[#82c4ae]"
                  />
                  <span className="text-[10px] text-gray-400">Examen Final: {weightFinal}%</span>
                </div>
              </div>

              {/* Resultado del Diagnóstico */}
              <div className="p-4 rounded-2xl bg-[#f0ebe1] dark:bg-[#1e2b26] border border-[#e2ddd3] dark:border-[#293a34] space-y-3">
                <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-300">
                  <span>Puntos acumulados hasta hoy:</span>
                  <span className="font-extrabold text-sm text-gray-900 dark:text-gray-100">
                    {accumulatedPoints.toFixed(1)} / 75 pts
                  </span>
                </div>

                {/* Nota para Aprobar (51) */}
                <div className="p-3 rounded-xl bg-white dark:bg-[#121816] border border-gray-100 dark:border-gray-800 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-gray-500 font-medium block">Para aprobar con 51 pts:</span>
                    <span className="text-[11px] text-gray-400">Nota mínima necesaria en el Final</span>
                  </div>
                  <div className="text-right">
                    <span className={`text-xl font-extrabold ${requiredForPassing <= 51 ? 'text-emerald-600' : 'text-amber-600'}`}>
                      {requiredForPassing <= 0 ? '¡Ya Aprobado!' : `${requiredForPassing} pts`}
                    </span>
                  </div>
                </div>

                {/* Nota para Meta Objetivo */}
                <div className="p-3 rounded-xl bg-white dark:bg-[#121816] border border-gray-100 dark:border-gray-800 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-gray-500 font-medium block">Para alcanzar tu meta ({targetGoal} pts):</span>
                    <span className="text-[11px] text-gray-400">Objetivo de excelencia</span>
                  </div>
                  <div className="text-right">
                    <span className={`text-xl font-extrabold ${requiredForTarget > 100 ? 'text-red-500' : 'text-[#1e5e4b] dark:text-[#82c4ae]'}`}>
                      {requiredForTarget > 100 ? 'Inalcanzable (>100)' : `${requiredForTarget} pts`}
                    </span>
                  </div>
                </div>

                {/* Alerta de Consejo */}
                <div className="flex items-start gap-2 text-xs text-gray-600 dark:text-gray-300 pt-1">
                  <Sparkles className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    {requiredForPassing === 0
                      ? '¡Felicidades Marivel! Con tus notas actuales ya superaste los 51 puntos necesarios para aprobar esta materia.'
                      : `Necesitas un examen de ${requiredForPassing} puntos o más para asegurar tu aprobación en el semestre.`}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-5 flex justify-end">
              <button
                onClick={() => setSelectedSubjectForCalc(null)}
                className="px-4 py-2 rounded-xl bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs font-bold hover:bg-gray-300 transition-colors"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Agregar Nueva Materia */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <form 
            onSubmit={handleCreateSubject}
            className="w-full max-w-md bg-white dark:bg-[#18221f] rounded-3xl shadow-2xl border border-[#e2ddd3] dark:border-[#293a34] p-6 animate-in fade-in zoom-in-95 duration-150 space-y-4"
          >
            <div className="flex items-center justify-between pb-2 border-b border-gray-100 dark:border-gray-800">
              <h3 className="font-bold text-base text-gray-900 dark:text-gray-100">
                Nueva Materia
              </h3>
              <button 
                type="button" 
                onClick={() => setIsAddModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">Nombre de la Asignatura</label>
              <input
                type="text"
                required
                placeholder="Ej. Farmacología y Nutrición"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-[#121816] border border-gray-200 dark:border-gray-700 text-xs font-medium text-gray-900 dark:text-gray-100"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">Código</label>
                <input
                  type="text"
                  placeholder="NUT-507"
                  value={newCode}
                  onChange={(e) => setNewCode(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-[#121816] border border-gray-200 dark:border-gray-700 text-xs font-medium"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">Créditos</label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={newCredits}
                  onChange={(e) => setNewCredits(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-[#121816] border border-gray-200 dark:border-gray-700 text-xs font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">Docente</label>
              <input
                type="text"
                placeholder="Nombre y título del docente"
                value={newTeacher}
                onChange={(e) => setNewTeacher(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-[#121816] border border-gray-200 dark:border-gray-700 text-xs font-medium"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">Aula / Laboratorio</label>
                <input
                  type="text"
                  placeholder="Aula 204"
                  value={newClassroom}
                  onChange={(e) => setNewClassroom(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-[#121816] border border-gray-200 dark:border-gray-700 text-xs font-medium"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">Color Distintivo</label>
                <input
                  type="color"
                  value={newColor}
                  onChange={(e) => setNewColor(e.target.value)}
                  className="w-full h-9 rounded-xl cursor-pointer"
                />
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-gray-500 hover:bg-gray-100"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-[#1e5e4b] text-white text-xs font-bold hover:bg-[#184a3b]"
              >
                Guardar Materia
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
