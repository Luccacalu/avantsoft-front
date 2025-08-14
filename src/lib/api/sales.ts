import { api } from './index';
import type { Sale, CreateSale, UpdateSale, SalesStatsParams, SalesDailyStat } from '@/types';

const SALES_PATH = '/sales';

export function getSales(): Promise<Sale[]> {
  return api<Sale[]>(SALES_PATH);
}

export function getSaleById(id: number): Promise<Sale> {
  return api<Sale>(`${SALES_PATH}/${id}`);
}

export function createSale(data: CreateSale): Promise<Sale> {
  return api<Sale>(SALES_PATH, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export function updateSale(id: number, data: UpdateSale): Promise<Sale> {
  return api<Sale>(`${SALES_PATH}/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
}

export function deleteSale(id: number): Promise<void> {
  return api<void>(`${SALES_PATH}/${id}`, {
    method: 'DELETE',
  });
}

export function getSalesStats(
  params: SalesStatsParams = {},
  init?: RequestInit,
): Promise<SalesDailyStat[]> {
  const query = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      query.append(key, String(value));
    }
  });

  const queryString = query.toString();
  const path = `${SALES_PATH}/stats${queryString ? `?${queryString}` : ''}`;

  return api<SalesDailyStat[]>(path, init);
}
