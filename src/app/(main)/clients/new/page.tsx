'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/api/clients';
import Link from 'next/link';

export default function NewClientPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      await createClient({ name, email, birthDate });
      setSuccessMessage('Cliente criado com sucesso! Redirecionando...');

      setTimeout(() => {
        router.push('/clients');
      }, 2000);
    } catch (err: any) {
      setError(err.message || 'Ocorreu um erro ao criar o cliente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="container mx-auto p-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6">Cadastrar Novo Cliente</h1>
      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-lg shadow-md">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Nome Completo
          </label>
          <input
            id="name"
            type="text"
            required
            disabled={isLoading}
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            E-mail
          </label>
          <input
            id="email"
            type="email"
            required
            disabled={isLoading}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label htmlFor="birthDate" className="block text-sm font-medium text-gray-700">
            Data de Nascimento
          </label>
          <input
            id="birthDate"
            type="date"
            required
            disabled={isLoading}
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}
        {successMessage && <p className="text-sm text-green-600">{successMessage}</p>}

        <div className="flex gap-4 items-center">
          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-2 font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 disabled:bg-indigo-300"
          >
            {isLoading ? 'Salvando...' : 'Salvar Cliente'}
          </button>
          <Link href="/clients" className="text-sm text-gray-600 hover:underline">
            Cancelar
          </Link>
        </div>
      </form>
    </main>
  );
}
