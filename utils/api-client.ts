import { cookies } from "next/headers";

// src/utils/apiClient.ts
interface RequestConfig extends RequestInit {
  headers?: HeadersInit;
}
class ApiClient {
  private baseURL: string;

  constructor() {
    this.baseURL = 'https://invoice-app-n6oh.onrender.com/api';
  }

  private async getAuthHeader(): Promise<Headers> {
    const headers = new Headers();
    headers.set('Content-Type', 'application/json');

    const cookieStore = await cookies();
    const token = cookieStore.get("token");

    if (token?.value) {
      headers.set('Authorization', `Bearer ${token.value}`);
    }

    return headers;
  }

  private async request(endpoint: string, config: any = {}) {
    try {
      const headers = await this.getAuthHeader();
      
      // Merge with any additional headers from config
      if (config.headers) {
        Object.entries(config.headers).forEach(([key, value]) => {
          headers.set(key, value as string);
        });
      }

      const response = await fetch(`${this.baseURL}${endpoint}`, {
        ...config,
        headers,
        credentials: 'include'
      });

      if (!response.ok) {
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Request failed');
        } else {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      }
  
      const text = await response.text();
      if (!text) {
        return null;
      }
  
      return JSON.parse(text);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async get<T = any>(endpoint: string, config: any = {}): Promise<T> {
    return this.request(endpoint, { ...config, method: 'GET' });
  }

  async post<T = any>(endpoint: string, data?: any, config: any = {}): Promise<T> {
    return this.request(endpoint, {
      ...config,
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined
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
