'use client';

import React, { useState } from 'react';
import { initialFoodItems } from '@/lib/data/nutritionData';
import { MealSlot, MealFoodItem, FoodItem } from '@/lib/types';
import { 
  ClipboardList, 
  Plus, 
  Trash2, 
  Sparkles, 
  Flame, 
  PieChart, 
  CheckCircle2, 
  AlertCircle,
  Apple,
  X
} from 'lucide-react';

export const ArmadorPlanesView: React.FC = () => {
  const [targetKcal, setTargetKcal] = useState<number>(2100);
  const [targetCarbsPercent, setTargetCarbsPercent] = useState<number>(55);
  const [targetProteinPercent, setTargetProteinPercent] = useState<number>(20);
  const [targetFatPercent, setTargetFatPercent] = useState<number>(25);

  // Comidas iniciales con la minuta típica boliviana (2,100 kcal)
  const [meals, setMeals] = useState<MealSlot[]>([
    {
      id: 'm1',
      name: 'Desayuno',
      time: '07:30',
      items: [
        { id: 'item_1', foodId: 'food_2', foodName: 'Cañahua en pito / tostada', grams: 50, calories: 171, protein: 7.0, carbs: 30.2, fat: 2.1 },
        { id: 'item_2', foodId: 'food_13', foodName: 'Yogurt natural sin azúcar', grams: 200, calories: 118, protein: 7.0, carbs: 9.4, fat: 6.6 },
        { id: 'item_3', foodId: 'food_18', foodName: 'Papaya de los Yungas paceños', grams: 150, calories: 64, protein: 0.7, carbs: 16.2, fat: 0.4 }
      ]
    },
    {
      id: 'm2',
      name: 'Colación Mañana',
      time: '10:30',
      items: [
        { id: 'item_4', foodId: 'food_11', foodName: 'Huevo entero cocido (Duro)', grams: 50, calories: 77, protein: 6.3, carbs: 0.5, fat: 5.3 }
      ]
    },
    {
      id: 'm3',
      name: 'Almuerzo',
      time: '13:00',
      items: [
        { id: 'item_5', foodId: 'food_8', foodName: 'Carne de Llama magra cocida', grams: 150, calories: 213, protein: 37.2, carbs: 0.0, fat: 6.3 },
        { id: 'item_6', foodId: 'food_1', foodName: 'Quinua real cocida', grams: 200, calories: 240, protein: 8.8, carbs: 42.6, fat: 3.8 },
        { id: 'item_7', foodId: 'food_7', foodName: 'Papa Huaycha cocida con cáscara', grams: 150, calories: 129, protein: 3.1, carbs: 29.2, fat: 0.1 },
        { id: 'item_8', foodId: 'food_16', foodName: 'Espinaca fresca al vapor', grams: 100, calories: 23, protein: 2.9, carbs: 3.6, fat: 0.4 },
        { id: 'item_9', foodId: 'food_15', foodName: 'Aceite de Oliva virgen extra', grams: 15, calories: 132, protein: 0.0, carbs: 0.0, fat: 15.0 }
      ]
    },
    {
      id: 'm4',
      name: 'Merienda Tarde',
      time: '16:30',
      items: [
        { id: 'item_10', foodId: 'food_3', foodName: 'Tarwi cocido (Chocho)', grams: 80, calories: 117, protein: 14.0, carbs: 6.2, fat: 4.1 },
        { id: 'item_11', foodId: 'food_12', foodName: 'Queso criollo paceño semidescremado', grams: 40, calories: 98, protein: 7.8, carbs: 0.8, fat: 7.1 }
      ]
    },
    {
      id: 'm5',
      name: 'Cena',
      time: '20:00',
      items: [
        { id: 'item_12', foodId: 'food_9', foodName: 'Trucha del Lago Titicaca al vapor', grams: 150, calories: 222, protein: 31.2, carbs: 0.0, fat: 9.9 },
        { id: 'item_13', foodId: 'food_5', foodName: 'Chuño negro cocido', grams: 120, calories: 134, protein: 2.3, carbs: 30.5, fat: 0.2 },
        { id: 'item_14', foodId: 'food_17', foodName: 'Zanahoria fresca cocida', grams: 100, calories: 35, protein: 0.8, carbs: 8.2, fat: 0.2 },
        { id: 'item_15', foodId: 'food_14', foodName: 'Palta Hass nacional', grams: 60, calories: 96, protein: 1.2, carbs: 5.1, fat: 8.8 }
      ]
    }
  ]);

  // Modal para agregar alimento a una comida
  const [selectedMealId, setSelectedMealId] = useState<string | null>(null);
  const [selectedFoodId, setSelectedFoodId] = useState<string>(initialFoodItems[0].id);
  const [inputGrams, setInputGrams] = useState<number>(100);

  // Cálculos de totales
  const totalCalories = Math.round(
    meals.reduce((sum, m) => sum + m.items.reduce((s, i) => s + i.calories, 0), 0)
  );
  const totalProtein = parseFloat(
    meals.reduce((sum, m) => sum + m.items.reduce((s, i) => s + i.protein, 0), 0).toFixed(1)
  );
  const totalCarbs = parseFloat(
    meals.reduce((sum, m) => sum + m.items.reduce((s, i) => s + i.carbs, 0), 0).toFixed(1)
  );
  const totalFat = parseFloat(
    meals.reduce((sum, m) => sum + m.items.reduce((s, i) => s + i.fat, 0), 0).toFixed(1)
  );

  // Metas en gramos
  const targetCarbsGrams = Math.round((targetKcal * (targetCarbsPercent / 100)) / 4);
  const targetProteinGrams = Math.round((targetKcal * (targetProteinPercent / 100)) / 4);
  const targetFatGrams = Math.round((targetKcal * (targetFatPercent / 100)) / 9);

  // Porcentaje de adecuación (90% - 110% es óptimo)
  const adequacyKcal = targetKcal > 0 ? Math.round((totalCalories / targetKcal) * 100) : 0;
  const adequacyPro = targetProteinGrams > 0 ? Math.round((totalProtein / targetProteinGrams) * 100) : 0;
  const adequacyCho = targetCarbsGrams > 0 ? Math.round((totalCarbs / targetCarbsGrams) * 100) : 0;
  const adequacyFat = targetFatGrams > 0 ? Math.round((totalFat / targetFatGrams) * 100) : 0;

  const handleOpenAddFood = (mealId: string) => {
    setSelectedMealId(mealId);
    setInputGrams(100);
  };

  const handleConfirmAddFood = () => {
    if (!selectedMealId) return;
    const food = initialFoodItems.find(f => f.id === selectedFoodId);
    if (!food) return;

    const factor = inputGrams / 100;
    const newItem: MealFoodItem = {
      id: `item_${Date.now()}`,
      foodId: food.id,
      foodName: food.name,
      grams: inputGrams,
      calories: Math.round(food.energyKcal * factor),
      protein: parseFloat((food.proteinGrams * factor).toFixed(1)),
      carbs: parseFloat((food.carbsGrams * factor).toFixed(1)),
      fat: parseFloat((food.fatGrams * factor).toFixed(1))
    };

    setMeals(meals.map(m => {
      if (m.id === selectedMealId) {
        return { ...m, items: [...m.items, newItem] };
      }
      return m;
    }));

    setSelectedMealId(null);
  };

  const handleRemoveItem = (mealId: string, itemId: string) => {
    setMeals(meals.map(m => {
      if (m.id === mealId) {
        return { ...m, items: m.items.filter(i => i.id !== itemId) };
      }
      return m;
    }));
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-200">
      
      {/* Encabezado */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-100 dark:border-gray-800">
        <div>
          <h2 className="text-2xl font-extrabold text-gray-900 dark:text-gray-100 flex items-center gap-2">
            <ClipboardList className="w-6 h-6 text-pink-500" />
            Armador de Planes y Minutas Dietéticas
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
            Diseña y calcula minutas fraccionadas por tiempos de comida con alimentos bolivianos y adecuación en tiempo real.
          </p>
        </div>

        {/* Ajuste de Meta Calórica */}
        <div className="flex items-center gap-2 bg-white dark:bg-[#18221f] p-2 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-2xs">
          <span className="text-xs font-bold text-gray-500 pl-2">Meta:</span>
          <input
            type="number"
            step="50"
            value={targetKcal}
            onChange={(e) => setTargetKcal(parseInt(e.target.value) || 0)}
            className="w-20 text-xs font-extrabold text-pink-600 bg-gray-50 dark:bg-[#121816] rounded-xl px-2 py-1 text-center"
          />
          <span className="text-xs font-bold text-gray-400 pr-2">kcal</span>
        </div>
      </div>

      {/* Panel de Adecuación Nutricional (KPIs de Macros y Calorías) */}
      <div className="bg-white dark:bg-[#18221f] rounded-3xl p-6 border border-gray-100 dark:border-[#293a34] shadow-xs">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          
          {/* Calorías Totales */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-950/20 dark:to-rose-950/20 border border-pink-200 dark:border-pink-800">
            <span className="text-[11px] font-bold uppercase tracking-wider text-pink-600 dark:text-pink-400">Energía Total</span>
            <div className="text-3xl font-extrabold text-gray-900 dark:text-gray-100 mt-1">
              {totalCalories} <span className="text-xs font-normal text-gray-400">/ {targetKcal} kcal</span>
            </div>
            <div className="flex items-center justify-between text-xs mt-2">
              <span className="text-gray-500">Adecuación:</span>
              <span className={`font-bold px-2 py-0.5 rounded-full ${
                adequacyKcal >= 90 && adequacyKcal <= 110 ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
              }`}>
                {adequacyKcal}%
              </span>
            </div>
          </div>

          {/* Carbohidratos */}
          <div className="p-4 rounded-2xl bg-gray-50 dark:bg-[#141526] border border-gray-200/70 dark:border-gray-800">
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-600">Carbohidratos (55%)</span>
            <div className="text-2xl font-extrabold text-gray-900 dark:text-gray-100 mt-1">
              {totalCarbs} <span className="text-xs font-normal text-gray-400">/ {targetCarbsGrams} g</span>
            </div>
            <div className="flex items-center justify-between text-xs mt-2">
              <span className="text-gray-500">Adecuación:</span>
              <span className={`font-bold px-1.5 py-0.5 rounded-full text-[11px] ${
                adequacyCho >= 90 && adequacyCho <= 110 ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-200 text-gray-700'
              }`}>
                {adequacyCho}%
              </span>
            </div>
          </div>

          {/* Proteínas */}
          <div className="p-4 rounded-2xl bg-gray-50 dark:bg-[#141526] border border-gray-200/70 dark:border-gray-800">
            <span className="text-[11px] font-bold uppercase tracking-wider text-orange-600">Proteínas (20%)</span>
            <div className="text-2xl font-extrabold text-gray-900 dark:text-gray-100 mt-1">
              {totalProtein} <span className="text-xs font-normal text-gray-400">/ {targetProteinGrams} g</span>
            </div>
            <div className="flex items-center justify-between text-xs mt-2">
              <span className="text-gray-500">Adecuación:</span>
              <span className={`font-bold px-1.5 py-0.5 rounded-full text-[11px] ${
                adequacyPro >= 90 && adequacyPro <= 110 ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-200 text-gray-700'
              }`}>
                {adequacyPro}%
              </span>
            </div>
          </div>

          {/* Grasas */}
          <div className="p-4 rounded-2xl bg-gray-50 dark:bg-[#141526] border border-gray-200/70 dark:border-gray-800">
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600">Grasas (25%)</span>
            <div className="text-2xl font-extrabold text-gray-900 dark:text-gray-100 mt-1">
              {totalFat} <span className="text-xs font-normal text-gray-400">/ {targetFatGrams} g</span>
            </div>
            <div className="flex items-center justify-between text-xs mt-2">
              <span className="text-gray-500">Adecuación:</span>
              <span className={`font-bold px-1.5 py-0.5 rounded-full text-[11px] ${
                adequacyFat >= 90 && adequacyFat <= 110 ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-200 text-gray-700'
              }`}>
                {adequacyFat}%
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* Lista de Tiempos de Comida */}
      <div className="space-y-4">
        {meals.map((meal) => {
          const mealKcal = meal.items.reduce((s, i) => s + i.calories, 0);
          const mealPro = meal.items.reduce((s, i) => s + i.protein, 0).toFixed(1);
          const mealCho = meal.items.reduce((s, i) => s + i.carbs, 0).toFixed(1);
          const mealFat = meal.items.reduce((s, i) => s + i.fat, 0).toFixed(1);

          return (
            <div key={meal.id} className="bg-white dark:bg-[#18221f] rounded-3xl p-5 border border-gray-100 dark:border-[#293a34] shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-gray-100 dark:border-gray-800 gap-2">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-pink-100 dark:bg-pink-950/40 text-pink-600 font-bold text-xs flex items-center justify-center">
                    🍽️
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                      <span>{meal.name}</span>
                      <span className="text-xs text-gray-400 font-normal">({meal.time})</span>
                    </h4>
                    <span className="text-[11px] text-gray-400">
                      Total tiempo: <strong className="text-pink-600">{mealKcal} kcal</strong> • P: {mealPro}g • C: {mealCho}g • G: {mealFat}g
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => handleOpenAddFood(meal.id)}
                  className="px-3 py-1.5 rounded-xl bg-pink-50 text-pink-600 dark:bg-pink-950/40 dark:text-pink-300 text-xs font-bold hover:bg-pink-100 transition-colors flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
                >
                  <Plus className="w-3.5 h-3.5" /> + Alimento
                </button>
              </div>

              {/* Alimentos de la comida */}
              <div className="divide-y divide-gray-50 dark:divide-gray-800/40 mt-2">
                {meal.items.length === 0 ? (
                  <div className="py-4 text-center text-xs text-gray-400">
                    No has agregado alimentos a este tiempo de comida.
                  </div>
                ) : (
                  meal.items.map((item) => (
                    <div key={item.id} className="py-2.5 flex items-center justify-between gap-3 text-xs">
                      <div>
                        <span className="font-bold text-gray-800 dark:text-gray-200">{item.foodName}</span>
                        <span className="text-gray-400 ml-2">({item.grams} g)</span>
                      </div>

                      <div className="flex items-center gap-4 text-gray-500">
                        <span className="font-extrabold text-pink-600 dark:text-pink-400">{item.calories} kcal</span>
                        <span className="hidden sm:inline text-[11px]">P: {item.protein}g</span>
                        <span className="hidden sm:inline text-[11px]">C: {item.carbs}g</span>
                        <span className="hidden sm:inline text-[11px]">G: {item.fat}g</span>

                        <button
                          onClick={() => handleRemoveItem(meal.id, item.id)}
                          className="p-1 rounded-md text-gray-300 hover:text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
                          title="Eliminar de la minuta"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* MODAL PARA AGREGAR ALIMENTO A UNA COMIDA */}
      {selectedMealId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white dark:bg-[#18221f] rounded-3xl p-6 max-w-md w-full border border-gray-100 dark:border-gray-800 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-gray-800 mb-4">
              <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                <Apple className="w-4 h-4 text-pink-500" />
                Agregar Alimento a {meals.find(m => m.id === selectedMealId)?.name}
              </h3>
              <button
                onClick={() => setSelectedMealId(null)}
                className="p-1 rounded-lg text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-gray-600 dark:text-gray-300 block mb-1">
                  Seleccionar de la Tabla Boliviana (TBCA)
                </label>
                <select
                  value={selectedFoodId}
                  onChange={(e) => setSelectedFoodId(e.target.value)}
                  className="w-full text-xs bg-gray-50 dark:bg-[#121816] border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2 text-gray-800 dark:text-gray-200 font-medium"
                >
                  {initialFoodItems.map(f => (
                    <option key={f.id} value={f.id}>
                      {f.name} ({f.energyKcal} kcal / 100g)
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-600 dark:text-gray-300 block mb-1">
                  Cantidad en Gramos
                </label>
                <input
                  type="number"
                  min="5"
                  max="1000"
                  step="5"
                  value={inputGrams}
                  onChange={(e) => setInputGrams(parseInt(e.target.value) || 0)}
                  className="w-full text-sm bg-gray-50 dark:bg-[#121816] border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2 text-gray-800 dark:text-gray-200 font-bold"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedMealId(null)}
                  className="px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 text-xs font-bold text-gray-600 dark:text-gray-400"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={handleConfirmAddFood}
                  className="px-4 py-2 rounded-xl bg-pink-500 text-white text-xs font-bold shadow-md hover:bg-pink-600"
                >
                  Agregar a Minuta
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
