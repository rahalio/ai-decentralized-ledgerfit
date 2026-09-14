const API_KEY_STORAGE = 'ledgerfit.apiKey';

export function getApiKey(): string {
  return localStorage.getItem(API_KEY_STORAGE) || 'ledgerfit_demo_local_dev_key';
}

export function setApiKey(key: string) {
  localStorage.setItem(API_KEY_STORAGE, key);
}

export function clearSession() {
  localStorage.removeItem(API_KEY_STORAGE);
  localStorage.removeItem('ledgerfit.authed');
}

export function markAuthed() {
  localStorage.setItem('ledgerfit.authed', '1');
}

export function isAuthed(): boolean {
  return localStorage.getItem('ledgerfit.authed') === '1';
}

export async function api<T = unknown>(
  path: string,
  init: RequestInit = {}
): Promise<T> {
  const headers = new Headers(init.headers);
  headers.set('X-API-Key', getApiKey());
  if (init.body && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }
  if (init.method && init.method !== 'GET' && !headers.has('Idempotency-Key')) {
    headers.set('Idempotency-Key', `web_${crypto.randomUUID()}`);
  }
  const res = await fetch(path, { ...init, headers });
  const text = await res.text();
  const data = text ? JSON.parse(text) : null;
  if (!res.ok) {
    const err = new Error(data?.detail || data?.title || res.statusText) as Error & {
      status?: number;
      body?: unknown;
    };
    err.status = res.status;
    err.body = data;
    throw err;
  }
  return data as T;
}

export type ListEnvelope<T> = { data: { items: T[] }; meta?: unknown };
export type DataEnvelope<T> = { data: T; meta?: unknown };
