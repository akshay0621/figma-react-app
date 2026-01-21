import { motion } from 'framer-motion';
import { useState } from 'react';

interface Step2Props {
    phone: string;
    countryCode: string;
    onChange: (field: 'phone' | 'countryCode', value: string) => void;
    errors?: { phone?: string };
}

const countries = [
    { code: '+1', name: 'US', flag: '🇺🇸', pattern: /^\d{10}$/ },
    { code: '+91', name: 'India', flag: '🇮🇳', pattern: /^\d{10}$/ }
];

export function Step2Contact({ phone, countryCode, onChange, errors }: Step2Props) {
    const [isOpen, setIsOpen] = useState(false);
    const selectedCountry = countries.find(c => c.code === countryCode) || countries[0];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
        >
            <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 block">
                    Mobile Number
                </label>
                <div className="flex gap-2">
                    {/* Country Code Selector */}
                    <div className="relative">
                        <button
                            type="button"
                            onClick={() => setIsOpen(!isOpen)}
                            className="flex items-center gap-2 h-12 px-4 rounded-lg border border-gray-300 bg-white hover:border-blue-500 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all"
                        >
                            <span className="text-xl">{selectedCountry.flag}</span>
                            <span className="font-medium">{selectedCountry.code}</span>
                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>

                        {/* Dropdown */}
                        {isOpen && (
                            <div className="absolute top-full mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                                {countries.map((country) => (
                                    <button
                                        key={country.code}
                                        type="button"
                                        onClick={() => {
                                            onChange('countryCode', country.code);
                                            setIsOpen(false);
                                        }}
                                        className="flex items-center gap-3 w-full px-4 py-3 hover:bg-gray-50 transition-colors first:rounded-t-lg last:rounded-b-lg"
                                    >
                                        <span className="text-xl">{country.flag}</span>
                                        <span className="font-medium">{country.name}</span>
                                        <span className="text-gray-500 ml-auto">{country.code}</span>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Phone Number Input */}
                    <div className="flex-1">
                        <input
                            type="tel"
                            placeholder="1234567890"
                            value={phone}
                            onChange={(e) => onChange('phone', e.target.value.replace(/\D/g, ''))}
                            autoFocus
                            className={`flex h-12 w-full rounded-lg border ${errors?.phone ? 'border-red-500' : 'border-gray-300'
                                } bg-white px-4 py-2 text-sm placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-4 ${errors?.phone ? 'focus:ring-red-500/10' : 'focus:ring-blue-500/10'
                                } transition-all`}
                        />
                    </div>
                </div>
                {errors?.phone && (
                    <p className="text-sm text-red-500 animate-in fade-in slide-in-from-top-1">{errors.phone}</p>
                )}
            </div>
        </motion.div>
    );
}
