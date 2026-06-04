// Backend URL: from environment variable in production, localhost in development
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

// Central function that makes all HTTP requests to the backend
async function request(endpoint: string, method: string, body?: unknown) {
  const response = await fetch(API_URL + endpoint, {
    method: method,
    headers: { 'Content-Type': 'application/json' }, // tell the server we're sending JSON
    credentials: 'include', // send cookies with every request (required for authentication)
    body: body ? JSON.stringify(body) : undefined, // convert JS object to JSON string if provided
  });

  // If the server returns an error (400, 401, 500...), throw an exception
  if (!response.ok) {
    // Try to read the error message from the server response
    const error = await response.json().catch(() => ({ message: response.statusText }));
    throw new Error(error.message || 'An error occurred');
  }

  // Parse the JSON response
  const body2 = await response.json();
  // The backend wraps responses in { data: ... } — unwrap it, or return directly if not wrapped
  return body2?.data ?? body2;
}

// One method per HTTP verb — each calls request() with the correct method
export const apiClient = {
  get: (endpoint: string) => request(endpoint, 'GET'),
  post: (endpoint: string, data?: unknown) => request(endpoint, 'POST', data),
  put: (endpoint: string, data: unknown) => request(endpoint, 'PUT', data),
  patch: (endpoint: string, data: unknown) => request(endpoint, 'PATCH', data),
  delete: (endpoint: string) => request(endpoint, 'DELETE'),
};
