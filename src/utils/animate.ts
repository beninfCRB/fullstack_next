import { Variants } from "framer-motion";

export const formVariants: Variants = {
    offscreen: { opacity: 0, y: 100 },
    onscreen: { opacity: 1, y: 0, transition: { type: 'spring', duration: 2.2 } }
};

export const tableVariants: Variants = {
    offscreen: { opacity: 0, y: 0 },
    onscreen: { opacity: 1, y: [-10, 0], transition: { type: 'spring', duration: 2.2 } }
};

export const bannerVariants: Variants = {
    offscreen: { opacity: 0, y: 0 },
    onscreen: { opacity: 1, y: [100, 0], transition: { type: 'tween', duration: 2.2 } }
};

export const produkVariants: Variants = {
    offscreen: { opacity: 0, x: 0 },
    onscreen: { opacity: 1, x: [100, 0], transition: { type: 'tween', duration: 2.2 } }
};

export const promoVariants: Variants = {
    offscreen: { opacity: 0, y: 0 },
    onscreen: { opacity: 1, y: [-100, 0], transition: { type: 'tween', duration: 2.2 } }
};

export const aboutVariants: Variants = {
    offscreen: { opacity: 0, y: 0 },
    onscreen: { opacity: 1, y: [-100, 0], transition: { type: 'tween', duration: 2.2 } }
};

export const titleVariants: Variants = {
    offscreen: { opacity: 0, x: 0 },
    onscreen: { opacity: 1, x: [100, 0], transition: { type: 'tween', duration: 2.2 } }
};