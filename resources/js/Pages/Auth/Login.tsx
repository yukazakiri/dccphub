import { Link, useForm, Head, usePage } from '@inertiajs/react';
import React, { useState, useEffect } from 'react';
import useRoute from '@/Hooks/useRoute';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Alert, AlertDescription } from "@/Components/ui/alert";
import { Toaster } from "@/Components/ui/sonner";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Loader2, ArrowLeft, Mail, Lock } from "lucide-react";
import { Checkbox } from "@/Components/ui/checkbox";
import AuthenticationLayout from '@/Layouts/AuthenticationLayout';
import { motion, AnimatePresence } from 'framer-motion';
import { router } from '@inertiajs/react'
import Socialstream from '@/Components/Socialstream';

interface Props {
  canResetPassword: boolean;
  status: string | null;
  socialstream: {
    show: boolean;
    prompt: string;
    providers: Array<{
      id: string;
      name: string;
      buttonLabel?: string;
    }>;
    hasPassword: boolean;
    connectedAccounts: any[];
  };
  errors?: {
    socialstream?: string;
  };
}

export default function Login({
  canResetPassword = false,
  status,
  socialstream,
  errors,
}: Props) {
  const route = useRoute();
  const { csrf_token } = usePage().props;
  const [step, setStep] = useState<'email' | 'password'>('email');
  const { data, setData, post, processing, reset } = useForm({
    email: '',
    password: '',
    remember: false,
  });
  const props = usePage().props;
  // Handle email verification
  const handleEmailVerification = (e: React.FormEvent) => {
    e.preventDefault();
    router.post('/login/verify-email', {
      email: data.email
    }, {
      preserveScroll: true,
      onSuccess: () => {
        setStep('password');
        toast.success('Email verified', {
          description: 'Please enter your password to continue',
        });
      },
      onError: (errors: any) => {
        toast.error(errors.email as string || 'Invalid email');
        const emailInput = document.getElementById('email');
        emailInput?.focus();
      },
    });
  };

  // Handle final login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    router.post('/auth/login', {
      email: data.email,
      password: data.password,
      remember: data.remember,
    }, {
      onFinish: () => reset('password'),
      onError: (errors) => {
        Object.entries(errors).forEach(([key, value]) => {
          toast.error(value as string);
        });
      },
      onSuccess: () => {
        toast.success('Login successful!', {
          description: 'Redirecting to dashboard...',
        });
      },
    });
  };

  useEffect(() => {
    if (status) {
      toast.info(status);
    }
  }, [status]);

  return (
    <AuthenticationLayout title="Login">
      <Card className="border-none shadow-lg">
        <CardHeader className="space-y-1">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <CardTitle className="text-2xl font-bold text-center">
              {step === 'email' ? 'Welcome back!' : 'Enter your password'}
            </CardTitle>
            <CardDescription className="text-center">
              {step === 'email' ? (
                'Sign in to access your student portal'
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center justify-center gap-2"
                >
                  <Mail className="w-4 h-4" />
                  <span className="font-medium">{data.email}</span>
                </motion.div>
              )}
            </CardDescription>
          </motion.div>
        </CardHeader>

        <form onSubmit={step === 'email' ? handleEmailVerification : handleLogin}>
          <CardContent className="space-y-4">
            <AnimatePresence mode="wait">
              {step === 'email' ? (
                <motion.div
                  key="email"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-2"
                >
                  <Label htmlFor="email">Email address</Label>
                  <div className="relative">
                    <Mail className="absolute w-4 h-4 left-3 top-3 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      value={data.email}
                      onChange={e => setData('email', e.target.value)}
                      required
                      autoFocus
                      autoComplete="username"
                      placeholder="name@example.com"
                      className={cn(
                        "pl-10 transition-all duration-200",
                        errors.email && "border-red-500 focus-visible:ring-red-500"
                      )}
                    />
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="password"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4"
                >
                  <div>
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => setStep('email')}
                      className="flex items-center h-auto p-0 text-sm font-normal text-muted-foreground hover:text-primary"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Change email
                    </Button>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute w-4 h-4 left-3 top-3 text-muted-foreground" />
                      <Input
                        id="password"
                        type="password"
                        value={data.password}
                        onChange={e => setData('password', e.target.value)}
                        required
                        autoFocus
                        autoComplete="current-password"
                        className={cn(
                          "pl-10 transition-all duration-200",
                          errors.password && "border-red-500 focus-visible:ring-red-500"
                        )}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="remember"
                        checked={data.remember}
                        onCheckedChange={(checked) =>
                          setData('remember', checked === true)
                        }
                      />
                      <Label
                        htmlFor="remember"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Remember me
                      </Label>
                    </div>

                    {canResetPassword && (
                      <Link
                        href={route('password.request')}
                        className="text-sm text-muted-foreground hover:text-primary underline-offset-4 hover:underline"
                      >
                        Forgot password?
                      </Link>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>

          <CardFooter className="flex flex-col space-y-4">
            <Button
              type="submit"
              disabled={processing}
              className="w-full transition-all duration-200 hover:scale-[1.02]"
            >
              {processing && (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              )}
              {step === 'email' ? 'Continue' : 'Sign in'}
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>

            </div>
                <Socialstream
                  providers={socialstream.providers}
                  show={socialstream.show}
                  prompt={socialstream.prompt}
                />

            <div className="text-center">
              <Link
                href='/register'
                className="text-sm text-muted-foreground hover:text-primary underline-offset-4 hover:underline"
              >
                Don't have an account? Sign up
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </AuthenticationLayout>
  );
}
