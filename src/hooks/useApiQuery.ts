import { useQuery } from "@tanstack/react-query";
import type { QueryKey } from "@tanstack/react-query";

export function useApiQuery<TData>(
  key: QueryKey,
  fetchFn: () => Promise<TData>,
  enabled = true
) {
  return useQuery<TData>({
    queryKey: key,
    queryFn: fetchFn,
    enabled,
  });
}
