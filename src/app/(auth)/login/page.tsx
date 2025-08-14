import { LoginForm } from '@/components/login/LoginForm';
import { Suspense } from 'react';

function LoadingFallback() {
  return (
    <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md animate-pulse">
      <div className="h-8 bg-gray-200 rounded w-3/4 mx-auto"></div>
      <div className="space-y-6 pt-6">
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="h-10 bg-gray-200 rounded"></div>
        </div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="h-10 bg-gray-200 rounded"></div>
        </div>
        <div className="h-12 bg-gray-300 rounded"></div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-50">
      <Suspense fallback={<LoadingFallback />}>
        <LoginForm />
      </Suspense>
    </main>
  );
}
