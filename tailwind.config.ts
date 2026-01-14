
import type { Config } from "tailwindcss";

export default {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                display: ['var(--font-display)', 'sans-serif'], // For big headers
                sans: ['var(--font-sans)', 'sans-serif'], // For body
                mono: ['var(--font-mono)', 'monospace'],
            },
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
                amber: {
                    400: '#fbbf24',
                    500: '#f59e0b',
                    600: '#d97706',
                    900: '#78350f', // deep amber
                }
            },
            backgroundImage: {
                'premium-gradient': 'radial-gradient(circle at center, #1a1a1a 0%, #000000 100%)',
            }
        },
    },
    plugins: [],
} satisfies Config;
