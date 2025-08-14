import Cookies from 'js-cookie';

export async function api<T = unknown>(path: string, init?: RequestInit): Promise<T> {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const url = new URL(path, baseUrl);

  const headers = new Headers();
  headers.append('Content-Type', 'application/json');

  if (!headers.has('Authorization')) {
    const token = Cookies.get('access_token');
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
  }

  if (init?.headers) {
    const initHeaders = new Headers(init.headers);
    initHeaders.forEach((value, key) => {
      headers.set(key, value);
    });
  }

  const response = await fetch(url, {
    ...init,
    headers,
  });

  if (!response.ok) {
    try {
      const errorBody = await response.json();
      throw new Error(errorBody.message || `Erro na API: ${response.statusText}`);
    } catch {
      throw new Error(`Erro na API: ${response.status} ${response.statusText}`);
    }
  }

  const contentType = response.headers.get('content-type');
  if (!contentType || !contentType.includes('application/json')) {
    return {} as T;
  }

  return response.json();
}
