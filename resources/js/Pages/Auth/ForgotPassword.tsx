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
} from "@/Components/ui/card";
import { Label } from "@/Components/ui/label";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Toaster } from "@/Components/ui/sonner";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Loader2, Mail, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from '@inertiajs/react';
import AuthenticationLayout from '@/Layouts/AuthenticationLayout';

interface Props {
  status: string;
}

export default function ForgotPassword({ status }: Props) {
  const route = useRoute();
  const form = useForm({
    email: '',
  });

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    form.post(route('password.email'), {
      onSuccess: () => {
        toast.success('Password reset link sent!');
      },
      onError: (errors) => {
        Object.entries(errors).forEach(([key, value]) => {
          toast.error(value as string);
        });
      },
    });
  }

  return (
    <AuthenticationLayout title="Forgot Password">
      <Card className="border-none shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Forgot Password
          </CardTitle>
          <CardDescription className="text-center">
            Enter your email address and we'll send you a password reset link.
          </CardDescription>
        </CardHeader>

        <form onSubmit={onSubmit}>
          <CardContent className="space-y-4">
            {status && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800"
              >
                {status}
              </motion.div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email address</Label>
              <div className="relative">
                <Mail className="absolute w-4 h-4 left-3 top-3 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  value={form.data.email}
                  onChange={e => form.setData('email', e.currentTarget.value)}
                  required
                  autoFocus
                  placeholder="name@example.com"
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
          </CardContent>

          <CardFooter className="flex flex-col space-y-4">
            <Button
              type="submit"
              disabled={form.processing}
              className="w-full"
            >
              {form.processing && (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              )}
              Send Reset Link
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

            <Link
              href={route('login')}
              className="flex items-center justify-center text-sm text-muted-foreground hover:text-primary"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to login
            </Link>
          </CardFooter>
        </form>
      </Card>
    </AuthenticationLayout>
  );
}
