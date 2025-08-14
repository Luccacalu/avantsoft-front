'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function LoginForm() {
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
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'E-mail ou senha inválidos. Por favor, tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-center text-gray-900">Acessar sua Conta</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label htmlFor="email">E-mail</Label>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            disabled={isLoading}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="password">Senha</Label>
          <Input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            disabled={isLoading}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
        <Button variant="outline" size="sm" asChild>
          <Link href="/register">Cadastre-se</Link>
        </Button>
      </div>
    </div>
  );
}
