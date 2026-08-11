"use client";

import type React from "react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export interface CategoryStockValue {
  categoryName: string;
  value: number;
}

// Fixed categorical hue order, validated with the dataviz skill's
// scripts/validate_palette.js against both the light (#fcfcfb) and dark
// (#1a1a19) chart surfaces — all checks pass (CVD separation in the 6-8
// floor band is mitigated by the direct category-name + value labels next
// to every bar, satisfying the "secondary encoding" requirement).
// "Autres" (overflow bucket) intentionally uses a neutral gray, not a 7th
// identity hue, since it represents a residual group rather than a category.
const CATEGORY_COLORS = [
  "#155dfc", // blue-600
  "#0092b8", // cyan-600
  "#e17100", // amber-600
  "#7f22fe", // violet-600
  "#ec003f", // rose-600
];
const OTHER_COLOR = "#6a7282"; // gray-500

const currency = new Intl.NumberFormat("fr-MA", {
  style: "currency",
  currency: "MAD",
  maximumFractionDigits: 0,
});

function colorFor(categoryName: string, index: number): string {
  return categoryName === "Autres"
    ? OTHER_COLOR
    : CATEGORY_COLORS[index % CATEGORY_COLORS.length];
}

export function StockValueByCategoryChart({
  data,
}: {
  data: CategoryStockValue[];
}): React.ReactElement {
  const [hovered, setHovered] = useState<number | null>(null);

  if (data.length === 0) {
    return (
      <div className="flex h-48 items-center justify-center text-muted-foreground text-sm">
        Aucune donnée de stock disponible
      </div>
    );
  }

  const maxValue = Math.max(1, ...data.map((d) => d.value));

  return (
    <div className="flex flex-col gap-1">
      {data.map((d, i) => {
        const color = colorFor(d.categoryName, i);
        const widthPct = Math.max((d.value / maxValue) * 100, 2);
        const isHovered = hovered === i;

        return (
          <div
            key={d.categoryName}
            className="group relative flex flex-col gap-1 rounded-md px-1.5 py-1.5"
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
          >
            <div className="flex items-center justify-between gap-3 text-sm">
              <div className="flex min-w-0 items-center gap-2">
                <span
                  aria-hidden="true"
                  className="size-2.5 shrink-0 rounded-full"
                  style={{ backgroundColor: color }}
                />
                <span className="truncate text-foreground">
                  {d.categoryName}
                </span>
              </div>
              <span
                className={cn(
                  "shrink-0 font-medium text-muted-foreground tabular-nums transition-colors",
                  isHovered && "text-foreground",
                )}
              >
                {currency.format(d.value)}
              </span>
            </div>

            <svg
              viewBox="0 0 100 8"
              width="100%"
              height={8}
              preserveAspectRatio="none"
              role="img"
              aria-label={`${d.categoryName}: ${currency.format(d.value)}`}
              className="overflow-visible"
            >
              <title>
                {d.categoryName} — {currency.format(d.value)}
              </title>
              <rect
                x={0}
                y={0}
                width={100}
                height={8}
                rx={4}
                className="fill-muted"
              />
              <rect
                x={0}
                y={0}
                width={widthPct}
                height={8}
                rx={4}
                fill={color}
                opacity={isHovered ? 1 : 0.9}
                style={{ transition: "opacity 120ms ease, width 200ms ease" }}
              />
            </svg>
          </div>
        );
      })}
    </div>
  );
}
