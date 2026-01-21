import { User, Building2 } from 'lucide-react';
import { SelectionCard } from '../ui/Card';
import { motion } from 'framer-motion';

type AccountType = 'personal' | 'business' | null;

interface Step1Props {
    value: AccountType;
    onChange: (value: AccountType) => void;
}

export function Step1AccountType({ value, onChange }: Step1Props) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
        >
            <div className="space-y-4">
                <SelectionCard
                    title="Personal"
                    icon={<User className="h-6 w-6" />}
                    selected={value === 'personal'}
                    onClick={() => onChange('personal')}
                />
                <SelectionCard
                    title="Business"
                    icon={<Building2 className="h-6 w-6" />}
                    selected={value === 'business'}
                    onClick={() => onChange('business')}
                />
            </div>
        </motion.div>
    );
}
