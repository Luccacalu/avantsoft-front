import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Suspense } from 'react';
import { getClients } from '@/lib/api/clients';
import { ClientFilters } from '@/components/clients/client-filters';
import { ClientList } from '@/components/clients/client-list';
import { PaginationControls } from '@/components/clients/client-pagination';
import { cookies } from 'next/headers';

type ClientsPageProps = {
  searchParams?: Promise<{
    page?: string;
    limit?: string;
    name?: string;
    email?: string;
  }>;
};

export default async function ClientsPage({ searchParams }: ClientsPageProps) {
  const params = await searchParams;
  const page = Number(params?.page) || 1;
  const limit = Number(params?.limit) || 4;

  const cookieStore = await cookies();
  const token = cookieStore.get('access_token')?.value;

  const response = await getClients(
    { page, limit, name: params?.name, email: params?.email },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  const clients = response.data;
  const totalPages = response.meta.lastPage;

  return (
    <main className="container mx-auto p-4 md:p-8">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Meus Clientes</h1>
          <p className="text-gray-600 mt-1">Busque, filtre e gerencie seus clientes.</p>
        </div>
        <Button className="mt-4 md:mt-0" size="lg" asChild>
          <Link href="/clients/new">Novo Cliente</Link>
        </Button>
      </header>

      <ClientFilters />

      <div className="mt-6 bg-white rounded-lg shadow-md">
        <Suspense fallback={<div className="text-center p-8">Carregando clientes...</div>}>
          <ClientList clients={clients} />
        </Suspense>
      </div>

      <div className="mt-6 flex justify-center">
        <PaginationControls currentPage={page} totalPages={totalPages} />
      </div>
    </main>
  );
}
