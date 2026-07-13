// services/account-api.ts

const WORDPRESS_URL = process.env.NEXT_PUBLIC_WORDPRESS_URL || 'https://tapbookme.com';

export const API_ENDPOINTS = {
  updateProfile: `${WORDPRESS_URL}/wp-json/custom/v1/update-profile`,
  changePassword: `${WORDPRESS_URL}/wp-json/custom/v1/change-password`,
  deleteProfile: `${WORDPRESS_URL}/wp-json/custom/v1/delete-profile`,
  getUser: `${WORDPRESS_URL}/wp-json/wp/v2/users/me`,
  rankMathHead: `${WORDPRESS_URL}/wp-json/rankmath/v1/getHead`,
} as const;

export class AuthRequiredError extends Error {
  constructor() {
    super('AUTH_REQUIRED');
    this.name = 'AuthRequiredError';
  }
}

function getAuthToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('auth_token');
}

async function authorizedFetch<T = any>(url: string, options: RequestInit = {}): Promise<T> {
  const token = getAuthToken();
  if (!token) {
    throw new AuthRequiredError();
  }

  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      ...options.headers,
    },
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || 'Request failed.');
  }

  return data;
}

export interface ProfilePayload {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
}

export const accountApi = {
  fetchCurrentUser: () => authorizedFetch(API_ENDPOINTS.getUser),

  updateProfile: (payload: ProfilePayload) =>
    authorizedFetch(API_ENDPOINTS.updateProfile, {
      method: 'POST',
      body: JSON.stringify(payload),
    }),

  changePassword: (currentPassword: string, newPassword: string) =>
    authorizedFetch(API_ENDPOINTS.changePassword, {
      method: 'POST',
      body: JSON.stringify({
        current_password: currentPassword,
        new_password: newPassword,
      }),
    }),

  deleteProfile: () => authorizedFetch(API_ENDPOINTS.deleteProfile, { method: 'DELETE' }),
};