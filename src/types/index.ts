export interface Client {
  id: string;
  name: string;
  email: string;
}

export interface Sale {
  id: number;
  value: number;
  saleDate: string;
  clientId: string;
  client: Client;
}

export type CreateSale = {
  value: number;
  clientId: string;
  saleDate?: string;
};

export type UpdateSale = Partial<CreateSale>;

export interface SalesStatsParams {
  year?: number;
  month?: number;
  lastMonths?: number;
  startDate?: string;
  endDate?: string;
}

export interface SalesDailyStat {
  date: string; // Formato 'YYYY-MM-DD'
  total: number;
}

export interface PaginationMeta {
  total: number;
  page: number;
  lastPage: number;
  limit: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: PaginationMeta;
}

export interface Client {
  id: string;
  name: string;
  email: string;
  birthDate: string;
  createdAt: string;
  updatedAt: string;
  sales: Sale[];
}

export type CreateClient = {
  name: string;
  email: string;
  birthDate: string;
};

export type UpdateClient = Partial<CreateClient>;

export interface FindClientsParams {
  name?: string;
  email?: string;
  page?: number;
  limit?: number;
}

interface ReportSale {
  data: string;
  valor: number;
}

interface TransformedClient {
  info: {
    nomeCompleto: string;
    detalhes: {
      email: string;
      nascimento: string;
    };
  };
  estatisticas: {
    vendas: ReportSale[];
  };
  duplicado?: {
    nomeCompleto: string;
  };
}

interface ReportMeta {
  registroTotal: number;
  pagina: number;
  limite: number;
  ultimaPagina: number;
}

export interface CustomReportResponse {
  data: {
    clientes: TransformedClient[];
  };
  meta: ReportMeta;
  redundante: {
    status: string;
  };
}

export type TopClientByTotalSales = {
  id: string;
  name: string;
  email: string;
  totalSalesValue: number;
} | null;

export type TopClientByAverageSale = {
  id: string;
  name: string;
  email: string;
  averageSaleValue: number;
} | null;

export type TopClientByFrequency = {
  id: string;
  name: string;
  email: string;
  uniqueSaleDays: number;
};

export interface User {
  id: string;
  name: string;
  email: string;
}

export type RegisterCredentials = {
  name: string;
  email: string;
  password: string;
};

export type LoginCredentials = Omit<RegisterCredentials, 'name'>;

export interface RegisterResponse {
  message: string;
  userId: string;
}

export interface LoginResponse {
  access_token: string;
}
