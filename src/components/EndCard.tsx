'use client';

import { motion } from 'framer-motion';

export default function EndCard({ heroImage }: { heroImage: string }) {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <section className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-black text-center z-10">

            {/* Background Hero (blurred/darkened) */}
            <div className="absolute inset-0 z-0">
                {heroImage && (
                    <img src={heroImage} alt="Final Burger" className="w-full h-full object-cover opacity-30 blur-sm scale-110" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black" />
            </div>

            <div className="relative z-10 flex flex-col items-center space-y-8 p-4">
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-5xl md:text-8xl font-black uppercase text-amber-500 tracking-tighter"
                >
                    Order Up
                </motion.h2>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="flex flex-col md:flex-row gap-6"
                >
                    <button className="px-8 py-4 bg-amber-500 text-black font-bold uppercase tracking-widest hover:bg-white transition-colors">
                        Watch the Build
                    </button>
                    <button
                        onClick={scrollToTop}
                        className="px-8 py-4 border border-white/20 text-white font-bold uppercase tracking-widest hover:bg-white/10 transition-colors"
                    >
                        Back to Top
                    </button>
                </motion.div>
            </div>
        </section>
    );
}
