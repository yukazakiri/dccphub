import { motion } from 'framer-motion';
import React from 'react';

interface Props {
  children: React.ReactNode;
  delay?: number;
}

export default function AnimatedFormElement({ children, delay = 0 }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: delay * 0.1,
        duration: 0.2,
        ease: "easeOut"
      }}
    >
      {children}
    </motion.div>
  );
}
