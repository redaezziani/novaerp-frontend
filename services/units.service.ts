// services/units.service.ts
// Real backend calls for the Units domain (/api/stock/units).

import { api } from '@/lib/axios';
import type { UnitRequest, UnitResponse } from '@/types/models';

export async function getUnits(): Promise<UnitResponse[]> {
  const { data } = await api.get<UnitResponse[]>('/stock/units');
  return data;
}

export async function getUnit(id: number): Promise<UnitResponse> {
  const { data } = await api.get<UnitResponse>(`/stock/units/${id}`);
  return data;
}

export async function createUnit(payload: UnitRequest): Promise<UnitResponse> {
  const { data } = await api.post<UnitResponse>('/stock/units', payload);
  return data;
}

export async function updateUnit(
  id: number,
  payload: UnitRequest,
): Promise<UnitResponse> {
  const { data } = await api.put<UnitResponse>(`/stock/units/${id}`, payload);
  return data;
}

export async function deleteUnit(id: number): Promise<void> {
  await api.delete(`/stock/units/${id}`);
}
