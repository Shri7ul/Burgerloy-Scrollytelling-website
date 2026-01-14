'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useScroll, useTransform } from 'framer-motion';

const FRAME_COUNT = 384;
const BATCH_SIZE = 32; // Load in small chunks to prevent network stalling

export default function ScrollyTelling() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    // Track loaded count for potential UI feedback
    const [loadedCount, setLoadedCount] = useState(0);

    const { scrollYProgress } = useScroll();
    const frameIndex = useTransform(scrollYProgress, [0, 1], [0, FRAME_COUNT - 1]);

    // --- SMART BATCH PRELOADER ---
    useEffect(() => {
        const loadedImages: HTMLImageElement[] = new Array(FRAME_COUNT).fill(null);
        let activeRequests = 0;
        let currentIndex = 1;

        const loadBatch = async () => {
            // If completely finished, stop
            if (currentIndex > FRAME_COUNT) return;

            // Start a batch
            const limit = Math.min(currentIndex + BATCH_SIZE, FRAME_COUNT + 1);
            const promises = [];

            for (let i = currentIndex; i < limit; i++) {
                promises.push(new Promise<void>((resolve) => {
                    const img = new Image();
                    img.src = `/frames/${String(i).padStart(4, '0')}.webp`;

                    img.onload = () => {
                        loadedImages[i - 1] = img;
                        setLoadedCount(prev => prev + 1);
                        resolve();
                    };

                    // If error, just resolve to keep moving (maybe show placeholder?)
                    img.onerror = () => resolve();
                }));
            }

            // Wait for THIS batch to mostly finish before saturating network again
            // Actually, we can use Promise.all to wait for the whole batch
            await Promise.all(promises);

            // Advance index and recurse
            currentIndex = limit;
            setImages([...loadedImages]); // Update state to trigger renders progressively

            // Immediate loop for next batch (no timeout needed, just microtick)
            loadBatch();
        };

        // Ignite the loader
        loadBatch();

    }, []);

    // --- RENDER LOOP ---
    useEffect(() => {
        if (!canvasRef.current) return;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const render = () => {
            // Map scroll to frame index
            const currentProgress = frameIndex.get();
            const index = Math.min(
                FRAME_COUNT - 1,
                Math.max(0, Math.round(currentProgress))
            );

            const img = images[index];

            // Resize canvas
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;

            if (img && img.complete) {
                // Calculate "Cover" scaling (Fill Screen)
                // We use cover here because it looks more immersive for the background
                // If "contain" is strictly required, switch logic, but usually these are hero bgs.
                // Reverting to "Contain" + "Blur Fill" as per previous logic for safety.

                // --- PASS 1: BLURRY FILL (Background) ---
                const scaleCover = Math.max(canvas.width / img.width, canvas.height / img.height);
                const wCover = img.width * scaleCover;
                const hCover = img.height * scaleCover;
                const xCover = (canvas.width - wCover) / 2;
                const yCover = (canvas.height - hCover) / 2;

                ctx.save();
                ctx.filter = 'blur(20px) brightness(0.4)';
                ctx.drawImage(img, xCover, yCover, wCover, hCover);
                ctx.restore();

                // --- PASS 2: CRISP IMAGE (Contain) ---
                const scaleContain = Math.min(canvas.width / img.width, canvas.height / img.height);
                const wContain = img.width * scaleContain;
                const hContain = img.height * scaleContain;
                const xContain = (canvas.width - wContain) / 2;
                const yContain = (canvas.height - hContain) / 2;

                ctx.drawImage(img, xContain, yContain, wContain, hContain);
            }
        };

        const unsubscribe = frameIndex.on("change", () => requestAnimationFrame(render));
        requestAnimationFrame(render);
        window.addEventListener('resize', () => requestAnimationFrame(render));

        return () => {
            unsubscribe();
            window.removeEventListener('resize', () => requestAnimationFrame(render));
        };
    }, [images, frameIndex]);

    return (
        <canvas
            ref={canvasRef}
            className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
        />
    );
}
