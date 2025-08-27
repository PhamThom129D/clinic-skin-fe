// src/hooks/useFetchData.ts
import { useEffect, useState } from "react";

export function useFetchData<T>(fetchFn: () => Promise<{ data: T }>) {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchFn()
      .then((res) => setData(res.data))
      .catch((err) => console.error("❌ Error fetching:", err))
      .finally(() => setIsLoading(false));
  }, [fetchFn]);

  return { data, isLoading };
}
