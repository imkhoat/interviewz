const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export async function httpClient(url: string, options: RequestInit = {}) {
  const response = await fetch(`${baseUrl}${url}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  return response.json();
}
