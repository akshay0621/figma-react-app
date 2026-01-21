import { useState, useEffect } from 'react';
import { z } from 'zod';
import {
    step1Schema,
    step2Schema,
    step3Schema,
    step4Schema,
    step5Schema,
    type FormData
} from './validation';

export function useFormWizard() {
    const [step, setStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [generatedOTP, setGeneratedOTP] = useState<string>('');
    const [showOTPNotification, setShowOTPNotification] = useState(false);
    const [isOTPVerified, setIsOTPVerified] = useState(false);

    const [formData, setFormData] = useState<FormData>({
        accountType: null,
        countryCode: '+1',
        phone: '',
        otp: '',
        firstName: '',
        lastName: '',
        password: '',
        confirmPassword: '',
    });

    // Generate random 4-digit OTP
    const generateOTP = () => {
        const otp = Math.floor(1000 + Math.random() * 9000).toString();
        setGeneratedOTP(otp);
        setShowOTPNotification(true);
        setIsOTPVerified(false);

        // Auto-hide notification after 5 seconds
        setTimeout(() => {
            setShowOTPNotification(false);
        }, 5000);

        return otp;
    };

    // Verify OTP whenever user types
    useEffect(() => {
        if (step === 3 && formData.otp.length === 4) {
            if (formData.otp === generatedOTP) {
                setIsOTPVerified(true);
                setErrors(prev => {
                    const newErrors = { ...prev };
                    delete newErrors.otp;
                    return newErrors;
                });
            } else {
                setIsOTPVerified(false);
                setErrors(prev => ({ ...prev, otp: 'Invalid OTP code' }));
            }
        } else if (step === 3) {
            setIsOTPVerified(false);
        }
    }, [formData.otp, generatedOTP, step]);

    const updateData = (key: keyof FormData, value: any) => {
        setFormData(prev => ({ ...prev, [key]: value }));
        // Clear error for this key
        if (errors[key]) {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[key];
                return newErrors;
            });
        }
    };

    const validateStep = async (currentStep: number) => {
        try {
            setErrors({});
            if (currentStep === 1) await step1Schema.parseAsync({ accountType: formData.accountType });
            if (currentStep === 2) await step2Schema.parseAsync({ countryCode: formData.countryCode, phone: formData.phone });
            if (currentStep === 3) {
                await step3Schema.parseAsync({ otp: formData.otp });
                // Check if OTP is verified
                if (!isOTPVerified) {
                    throw new z.ZodError([{ path: ['otp'], message: 'Invalid OTP code', code: 'custom' }]);
                }
            }
            if (currentStep === 4) await step4Schema.parseAsync({ firstName: formData.firstName, lastName: formData.lastName });
            if (currentStep === 5) await step5Schema.parseAsync({ password: formData.password, confirmPassword: formData.confirmPassword });
            return true;
        } catch (error) {
            if (error instanceof z.ZodError) {
                const newErrors: Record<string, string> = {};
                error.issues.forEach(issue => {
                    if (issue.path[0]) newErrors[issue.path[0] as string] = issue.message;
                });
                setErrors(newErrors);
            }
            return false;
        }
    };

    const handleNext = async () => {
        setIsLoading(true);
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 600));

        const isValid = await validateStep(step);
        setIsLoading(false);

        if (isValid) {
            setStep(prev => prev + 1);

            // Generate OTP when moving from step 2 to step 3
            if (step === 2) {
                generateOTP();
            }
        }
    };

    const handleBack = () => {
        setStep(prev => Math.max(1, prev - 1));
        setErrors({});
    };

    const handleResendOTP = () => {
        generateOTP();
        setFormData(prev => ({ ...prev, otp: '' }));
        setErrors({});
    };

    return {
        step,
        isLoading,
        errors,
        formData,
        generatedOTP,
        showOTPNotification,
        isOTPVerified,
        updateData,
        handleNext,
        handleBack,
        handleResendOTP,
        setShowOTPNotification,
    };
}
