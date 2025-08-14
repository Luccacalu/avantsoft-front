'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      await login({ email, password });

      const from = searchParams.get('from');
      router.push(from || '/');
    } catch (err) {
      console.error(err);
      setError('E-mail ou senha inválidos. Por favor, tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center text-gray-900">Acessar sua Conta</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              E-mail
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              disabled={isLoading}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Senha
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              disabled={isLoading}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {error && (
            <p className="text-sm text-center text-red-600 bg-red-100 p-2 rounded-md">{error}</p>
          )}

          <div>
            <Button type="submit" disabled={isLoading} size="lg" className="w-full">
              {isLoading ? 'Entrando...' : 'Entrar'}
            </Button>
          </div>
        </form>

        <div className="flex flex-col items-center gap-2">
          <span className="text-sm text-gray-600">Não tem uma conta?</span>
          <Link href="/register">
            <Button variant="outline" size="sm" asChild>
              <span>Cadastre-se</span>
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
