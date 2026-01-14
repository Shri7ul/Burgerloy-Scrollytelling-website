'use client';

import { useRef, useState, useEffect } from 'react';
import { useScroll, useTransform, motion, useReducedMotion } from 'framer-motion';

interface BurgerStoryProps {
    frames1: string[];
    frames2: string[];
}

// Global cache
const imageCache = new Set<string>();

export default function BurgerStory({ frames1, frames2 }: BurgerStoryProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const imgRef = useRef<HTMLImageElement>(null);
    const [currentFrame, setCurrentFrame] = useState(0);
    const [currentSequence, setCurrentSequence] = useState<1 | 2>(1);
    const shouldReduceMotion = useReducedMotion();

    const totalFrames1 = frames1.length;
    const totalFrames2 = frames2.length;

    // Scroll progress for the entire story
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end'],
    });

    // Preload both sequences
    useEffect(() => {
        const preload = (list: string[]) => {
            list.forEach((src) => {
                if (!imageCache.has(src)) {
                    const img = new Image();
                    img.src = src;
                    img.onload = () => imageCache.add(src);
                }
            });
        };

        // Preload first 20 frames of seq1 immediately
        preload(frames1.slice(0, 20));

        // Preload rest of seq1 and start of seq2
        const t1 = setTimeout(() => {
            preload(frames1.slice(20));
            preload(frames2.slice(0, 20));
        }, 1000);

        // Preload rest of seq2
        const t2 = setTimeout(() => preload(frames2.slice(20)), 3000);

        return () => {
            clearTimeout(t1);
            clearTimeout(t2);
        };
    }, [frames1, frames2]);

    // Frame scrubber with unified timeline
    useEffect(() => {
        const unsubscribe = scrollYProgress.on('change', (latest) => {
            if (shouldReduceMotion) return;

            let frameIndex: number;
            let sequence: 1 | 2;

            if (latest < 0.5) {
                // First half: animation1
                sequence = 1;
                const localProgress = latest / 0.5; // Map 0-0.5 to 0-1
                frameIndex = Math.min(
                    Math.max(0, Math.floor(localProgress * (totalFrames1 - 1))),
                    totalFrames1 - 1
                );
            } else {
                // Second half: animation2
                sequence = 2;
                const localProgress = (latest - 0.5) / 0.5; // Map 0.5-1 to 0-1
                frameIndex = Math.min(
                    Math.max(0, Math.floor(localProgress * (totalFrames2 - 1))),
                    totalFrames2 - 1
                );
            }

            if (frameIndex !== currentFrame || sequence !== currentSequence) {
                setCurrentFrame(frameIndex);
                setCurrentSequence(sequence);

                const frameSrc = sequence === 1 ? frames1[frameIndex] : frames2[frameIndex];

                if (imgRef.current) {
                    requestAnimationFrame(() => {
                        if (imgRef.current) imgRef.current.src = frameSrc;
                    });
                }
            }
        });

        return () => unsubscribe();
    }, [scrollYProgress, frames1, frames2, currentFrame, currentSequence, totalFrames1, totalFrames2, shouldReduceMotion]);

    // Text animations based on scroll ranges
    const section1Opacity = useTransform(scrollYProgress, [0, 0.05, 0.2, 0.25], [0, 1, 1, 0]);
    const section2Opacity = useTransform(scrollYProgress, [0.25, 0.3, 0.45, 0.5], [0, 1, 1, 0]);
    const section3Opacity = useTransform(scrollYProgress, [0.5, 0.55, 0.7, 0.75], [0, 1, 1, 0]);
    const section4Opacity = useTransform(scrollYProgress, [0.75, 0.8, 0.85, 0.9], [0, 1, 1, 0]);
    const section5Opacity = useTransform(scrollYProgress, [0.9, 0.95, 1], [0, 1, 1]);

    // Philosophy text rotation
    const philosophyIndex = useTransform(scrollYProgress, (p) => {
        if (p < 0.3) return 0;
        if (p < 0.35) return 1;
        if (p < 0.4) return 2;
        if (p < 0.45) return 3;
        return 3;
    });

    const philosophyTexts = [
        "Aged beef.",
        "Hand-selected produce.",
        "Precision heat.",
        "No shortcuts."
    ];

    const [philosophyText, setPhilosophyText] = useState(philosophyTexts[0]);

    useEffect(() => {
        const unsubscribe = philosophyIndex.on('change', (idx) => {
            setPhilosophyText(philosophyTexts[Math.floor(idx)]);
        });
        return () => unsubscribe();
    }, [philosophyIndex]);

    // Build section text timing
    const searOpacity = useTransform(scrollYProgress, [0.5, 0.55, 0.6, 0.65], [0, 1, 1, 0]);
    const meltOpacity = useTransform(scrollYProgress, [0.6, 0.65, 0.7, 0.72], [0, 1, 1, 0]);
    const crunchOpacity = useTransform(scrollYProgress, [0.7, 0.72, 0.75, 0.77], [0, 1, 1, 0]);

    const initialFrame = frames1[0];

    return (
        <section ref={containerRef} className="relative h-[400vh]">
            <div className="sticky top-0 h-screen w-full overflow-hidden">

                {/* Frame Renderer - CONTAIN and CENTERED */}
                <div className="absolute inset-0 flex items-center justify-center bg-transparent">
                    {shouldReduceMotion ? (
                        <img
                            src={currentSequence === 1 ? frames1[0] : frames2[totalFrames2 - 1]}
                            alt="Burger"
                            className="max-w-full max-h-full object-contain"
                        />
                    ) : (
                        <img
                            ref={imgRef}
                            src={initialFrame}
                            alt="Burger Story"
                            className="max-w-full max-h-full object-contain will-change-transform"
                        />
                    )}
                </div>

                {/* SECTION 1: THE STORM (0-25%) */}
                <motion.div
                    style={{ opacity: section1Opacity }}
                    className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 pointer-events-none px-4"
                >
                    <h1 className="font-display text-7xl md:text-9xl font-black text-white tracking-wider drop-shadow-2xl">
                        BURGERLOY
                    </h1>
                    <p className="mt-4 text-xl md:text-3xl font-light text-amber-500 italic">
                        A $1000 Burger Experience
                    </p>
                    <p className="mt-8 text-lg md:text-xl text-white/80 glass-text-bg">
                        Crafted from chaos.
                    </p>
                </motion.div>

                {/* SECTION 2: PHILOSOPHY (25-50%) */}
                <motion.div
                    style={{ opacity: section2Opacity }}
                    className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none px-4"
                >
                    <motion.p
                        key={philosophyText}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-4xl md:text-6xl font-light text-white text-center glass-text-bg"
                    >
                        {philosophyText}
                    </motion.p>
                </motion.div>

                {/* SECTION 3: THE BUILD (50-75%) */}
                <div className="absolute inset-0 z-10 pointer-events-none">
                    <motion.div
                        style={{ opacity: searOpacity }}
                        className="absolute left-8 md:left-20 top-1/4 text-left"
                    >
                        <h3 className="font-display text-5xl md:text-7xl text-white">SEAR</h3>
                        <p className="mt-2 text-lg md:text-xl text-amber-500 italic">Fire defines flavor.</p>
                    </motion.div>

                    <motion.div
                        style={{ opacity: meltOpacity }}
                        className="absolute right-8 md:right-20 top-1/2 text-right"
                    >
                        <h3 className="font-display text-5xl md:text-7xl text-white">MELT</h3>
                        <p className="mt-2 text-lg md:text-xl text-amber-500 italic">Luxury is elastic.</p>
                    </motion.div>

                    <motion.div
                        style={{ opacity: crunchOpacity }}
                        className="absolute left-8 md:left-20 bottom-1/4 text-left"
                    >
                        <h3 className="font-display text-5xl md:text-7xl text-white">CRUNCH</h3>
                        <p className="mt-2 text-lg md:text-xl text-amber-500 italic">Texture matters.</p>
                    </motion.div>
                </div>

                {/* SECTION 4: THE HERO (75-90%) */}
                <motion.div
                    style={{ opacity: section4Opacity }}
                    className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 pointer-events-none px-4"
                >
                    <h2 className="font-display text-6xl md:text-9xl font-black text-white tracking-wider drop-shadow-2xl">
                        THIS IS BURGERLOY
                    </h2>
                    <p className="mt-6 text-2xl md:text-3xl font-light text-amber-500 italic">
                        Worth every dollar.
                    </p>
                </motion.div>

                {/* SECTION 5: ORDER UP (90-100%) */}
                <motion.div
                    style={{ opacity: section5Opacity }}
                    className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 px-4"
                >
                    <h2 className="font-display text-7xl md:text-9xl font-black text-white tracking-wider drop-shadow-2xl mb-12">
                        ORDER UP
                    </h2>
                    <div className="flex flex-col md:flex-row gap-6 pointer-events-auto">
                        <button className="btn-premium">
                            WATCH THE BUILD
                        </button>
                        <button
                            className="btn-secondary"
                            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        >
                            BACK TO TOP
                        </button>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}
