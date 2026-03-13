"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useToast } from "@/hooks/use-toast";
import { useLoginMutation } from "@/lib/api";
import { Eye, EyeOff, Loader2 } from "lucide-react";

export default function AdminLogin() {
  const router = useRouter();
  const {toast} = useToast();
  const loginMutation = useLoginMutation();
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    loginMutation.mutate(
      {
        email: credentials.email,
        password: credentials.password,
      },
      {
        onSuccess: () => {
          toast({
            title: 'Welcome back! 👋',
            description: 'You have successfully signed in.',
          });
          router.push('/secure-admin/dashboard');
        },
        onError: (err: any) => {
          const message =
            err?.response?.data?.message ||
            'Invalid email or password. Please try again.';
          setError(message);
        },
      }
    );
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#242424] p-8 rounded-2xl shadow-xl border border-white/5">
        <div className="flex flex-col items-center mb-8">
          <Image
            src="/images/localBuka_logo.png"
            alt="LocalBuka"
            width={64}
            height={64}
            className="h-16 w-16 rounded-full mb-4"
          />
          <h1 
             className="text-3xl text-white font-normal"
             style={{ fontFamily: 'var(--font-hakuna), sans-serif' }}
          >
            LocalBuka Admin
          </h1>
          <p className="text-zinc-400 mt-2 text-sm text-center">
            Enter your credentials to access the admin panel.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
              <div className='bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 px-4 py-3 rounded-lg text-sm'>
                {error}
              </div>
            )}
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1">
              Email Address
            </label>
            <input
              type="email"
              value={credentials.email}
                onChange={(e) =>
                  setCredentials({...credentials, email: e.target.value})
                }
              required
              className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#fbbe15] transition-colors"
              placeholder="admin@localbuka.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                  type={showPassword ? 'text' : 'password'}
                  id='password'
                  required
                  value={credentials.password}
                  onChange={(e) =>
                    setCredentials({...credentials, password: e.target.value})
                  }
                className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-4 py-3 pr-10 text-white focus:outline-none focus:border-[#fbbe15] transition-colors"
                placeholder="••••••••"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-300 transition-colors"
                onClick={() => setShowPassword(!showPassword)}
                title={showPassword ? "Hide password" : "Show password"}
              >
                 {showPassword ? (
                    <EyeOff className='w-5 h-5' />
                  ) : (
                    <Eye className='w-5 h-5' />
                  )}
              </button>
            </div>
          </div>
          <button
            type="submit"
           disabled={loginMutation.isPending}
            className="w-full bg-[#fbbe15] text-[#1a1a1a] font-bold rounded-lg px-4 py-3 mt-4 hover:bg-[#e6ad00] transition-colors disabled:opacity-70 flex justify-center items-center"
          >
              {loginMutation.isPending ? (
                <>
                  <Loader2 className='w-5 h-5 animate-spin' />
                  Signing in...
                </>
              ) : (
                'Login to Dashboard'
              )}
          </button>
        </form>
      </div>
    </div>
  );
}
