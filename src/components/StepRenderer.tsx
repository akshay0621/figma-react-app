import { Step1AccountType } from './steps/Step1AccountType';
import { Step2Contact } from './steps/Step2Contact';
import { Step3OTP } from './steps/Step3OTP';
import { Step4Details } from './steps/Step4Details';
import { Step5Password } from './steps/Step5Password';
import type { FormData } from '../lib/validation';

interface StepRendererProps {
    step: number;
    formData: FormData;
    errors: Record<string, string>;
    updateData: (key: keyof FormData, value: any) => void;
    onResendOTP?: () => void;
    isOTPVerified?: boolean;
}

export function StepRenderer({ step, formData, errors, updateData, onResendOTP, isOTPVerified }: StepRendererProps) {
    return (
        <>
            {step === 1 && (
                <Step1AccountType
                    key="step1"
                    value={formData.accountType}
                    onChange={(val) => updateData('accountType', val)}
                />
            )}
            {step === 2 && (
                <Step2Contact
                    key="step2"
                    countryCode={formData.countryCode}
                    phone={formData.phone}
                    onChange={(field, val) => updateData(field, val)}
                    errors={errors}
                />
            )}
            {step === 3 && (
                <Step3OTP
                    key="step3"
                    phone={formData.countryCode + formData.phone}
                    otp={formData.otp}
                    onChange={(val) => updateData('otp', val)}
                    error={errors.otp}
                    onResend={onResendOTP || (() => { })}
                    isVerified={isOTPVerified}
                />
            )}
            {step === 4 && (
                <Step4Details
                    key="step4"
                    firstName={formData.firstName}
                    lastName={formData.lastName}
                    onChange={(field, val) => updateData(field, val)}
                    errors={errors}
                />
            )}
            {step === 5 && (
                <Step5Password
                    key="step5"
                    value={formData.password}
                    confirmPassword={formData.confirmPassword}
                    onChange={(field, val) => updateData(field, val)}
                    error={errors.password}
                />
            )}
        </>
    );
}
