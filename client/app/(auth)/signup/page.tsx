'use client';

import { signup_schema } from '@/types/auth/auth.schema';
import { signup_fields, signup_names } from '@/types/auth/auth.form';
import { SignupValues } from '@/types/auth/auth.types';
import RenderForm from '@/app/_custom_components/form';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import AppLogo from '@/app/_custom_components/Logo';
import type { SubmitHandler } from 'react-hook-form';
import useFetch from '@/hooks/UseFetch';
import { SIGNUP_URL } from '@/utils/url_constants';
import { toast } from 'sonner';

function SignupPage() {
  const { apiFunc, loading } = useFetch<UserPublic>();

  const signupHandler: SubmitHandler<SignupValues> = async (data) => {
    const apiData = await apiFunc(SIGNUP_URL, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    toast.success('Signup successful');
  };

  return (
    <Card className="w-full md:max-w-lg lg:max-w-xl px-6 bg-black/50 backdrop-blur-xl ">
      <CardHeader>
        <CardTitle className="flex justify-center">
          <AppLogo className="text-5xl md:text-6xl" />
        </CardTitle>
        <CardDescription className="text-center">
          Enter your information below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        <RenderForm<SignupValues, signup_names>
          fields={signup_fields}
          schema={signup_schema}
          submitHandler={signupHandler}
          loading={loading}
        />
        <span className="px-6 text-center text-muted-foreground">
          Already have an account?{' '}
          <a href="/login" className="text-accent underline">
            Sign in
          </a>
        </span>
      </CardContent>
    </Card>
  );
}

export default SignupPage;
