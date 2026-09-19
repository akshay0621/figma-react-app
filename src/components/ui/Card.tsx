import React from 'react';
import { cn } from '../../lib/utils';
import { motion } from 'framer-motion';

interface SelectionCardProps {
    selected?: boolean;
    onClick?: () => void;
    icon?: React.ReactNode;
    title: string;
    description?: string;
}

export function SelectionCard({ selected, onClick, icon, title, description }: SelectionCardProps) {
    return (
        <div
            onClick={onClick}
            className={cn(
                "relative flex items-center p-4 cursor-pointer rounded-xl border-2 transition-all duration-200 ease-in-out group",
                selected
                    ? "border-blue-600 bg-blue-50/50"
                    : "border-gray-200 bg-white hover:border-blue-300 hover:shadow-md"
            )}
        >
            <div className={cn(
                "flex h-12 w-12 items-center justify-center rounded-full transition-colors",
                selected ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-500 group-hover:bg-blue-50 group-hover:text-blue-500"
            )}>
                {icon}
            </div>
            <div className="ml-4 flex-1">
                <h3 className={cn("font-semibold text-gray-900", selected && "text-blue-700")}>{title}</h3>
                {description && <p className="text-sm text-gray-500">{description}</p>}
            </div>

            {/* Radio Circle Indicator */}
            <div className={cn(
                "h-6 w-6 rounded-full border-2 flex items-center justify-center transition-colors",
                selected ? "border-blue-600 bg-blue-600" : "border-gray-300"
            )}>
                {selected && (
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="h-2.5 w-2.5 rounded-full bg-white"
                    />
                )}
            </div>
        </div>
    );
}
