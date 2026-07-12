'use server';

const WP_API_URL = process.env.NEXT_PUBLIC_WORDPRESS_URL;
const CONTACT_ENDPOINT = `${WP_API_URL}/wp-json/custom/v1/contact`;

export interface ContactPayload {
  name: string;
  email: string;
  message: string;
}

export interface ContactResponse {
  success: boolean;
  message?: string;
}

export async function submitContactForm(
  payload: ContactPayload,
): Promise<ContactResponse> {
  const consumerKey = process.env.WC_CONSUMER_KEY;
  const consumerSecret = process.env.WC_CONSUMER_SECRET;

  if (!consumerKey || !consumerSecret) {
    throw new Error(
      'WooCommerce API credentials are not configured on the server.',
    );
  }

  const response = await fetch(CONTACT_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization:
        'Basic ' +
        Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64'),
    },
    body: JSON.stringify(payload),
    cache: 'no-store', // Kept consistent with your data-fetching preference
  });

  let data: ContactResponse | undefined;
  try {
    data = await response.json();
  } catch {
    // Non-JSON response (e.g. a WP error page) — fall through to status check.
  }

  if (!response.ok || (data && data.success === false)) {
    throw new Error(
      data?.message ?? 'Failed to send your message. Please try again.',
    );
  }

  return data ?? { success: true };
}
