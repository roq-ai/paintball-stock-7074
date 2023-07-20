import axios from 'axios';
import queryString from 'query-string';
import { SalesInterface, SalesGetQueryInterface } from 'interfaces/sales';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getSales = async (query?: SalesGetQueryInterface): Promise<PaginatedInterface<SalesInterface>> => {
  const response = await axios.get('/api/sales', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createSales = async (sales: SalesInterface) => {
  const response = await axios.post('/api/sales', sales);
  return response.data;
};

export const updateSalesById = async (id: string, sales: SalesInterface) => {
  const response = await axios.put(`/api/sales/${id}`, sales);
  return response.data;
};

export const getSalesById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/sales/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteSalesById = async (id: string) => {
  const response = await axios.delete(`/api/sales/${id}`);
  return response.data;
};
