import { ResourceCost, SortField, SortOrder } from "@/types/resource-cost";

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

interface FetchOptions {
  method?: HttpMethod;
  headers?: Record<string, string>;
  body?: unknown;
}

const API_BASE_URL = process.env.NET_PUBLIC_API_URL || 'http://localhost:5077';

export async function apiFetch<T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  const { method = 'GET', headers = {}, body } = options;

  try {
    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      body: body ? JSON.stringify(body) : undefined,
    });


    if (response.status === 401) {
      throw new Error('Unauthorized: Invalid credentials');
    } else if (response.status === 403) {
      throw new Error('Forbidden: You do not have permission to access this resource');
    } else if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data as T;
  } catch (error) {
    console.error(`API request failed for ${url}:`, error);
    throw error;
  }
}


export async function getResourceCosts(year?: number, month?: number, token?: string, sortOrder?: SortOrder, sortField?: SortField): Promise<ResourceCost[]> {
  let url = '/api/CostManagement/resourcecosts';

  if (year !== undefined && month !== undefined) {
    url += `/${year}/${month}`;
  }

  if (sortOrder !== undefined && sortField !== undefined) {
    url += `?sortOrder=${sortOrder}&sortField=${sortField}`;
  }
  
  try {
    return await apiFetch<ResourceCost[]>(url, { 
      headers: { 'Authorization': `Bearer ${token}` } 
    });
  } catch (error) {
    console.error('Error fetching resource costs:', error);
    return []
  }
}

export async function getApiData(token: string, endpoint: string): Promise<ResourceCost[]> {
  const url = '/api/test/' + endpoint;
  try {
    return await apiFetch<ResourceCost[]>(url, { 
      headers: { 'Authorization': `Bearer ${token}` } 
    });
  } catch (error) {
    console.error('Error fetching resource costs:', error);
    throw error;
  }
}

interface FetchDataResponse {
  message: string;
}
export async function fetchApiWelcomeData(token: string, endpoint: string) {
  try {
    return await apiFetch<FetchDataResponse>(endpoint, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error('Error fetching welcome data:', error);
    if (error instanceof Error) {
      return { error: error.message };
    } else {
      return { error: 'An unknown error occurred' };
    }
  }
}