import type { CustomReportResponse } from '@/types';
import { ClientReportCard } from './client-report-card';

interface ClientReportListProps {
  clientes: CustomReportResponse['data']['clientes'];
}

export function ClientReportList({ clientes }: ClientReportListProps) {
  if (clientes.length === 0) {
    return (
      <div className="text-center text-gray-500 py-10 bg-white rounded-lg shadow-md">
        <p>Nenhum cliente encontrado para os filtros selecionados.</p>
      </div>
    );
  }

  return (
    <>
      {clientes.map((cliente, index) => (
        <ClientReportCard key={index} cliente={cliente} />
      ))}
    </>
  );
}
