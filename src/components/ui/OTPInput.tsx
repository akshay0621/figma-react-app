import { useRef, useState, useEffect } from 'react';
import { cn } from '../../lib/utils';
import { motion } from 'framer-motion';

interface OTPInputProps {
    length?: number;
    value: string;
    onChange: (value: string) => void;
    error?: string;
    isVerified?: boolean;
}

export function OTPInput({ length = 4, value, onChange, error, isVerified = false }: OTPInputProps) {
    const [activeInput, setActiveInput] = useState(0);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    useEffect(() => {
        inputRefs.current = inputRefs.current.slice(0, length);
    }, [length]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const newValue = e.target.value;
        if (isNaN(Number(newValue))) return; // Numbers only

        const newOtp = value.split('');
        newOtp[index] = newValue.substring(newValue.length - 1);
        const combinedOtp = newOtp.join('');
        onChange(combinedOtp);

        // Auto focus next
        if (newValue && index < length - 1) {
            inputRefs.current[index + 1]?.focus();
            setActiveInput(index + 1);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === 'Backspace' && !value[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
            setActiveInput(index - 1);
        }
        if (e.key === 'ArrowLeft' && index > 0) {
            inputRefs.current[index - 1]?.focus();
            setActiveInput(index - 1);
        }
        if (e.key === 'ArrowRight' && index < length - 1) {
            inputRefs.current[index + 1]?.focus();
            setActiveInput(index + 1);
        }
    };

    const handlePaste = (e: React.ClipboardEvent) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text').slice(0, length).replace(/\D/g, '');
        if (pastedData) {
            onChange(pastedData);
            inputRefs.current[Math.min(pastedData.length, length - 1)]?.focus();
        }
    };

    return (
        <div className="space-y-4">
            <div className="flex gap-4 justify-center">
                {Array.from({ length }).map((_, index) => (
                    <div key={index} className="relative">
                        <motion.input
                            ref={(el) => { inputRefs.current[index] = el; }}
                            type="text"
                            inputMode="numeric"
                            maxLength={1}
                            value={value[index] || ''}
                            onChange={(e) => handleChange(e, index)}
                            onKeyDown={(e) => handleKeyDown(e, index)}
                            onFocus={() => setActiveInput(index)}
                            onPaste={handlePaste}
                            animate={isVerified ? {
                                scale: [1, 1.1, 1],
                                borderColor: ["#e5e7eb", "#22c55e", "#22c55e"],
                                color: ["#000000", "#16a34a", "#16a34a"]
                            } : {}}
                            transition={{
                                duration: 0.4,
                                delay: index * 0.1,
                                type: "spring",
                                stiffness: 300,
                                damping: 20
                            }}
                            className={cn(
                                "h-16 w-16 text-center text-3xl font-bold rounded-xl border-2 transition-all caret-blue-600 bg-white outline-none",
                                activeInput === index && !isVerified ? "border-blue-600 ring-4 ring-blue-500/10" : "border-gray-200 hover:border-gray-300",
                                error && "border-red-500 bg-red-50",
                                isVerified && "border-green-500 bg-green-50 text-green-600"
                            )}
                        />
                    </div>
                ))}
            </div>
            {error && <p className="text-center text-sm text-red-500 font-medium">{error}</p>}
        </div>
    );
}
