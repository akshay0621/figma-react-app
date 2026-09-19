import { useRef, useMemo } from 'react';

export function usePageFlipAnimation(step: number) {
    const prevStepRef = useRef(step);

    const direction = useMemo(() => {
        const dir = step > prevStepRef.current ? 1 : step < prevStepRef.current ? -1 : 1;
        prevStepRef.current = step;
        return dir;
    }, [step]);

    return direction;
}
