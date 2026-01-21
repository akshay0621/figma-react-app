import { motion } from 'framer-motion';
import { Check, ShieldCheck } from 'lucide-react';
import { Button } from '../ui/Button';
import type { FormData } from '../../lib/validation';

interface SuccessOverlayProps {
    formData: FormData;
}

export function SuccessOverlay({ formData }: SuccessOverlayProps) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 relative overflow-hidden"
            >
                <div className="text-center space-y-2 mb-8">
                    {/* Checkmark Icon */}
                    <div className="mx-auto h-16 w-16 rounded-full border-2 border-blue-100 flex items-center justify-center mb-6">
                        <div className="h-12 w-12 bg-blue-600 rounded-full flex items-center justify-center text-white">
                            <Check className="h-6 w-6 stroke-[3]" />
                        </div>
                    </div>

                    <h2 className="text-2xl font-bold text-gray-900">You're all set!</h2>
                    <p className="text-gray-500 text-sm">Here's a quick summary of your account details</p>
                </div>

                {/* Summary Card */}
                <div className="bg-gray-50 rounded-2xl p-6 space-y-4 mb-8">
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-500">Account Type</span>
                        <span className="font-semibold text-gray-900 capitalize">{formData.accountType || 'Personal'}</span>
                    </div>


                    <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-500">Mobile Number</span>
                        <span className="font-semibold text-gray-900">{formData.countryCode} {formData.phone}</span>
                    </div>

                    <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-500">Name</span>
                        <span className="font-semibold text-gray-900">{formData.firstName} {formData.lastName}</span>
                    </div>
                </div>

                {/* Security Badge */}
                <div className="flex items-center justify-center gap-2 text-xs text-gray-500 mb-8">
                    <ShieldCheck className="h-4 w-4 text-green-500" />
                    <span>Your account is secured with bank-grade security</span>
                </div>

                <Button className="w-full h-12 bg-blue-600 hover:bg-blue-700 rounded-xl text-md font-semibold" onClick={() => window.location.reload()}>
                    Go To Dashboard
                </Button>
            </motion.div>
        </div>
    );
}
