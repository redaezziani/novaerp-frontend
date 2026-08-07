// types/models.ts
// Contract for the frontend. Align field names with Salma's Spring Boot DTOs.

// ---------- Base ----------
export interface BaseEntity {
  id: number;
  createdAt: string; // ISO date
  updatedAt: string;
}

// ---------- Auth / Users ----------
export type Role = 'ADMIN' | 'USER';

export interface User extends BaseEntity {
  username: string;
  email: string;
  role: Role;
  active: boolean;
}

export interface AuthResponse {
  token: string;
  user: User;
}

// ---------- Client ----------
export interface Client extends BaseEntity {
  nom: string;
  email: string | null;
  telephone: string | null;
  adresse: string | null;
}

// ---------- Product ----------
export interface Product extends BaseEntity {
  nom: string;
  reference: string; // SKU
  prixAchat: number;
  prixVente: number;
  quantiteStock: number;
  seuilMinimum: number;
  categorie: string | null;
}

// ---------- Invoice ----------
export type InvoiceStatus = 'BROUILLON' | 'VALIDEE' | 'ANNULEE';

export interface InvoiceLine {
  id: number;
  productId: number;
  productNom: string;
  quantite: number;
  prixUnitaire: number;
  total: number;
}

export interface Invoice extends BaseEntity {
  numero: string; // FAC-2026-0001
  clientId: number;
  clientNom: string;
  lignes: InvoiceLine[];
  totalHT: number;
  tva: number;
  totalTTC: number;
  statut: InvoiceStatus;
}

// ---------- Stock ----------
export type MovementType = 'ENTREE' | 'SORTIE';
export type MovementReason = 'ACHAT' | 'VENTE' | 'CORRECTION' | 'RETOUR';

export interface StockMovement extends BaseEntity {
  productId: number;
  productNom: string;
  type: MovementType;
  motif: MovementReason;
  quantite: number;
  stockApres: number;
  userId: number;
  username: string;
}

// ---------- Alerts ----------
export interface StockAlert extends BaseEntity {
  productId: number;
  productNom: string;
  quantiteActuelle: number;
  seuilMinimum: number;
  lue: boolean;
}

// ---------- Audit ----------
export type AuditAction = 'CREATE' | 'UPDATE' | 'DELETE';
export type EntityType = 'CLIENT' | 'PRODUCT' | 'INVOICE' | 'USER' | 'STOCK';

export interface AuditLog extends BaseEntity {
  userId: number;
  username: string;
  action: AuditAction;
  entityType: EntityType;
  entityId: number;
  ancienneValeur: string | null; // JSON string
  nouvelleValeur: string | null;
}

// ---------- Dashboard ----------
export interface DashboardStats {
  chiffreAffaires: number;
  benefice: number;
  topClients: { clientId: number; nom: string; total: number }[];
  topProduits: { productId: number; nom: string; quantiteVendue: number }[];
  produitsStockFaible: Product[];
  produitsDormants: Product[];
}

// ---------- Pagination (matches Spring Boot Page<T>) ----------
export interface Page<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  number: number; // current page (0-based in Spring)
  size: number;
}
