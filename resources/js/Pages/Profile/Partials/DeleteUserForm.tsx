import { useForm } from '@inertiajs/react';
import classNames from 'classnames';
import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import useRoute from '@/Hooks/useRoute';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export default function DeleteUserForm() {
  const route = useRoute();
  const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
  const form = useForm({
    password: '',
  });
  const passwordRef = useRef<HTMLInputElement>(null);

  function confirmUserDeletion() {
    setConfirmingUserDeletion(true);
    setTimeout(() => passwordRef.current?.focus(), 250);
  }

  function deleteUser() {
    form.delete(route('current-user.destroy'), {
      preserveScroll: true,
      onSuccess: () => closeModal(),
      onError: () => passwordRef.current?.focus(),
      onFinish: () => form.reset(),
    });
  }

  function closeModal() {
    setConfirmingUserDeletion(false);
    form.reset();
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="border-red-200 bg-red-50">
        <CardHeader>
          <CardTitle className="text-red-800">Delete Account</CardTitle>
          <CardDescription className="text-red-600">
            Permanently delete your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="max-w-xl text-sm text-red-600">
            Once your account is deleted, all of its resources and data will be
            permanently deleted. Before deleting your account, please download any
            data or information that you wish to retain.
          </div>

          <div className="mt-5">
            <Button
              variant="destructive"
              onClick={confirmUserDeletion}
              className="flex items-center gap-2"
            >
              <AlertCircle className="w-4 h-4" />
              Delete Account
            </Button>
          </div>
        </CardContent>
      </Card>

      <Dialog open={confirmingUserDeletion} onOpenChange={setConfirmingUserDeletion}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Account</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete your account? Once your account is
              deleted, all of its resources and data will be permanently deleted.
              Please enter your password to confirm you would like to permanently
              delete your account.
            </DialogDescription>
          </DialogHeader>

          <div className="mt-4">
            <Input
              type="password"
              className="mt-1"
              placeholder="Password"
              ref={passwordRef}
              value={form.data.password}
              onChange={e => form.setData('password', e.currentTarget.value)}
            />

            {form.errors.password && (
              <Alert variant="destructive" className="mt-2">
                <AlertDescription>{form.errors.password}</AlertDescription>
              </Alert>
            )}
          </div>

          <DialogFooter>
            <div className="flex justify-end gap-3">
              <Button
                variant="outline"
                onClick={closeModal}
              >
                Cancel
              </Button>

              <Button
                variant="destructive"
                onClick={deleteUser}
                className={classNames({ 'opacity-25': form.processing })}
                disabled={form.processing}
              >
                Delete Account
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}
