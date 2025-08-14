'use client';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
}

export function PaginationControls({ currentPage, totalPages }: PaginationControlsProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', String(newPage));
    router.push(`${pathname}?${params.toString()}`);
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center gap-4">
      <Button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        variant="outline"
        size="sm"
      >
        Anterior
      </Button>
      <span className="text-sm">
        Página {currentPage} de {totalPages}
      </span>
      <Button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        variant="outline"
        size="sm"
      >
        Próximo
      </Button>
    </div>
  );
}
