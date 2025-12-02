import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { useTokenStore } from '@/store/zustand/use-token-store';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || '',
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = useTokenStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Global error handling can be added here
    return Promise.reject(error);
  }
);

export type AxiosQueryParams = {
  url: string;
  method?: AxiosRequestConfig['method'];
  data?: AxiosRequestConfig['data'];
  params?: AxiosRequestConfig['params'];
  headers?: AxiosRequestConfig['headers'];
};

export const axiosRequest = async ({ url, method = 'GET', data, params, headers }: AxiosQueryParams) => {
  try {
    const result = await apiClient({
      url,
      method,
      data,
      params,
      headers,
    });
    return result.data;
  } catch (axiosError) {
    throw axiosError as AxiosError;
  }
};
