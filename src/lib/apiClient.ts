const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const apiClient = {
  get: async <T>(endpoint: string): Promise<T> => {
    const response = await fetch(`${API_URL}/${endpoint.replace(/^\//, '')}`);
    if (!response.ok) throw new Error(`API GET error: ${response.statusText}`);
    return response.json();
  },

  post: async <T>(endpoint: string, data: any): Promise<T> => {
    const response = await fetch(`${API_URL}/${endpoint.replace(/^\//, '')}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error(`API POST error: ${response.statusText}`);
    return response.json();
  },

  patch: async <T>(endpoint: string, data: any): Promise<T> => {
    const response = await fetch(`${API_URL}/${endpoint.replace(/^\//, '')}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error(`API PATCH error: ${response.statusText}`);
    return response.json();
  },

  delete: async <T>(endpoint: string): Promise<T> => {
    const response = await fetch(`${API_URL}/${endpoint.replace(/^\//, '')}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error(`API DELETE error: ${response.statusText}`);
    return response.json();
  }
};

export default apiClient;
