export default async function apiFetch<T>(
  endpoint?: string,
  options: {
    method?: "GET" | "POST" | "PUT" | "DELETE";
    body?: any;
    headers?: Record<string, string>;
    cache?: RequestCache;
  }
): Promise<T> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}${endpoint || ""}`,
    options
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}
