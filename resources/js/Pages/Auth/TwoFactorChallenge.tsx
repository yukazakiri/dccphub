import { useForm, Head } from '@inertiajs/react';
import React, { useRef, useState } from 'react';
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
import { Toaster } from "@/Components/ui/sonner";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Loader2, Shield, Key } from "lucide-react";
import AuthenticationLayout from '@/Layouts/AuthenticationLayout';

export default function TwoFactorChallenge() {
  const route = useRoute();
  const [recovery, setRecovery] = useState(false);
  const form = useForm({
    code: '',
    recovery_code: '',
  });
  const recoveryCodeRef = useRef<HTMLInputElement>(null);
  const codeRef = useRef<HTMLInputElement>(null);

  function toggleRecovery(e: React.FormEvent) {
    e.preventDefault();
    const isRecovery = !recovery;
    setRecovery(isRecovery);

    setTimeout(() => {
      if (isRecovery) {
        recoveryCodeRef.current?.focus();
        form.setData('code', '');
      } else {
        codeRef.current?.focus();
        form.setData('recovery_code', '');
      }
    }, 100);
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    form.post(route('two-factor.login'), {
      onError: (errors: any) => {
        Object.entries(errors).forEach(([key, value]) => {
          toast.error(value as string);
        });
      },
      onSuccess: () => {
        toast.success('Authentication successful!');
      },
    });
  }

  return (
    <AuthenticationLayout title="Two-Factor Authentication">
      <Card className="border-none shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Two-Factor Authentication
          </CardTitle>
          <CardDescription className="text-center">
            {recovery
              ? 'Please confirm access using one of your emergency recovery codes.'
              : 'Please confirm access using your authentication code.'}
          </CardDescription>
        </CardHeader>

        <form onSubmit={onSubmit}>
          <CardContent className="space-y-4">
            {recovery ? (
              <div className="space-y-2">
                <Label htmlFor="recovery_code">Recovery Code</Label>
                <div className="relative">
                  <Key className="absolute w-4 h-4 left-3 top-3 text-muted-foreground" />
                  <Input
                    id="recovery_code"
                    type="text"
                    value={form.data.recovery_code}
                    onChange={e => form.setData('recovery_code', e.currentTarget.value)}
                    ref={recoveryCodeRef}
                    autoComplete="one-time-code"
                    className={cn(
                      "pl-10",
                      form.errors.recovery_code && "border-red-500 focus-visible:ring-red-500"
                    )}
                  />
                </div>
                {form.errors.recovery_code && (
                  <p className="text-sm text-red-500">{form.errors.recovery_code}</p>
                )}
              </div>
            ) : (
              <div className="space-y-2">
                <Label htmlFor="code">Authentication Code</Label>
                <div className="relative">
                  <Shield className="absolute w-4 h-4 left-3 top-3 text-muted-foreground" />
                  <Input
                    id="code"
                    type="text"
                    inputMode="numeric"
                    value={form.data.code}
                    onChange={e => form.setData('code', e.currentTarget.value)}
                    autoFocus
                    ref={codeRef}
                    autoComplete="one-time-code"
                    className={cn(
                      "pl-10",
                      form.errors.code && "border-red-500 focus-visible:ring-red-500"
                    )}
                  />
                </div>
                {form.errors.code && (
                  <p className="text-sm text-red-500">{form.errors.code}</p>
                )}
              </div>
            )}
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
              Verify
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

            <Button
              type="button"
              variant="ghost"
              className="text-sm text-muted-foreground hover:text-primary"
              onClick={toggleRecovery}
            >
              {recovery ? 'Use authentication code' : 'Use recovery code'}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </AuthenticationLayout>
  );
}
