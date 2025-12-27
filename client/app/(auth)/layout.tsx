import React from 'react';

function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex-1 flex items-center justify-center w-full'>
      {children}
    </div>
  );
}

export default AuthLayout;
