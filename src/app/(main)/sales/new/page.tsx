import { CreateSaleForm } from '@/components/sales/create-sale-form';
import { getClients } from '@/lib/api/clients';
import { cookies } from 'next/headers';

export default async function NewSalePage() {
  const cookieStore = await cookies();
  const token = cookieStore.get('access_token')?.value;

  const response = await getClients(
    { page: 1, limit: 500 },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  const clients = response.data;

  return (
    <main className="container mx-auto p-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6">Registrar Nova Venda</h1>
      <CreateSaleForm clients={clients} />
    </main>
  );
}
