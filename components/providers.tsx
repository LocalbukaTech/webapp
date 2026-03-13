'use client';


import {ReactQueryProvider} from '@/components/providers/react-query-provider';
import {ToastProvider, Toaster} from '@/components/ui/toast';
import {AuthProvider} from '@/context/AuthContext';
import {AuthModal} from '@/components/modals/auth-modal';

export function Providers({children}: {children: React.ReactNode}) {
  return (
    <ReactQueryProvider>
        <ToastProvider>
          <AuthProvider>
            {children}
            <AuthModal />
          </AuthProvider>
          <Toaster />
        </ToastProvider>
    </ReactQueryProvider>
  );
}
