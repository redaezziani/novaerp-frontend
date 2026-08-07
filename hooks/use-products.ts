import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createProducts,
  deleteProducts,
  getProduct,
  getProducts,
} from "@/services/services.mock";
import type { Product } from "@/types/models";

export function useProducts(page = 0, size = 10) {
  return useQuery({
    queryKey: ["products", page, size],
    queryFn: () => getProducts(page, size),
  });
}

export function useProduct(id: number) {
  return useQuery({
    queryKey: ["products", id],
    queryFn: () => getProduct(id),
    enabled: Number.isFinite(id),
  });
}

export function useDeleteProducts() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (ids: number[]) => deleteProducts(ids),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
}

export function useCreateProducts() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (
      products: Omit<Product, "id" | "createdAt" | "updatedAt">[],
    ) => createProducts(products),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
}
