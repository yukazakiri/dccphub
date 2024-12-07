import { Link, useForm, Head } from '@inertiajs/react';
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
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { Loader2, Mail, UserCircle, LogOut } from "lucide-react";
import { motion } from "framer-motion";
import AuthenticationLayout from '@/Layouts/AuthenticationLayout';

interface Props {
  status: string;
}

export default function VerifyEmail({ status }: Props) {
  const route = useRoute();
  const form = useForm({});
  const verificationLinkSent = status === 'verification-link-sent';

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    form.post(route('verification.send'), {
      onSuccess: () => {
        toast.success('Verification link sent!');
      },
      onError: () => {
        toast.error('Error sending verification link');
      },
    });
  }

  return (
    <AuthenticationLayout title="Verify Email">
      <Card className="border-none shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Verify Your Email
          </CardTitle>
          <CardDescription className="text-center">
            Thanks for signing up! Before getting started, could you verify your email address?
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            <p>
              A new verification link has been sent to the email address you provided during registration.
              If you didn't receive the email, we'll gladly send you another.
            </p>
          </div>

          {verificationLinkSent && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800"
            >
              A new verification link has been sent to your email address.
            </motion.div>
          )}
        </CardContent>

        <CardFooter className="flex flex-col space-y-4">
          <form onSubmit={onSubmit} className="w-full">
            <Button
              type="submit"
              disabled={form.processing}
              className="w-full"
            >
              {form.processing ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Mail className="w-4 h-4 mr-2" />
              )}
              Resend Verification Email
            </Button>
          </form>

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

          <div className="flex justify-between w-full">
            <Link
              href={route('profile.show')}
              className="flex items-center text-sm text-gray-600 hover:text-primary"
            >
              <UserCircle className="w-4 h-4 mr-2" />
              Edit Profile
            </Link>

            <Link
              href={route('logout')}
              method="post"
              as="button"
              className="flex items-center text-sm text-gray-600 hover:text-primary"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Log Out
            </Link>
          </div>
        </CardFooter>
      </Card>
    </AuthenticationLayout>
  );
}
