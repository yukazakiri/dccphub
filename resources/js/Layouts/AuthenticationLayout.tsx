import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster } from "@/components/ui/sonner";
import { ThemeToggle } from '@/Components/ThemeToggle';
import { ThemeProvider } from '@/Components/ThemeProvider';

interface Props {
  children: React.ReactNode;
  title: string;
}

export default function AuthenticationLayout({ children, title }: Props) {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <div className="flex flex-col items-center min-h-screen pt-6 bg-background sm:justify-center sm:pt-0">
        <Toaster position="top-right" />

        {/* Theme Toggle */}
        <div className="fixed top-4 right-4">
          <ThemeToggle />
        </div>

        {/* Logo or Branding */}
        <div className="flex items-center mb-4">
          <motion.img
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            src="/path-to-your-logo.png" // Add your logo path here
            alt="Logo"
            className="w-12 h-12"
          />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{
              duration: 0.3,
              type: "spring",
              stiffness: 260,
              damping: 20
            }}
            className="w-full px-6 py-4 mt-6 sm:max-w-md"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </div>
    </ThemeProvider>
  );
}
