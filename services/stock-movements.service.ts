// services/stock-movements.service.ts
// Real backend calls for the Stock Movements domain (/api/stock/movements).
// There is no "list all" endpoint — movements are always scoped to an article.

import { api } from '@/lib/axios';
import type { StockMovementRequest, StockMovementResponse } from '@/types/models';

export async function getArticleMovements(
  articleId: number,
): Promise<StockMovementResponse[]> {
  const { data } = await api.get<StockMovementResponse[]>(
    `/stock/movements/article/${articleId}`,
  );
  return data;
}

export async function createStockMovement(
  payload: StockMovementRequest,
): Promise<StockMovementResponse> {
  const { data } = await api.post<StockMovementResponse>(
    '/stock/movements',
    payload,
  );
  return data;
}
