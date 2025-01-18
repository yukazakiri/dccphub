import { router } from '@inertiajs/core';
import { useForm } from '@inertiajs/react';
import axios from 'axios';
import classNames from 'classnames';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Alert, AlertDescription } from "@/Components/ui/alert";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/Components/ui/dialog";
import { ScrollArea } from "@/Components/ui/scroll-area";
import { Shield, Key, RefreshCw, Eye } from "lucide-react";
import useTypedPage from '@/Hooks/useTypedPage';

interface Props {
  requiresConfirmation: boolean;
}

export default function TwoFactorAuthenticationForm({
  requiresConfirmation,
}: Props) {
  const page = useTypedPage();
  const [enabling, setEnabling] = useState(false);
  const [disabling, setDisabling] = useState(false);
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [recoveryCodes, setRecoveryCodes] = useState<string[]>([]);
  const [confirming, setConfirming] = useState(false);
  const [setupKey, setSetupKey] = useState<string | null>(null);
  const confirmationForm = useForm({
    code: '',
  });
  const twoFactorEnabled =
    !enabling && page.props?.auth?.user?.two_factor_enabled;

  function enableTwoFactorAuthentication() {
    setEnabling(true);

    router.post(
      '/user/two-factor-authentication',
      {},
      {
        preserveScroll: true,
        onSuccess() {
          return Promise.all([
            showQrCode(),
            showSetupKey(),
            showRecoveryCodes(),
          ]);
        },
        onFinish() {
          setEnabling(false);
          setConfirming(requiresConfirmation);
        },
      },
    );
  }

  function showSetupKey() {
    return axios.get('/user/two-factor-secret-key').then(response => {
      setSetupKey(response.data.secretKey);
    });
  }

  function confirmTwoFactorAuthentication() {
    confirmationForm.post('/user/confirmed-two-factor-authentication', {
      preserveScroll: true,
      preserveState: true,
      errorBag: 'confirmTwoFactorAuthentication',
      onSuccess: () => {
        setConfirming(false);
        setQrCode(null);
        setSetupKey(null);
      },
    });
  }

  function showQrCode() {
    return axios.get('/user/two-factor-qr-code').then(response => {
      setQrCode(response.data.svg);
    });
  }

  function showRecoveryCodes() {
    return axios.get('/user/two-factor-recovery-codes').then(response => {
      setRecoveryCodes(response.data);
    });
  }

  function regenerateRecoveryCodes() {
    axios.post('/user/two-factor-recovery-codes').then(() => {
      showRecoveryCodes();
    });
  }

  function disableTwoFactorAuthentication() {
    setDisabling(true);

    router.delete('/user/two-factor-authentication', {
      preserveScroll: true,
      onSuccess() {
        setDisabling(false);
        setConfirming(false);
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
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Two Factor Authentication
          </CardTitle>
          <CardDescription>
            Add additional security to your account using two factor authentication.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {twoFactorEnabled || confirming ? (
            <div>
              {confirming ? (
                <div className="space-y-4">
                  {qrCode && (
                    <div className="max-w-xl mt-4 text-sm text-gray-600">
                      <p className="font-semibold">
                        Two factor authentication is now enabled. Scan the following QR code using your phone's authenticator application.
                      </p>
                      <div className="mt-4" dangerouslySetInnerHTML={{ __html: qrCode }}></div>
                    </div>
                  )}

                  {setupKey && (
                    <div className="max-w-xl mt-4 text-sm text-gray-600">
                      <p className="font-semibold">
                        Store these recovery codes in a secure password manager. They can be used to recover access to your account if your two factor authentication device is lost.
                      </p>
                      <div className="mt-4">
                        <Input
                          readOnly
                          value={setupKey}
                          className="font-mono text-xs"
                        />
                      </div>
                    </div>
                  )}

                  <div className="mt-4">
                    <Input
                      type="text"
                      placeholder="Code"
                      value={confirmationForm.data.code}
                      onChange={e => confirmationForm.setData('code', e.currentTarget.value)}
                    />
                    {confirmationForm.errors.code && (
                      <Alert variant="destructive" className="mt-2">
                        <AlertDescription>{confirmationForm.errors.code}</AlertDescription>
                      </Alert>
                    )}
                  </div>

                  <div className="flex mt-4 space-x-2">
                    <Button
                      onClick={confirmTwoFactorAuthentication}
                      disabled={enabling}
                    >
                      Confirm
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setConfirming(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : null}

              {recoveryCodes.length > 0 && !confirming ? (
                <div>
                  <div className="max-w-xl mt-4 text-sm text-gray-600">
                    <p className="font-semibold">
                      Store these recovery codes in a secure password manager. They can be used to recover access to your account if your two factor authentication device is lost.
                    </p>
                  </div>

                  <ScrollArea className="h-48 mt-4">
                    <div className="grid gap-1 p-4 font-mono text-sm rounded-lg bg-muted">
                      {recoveryCodes.map(code => (
                        <div key={code}>{code}</div>
                      ))}
                    </div>
                  </ScrollArea>
                </div>
              ) : null}

              <div className="mt-5 space-x-2">
                {!confirming && (
                  <>
                    {recoveryCodes.length > 0 ? (
                      <Button
                        variant="outline"
                        onClick={regenerateRecoveryCodes}
                        className="flex items-center gap-2"
                      >
                        <RefreshCw className="w-4 h-4" />
                        Regenerate Recovery Codes
                      </Button>
                    ) : (
                      <Button
                        variant="outline"
                        onClick={showRecoveryCodes}
                        className="flex items-center gap-2"
                      >
                        <Eye className="w-4 h-4" />
                        Show Recovery Codes
                      </Button>
                    )}

                    <Button
                      variant="destructive"
                      onClick={disableTwoFactorAuthentication}
                      disabled={disabling}
                      className="flex items-center gap-2"
                    >
                      Disable
                    </Button>
                  </>
                )}
              </div>
            </div>
          ) : (
            <div>
              <div className="max-w-xl mt-3 text-sm text-gray-600">
                When two factor authentication is enabled, you will be prompted for a secure, random token during authentication. You may retrieve this token from your phone's Google Authenticator application.
              </div>

              <div className="mt-4">
                <Button
                  onClick={enableTwoFactorAuthentication}
                  disabled={enabling}
                  className="flex items-center gap-2"
                >
                  <Key className="w-4 h-4" />
                  Enable
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
