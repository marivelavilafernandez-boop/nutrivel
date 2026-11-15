'use client';

import React, { useState } from 'react';
import { initialFoodItems } from '@/lib/data/nutritionData';
import { FoodItem } from '@/lib/types';
import { 
  Apple, 
  Search, 
  Plus, 
  Download, 
  Filter, 
  Sparkles, 
  X, 
  Check, 
  Flame,
  Scale
} from 'lucide-react';

export const TablaAlimentosView: React.FC = () => {
  const [foods, setFoods] = useState<FoodItem[]>(initialFoodItems);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [onlyBolivianNative, setOnlyBolivianNative] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Formulario nuevo alimento
  const [newName, setNewName] = useState('');
  const [newCategory, setNewCategory] = useState<FoodItem['category']>('Cereales Andinos y Granos');
  const [newKcal, setNewKcal] = useState<number>(100);
  const [newProtein, setNewProtein] = useState<number>(5);
  const [newCarbs, setNewCarbs] = useState<number>(20);
  const [newFat, setNewFat] = useState<number>(1);
  const [newFiber, setNewFiber] = useState<number>(2);
  const [newIron, setNewIron] = useState<number>(1);
  const [newCalcium, setNewCalcium] = useState<number>(20);
  const [newSodium, setNewSodium] = useState<number>(10);
  const [newIsNative, setNewIsNative] = useState(false);
  const [newNotes, setNewNotes] = useState('');

  const categories = [
    'todos',
    'Cereales Andinos y Granos',
    'Tubérculos y Raíces',
    'Leguminosas y Semillas',
    'Carnes, Aves y Pescados',
    'Lácteos y Derivados',
    'Verduras y Hortalizas',
    'Frutas Locales',
    'Grasas y Aceites'
  ];

  const filteredFoods = foods.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'todos' || item.category === selectedCategory;
    const matchesNative = !onlyBolivianNative || item.isBolivianNative;
    return matchesSearch && matchesCategory && matchesNative;
  });

  const handleAddFood = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    const newFood: FoodItem = {
      id: `food_${Date.now()}`,
      name: newName.trim(),
      category: newCategory,
      portionGrams: 100,
      energyKcal: Number(newKcal) || 0,
      proteinGrams: Number(newProtein) || 0,
      carbsGrams: Number(newCarbs) || 0,
      fatGrams: Number(newFat) || 0,
      fiberGrams: Number(newFiber) || 0,
      ironMg: Number(newIron) || 0,
      calciumMg: Number(newCalcium) || 0,
      sodiumMg: Number(newSodium) || 0,
      isBolivianNative: newIsNative,
      notes: newNotes.trim()
    };

    setFoods([newFood, ...foods]);
    setIsAddModalOpen(false);
    // Limpiar formulario
    setNewName('');
    setNewNotes('');
  };

  const handleExportCSV = () => {
    const headers = 'Nombre,Categoría,Porción (g),Calorías (kcal),Proteínas (g),Carbohidratos (g),Grasas (g),Fibra (g),Hierro (mg),Calcio (mg),Sodio (mg)\n';
    const rows = filteredFoods.map(f => 
      `"${f.name}","${f.category}",${f.portionGrams},${f.energyKcal},${f.proteinGrams},${f.carbsGrams},${f.fatGrams},${f.fiberGrams},${f.ironMg},${f.calciumMg},${f.sodiumMg}`
    ).join('\n');

    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `TBCA_Bolivia_Nutrivel_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-200">
      
      {/* Encabezado con Botones de Acción */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-100 dark:border-gray-800">
        <div>
          <h2 className="text-2xl font-extrabold text-gray-900 dark:text-gray-100 flex items-center gap-2">
            <Apple className="w-6 h-6 text-emerald-500" />
            Tabla Boliviana de Composición de Alimentos (TBCA)
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
            Valores nutricionales por 100g de porción comestible (Fuente: Ministerio de Salud / INLASA Bolivia).
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExportCSV}
            className="px-3.5 py-2 rounded-2xl bg-white dark:bg-[#18221f] border border-gray-200 dark:border-gray-700 text-xs font-bold text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all flex items-center gap-2 cursor-pointer shadow-2xs"
          >
            <Download className="w-4 h-4 text-gray-400" />
            <span>Exportar CSV</span>
          </button>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-2 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 text-white text-xs font-bold shadow-md shadow-pink-500/20 hover:opacity-95 transition-all flex items-center gap-2 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>+ Agregar Alimento</span>
          </button>
        </div>
      </div>

      {/* Barra de Filtros y Búsqueda */}
      <div className="bg-white dark:bg-[#18221f] rounded-3xl p-4 border border-gray-100 dark:border-[#293a34] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        {/* Buscador */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por alimento (ej: 'quinua', 'tarwi', 'trucha')..."
            className="w-full text-xs sm:text-sm bg-gray-50 dark:bg-[#121816] border border-gray-200 dark:border-gray-700 rounded-2xl pl-10 pr-4 py-2.5 text-gray-800 dark:text-gray-200 focus:outline-hidden focus:ring-2 focus:ring-pink-400"
          />
        </div>

        {/* Filtro Categorías y Toggle Nativo */}
        <div className="flex flex-wrap items-center gap-2">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="text-xs bg-gray-50 dark:bg-[#121816] border border-gray-200 dark:border-gray-700 rounded-2xl px-3 py-2 text-gray-700 dark:text-gray-300 font-medium"
          >
            {categories.map(c => (
              <option key={c} value={c}>{c === 'todos' ? 'Todas las categorías' : c}</option>
            ))}
          </select>

          <button
            onClick={() => setOnlyBolivianNative(!onlyBolivianNative)}
            className={`text-xs px-3.5 py-2 rounded-2xl font-bold transition-all flex items-center gap-1.5 cursor-pointer border ${
              onlyBolivianNative
                ? 'bg-emerald-50 text-emerald-700 border-emerald-300 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-700'
                : 'bg-gray-50 text-gray-600 border-gray-200 dark:bg-[#121816] dark:text-gray-400 dark:border-gray-700'
            }`}
          >
            <span>🇧🇴 Alimentos Andinos / Nativos</span>
            {onlyBolivianNative && <Check className="w-3.5 h-3.5" />}
          </button>
        </div>

      </div>

      {/* Tabla de Alimentos */}
      <div className="bg-white dark:bg-[#18221f] rounded-3xl border border-gray-100 dark:border-[#293a34] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 dark:bg-[#141526] border-b border-gray-100 dark:border-gray-800 text-gray-400 font-bold uppercase tracking-wider">
              <tr>
                <th className="py-3.5 px-4">Alimento (100g)</th>
                <th className="py-3.5 px-3">Categoría</th>
                <th className="py-3.5 px-3 text-right">Kcal</th>
                <th className="py-3.5 px-3 text-right">Proteína (g)</th>
                <th className="py-3.5 px-3 text-right">Carbos (g)</th>
                <th className="py-3.5 px-3 text-right">Grasas (g)</th>
                <th className="py-3.5 px-3 text-right">Fibra (g)</th>
                <th className="py-3.5 px-3 text-right">Hierro (mg)</th>
                <th className="py-3.5 px-3 text-right">Calcio (mg)</th>
                <th className="py-3.5 px-3 text-right">Sodio (mg)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800/60">
              {filteredFoods.length === 0 ? (
                <tr>
                  <td colSpan={10} className="py-10 text-center text-gray-400">
                    No se encontraron alimentos con los filtros aplicados.
                  </td>
                </tr>
              ) : (
                filteredFoods.map(food => (
                  <tr key={food.id} className="hover:bg-pink-50/30 dark:hover:bg-[#1a1c30]/50 transition-colors">
                    <td className="py-3 px-4 font-bold text-gray-900 dark:text-gray-100">
                      <div className="flex items-center gap-2">
                        <span>{food.name}</span>
                        {food.isBolivianNative && (
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
                            🇧🇴 Nativo
                          </span>
                        )}
                      </div>
                      {food.notes && (
                        <div className="text-[10px] font-normal text-gray-400 mt-0.5 line-clamp-1">{food.notes}</div>
                      )}
                    </td>
                    <td className="py-3 px-3 text-gray-500 dark:text-gray-400">
                      <span className="px-2 py-0.5 rounded-md bg-gray-100 dark:bg-gray-800 text-[11px]">
                        {food.category}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right font-extrabold text-pink-600 dark:text-pink-400">
                      {food.energyKcal}
                    </td>
                    <td className="py-3 px-3 text-right font-bold text-orange-600 dark:text-orange-400">
                      {food.proteinGrams}
                    </td>
                    <td className="py-3 px-3 text-right font-semibold text-gray-700 dark:text-gray-300">
                      {food.carbsGrams}
                    </td>
                    <td className="py-3 px-3 text-right font-semibold text-gray-700 dark:text-gray-300">
                      {food.fatGrams}
                    </td>
                    <td className="py-3 px-3 text-right text-emerald-600 dark:text-emerald-400 font-semibold">
                      {food.fiberGrams}
                    </td>
                    <td className="py-3 px-3 text-right text-gray-600 dark:text-gray-400">
                      {food.ironMg}
                    </td>
                    <td className="py-3 px-3 text-right text-gray-600 dark:text-gray-400">
                      {food.calciumMg}
                    </td>
                    <td className="py-3 px-3 text-right text-gray-600 dark:text-gray-400">
                      {food.sodiumMg}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL PARA AGREGAR NUEVO ALIMENTO */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white dark:bg-[#18221f] rounded-3xl p-6 max-w-xl w-full border border-gray-100 dark:border-gray-800 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-gray-800 mb-4">
              <h3 className="text-base font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                <Plus className="w-5 h-5 text-pink-500" />
                Registrar Nuevo Alimento en la TBCA
              </h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 rounded-lg text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddFood} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-gray-600 dark:text-gray-300 block mb-1">
                  Nombre del Alimento *
                </label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="ej: Amaranto inflado / Pito de cañahua"
                  className="w-full text-xs sm:text-sm bg-gray-50 dark:bg-[#121816] border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2 text-gray-800 dark:text-gray-200"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-gray-600 dark:text-gray-300 block mb-1">
                    Categoría
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full text-xs bg-gray-50 dark:bg-[#121816] border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2 text-gray-800 dark:text-gray-200"
                  >
                    {categories.filter(c => c !== 'todos').map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center pt-5">
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                    <input
                      type="checkbox"
                      checked={newIsNative}
                      onChange={(e) => setNewIsNative(e.target.checked)}
                      className="rounded-sm text-emerald-600 focus:ring-emerald-500"
                    />
                    <span>Alimento Nativo Boliviano 🇧🇴</span>
                  </label>
                </div>
              </div>

              {/* Nutrientes por 100g */}
              <div className="p-4 rounded-2xl bg-gray-50 dark:bg-[#121816] border border-gray-200/60 dark:border-gray-800 space-y-3">
                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">
                  Composición Nutricional por 100g
                </span>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div>
                    <label className="text-[11px] text-gray-500 block mb-0.5">Calorías (kcal)</label>
                    <input
                      type="number"
                      value={newKcal}
                      onChange={(e) => setNewKcal(parseFloat(e.target.value) || 0)}
                      className="w-full text-xs bg-white dark:bg-[#18221f] border border-gray-200 dark:border-gray-700 rounded-lg p-2 font-bold text-pink-600"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-gray-500 block mb-0.5">Proteína (g)</label>
                    <input
                      type="number"
                      step="0.1"
                      value={newProtein}
                      onChange={(e) => setNewProtein(parseFloat(e.target.value) || 0)}
                      className="w-full text-xs bg-white dark:bg-[#18221f] border border-gray-200 dark:border-gray-700 rounded-lg p-2 font-bold text-orange-600"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-gray-500 block mb-0.5">Carbohidratos (g)</label>
                    <input
                      type="number"
                      step="0.1"
                      value={newCarbs}
                      onChange={(e) => setNewCarbs(parseFloat(e.target.value) || 0)}
                      className="w-full text-xs bg-white dark:bg-[#18221f] border border-gray-200 dark:border-gray-700 rounded-lg p-2"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-gray-500 block mb-0.5">Grasas (g)</label>
                    <input
                      type="number"
                      step="0.1"
                      value={newFat}
                      onChange={(e) => setNewFat(parseFloat(e.target.value) || 0)}
                      className="w-full text-xs bg-white dark:bg-[#18221f] border border-gray-200 dark:border-gray-700 rounded-lg p-2"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                  <div>
                    <label className="text-[11px] text-gray-500 block mb-0.5">Fibra (g)</label>
                    <input
                      type="number"
                      step="0.1"
                      value={newFiber}
                      onChange={(e) => setNewFiber(parseFloat(e.target.value) || 0)}
                      className="w-full text-xs bg-white dark:bg-[#18221f] border border-gray-200 dark:border-gray-700 rounded-lg p-2"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-gray-500 block mb-0.5">Hierro (mg)</label>
                    <input
                      type="number"
                      step="0.1"
                      value={newIron}
                      onChange={(e) => setNewIron(parseFloat(e.target.value) || 0)}
                      className="w-full text-xs bg-white dark:bg-[#18221f] border border-gray-200 dark:border-gray-700 rounded-lg p-2"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-gray-500 block mb-0.5">Calcio (mg)</label>
                    <input
                      type="number"
                      value={newCalcium}
                      onChange={(e) => setNewCalcium(parseFloat(e.target.value) || 0)}
                      className="w-full text-xs bg-white dark:bg-[#18221f] border border-gray-200 dark:border-gray-700 rounded-lg p-2"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-gray-500 block mb-0.5">Sodio (mg)</label>
                    <input
                      type="number"
                      value={newSodium}
                      onChange={(e) => setNewSodium(parseFloat(e.target.value) || 0)}
                      className="w-full text-xs bg-white dark:bg-[#18221f] border border-gray-200 dark:border-gray-700 rounded-lg p-2"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-600 dark:text-gray-300 block mb-1">
                  Notas Clínicas / Descripción
                </label>
                <textarea
                  rows={2}
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  placeholder="Detalles sobre cocción, propiedades o uso clínico..."
                  className="w-full text-xs bg-gray-50 dark:bg-[#121816] border border-gray-200 dark:border-gray-700 rounded-xl p-2.5 text-gray-800 dark:text-gray-200"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 text-xs font-bold text-gray-600 dark:text-gray-400"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-pink-500 text-white text-xs font-bold shadow-md hover:bg-pink-600"
                >
                  Guardar Alimento
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
