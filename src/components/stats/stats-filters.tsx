'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '../ui/button';

function getActiveFilterType(params: URLSearchParams): string {
  if (params.has('year')) return 'year';
  if (params.has('lastMonths')) return 'lastMonths';
  return 'dateRange';
}

export function StatsFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [filterType, setFilterType] = useState<string>(() => getActiveFilterType(searchParams));

  const handleApplyFilters = (formData: FormData) => {
    const params = new URLSearchParams();

    switch (filterType) {
      case 'dateRange':
        const startDate = formData.get('startDate') as string;
        const endDate = formData.get('endDate') as string;
        if (startDate) params.set('startDate', startDate);
        if (endDate) params.set('endDate', endDate);
        break;
      case 'year':
        const year = formData.get('year') as string;
        if (year) params.set('year', year);
        break;
      case 'lastMonths':
        const lastMonths = formData.get('lastMonths') as string;
        if (lastMonths) params.set('lastMonths', lastMonths);
        break;
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="p-4 bg-gray-50 border rounded-lg space-y-4">
      <div>
        <Label className="font-semibold text-gray-800">Tipo de Filtro</Label>
        <RadioGroup
          value={filterType}
          onValueChange={setFilterType}
          className="flex flex-col sm:flex-row gap-4 mt-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="dateRange" id="r1" />
            <Label htmlFor="r1">Intervalo de Datas</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="year" id="r2" />
            <Label htmlFor="r2">Por Ano</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="lastMonths" id="r3" />
            <Label htmlFor="r3">Últimos Meses</Label>
          </div>
        </RadioGroup>
      </div>

      <form action={handleApplyFilters}>
        {filterType === 'dateRange' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="startDate">Data Inicial</Label>
              <Input
                id="startDate"
                name="startDate"
                type="date"
                defaultValue={searchParams.get('startDate') ?? ''}
              />
            </div>
            <div>
              <Label htmlFor="endDate">Data Final</Label>
              <Input
                id="endDate"
                name="endDate"
                type="date"
                defaultValue={searchParams.get('endDate') ?? ''}
              />
            </div>
          </div>
        )}

        {filterType === 'year' && (
          <div>
            <Label htmlFor="year">Ano</Label>
            <Input
              id="year"
              name="year"
              type="number"
              placeholder="Ex: 2025"
              defaultValue={searchParams.get('year') ?? ''}
            />
          </div>
        )}

        {filterType === 'lastMonths' && (
          <div>
            <Label htmlFor="lastMonths">Período</Label>
            <Select name="lastMonths" defaultValue={searchParams.get('lastMonths') ?? ''}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione um período..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Último mês</SelectItem>
                <SelectItem value="3">Últimos 3 meses</SelectItem>
                <SelectItem value="6">Últimos 6 meses</SelectItem>
                <SelectItem value="12">Últimos 12 meses</SelectItem>
                <SelectItem value="24">Últimos 2 anos</SelectItem>
                <SelectItem value="36">Últimos 3 anos</SelectItem>
                <SelectItem value="48">Últimos 4 anos</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}

        <Button type="submit" className="mt-4">
          Aplicar Filtros
        </Button>
      </form>
    </div>
  );
}
