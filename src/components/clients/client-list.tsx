import type { Client } from '@/types';

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
      {clients.map((client) => (
        <li key={client.id} className="p-4 flex items-center justify-between hover:bg-gray-50">
          <div>
            <p className="font-medium text-indigo-600">{client.name}</p>
            <p className="text-sm text-gray-600">{client.email}</p>
          </div>
          <div className="text-right">
            <p className="text-sm font-semibold">{client.sales.length} vendas</p>
            <p className="text-xs text-gray-500 mt-1">
              Nascido em: {new Date(client.birthDate).toLocaleDateString('pt-BR')}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}
