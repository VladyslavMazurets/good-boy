export default async function apiFetch<T>(
  endpoint?: string,
  options?: {
    method?: "GET" | "POST" | "PUT" | "DELETE";
    body?: Record<string, unknown> | FormData | string;
    headers?: Record<string, string>;
    cache?: RequestCache;
  }
): Promise<T> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}${endpoint || ""}`,
    options
  );

  const data = await res.json();

  if (!res.ok) {
    throw data;
  }

  return data;
}
