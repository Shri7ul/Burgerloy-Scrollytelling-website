'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface SectionProps {
    children: ReactNode;
    className?: string;
    id?: string;
}

export default function Section({ children, className = '', id }: SectionProps) {
    return (
        <section id={id} className={`relative h-[300vh] ${className}`}>
            <div className="sticky top-0 h-screen w-full overflow-hidden">
                {children}
            </div>
        </section>
    );
}
