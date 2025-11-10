export type APIFood = {
  id?: string;
  name?: string;
  price?: string;
  rating?: number | string;
  imageUrl?: string;
  restaurant?: {
    name?: string;
    logo?: string;
    status?: string;
  } | null;
};

const BASE = "https://6852821e0594059b23cdd834.mockapi.io/Food";

async function handle<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `HTTP ${res.status}`);
  }
  return res.json();
}

export async function apiListFoods(query?: string): Promise<APIFood[]> {
  const url = query && query.trim() ? `${BASE}?name=${encodeURIComponent(query)}` : BASE;
  const res = await fetch(url, { cache: "no-store" });
  if (res.status === 404) {
    return [];
  }
  if (!res.ok) {
    return handle<APIFood[]>(res);
  }
  try {
    const data = await res.json();
    if (!data) return [];
    if (typeof data === "string") return [];
    if (Array.isArray(data)) return data as APIFood[];
    return [];
  } catch {
    return [];
  }
}

export async function apiCreateFood(data: APIFood): Promise<APIFood> {
  const res = await fetch(BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return handle<APIFood>(res);
}

export async function apiUpdateFood(id: string, data: APIFood): Promise<APIFood> {
  const res = await fetch(`${BASE}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return handle<APIFood>(res);
}

export async function apiDeleteFood(id: string): Promise<void> {
  const res = await fetch(`${BASE}/${id}`, { method: "DELETE" });
  await handle(res);
}
