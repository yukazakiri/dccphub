import React, { useState } from 'react';
import { motion as m, AnimatePresence } from 'framer-motion';
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
import axios from 'axios';
import { toast } from 'sonner';

interface BetaSignupDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ResendDialogProps {
  isOpen: boolean;
  onClose: () => void;
  email: string;
  id: string;
  type: string;
  onResend: (email: string, id: string, type: string) => Promise<void>;
  isSubmitting: boolean;
}

function ResendDialog({ isOpen, onClose, email, id, type, onResend, isSubmitting }: ResendDialogProps) {
  const handleResendClick = async () => {
    try {
      await onResend(email, id, type);
      onClose();
    } catch (error) {
      console.error('Resend failed:', error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl">Resend Invitation?</DialogTitle>
          <DialogDescription>
            An invitation has already been sent to {email}. Would you like us to resend the link?
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end gap-3 mt-4">
          <Button variant="outline" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button onClick={handleResendClick} disabled={isSubmitting}>
            {isSubmitting ? (
              <div className="flex items-center gap-2">
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
                Sending...
              </div>
            ) : (
              'Resend Link'
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function BetaSignupDialog({ isOpen, onClose }: BetaSignupDialogProps) {
  const [formData, setFormData] = useState({
    email: '',
    id: '',
    type: 'student' as 'student' | 'faculty'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showResendDialog, setShowResendDialog] = useState(false);

  const handleSubmit = async (e: React.FormEvent | null = null) => {
    if (e) e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await axios.post('/api/beta-signup/verify', {
        ...formData,
        resend: false
      });

      const { data } = response;

      if (!data.success && data.hasExistingInvitation) {
        setShowResendDialog(true);
        setIsSubmitting(false);
        return;
      }

      if (data.success) {
        toast.success(data.message);
        setTimeout(() => {
          onClose();
          setFormData({ email: '', id: '', type: 'student' });
        }, 2000);
      }
    } catch (error: any) {
      const message = error.response?.data?.message || 'An error occurred. Please try again.';
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResend = async (email: string, id: string, type: string) => {
    setIsSubmitting(true);
    try {
      const response = await axios.post('/api/beta-signup/verify', {
        email,
        id,
        type,
        resend: true
      });

      const { data } = response;

      if (data.success) {
        toast.success(data.message);
        setTimeout(() => {
          onClose();
          setShowResendDialog(false);
          setFormData({ email: '', id: '', type: 'student' });
        }, 2000);
      }
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to resend invitation.';
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
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

          <form onSubmit={(e) => handleSubmit(e)} className="space-y-4">
            <div className="space-y-4">
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
            </div>

            <DialogFooter>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-[#F7AABE] via-[#B57CEC] to-[#E472D1] text-white"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
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
                  </div>
                ) : (
                  'Verify & Join Beta'
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <ResendDialog
        isOpen={showResendDialog}
        onClose={() => setShowResendDialog(false)}
        email={formData.email}
        id={formData.id}
        type={formData.type}
        onResend={handleResend}
        isSubmitting={isSubmitting}
      />
    </>
  );
}
