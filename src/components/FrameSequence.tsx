'use client';

import { useRef, useEffect, useState } from 'react';
import { useScroll, useMotionValueEvent, useTransform, useReducedMotion, motion } from 'framer-motion';

interface FrameSequenceProps {
    frames: string[];
    scrollTarget: React.RefObject<HTMLElement | null>;
    preloadStrategy?: 'immediate' | 'lazy';
    debugName?: string;
}

// Global cache to prevent re-downloading across re-renders
const imageCache = new Set<string>();

export default function FrameSequence({ frames, scrollTarget, preloadStrategy = 'immediate', debugName = 'Seq' }: FrameSequenceProps) {
    const imgRef = useRef<HTMLImageElement>(null);
    const [currentFrame, setCurrentFrame] = useState(0);
    const totalFrames = frames.length;
    const shouldReduceMotion = useReducedMotion();

    // Scroll progress for the passed container
    const { scrollYProgress } = useScroll({
        target: scrollTarget,
        offset: ['start start', 'end end'],
    });

    // Preload logic
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

        if (preloadStrategy === 'immediate') {
            // Preload first 10 immediately
            preload(frames.slice(0, 20));

            // Preload rest lazily
            const t = setTimeout(() => preload(frames.slice(20)), 2000);
            return () => clearTimeout(t);
        } else {
            // Lazy strategy: preload when we get close? 
            // For now, simpler to just preload a chunk on mount then the rest
            const t = setTimeout(() => preload(frames), 500); // slightly delayed
            return () => clearTimeout(t);
        }
    }, [frames, preloadStrategy]);

    // Frame scrubber
    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        if (shouldReduceMotion) return; // Handled separately

        const index = Math.min(
            Math.max(0, Math.floor(latest * (totalFrames - 1))),
            totalFrames - 1
        );

        if (index !== currentFrame) {
            setCurrentFrame(index);
            if (imgRef.current) {
                requestAnimationFrame(() => {
                    if (imgRef.current) imgRef.current.src = frames[index];
                });
            }
        }
    });

    // Motion values for opacity transitions if reduced motion
    const firstFrameOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const lastFrameOpacity = useTransform(scrollYProgress, [0.5, 1], [0, 1]);

    if (frames.length === 0) return null;

    return (
        <div className="h-full w-full absolute inset-0">
            {/* Debug Badge */}
            <div className="absolute top-4 right-4 z-50 bg-black/50 text-white text-xs px-2 py-1 rounded backdrop-blur font-mono pointer-events-none opacity-0 hover:opacity-100 transition-opacity">
                {debugName}: {currentFrame}/{totalFrames}
            </div>

            {shouldReduceMotion ? (
                <>
                    <motion.img
                        src={frames[0]}
                        alt="Start"
                        className="absolute inset-0 w-full h-full object-cover"
                        style={{ opacity: firstFrameOpacity }}
                    />
                    <motion.img
                        src={frames[totalFrames - 1]}
                        alt="End"
                        className="absolute inset-0 w-full h-full object-cover"
                        style={{ opacity: lastFrameOpacity }}
                    />
                </>
            ) : (
                <img
                    ref={imgRef}
                    src={frames[0]} // Start with first frame
                    alt="Sequence"
                    className="absolute inset-0 w-full h-full object-cover object-center will-change-transform"
                />
            )}
        </div>
    );
}
