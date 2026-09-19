import { Input } from '../ui/Input';
import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';
import { useState, useEffect } from 'react';

interface Step5Props {
    value: string;
    confirmPassword: string;
    onChange: (field: 'password' | 'confirmPassword', value: string) => void;
    error?: string;
}

interface PasswordRequirement {
    label: string;
    test: (password: string) => boolean;
}

const requirements: PasswordRequirement[] = [
    { label: 'One Uppercase alphabet', test: (pwd) => /[A-Z]/.test(pwd) },
    { label: 'One Lowercase alphabet', test: (pwd) => /[a-z]/.test(pwd) },
    { label: 'One Number', test: (pwd) => /[0-9]/.test(pwd) },
    { label: 'One Symbol', test: (pwd) => /[!@#$%^&*(),.?":{}|<>]/.test(pwd) },
    { label: 'Minimum 8 characters', test: (pwd) => pwd.length >= 8 },
];

export function Step5Password({ value, confirmPassword, onChange, error }: Step5Props) {
    const [passwordRequirementsMet, setPasswordRequirementsMet] = useState<boolean[]>([false, false, false, false, false]);
    const [confirmPasswordMatch, setConfirmPasswordMatch] = useState(false);

    // Check password requirements
    useEffect(() => {
        const met = requirements.map(req => req.test(value));
        setPasswordRequirementsMet(met);
    }, [value]);

    // Check if all password requirements are met
    const allPasswordRequirementsMet = passwordRequirementsMet.every(met => met);

    // Check confirm password match
    useEffect(() => {
        if (confirmPassword && allPasswordRequirementsMet) {
            setConfirmPasswordMatch(confirmPassword === value);
        } else {
            setConfirmPasswordMatch(false);
        }
    }, [confirmPassword, value, allPasswordRequirementsMet]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
        >
            {/* Create Password */}
            <div className="space-y-3">
                <Input
                    label="Create Password"
                    type="password"
                    placeholder="Enter your password"
                    value={value}
                    onChange={(e) => onChange('password', e.target.value)}
                    error={error}
                    autoFocus
                />

                {/* Password Requirements */}
                <div className="space-y-2 bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm font-medium text-gray-700 mb-2">Password Requirements:</p>
                    {requirements.map((req, index) => (
                        <div key={index} className="flex items-center gap-2">
                            {passwordRequirementsMet[index] ? (
                                <Check className="h-4 w-4 text-green-600 flex-shrink-0" />
                            ) : (
                                <X className="h-4 w-4 text-red-500 flex-shrink-0" />
                            )}
                            <span className={`text-sm ${passwordRequirementsMet[index] ? 'text-green-700' : 'text-gray-600'}`}>
                                {req.label}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
                <Input
                    label="Confirm Password"
                    type="password"
                    placeholder="Re-enter your password"
                    value={confirmPassword}
                    onChange={(e) => onChange('confirmPassword', e.target.value)}
                    disabled={!allPasswordRequirementsMet}
                />

                {/* Confirm Password Indicator */}
                {confirmPassword && (
                    <div className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg">
                        {confirmPasswordMatch ? (
                            <>
                                <Check className="h-4 w-4 text-green-600 flex-shrink-0" />
                                <span className="text-sm text-green-700">Passwords match</span>
                            </>
                        ) : (
                            <>
                                <X className="h-4 w-4 text-red-500 flex-shrink-0" />
                                <span className="text-sm text-red-600">Passwords do not match</span>
                            </>
                        )}
                    </div>
                )}
            </div>
        </motion.div>
    );
}
