'use client';

import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

function LandingPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-4">
      <h1 className="text-4xl font-bold text-gray-800">Bem-vindo ao Sistema de Gestão AvanToys!</h1>
      <p className="mt-4 text-lg text-gray-600">Você não está logado!</p>
      <p className="mt-2 text-gray-500">
        Faça o login para continuar ou registre-se para criar uma nova conta.
      </p>
      <div className="mt-8 flex gap-4">
        <Button onClick={() => router.push('/login')} variant="default" size="lg">
          Fazer Login
        </Button>
        <Button onClick={() => router.push('/register')} variant="outline" size="lg">
          Registrar-se
        </Button>
      </div>
    </div>
  );
}

function Dashboard() {
  const { user, logout } = useAuth();

  return (
    <main className="container mx-auto p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Olá, {user?.name}!</h1>
          <p className="text-gray-600">Seja bem-vindo de volta ao seu painel.</p>
        </div>
        <Button onClick={logout} variant="destructive" size="sm">
          Sair
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-white rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Ações Rápidas</h2>
          <div className="flex flex-col gap-4">
            <Button className="w-full" variant="default" size="lg" asChild>
              <Link href="/clients">Gerenciar Clientes</Link>
            </Button>
            <Button className="w-full" variant="secondary" size="lg" asChild>
              <Link href="/sales/new">Registrar Nova Venda</Link>
            </Button>
          </div>
        </div>
        <div className="p-6 bg-white rounded-lg shadow flex flex-col justify-between">
          <h2 className="text-xl font-semibold mb-4">Estatísticas de Vendas</h2>
          <p className="text-gray-500 mb-4">Veja gráficos e dados das vendas realizadas.</p>
          <Button className="w-full" variant="default" size="lg" asChild>
            <Link href="/stats">Ver Estatísticas</Link>
          </Button>
        </div>
        <div className="p-6 bg-white rounded-lg shadow flex flex-col justify-between">
          <h2 className="text-xl font-semibold mb-4">Relatório Geral</h2>
          <p className="text-gray-500 mb-4">Acesse o relatório completo dos clientes.</p>
          <Button className="w-full" variant="secondary" size="lg" asChild>
            <Link href="/clients/report">Ver Relatório</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}

export default function HomePage() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Carregando...</p>
      </div>
    );
  }

  return isAuthenticated ? <Dashboard /> : <LandingPage />;
}
