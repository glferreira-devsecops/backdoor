"use client";

export function CRTOverlay() {
    return (
        <div className="fixed inset-0 pointer-events-none z-[9998] opacity-20 hidden md:block mix-blend-overlay">
            <div className="absolute inset-0 bg-[url('https://media.giphy.com/media/oEI9uBYSzLpBK/giphy.gif')] opacity-10"></div>
            <div className="w-full h-1 bg-white opacity-20 absolute animate-scanline"></div>
        </div>
    );
}
