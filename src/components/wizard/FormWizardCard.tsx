import { motion, AnimatePresence } from 'framer-motion';
import { StepRenderer } from '../StepRenderer';
import { FormHeader } from './FormHeader';
import { FormActions } from './FormActions';
import { pageFlipVariants, pageFlipTransition } from '../../lib/animationConfig';
import type { FormData } from '../../lib/validation';

interface FormWizardCardProps {
    step: number;
    direction: number;
    formData: FormData;
    errors: Record<string, string>;
    isLoading: boolean;
    isContinueDisabled: boolean;
    isOTPVerified?: boolean;
    updateData: (key: keyof FormData, value: any) => void;
    onBack: () => void;
    onNext: () => void;
    onResendOTP: () => void;
}

export function FormWizardCard({
    step,
    direction,
    formData,
    errors,
    isLoading,
    isContinueDisabled,
    isOTPVerified,
    updateData,
    onBack,
    onNext,
    onResendOTP,
}: FormWizardCardProps) {
    return (
        <div
            className="bg-white rounded-2xl shadow-lg p-8 m-4 overflow-hidden"
            style={{ perspective: '1200px' }}
        >
            <AnimatePresence mode="wait" initial={false} custom={direction}>
                <motion.div
                    key={step}
                    custom={direction}
                    variants={pageFlipVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={pageFlipTransition}
                    className="space-y-6"
                    style={{
                        transformStyle: 'preserve-3d',
                        backfaceVisibility: 'hidden',
                    }}
                >
                    <FormHeader step={step} onBack={onBack} />

                    <div className="min-h-[300px] py-4">
                        <StepRenderer
                            step={step}
                            formData={formData}
                            errors={errors}
                            updateData={updateData}
                            onResendOTP={onResendOTP}
                            isOTPVerified={isOTPVerified}
                        />
                    </div>

                    <FormActions
                        step={step}
                        isLoading={isLoading}
                        isContinueDisabled={isContinueDisabled}
                        onBack={onBack}
                        onNext={onNext}
                    />
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
