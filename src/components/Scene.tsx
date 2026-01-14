'use client';

import { useRef, ReactNode } from 'react';
import { useScroll, useTransform, motion, MotionValue } from 'framer-motion';
import clsx from 'clsx';
import FrameSequence from './FrameSequence';

interface SceneProps {
    frames: string[];
    animationId: string;
    labels: string[];
    title: string;
    subtitle: string;
    className?: string;
}

export default function Scene({ frames, animationId, labels, title, subtitle, className }: SceneProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    // We can also pass local scroll progress for overlays
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end']
    });

    const fadeIn = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 }
    };

    // Opacity for main title based on early scroll
    const titleOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
    const titleY = useTransform(scrollYProgress, [0, 0.2], [50, 0]);

    return (
        <section ref={containerRef} className={clsx("relative h-[300vh]", className)}>
            <div className="sticky top-0 h-screen w-full overflow-hidden">

                {/* The Frame Sequence Background */}
                <FrameSequence
                    frames={frames}
                    scrollTarget={containerRef}
                    debugName={animationId}
                    preloadStrategy={animationId === 'animation1' ? 'immediate' : 'lazy'}
                />

                {/* Content Overlay */}
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none">

                    {/* Main Hero Text (Fades in/out) */}
                    <motion.div
                        style={{ opacity: titleOpacity, y: titleY }}
                        className="text-center"
                    >
                        <h2 className="text-6xl md:text-9xl font-black uppercase tracking-tighter text-white drop-shadow-2xl mix-blend-overlay">
                            {title}
                        </h2>
                        <p className="mt-4 text-xl md:text-2xl font-light text-amber-500 uppercase tracking-widest glass-text-bg inline-block">
                            {subtitle}
                        </p>
                    </motion.div>

                    {/* Scroll-triggered Labels */}
                    {/* Just a simple example distribution */}
                    <LabelTrigger progress={scrollYProgress} start={0.2} text={labels[0]} align="left" />
                    <LabelTrigger progress={scrollYProgress} start={0.5} text={labels[1]} align="center" />
                    <LabelTrigger progress={scrollYProgress} start={0.8} text={labels[2]} align="right" />

                </div>
            </div>
        </section>
    );
}

function LabelTrigger({ progress, start, text, align }: { progress: MotionValue<number>, start: number, text: string, align: 'left' | 'center' | 'right' }) {
    // Reveal around the start point
    const opacity = useTransform(progress, [start - 0.05, start, start + 0.15], [0, 1, 0]);
    const y = useTransform(progress, [start - 0.05, start], [50, 0]);

    const alignmentClasses = {
        left: 'left-10 md:left-20 top-1/3',
        center: 'left-1/2 -translate-x-1/2 bottom-20',
        right: 'right-10 md:right-20 top-2/3'
    };

    return (
        <motion.div
            style={{ opacity, y }}
            className={`absolute ${alignmentClasses[align]} text-4xl font-bold text-white drop-shadow-lg`}
        >
            <span className="glass-text-bg border-l-4 border-amber-500 pl-4">{text}</span>
        </motion.div>
    );
}
