import { create } from 'zustand';
import { IUser } from '../../../shared/src/types';

interface AuthState {
  user: IUser | null;
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  tokenExpiry: number | null;

  setAuth: (user: IUser, token: string, refreshToken: string, rememberMe?: boolean) => void;
  clearAuth: () => void;
  setLoading: (v: boolean) => void;
  hydrate: () => void;

  updateUser: (user: IUser) => void;
  setTokens: (token: string, refreshToken: string) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
  refreshTokenAction: () => Promise<boolean>;
  isTokenExpired: () => boolean;
  getToken: () => string | null;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  token: null,
  refreshToken: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  tokenExpiry: null,

  setAuth: (user, token, refreshToken, rememberMe = false) => {
    const expiryTime = rememberMe
      ? Date.now() + 30 * 24 * 60 * 60 * 1000 
      : Date.now() + 24 * 60 * 60 * 1000; 

    if (typeof window !== 'undefined') {
      localStorage.setItem('mc_token', token);
      localStorage.setItem('mc_refresh', refreshToken);
      localStorage.setItem('mc_user', JSON.stringify(user));
      localStorage.setItem('mc_token_expiry', expiryTime.toString());

      document.cookie = `session-token=${token}; path=/; max-age=${rememberMe ? 30 * 24 * 60 * 60 : 24 * 60 * 60}; samesite=strict; ${process.env.NODE_ENV === 'production' ? 'secure;' : ''}`;
    }

    set({
      user,
      token,
      refreshToken,
      isAuthenticated: true,
      isLoading: false,
      tokenExpiry: expiryTime,
      error: null
    });
  },

  clearAuth: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('mc_token');
      localStorage.removeItem('mc_refresh');
      localStorage.removeItem('mc_user');
      localStorage.removeItem('mc_token_expiry');
      document.cookie = 'session-token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }
    set({
      user: null,
      token: null,
      refreshToken: null,
      isAuthenticated: false,
      isLoading: false,
      tokenExpiry: null,
      error: null
    });
  },

  updateUser: (user) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('mc_user', JSON.stringify(user));
    }
    set({ user });
  },

  setTokens: (token, refreshToken) => {
    const expiryTime = Date.now() + 24 * 60 * 60 * 1000; // 24 hours

    if (typeof window !== 'undefined') {
      localStorage.setItem('mc_token', token);
      localStorage.setItem('mc_refresh', refreshToken);
      localStorage.setItem('mc_token_expiry', expiryTime.toString());
      document.cookie = `session-token=${token}; path=/; max-age=86400; samesite=strict; ${process.env.NODE_ENV === 'production' ? 'secure;' : ''}`;
    }

    set({ token, refreshToken, tokenExpiry: expiryTime });
  },

  setLoading: (v) => set({ isLoading: v }),

  setError: (error) => set({ error }),

  clearError: () => set({ error: null }),

  isTokenExpired: () => {
    const { tokenExpiry } = get();
    if (!tokenExpiry) return true;
    return Date.now() >= tokenExpiry;
  },

  getToken: () => {
    const { token } = get();
    return token;
  },

  refreshTokenAction: async () => {
    const { refreshToken, setTokens, clearAuth, setError } = get();

    if (!refreshToken) {
      clearAuth();
      return false;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refreshToken }),
      });

      if (response.ok) {
        const data = await response.json();
        const { token, refreshToken: newRefreshToken } = data.data;
        setTokens(token, newRefreshToken);
        return true;
      } else {
        clearAuth();
        setError('Session expired. Please login again.');
        return false;
      }
    } catch (error) {
      console.error('Token refresh failed:', error);
      clearAuth();
      setError('Failed to refresh session. Please login again.');
      return false;
    }
  },

  hydrate: () => {
    if (typeof window === 'undefined') {
      set({ isLoading: false });
      return;
    }

    const token = localStorage.getItem('mc_token');
    const refreshToken = localStorage.getItem('mc_refresh');
    const userRaw = localStorage.getItem('mc_user');
    const tokenExpiry = localStorage.getItem('mc_token_expiry');

    if (token && userRaw && tokenExpiry) {
      const expiry = parseInt(tokenExpiry);
      const isExpired = Date.now() >= expiry;

      if (!isExpired) {
        try {
          const user = JSON.parse(userRaw) as IUser;
          set({
            user,
            token,
            refreshToken,
            isAuthenticated: true,
            isLoading: false,
            tokenExpiry: expiry
          });
        } catch {
          set({ isLoading: false });
          localStorage.removeItem('mc_user');
        }
      } else {
        set({ isLoading: false });
        localStorage.removeItem('mc_token');
        localStorage.removeItem('mc_refresh');
        localStorage.removeItem('mc_user');
        localStorage.removeItem('mc_token_expiry');
      }
    } else {
      set({ isLoading: false });
    }
  },
}));
