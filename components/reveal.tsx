"use client";

import { motion, useReducedMotion } from "framer-motion";

export function Reveal({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotion();
  return <motion.div initial={false} whileInView={{ y: [reduced ? 0 : 9, 0] }} viewport={{ once: true }} transition={{ duration: reduced ? 0 : 0.45 }}>{children}</motion.div>;
}
