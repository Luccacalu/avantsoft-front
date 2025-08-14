'use client';

import type { SalesDailyStat } from '@/types';
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface SalesChartProps {
  data: SalesDailyStat[];
}

export function SalesChart({ data }: SalesChartProps) {
  const formattedData = data.map((item) => ({
    ...item,
    date: new Date(item.date).toLocaleDateString('pt-BR', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }),
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Total de Vendas por Dia</CardTitle>
        <CardDescription>Um resumo das vendas realizadas no período selecionado.</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          {formattedData.length > 0 ? (
            <BarChart data={formattedData} margin={{ top: 20 }}>
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}`}
              />
              <Bar dataKey="total" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]}>
                <LabelList
                  dataKey="total"
                  position="top"
                  className="fill-foreground"
                  fontSize={12}
                />
              </Bar>
            </BarChart>
          ) : (
            <div className="flex h-[350px] w-full items-center justify-center">
              <p className="text-muted-foreground">Nenhum dado para o período selecionado.</p>
            </div>
          )}
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
