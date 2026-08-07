import type React from "react";
import { ProductTable } from "@/components/products/product-table";

export default function ProductsPage(): React.ReactElement {
  return (
    <section className="flex w-full flex-col gap-4">
      <div>
        <h1 className="font-semibold text-2xl">Produits</h1>
        <p className="text-muted-foreground">
          Gérez votre catalogue de produits et suivez les niveaux de stock
        </p>
      </div>

      <ProductTable />
    </section>
  );
}
