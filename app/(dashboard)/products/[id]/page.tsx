"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import {
  Alert02Icon,
  ArrowLeft01Icon,
  BoxIcon,
  CheckmarkBadge01Icon,
  DiscountTag01Icon,
  ShoppingCart01Icon,
  Tag01Icon,
} from "@hugeicons/core-free-icons";
import Link from "next/link";
import { useParams } from "next/navigation";
import type React from "react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardPanel,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useProduct } from "@/hooks/use-products";

const currency = new Intl.NumberFormat("fr-MA", {
  style: "currency",
  currency: "MAD",
  maximumFractionDigits: 0,
});

const dateFormatter = new Intl.DateTimeFormat("fr-MA", {
  day: "2-digit",
  month: "long",
  year: "numeric",
});

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: React.ComponentProps<typeof HugeiconsIcon>["icon"];
  label: string;
  value: string;
}): React.ReactElement {
  return (
    <div className="flex items-center gap-3">
      <div className="flex size-9 shrink-0 items-center justify-center rounded-lg border bg-card">
        <HugeiconsIcon
          icon={icon}
          strokeWidth={2}
          className="size-4.5 text-muted-foreground"
        />
      </div>
      <div className="flex flex-col">
        <span className="text-muted-foreground text-xs">{label}</span>
        <span className="text-sm">{value}</span>
      </div>
    </div>
  );
}

export default function ProductDetailPage(): React.ReactElement {
  const params = useParams<{ id: string }>();
  const id = Number(params.id);
  const { data: product, isPending } = useProduct(id);

  const lowStock = product
    ? product.quantiteStock <= product.seuilMinimum
    : false;

  return (
    <div className="flex flex-col gap-4">
      <Link
        href="/products"
        className="flex w-fit items-center gap-1.5 text-muted-foreground text-sm hover:text-foreground"
      >
        <HugeiconsIcon
          icon={ArrowLeft01Icon}
          strokeWidth={2}
          className="size-4"
        />
        Produits
      </Link>

      <Card>
        <CardPanel className="flex flex-col gap-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex flex-col gap-1.5">
              <CardDescription>Produit</CardDescription>
              {isPending ? (
                <Skeleton className="h-7 w-48" />
              ) : (
                <CardTitle className="text-2xl">{product?.nom}</CardTitle>
              )}
            </div>
            {!isPending &&
              (lowStock ? (
                <Badge variant="warning">
                  <HugeiconsIcon
                    icon={Alert02Icon}
                    strokeWidth={2}
                    className="text-warning-foreground"
                  />
                  Stock faible
                </Badge>
              ) : (
                <Badge variant="success">
                  <HugeiconsIcon
                    icon={CheckmarkBadge01Icon}
                    strokeWidth={2}
                    className="text-success-foreground"
                  />
                  En stock
                </Badge>
              ))}
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {isPending ? (
              <>
                <Skeleton className="h-14 w-full" />
                <Skeleton className="h-14 w-full" />
                <Skeleton className="h-14 w-full" />
              </>
            ) : (
              <>
                <InfoRow
                  icon={Tag01Icon}
                  label="Référence"
                  value={product?.reference ?? "—"}
                />
                <InfoRow
                  icon={DiscountTag01Icon}
                  label="Catégorie"
                  value={product?.categorie ?? "—"}
                />
                <InfoRow
                  icon={BoxIcon}
                  label="Stock actuel"
                  value={`${product?.quantiteStock} unités (seuil ${product?.seuilMinimum})`}
                />
                <InfoRow
                  icon={ShoppingCart01Icon}
                  label="Prix d'achat"
                  value={currency.format(product?.prixAchat ?? 0)}
                />
                <InfoRow
                  icon={ShoppingCart01Icon}
                  label="Prix de vente"
                  value={currency.format(product?.prixVente ?? 0)}
                />
                <InfoRow
                  icon={DiscountTag01Icon}
                  label="Marge"
                  value={currency.format(
                    (product?.prixVente ?? 0) - (product?.prixAchat ?? 0),
                  )}
                />
              </>
            )}
          </div>

          {!isPending && product && (
            <p className="text-muted-foreground text-xs">
              Ajouté le {dateFormatter.format(new Date(product.createdAt))}
            </p>
          )}
        </CardPanel>
      </Card>
    </div>
  );
}
