import { cookies } from 'next/headers';
import { getSalesStats } from '@/lib/api/sales';
import {
  getTopClientByTotalSales,
  getTopClientByAverageSale,
  getTopClientsByFrequency,
} from '@/lib/api/clients';

import { Suspense } from 'react';
import type { SalesStatsParams } from '@/types';
import { TopClientsStats } from '@/components/stats/top-clients-stats';
import { SalesChart } from '@/components/stats/sales-chart';
import { StatsFilters } from '@/components/stats/stats-filters';

interface StatsPageProps {
  searchParams: SalesStatsParams;
}

export default async function StatsPage({ searchParams }: StatsPageProps) {
  const cookieStore = await cookies();
  const token = cookieStore.get('access_token')?.value;

  const fetchOptions = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const [salesData, topClientTotal, topClientAverage, topClientsFrequency] = await Promise.all([
    getSalesStats(searchParams, fetchOptions),
    getTopClientByTotalSales(fetchOptions),
    getTopClientByAverageSale(fetchOptions),
    getTopClientsByFrequency(fetchOptions),
  ]);

  return (
    <main className="container mx-auto p-4 md:p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Estatísticas</h1>
        <p className="text-gray-600 mt-1">Analise o desempenho das suas vendas e clientes.</p>
      </header>

      <Suspense fallback={<div>Carregando filtros...</div>}>
        <StatsFilters />
      </Suspense>

      <div className="mt-6">
        <Suspense fallback={<div>Carregando gráfico...</div>}>
          <SalesChart data={salesData} />
        </Suspense>
      </div>

      <Suspense fallback={<div>Carregando destaques...</div>}>
        <TopClientsStats
          topClientTotal={topClientTotal}
          topClientAverage={topClientAverage}
          topClientsFrequency={topClientsFrequency}
        />
      </Suspense>
    </main>
  );
}
