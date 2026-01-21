import { motion, useMotionTemplate, useMotionValue, AnimatePresence } from 'framer-motion';
import { useState, type MouseEvent } from 'react';

interface SplitLayoutProps {
    children: React.ReactNode;
}

interface Burst {
    id: number;
    x: number;
    y: number;
    color: string;
}

export function SplitLayout({ children }: SplitLayoutProps) {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const [bursts, setBursts] = useState<Burst[]>([]);

    function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    function handleClick(e: MouseEvent) {
        // Don't trigger if clicking interactive elements
        if ((e.target as HTMLElement).closest('button, input, a')) return;

        const { left, top } = e.currentTarget.getBoundingClientRect();
        const colors = [
            'from-pink-500 via-red-500 to-yellow-500',
            'from-purple-400 via-pink-500 to-red-500',
            'from-green-400 via-teal-500 to-blue-500',
            'from-blue-400 via-indigo-500 to-purple-500'
        ];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];

        const newBurst: Burst = {
            id: Date.now(),
            x: e.clientX - left,
            y: e.clientY - top,
            color: randomColor
        };
        setBursts(prev => [...prev, newBurst]);
    }

    return (
        <div
            className="flex h-screen w-full overflow-hidden relative group cursor-pointer"
            onMouseMove={handleMouseMove}
            onClick={handleClick}
        >
            <AnimatePresence>
                {bursts.map(burst => (
                    <motion.div
                        key={burst.id}
                        initial={{ scale: 0, opacity: 0.8 }}
                        animate={{ scale: 2.5, opacity: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        style={{ left: burst.x, top: burst.y }}
                        className={`absolute pointer-events-none z-50 h-32 w-32 -ml-16 -mt-16 rounded-full bg-gradient-to-r ${burst.color} blur-xl`}
                        onAnimationComplete={() => setBursts(prev => prev.filter(b => b.id !== burst.id))}
                    />
                ))}
            </AnimatePresence>
            <motion.div
                className="pointer-events-none absolute -inset-px transition duration-300 opacity-0 group-hover:opacity-100 z-0"
                style={{
                    background: useMotionTemplate`
                        radial-gradient(
                            500px circle at ${mouseX}px ${mouseY}px,
                            rgba(37, 99, 235, 0.15),
                            transparent 80%
                        )
                    `,
                }}
            />
            {/* Left Side - Brand */}
            <div className="hidden lg:flex w-1/2 p-12 flex-col relative overflow-hidden z-10">
                {/* Top Header - Always Visible */}
                <div className="relative z-10 mb-8">
                    <h2 className="text-2xl font-semibold mb-3 text-gray-900">Let's Get Started</h2>
                    <h1 className="text-4xl font-bold mb-2 text-gray-900">Create your account</h1>
                    <p className="text-gray-600 text-base">Follow the Steps to create your account</p>
                </div>
            </div>

            {/* Right Side - Form Content */}
            <div className="flex-1 flex flex-col justify-center items-center p-6 sm:p-12 z-10">
                <div className="w-full max-w-md" onClick={(e) => e.stopPropagation()}>
                    {children}
                </div>
            </div>
        </div>
    );
}
