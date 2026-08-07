import type React from "react";
import { ClientTable } from "@/components/clients/client-table";

export default function ClientsPage(): React.ReactElement {
  return (
    <section className="flex w-full flex-col gap-4">
      <div>
        <h1 className="font-semibold text-2xl">Clients</h1>
        <p className="text-muted-foreground">
          Gérez votre portefeuille clients et leurs coordonnées
        </p>
      </div>

      <ClientTable />
    </section>
  );
}
