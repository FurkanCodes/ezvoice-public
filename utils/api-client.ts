import { cookies } from "next/headers";

// src/utils/apiClient.ts
interface RequestConfig extends RequestInit {
  headers?: HeadersInit;
}

class ApiClient {
  private baseURL: string;

  constructor() {
    // Set base URL directly
    this.baseURL = 'https://invoice-app-n6oh.onrender.com/api';
  }

  private async request(endpoint: string, config: any = {}) {
    const cookieStore = await cookies()
    console.log("cookieStore",cookieStore)
    const headers = new Headers(config.headers || {});
    
    headers.set('Content-Type', 'application/json');
    // if (token) {
    //   headers.set('Authorization', `Bearer ${token}`);
    // }

    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        ...config,
        headers
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Request failed');
      }

      return response.json();
    } catch (error) {
      return Promise.reject(error);
    }
  }

  // CRUD operations with proper typing
  async get<T = any>(endpoint: string, config: any = {}): Promise<T> {
    return this.request(endpoint, { ...config, method: 'GET' });
  }

  async post<T = any>(endpoint: string, data?: any, config: any = {}): Promise<T> {
    return this.request(endpoint, {
      ...config,
      method: 'POST',
      body: JSON.stringify(data)
    });
  }

  async put<T = any>(endpoint: string, data?: any, config: any = {}): Promise<T> {
    return this.request(endpoint, {
      ...config,
      method: 'PUT',
      body: JSON.stringify(data)
    });
  }

  async delete<T = any>(endpoint: string, config: any = {}): Promise<T> {
    return this.request(endpoint, { ...config, method: 'DELETE' });
  }
}

export const apiClient = new ApiClient();
