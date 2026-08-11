import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createStockMovement,
  getArticleMovements,
} from "@/services/stock-movements.service";
import type { StockMovementRequest } from "@/types/models";

export function useArticleMovements(articleId: number | null) {
  return useQuery({
    queryKey: ["stock-movements", articleId],
    queryFn: () => getArticleMovements(articleId as number),
    enabled: typeof articleId === "number" && Number.isFinite(articleId),
  });
}

export function useCreateStockMovement() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: StockMovementRequest) => createStockMovement(payload),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["stock-movements", variables.articleId],
      });
      queryClient.invalidateQueries({ queryKey: ["articles"] });
    },
  });
}
