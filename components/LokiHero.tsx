'use client';

import { useEffect, useState } from 'react';
import { fonts } from '@/lib/fonts';

export default function LokiHero() {
  const word = 'FILI';
  const [letterFonts, setLetterFonts] = useState<string[]>([]);

  useEffect(() => {
    // Initialize with random fonts for each letter independently
    setLetterFonts(word.split('').map(() => 
      fonts[Math.floor(Math.random() * fonts.length)]
    ));

    // Change fonts every 500ms - each letter gets its own random font simultaneously
    const interval = setInterval(() => {
      setLetterFonts(prevFonts => 
        word.split('').map((_, index) => {
          // Each letter gets a completely independent random font
          let newFont;
          do {
            newFont = fonts[Math.floor(Math.random() * fonts.length)];
          } while (newFont === prevFonts[index] && fonts.length > 1); // Avoid same font if possible
          return newFont;
        })
      );
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-full min-h-screen flex items-center justify-center bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/5 to-black pointer-events-none" />
      
      <div className="flex items-center justify-center gap-2 md:gap-5 px-4">
        {word.split('').map((letter, index) => (
          <span
            key={`${letter}-${index}`}
            className="inline-block text-[15vh] md:text-[30vh] lg:text-[45vh] font-bold leading-none"
            style={{
              fontFamily: letterFonts[index] || 'Arial',
              textShadow: `
                0 0 10px rgba(245, 245, 245, 0.8),
                0 0 20px rgba(245, 245, 245, 0.8),
                0 0 30px rgba(245, 245, 245, 0.8),
                0 0 40px rgba(245, 245, 245, 0.6)
              `,
              transition: 'font-family 0.2s ease-in-out',
            }}
          >
            {letter}
          </span>
        ))}
      </div>
    </section>
  );
}
