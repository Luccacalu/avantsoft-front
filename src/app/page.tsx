'use client';

import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

function LandingPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-4">
      <h1 className="text-4xl font-bold text-gray-800">Bem-vindo ao Sistema de Gestão</h1>
      <p className="mt-4 text-lg text-gray-600">Você não está logado!</p>
      <p className="mt-2 text-gray-500">
        Faça o login para continuar ou registre-se para criar uma nova conta.
      </p>
      <div className="mt-8 flex gap-4">
        <button
          onClick={() => router.push('/login')}
          className="px-6 py-2 font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
        >
          Fazer Login
        </button>
        <button
          onClick={() => router.push('/register')}
          className="px-6 py-2 font-semibold text-indigo-700 bg-white border border-indigo-600 rounded-md hover:bg-indigo-50"
        >
          Registrar-se
        </button>
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
        <button
          onClick={logout}
          className="px-4 py-2 text-sm font-medium text-red-600 bg-red-100 border border-red-200 rounded-md hover:bg-red-200"
        >
          Sair
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 bg-white rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Ações Rápidas</h2>
          <div className="flex flex-col gap-3">
            <Link href="/clients" className="text-indigo-600 hover:underline">
              Gerenciar Clientes
            </Link>
            <Link href="/sales/new" className="text-indigo-600 hover:underline">
              Registrar Nova Venda
            </Link>
          </div>
        </div>
        <div className="p-6 bg-white rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Estatísticas</h2>
          <p className="text-gray-500"></p>
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
