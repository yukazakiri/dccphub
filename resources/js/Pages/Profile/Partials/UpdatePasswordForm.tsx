import { useForm } from '@inertiajs/react';
import classNames from 'classnames';
import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import useRoute from '@/Hooks/useRoute';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/Components/ui/card";
import { Label } from "@/Components/ui/label";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import { Alert, AlertDescription } from "@/Components/ui/alert";

export default function UpdatePasswordForm() {
  const route = useRoute();
  const form = useForm({
    current_password: '',
    password: '',
    password_confirmation: '',
  });
  const passwordRef = useRef<HTMLInputElement>(null);
  const currentPasswordRef = useRef<HTMLInputElement>(null);

  function updatePassword() {
    form.put(route('user-password.update'), {
      errorBag: 'updatePassword',
      preserveScroll: true,
      onSuccess: () => form.reset(),
      onError: () => {
        if (form.errors.password) {
          form.reset('password', 'password_confirmation');
          passwordRef.current?.focus();
        }

        if (form.errors.current_password) {
          form.reset('current_password');
          currentPasswordRef.current?.focus();
        }
      },
    });
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card>
        <CardHeader>
          <CardTitle>Update Password</CardTitle>
          <CardDescription>
            Ensure your account is using a long, random password to stay secure.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={e => { e.preventDefault(); updatePassword(); }} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="current_password">Current Password</Label>
              <Input
                id="current_password"
                type="password"
                ref={currentPasswordRef}
                value={form.data.current_password}
                onChange={e => form.setData('current_password', e.currentTarget.value)}
                autoComplete="current-password"
              />
              {form.errors.current_password && (
                <Alert variant="destructive">
                  <AlertDescription>{form.errors.current_password}</AlertDescription>
                </Alert>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">New Password</Label>
              <Input
                id="password"
                type="password"
                ref={passwordRef}
                value={form.data.password}
                onChange={e => form.setData('password', e.currentTarget.value)}
                autoComplete="new-password"
              />
              {form.errors.password && (
                <Alert variant="destructive">
                  <AlertDescription>{form.errors.password}</AlertDescription>
                </Alert>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password_confirmation">Confirm Password</Label>
              <Input
                id="password_confirmation"
                type="password"
                value={form.data.password_confirmation}
                onChange={e => form.setData('password_confirmation', e.currentTarget.value)}
                autoComplete="new-password"
              />
              {form.errors.password_confirmation && (
                <Alert variant="destructive">
                  <AlertDescription>{form.errors.password_confirmation}</AlertDescription>
                </Alert>
              )}
            </div>

            <div className="flex items-center justify-end">
              {form.recentlySuccessful && (
                <span className="mr-3 text-sm text-green-600">Saved.</span>
              )}
              <Button
                type="submit"
                disabled={form.processing}
                className={classNames({ 'opacity-25': form.processing })}
              >
                Save
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}
