"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowLeft01Icon,
  Call02Icon,
  Location01Icon,
  Mail01Icon,
} from "@hugeicons/core-free-icons";
import Link from "next/link";
import { useParams } from "next/navigation";
import type React from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardPanel, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useClient } from "@/hooks/use-clients";

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
  value: string | null;
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
        <span className="text-sm">{value ?? "—"}</span>
      </div>
    </div>
  );
}

export default function ClientDetailPage(): React.ReactElement {
  const params = useParams<{ id: string }>();
  const id = Number(params.id);
  const { data: client, isPending } = useClient(id);

  return (
    <div className="flex flex-col gap-4">
      <Link
        href="/clients"
        className="flex w-fit items-center gap-1.5 text-muted-foreground text-sm hover:text-foreground"
      >
        <HugeiconsIcon icon={ArrowLeft01Icon} strokeWidth={2} className="size-4" />
        Clients
      </Link>

      <Card>
        <CardPanel className="flex flex-col gap-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex flex-col gap-1.5">
              <CardDescription>Client</CardDescription>
              {isPending ? (
                <Skeleton className="h-7 w-48" />
              ) : (
                <CardTitle className="text-2xl">{client?.nom}</CardTitle>
              )}
            </div>
            {!isPending && <Badge variant="success">Actif</Badge>}
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
                <InfoRow icon={Mail01Icon} label="Email" value={client?.email ?? null} />
                <InfoRow
                  icon={Call02Icon}
                  label="Téléphone"
                  value={client?.telephone ?? null}
                />
                <InfoRow
                  icon={Location01Icon}
                  label="Adresse"
                  value={client?.adresse ?? null}
                />
              </>
            )}
          </div>

          {!isPending && client && (
            <p className="text-muted-foreground text-xs">
              Client depuis le {dateFormatter.format(new Date(client.createdAt))}
            </p>
          )}
        </CardPanel>
      </Card>
    </div>
  );
}
