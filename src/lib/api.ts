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
    {
      ...options,
      body: options?.body
        ? options.body instanceof FormData || typeof options.body === "string"
          ? options.body
          : JSON.stringify(options.body)
        : undefined,
      headers: {
        ...(options?.body &&
        !(options.body instanceof FormData) &&
        typeof options.body === "object"
          ? { "Content-Type": "application/json" }
          : {}),
        ...options?.headers,
      },
    } as RequestInit
  );

  const data = await res.json();

  if (!res.ok) {
    throw data;
  }

  return data;
}
