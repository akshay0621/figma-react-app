/**
 * Animation variants for the page flip effect
 */
export const pageFlipVariants = {
    enter: (direction: number) => ({
        rotateY: direction > 0 ? 90 : -90,
        opacity: 0,
        scale: 0.9,
    }),
    center: {
        rotateY: 0,
        opacity: 1,
        scale: 1,
    },
    exit: (direction: number) => ({
        rotateY: direction > 0 ? -90 : 90,
        opacity: 0,
        scale: 0.9,
    }),
};

/**
 * Transition configuration for the page flip animation
 */
export const pageFlipTransition = {
    type: "spring" as const,
    stiffness: 300,
    damping: 30,
};
