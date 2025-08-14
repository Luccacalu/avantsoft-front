import type { Client } from '@/types';
import { findFirstMissingLetter } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

export function ClientList({ clients }: { clients: Client[] }) {
  if (clients.length === 0) {
    return (
      <div className="text-center text-gray-500 py-10">
        <p>Nenhum cliente encontrado.</p>
      </div>
    );
  }
  return (
    <ul className="divide-y divide-gray-200">
      {clients.map((client) => {
        const missingLetter = findFirstMissingLetter(client.name);

        return (
          <li
            key={client.id}
            className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between hover:bg-gray-50"
          >
            <div className="mb-2 sm:mb-0">
              <p className="font-medium text-indigo-600">{client.name}</p>
              <p className="text-sm text-gray-600">{client.email}</p>
              <p className="text-xs text-gray-500 mt-1">
                Nascido em: {new Date(client.birthDate).toLocaleDateString('pt-BR')}
              </p>
            </div>
            <div className="flex items-center gap-4 text-right">
              <div className="flex flex-col items-end">
                <span className="text-xs font-semibold text-gray-500">Letra Faltante</span>
                <Badge variant="secondary" className="text-sm">
                  {missingLetter}
                </Badge>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-xs font-semibold text-gray-500">Vendas</span>
                <p className="text-sm font-semibold">{client.sales.length}</p>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
