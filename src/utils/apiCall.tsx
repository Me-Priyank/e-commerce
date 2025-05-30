/**
 * A generic fetch wrapper that reads auth token from localStorage
 * and handles JSON bodies & errors.
 *
 * @param {string} url           — the endpoint URL
 * @param {object} [options]     — request options
 * @param {string} [options.method='GET']
 * @param {object} [options.body] — will be JSON.stringify’d
 * @param {object} [options.headers] — any extra headers
 */
export async function apiRequest(
  url: any,
  {
    method = "GET",
    body = null,
    headers: extraHeaders = {},
  }: { method?: string; body?: any; headers?: object } = {}
) {
  // grab token
  const token = localStorage.getItem("access_token");

  // base headers
  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...extraHeaders,
  };

  // build fetch init
  const init = {
    method,
    headers,
    // only include a body if provided
    ...(body ? { body: JSON.stringify(body) } : {}),
  };

  const res = await fetch(url, init);

  // optional: throw on HTTP errors
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Request failed ${res.status} ${res.statusText}\n${text}`);
  }

  // parse JSON (or return empty on 204)
  return res.status === 204 ? null : res.json();
}
