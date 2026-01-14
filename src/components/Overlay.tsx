'use client';

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const COLORS = {
  GOLD: '#D4AF37',
  IVORY: '#FFF1E3',
  STONE: '#E2D6C7',
  GRAY: '#B7B0A7',
};

const FX = {
  hero: {
    color: COLORS.GOLD,
    WebkitTextStroke: '1px rgba(0,0,0,0.45)',
    textShadow: `
      0 10px 40px rgba(0,0,0,0.70),
      0 0 45px rgba(212,175,55,0.40),
      0 0 18px rgba(212,175,55,0.22)
    `,
  } as React.CSSProperties,
  headline: {
    color: COLORS.IVORY,
    WebkitTextStroke: '1px rgba(0,0,0,0.45)',
    textShadow: `
      0 10px 40px rgba(0,0,0,0.75),
      0 0 26px rgba(255,241,227,0.22)
    `,
  } as React.CSSProperties,
  sub: {
    color: COLORS.STONE,
    textShadow: `0 6px 22px rgba(0,0,0,0.75)`,
  } as React.CSSProperties,
  micro: {
    color: COLORS.GRAY,
    textShadow: `0 4px 18px rgba(0,0,0,0.85)`,
  } as React.CSSProperties,
  goldGlow: {
    color: COLORS.GOLD,
    WebkitTextStroke: '1px rgba(0,0,0,0.35)',
    textShadow: `
      0 8px 30px rgba(0,0,0,0.70),
      0 0 35px rgba(212,175,55,0.45)
    `,
  } as React.CSSProperties,
};

const TYPE = {
  hero: 'font-display font-black uppercase tracking-[-0.04em] leading-[0.85]',
  headline: 'font-sans font-extrabold uppercase tracking-[0.13em]',
  sub: 'font-sans font-bold tracking-wide',
  micro: 'font-mono font-bold text-[10px] md:text-xs tracking-[0.33em] uppercase opacity-85',
};

const ANIM: any = {
  reveal: {
    hidden: { opacity: 0, scale: 1.14, filter: 'blur(10px)' },
    show: { opacity: 1, scale: 1, filter: 'blur(0px)', transition: { duration: 1.5, ease: [0.16, 1, 0.3, 1] } },
  },
  stagger: {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 1.2, ease: 'easeOut' } },
  },
};

const ReadabilityPlate = ({ scale = 1.2 }: { scale?: number }) => (
  <div
    className="absolute inset-0 -z-10 pointer-events-none blur-2xl"
    style={{
      transform: `scale(${scale})`,
      background:
        'radial-gradient(circle at center, rgba(0,0,0,0.70) 0%, rgba(0,0,0,0.35) 38%, transparent 72%)',
    }}
  />
);

function Section({
  start,
  end,
  children,
  className = '',
}: {
  start: number;
  end: number;
  children: React.ReactNode;
  className?: string;
}) {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [start, start + 0.08, end - 0.08, end], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [start, end], [1, 1.03]);

  return (
    <motion.div style={{ opacity, scale }} className={`fixed top-0 left-0 w-full h-full pointer-events-none z-10 ${className}`}>
      {children}
    </motion.div>
  );
}

export default function Overlay() {
  return (
    <div className="relative w-full h-dvh selection:bg-[#D4AF37]/30">
      <Section start={0} end={0.2} className="flex flex-col items-center justify-center text-center px-4">
        <div className="relative z-10 flex flex-col items-center">
          <ReadabilityPlate scale={1.55} />
          <motion.div initial="hidden" animate="show" className="space-y-10">
            <motion.div variants={ANIM.stagger} className="flex items-center gap-4 justify-center">
              <div className="h-[2px] w-6" style={{ background: 'rgba(183,176,167,0.30)' }} />
              <span className={TYPE.micro} style={FX.micro}>HANDCRAFTED LUXURY</span>
              <div className="h-[2px] w-6" style={{ background: 'rgba(183,176,167,0.30)' }} />
            </motion.div>

            <motion.h1 variants={ANIM.reveal} className={TYPE.hero} style={{ ...FX.hero, fontSize: 'clamp(3.5rem, 11vw, 11rem)' }}>
              BURGERLOY
            </motion.h1>

            <motion.p variants={ANIM.stagger} className={TYPE.sub} style={{ ...FX.sub, fontSize: 'clamp(0.9rem, 1.8vw, 1.5rem)' }}>
              Crafted from chaos. Finished with precision.
            </motion.p>
          </motion.div>
        </div>
      </Section>

      <Section start={0.2} end={0.5} className="flex items-center justify-center text-center px-4">
        <div className="relative z-10 flex flex-col items-center max-w-4xl">
          <ReadabilityPlate scale={1.45} />
          <motion.div initial="hidden" animate="show" className="space-y-8">
            <motion.h2 variants={ANIM.reveal} className={TYPE.headline} style={{ ...FX.headline, fontSize: 'clamp(2.5rem, 7vw, 7.5rem)' }}>
              ENGINEERED <br /> <span style={FX.goldGlow}>FLAVOR</span>
            </motion.h2>

            <div className="w-20 h-[3px] mx-auto" style={{ background: COLORS.GOLD, boxShadow: '0 0 18px rgba(212,175,55,0.65)' }} />

            <motion.p variants={ANIM.stagger} className={TYPE.sub + ' italic'} style={{ ...FX.sub, fontSize: 'clamp(1rem, 2vw, 1.8rem)' }}>
              Dry-aged beef. Precision heat. Zero shortcuts.
            </motion.p>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="absolute right-12 top-1/2 hidden xl:block">
          <div className="flex flex-col items-center gap-2 opacity-70">
            <span className={TYPE.micro + ' rotate-90 origin-center'} style={FX.micro}>EST 2024</span>
            <div className="h-12 w-[1px]" style={{ background: COLORS.GOLD }} />
          </div>
        </motion.div>
      </Section>

      <Section start={0.5} end={0.75} className="flex flex-col items-center justify-center px-4">
        <div className="relative z-10 p-10 flex flex-col items-center">
          <div className="absolute inset-0 -z-10 rounded-full" style={{ background: 'rgba(0,0,0,0.55)', filter: 'blur(60px)', transform: 'scale(1.2)' }} />
          <motion.div initial="hidden" animate="show" className="flex flex-col gap-2 text-center">
            <motion.h2 variants={ANIM.reveal} className="font-sans font-black uppercase tracking-[0.12em]" style={{ ...FX.headline, fontSize: 'clamp(1.8rem, 4.5vw, 4.2rem)' }}>
              CRUNCH.
            </motion.h2>
            <motion.h2 variants={ANIM.reveal} transition={{ delay: 0.18 }} className="font-display font-black uppercase tracking-[0.04em]" style={{ ...FX.goldGlow, fontSize: 'clamp(2.2rem, 5.4vw, 5.1rem)' }}>
              BALANCE.
            </motion.h2>
            <motion.h2 variants={ANIM.reveal} transition={{ delay: 0.36 }} className="font-sans font-black uppercase tracking-[0.12em]" style={{ ...FX.headline, fontSize: 'clamp(1.8rem, 4.5vw, 4.2rem)' }}>
              PRECISION.
            </motion.h2>
          </motion.div>
        </div>
      </Section>

      <Section start={0.72} end={0.93} className="flex flex-col items-center justify-center text-center px-4">
        <div className="relative z-10 flex flex-col items-center">
          <ReadabilityPlate scale={1.7} />
          <motion.div initial="hidden" animate="show" className="space-y-8">
            <motion.h2 variants={ANIM.reveal} className={TYPE.hero} style={{ ...FX.hero, fontSize: 'clamp(3rem, 9.2vw, 9.8rem)' }}>
              THIS IS <br /> <span style={FX.headline}>BURGERLOY</span>
            </motion.h2>

            <div className="space-y-2">
              <motion.p variants={ANIM.stagger} className={TYPE.sub} style={{ ...FX.sub, fontSize: 'clamp(1rem, 2.2vw, 2rem)' }}>
                Worth every dollar.
              </motion.p>
              <motion.p variants={ANIM.stagger} className={TYPE.sub} style={{ ...FX.sub, fontSize: 'clamp(0.85rem, 1.5vw, 1.25rem)', opacity: 0.88 }}>
                Because precision isn’t cheap.
              </motion.p>
            </div>
          </motion.div>
        </div>
      </Section>

      <Section start={0.93} end={1} className="flex flex-col items-center justify-center text-center px-6">
        <div className="relative z-10 flex flex-col items-center w-full max-w-4xl">
          <ReadabilityPlate scale={1.55} />

          <motion.div initial="hidden" animate="show" className="space-y-8 mb-14">
            <motion.h2 variants={ANIM.reveal} className="font-sans font-extrabold uppercase tracking-[0.10em]" style={{ ...FX.headline, fontSize: 'clamp(3.2rem, 8.8vw, 9.4rem)' }}>
              ORDER NOW
            </motion.h2>

            {/* ✅ requested: make the text under ORDER NOW bolder + clearer and move closer */}
            <motion.div variants={ANIM.stagger} className="space-y-2" style={{ marginTop: '-0.25rem' }}>
              <p className="font-sans font-extrabold tracking-wide" style={{ ...FX.sub, fontSize: 'clamp(1.2rem, 2vw, 1.8rem)' }}>
                Limited nightly reservations.
              </p>
              <p className="font-sans font-bold tracking-wide" style={{ ...FX.sub, opacity: 0.92 }}>
                One table. One drop.
              </p>
            </motion.div>

            <p className={TYPE.micro} style={FX.micro}>RESERVATIONS OPEN 12:00 AM</p>
          </motion.div>

          <motion.div variants={ANIM.stagger} className="flex gap-8 pointer-events-auto z-20">
            <button
              className="px-10 py-4 font-extrabold uppercase tracking-widest text-sm transition-all transform hover:scale-105"
              style={{ background: COLORS.GOLD, color: '#000', boxShadow: '0 0 28px rgba(212,175,55,0.60)' }}
            >
              Reserve Table
            </button>
            <button
              className="px-10 py-4 font-bold uppercase tracking-widest text-sm transition-colors"
              style={{ border: `1px solid ${COLORS.GOLD}`, color: COLORS.GOLD, background: 'transparent' }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              Replay
            </button>
          </motion.div>
        </div>
      </Section>
    </div>
  );
}
