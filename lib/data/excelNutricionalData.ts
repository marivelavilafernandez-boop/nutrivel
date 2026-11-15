import { BiochemicalIndicator, FoodFrequencyEntry, DetailedDietFoodItem } from '../types';

// ==========================================
// 1. INDICADORES BIOQUÍMICOS COMPLETOS (FABIOLA SG.B)
// ==========================================
export const initialBiochemicalIndicators: BiochemicalIndicator[] = [
  // Metabolismo y Glucosa
  {
    id: 'bio_glucemia',
    name: 'Glucemia en Ayunas',
    unit: 'mg/dl',
    referenceRange: '70 - 99 mg/dl',
    minVal: 70,
    maxVal: 99,
    category: 'Metabolismo & Glucosa',
    clinicalMeaning: 'Criterio diagnóstico para hipoglucemia (<70), normoglucemia (70-99), prediabetes (100-125) y DM2 (>=126).'
  },
  {
    id: 'bio_hba1c',
    name: 'Hemoglobina Glicosilada (HbA1c)',
    unit: '%',
    referenceRange: '< 5.7 %',
    minVal: 4.0,
    maxVal: 5.6,
    category: 'Metabolismo & Glucosa',
    clinicalMeaning: 'Control glucémico promedio de los últimos 90-120 días. Prediabetes: 5.7-6.4%, Diabetes: >=6.5%.'
  },

  // Perfil Lipídico
  {
    id: 'bio_colesterol',
    name: 'Colesterol Total',
    unit: 'mg/dl',
    referenceRange: '< 170 - 199 mg/dl',
    minVal: 120,
    maxVal: 199,
    category: 'Perfil Lipídico',
    clinicalMeaning: 'Marcador de riesgo aterogénico. En prevención primaria se busca mantenerlo < 170-200 mg/dl.'
  },
  {
    id: 'bio_hdl',
    name: 'Colesterol HDL (Bueno)',
    unit: 'mg/dl',
    referenceRange: '> 40 mg/dl',
    minVal: 40,
    maxVal: 90,
    category: 'Perfil Lipídico',
    clinicalMeaning: 'Fracción protectora cardiovascular. En mujeres se recomienda > 50 mg/dl; en varones > 40 mg/dl.'
  },
  {
    id: 'bio_ldl',
    name: 'Colesterol LDL (Malo)',
    unit: 'mg/dl',
    referenceRange: '< 130 mg/dl',
    minVal: 50,
    maxVal: 129,
    category: 'Perfil Lipídico',
    clinicalMeaning: 'Fracción aterogénica directa. Óptimo < 100 mg/dl; en riesgo moderado/alto < 70 mg/dl.'
  },
  {
    id: 'bio_trigliceridos',
    name: 'Triglicéridos',
    unit: 'mg/dl',
    referenceRange: '< 150 mg/dl',
    minVal: 40,
    maxVal: 149,
    category: 'Perfil Lipídico',
    clinicalMeaning: 'Sensible al consumo de azúcares simples, fructosa, harinas refinadas y alcohol. Normal < 150 mg/dl.'
  },

  // Función Renal & Proteínas
  {
    id: 'bio_albumina',
    name: 'Albúmina Sérica',
    unit: 'g/dl',
    referenceRange: '3.4 - 5.4 g/dl',
    minVal: 3.4,
    maxVal: 5.4,
    category: 'Función Renal & Hepática',
    clinicalMeaning: 'Marcador de reserva proteica visceral y estado inflamatorio. < 3.0 g/dl indica riesgo severo de desnutrición.'
  },
  {
    id: 'bio_proteinas_totales',
    name: 'Proteínas Totales',
    unit: 'g/dl',
    referenceRange: '6.0 - 8.0 g/dl',
    minVal: 6.0,
    maxVal: 8.0,
    category: 'Función Renal & Hepática',
    clinicalMeaning: 'Suma de albúmina y globulinas. Evalúa balance nitrogenado y función hepato-renal.'
  },
  {
    id: 'bio_creatinina',
    name: 'Creatinina Sérica',
    unit: 'mg/dl',
    referenceRange: '0.6 - 1.2 mg/dl',
    minVal: 0.6,
    maxVal: 1.2,
    category: 'Función Renal & Hepática',
    clinicalMeaning: 'Tasa de filtración glomerular y masa muscular. Clave para estadificación renal y prescripción proteica.'
  },
  {
    id: 'bio_urea',
    name: 'Urea Sérica',
    unit: 'mg/dl',
    referenceRange: '10 - 40 mg/dl',
    minVal: 10,
    maxVal: 40,
    category: 'Función Renal & Hepática',
    clinicalMeaning: 'Metabolito final del catabolismo proteico. Aumenta con sobrecarga proteica, deshidratación o falla renal.'
  },
  {
    id: 'bio_acido_urico_m',
    name: 'Ácido Úrico (Mujeres)',
    unit: 'mg/dl',
    referenceRange: '2.4 - 6.0 mg/dl',
    minVal: 2.4,
    maxVal: 6.0,
    category: 'Función Renal & Hepática',
    clinicalMeaning: 'Metabolismo de purinas. Elevado en hiperuricemia/gota; requiere restricción de carnes rojas y vísceras.'
  },
  {
    id: 'bio_acido_urico_h',
    name: 'Ácido Úrico (Hombres)',
    unit: 'mg/dl',
    referenceRange: '3.4 - 7.0 mg/dl',
    minVal: 3.4,
    maxVal: 7.0,
    category: 'Función Renal & Hepática',
    clinicalMeaning: 'Metabolismo de purinas en varones. Criterio de ajuste dietoterapéutico.'
  },

  // Hematología y Hierro
  {
    id: 'bio_hb_mujer',
    name: 'Hemoglobina (Mujer en Altura La Paz)',
    unit: 'g/dl',
    referenceRange: '12.1 - 15.1 g/dl',
    minVal: 12.1,
    maxVal: 15.1,
    category: 'Hematología & Hierro',
    clinicalMeaning: 'En La Paz (3,640 msnm) se aplica corrección por altitud (+2.0 a +2.5 g/dl sobre nivel del mar).'
  },
  {
    id: 'bio_hb_hombre',
    name: 'Hemoglobina (Hombre en Altura La Paz)',
    unit: 'g/dl',
    referenceRange: '13.8 - 17.2 g/dl',
    minVal: 13.8,
    maxVal: 17.2,
    category: 'Hematología & Hierro',
    clinicalMeaning: 'En altitud >17.5 g/dl evaluar poliglobulia o eritrocitosis de altura; <13.8 g/dl anemia.'
  },
  {
    id: 'bio_hto_mujer',
    name: 'Hematocrito (Mujer)',
    unit: '%',
    referenceRange: '36.0 - 48.0 %',
    minVal: 36.0,
    maxVal: 48.0,
    category: 'Hematología & Hierro',
    clinicalMeaning: 'Fracción de glóbulos rojos. Clave para evaluar hidratación y estado anemizante.'
  },
  {
    id: 'bio_hto_hombre',
    name: 'Hematocrito (Hombre)',
    unit: '%',
    referenceRange: '40.0 - 52.0 %',
    minVal: 40.0,
    maxVal: 52.0,
    category: 'Hematología & Hierro',
    clinicalMeaning: 'Fracción eritrocitaria en varones.'
  },
  {
    id: 'bio_hierro_mujer',
    name: 'Hierro Sérico (Mujer)',
    unit: 'ug/dl',
    referenceRange: '50 - 170 ug/dl',
    minVal: 50,
    maxVal: 170,
    category: 'Hematología & Hierro',
    clinicalMeaning: 'Hierro circulante. Útil en diagnóstico de anemia ferropénica junto con ferritina.'
  },
  {
    id: 'bio_hierro_hombre',
    name: 'Hierro Sérico (Hombre)',
    unit: 'ug/dl',
    referenceRange: '65 - 176 ug/dl',
    minVal: 65,
    maxVal: 176,
    category: 'Hematología & Hierro',
    clinicalMeaning: 'Hierro sérico circulante en varones.'
  },
  {
    id: 'bio_ferritina',
    name: 'Ferritina Sérica',
    unit: 'ng/dl',
    referenceRange: '20 - 500 ng/dl',
    minVal: 20,
    maxVal: 500,
    category: 'Hematología & Hierro',
    clinicalMeaning: 'Reserva tisular de hierro. < 30 ng/dl indica ferropenia latente aun con hemoglobina normal.'
  },

  // Electrolitos & Minerales
  {
    id: 'bio_sodio',
    name: 'Sodio Sérico (Na+)',
    unit: 'mmol/L',
    referenceRange: '135 - 145 mmol/L',
    minVal: 135,
    maxVal: 145,
    category: 'Electrolitos & Minerales',
    clinicalMeaning: 'Principal osmol extracelular. Crucial en HTA, ascitis, edema y cálculo de osmolaridad.'
  },
  {
    id: 'bio_potasio',
    name: 'Potasio Sérico (K+)',
    unit: 'mmol/L',
    referenceRange: '3.5 - 5.0 mmol/L',
    minVal: 3.5,
    maxVal: 5.0,
    category: 'Electrolitos & Minerales',
    clinicalMeaning: 'Vital en paciente renal y cardíaco. Hiperpotasemia (>5.0) exige restricción estricta de frutas andinas y cocción doble de papas.'
  },
  {
    id: 'bio_calcio',
    name: 'Calcio Sérico (Ca++)',
    unit: 'mg/dl',
    referenceRange: '8.5 - 10.2 mg/dl',
    minVal: 8.5,
    maxVal: 10.2,
    category: 'Electrolitos & Minerales',
    clinicalMeaning: 'Corregir por albúmina sérica: Ca corregido = Ca medido + 0.8 * (4 - Albúmina).'
  },
  {
    id: 'bio_magnesio',
    name: 'Magnesio Sérico (Mg++)',
    unit: 'mg/dl',
    referenceRange: '1.7 - 2.2 mg/dl',
    minVal: 1.7,
    maxVal: 2.2,
    category: 'Electrolitos & Minerales',
    clinicalMeaning: 'Cofactor de más de 300 enzimas metabólicas. Déficit común en pacientes diabéticos mal controlados.'
  },

  // Vitaminas
  {
    id: 'bio_vit_d',
    name: 'Vitamina D (25-OH-D)',
    unit: 'ng/ml',
    referenceRange: '20 - 50 ng/ml',
    minVal: 20,
    maxVal: 50,
    category: 'Vitaminas',
    clinicalMeaning: 'Deficiencia <20 ng/ml; Insuficiencia 20-29 ng/ml; Suficiencia 30-50 ng/ml. Salud ósea e inmunológica.'
  },
  {
    id: 'bio_vit_a',
    name: 'Vitamina A (Retinol)',
    unit: 'ug/dl',
    referenceRange: '20 - 70 ug/dl',
    minVal: 20,
    maxVal: 70,
    category: 'Vitaminas',
    clinicalMeaning: 'Función visual y epitelial. Importante en pediatría y salud pública.'
  },
  {
    id: 'bio_vit_b1',
    name: 'Vitamina B1 (Tiamina)',
    unit: 'nmol/L',
    referenceRange: '20 - 70 nmol/L',
    minVal: 20,
    maxVal: 70,
    category: 'Vitaminas',
    clinicalMeaning: 'Metabolismo de carbohidratos. Suplementación crítica en síndrome de realimentación.'
  },
  {
    id: 'bio_vit_b12',
    name: 'Vitamina B12 (Cobalamina)',
    unit: 'pg/dl',
    referenceRange: '200 - 900 pg/dl',
    minVal: 200,
    maxVal: 900,
    category: 'Vitaminas',
    clinicalMeaning: 'Prevención de anemia megaloblástica y neuropatía. Monitorear en veganos, vegetarianos y uso de metformina.'
  },
  {
    id: 'bio_vit_c',
    name: 'Vitamina C (Ácido Ascórbico)',
    unit: 'mg/dl',
    referenceRange: '0.6 - 2.0 mg/dl',
    minVal: 0.6,
    maxVal: 2.0,
    category: 'Vitaminas',
    clinicalMeaning: 'Antioxidante y facilitador de absorción de hierro no hemo de alimentos andinos.'
  }
];

// ==========================================
// 2. CUESTIONARIO DE FRECUENCIA DE CONSUMO (FFQ)
// ==========================================
export const initialFoodFrequencyList: FoodFrequencyEntry[] = [
  // Carnes y Procesados
  { id: 'ffq_1', foodName: 'Carne de res magra', category: 'CARNES Y PROCESADOS', frequency: '' },
  { id: 'ffq_2', foodName: 'Carne de cerdo', category: 'CARNES Y PROCESADOS', frequency: '' },
  { id: 'ffq_3', foodName: 'Charque de res / llama', category: 'CARNES Y PROCESADOS', frequency: '' },
  { id: 'ffq_4', foodName: 'Cordero', category: 'CARNES Y PROCESADOS', frequency: '' },
  { id: 'ffq_5', foodName: 'Hígado de res / pollo', category: 'CARNES Y PROCESADOS', frequency: '' },
  { id: 'ffq_6', foodName: 'Huevo entero', category: 'CARNES Y PROCESADOS', frequency: '' },
  { id: 'ffq_7', foodName: 'Leche de vaca', category: 'CARNES Y PROCESADOS', frequency: '' },
  { id: 'ffq_8', foodName: 'Mantequilla', category: 'CARNES Y PROCESADOS', frequency: '' },
  { id: 'ffq_9', foodName: 'Mortadela / Jamonada', category: 'CARNES Y PROCESADOS', frequency: '' },
  { id: 'ffq_10', foodName: 'Panza de res / Menudencias', category: 'CARNES Y PROCESADOS', frequency: '' },
  { id: 'ffq_11', foodName: 'Pescado (Trucha / Ispi / Pejerrey / Sábalo)', category: 'CARNES Y PROCESADOS', frequency: '' },
  { id: 'ffq_12', foodName: 'Pollo (pechuga / pierna)', category: 'CARNES Y PROCESADOS', frequency: '' },
  { id: 'ffq_13', foodName: 'Queso criollo / chaqueño', category: 'CARNES Y PROCESADOS', frequency: '' },
  { id: 'ffq_14', foodName: 'Salchicha / Embutidos', category: 'CARNES Y PROCESADOS', frequency: '' },
  { id: 'ffq_15', foodName: 'Yogurt natural / saborizado', category: 'CARNES Y PROCESADOS', frequency: '' },

  // Verduras
  { id: 'ffq_16', foodName: 'Acelga', category: 'VERDURAS', frequency: '' },
  { id: 'ffq_17', foodName: 'Arveja fresca', category: 'VERDURAS', frequency: '' },
  { id: 'ffq_18', foodName: 'Cebolla', category: 'VERDURAS', frequency: '' },
  { id: 'ffq_19', foodName: 'Espinaca', category: 'VERDURAS', frequency: '' },
  { id: 'ffq_20', foodName: 'Haba tierna', category: 'VERDURAS', frequency: '' },
  { id: 'ffq_21', foodName: 'Lechuga', category: 'VERDURAS', frequency: '' },
  { id: 'ffq_22', foodName: 'Locoto / Ulupica', category: 'VERDURAS', frequency: '' },
  { id: 'ffq_23', foodName: 'Pepino', category: 'VERDURAS', frequency: '' },
  { id: 'ffq_24', foodName: 'Remolacha', category: 'VERDURAS', frequency: '' },
  { id: 'ffq_25', foodName: 'Tomate', category: 'VERDURAS', frequency: '' },
  { id: 'ffq_26', foodName: 'Vainita', category: 'VERDURAS', frequency: '' },
  { id: 'ffq_27', foodName: 'Zanahoria', category: 'VERDURAS', frequency: '' },
  { id: 'ffq_28', foodName: 'Zapallo', category: 'VERDURAS', frequency: '' },

  // Tubérculos
  { id: 'ffq_29', foodName: 'Camote', category: 'TUBÉRCULOS', frequency: '' },
  { id: 'ffq_30', foodName: 'Chuño negro', category: 'TUBÉRCULOS', frequency: '' },
  { id: 'ffq_31', foodName: 'Tunta (Chuño blanco)', category: 'TUBÉRCULOS', frequency: '' },
  { id: 'ffq_32', foodName: 'Oca', category: 'TUBÉRCULOS', frequency: '' },
  { id: 'ffq_33', foodName: 'Papa (imilla / holandesa)', category: 'TUBÉRCULOS', frequency: '' },
  { id: 'ffq_34', foodName: 'Yuca', category: 'TUBÉRCULOS', frequency: '' },
  { id: 'ffq_35', foodName: 'Papalisa / Ulluco', category: 'TUBÉRCULOS', frequency: '' },

  // Frutas
  { id: 'ffq_36', foodName: 'Frutilla', category: 'FRUTAS', frequency: '' },
  { id: 'ffq_37', foodName: 'Manzana', category: 'FRUTAS', frequency: '' },
  { id: 'ffq_38', foodName: 'Naranja / Mandarina', category: 'FRUTAS', frequency: '' },
  { id: 'ffq_39', foodName: 'Papaya', category: 'FRUTAS', frequency: '' },
  { id: 'ffq_40', foodName: 'Piña', category: 'FRUTAS', frequency: '' },
  { id: 'ffq_41', foodName: 'Plátano / Guineo', category: 'FRUTAS', frequency: '' },
  { id: 'ffq_42', foodName: 'Uva', category: 'FRUTAS', frequency: '' },
  { id: 'ffq_43', foodName: 'Tumbo / Granadilla', category: 'FRUTAS', frequency: '' },

  // Leguminosas y Cereales
  { id: 'ffq_44', foodName: 'Amaranto', category: 'LEGUMINOSAS Y CEREALES', frequency: '' },
  { id: 'ffq_45', foodName: 'Arroz blanco / integral', category: 'LEGUMINOSAS Y CEREALES', frequency: '' },
  { id: 'ffq_46', foodName: 'Avena en hojuelas', category: 'LEGUMINOSAS Y CEREALES', frequency: '' },
  { id: 'ffq_47', foodName: 'Cañahua (pito / tostada)', category: 'LEGUMINOSAS Y CEREALES', frequency: '' },
  { id: 'ffq_48', foodName: 'Fideo / Pastas', category: 'LEGUMINOSAS Y CEREALES', frequency: '' },
  { id: 'ffq_49', foodName: 'Lenteja', category: 'LEGUMINOSAS Y CEREALES', frequency: '' },
  { id: 'ffq_50', foodName: 'Maíz / Choclo / Mote', category: 'LEGUMINOSAS Y CEREALES', frequency: '' },
  { id: 'ffq_51', foodName: 'Maní tostado', category: 'LEGUMINOSAS Y CEREALES', frequency: '' },
  { id: 'ffq_52', foodName: 'Poroto / Frijol', category: 'LEGUMINOSAS Y CEREALES', frequency: '' },
  { id: 'ffq_53', foodName: 'Quinua real', category: 'LEGUMINOSAS Y CEREALES', frequency: '' },
  { id: 'ffq_54', foodName: 'Tarwi (Chocho)', category: 'LEGUMINOSAS Y CEREALES', frequency: '' },
  { id: 'ffq_55', foodName: 'Trigo / Harinilla', category: 'LEGUMINOSAS Y CEREALES', frequency: '' },

  // Frecuentes y Ultraprocesados
  { id: 'ffq_56', foodName: 'Pan marraqueta / sarnita / colisa', category: 'FRECUENTES / ULTRAPROCESADOS', frequency: '' },
  { id: 'ffq_57', foodName: 'Frituras y apanados', category: 'FRECUENTES / ULTRAPROCESADOS', frequency: '' },
  { id: 'ffq_58', foodName: 'Golosinas y dulces', category: 'FRECUENTES / ULTRAPROCESADOS', frequency: '' },
  { id: 'ffq_59', foodName: 'Gaseosas y jugos envasados', category: 'FRECUENTES / ULTRAPROCESADOS', frequency: '' },
  { id: 'ffq_60', foodName: 'Pastelería y masas dulces', category: 'FRECUENTES / ULTRAPROCESADOS', frequency: '' },
  { id: 'ffq_61', foodName: 'Comida rápida (hamburguesas, pollo frito, salchipapas)', category: 'FRECUENTES / ULTRAPROCESADOS', frequency: '' }
];

// ==========================================
// 3. FÓRMULAS DE REQUERIMIENTO ENERGÉTICO COMPARATIVO
// ==========================================
export interface MultiFormulaParams {
  weightKg: number;
  heightCm: number;
  age: number;
  gender: 'F' | 'M';
  activityFactor: number; // 1.2, 1.375, 1.55, 1.725, 1.9
  objectiveAdjustment: number; // ej: 0.15 para subir, -0.20 para bajar, 0 para mantener
  isPregnant?: boolean;
  pregnancyWeek?: number;
  isTrauma?: boolean;
  isBurned?: boolean;
}

export interface CalculatedFormulaResult {
  formulaName: string;
  tmb: number;
  get: number;
  adjustedGet: number;
  notes: string;
}

export function calculateMultiFormulaEnergy(params: MultiFormulaParams): CalculatedFormulaResult[] {
  const { weightKg, heightCm, age, gender, activityFactor, objectiveAdjustment, isPregnant, isTrauma, isBurned } = params;
  const heightM = heightCm / 100;
  const isFemale = gender === 'F';

  // 1. Harris-Benedict (1984 Roza & Shizgal)
  const hbTmb = isFemale
    ? 447.593 + (9.247 * weightKg) + (3.098 * heightCm) - (4.330 * age)
    : 88.362 + (13.397 * weightKg) + (4.799 * heightCm) - (5.677 * age);
  const hbGet = hbTmb * activityFactor;

  // 2. Mifflin-St Jeor (1990)
  const mifflinTmb = isFemale
    ? (10 * weightKg) + (6.25 * heightCm) - (5 * age) - 161
    : (10 * weightKg) + (6.25 * heightCm) - (5 * age) + 5;
  const mifflinGet = mifflinTmb * activityFactor;

  // 3. Lyle McDonald (Regla práctica por kg de peso corporal)
  // 31-33 kcal/kg en mujeres moderadas, 33-35 kcal/kg en varones
  const lyleKcalPerKg = isFemale ? 31 : 33;
  const lyleGet = weightKg * lyleKcalPerKg * (activityFactor / 1.55);
  const lyleTmb = lyleGet / activityFactor;

  // 4. Butte (Ecuación específica para Gestantes / Previo embarazo)
  // Butte et al. (2004): TMB = 585 + (13.7 * pesoPre) - (5.8 * edad)
  const butteTmb = isFemale ? 585 + (13.7 * weightKg) - (5.8 * age) : hbTmb;
  const butteAddPregnancy = isPregnant ? 300 : 0;
  const butteGet = (butteTmb * activityFactor) + butteAddPregnancy;

  // 5. Schofield Niños / Adolescentes (10 - 18 años)
  let schofieldTmb = 0;
  if (age < 3) {
    schofieldTmb = isFemale ? (61.0 * weightKg) - 51 : (60.9 * weightKg) - 54;
  } else if (age < 10) {
    schofieldTmb = isFemale ? (22.5 * weightKg) + 499 : (22.7 * weightKg) + 495;
  } else if (age < 18) {
    schofieldTmb = isFemale ? (12.2 * weightKg) + 746 : (17.5 * weightKg) + 651;
  } else {
    schofieldTmb = isFemale ? (14.7 * weightKg) + 496 : (15.3 * weightKg) + 679;
  }
  const schofieldGet = schofieldTmb * activityFactor;

  // 6. Ireton-Jones (1992 para pacientes críticos / hospitalizados)
  // No ventilados: EEE = 629 - (11 * edad) + (25 * peso) - (609 * obesidad [si IMC > 27, valor 1]) + (205 * trauma [1]) + (451 * quemado [1])
  const imc = heightM > 0 ? weightKg / (heightM * heightM) : 22;
  const obeseVal = imc > 27 ? 1 : 0;
  const traumaVal = isTrauma ? 1 : 0;
  const burnedVal = isBurned ? 1 : 0;
  const iretonGet = 629 - (11 * age) + (25 * weightKg) - (609 * obeseVal) + (205 * traumaVal) + (451 * burnedVal);
  const iretonTmb = iretonGet / (activityFactor || 1.2);

  // 7. Roza & Shizgal (Variante refinada)
  const rozaTmb = hbTmb;
  const rozaGet = rozaTmb * activityFactor;

  const formulas = [
    {
      formulaName: 'HARRIS BENEDICT (1984)',
      tmb: Math.round(hbTmb),
      get: Math.round(hbGet),
      adjustedGet: Math.round(hbGet * (1 + objectiveAdjustment)),
      notes: 'Fórmula clásica recomendada en adultos sanos y pacientes ambulatorios.'
    },
    {
      formulaName: 'MIFFLIN - ST JEOR',
      tmb: Math.round(mifflinTmb),
      get: Math.round(mifflinGet),
      adjustedGet: Math.round(mifflinGet * (1 + objectiveAdjustment)),
      notes: 'Mayor precisión y validación de la Academy of Nutrition and Dietetics.'
    },
    {
      formulaName: 'LYLE MCDONALD',
      tmb: Math.round(lyleTmb),
      get: Math.round(lyleGet),
      adjustedGet: Math.round(lyleGet * (1 + objectiveAdjustment)),
      notes: 'Método práctico utilizado en composición corporal y recomposición física.'
    },
    {
      formulaName: 'BUTTE (GESTANTES)',
      tmb: Math.round(butteTmb),
      get: Math.round(butteGet),
      adjustedGet: Math.round(butteGet * (1 + objectiveAdjustment)),
      notes: 'Diseñada específicamente para monitoreo de peso y requerimiento en embarazo.'
    },
    {
      formulaName: 'SCHOFIELD (OMS / PEDIÁTRICA)',
      tmb: Math.round(schofieldTmb),
      get: Math.round(schofieldGet),
      adjustedGet: Math.round(schofieldGet * (1 + objectiveAdjustment)),
      notes: 'Fórmula oficial de la OMS/FAO para niños, adolescentes y adultos jóvenes.'
    },
    {
      formulaName: 'IRETON - JONES (HOSPITAL / TRAUMA)',
      tmb: Math.round(iretonTmb),
      get: Math.round(iretonGet),
      adjustedGet: Math.round(iretonGet * (1 + objectiveAdjustment)),
      notes: 'Fórmula hospitalaria que discrimina trauma, quemaduras y obesidad clínica.'
    },
    {
      formulaName: 'ROZA & SHIZGAL',
      tmb: Math.round(rozaTmb),
      get: Math.round(rozaGet),
      adjustedGet: Math.round(rozaGet * (1 + objectiveAdjustment)),
      notes: 'Revisión moderna de Harris-Benedict con menor sobreestimación calórica.'
    }
  ];

  return formulas;
}
