import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, X } from 'lucide-react';

interface NotificationProps {
    message: string;
    show: boolean;
    onClose: () => void;
}

export function Notification({ message, show, onClose }: NotificationProps) {
    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    initial={{ opacity: 0, y: 50, x: -20 }}
                    animate={{ opacity: 1, y: 0, x: 0 }}
                    exit={{ opacity: 0, y: 50, x: -20 }}
                    className="fixed bottom-6 left-6 z-50"
                >
                    <div className="bg-blue-600 text-white px-6 py-4 rounded-lg shadow-2xl flex items-center gap-3 min-w-[300px]">
                        <CheckCircle2 className="h-5 w-5 flex-shrink-0" />
                        <div className="flex-1">
                            <p className="font-medium">Your OTP Code</p>
                            <p className="text-2xl font-bold tracking-wider mt-1">{message}</p>
                        </div>
                        <button
                            onClick={onClose}
                            className="text-white/80 hover:text-white transition-colors"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
