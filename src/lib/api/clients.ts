import { api } from './index';
import type {
  Client,
  CreateClient,
  UpdateClient,
  FindClientsParams,
  PaginatedResponse,
  CustomReportResponse,
  TopClientByTotalSales,
  TopClientByAverageSale,
  TopClientByFrequency,
} from '@/types';

const CLIENTS_PATH = '/clients';

export function createClient(data: CreateClient): Promise<Client> {
  return api<Client>(CLIENTS_PATH, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export function getClients(
  params: FindClientsParams = {},
  init?: RequestInit,
): Promise<PaginatedResponse<Client>> {
  const query = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      query.append(key, String(value));
    }
  });

  const queryString = query.toString();
  const path = `${CLIENTS_PATH}?${queryString}`;

  return api<PaginatedResponse<Client>>(path, init);
}

export function getClientById(id: string): Promise<Client> {
  return api<Client>(`${CLIENTS_PATH}/${id}`);
}

export function updateClient(id: string, data: UpdateClient): Promise<Client> {
  return api<Client>(`${CLIENTS_PATH}/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
}

export function deleteClient(id: string): Promise<void> {
  return api<void>(`${CLIENTS_PATH}/${id}`, {
    method: 'DELETE',
  });
}

export function getClientsCustomReport(
  params: FindClientsParams = {},
): Promise<CustomReportResponse> {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined) {
      query.append(key, String(value));
    }
  });
  return api<CustomReportResponse>(`${CLIENTS_PATH}/report?${query.toString()}`);
}

export function getTopClientByTotalSales(): Promise<TopClientByTotalSales> {
  return api<TopClientByTotalSales>(`${CLIENTS_PATH}/stats/top-total-sales`);
}

export function getTopClientByAverageSale(): Promise<TopClientByAverageSale> {
  return api<TopClientByAverageSale>(`${CLIENTS_PATH}/stats/top-average-sale`);
}

export function getTopClientsByFrequency(): Promise<TopClientByFrequency[]> {
  return api<TopClientByFrequency[]>(`${CLIENTS_PATH}/stats/top-purchase-frequency`);
}
