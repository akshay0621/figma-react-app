import { OTPInput } from '../ui/OTPInput';
import { motion } from 'framer-motion';
import { Button } from '../ui/Button';

interface Step3Props {
    phone: string;
    otp: string;
    onChange: (value: string) => void;
    error?: string;
    onResend: () => void;
    isVerified?: boolean;
}

export function Step3OTP({ phone, otp, onChange, error, onResend, isVerified }: Step3Props) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6 text-center"
        >
            <div className="text-center mb-8">
                <p className="text-gray-500">
                    We sent a verification code to <span className="font-medium text-gray-900">{phone}</span>
                </p>
            </div>

            <OTPInput value={otp} onChange={onChange} error={error} isVerified={isVerified} />

            <div className="pt-4">
                <Button variant="ghost" onClick={onResend} type="button" className="text-sm text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                    Didn't receive code? Resend
                </Button>
            </div>
        </motion.div>
    );
}
