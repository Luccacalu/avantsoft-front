import { cookies } from 'next/headers';
import { getClientsCustomReport } from '@/lib/api/clients';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ClientFilters } from '@/components/clients/client-filters';
import { PaginationControls } from '@/components/clients/client-pagination';
import { ClientReportList } from '@/components/clients/client-report-list';

export default async function ClientReportPage({
  searchParams,
}: {
  searchParams: {
    page?: string;
    limit?: string;
    name?: string;
    email?: string;
  };
}) {
  const page = Number(searchParams.page) || 1;
  const limit = Number(searchParams.limit) || 10;

  const cookieStore = await cookies();
  const token = cookieStore.get('access_token')?.value;

  const report = await getClientsCustomReport(
    { page, limit, name: searchParams.name, email: searchParams.email },
    { headers: { Authorization: `Bearer ${token}` } },
  );

  return (
    <main className="container mx-auto p-4 md:p-8">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Relatório de Clientes</h1>
          <p className="text-gray-600 mt-1">
            Análise detalhada de clientes e seu histórico de vendas.
          </p>
        </div>
        <Link href="/clients">
          <Button variant="outline" size="sm" className="mt-4 md:mt-0" asChild>
            <span>Voltar para a lista simples</span>
          </Button>
        </Link>
      </header>

      <ClientFilters />

      <div className="mt-6 space-y-6">
        <ClientReportList clientes={report.data.clientes} />
      </div>

      <div className="mt-8 flex justify-center">
        <PaginationControls
          currentPage={report.meta.pagina}
          totalPages={report.meta.ultimaPagina}
        />
      </div>
    </main>
  );
}
