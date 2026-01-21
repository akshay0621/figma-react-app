import { motion } from 'framer-motion';

export function DisclaimerBanner() {
    const disclaimerText = "⚠️ This website does not store any data. Please do not enter any personal information. ⚠️";

    // Duplicate the text to create seamless loop
    const repeatedText = Array(10).fill(disclaimerText).join('   ');

    return (
        <div className="w-full bg-yellow-400 text-gray-900 py-2 overflow-hidden relative">
            <motion.div
                className="whitespace-nowrap inline-block font-medium text-sm"
                animate={{
                    x: [0, -1920], // Adjust based on text length
                }}
                transition={{
                    duration: 30,
                    repeat: Infinity,
                    ease: "linear",
                }}
            >
                {repeatedText}
            </motion.div>
        </div>
    );
}
