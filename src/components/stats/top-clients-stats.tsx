import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import type { TopClientByTotalSales, TopClientByAverageSale, TopClientByFrequency } from '@/types';
import { Trophy, BarChartHorizontalBig, Repeat } from 'lucide-react';

interface TopClientsStatsProps {
  topClientTotal: TopClientByTotalSales;
  topClientAverage: TopClientByAverageSale;
  topClientsFrequency: TopClientByFrequency[];
}

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
};

export function TopClientsStats({
  topClientTotal,
  topClientAverage,
  topClientsFrequency,
}: TopClientsStatsProps) {
  return (
    <>
      <h2 className="text-2xl font-bold text-gray-800 mt-12 mb-4">Destaques dos Clientes</h2>
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Maior Volume de Vendas</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {topClientTotal ? (
              <>
                <div className="text-2xl font-bold">
                  {formatCurrency(topClientTotal.totalSalesValue)}
                </div>
                <p className="text-muted-foreground">{topClientTotal.name}</p>
              </>
            ) : (
              <p className="text-sm text-muted-foreground">Nenhum dado disponível.</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Maior Média por Venda</CardTitle>
            <BarChartHorizontalBig className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {topClientAverage ? (
              <>
                <div className="text-2xl font-bold">
                  {formatCurrency(topClientAverage.averageSaleValue)}
                </div>
                <p className="text-muted-foreground">{topClientAverage.name}</p>
              </>
            ) : (
              <p className="text-sm text-muted-foreground">Nenhum dado disponível.</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Maior Frequência</CardTitle>
            <Repeat className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {topClientsFrequency && topClientsFrequency.length > 0 ? (
              <>
                <div className="text-2xl font-bold">
                  {topClientsFrequency[0].uniqueSaleDays} dias com compras
                </div>
                <div className="text-muted-foreground">
                  {topClientsFrequency.map((client) => client.name).join(', ')}
                </div>
              </>
            ) : (
              <p className="text-sm text-muted-foreground">Nenhum dado disponível.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
