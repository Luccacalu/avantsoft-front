'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Client } from '@/types';
import { createSale } from '@/lib/api/sales';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface CreateSaleFormProps {
  clients: Client[];
}

export function CreateSaleForm({ clients }: CreateSaleFormProps) {
  const [clientId, setClientId] = useState('');
  const [value, setValue] = useState('');
  const [saleDate, setSaleDate] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!clientId) {
      setError('Por favor, selecione um cliente.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const saleData = {
        clientId,
        value: parseFloat(value),
        ...(saleDate && { saleDate }),
      };

      await createSale(saleData);
      setSuccess('Venda registrada com sucesso! Redirecionando...');

      setTimeout(() => {
        router.push('/');
      }, 2000);
    } catch (err: any) {
      setError(err.message || 'Ocorreu um erro ao registrar a venda.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-lg shadow-md">
      <div>
        <label htmlFor="client" className="block text-sm font-medium text-gray-700">
          Cliente
        </label>
        <select
          id="client"
          value={clientId}
          onChange={(e) => setClientId(e.target.value)}
          required
          disabled={isLoading}
          className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md"
        >
          <option value="" disabled>
            Selecione um cliente...
          </option>
          {clients.map((client) => (
            <option key={client.id} value={client.id}>
              {client.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="value" className="block text-sm font-medium text-gray-700">
          Valor da Venda (R$)
        </label>
        <input
          id="value"
          type="number"
          step="0.01"
          min="0.01"
          required
          disabled={isLoading}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="199.99"
          className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>

      <div>
        <label htmlFor="saleDate" className="block text-sm font-medium text-gray-700">
          Data da Venda (Opcional)
        </label>
        <input
          id="saleDate"
          type="date"
          disabled={isLoading}
          value={saleDate}
          onChange={(e) => setSaleDate(e.target.value)}
          className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md"
        />
        <p className="text-xs text-gray-500 mt-1">
          Se deixado em branco, a data de hoje será usada.
        </p>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}
      {success && <p className="text-sm text-green-600">{success}</p>}

      <div className="flex gap-4 items-center">
        <Button type="submit" disabled={isLoading} size="lg" className="min-w-[140px]">
          {isLoading ? 'Registrando...' : 'Registrar Venda'}
        </Button>
        <Link href="/">
          <Button variant="outline" size="lg" className="min-w-[100px]" asChild>
            <span>Cancelar</span>
          </Button>
        </Link>
      </div>
    </form>
  );
}
