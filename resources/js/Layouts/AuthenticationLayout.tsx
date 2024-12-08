import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster } from "@/components/ui/sonner";
import { ThemeToggle } from '@/Components/ThemeToggle';
import { ThemeProvider } from '@/Components/ThemeProvider';
import logo from '../../../public/android-chrome-512x512.png';
import { GraduationCap, BookOpen, Calendar, Users } from 'lucide-react';

interface Props {
  children: React.ReactNode;
  title: string;
}

export default function AuthenticationLayout({ children, title }: Props) {
  const features = [
    {
      icon: GraduationCap,
      title: "Academic Excellence",
      description: "Track your academic progress and achievements"
    },
    {
      icon: BookOpen,
      title: "Course Management",
      description: "Access your course materials and assignments"
    },
    {
      icon: Calendar,
      title: "Schedule Planning",
      description: "Manage your class schedule and important dates"
    },
    {
      icon: Users,
      title: "Student Community",
      description: "Connect with classmates and faculty members"
    }
  ];

  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <div className="flex min-h-screen bg-background">
        <Toaster position="top-right" />

        {/* Theme Toggle */}
        <div className="fixed z-50 top-4 right-4">
          <ThemeToggle />
        </div>

        {/* Left Panel - Decorative Side */}
        <div className="hidden lg:flex lg:w-1/2 relative bg-primary/10 dark:bg-primary/5">
          <div className="relative z-20 flex flex-col justify-between w-full h-full p-12">
            {/* Logo and Title */}
            <div className="flex items-center space-x-3">
              <motion.img
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
                src={logo}
                alt="Logo"
                className="w-12 h-12"
              />
              <motion.h1
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="text-2xl font-bold text-primary"
              >
                School Portal
              </motion.h1>
            </div>

            {/* Features List */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-8"
            >
              <h2 className="text-xl font-semibold text-primary">Everything you need in one place</h2>
              <div className="grid gap-6">
                {features.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <motion.div
                      key={feature.title}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + index * 0.1 }}
                      className="flex items-start space-x-4"
                    >
                      <div className="p-2 rounded-lg bg-primary/10 text-primary">
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-medium text-primary">{feature.title}</h3>
                        <p className="text-sm text-muted-foreground">{feature.description}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            {/* Footer */}
            <div className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} School Portal. All rights reserved.
            </div>
          </div>

          {/* Decorative Background Pattern */}
          <div className="absolute inset-0 z-10 opacity-[0.03] dark:opacity-[0.02]" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }} />
        </div>

        {/* Right Panel - Content */}
        <div className="flex flex-col items-center justify-center w-full p-4 lg:w-1/2 lg:p-8">
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
              className="w-full sm:max-w-md"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </ThemeProvider>
  );
}
