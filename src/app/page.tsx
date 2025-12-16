"use client";

import { BioModal } from "@/components/chaos/BioModal";
import { CRTOverlay } from "@/components/chaos/CRTOverlay";
import { ChaosTooltip } from "@/components/chaos/ChaosTooltip";
import { CustomCursor } from "@/components/chaos/CustomCursor";
import { ExcuseScroll } from "@/components/chaos/ExcuseScroll";
import { FloatingWindow } from "@/components/chaos/FloatingWindow";
import { HireCastModal } from "@/components/chaos/HireCastModal";
import { PorchatListener } from "@/components/chaos/PorchatListener";
import { Processometer } from "@/components/chaos/Processometer";
import { SketchCounter } from "@/components/chaos/SketchCounter";
import { TopicGenerator } from "@/components/chaos/TopicGenerator";
import { VanityQuiz } from "@/components/chaos/VanityQuiz";
import { content } from "@/data/content";
import { AnimatePresence, motion } from "framer-motion";
import { AlertTriangle, Minus, Siren, Volume2, X, Zap } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

interface WindowState {
  id: number;
  title: string;
  text: string;
  x: number;
  y: number;
  visible: boolean;
  rotation: number;
}

// Host interface matching content.ts exactly
interface Host {
  id: string;
  name: string;
  role: string;
  image: string;
  chaosLevel: number;
  desc: string;
  traits: string[];
  diagnosis?: string;
  stats?: { [key: string]: string | number | undefined };
  cancelPercentage?: number;
}

// Chaos minimize messages
const MINIMIZE_MESSAGES = [
  "Você acha que pode fugir? O CAOS SEGUE VOCÊ.",
  "MINIMIZAR? Na verdade vou MAXIMIZAR seus problemas...",
  "404: Botão de minimizar não encontrado. Tente o botão de PÂNICO.",
  "Processando fuga covarde... NEGADO.",
  "O Gregório minimizou sua carreira. Você quer fazer o mesmo?",
  "MINIMIZAR é para os fracos. CRESÇA!",
  "Sistema detectou tentativa de escape. Ativando mais janelas...",
  "Você realmente achou que isso ia funcionar? 😂",
  "MINIMIZAR: feature patrocinada por NEM AI™",
  "Desculpa, esse botão está em greve desde 2019.",
  "Parabéns! Você desbloqueou: MAIS CAOS!",
  "O João Vicente também tentou minimizar os processos. Não deu certo.",
];

export default function Home() {
  const [osMode, setOsMode] = useState<"normal" | "bsod">("normal");
  const [selectedProfile, setSelectedProfile] = useState<Host | null>(null);

  // MINIMIZE CHAOS STATE
  const [minimizeAttempts, setMinimizeAttempts] = useState(0);
  const [isMinimizing, setIsMinimizing] = useState(false);
  const [minimizeMessage, setMinimizeMessage] = useState("");

  const [windows, setWindows] = useState<WindowState[]>([
    { id: 1, title: "ERRO 404: PAUTA", text: "O sistema não encontrou lógica neste podcast.", x: 20, y: 40, visible: true, rotation: -2 }, // Top Left
    // Moved away from center (Illustration Face)
    { id: 2, title: "ALERTA DE CANCELAMENTO", text: "Nível de risco: 87%. Aguarde...", x: -200, y: 300, visible: true, rotation: 3 }, // Bottom Left
    { id: 3, title: "SOLICITAÇÃO DE CUPOM", text: "Cupom CHARME expirado em 2022.", x: 250, y: 100, visible: true, rotation: -1 } // Top Right
  ]);

  // CHAOTIC MINIMIZE EFFECT
  const handleMinimize = () => {
    const attempts = minimizeAttempts + 1;
    setMinimizeAttempts(attempts);

    // Pick a random message
    const randomMessage = MINIMIZE_MESSAGES[Math.floor(Math.random() * MINIMIZE_MESSAGES.length)];
    setMinimizeMessage(randomMessage);
    setIsMinimizing(true);

    // Different chaos effects based on attempts
    if (attempts >= 4 && attempts <= 6) {
      // Spawn error windows after 4th click
      const newWindow: WindowState = {
        id: Date.now(),
        title: `ERRO #${attempts}: MINIMIZAR FALHOU`,
        text: randomMessage,
        x: Math.random() * 200 - 100,
        y: Math.random() * 200 + 50,
        visible: true,
        rotation: Math.random() * 10 - 5
      };
      setWindows(prev => [...prev, newWindow]);
    } else if (attempts >= 10) {
      // Too many attempts: BSOD
      setOsMode("bsod");
    }

    // Hide message after 3 seconds
    setTimeout(() => setIsMinimizing(false), 3000);
  };

  const closeWindow = (id: number) => {
    setWindows(windows.map(w => w.id === id ? { ...w, visible: false } : w));
  };

  // Runaway Button Logic
  const [btnPos, setBtnPos] = useState({ x: 0, y: 0 });
  // FORCE SCROLL TO TOP ON LOAD
  useEffect(() => {
    window.history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);
  }, []);

  const runAway = () => {
    const x = (Math.random() - 0.5) * 300;
    const y = (Math.random() - 0.5) * 300;
    setBtnPos({ x, y });
  };

  if (osMode === "bsod") {
    return (
      <div className="min-h-screen bg-blue-800 text-white font-mono p-12 cursor-none" onClick={() => setOsMode("normal")}>
        <h1 className="text-4xl mb-8">FATAL ERROR: NÃO IMPORTA.SYS</h1>
        <p className="mb-4">O sistema encontrou um nível de caos insustentável.</p>
        <p className="mb-8">Detalhes técnicos:</p>
        <ul className="list-disc pl-8 mb-8 space-y-2">
          <li>CODE: JOAO_VICENTE_MEMORY_LEAK</li>
          <li>MODULE: GREGORIO_SLEEP_MODE</li>
          <li>STACK: ESTAGIARIO_OVERFLOW</li>
        </ul>
        <p className="animate-pulse text-yellow-400">Clique em qualquer lugar para reiniciar a Matrix...</p>
      </div>
    );
  }

  return (
    <main
      className="min-h-screen font-mono text-black bg-[#C0C0C0] selection:bg-red-600 selection:text-white overflow-x-hidden md:pl-12 md:cursor-none"
    >
      <CustomCursor />
      <CRTOverlay />
      <Processometer />
      <PorchatListener />
      <ExcuseScroll />
      <VanityQuiz />
      <HireCastModal />
      <SketchCounter />

      {/* CHAOS MINIMIZE MESSAGE OVERLAY */}
      <AnimatePresence>
        {isMinimizing && (
          <motion.div
            initial={{ opacity: 0, y: -100, scale: 0.5 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.8 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-[999] bg-red-600 text-white px-6 py-4 border-4 border-black shadow-[8px_8px_0px_#000] max-w-md text-center"
          >
            <div className="flex items-center gap-3 mb-2">
              <AlertTriangle className="animate-bounce text-yellow-400" />
              <span className="font-black uppercase text-lg">SISTEMA RECUSOU!</span>
              <AlertTriangle className="animate-bounce text-yellow-400" />
            </div>
            <p className="font-mono text-sm">{minimizeMessage}</p>
            <div className="mt-3 text-xs font-bold opacity-80">
              Tentativas de fuga: {minimizeAttempts} | Caos: {Math.min(minimizeAttempts * 10, 100)}%
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HEADER - SYSTEM OS STYLE */}
      <header className="fixed top-0 left-0 w-full z-50 border-b-4 border-black bg-[#C0C0C0] px-2 py-1 flex justify-between items-center shadow-lg font-bold select-none md:pl-14">
        <div className="flex items-center gap-2">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="w-4 h-4 bg-red-600 border-2 border-black"
          />
          <span className="uppercase tracking-tighter hidden md:inline">OS_NÃO_IMPORTA_v2025.exe</span>
        </div>
        <div className="uppercase text-xs flex gap-4">
          <motion.button
            onClick={handleMinimize}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9, rotate: 5 }}
            className="hover:bg-blue-600 hover:text-white px-2 cursor-pointer transition-colors flex items-center gap-1 relative group"
          >
            <Minus size={12} className="group-hover:animate-spin" />
            <span>[MINIMIZAR]</span>
            {minimizeAttempts > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center border border-black font-bold">
                {minimizeAttempts}
              </span>
            )}
          </motion.button>
          <button onClick={() => setOsMode("bsod")} className="hover:bg-red-600 hover:text-white px-2 cursor-pointer transition-colors flex items-center gap-1">
            <X size={12} /> [FECHAR]
          </button>
        </div>
      </header>

      {/* HERO - NEO-BRUTALISM MAIN WINDOW */}
      <section className="pt-24 pb-20 container min-h-screen flex items-center justify-center relative overflow-hidden perspective-1000">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/notebook.png')] opacity-20 pointer-events-none"></div>

        {/* DRAGGABLE FLOATING WINDOWS - DESKTOP ONLY */}
        <div className="absolute inset-0 pointer-events-none md:pointer-events-auto hidden md:block z-20">
          <AnimatePresence>
            {windows.map((win) => (
              <FloatingWindow
                key={win.id}
                {...win}
                onClose={closeWindow}
              />
            ))}
          </AnimatePresence>
        </div>

        <div className="max-w-6xl w-full mx-4 relative z-10">

          {/* MAIN COVER IMAGE */}
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, type: "spring" }}
            className="bg-white border-8 border-black p-4 shadow-[20px_20px_0px_#000] mb-12 group cursor-help relative"
          >
            {/* ... (Cover Content Unchanged) ... */}
            <div className="relative border-4 border-black overflow-hidden">
              <motion.div
                animate={{ rotate: [0, -2, 2, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute bg-red-600 text-white font-black text-xl md:text-3xl px-4 py-2 z-20 top-4 left-4 border-4 border-black shadow-[4px_4px_0px_white]"
              >
                CONTÉM: TRAUMAS
              </motion.div>

              <Image src="/cover_light.png" alt="Capa" width={1200} height={600} className="w-full h-auto grayscale group-hover:grayscale-0 transition-all duration-300" />

              {/* GLITCH OVERLAY */}
              <div className="absolute inset-0 bg-red-600 mix-blend-multiply opacity-0 group-hover:opacity-20 transition-opacity pointer-events-none"></div>
            </div>

            <h1 className="text-[12vw] md:text-[8vw] leading-[0.8] font-black uppercase text-center mt-6 tracking-tighter mix-blend-difference text-black break-words">
              ANATOMIA DO <span className="italic text-transparent bg-clip-text bg-gradient-to-t from-black to-gray-500 block md:inline">CAOS</span>
            </h1>
          </motion.div>

          {/* INTRO TEXT BOX */}
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <motion.div
              whileHover={{ scale: 1.02, rotate: -1 }}
              className="bg-blue-600 border-4 border-black p-6 text-white shadow-[12px_12px_0px_#000]"
            >
              <h2 className="text-2xl font-black uppercase mb-4 border-b-4 border-white pb-2 flex gap-2 items-center">
                <Siren className="animate-pulse" /> Resumo do Desastre
              </h2>
              {content.intro.text.map((t, i) => (
                <p key={i} className="mb-4 font-bold text-lg leading-tight">{t}</p>
              ))}
            </motion.div>



            <motion.div
              whileHover={{ scale: 1.02, rotate: 1 }}
              className="bg-[#ffff00] border-4 border-black p-6 text-black shadow-[12px_12px_0px_#000] rotate-2"
            >
              <div className="font-black text-6xl mb-2">ABSOLUTO</div>
              <div className="font-black text-6xl mb-4 italic">NADA</div>
              <div className="space-y-4">
                <ChaosTooltip content="NÃO CLIQUE AQUI (SÉRIO)" variant="danger">
                  <motion.button
                    animate={{ x: btnPos.x, y: btnPos.y }}
                    onHoverStart={runAway}
                    className="w-full bg-black text-white font-bold py-3 uppercase hover:bg-red-600 transition-colors flex items-center justify-center gap-2 group cursor-pointer relative z-50"
                  >
                    <Volume2 className="group-hover:animate-ping" /> Ouvir Episódio (Mentira)
                  </motion.button>
                </ChaosTooltip>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* TOPIC GENERATOR - REPLACING MANIFESTO */}
      <TopicGenerator />

      {/* 🌿 ECOLOGIA DA VÁRZEA - AWWWARDS COMPLETE REDESIGN */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-gray-100 to-white border-y-8 border-black relative overflow-hidden">
        {/* BACKGROUND TEXTURE */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/graphy.png')] opacity-10 pointer-events-none"></div>

        {/* HEADER */}
        <div className="container px-4 mb-10 md:mb-16 relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
          >
            <div>
              <h2 className="text-3xl md:text-5xl lg:text-7xl font-black uppercase flex items-center gap-2 md:gap-4 tracking-tighter">
                <Zap className="fill-yellow-400 text-black h-8 w-8 md:h-12 md:w-12 lg:h-16 lg:w-16 animate-pulse shrink-0" />
                <span>Ecologia da Várzea</span>
              </h2>
              <p className="font-mono text-gray-600 mt-2 text-sm md:text-base">
                Os bastidores do caos. Quem sofre para o show continuar.
              </p>
            </div>
            <div className="font-bold font-mono bg-black text-white px-4 py-2 text-sm md:text-base shrink-0">
              ⚠️ {content.production.team.length + content.production.abuse.length} FICHAS TÉCNICAS
            </div>
          </motion.div>
        </div>

        {/* RESPONSIVE GRID - WORKS PERFECTLY ON ALL SIZES */}
        <div className="container px-4 relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">

            {/* TEAM CARDS */}
            {content.production.team.map((member, i) => (
              <motion.div
                key={`team-${i}`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.03, rotate: i % 2 === 0 ? 1 : -1 }}
                transition={{ delay: i * 0.1, type: "spring", stiffness: 300 }}
                className="bg-white border-4 border-black p-6 md:p-8 shadow-[8px_8px_0px_#000] relative overflow-hidden group"
              >
                {/* NOISE OVERLAY */}
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-5 transition-opacity pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>

                {/* CARD NUMBER */}
                <div className="absolute top-2 right-2 text-gray-200 font-black text-5xl opacity-50">
                  {String(i + 1).padStart(2, '0')}
                </div>

                <div className="relative z-10">
                  <div className="bg-black text-[#00ff00] border border-[#00ff00] inline-block px-3 py-1 font-mono font-bold text-xs mb-4 shadow-[2px_2px_0px_#00ff00]">
                    FICHA TÉCNICA
                  </div>
                  <h3 className="text-xl md:text-2xl font-black uppercase mb-1 leading-none tracking-tight">{member.name}</h3>
                  <h4 className="text-red-600 font-black uppercase text-xs md:text-sm mb-4 border-b-4 border-black pb-2">{member.role}</h4>
                  <p className="font-serif leading-relaxed text-sm md:text-base italic text-gray-700">{member.desc}</p>
                </div>

                <div className="mt-6 flex justify-between items-center border-t-2 border-dashed border-gray-300 pt-4 relative z-10">
                  <span className="text-xs font-mono text-gray-500 uppercase">STATUS: SOBREVIVENDO</span>
                  <AlertTriangle size={16} className="text-yellow-500" />
                </div>

                {/* BOTTOM ACCENT */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#00ff00] to-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </motion.div>
            ))}

            {/* ABUSE CARDS */}
            {content.production.abuse.map((abuse, i) => (
              <motion.div
                key={`abuse-${i}`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.03, rotate: 1 }}
                transition={{ delay: (content.production.team.length + i) * 0.1, type: "spring", stiffness: 300 }}
                className="bg-red-600 text-white border-4 border-black p-6 md:p-8 shadow-[8px_8px_0px_#000] relative group overflow-hidden"
              >
                {/* PATTERN OVERLAY */}
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')] opacity-10 mix-blend-multiply"></div>

                {/* ALERT ICON */}
                <AlertTriangle className="absolute top-4 right-4 text-black/30 h-10 w-10 md:h-12 md:w-12 animate-pulse" />

                <div className="relative z-10">
                  <div className="bg-white text-black inline-block px-2 py-1 font-black uppercase text-xs mb-4 transform -rotate-2 shadow-lg">
                    ⚠️ ALERTA DE RH
                  </div>
                  <h3 className="text-lg md:text-xl font-black uppercase mb-4 pr-10 leading-tight">{abuse.title}</h3>
                  <p className="font-mono text-sm leading-relaxed opacity-90">{abuse.desc}</p>
                </div>

                {/* BOTTOM ACCENT */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 to-white opacity-50 group-hover:opacity-100 transition-opacity"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PARTNERS - AWWWARDS LEVEL CARDS */}
      <section className="py-24 bg-white border-y-8 border-black relative overflow-hidden">
        {/* BACKGROUND TEXTURE */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/notebook.png')] opacity-30 pointer-events-none"></div>

        <div className="container px-4 relative z-10">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-8xl font-black uppercase inline-block bg-black text-white p-4 md:p-6 rotate-[-1deg] shadow-[12px_12px_0px_#ff0000] mb-4"
            >
              Os Culpados
            </motion.h2>
            <p className="font-mono text-sm md:text-base bg-yellow-400 text-black inline-block px-4 py-2 border-2 border-black shadow-[4px_4px_0px_#000] mt-4">
              CLIQUE PARA ABRIR O DOSSIÊ CONFIDENCIAL
            </p>
          </div>

          {/* RESPONSIVE GRID - 1 COL MOBILE, 3 COL DESKTOP */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {(content.profiles.partners as Host[]).map((host, index) => (
              <motion.div
                layout
                key={host.id}
                onClick={() => setSelectedProfile(host)}
                onTouchEnd={(e) => { e.stopPropagation(); setSelectedProfile(host); }}
                role="button"
                tabIndex={0}
                aria-label={`Ver dossiê de ${host.name}`}
                initial={{ opacity: 0, y: 100, rotate: index === 1 ? 0 : (index === 0 ? -3 : 3) }}
                whileInView={{ opacity: 1, y: 0, rotate: index === 1 ? 0 : (index === 0 ? -2 : 2) }}
                whileHover={{
                  scale: 1.03,
                  rotate: 0,
                  y: -10,
                  transition: { type: "spring", stiffness: 400 }
                }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 300, damping: 20, delay: index * 0.15 }}
                className="group relative cursor-pointer"
                style={{ touchAction: 'manipulation' }}
              >
                {/* SHADOW LAYER */}
                <div className="absolute inset-0 bg-black translate-x-4 translate-y-4 md:translate-x-6 md:translate-y-6 transition-transform group-hover:translate-x-8 group-hover:translate-y-8"></div>

                {/* CONFIDENCIAL STAMP */}
                <motion.div
                  animate={{ rotate: [15, 25, 15] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="absolute top-4 right-4 md:top-6 md:right-6 z-30 pointer-events-none border-4 border-red-600 px-3 py-1 text-red-600 font-black uppercase text-sm md:text-xl rotate-[20deg] mix-blend-multiply"
                >
                  CONFIDENCIAL
                </motion.div>

                {/* GLITCH/NOISE OVERLAY */}
                <div className="absolute inset-0 z-20 pointer-events-none opacity-0 group-hover:opacity-20 bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')] mix-blend-overlay transition-opacity duration-300"></div>

                {/* CARD BODY */}
                <div className="relative border-4 md:border-8 border-black bg-white overflow-hidden">
                  {/* IMAGE CONTAINER */}
                  <div className="relative aspect-[3/4] bg-gray-200 border-b-4 md:border-b-8 border-black overflow-hidden">
                    <Image
                      src={host.image}
                      alt={host.name}
                      fill
                      className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />

                    {/* SCANLINES OVERLAY */}
                    <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.03)_2px,rgba(0,0,0,0.03)_4px)] pointer-events-none"></div>

                    {/* CHAOS & CANCEL BAR (APPEARS ON HOVER) */}
                    <div className="absolute bottom-0 left-0 w-full bg-black/90 backdrop-blur-md p-4 md:p-6 text-white translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                      {/* CHAOS LEVEL */}
                      <div className="flex justify-between text-xs md:text-sm font-bold uppercase mb-2">
                        <span className="text-[#00ff00] flex items-center gap-1"><Zap size={14} className="animate-pulse" /> Nível de Caos</span>
                        <span className="text-2xl font-black">{host.chaosLevel}/10</span>
                      </div>
                      <div className="w-full h-3 bg-gray-800 border-2 border-[#00ff00] rounded-sm overflow-hidden mb-4">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${host.chaosLevel * 10}%` }}
                          transition={{ delay: 0.3, duration: 1 }}
                          className="h-full bg-gradient-to-r from-yellow-400 to-[#00ff00] shadow-[0_0_10px_#00ff00]"
                        />
                      </div>

                      {/* CANCELOMETER */}
                      {host.cancelPercentage && (
                        <div className="border-t border-gray-700 pt-3">
                          <div className="flex justify-between text-xs md:text-sm font-bold uppercase mb-2">
                            <span className="text-red-500 flex items-center gap-1"><AlertTriangle size={14} className="animate-bounce" /> Risco Cancelamento</span>
                            <span className="text-2xl font-black text-red-500">{host.cancelPercentage}%</span>
                          </div>
                          <div className="w-full h-4 bg-gray-900 border-2 border-red-600 overflow-hidden skew-x-[-5deg]">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: `${host.cancelPercentage}%` }}
                              transition={{ delay: 0.5, duration: 1.2 }}
                              className="h-full bg-[repeating-linear-gradient(45deg,red,red_8px,darkred_8px,darkred_16px)]"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* TEXT CONTENT */}
                  <div className="p-4 md:p-6 bg-white relative">
                    {/* ID TAG */}
                    <div className="absolute top-0 right-4 -translate-y-1/2 bg-[#00ff00] text-black font-mono text-[10px] md:text-xs font-bold px-2 py-1 border-2 border-black shadow-[2px_2px_0px_#000]">
                      ID: {host.id.toUpperCase()}_007
                    </div>

                    <h3 className="text-2xl md:text-4xl font-black uppercase leading-none mb-2 group-hover:text-red-600 transition-colors tracking-tight">
                      {host.name}
                    </h3>
                    <p className="font-mono text-xs md:text-sm bg-red-600 text-white inline-block px-2 py-1 mb-4 shadow-[2px_2px_0px_#000]">
                      {host.role}
                    </p>
                    <p className="font-serif text-sm md:text-base border-l-4 border-black pl-3 italic leading-snug line-clamp-3 group-hover:bg-yellow-200 transition-colors">
                      {host.desc.split('.')[0]}.
                    </p>

                    {/* CTA */}
                    <div className="mt-4 pt-4 border-t-2 border-dashed border-gray-300 flex items-center justify-between">
                      <span className="font-mono text-[10px] md:text-xs text-gray-500 uppercase">Ver Dossiê</span>
                      <motion.div
                        animate={{ x: [0, 5, 0] }}
                        transition={{ repeat: Infinity, duration: 1 }}
                        className="text-red-600 font-black"
                      >
                        →
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 🔮 MAPA ASTRAL DO CAOS - AWWWARDS SECTION */}
      {content.astral && (
        <section className="bg-gradient-to-br from-purple-950 via-purple-900 to-black text-white py-16 md:py-24 border-y-8 border-purple-500 relative overflow-hidden">
          {/* COSMIC BACKGROUND */}
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30 pointer-events-none"></div>
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-10 left-10 w-4 h-4 bg-white rounded-full animate-pulse opacity-60"></div>
            <div className="absolute top-1/4 right-20 w-2 h-2 bg-purple-300 rounded-full animate-ping opacity-40"></div>
            <div className="absolute bottom-20 left-1/4 w-3 h-3 bg-yellow-300 rounded-full animate-pulse opacity-50"></div>
            <div className="absolute top-1/2 right-1/3 w-2 h-2 bg-white rounded-full animate-ping opacity-30"></div>
          </div>

          <div className="container px-4 relative z-10">
            {/* HEADER */}
            <div className="text-center mb-12 md:mb-16">
              <motion.div
                initial={{ opacity: 0, y: -30 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="inline-block"
              >
                <div className="text-6xl md:text-8xl mb-4">🔮</div>
                <h2 className="text-3xl md:text-5xl lg:text-7xl font-black uppercase tracking-tighter">
                  MAPA ASTRAL DO CAOS
                </h2>
                <p className="font-mono text-purple-300 mt-4 text-sm md:text-base max-w-xl mx-auto">
                  As profecias que o Universo tem para quem deveria ter ficado quieto.
                </p>
              </motion.div>
            </div>

            {/* ASTRAL CARDS GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
              {content.astral.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 50, rotate: i % 2 === 0 ? -2 : 2 }}
                  whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                  whileHover={{
                    scale: 1.05,
                    rotate: i % 2 === 0 ? 2 : -2,
                    boxShadow: "0 0 30px rgba(147, 51, 234, 0.5)"
                  }}
                  transition={{ delay: i * 0.1, type: "spring", stiffness: 300 }}
                  className="bg-black/80 backdrop-blur-sm border-4 border-purple-500 p-6 md:p-8 shadow-[8px_8px_0px_#9333ea] relative group overflow-hidden"
                >
                  {/* MYSTICAL GLOW */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  {/* ZODIAC NUMBER */}
                  <div className="absolute top-2 right-2 text-purple-700 font-black text-4xl opacity-20">
                    {String(i + 1).padStart(2, '0')}
                  </div>

                  {/* CONTENT */}
                  <div className="relative z-10">
                    <h3 className="text-xl md:text-2xl font-black uppercase mb-3 text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300">
                      {item.title}
                    </h3>
                    <div className="text-xs md:text-sm font-mono bg-gradient-to-r from-purple-500 to-pink-500 text-white inline-block px-3 py-1 mb-4 font-bold shadow-lg">
                      ✨ {item.sign}
                    </div>
                    <p className="font-serif italic text-base md:text-lg text-purple-100 leading-relaxed">
                      &quot;{item.prophecy}&quot;
                    </p>
                  </div>

                  {/* BOTTOM DECORATION */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 opacity-50 group-hover:opacity-100 transition-opacity"></div>
                </motion.div>
              ))}
            </div>

            {/* FOOTER NOTE */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-center font-mono text-purple-400 mt-12 text-xs md:text-sm"
            >
              ⚠️ Profecias geradas por IA treinada com os tweets deletados do João Vicente.
            </motion.p>
          </div>
        </section>
      )}

      {/* OBSESSIONS TICKER - AWWWARDS SMOOTH MARQUEE */}
      <section className="bg-yellow-400 border-y-4 border-black py-4 overflow-hidden whitespace-nowrap hover:bg-yellow-300 transition-colors group">
        <div
          className="inline-flex animate-marquee group-hover:[animation-play-state:paused]"
          style={{
            animation: 'marquee 60s linear infinite',
          }}
        >
          {[...content.obsessions, ...content.obsessions, ...content.obsessions, ...content.obsessions].map((obs, i) => (
            <span
              key={i}
              className="text-xl md:text-2xl font-black uppercase mx-6 md:mx-10 flex items-center gap-2 shrink-0"
            >
              <span className="text-red-600 animate-pulse">⚠</span>
              <span className="text-black">{obs.title}:</span>
              <span className="font-bold text-gray-800">{obs.desc}</span>
              <span className="text-red-600 ml-4">●</span>
            </span>
          ))}
        </div>
        <style jsx>{`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee {
            animation: marquee 60s linear infinite;
            will-change: transform;
          }
        `}</style>
      </section>

      {/* FOOTER */}
      <footer className="bg-black text-white p-12 text-center border-t-8 border-red-600 relative overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-white opacity-5 mix-blend-overlay"
          animate={{ opacity: [0.05, 0.1, 0.05] }}
          transition={{ repeat: Infinity, duration: 0.5 }}
        />
        <h3 className="text-2xl font-black uppercase mb-4 relative z-10">NÃO IMPORTA © 2025</h3>
        <p className="font-mono text-gray-500 text-sm max-w-lg mx-auto relative z-10">
          Este site carrega rápido. Diferente do raciocínio do João Vicente.
          <br /><br />
          <a href="https://www.rettecnologia.org/" target="_blank" rel="noopener noreferrer" className="text-[#00ff00] font-bold hover:underline hover:text-white transition-colors">
            Powered by RET Tecnologia - Porque alguém tem que trabalhar.
          </a>
        </p>
      </footer>

      {/* MODALS */}
      <BioModal profile={selectedProfile} onClose={() => setSelectedProfile(null)} />
    </main >
  );
}
