import type { CustomReportResponse } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

type TransformedClient = CustomReportResponse['data']['clientes'][0];

interface ClientReportCardProps {
  cliente: TransformedClient;
}

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
};

export function ClientReportCard({ cliente }: ClientReportCardProps) {
  const { info, estatisticas } = cliente;

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{info.nomeCompleto}</CardTitle>
            <CardDescription>
              {info.detalhes.email} - Nascido em:{' '}
              {new Date(info.detalhes.nascimento).toLocaleDateString('pt-BR')}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <h4 className="font-semibold mb-2 text-sm text-gray-700">Histórico de Vendas</h4>
        {estatisticas.vendas.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Data da Venda</TableHead>
                <TableHead className="text-right">Valor</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {estatisticas.vendas.map((venda, index) => (
                <TableRow key={index}>
                  <TableCell>{new Date(venda.data).toLocaleDateString('pt-BR')}</TableCell>
                  <TableCell className="text-right font-medium">
                    {formatCurrency(venda.valor)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <p className="text-sm text-gray-500 italic">
            Nenhuma venda registrada para este cliente.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
