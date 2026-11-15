'use client';

import React, { useState } from 'react';
import { initialApaReferences } from '@/lib/data/nutritionData';
import { ApaReference } from '@/lib/types';
import { 
  BookmarkCheck, 
  Copy, 
  Check, 
  Plus, 
  BookOpen, 
  Sparkles,
  ExternalLink
} from 'lucide-react';

export const GeneradorApaView: React.FC = () => {
  const [references, setReferences] = useState<ApaReference[]>(initialApaReferences);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Formulario generador rápido
  const [authors, setAuthors] = useState('Krause, M. V., & Mahan, L. K.');
  const [year, setYear] = useState(2021);
  const [title, setTitle] = useState('Dietoterapia de Krause');
  const [sourceType, setSourceType] = useState<ApaReference['sourceType']>('libro');
  const [publisherOrJournal, setPublisherOrJournal] = useState('Elsevier Health Sciences');
  const [doiOrUrl, setDoiOrUrl] = useState('');

  // Generación reactiva de la cita APA 7
  const generateApa = () => {
    const authorClean = authors.trim();
    const firstAuthorLastName = authorClean.split(',')[0] || authorClean;
    const inText = `(${firstAuthorLastName}, ${year})`;
    
    let full = '';
    if (sourceType === 'libro') {
      full = `${authorClean} (${year}). ${title} (15.ª ed.). ${publisherOrJournal}.`;
    } else if (sourceType === 'articulo') {
      full = `${authorClean} (${year}). ${title}. ${publisherOrJournal}.${doiOrUrl ? ` ${doiOrUrl}` : ''}`;
    } else if (sourceType === 'guia_clinica') {
      full = `${authorClean} (${year}). ${title}. ${publisherOrJournal}.`;
    } else {
      full = `${authorClean} (${year}). ${title} [Tesis de Licenciatura, Universidad Mayor de San Andrés].`;
    }

    return { inText, full };
  };

  const preview = generateApa();

  const handleCopyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSaveReference = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !authors.trim()) return;

    const newRef: ApaReference = {
      id: `apa_${Date.now()}`,
      title: title.trim(),
      authors: authors.trim(),
      year: Number(year) || new Date().getFullYear(),
      sourceType,
      publisherOrJournal: publisherOrJournal.trim(),
      doiOrUrl: doiOrUrl.trim(),
      inTextCitation: preview.inText,
      fullReference: preview.full
    };

    setReferences([newRef, ...references]);
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-200">
      
      {/* Encabezado */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-100 dark:border-gray-800">
        <div>
          <h2 className="text-2xl font-extrabold text-gray-900 dark:text-gray-100 flex items-center gap-2">
            <BookmarkCheck className="w-6 h-6 text-pink-500" />
            Generador de Citas Bibliográficas (APA 7)
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
            Genera al instante citas y referencias con normas APA 7 para tus informes de nutrición, casos clínicos y tesis.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Generador Formulario */}
        <div className="bg-white dark:bg-[#18221f] rounded-3xl p-6 border border-gray-100 dark:border-[#293a34] shadow-xs space-y-4">
          <h3 className="text-base font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-pink-500" />
            Datos de la Fuente Bibliográfica
          </h3>

          <form onSubmit={handleSaveReference} className="space-y-3 text-xs">
            <div>
              <label className="font-semibold text-gray-600 dark:text-gray-300 block mb-1">
                Tipo de Fuente
              </label>
              <select
                value={sourceType}
                onChange={(e) => setSourceType(e.target.value as any)}
                className="w-full bg-gray-50 dark:bg-[#121816] border border-gray-200 dark:border-gray-700 rounded-xl p-2.5"
              >
                <option value="libro">Libro de Texto / Manual</option>
                <option value="articulo">Artículo de Revista Científica (Journal)</option>
                <option value="guia_clinica">Guía de Práctica Clínica / Norma Oficial (MSyD, OMS)</option>
                <option value="tesis">Tesis de Grado</option>
              </select>
            </div>

            <div>
              <label className="font-semibold text-gray-600 dark:text-gray-300 block mb-1">
                Autor(es) (Apellido, Inicial. & Apellido, Inicial.)
              </label>
              <input
                type="text"
                required
                value={authors}
                onChange={(e) => setAuthors(e.target.value)}
                placeholder="ej: Mahan, L. K., & Raymond, J. L."
                className="w-full bg-gray-50 dark:bg-[#121816] border border-gray-200 dark:border-gray-700 rounded-xl p-2.5"
              />
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div className="col-span-1">
                <label className="font-semibold text-gray-600 dark:text-gray-300 block mb-1">Año</label>
                <input
                  type="number"
                  required
                  value={year}
                  onChange={(e) => setYear(parseInt(e.target.value) || 2024)}
                  className="w-full bg-gray-50 dark:bg-[#121816] border border-gray-200 dark:border-gray-700 rounded-xl p-2.5"
                />
              </div>
              <div className="col-span-2">
                <label className="font-semibold text-gray-600 dark:text-gray-300 block mb-1">Editorial / Revista</label>
                <input
                  type="text"
                  required
                  value={publisherOrJournal}
                  onChange={(e) => setPublisherOrJournal(e.target.value)}
                  placeholder="ej: Elsevier / INLASA / Am J Clin Nutr"
                  className="w-full bg-gray-50 dark:bg-[#121816] border border-gray-200 dark:border-gray-700 rounded-xl p-2.5"
                />
              </div>
            </div>

            <div>
              <label className="font-semibold text-gray-600 dark:text-gray-300 block mb-1">
                Título de la Obra o Artículo
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="ej: Dietoterapia de Krause / Tabla de Composición de Alimentos"
                className="w-full bg-gray-50 dark:bg-[#121816] border border-gray-200 dark:border-gray-700 rounded-xl p-2.5"
              />
            </div>

            <div>
              <label className="font-semibold text-gray-600 dark:text-gray-300 block mb-1">
                DOI o URL (Opcional)
              </label>
              <input
                type="text"
                value={doiOrUrl}
                onChange={(e) => setDoiOrUrl(e.target.value)}
                placeholder="ej: https://doi.org/10.1016/..."
                className="w-full bg-gray-50 dark:bg-[#121816] border border-gray-200 dark:border-gray-700 rounded-xl p-2.5"
              />
            </div>

            {/* Vista Previa en Vivo */}
            <div className="p-4 rounded-2xl bg-pink-50/60 dark:bg-pink-950/20 border border-pink-200 dark:border-pink-800 space-y-2 mt-4">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-pink-600 block">
                Resultado APA 7ma Edición:
              </span>

              <div className="flex items-center justify-between text-xs">
                <span>Cita en el texto: <strong className="text-gray-900 dark:text-gray-100">{preview.inText}</strong></span>
                <button
                  type="button"
                  onClick={() => handleCopyText(preview.inText, 'preview_intext')}
                  className="text-pink-600 hover:text-pink-700 font-bold flex items-center gap-1 text-[11px]"
                >
                  {copiedId === 'preview_intext' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>Copiar</span>
                </button>
              </div>

              <div className="pt-2 border-t border-pink-200/60 text-xs">
                <div className="text-gray-800 dark:text-gray-200 italic mb-2 leading-relaxed">
                  {preview.full}
                </div>
                <button
                  type="button"
                  onClick={() => handleCopyText(preview.full, 'preview_full')}
                  className="text-pink-600 hover:text-pink-700 font-bold flex items-center gap-1 text-[11px]"
                >
                  {copiedId === 'preview_full' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>Copiar Referencia Completa</span>
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-2xl bg-pink-500 text-white font-bold text-xs shadow-md shadow-pink-500/20 hover:bg-pink-600 transition-colors"
            >
              Guardar en mi Biblioteca de Citas
            </button>
          </form>
        </div>

        {/* Biblioteca de Referencias Guardadas */}
        <div className="space-y-4">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block px-1">
            Biblioteca de Referencias de Marivel ({references.length})
          </span>

          <div className="space-y-3">
            {references.map((r) => (
              <div
                key={r.id}
                className="bg-white dark:bg-[#18221f] rounded-3xl p-5 border border-gray-100 dark:border-[#293a34] shadow-xs space-y-3"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 uppercase">
                    {r.sourceType}
                  </span>
                  <span className="text-xs font-bold text-pink-600 dark:text-pink-400">
                    {r.inTextCitation}
                  </span>
                </div>

                <p className="text-xs text-gray-800 dark:text-gray-200 leading-relaxed font-serif">
                  {r.fullReference}
                </p>

                <div className="flex items-center justify-between pt-2 border-t border-gray-50 dark:border-gray-800 text-xs">
                  <button
                    onClick={() => handleCopyText(r.inTextCitation, `intext_${r.id}`)}
                    className="text-gray-500 hover:text-pink-600 font-medium flex items-center gap-1"
                  >
                    {copiedId === `intext_${r.id}` ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>Cita en texto</span>
                  </button>

                  <button
                    onClick={() => handleCopyText(r.fullReference, `full_${r.id}`)}
                    className="text-pink-600 dark:text-pink-400 hover:underline font-bold flex items-center gap-1"
                  >
                    {copiedId === `full_${r.id}` ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>Copiar Referencia</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
