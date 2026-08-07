"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import {
  Alert02Icon,
  ChartLineData01Icon,
  Moon02Icon,
  Wallet01Icon,
} from "@hugeicons/core-free-icons";
import type React from "react";
import { cn } from "@/lib/utils";
import {
  Card,
  CardDescription,
  CardFrame,
  CardFrameDescription,
  CardFrameHeader,
  CardFrameTitle,
  CardPanel,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useDashboardStats } from "@/hooks/use-dashboard";

const currency = new Intl.NumberFormat("fr-MA", {
  style: "currency",
  currency: "MAD",
  maximumFractionDigits: 0,
});

type Tone = "success" | "info" | "warning" | "error";

const toneStyles: Record<Tone, { chip: string; icon: string }> = {
  success: {
    chip: "bg-success/10 dark:bg-success/16",
    icon: "text-success-foreground",
  },
  info: {
    chip: "bg-info/10 dark:bg-info/16",
    icon: "text-info-foreground",
  },
  warning: {
    chip: "bg-warning/10 dark:bg-warning/16",
    icon: "text-warning-foreground",
  },
  error: {
    chip: "bg-destructive/10 dark:bg-destructive/16",
    icon: "text-destructive-foreground",
  },
};

function StatCard({
  title,
  value,
  icon,
  tone,
  loading,
}: {
  title: string;
  value: string;
  icon: React.ComponentProps<typeof HugeiconsIcon>["icon"];
  tone: Tone;
  loading: boolean;
}): React.ReactElement {
  const styles = toneStyles[tone];

  return (
    <Card>
      <CardPanel className="flex items-start justify-between gap-4">
        <div className="flex flex-col gap-1.5">
          <CardDescription>{title}</CardDescription>
          {loading ? (
            <Skeleton className="h-7 w-24" />
          ) : (
            <CardTitle className="text-2xl">{value}</CardTitle>
          )}
        </div>
        <div
          className={cn(
            "flex size-9 shrink-0 items-center justify-center rounded-lg",
            styles.chip,
          )}
        >
          <HugeiconsIcon
            icon={icon}
            strokeWidth={2}
            className={cn("size-4.5", styles.icon)}
          />
        </div>
      </CardPanel>
    </Card>
  );
}

export default function DashboardPage(): React.ReactElement {
  const { data, isPending } = useDashboardStats();

  const totalTopClients =
    data?.topClients.reduce((sum, c) => sum + c.total, 0) ?? 0;

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Chiffre d'affaires"
          value={data ? currency.format(data.chiffreAffaires) : "—"}
          icon={Wallet01Icon}
          tone="success"
          loading={isPending}
        />
        <StatCard
          title="Bénéfice"
          value={data ? currency.format(data.benefice) : "—"}
          icon={ChartLineData01Icon}
          tone="info"
          loading={isPending}
        />
        <StatCard
          title="Stock faible"
          value={data ? String(data.produitsStockFaible.length) : "—"}
          icon={Alert02Icon}
          tone="warning"
          loading={isPending}
        />
        <StatCard
          title="Produits dormants"
          value={data ? String(data.produitsDormants.length) : "—"}
          icon={Moon02Icon}
          tone="error"
          loading={isPending}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <CardFrame>
          <CardFrameHeader>
            <CardFrameTitle>Meilleurs clients</CardFrameTitle>
            <CardFrameDescription>Par chiffre d&apos;affaires</CardFrameDescription>
          </CardFrameHeader>
          <Table variant="card">
            <TableHeader>
              <TableRow>
                <TableHead>Client</TableHead>
                <TableHead className="text-right">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isPending &&
                Array.from({ length: 2 }).map((_, i) => (
                  <TableRow key={i}>
                    <TableCell colSpan={2}>
                      <Skeleton className="h-5 w-full" />
                    </TableCell>
                  </TableRow>
                ))}
              {data?.topClients.map((client) => (
                <TableRow key={client.clientId}>
                  <TableCell className="font-medium">{client.nom}</TableCell>
                  <TableCell className="text-right">
                    <Badge variant="success">
                      {currency.format(client.total)}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell>Total</TableCell>
                <TableCell className="text-right">
                  {currency.format(totalTopClients)}
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </CardFrame>

        <CardFrame>
          <CardFrameHeader>
            <CardFrameTitle>Meilleurs produits</CardFrameTitle>
            <CardFrameDescription>Par quantité vendue</CardFrameDescription>
          </CardFrameHeader>
          <Table variant="card">
            <TableHeader>
              <TableRow>
                <TableHead>Produit</TableHead>
                <TableHead className="text-right">Quantité</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isPending &&
                Array.from({ length: 2 }).map((_, i) => (
                  <TableRow key={i}>
                    <TableCell colSpan={2}>
                      <Skeleton className="h-5 w-full" />
                    </TableCell>
                  </TableRow>
                ))}
              {data?.topProduits.map((produit) => (
                <TableRow key={produit.productId}>
                  <TableCell className="font-medium">{produit.nom}</TableCell>
                  <TableCell className="text-right">
                    <Badge variant="info">{produit.quantiteVendue} u.</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardFrame>
      </div>

      <CardFrame className="w-full">
        <Table variant="card">
          <TableHeader>
            <TableRow>
              <TableHead>Produit</TableHead>
              <TableHead>Référence</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead className="text-right">Stock</TableHead>
              <TableHead className="text-right">Seuil</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isPending &&
              Array.from({ length: 2 }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell colSpan={5}>
                    <Skeleton className="h-5 w-full" />
                  </TableCell>
                </TableRow>
              ))}
            {data?.produitsStockFaible.map((product) => {
              const isCritical = product.quantiteStock <= product.seuilMinimum / 3;

              return (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">{product.nom}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {product.reference}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      <span
                        aria-hidden="true"
                        className={cn(
                          "size-1.5 rounded-full",
                          isCritical ? "bg-red-500" : "bg-amber-500",
                        )}
                      />
                      {isCritical ? "Critique" : "Faible"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    {product.quantiteStock}
                  </TableCell>
                  <TableCell className="text-right text-muted-foreground">
                    {product.seuilMinimum}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardFrame>
    </div>
  );
}
