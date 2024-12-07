import { useForm, Head } from '@inertiajs/react';
import React from 'react';
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
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Loader2, Mail, Lock, KeyRound } from "lucide-react";
import { motion } from "framer-motion";
import AuthenticationLayout from '@/Layouts/AuthenticationLayout';

interface Props {
  token: string;
  email: string;
}

export default function ResetPassword({ token, email }: Props) {
  const route = useRoute();
  const form = useForm({
    token,
    email,
    password: '',
    password_confirmation: '',
  });

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    form.post(route('password.update'), {
      onFinish: () => form.reset('password', 'password_confirmation'),
      onSuccess: () => {
        toast.success('Password reset successfully!');
      },
      onError: (errors) => {
        Object.entries(errors).forEach(([key, value]) => {
          toast.error(value as string);
        });
      },
    });
  }

  return (
    <AuthenticationLayout title="Reset Password">
      <Card className="border-none shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Reset Password
          </CardTitle>
          <CardDescription className="text-center">
            Enter your new password below
          </CardDescription>
        </CardHeader>

        <form onSubmit={onSubmit}>
          <CardContent className="space-y-4">
            {/* Email Input */}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute w-4 h-4 left-3 top-3 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  value={form.data.email}
                  onChange={e => form.setData('email', e.currentTarget.value)}
                  required
                  className={cn(
                    "pl-10",
                    form.errors.email && "border-red-500 focus-visible:ring-red-500"
                  )}
                />
              </div>
              {form.errors.email && (
                <p className="text-sm text-red-500">{form.errors.email}</p>
              )}
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <Label htmlFor="password">New Password</Label>
              <div className="relative">
                <Lock className="absolute w-4 h-4 left-3 top-3 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  value={form.data.password}
                  onChange={e => form.setData('password', e.currentTarget.value)}
                  required
                  className={cn(
                    "pl-10",
                    form.errors.password && "border-red-500 focus-visible:ring-red-500"
                  )}
                />
              </div>
              {form.errors.password && (
                <p className="text-sm text-red-500">{form.errors.password}</p>
              )}
            </div>

            {/* Confirm Password Input */}
            <div className="space-y-2">
              <Label htmlFor="password_confirmation">Confirm Password</Label>
              <div className="relative">
                <KeyRound className="absolute w-4 h-4 left-3 top-3 text-muted-foreground" />
                <Input
                  id="password_confirmation"
                  type="password"
                  value={form.data.password_confirmation}
                  onChange={e => form.setData('password_confirmation', e.currentTarget.value)}
                  required
                  className={cn(
                    "pl-10",
                    form.errors.password_confirmation && "border-red-500 focus-visible:ring-red-500"
                  )}
                />
              </div>
              {form.errors.password_confirmation && (
                <p className="text-sm text-red-500">{form.errors.password_confirmation}</p>
              )}
            </div>
          </CardContent>

          <CardFooter>
            <Button
              type="submit"
              disabled={form.processing}
              className="w-full"
            >
              {form.processing && (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              )}
              Reset Password
            </Button>
          </CardFooter>
        </form>
      </Card>
    </AuthenticationLayout>
  );
}
