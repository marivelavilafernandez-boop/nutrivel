'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { 
  Heart, 
  Sparkles, 
  GraduationCap, 
  Smile, 
  Send, 
  Coffee, 
  Stars, 
  Music,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';

interface FloatingHeart {
  id: number;
  x: number;
  icon: string;
  size: number;
}

export const LoveLetterView: React.FC = () => {
  const [loveCount, setLoveCount] = useState<number>(1);
  const [floatingHearts, setFloatingHearts] = useState<FloatingHeart[]>([]);
  const [activeNoteIndex, setActiveNoteIndex] = useState<number | null>(null);
  const [currentAffirmationIndex, setCurrentAffirmationIndex] = useState<number>(0);

  const affirmations = [
    '¡Eres la mujer más hermosa, dulce e inteligente del universo, mi amorchito! 🌹',
    '¡Te amo kaka con toda mi alma y mi corazón! 💖',
    '¡Vas a ser la mejor Nutrióloga de Bolivia y de todo el mundo, mi amorchito! 🥗🎓',
    '¡Aquí está tu potito para cuidarte, apoyarte y darte besitos siempre! 🥰',
    '¡Estoy inmensamente orgulloso de tu dedicación en la UNIVIOR, mi vida hermosa! 🌟',
    '¡Nunca olvides lo valiosa, capaz y brillante que eres, mi amorchito bella! ✨',
    '¡Te amo kaka, hoy, mañana y hasta viejitos juntos! 💑❤️'
  ];

  const emergencyNotes = [
    {
      title: '📖 Para cuando tengas un examen o entrega pesada',
      badge: 'Ánimo',
      color: 'from-amber-500/20 to-orange-500/10 border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-200',
      message: 'Mi vida, sé que a veces la carrera exige mucho, pero recuerda que eres extremadamente inteligente y capaz. Respira hondo, confía en lo que estudiaste y da lo mejor de ti. ¡Pase lo que pase, para mí ya eres la número uno!'
    },
    {
      title: '🩺 Para cuando salgas cansada del hospital o pasantía',
      badge: 'Descanso',
      color: 'from-emerald-500/20 to-teal-500/10 border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200',
      message: 'Tu vocación de ayudar a las personas y sanar vidas a través de la alimentación es algo hermoso que admiro todos los días. Ahora te toca descansar, tomar tu agüita y dejarte consentir. ¡Te mereces el mundo entero!'
    },
    {
      title: '💌 Para cuando me extrañes o necesites un abrazo',
      badge: 'Amor puro',
      color: 'from-pink-500/20 to-rose-500/10 border-pink-200 dark:border-pink-800 text-pink-800 dark:text-pink-200',
      message: 'Cierra los ojos un momento y siente este abrazo apretado de tu potito. Recuerda que tu novio te ama kaka con toda su alma y que no importa la hora ni la distancia, siempre estoy a tu lado cuidándote, mi amorchito hermosa.'
    }
  ];

  const handleSendLove = () => {
    setLoveCount(prev => prev + 1);
    setCurrentAffirmationIndex(prev => (prev + 1) % affirmations.length);

    // Generar ráfaga de corazones flotantes
    const heartIcons = ['💖', '💕', '💓', '💗', '❤️', '🥰', '✨', '🌸', '💋'];
    const newHearts: FloatingHeart[] = Array.from({ length: 6 }).map((_, i) => ({
      id: Date.now() + i + Math.random(),
      x: Math.floor(Math.random() * 80) + 10, // 10% a 90% del ancho
      icon: heartIcons[Math.floor(Math.random() * heartIcons.length)],
      size: Math.floor(Math.random() * 16) + 20 // 20px a 36px
    }));

    setFloatingHearts(prev => [...prev, ...newHearts]);

    // Limpiar corazones después de la animación (2 segundos)
    setTimeout(() => {
      setFloatingHearts(prev => prev.filter(h => !newHearts.some(nh => nh.id === h.id)));
    }, 2000);
  };

  return (
    <div className="space-y-6 pb-16 animate-in fade-in duration-300 relative overflow-hidden">
      
      {/* Contenedor de corazones flotantes animados en pantalla */}
      <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
        {floatingHearts.map(h => (
          <div
            key={h.id}
            className="absolute bottom-10 animate-float-love transition-transform select-none"
            style={{
              left: `${h.x}%`,
              fontSize: `${h.size}px`
            }}
          >
            {h.icon}
          </div>
        ))}
      </div>

      {/* 1. HERO BANNER ROMÁNTICO */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-pink-500 via-rose-500 to-red-500 text-white p-6 sm:p-8 shadow-xl shadow-pink-500/25">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/15 rounded-full blur-3xl pointer-events-none -mr-16 -mt-16"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-pink-400/20 rounded-full blur-2xl pointer-events-none -ml-10 -mb-10"></div>

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-bold mb-3 shadow-xs">
              <Heart className="w-3.5 h-3.5 fill-white animate-pulse" />
              <span>De Jhosep Anthony para Marivel • Con todo mi amor</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              ¡Hola, mi hermosa Marivel Avila Fernandez! 💕
            </h1>
            <p className="text-sm sm:text-base text-pink-100 max-w-xl mt-2 leading-relaxed">
              Quería darte este rincón especial en tu plataforma para recordarte lo mucho que te amo y lo infinitamente orgulloso que estoy de ti.
            </p>
          </div>

          {/* Contador de dosis de amor */}
          <div className="bg-white/15 backdrop-blur-md border border-white/25 rounded-2xl p-4 text-center shrink-0 w-full md:w-auto">
            <span className="text-[11px] font-bold uppercase tracking-wider text-pink-100 block">
              Dosis de amor entregadas
            </span>
            <div className="text-3xl font-extrabold text-white mt-0.5 flex items-center justify-center gap-1.5">
              <span>{loveCount}</span>
              <span className="text-xl">❤️</span>
            </div>
            <span className="text-[11px] text-pink-200 mt-1 block font-medium">
              {loveCount === 1 ? '¡Presiona el botón para darme más amor!' : '¡Amor infinito e incondicional!'}
            </span>
          </div>
        </div>
      </div>

      {/* 2. TARJETA PRINCIPAL CON FOTO Y CARTA */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Columna Izquierda: Foto de los dos (5 cols) */}
        <div className="lg:col-span-5 bg-white dark:bg-[#18221f] rounded-3xl p-5 border border-pink-100 dark:border-pink-950/50 shadow-lg flex flex-col items-center justify-between text-center relative overflow-hidden group">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-pink-100 dark:bg-pink-950/20 rounded-full blur-2xl pointer-events-none"></div>

          <div className="w-full">
            {/* Foto con borde rosa brillante */}
            <div className="relative mx-auto rounded-2xl overflow-hidden ring-4 ring-pink-400/40 shadow-xl max-w-sm aspect-[4/3] bg-pink-50">
              <Image 
                src="/amor.jpg" 
                alt="Marivel y yo"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                priority
              />
              <div className="absolute bottom-2 left-2 right-2 px-3 py-1.5 rounded-xl bg-black/60 backdrop-blur-md text-white text-[11px] font-medium flex items-center justify-between">
                <span>Juntos siempre ❤️</span>
                <span className="text-pink-300 font-bold">Tú & Yo</span>
              </div>
            </div>

            <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mt-4">
              Marivel Avila Fernandez & Jhosep Anthony
            </h3>
            <p className="text-xs text-pink-600 dark:text-pink-400 font-semibold">
              Juntos en cada meta y en cada sueño • Mi amor eterno
            </p>
          </div>

          {/* Botón interactivo de efecto de amor */}
          <div className="w-full mt-6 pt-4 border-t border-gray-100 dark:border-gray-800">
            <button
              onClick={handleSendLove}
              className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-pink-500 via-rose-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white font-extrabold text-sm shadow-lg shadow-pink-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Heart className="w-5 h-5 fill-white animate-bounce" />
              <span>¡Toca aquí para enviarte amor! 💖</span>
            </button>
            <p className="text-[11px] text-gray-400 mt-2 italic">
              (Cada vez que lo tocas, se liberan corazoncitos y un nuevo mensaje)
            </p>
          </div>
        </div>

        {/* Columna Derecha: Carta de Amor y Afirmación Dinámica (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          
          {/* Mensaje dinámico / Afirmación destacada */}
          <div className="p-5 rounded-3xl bg-gradient-to-br from-pink-50 via-rose-50/50 to-amber-50/40 dark:from-pink-950/30 dark:via-rose-950/20 dark:to-[#18221f] border border-pink-200/70 dark:border-pink-900/40 shadow-xs">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-pink-600 dark:text-pink-400 mb-2">
              <Sparkles className="w-4 h-4 text-pink-500" />
              <span>Un pensamiento para ti hoy</span>
            </div>
            <p className="text-base sm:text-lg font-bold text-gray-800 dark:text-gray-100 italic leading-snug">
              &quot;{affirmations[currentAffirmationIndex]}&quot;
            </p>
          </div>

          {/* Carta de Amor Sincera */}
          <div className="flex-1 bg-white dark:bg-[#18221f] rounded-3xl p-6 border border-gray-100 dark:border-[#293a34] shadow-xs flex flex-col justify-between">
            <div className="space-y-3.5 text-xs sm:text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
              <p className="font-semibold text-gray-900 dark:text-gray-100 text-base">
                Mi amorchito linda (te amo kaka ❤️),
              </p>
              
              <p>
                Quiero escribirte estas líneas para decirte desde lo más profundo de mi corazón lo mucho que <strong className="text-pink-600 dark:text-pink-400">te amo</strong> y lo profundamente orgulloso que estoy de ti.
              </p>

              <p>
                Sé todo el sacrificio, el cansancio y las horas de desvelo que le dedicas a tu carrera de <strong>Nutrición y Dietética en la UNIVIOR</strong>. Veo tu entrega con cada materia, cada cálculo dietoterapéutico, cada caso clínico y cada práctica hospitalaria. Tienes una vocación inmensa y un corazón noble que va a tocar positivamente la vida de muchísimas personas.
              </p>

              <p>
                Hice todo esto con mucho cariño para ti, para que tengas una herramienta que te facilite la vida como estudiante y futura licenciada. Pero por encima de cualquier nota o trabajo, quiero que nunca olvides que <strong>eres una mujer increíble, brillante y hermosa</strong>, y que aquí siempre estará tu novio para cuidarte, apoyarte y aplaudir cada uno de tus triunfos.
              </p>

              <p className="pt-2 font-bold text-pink-600 dark:text-pink-400 text-sm">
                ¡Te amo kaka con todo mi corazón, hoy, mañana y siempre, mi amorchito! ❤️✨
              </p>
            </div>

            <div className="mt-5 pt-4 border-t border-gray-100 dark:border-gray-800 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-gray-400 gap-2">
              <span>Creado con devoción para mi futura licenciada</span>
              <span className="font-extrabold text-pink-600 dark:text-pink-400 text-xs">
                Tu novio (tu potito): Jhosep Anthony Caceres Saldaña 💑
              </span>
            </div>
          </div>

        </div>

      </div>

      {/* 3. CAJITAS DE ÁNIMO PARA MOMENTOS DE ESTUDIO */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Heart className="w-4 h-4 text-pink-500 fill-pink-500" />
          <h3 className="text-sm font-extrabold uppercase tracking-wider text-gray-700 dark:text-gray-300">
            Cajitas de Ánimo para tus Días en la UNIVIOR
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {emergencyNotes.map((note, index) => {
            const isOpen = activeNoteIndex === index;
            return (
              <div
                key={index}
                onClick={() => setActiveNoteIndex(isOpen ? null : index)}
                className={`p-4 rounded-3xl border transition-all cursor-pointer bg-white dark:bg-[#18221f] shadow-xs hover:shadow-md ${
                  isOpen 
                    ? 'border-pink-500 ring-2 ring-pink-500/20' 
                    : 'border-gray-100 dark:border-gray-800 hover:border-pink-300'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <h4 className="text-xs font-bold text-gray-800 dark:text-gray-100 leading-snug">
                    {note.title}
                  </h4>
                  <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full border shrink-0 ${note.color}`}>
                    {note.badge}
                  </span>
                </div>

                {isOpen ? (
                  <p className="text-xs text-gray-600 dark:text-gray-300 mt-3 pt-3 border-t border-gray-100 dark:border-gray-800 leading-relaxed animate-in fade-in duration-150">
                    {note.message}
                  </p>
                ) : (
                  <div className="flex items-center justify-between mt-3 text-[11px] text-pink-600 dark:text-pink-400 font-semibold">
                    <span>Toca para abrir cartita</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
