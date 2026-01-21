import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { Button } from '../ui/Button';

export function SuccessView() {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-12"
        >
            <div className="mx-auto h-20 w-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
                <CheckCircle2 className="h-10 w-10" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Account Created!</h2>
            <p className="text-gray-500 mb-8 max-w-sm mx-auto">
                Your account has been successfully set up. Welcome to the community.
            </p>

            <Button className="w-full" onClick={() => window.location.reload()}>
                Go to Dashboard
            </Button>
        </motion.div>
    );
}
