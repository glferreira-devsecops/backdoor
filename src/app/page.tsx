"use client";

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

interface Host {
  id: string | number;
  image: string;
  name: string;
  chaosLevel: number;
  role: string;
  desc: string;
  traits: string[];
  cancelPercentage?: number;
}

export default function Home() {
  const [osMode, setOsMode] = useState<"normal" | "bsod">("normal");
  const [windows, setWindows] = useState<WindowState[]>([
    { id: 1, title: "ERRO 404: PAUTA", text: "O sistema não encontrou lógica neste podcast.", x: 20, y: 40, visible: true, rotation: -2 }, // Top Left
    // Moved away from center (Illustration Face)
    { id: 2, title: "ALERTA DE CANCELAMENTO", text: "Nível de risco: 87%. Aguarde...", x: -200, y: 300, visible: true, rotation: 3 }, // Bottom Left
    { id: 3, title: "SOLICITAÇÃO DE CUPOM", text: "Cupom CHARME expirado em 2022.", x: 250, y: 100, visible: true, rotation: -1 } // Top Right
  ]);

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
    <main className="min-h-screen font-mono text-black bg-[#C0C0C0] selection:bg-red-600 selection:text-white cursor-none overflow-x-hidden md:pl-12">
      <CustomCursor />
      <CRTOverlay />
      <Processometer />
      <PorchatListener />
      <ExcuseScroll />
      <VanityQuiz />
      <HireCastModal />
      <SketchCounter />

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
          <button onClick={() => alert("Minimizar é fugir da realidade.")} className="hover:bg-blue-600 hover:text-white px-2 cursor-pointer transition-colors flex items-center gap-1">
            <Minus size={12} /> [MINIMIZAR]
          </button>
          <button onClick={() => setOsMode("bsod")} className="hover:bg-red-600 hover:text-white px-2 cursor-pointer transition-colors flex items-center gap-1">
            <X size={12} /> [FECHAR]
          </button>
        </div>
      </header>

      {/* HERO - NEO-BRUTALISM MAIN WINDOW */}
      <section className="pt-24 pb-20 container min-h-screen flex items-center justify-center relative overflow-hidden perspective-1000">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/notebook.png')] opacity-20 pointer-events-none"></div>

        {/* DRAGGABLE FLOATING WINDOWS - NOW RESPONSIVE */}
        <div className="absolute inset-0 pointer-events-none md:pointer-events-auto flex flex-col md:block justify-end pb-20 items-center gap-4 z-20">
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

      {/* ECOLOGIA DA PRODUÇÃO - HORIZONTAL WITH DRAG */}
      <section className="py-20 overflow-hidden bg-white border-y-4 border-black">
        <div className="container px-4 mb-8">
          <h2 className="text-5xl font-black uppercase flex items-center gap-4">
            <Zap className="fill-yellow-400 text-black h-12 w-12" />
            Ecologia da Várzea
          </h2>
          <p className="font-bold animate-pulse">ARRASTE PARA O LADO &rarr;</p>
        </div>

        <motion.div
          className="flex gap-8 px-8 cursor-grab active:cursor-grabbing w-full"
          drag="x"
          dragConstraints={{ right: 0, left: -2000 }}
        >
          {/* TEAM CARDS */}
          {content.production.team.map((member, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05, rotate: 2 }}
              className="w-80 min-w-[320px] bg-gray-100 border-4 border-black p-6 shadow-[8px_8px_0px_#000] flex flex-col justify-between"
            >
              <div>
                <div className="bg-black text-white inline-block px-2 py-1 font-bold text-xs mb-2">FICHA #{i + 1}</div>
                <h3 className="text-2xl font-black uppercase mb-1">{member.name}</h3>
                <h4 className="text-red-600 font-bold uppercase text-sm mb-4 border-b-2 border-black pb-2">{member.role}</h4>
                <p className="font-serif leading-tight">{member.desc}</p>
              </div>
              <div className="mt-4 text-xs font-mono text-gray-400">STATUS: ATIVO</div>
            </motion.div>
          ))}

          {/* ABUSES CARDS */}
          {content.production.abuse.map((abuse, i) => (
            <motion.div
              key={`abuse-${i}`}
              whileHover={{ scale: 1.05, rotate: -2 }}
              className="w-96 min-w-[380px] bg-red-100 border-4 border-red-600 p-6 shadow-[8px_8px_0px_#ff0000] relative"
            >
              <AlertTriangle className="absolute top-2 right-2 text-red-600 h-8 w-8" />
              <h3 className="text-xl font-black uppercase mb-4 pr-8">{abuse.title}</h3>
              <p className="font-mono text-sm">{abuse.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* PARTNERS - REAL PHOTOS REVEAL (REFINED) */}
      <section className="container py-20 px-4">
        <h2 className="text-6xl font-black uppercase text-center mb-16 bg-black text-white inline-block p-4 rotate-1 shadow-[10px_10px_0px_#ff0000]">
          Os Culpados
        </h2>

        <div className="grid lg:grid-cols-3 gap-8">
          {content.profiles.partners.map((host: Host, index: number) => (
            <motion.div
              layout
              key={host.id}
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{
                scale: 1.05,
                rotate: index % 2 === 0 ? 2 : -2,
                boxShadow: "12px 12px 0px black"
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20, delay: index * 0.1 }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-black translate-x-4 translate-y-4 transition-transform group-hover:translate-x-6 group-hover:translate-y-6"></div>

              {/* STAMP OVERLAY */}
              <div className="absolute top-4 right-4 z-30 opacity-70 rotate-[20deg] pointer-events-none border-4 border-red-600 p-2 text-red-600 font-black uppercase text-xl md:text-2xl animate-pulse mix-blend-multiply">
                CONFIDENCIAL
              </div>

              {/* GLITCH OVERLAY (VISUAL NOISE) */}
              <div className="absolute inset-0 z-20 pointer-events-none opacity-0 group-hover:opacity-10 bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')] mix-blend-overlay"></div>

              <div className="relative border-4 border-black bg-white p-0 overflow-hidden">
                {/* IMAGE WITH DITHER EFFECT */}
                <div className="relative aspect-[4/5] bg-gray-200 border-b-4 border-black grayscale contrast-125 group-hover:grayscale-0 transition-all duration-300 cursor-crosshair overflow-hidden">
                  <Image
                    src={host.image}
                    alt={host.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />

                  {/* Chaos Level Bar Overlay */}
                  <div className="absolute bottom-0 left-0 w-full bg-black/80 backdrop-blur-md p-4 text-white translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <div className="flex justify-between text-xs font-bold uppercase mb-1">
                      <span className="text-[#00ff00]">Nível de Caos</span>
                      <span>{host.chaosLevel}/10</span>
                    </div>
                    <div className="w-full h-2 bg-gray-600 rounded-full overflow-hidden mb-4">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${host.chaosLevel * 10}%` }}
                        className="h-full bg-[#00ff00] shadow-[0_0_10px_#00ff00]"
                      />
                    </div>

                    {/* CANCELOMETER - SUPER EDITION */}
                    {host.cancelPercentage && (
                      <div className="border-t border-gray-600 pt-2">
                        <div className="flex justify-between text-xs font-bold uppercase mb-1 text-red-500">
                          <span className="animate-pulse flex items-center gap-1"><AlertTriangle size={10} /> RISCO DE CANCELAMENTO</span>
                          <span className="text-xl font-black">{host.cancelPercentage}%</span>
                        </div>
                        <div className="w-full h-6 bg-gray-800 border-2 border-red-600 relative overflow-hidden skew-x-[-10deg]">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${host.cancelPercentage}%` }}
                            animate={{ opacity: [0.8, 1, 0.8] }}
                            transition={{ repeat: Infinity, duration: 0.2 }}
                            className="h-full bg-[repeating-linear-gradient(45deg,red,red_10px,transparent_10px,transparent_20px)]"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-6 relative">
                  <motion.h3
                    layout
                    className="text-3xl font-black uppercase leading-none mb-2 group-hover:text-red-600 transition-colors"
                  >
                    {host.name}
                  </motion.h3>
                  <p className="font-mono text-xs bg-red-600 text-white inline-block px-2 py-1 mb-4">{host.role}</p>
                  <p className="font-serif text-sm border-l-2 border-black pl-3 mb-4 italic group-hover:bg-yellow-200 transition-colors">
                    &quot;{host.desc}&quot;
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {host.traits.map((t: string) => (
                      <span key={t} className="text-[10px] font-black uppercase border border-black px-2 py-1 hover:bg-black hover:text-[#00ff00] cursor-crosshair transition-colors shadow-[2px_2px_0px_#ccc] hover:shadow-[4px_4px_0px_black] active:shadow-none hover:-translate-y-1 active:translate-y-0">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ASTRAL MAP - NEW SECTION */}
      {content.astral && (
        <section className="bg-purple-900 text-white py-20 border-y-8 border-black">
          <div className="container px-4 text-center">
            <h2 className="text-4xl md:text-6xl font-black uppercase mb-12 flex justify-center gap-4 items-center">
              🔮 MAPA ASTRAL DO CAOS
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {content.astral.map((item, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.1, rotate: (i % 2 === 0 ? 2 : -2) }}
                  className="bg-black border-4 border-purple-500 p-8 shadow-[8px_8px_0px_#fff]"
                >
                  <h3 className="text-2xl font-black uppercase mb-2 text-purple-300">{item.title}</h3>
                  <div className="text-sm font-mono bg-white text-black inline-block px-2 py-1 mb-4 font-bold">{item.sign}</div>
                  <p className="font-serif italic text-lg">&quot;{item.prophecy}&quot;</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* OBSESSIONS TICKER ANIMATED */}
      <section className="bg-yellow-400 border-y-4 border-black py-4 overflow-hidden whitespace-nowrap hover:bg-yellow-300 transition-colors">
        <motion.div
          animate={{ x: [0, -1000] }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          className="inline-block"
        >
          {[...content.obsessions, ...content.obsessions, ...content.obsessions].map((obs, i) => (
            <span key={i} className="text-2xl font-black uppercase mx-8">
              <span className="text-red-600 mr-2">⚠</span> {obs.title}: {obs.desc} <span className="ml-8 text-red-600">●</span>
            </span>
          ))}
        </motion.div>
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

    </main>
  );
}
