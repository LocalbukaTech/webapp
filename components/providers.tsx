'use client';


import {ReactQueryProvider} from '@/components/providers/react-query-provider';
import {ToastProvider, Toaster} from '@/components/ui/toast';

export function Providers({children}: {children: React.ReactNode}) {
  return (
    <ReactQueryProvider>
        <ToastProvider>
          {children}
          <Toaster />
        </ToastProvider>
    </ReactQueryProvider>
  );
}
