import { Link, useForm, Head, router } from '@inertiajs/react';
import React, { useState, useEffect } from 'react';
import useRoute from '@/Hooks/useRoute';
import useTypedPage from '@/Hooks/useTypedPage';
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
import { Checkbox } from "@/Components/ui/checkbox";
import { Toaster } from "@/Components/ui/sonner";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Loader2, User, Mail, Lock, KeyRound } from "lucide-react";
import axios from 'axios';
import AuthenticationLayout from '@/Layouts/AuthenticationLayout';

interface Props {
  betaCode?: string;
}

interface PersonInfo {
  first_name: string;
  email?: string;
  id?: string | number;
  student_id?: string | number;
  student_lrn?: string;
  person_id?: string | number;
}

export default function Register({ betaCode }: Props) {
  const page = useTypedPage();
  const route = useRoute();
  const [personInfo, setPersonInfo] = useState<PersonInfo | null>(null);
  const [isChecking, setIsChecking] = useState(false);

  const { data, setData, post, processing, errors, reset } = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    student_id: '',
    terms: false,
    beta_code: betaCode || '',
  });

  // Preserve beta code when component mounts
  useEffect(() => {
    if (betaCode) {
      setData('beta_code', betaCode);
    }
  }, [betaCode]);

  // Add function to check student ID
  async function checkStudentId(id: string) {
    setIsChecking(true);
    try {
      const response = await axios.post('/api/check-student-id', { 
        student_id: id,
        beta_code: data.beta_code // Include beta code in verification request
      });

      const { person, exists } = response.data;
      if (person) {
        const personInfo: PersonInfo = {
          first_name: person.first_name,
          email: person.email || '',
          id: person.id || person.student_id || person.student_lrn,
          person_id: person.id || person.student_id || person.student_lrn,
        };
        setPersonInfo(personInfo);
        // Auto-fill the form with the person's information
        setData(prev => ({
          ...prev,
          name: person.first_name,
          email: person.email || '',
          student_id: id,
        }));
        toast.success('ID found! Please complete your registration.');
      }
    } catch (error: any) {
      const message = error.response?.data?.message || 'Error checking student ID';
      toast.error(message);
      setPersonInfo(null);
    } finally {
      setIsChecking(false);
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!data.terms && page.props.jetstream.hasTermsAndPrivacyPolicyFeature) {
      toast.error('You must accept the terms and conditions');
      return;
    }

    post('/register', {
      preserveScroll: true,
      onSuccess: () => {
        toast.success('Registration successful!', {
          description: 'Redirecting to dashboard...',
        });
      },
      onError: (errors: any) => {
        Object.entries(errors).forEach(([key, value]) => {
          toast.error(Array.isArray(value) ? value[0] : value as string);
        });
      },
      onFinish: () => reset('password', 'password_confirmation'),
    });
  }

  // If no beta code is present, redirect to home
  useEffect(() => {
    if (!betaCode) {
      window.location.href = '/';
    }
  }, [betaCode]);

  return (
    <AuthenticationLayout title="Register">
      <Card className="border-none shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Create an account
          </CardTitle>
          <CardDescription className="text-center">
            Enter your Student/Faculty ID to begin
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {/* Student ID Input - Now First */}
            <div className="space-y-2">
              <Label htmlFor="student_id">Student/Faculty ID</Label>
              <div className="relative">
                <KeyRound className="absolute w-4 h-4 left-3 top-3 text-muted-foreground" />
                <div className="flex gap-2">
                  <Input
                    id="student_id"
                    type="text"
                    value={data.student_id}
                    onChange={e => setData('student_id', e.target.value)}
                    required
                    placeholder="Enter your ID number"
                    className={cn(
                      "pl-10",
                      errors.student_id && "border-red-500 focus-visible:ring-red-500"
                    )}
                  />
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => checkStudentId(data.student_id)}
                    disabled={isChecking || !data.student_id}
                  >
                    {isChecking ? (
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                      'Check ID'
                    )}
                  </Button>
                </div>
              </div>
              {errors.student_id && (
                <p className="text-sm text-red-500">{errors.student_id}</p>
              )}
            </div>

            {personInfo && (
              <>
                {/* Hidden Beta Code Input */}
                <Input
                  type="hidden"
                  name="beta_code"
                  value={data.beta_code}
                />

                {/* Name Input - Auto-filled and readonly */}
                <div className="space-y-2">
                  <Label htmlFor="name">Full name</Label>
                  <div className="relative">
                    <User className="absolute w-4 h-4 left-3 top-3 text-muted-foreground" />
                    <Input
                      id="name"
                      type="text"
                      value={data.name}
                      readOnly
                      className="pl-10 bg-gray-50"
                    />
                  </div>
                </div>

                {/* Email Input */}
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
                      autoComplete="email"
                      placeholder="name@example.com"
                      className={cn(
                        "pl-10",
                        errors.email && "border-red-500 focus-visible:ring-red-500"
                      )}
                    />
                  </div>
                </div>

                {/* Password Input */}
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
                      className={cn(
                        "pl-10",
                        errors.password && "border-red-500 focus-visible:ring-red-500"
                      )}
                    />
                  </div>
                </div>

                {/* Confirm Password Input */}
                <div className="space-y-2">
                  <Label htmlFor="password_confirmation">Confirm password</Label>
                  <div className="relative">
                    <KeyRound className="absolute w-4 h-4 left-3 top-3 text-muted-foreground" />
                    <Input
                      id="password_confirmation"
                      type="password"
                      value={data.password_confirmation}
                      onChange={e => setData('password_confirmation', e.target.value)}
                      required
                      className={cn(
                        "pl-10",
                        errors.password_confirmation && "border-red-500 focus-visible:ring-red-500"
                      )}
                    />
                  </div>
                </div>

                {/* Terms and Conditions */}
                {page.props.jetstream.hasTermsAndPrivacyPolicyFeature && (
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="terms"
                      checked={data.terms}
                      onCheckedChange={(checked) => setData('terms', checked === true)}
                      aria-required="true"
                    />
                    <Label
                      htmlFor="terms"
                      className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      I agree to the{' '}
                      <Link
                        href={route('terms.show')}
                        target="_blank"
                        className="font-medium text-primary hover:underline underline-offset-4"
                      >
                        Terms of Service
                      </Link>
                      {' '}and{' '}
                      <Link
                        href={route('policy.show')}
                        target="_blank"
                        className="font-medium text-primary hover:underline underline-offset-4"
                      >
                        Privacy Policy
                      </Link>
                    </Label>
                  </div>
                )}
              </>
            )}
          </CardContent>

          <CardFooter className="flex flex-col space-y-4">
            {personInfo && (
              <Button
                type="submit"
                disabled={processing}
                className="w-full"
              >
                {processing && (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                )}
                Create account
              </Button>
            )}

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
                href='/login'
                className="text-sm text-muted-foreground hover:text-primary underline-offset-4 hover:underline"
              >
                Already have an account? Sign in
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </AuthenticationLayout>
  );
}
