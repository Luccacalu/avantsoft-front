'use client';

import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { LogOut, UserCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function Header() {
  const { isAuthenticated, user, logout, isLoading } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <header className="bg-white border-b sticky top-0 z-50">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <div className="flex items-center">
          <Link
            href="/"
            className="text-2xl font-bold text-blue-500 hover:text-green-800 transition-colors"
          >
            AvanToys
          </Link>
        </div>

        <div className="flex items-center gap-4">
          {isLoading ? (
            <div className="h-8 w-24 bg-gray-200 rounded-md animate-pulse"></div>
          ) : isAuthenticated ? (
            <>
              <div className="hidden sm:flex items-center gap-2">
                <Button asChild variant="ghost">
                  <Link href="/clients">Clientes</Link>
                </Button>
                <Button asChild variant="ghost">
                  <Link href="/clients/report">Relatório</Link>
                </Button>
                <Button asChild variant="ghost">
                  <Link href="/stats">Estatísticas</Link>
                </Button>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <UserCircle className="h-5 w-5 text-gray-500" />
                  <span className="text-sm font-medium text-gray-700 hidden md:block">
                    Olá, {user?.name}
                  </span>
                </div>
                <Button variant="ghost" size="icon" onClick={handleLogout} title="Sair">
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Button asChild variant="ghost">
                <Link href="/login">Login</Link>
              </Button>
              <Button asChild>
                <Link href="/register">Registrar-se</Link>
              </Button>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
