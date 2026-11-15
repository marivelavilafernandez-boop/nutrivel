'use client';

import React, { useState, useMemo } from 'react';
import tbcaDataRaw from '@/lib/data/fullTbcaFoods.json';
import { TbcaFoodItem } from '@/lib/types';
import { 
  Apple, 
  Search, 
  Download, 
  Filter, 
  Sparkles, 
  X, 
  Check, 
  Flame,
  Scale,
  Eye,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown
} from 'lucide-react';

export const TablaAlimentosView: React.FC = () => {
  const allFoods = tbcaDataRaw as TbcaFoodItem[];
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGroup, setSelectedGroup] = useState<string>('todos');
  const [sortBy, setSortBy] = useState<'name' | 'energyKcal' | 'proteinG' | 'ironMg' | 'calciumMg'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 30;

  // Modal para ver los 15 nutrientes de un alimento específico
  const [selectedFood, setSelectedFood] = useState<TbcaFoodItem | null>(null);

  // Lista única de grupos
  const groups = useMemo(() => {
    const set = new Set<string>();
    allFoods.forEach(f => { if (f.group) set.add(f.group); });
    return ['todos', ...Array.from(set).sort()];
  }, [allFoods]);

  // Filtrado y ordenamiento
  const filteredAndSortedFoods = useMemo(() => {
    let result = allFoods.filter(item => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q || 
        item.name.toLowerCase().includes(q) || 
        item.code.toLowerCase().includes(q) ||
        (item.subgroup && item.subgroup.toLowerCase().includes(q));
      
      const matchesGroup = selectedGroup === 'todos' || item.group === selectedGroup;
      return matchesSearch && matchesGroup;
    });

    result.sort((a, b) => {
      let valA: any = a[sortBy];
      let valB: any = b[sortBy];
      if (typeof valA === 'string') {
        return sortOrder === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
      }
      return sortOrder === 'asc' ? valA - valB : valB - valA;
    });

    return result;
  }, [allFoods, searchQuery, selectedGroup, sortBy, sortOrder]);

  // Paginación
  const totalPages = Math.ceil(filteredAndSortedFoods.length / itemsPerPage);
  const paginatedFoods = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredAndSortedFoods.slice(start, start + itemsPerPage);
  }, [filteredAndSortedFoods, currentPage, itemsPerPage]);

  const handleSort = (field: 'name' | 'energyKcal' | 'proteinG' | 'ironMg' | 'calciumMg') => {
    if (sortBy === field) {
      setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder(field === 'name' ? 'asc' : 'desc');
    }
    setCurrentPage(1);
  };

  const handleExportCSV = () => {
    const headers = 'Código,Grupo,Subgrupo,Nombre,Energía(kcal),Humedad(g),Proteína(g),Grasa(g),Carbohidratos(g),Fibra(g),Ceniza(g),Calcio(mg),Fósforo(mg),Hierro(mg),VitA(ug),VitB1(mg),VitB2(mg),VitB3(mg),VitC(mg)\n';
    const rows = filteredAndSortedFoods.map(f => 
      `"${f.code}","${f.group}","${f.subgroup || ''}","${f.name}",${f.energyKcal},${f.moistureG},${f.proteinG},${f.fatG},${f.carbsG},${f.fiberG},${f.ashG},${f.calciumMg},${f.phosphorusMg},${f.ironMg},${f.vitAMcg},${f.thiaminB1Mg},${f.riboflavinB2Mg},${f.niacinB3Mg},${f.vitCMg}`
    ).join('\n');

    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `TBCA_Bolivia_Completa_${filteredAndSortedFoods.length}_alimentos.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-200">
      
      {/* 1. ENCABEZADO */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-100 dark:border-gray-800">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 text-xs font-bold mb-2">
            <Apple className="w-3.5 h-3.5" />
            <span>Base Oficial Completa • {allFoods.length} Alimentos Reales</span>
          </div>
          <h2 className="text-2xl font-extrabold text-gray-900 dark:text-gray-100 flex items-center gap-2">
            Tabla Boliviana de Composición de Alimentos (TBCA)
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
            Valores nutricionales por 100g de porción comestible con 15 analitos (Proteínas, Grasas, Carbohidratos, Calcio, Hierro, Vitaminas).
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExportCSV}
            className="px-3.5 py-2 rounded-2xl bg-white dark:bg-[#18221f] border border-gray-200 dark:border-gray-700 text-xs font-bold text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all flex items-center gap-2 cursor-pointer shadow-2xs"
          >
            <Download className="w-4 h-4 text-emerald-500" />
            <span>Descargar CSV ({filteredAndSortedFoods.length})</span>
          </button>
        </div>
      </div>

      {/* 2. FILTROS Y BÚSQUEDA */}
      <div className="bg-white dark:bg-[#141526] rounded-3xl p-4 border border-gray-100 dark:border-[#262840] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        {/* Buscador */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
            placeholder="Buscar entre los 918 alimentos (ej: 'quinua', 'tarhui', 'charque', 'ispi', 'oca', 'chuño')..."
            className="w-full text-xs sm:text-sm bg-gray-50 dark:bg-[#1a1c32] border border-gray-200 dark:border-[#2b2e4c] rounded-2xl pl-10 pr-4 py-2.5 text-gray-800 dark:text-gray-200 focus:outline-none focus:border-pink-500"
          />
        </div>

        {/* Filtro por Grupo */}
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray-400 shrink-0" />
          <select
            value={selectedGroup}
            onChange={(e) => { setSelectedGroup(e.target.value); setCurrentPage(1); }}
            className="text-xs bg-gray-50 dark:bg-[#1a1c32] border border-gray-200 dark:border-[#2b2e4c] rounded-2xl px-3 py-2 text-gray-700 dark:text-gray-300 font-semibold focus:outline-none"
          >
            {groups.map(g => (
              <option key={g} value={g}>
                {g === 'todos' ? `Todos los grupos (${allFoods.length})` : g}
              </option>
            ))}
          </select>
        </div>

      </div>

      {/* 3. TABLA CON PAGINACIÓN Y DETALLE */}
      <div className="bg-white dark:bg-[#141526] rounded-3xl border border-gray-100 dark:border-[#262840] shadow-xs overflow-hidden">
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-gray-50/80 dark:bg-[#181a30] border-b border-gray-100 dark:border-[#262840] text-gray-500 uppercase tracking-wider font-extrabold text-[10px]">
                <th className="py-3 px-3">Cód.</th>
                <th 
                  className="py-3 px-4 cursor-pointer hover:text-gray-900 dark:hover:text-white"
                  onClick={() => handleSort('name')}
                >
                  <div className="flex items-center gap-1">
                    <span>Alimento</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="py-3 px-3">Grupo</th>
                <th 
                  className="py-3 px-3 text-right cursor-pointer hover:text-gray-900 dark:hover:text-white"
                  onClick={() => handleSort('energyKcal')}
                >
                  <div className="flex items-center justify-end gap-1">
                    <span>Energía (kcal)</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th 
                  className="py-3 px-3 text-right cursor-pointer hover:text-gray-900 dark:hover:text-white"
                  onClick={() => handleSort('proteinG')}
                >
                  <div className="flex items-center justify-end gap-1">
                    <span>Prot (g)</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="py-3 px-3 text-right">Grasa (g)</th>
                <th className="py-3 px-3 text-right">Carbs (g)</th>
                <th 
                  className="py-3 px-3 text-right cursor-pointer hover:text-gray-900 dark:hover:text-white"
                  onClick={() => handleSort('ironMg')}
                >
                  <div className="flex items-center justify-end gap-1">
                    <span>Hierro (mg)</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th 
                  className="py-3 px-3 text-right cursor-pointer hover:text-gray-900 dark:hover:text-white"
                  onClick={() => handleSort('calciumMg')}
                >
                  <div className="flex items-center justify-end gap-1">
                    <span>Calcio (mg)</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="py-3 px-3 text-center">Detalle</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-[#202238]">
              {paginatedFoods.length === 0 ? (
                <tr>
                  <td colSpan={10} className="py-8 text-center text-gray-400 text-xs">
                    No se encontraron alimentos que coincidan con &ldquo;{searchQuery}&rdquo;.
                  </td>
                </tr>
              ) : (
                paginatedFoods.map((item) => (
                  <tr 
                    key={item.id}
                    className="hover:bg-gray-50/60 dark:hover:bg-[#1a1c35]/60 transition-colors"
                  >
                    <td className="py-2.5 px-3 font-mono text-[10px] text-gray-400">
                      #{item.code}
                    </td>
                    <td className="py-2.5 px-4 font-bold text-gray-900 dark:text-gray-100 max-w-[240px] truncate">
                      {item.name}
                    </td>
                    <td className="py-2.5 px-3">
                      <span className="inline-block px-2 py-0.5 rounded-md text-[10px] font-semibold bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 truncate max-w-[150px]">
                        {item.group}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-right font-extrabold text-orange-600 dark:text-orange-400">
                      {item.energyKcal}
                    </td>
                    <td className="py-2.5 px-3 text-right font-extrabold text-rose-600 dark:text-rose-400">
                      {item.proteinG}
                    </td>
                    <td className="py-2.5 px-3 text-right text-blue-600 dark:text-blue-400">
                      {item.fatG}
                    </td>
                    <td className="py-2.5 px-3 text-right text-amber-600 dark:text-amber-400">
                      {item.carbsG}
                    </td>
                    <td className="py-2.5 px-3 text-right font-extrabold text-purple-600 dark:text-purple-400">
                      {item.ironMg}
                    </td>
                    <td className="py-2.5 px-3 text-right text-teal-600 dark:text-teal-400">
                      {item.calciumMg}
                    </td>
                    <td className="py-2.5 px-3 text-center">
                      <button
                        onClick={() => setSelectedFood(item)}
                        className="p-1.5 rounded-lg bg-pink-50 dark:bg-pink-950/40 text-pink-600 dark:text-pink-400 hover:bg-pink-100 transition-all cursor-pointer"
                        title="Ver 15 nutrientes completos"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Barra de Paginación */}
        <div className="p-4 border-t border-gray-100 dark:border-[#262840] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
          <div>
            Mostrando <strong>{paginatedFoods.length}</strong> de <strong>{filteredAndSortedFoods.length}</strong> alimentos (Página {currentPage} de {totalPages || 1})
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1.5 rounded-xl border border-gray-200 dark:border-gray-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-800 flex items-center gap-1"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Anterior</span>
            </button>

            <span className="font-bold px-2 text-gray-900 dark:text-gray-100">
              {currentPage} / {totalPages || 1}
            </span>

            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage >= totalPages}
              className="px-3 py-1.5 rounded-xl border border-gray-200 dark:border-gray-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-800 flex items-center gap-1"
            >
              <span>Siguiente</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>

      {/* 4. MODAL DETALLE DE LOS 15 NUTRIENTES */}
      {selectedFood && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white dark:bg-[#141526] rounded-3xl border border-gray-100 dark:border-[#262840] p-6 max-w-lg w-full shadow-2xl space-y-4">
            
            <div className="flex items-start justify-between pb-3 border-b border-gray-100 dark:border-gray-800">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-pink-500 block">
                  Código #{selectedFood.code} • {selectedFood.group}
                </span>
                <h3 className="text-lg font-extrabold text-gray-900 dark:text-gray-100 mt-0.5">
                  {selectedFood.name}
                </h3>
                <span className="text-xs text-gray-400">Porción: 100g de porción comestible</span>
              </div>
              <button
                onClick={() => setSelectedFood(null)}
                className="p-1.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-500 hover:text-gray-900 dark:hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Macro y Micronutrientes (15 analitos) */}
            <div className="grid grid-cols-3 gap-2.5 text-center text-xs">
              <div className="p-2.5 rounded-xl bg-orange-50 dark:bg-orange-950/30 border border-orange-200/50">
                <span className="text-[10px] text-orange-600 block">Energía</span>
                <span className="text-base font-black text-orange-700 dark:text-orange-300">{selectedFood.energyKcal} kcal</span>
              </div>
              <div className="p-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200/50">
                <span className="text-[10px] text-rose-600 block">Proteína</span>
                <span className="text-base font-black text-rose-700 dark:text-rose-300">{selectedFood.proteinG} g</span>
              </div>
              <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200/50">
                <span className="text-[10px] text-blue-600 block">Grasa</span>
                <span className="text-base font-black text-blue-700 dark:text-blue-300">{selectedFood.fatG} g</span>
              </div>

              <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200/50">
                <span className="text-[10px] text-amber-600 block">Carbohidratos</span>
                <span className="text-base font-black text-amber-700 dark:text-amber-300">{selectedFood.carbsG} g</span>
              </div>
              <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200/50">
                <span className="text-[10px] text-emerald-600 block">Fibra cruda</span>
                <span className="text-base font-black text-emerald-700 dark:text-emerald-300">{selectedFood.fiberG} g</span>
              </div>
              <div className="p-2.5 rounded-xl bg-cyan-50 dark:bg-cyan-950/30 border border-cyan-200/50">
                <span className="text-[10px] text-cyan-600 block">Humedad</span>
                <span className="text-base font-black text-cyan-700 dark:text-cyan-300">{selectedFood.moistureG} g</span>
              </div>

              <div className="p-2.5 rounded-xl bg-purple-50 dark:bg-purple-950/30 border border-purple-200/50">
                <span className="text-[10px] text-purple-600 block">Hierro (Fe)</span>
                <span className="text-base font-black text-purple-700 dark:text-purple-300">{selectedFood.ironMg} mg</span>
              </div>
              <div className="p-2.5 rounded-xl bg-teal-50 dark:bg-teal-950/30 border border-teal-200/50">
                <span className="text-[10px] text-teal-600 block">Calcio (Ca)</span>
                <span className="text-base font-black text-teal-700 dark:text-teal-300">{selectedFood.calciumMg} mg</span>
              </div>
              <div className="p-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200/50">
                <span className="text-[10px] text-indigo-600 block">Fósforo (P)</span>
                <span className="text-base font-black text-indigo-700 dark:text-indigo-300">{selectedFood.phosphorusMg} mg</span>
              </div>

              <div className="p-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                <span className="text-[10px] text-gray-500 block">Vitamina A</span>
                <span className="font-extrabold text-gray-800 dark:text-gray-200">{selectedFood.vitAMcg} ug</span>
              </div>
              <div className="p-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                <span className="text-[10px] text-gray-500 block">Tiamina (B1)</span>
                <span className="font-extrabold text-gray-800 dark:text-gray-200">{selectedFood.thiaminB1Mg} mg</span>
              </div>
              <div className="p-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                <span className="text-[10px] text-gray-500 block">Riboflavina (B2)</span>
                <span className="font-extrabold text-gray-800 dark:text-gray-200">{selectedFood.riboflavinB2Mg} mg</span>
              </div>

              <div className="p-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                <span className="text-[10px] text-gray-500 block">Niacina (B3)</span>
                <span className="font-extrabold text-gray-800 dark:text-gray-200">{selectedFood.niacinB3Mg} mg</span>
              </div>
              <div className="p-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                <span className="text-[10px] text-gray-500 block">Vitamina C</span>
                <span className="font-extrabold text-gray-800 dark:text-gray-200">{selectedFood.vitCMg} mg</span>
              </div>
              <div className="p-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                <span className="text-[10px] text-gray-500 block">Cenizas</span>
                <span className="font-extrabold text-gray-800 dark:text-gray-200">{selectedFood.ashG} g</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => setSelectedFood(null)}
                className="w-full py-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 font-bold text-xs text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
              >
                Cerrar Detalle
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
