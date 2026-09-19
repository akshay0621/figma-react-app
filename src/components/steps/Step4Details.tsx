import { Input } from '../ui/Input';
import { motion } from 'framer-motion';

interface Step4Props {
    firstName: string;
    lastName: string;
    onChange: (field: 'firstName' | 'lastName', value: string) => void;
    errors?: { firstName?: string; lastName?: string };
}

export function Step4Details({ firstName, lastName, onChange, errors }: Step4Props) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
        >
            <div className="grid grid-cols-2 gap-4">
                <Input
                    label="First Name"
                    placeholder="Jane"
                    value={firstName}
                    onChange={(e) => onChange('firstName', e.target.value)}
                    error={errors?.firstName}
                    autoFocus
                />
                <Input
                    label="Last Name"
                    placeholder="Doe"
                    value={lastName}
                    onChange={(e) => onChange('lastName', e.target.value)}
                    error={errors?.lastName}
                />
            </div>
        </motion.div>
    );
}
