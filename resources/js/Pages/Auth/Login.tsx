import { Link, useForm, Head } from '@inertiajs/react';
import React, { useState } from 'react';
import useRoute from '@/Hooks/useRoute';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Loader2, ArrowLeft, Mail, Lock } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import AuthenticationLayout from '@/Layouts/AuthenticationLayout';

interface Props {
  canResetPassword: boolean;
  status: string;
}

export default function Login({ canResetPassword, status }: Props) {
  const route = useRoute();
  const [step, setStep] = useState<'email' | 'password'>('email');
  const { data, setData, post, processing, errors, reset } = useForm({
    email: '',
    password: '',
    remember: false,
  });

  // Handle email verification
  const handleEmailVerification = (e: React.FormEvent) => {
    e.preventDefault();
    post(route('login.verify-email'), {
      data: { email: data.email },
      preserveScroll: true,
      onSuccess: () => {
        setStep('password');
        toast.success('Email verified', {
          description: 'Please enter your password to continue',
        });
      },
      onError: (errors) => {
        toast.error(errors.email as string || 'Invalid email');
        const emailInput = document.getElementById('email');
        emailInput?.focus();
      },
    });
  };

  // Handle final login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    post(route('login'), {
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

  React.useEffect(() => {
    if (status) {
      toast.info(status);
    }
  }, [status]);

  return (
    <AuthenticationLayout title="Login">
      <Card className="border-none shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            {step === 'email' ? 'Welcome back' : 'Enter your password'}
          </CardTitle>
          <CardDescription className="text-center">
            {step === 'email' ? (
              'Please enter your email to continue'
            ) : (
              <div className="flex items-center justify-center gap-2">
                <Mail className="w-4 h-4" />
                <span className="font-medium">{data.email}</span>
              </div>
            )}
          </CardDescription>
        </CardHeader>

        <form onSubmit={step === 'email' ? handleEmailVerification : handleLogin}>
          <CardContent className="space-y-4">
            {status && (
              <Alert variant="default">
                <AlertDescription>{status}</AlertDescription>
              </Alert>
            )}

            {step === 'email' ? (
              <div className="space-y-2">
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
                      "pl-10",
                      errors.email && "border-red-500 focus-visible:ring-red-500"
                    )}
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-4">
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
                        "pl-10",
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
              </div>
            )}
          </CardContent>

          <CardFooter className="flex flex-col space-y-4">
            <Button
              type="submit"
              disabled={processing}
              className="w-full"
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
              <div className="relative flex justify-center text-xs uppercase">
                <span className="px-2 bg-background text-muted-foreground">
                  Or
                </span>
              </div>
            </div>

            <div className="text-center">
              <Link
                href={route('register')}
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
