import React from 'react';

function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex h-full items-center justify-center px-6 w-full'>
      {children}
    </div>
  );
}

export default AuthLayout;
