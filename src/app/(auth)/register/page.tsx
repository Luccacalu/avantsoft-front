'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { register } = useAuth();
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      await register({ name, email, password });

      setSuccessMessage('Conta criada com sucesso! Redirecionando para o login em 5 segundos...');

      setTimeout(() => {
        router.push('/login');
      }, 5000);
    } catch (err: any) {
      setError(err.message || 'Ocorreu um erro ao criar a conta.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center text-gray-900">Crie sua Conta</h1>

        {!successMessage ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Nome Completo
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                disabled={isLoading}
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                E-mail
              </label>
              <input
                id="email"
                name="email"
                type="email"
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
                minLength={6}
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
                {isLoading ? 'Criando conta...' : 'Criar Conta'}
              </Button>
            </div>
          </form>
        ) : (
          <p className="text-sm text-center text-green-600 bg-green-100 p-3 rounded-md">
            {successMessage}
          </p>
        )}

        <div className="flex flex-col items-center gap-2">
          <span className="text-sm text-gray-600">Já tem uma conta?</span>
          <Link href="/login">
            <Button variant="outline" size="sm" asChild>
              <span>Faça o login</span>
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
