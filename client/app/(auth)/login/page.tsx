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
import { LOGIN_URL } from '@/utils/Constants';
import { toast } from 'sonner';
import { Api_Method } from '@/types/base';
import { useUser } from '@/app/_contexts/user/UserContext';
import { redirect } from 'next/navigation';
import { UserPublic } from '@/types/user/user';

function LoginPage() {
  const { initUser } = useUser();
  const { apiFunc, loading } = useFetch<LoginValues, UserPublic>();

  const loginHandler: SubmitHandler<LoginValues> = async (body) => {
    const result = await apiFunc(LOGIN_URL, Api_Method.POST, body);
    if (result.ok) {
      toast.success('Login successful');
      initUser();
      redirect('/');
    }
  };

  return (
    <Card className="w-full md:max-w-lg lg:max-w-xl bg-black/50 backdrop-blur-xl ">
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
          btnText="Sign in"
        />
      </CardContent>
    </Card>
  );
}

export default LoginPage;
