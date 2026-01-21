import { motion } from 'framer-motion';
import { getStepTitle, getStepSubtitle } from '../../lib/stepHelpers';

interface FormHeaderProps {
    step: number;
    onBack: () => void;
}

export function FormHeader({ step, onBack }: FormHeaderProps) {
    return (
        <div className="space-y-2">
            {step > 1 && (
                <div className="space-y-4">
                    {/* Progress Bar */}
                    <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                        <motion.div
                            className="bg-blue-600 h-full rounded-full"
                            initial={{ width: `${((step - 1) / 5) * 100}%` }}
                            animate={{ width: `${(step / 5) * 100}%` }}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                        />
                    </div>

                    <div className="flex justify-end lg:hidden">
                        <button onClick={onBack} className="text-sm text-gray-400 hover:text-gray-600">
                            Back
                        </button>
                    </div>
                </div>
            )}

            <h1 className="text-3xl font-bold text-gray-900">{getStepTitle(step)}</h1>
            <p className="text-gray-500 text-lg">{getStepSubtitle(step)}</p>
        </div>
    );
}
