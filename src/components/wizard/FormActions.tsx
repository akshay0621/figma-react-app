import { Button } from '../ui/Button';

interface FormActionsProps {
    step: number;
    isLoading: boolean;
    isContinueDisabled: boolean;
    onBack: () => void;
    onNext: () => void;
}

export function FormActions({ step, isLoading, isContinueDisabled, onBack, onNext }: FormActionsProps) {
    return (
        <div className="flex gap-4 pt-4 border-t border-gray-100">
            {step > 1 && (
                <Button
                    variant="outline"
                    onClick={onBack}
                    disabled={isLoading}
                    className="w-full hidden lg:inline-flex"
                >
                    Back
                </Button>
            )}
            <Button
                onClick={onNext}
                isLoading={isLoading}
                disabled={isContinueDisabled}
                className="w-full"
            >
                {step === 5 ? 'Create Account' : 'Continue'}
            </Button>
        </div>
    );
}
