import { useForm } from '@inertiajs/react';
import classNames from 'classnames';
import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import useRoute from '@/Hooks/useRoute';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Session } from '@/types';
import { Monitor, Smartphone, Clock, CheckCircle2 } from "lucide-react";

interface Props {
  sessions: Session[];
}

export default function LogoutOtherBrowserSessions({ sessions }: Props) {
  const [confirmingLogout, setConfirmingLogout] = useState(false);
  const route = useRoute();
  const passwordRef = useRef<HTMLInputElement>(null);
  const form = useForm({
    password: '',
  });

  function confirmLogout() {
    setConfirmingLogout(true);
    setTimeout(() => passwordRef.current?.focus(), 250);
  }

  function logoutOtherBrowserSessions() {
    form.delete(route('other-browser-sessions.destroy'), {
      preserveScroll: true,
      onSuccess: () => closeModal(),
      onError: () => passwordRef.current?.focus(),
      onFinish: () => form.reset(),
    });
  }

  function closeModal() {
    setConfirmingLogout(false);
    form.reset();
  }

  function getDeviceIcon(agent: string) {
    if (agent.toLowerCase().includes('mobile')) {
      return <Smartphone className="w-8 h-8 text-gray-500" />;
    }
    return <Monitor className="w-8 h-8 text-gray-500" />;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card>
        <CardHeader>
          <CardTitle>Browser Sessions</CardTitle>
          <CardDescription>
            Manage and log out your active sessions on other browsers and devices.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="max-w-xl text-sm text-gray-600">
            If necessary, you may log out of all of your other browser sessions
            across all of your devices. Some of your recent sessions are listed
            below; however, this list may not be exhaustive. If you feel your
            account has been compromised, you should also update your password.
          </div>

          {sessions.length > 0 && (
            <motion.div
              className="mt-5 space-y-6"
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1
                  }
                }
              }}
              initial="hidden"
              animate="show"
            >
              {sessions.map((session, i) => (
                <motion.div
                  key={i}
                  className="flex items-center"
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    show: { opacity: 1, x: 0 }
                  }}
                >
                  <div className="flex-shrink-0">
                    {getDeviceIcon(session.agent.platform)}
                  </div>

                  <div className="flex-grow ml-3">
                    <div className="text-sm text-gray-600">
                      {session.agent.platform} - {session.agent.browser}
                    </div>

                    <div className="flex items-center text-xs text-gray-500">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {session.ip_address}
                      </div>
                      {session.is_current_device ? (
                        <div className="flex items-center ml-2 text-green-500">
                          <CheckCircle2 className="w-4 h-4 mr-1" />
                          <span>This device</span>
                        </div>
                      ) : (
                        <div className="ml-2">
                          Last active {session.last_active}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          <div className="flex items-center mt-5">
            <Button
              variant="secondary"
              onClick={confirmLogout}
              className="flex items-center gap-2"
            >
              Log Out Other Browser Sessions
            </Button>

            {form.recentlySuccessful && (
              <span className="ml-3 text-sm text-green-600">Done.</span>
            )}
          </div>
        </CardContent>
      </Card>

      <Dialog open={confirmingLogout} onOpenChange={setConfirmingLogout}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Log Out Other Browser Sessions</DialogTitle>
            <DialogDescription>
              Please enter your password to confirm you would like to log out of
              your other browser sessions across all of your devices.
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
                variant="default"
                onClick={logoutOtherBrowserSessions}
                className={classNames({ 'opacity-25': form.processing })}
                disabled={form.processing}
              >
                Log Out Other Browser Sessions
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}
