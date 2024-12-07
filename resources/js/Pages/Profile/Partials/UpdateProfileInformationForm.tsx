import { router } from '@inertiajs/core';
import { Link, useForm } from '@inertiajs/react';
import classNames from 'classnames';
import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import useRoute from '@/Hooks/useRoute';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { User } from '@/types';
import useTypedPage from '@/Hooks/useTypedPage';

interface Props {
  user: User;
}

export default function UpdateProfileInformationForm({ user }: Props) {
  const form = useForm({
    _method: 'PUT',
    name: user.name,
    email: user.email,
    photo: null as File | null,
  });
  const route = useRoute();
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const photoRef = useRef<HTMLInputElement>(null);
  const page = useTypedPage();
  const [verificationLinkSent, setVerificationLinkSent] = useState(false);

  function updateProfileInformation() {
    form.post(route('user-profile-information.update'), {
      errorBag: 'updateProfileInformation',
      preserveScroll: true,
      onSuccess: () => clearPhotoFileInput(),
    });
  }

  function selectNewPhoto() {
    photoRef.current?.click();
  }

  function updatePhotoPreview() {
    const photo = photoRef.current?.files?.[0];

    if (!photo) {
      return;
    }

    form.setData('photo', photo);

    const reader = new FileReader();

    reader.onload = e => {
      setPhotoPreview(e.target?.result as string);
    };

    reader.readAsDataURL(photo);
  }

  function deletePhoto() {
    router.delete(route('current-user-photo.destroy'), {
      preserveScroll: true,
      onSuccess: () => {
        setPhotoPreview(null);
        clearPhotoFileInput();
      },
    });
  }

  function clearPhotoFileInput() {
    if (photoRef.current?.value) {
      photoRef.current.value = '';
      form.setData('photo', null);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
          <CardDescription>Update your account's profile information and email address.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={e => { e.preventDefault(); updateProfileInformation(); }}>
            {page.props.jetstream.managesProfilePhotos && (
              <div className="space-y-4">
                <Label>Profile Photo</Label>
                <div className="flex items-center gap-4">
                  <input
                    type="file"
                    className="hidden"
                    ref={photoRef}
                    onChange={updatePhotoPreview}
                  />

                  {photoPreview ? (
                    <Avatar className="w-20 h-20">
                      <AvatarImage
                        src={photoPreview}
                        alt={user.name}
                      />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  ) : (
                    <Avatar className="w-20 h-20">
                      <AvatarImage
                        src={user.profile_photo_url}
                        alt={user.name}
                      />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  )}

                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={selectNewPhoto}
                    >
                      Select New Photo
                    </Button>

                    {user.profile_photo_path && (
                      <Button
                        type="button"
                        variant="destructive"
                        onClick={deletePhoto}
                      >
                        Remove Photo
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            )}

            <div className="mt-6 space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="text"
                  value={form.data.name}
                  onChange={e => form.setData('name', e.currentTarget.value)}
                  autoComplete="name"
                />
                {form.errors.name && (
                  <p className="mt-2 text-sm text-red-600">{form.errors.name}</p>
                )}
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={form.data.email}
                  onChange={e => form.setData('email', e.currentTarget.value)}
                />
                {form.errors.email && (
                  <p className="mt-2 text-sm text-red-600">{form.errors.email}</p>
                )}

                {page.props.jetstream.hasEmailVerification && user.email_verified_at === null && (
                  <div className="mt-4">
                    <Alert>
                      <AlertDescription>
                        Your email address is unverified.
                        <Link
                          href={route('verification.send')}
                          method="post"
                          as="button"
                          className="ml-2 text-sm text-gray-600 underline rounded-md hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          onClick={e => {
                            e.preventDefault();
                            setVerificationLinkSent(true);
                          }}
                        >
                          Click here to re-send the verification email.
                        </Link>
                      </AlertDescription>
                    </Alert>

                    {verificationLinkSent && (
                      <Alert className="mt-4" variant="default">
                        <AlertDescription>
                          A new verification link has been sent to your email address.
                        </AlertDescription>
                      </Alert>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-end mt-6">
              {form.recentlySuccessful && (
                <p className="mr-3 text-sm text-green-600">Saved.</p>
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
