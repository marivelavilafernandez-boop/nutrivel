'use client';

import React, { useState, useRef, useEffect } from 'react';
import { 
  Sparkles, 
  Send, 
  X, 
  Bot, 
  User, 
  RotateCcw, 
  Heart,
  ChevronDown,
  Minimize2,
  Maximize2
} from 'lucide-react';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  time: string;
}

export const NutriAiAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: '¡Hola, mi futura licenciada Marivel! 💕 Soy **NutriIA**, tu tutora clínica y asistente personal.\n\nTu novio **Jhosep Anthony** me configuró especialmente para acompañarte en tu carrera en la **UNIVIOR**. Puedo resolver tus dudas sobre fórmulas de nutrición, casos clínicos, alimentos bolivianos o cómo usar cualquier sección de tu plataforma. ¿En qué te ayudo hoy?',
      time: new Date().toLocaleTimeString('es-BO', { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const quickPrompts = [
    '¿Cómo uso el Peso Ajustado en obesidad (Wilkens)?',
    '¿Qué alimentos bolivianos tienen más hierro para anemia?',
    '¿Cómo interpreto el tamizaje MUST en hospital?',
    '¿Cómo se calcula el índice cintura-talla y qué significa?',
    '¿Cómo estructuro un diagnóstico PES para diabetes?'
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen && !isMinimized) {
      scrollToBottom();
    }
  }, [messages, isOpen, isMinimized]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputMessage;
    if (!text.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user_${Date.now()}`,
      role: 'user',
      content: text.trim(),
      time: new Date().toLocaleTimeString('es-BO', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputMessage('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMsg].map(m => ({
            role: m.role,
            content: m.content
          }))
        })
      });

      const data = await res.json();

      if (data.reply) {
        const assistantMsg: ChatMessage = {
          id: `ai_${Date.now()}`,
          role: 'assistant',
          content: data.reply,
          time: new Date().toLocaleTimeString('es-BO', { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, assistantMsg]);
      } else {
        throw new Error(data.error || 'No se recibió respuesta');
      }
    } catch (err: any) {
      const errorMsg: ChatMessage = {
        id: `err_${Date.now()}`,
        role: 'assistant',
        content: 'Ocurrió una pequeña interrupción en la conexión con la IA. Por favor intenta de nuevo en unos segundos, mi amor.',
        time: new Date().toLocaleTimeString('es-BO', { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* BOTÓN FLOTANTE */}
      {!isOpen && (
        <button
          onClick={() => {
            setIsOpen(true);
            setIsMinimized(false);
          }}
          className="fixed bottom-20 lg:bottom-6 right-4 lg:right-6 z-40 flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-emerald-500 text-white font-extrabold text-xs shadow-2xl hover:scale-105 active:scale-95 transition-all cursor-pointer ring-4 ring-pink-500/20 group animate-in fade-in"
          title="Abrir NutriIA"
        >
          <div className="relative">
            <Bot className="w-5 h-5 animate-pulse" />
            <span className="absolute -top-1 -right-1 text-[9px]">✨</span>
          </div>
          <span className="tracking-tight">NutriIA • Asistente</span>
        </button>
      )}

      {/* VENTANA CHAT MODAL */}
      {isOpen && (
        <div 
          className={`fixed z-50 transition-all duration-300 flex flex-col ${
            isMinimized 
              ? 'bottom-20 lg:bottom-6 right-4 lg:right-6 w-72 rounded-2xl bg-[#141526] text-white shadow-xl p-3 border border-[#262840]'
              : 'bottom-20 lg:bottom-6 right-3 sm:right-6 w-[94vw] sm:w-[420px] max-w-[440px] h-[550px] max-h-[80vh] rounded-3xl bg-white dark:bg-[#141526] text-gray-800 dark:text-gray-100 shadow-2xl border border-gray-200 dark:border-[#262840] overflow-hidden'
          }`}
        >
          {/* HEADER */}
          <div className="p-3.5 bg-gradient-to-r from-pink-600 via-rose-600 to-emerald-600 text-white flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-sm font-bold shadow-xs">
                🌿
              </div>
              <div>
                <h3 className="text-xs font-extrabold flex items-center gap-1.5 leading-none">
                  <span>NutriIA</span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-white/20 font-normal">Gemini 3.5</span>
                </h3>
                <span className="text-[10px] text-pink-100/90 block mt-0.5">
                  Tutora de Marivel • UNIVIOR
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="p-1 rounded-lg hover:bg-white/20 text-white transition-colors"
                title={isMinimized ? 'Expandir' : 'Minimizar'}
              >
                {isMinimized ? <Maximize2 className="w-3.5 h-3.5" /> : <Minimize2 className="w-3.5 h-3.5" />}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-lg hover:bg-white/20 text-white transition-colors"
                title="Cerrar"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {!isMinimized && (
            <>
              {/* LISTA DE MENSAJES */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-[#f8f9fd] dark:bg-[#0c0d17]/50 text-xs">
                {messages.map(m => {
                  const isUser = m.role === 'user';
                  return (
                    <div
                      key={m.id}
                      className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
                    >
                      <div
                        className={`max-w-[85%] rounded-2xl p-3 leading-relaxed shadow-2xs whitespace-pre-line ${
                          isUser
                            ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-br-xs'
                            : 'bg-white dark:bg-[#1a1c30] text-gray-800 dark:text-gray-100 border border-gray-100 dark:border-[#2b2e4c] rounded-bl-xs'
                        }`}
                      >
                        {m.content}
                      </div>
                      <span className="text-[9px] text-gray-400 mt-1 px-1">
                        {m.time}
                      </span>
                    </div>
                  );
                })}

                {isLoading && (
                  <div className="flex items-center gap-2 p-3 rounded-2xl bg-white dark:bg-[#1a1c30] border border-gray-100 dark:border-[#2b2e4c] text-xs text-gray-500 w-fit">
                    <Bot className="w-4 h-4 text-pink-500 animate-spin" />
                    <span>NutriIA está pensando tu respuesta...</span>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* CHIPS DE PREGUNTAS RÁPIDAS (Si hay pocos mensajes) */}
              {messages.length <= 2 && (
                <div className="p-2.5 bg-gray-50 dark:bg-[#141526] border-t border-gray-100 dark:border-gray-800 shrink-0">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block mb-1.5 px-1">
                    Sugerencias para Marivel:
                  </span>
                  <div className="flex flex-wrap gap-1.5 max-h-20 overflow-y-auto">
                    {quickPrompts.map((prompt, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSendMessage(prompt)}
                        className="text-[10px] py-1 px-2.5 rounded-full bg-white dark:bg-[#1e2038] border border-gray-200 dark:border-[#2e3152] text-gray-600 dark:text-gray-300 hover:border-pink-400 hover:text-pink-600 dark:hover:text-pink-300 transition-colors text-left"
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* INPUT BAR */}
              <div className="p-2.5 bg-white dark:bg-[#141526] border-t border-gray-100 dark:border-gray-800 flex items-center gap-2 shrink-0">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={e => setInputMessage(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Escribe tu duda sobre nutrición o la plataforma..."
                  className="flex-1 text-xs bg-gray-50 dark:bg-[#1a1c30] border border-gray-200 dark:border-[#2b2e4c] rounded-2xl px-3.5 py-2.5 outline-none focus:border-pink-500 dark:focus:border-pink-400 text-gray-900 dark:text-gray-100"
                  disabled={isLoading}
                />
                <button
                  onClick={() => handleSendMessage()}
                  disabled={isLoading || !inputMessage.trim()}
                  className="p-2.5 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 text-white disabled:opacity-40 hover:opacity-95 active:scale-95 transition-all cursor-pointer shadow-md shadow-pink-500/20"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </>
          )}

          {isMinimized && (
            <div 
              onClick={() => setIsMinimized(false)}
              className="text-xs text-gray-300 cursor-pointer hover:text-white flex items-center justify-between"
            >
              <span>Toca para expandir el chat</span>
              <ChevronDown className="w-4 h-4 rotate-180" />
            </div>
          )}
        </div>
      )}
    </>
  );
};
