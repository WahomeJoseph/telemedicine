import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
} from 'axios';

// ─── Base URL ─────────────────────────────────────────────────────────────────
// NEXT_PUBLIC_ prefix is REQUIRED for Next.js to expose the var to the browser.
// Without it the value is undefined at runtime in the client bundle.
//
// In .env.local:          NEXT_PUBLIC_API_URL=http://localhost:5000
// In production .env:     NEXT_PUBLIC_API_URL=https://api.yourdomain.com
//
// Fallback to localhost:5000 so the app works even with a missing .env
const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, '') || 'http://localhost:5000';

// ─── Axios instance ───────────────────────────────────────────────────────────
export const api: AxiosInstance = axios.create({
  baseURL: `${BASE_URL}/api`,
  headers: { 'Content-Type': 'application/json' },
  timeout: 15_000,
  withCredentials: true,          // send cookies cross-origin in prod
});

// ─── Request interceptor — attach Bearer token ────────────────────────────────
api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('mc_token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ─── Response interceptor — silent token refresh on 401 ──────────────────────
// Queues concurrent failed requests so only ONE refresh call fires.
let isRefreshing = false;
let queue: Array<{
  resolve: (token: string) => void;
  reject: (err: unknown) => void;
}> = [];

function flushQueue(err: unknown, token: string | null) {
  queue.forEach(({ resolve, reject }) =>
    err ? reject(err) : resolve(token!)
  );
  queue = [];
}

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config as AxiosRequestConfig & { _retry?: boolean };

    // Skip if: not a 401, already retried, or it's an auth endpoint itself
    if (
      error.response?.status !== 401 ||
      original._retry ||
      original.url?.includes('/auth/')
    ) {
      return Promise.reject(error);
    }

    // If already refreshing, queue this request
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        queue.push({
          resolve: (token) => {
            if (original.headers)
              original.headers['Authorization'] = `Bearer ${token}`;
            resolve(api(original));
          },
          reject,
        });
      });
    }

    original._retry = true;
    isRefreshing = true;

    const refreshToken =
      typeof window !== 'undefined'
        ? localStorage.getItem('mc_refresh')
        : null;

    if (!refreshToken) {
      isRefreshing = false;
      if (typeof window !== 'undefined')
        window.location.href = '/login';
      return Promise.reject(error);
    }

    try {
      // Use a plain axios call (not the intercepted instance) to avoid loops
      const { data } = await axios.post(
        `${BASE_URL}/api/auth/refresh`,
        { refreshToken },
        { headers: { 'Content-Type': 'application/json' } }
      );

      const newToken: string       = data.data.token;
      const newRefresh: string     = data.data.refreshToken;

      localStorage.setItem('mc_token',   newToken);
      localStorage.setItem('mc_refresh', newRefresh);

      // Retry all queued requests with the new token
      flushQueue(null, newToken);

      if (original.headers)
        original.headers['Authorization'] = `Bearer ${newToken}`;

      return api(original);
    } catch (refreshError) {
      flushQueue(refreshError, null);
      localStorage.removeItem('mc_token');
      localStorage.removeItem('mc_refresh');
      localStorage.removeItem('mc_user');
      if (typeof window !== 'undefined')
        window.location.href = '/login?reason=session_expired';
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  }
);

// ─── Auth ─────────────────────────────────────────────────────────────────────
export const authApi = {
  register: (d: {
    name: string;
    email: string;
    password: string;
    phone?: string;
  }) => api.post('/auth/register', d),

  login: (d: { email: string; password: string }) =>
    api.post('/auth/login', d),

  refresh: (refreshToken: string) =>
    api.post('/auth/refresh', { refreshToken }),

  logout: (refreshToken: string) =>
    api.post('/auth/logout', { refreshToken }),

  me: () => api.get('/auth/me'),
};

// ─── Services ─────────────────────────────────────────────────────────────────
export const servicesApi = {
  list: (params?: { category?: string }) =>
    api.get('/services', { params }),
  get: (id: string) => api.get(`/services/${id}`),
};

// ─── Appointments ─────────────────────────────────────────────────────────────
export const appointmentsApi = {
  book: (d: {
    serviceId: string;
    preferredStart: string;
    patientNotes?: string;
  }) => api.post('/appointments', d),

  list: (params?: { status?: string; page?: number; limit?: number }) =>
    api.get('/appointments', { params }),

  get: (id: string) => api.get(`/appointments/${id}`),

  cancel: (id: string) =>
    api.patch(`/appointments/${id}`, { status: 'cancelled' }),

  update: (id: string, body: Record<string, unknown>) =>
    api.patch(`/appointments/${id}`, body),
};

// ─── Chat ─────────────────────────────────────────────────────────────────────
export const chatApi = {
  startSession: (initialSymptomText: string) =>
    api.post('/chat/session', { initialSymptomText }),

  sendMessage: (sessionId: string, text: string) =>
    api.post(`/chat/session/${sessionId}/message`, { text }),

  getSession: (sessionId: string) =>
    api.get(`/chat/session/${sessionId}`),

  listSessions: () => api.get('/chat/sessions'),

  closeSession: (sessionId: string) =>
    api.patch(`/chat/session/${sessionId}/close`),

  getFlagged: () => api.get('/chat/flagged'),
};

// ─── Payments ─────────────────────────────────────────────────────────────────
export const paymentsApi = {
  createCheckout: (priceId?: string) =>
    api.post('/payments/create-checkout', { priceId }),

  createVisitCheckout: (
    appointmentId: string,
    amount: number,
    serviceTitle: string
  ) =>
    api.post('/payments/create-visit-checkout', {
      appointmentId,
      amount,
      serviceTitle,
    }),

  billingPortal: () => api.post('/payments/billing-portal'),
};

// ─── Partners ─────────────────────────────────────────────────────────────────
export const partnersApi = {
  list: () => api.get('/partners'),
};

// ─── Admin ────────────────────────────────────────────────────────────────────
export const adminApi = {
  metrics: () => api.get('/admin/metrics'),
};
