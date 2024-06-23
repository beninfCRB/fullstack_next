import { Variants } from "framer-motion";

export const formVariants: Variants = {
    offscreen: { opacity: 0, y: 100 },
    onscreen: { opacity: 1, y: 0, transition: { type: 'spring', duration: 2.2 } }
};

export const tableVariants: Variants = {
    offscreen: { opacity: 0, y: 0 },
    onscreen: { opacity: 1, y: [-10, 0], transition: { type: 'spring', duration: 2.2 } }
};