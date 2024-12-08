import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/Components/ui/dialog';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Sparkles } from 'lucide-react';
import { router } from '@inertiajs/react';

interface BetaSignupDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function BetaSignupDialog({ isOpen, onClose }: BetaSignupDialogProps) {
  const [formData, setFormData] = useState({
    email: '',
    id: '',
    type: 'student' as 'student' | 'faculty'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Send verification request to Laravel backend
      await router.post('/api/beta-signup/verify', formData, {
        onSuccess: () => {
          setIsSuccess(true);
          setTimeout(() => {
            onClose();
            setIsSuccess(false);
            setFormData({ email: '', id: '', type: 'student' });
          }, 2000);
        },
        onError: (errors) => {
          setError(errors.message || 'Failed to verify. Please check your ID and email.');
        },
      });
    } catch (error) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-center gap-2 text-2xl">
            <Sparkles className="w-6 h-6 text-purple-500" />
            Join the Beta
          </DialogTitle>
          <DialogDescription className="text-center">
            Get early access to DCCP Hub. Please verify your DCCP credentials.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-4">
            <AnimatePresence mode="wait">
              {!isSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-4"
                >
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant={formData.type === 'student' ? 'default' : 'outline'}
                      className="flex-1"
                      onClick={() => setFormData(prev => ({ ...prev, type: 'student' }))}
                    >
                      Student
                    </Button>
                    <Button
                      type="button"
                      variant={formData.type === 'faculty' ? 'default' : 'outline'}
                      className="flex-1"
                      onClick={() => setFormData(prev => ({ ...prev, type: 'faculty' }))}
                    >
                      Faculty
                    </Button>
                  </div>

                  <div>
                    <Input
                      type="text"
                      placeholder={formData.type === 'student' ? 'Enter Student ID' : 'Enter Faculty ID'}
                      value={formData.id}
                      onChange={(e) => setFormData(prev => ({ ...prev, id: e.target.value }))}
                      required
                      className="w-full"
                      disabled={isSubmitting}
                    />
                  </div>

                  <div>
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      required
                      className="w-full"
                      disabled={isSubmitting}
                    />
                  </div>

                  {error && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="p-2 text-sm font-medium text-red-600 rounded-lg bg-red-50"
                    >
                      {error}
                    </motion.div>
                  )}
                </motion.div>
              )}

              {isSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center justify-center gap-2 p-2 text-sm font-medium text-green-600 rounded-lg bg-green-50"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Successfully verified and signed up!
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <DialogFooter>
            <Button
              type="submit"
              disabled={isSubmitting || isSuccess}
              className="w-full bg-gradient-to-r from-[#F7AABE] via-[#B57CEC] to-[#E472D1] text-white"
            >
              {isSubmitting ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center gap-2"
                >
                  <svg
                    className="w-4 h-4 animate-spin"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Verifying...
                </motion.div>
              ) : (
                'Verify & Join Beta'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
