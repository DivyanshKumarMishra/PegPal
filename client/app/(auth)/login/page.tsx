'use client';

import { login_schema } from '@/types/auth/auth.schema';
import { login_fields, login_names } from '@/types/auth/auth.form';
import { LoginValues } from '@/types/auth/auth.types';
import RenderForm from '@/app/_custom_components/form';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import AppLogo from '@/app/_custom_components/Logo';
import useFetch from '@/hooks/UseFetch';
import { SubmitHandler } from 'react-hook-form';
import { LOGIN_URL } from '@/utils/url_constants';
import { toast } from 'sonner';

function LoginPage() {
  const { apiFunc, loading } = useFetch<LoginValues>();

  const loginHandler: SubmitHandler<LoginValues> = async (data) => {
    const apiData = await apiFunc(LOGIN_URL, {
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
        <RenderForm<LoginValues, login_names>
          fields={login_fields}
          schema={login_schema}
          submitHandler={loginHandler}
          loading={loading}
        />
      </CardContent>
    </Card>
  );
}

export default LoginPage;
