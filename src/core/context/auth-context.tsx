'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { useRouter, usePathname } from 'next/navigation';

const TOKEN_KEY = 'auth_token';
const USER_KEY = 'auth_user';
const JWT_ENDPOINT = 'https://tapbookme.com/wp-json/jwt-auth/v1/token';
const WP_API_URL =
  process.env.NEXT_PUBLIC_WP_API_URL ?? 'https://tapbookme.com';

interface User {
  id: string;
  name: string;
  email: string;
}

interface SignupPayload {
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  password: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  login: (
    username: string,
    password: string,
    captchaToken: string,
  ) => Promise<User>;
  signup: (payload: SignupPayload, captchaToken: string) => Promise<void>;
  logout: () => void;
}

interface JwtResponse {
  token: string;
  user_display_name: string;
  user_email: string;
  user_nicename: string;
}

const verifyCaptcha = async (captchaToken: string): Promise<void> => {
  const response = await fetch('/api/verify-captcha', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token: captchaToken }),
  });

  if (!response.ok) {
    let message = 'Captcha verification failed. Please try again.';
    try {
      const err = await response.json();
      if (err?.message) message = err.message;
    } catch {}
    throw new Error(message);
  }
};

const fetchJwtToken = async (
  username: string,
  password: string,
): Promise<{ token: string; user: User }> => {
  const response = await fetch(JWT_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    let message = 'Login failed. Please check your credentials.';
    try {
      const err = await response.json();
      if (err?.message) message = err.message;
    } catch {}
    throw new Error(message);
  }

  const data: JwtResponse = await response.json();

  const user: User = {
    id: data.user_nicename,
    name: data.user_display_name,
    email: data.user_email,
  };

  return { token: data.token, user };
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem(TOKEN_KEY);
    const storedUser = localStorage.getItem(USER_KEY);

    if (storedToken) {
      setToken(storedToken);

      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch {
          localStorage.removeItem(USER_KEY);
        }
      } else {
        try {
          const base64Url = storedToken.split('.')[1];
          const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
          const jsonPayload = decodeURIComponent(
            window
              .atob(base64)
              .split('')
              .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
              .join(''),
          );

          const payload = JSON.parse(jsonPayload);
          const parsedUser: User = {
            id: payload.data?.user?.id || payload.id || payload.sub || '',
            name:
              payload.data?.user?.display_name ||
              payload.user_display_name ||
              '',
            email: payload.data?.user?.user_email || payload.user_email || '',
          };

          if (parsedUser.id) {
            setUser(parsedUser);
            localStorage.setItem(USER_KEY, JSON.stringify(parsedUser));
          }
        } catch (e) {
          console.error('JWT restore failed on fallback parsing:', e);
        }
      }
    }
    setLoading(false);
  }, []);

  const login = async (
    username: string,
    password: string,
    captchaToken: string,
  ): Promise<User> => {
    setLoading(true);
    setError(null);

    try {
      await verifyCaptcha(captchaToken);

      const { token: newToken, user: loggedInUser } = await fetchJwtToken(
        username,
        password,
      );

      localStorage.setItem(TOKEN_KEY, newToken);
      localStorage.setItem(USER_KEY, JSON.stringify(loggedInUser));

      setToken(newToken);
      setUser(loggedInUser);

      return loggedInUser;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Login failed';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const signup = async (
    payload: SignupPayload,
    captchaToken: string,
  ): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      await verifyCaptcha(captchaToken);

      const response = await fetch(`${WP_API_URL}/wp-json/custom/v1/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: payload.username,
          email: payload.email,
          password: payload.password,
        }),
      });

      let data: { success?: boolean; message?: string } | undefined;
      try {
        data = await response.json();
      } catch {}

      if (!response.ok || data?.success === false) {
        throw new Error(
          data?.message ??
            'Registration failed. Please check your information.',
        );
      }
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Registration failed';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    setToken(null);
    setUser(null);
    setError(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user,
        loading,
        error,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export function ProtectedRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !loading && !isAuthenticated) {
      router.replace(`/signin?redirect=${encodeURIComponent(pathname)}`);
    }
  }, [isAuthenticated, loading, mounted, router, pathname]);

  if (!mounted || loading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-white">
        <div className="text-sm font-medium text-[#35281E]">
          Verifying session context...
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
