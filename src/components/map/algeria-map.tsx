"use client";

import { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { FeatureCollection } from "geojson";
import { useI18n } from "@/components/i18n/locale-provider";

type LayerKey = "legal" | "economic" | "security" | "classified";

const MapInner = dynamic(() => import("./algeria-map-inner"), {
  ssr: false,
  loading: () => null,
});

export function AlgeriaMap({
  canSeeClassified,
}: {
  canSeeClassified: boolean;
}) {
  const { t } = useI18n();
  const [data, setData] = useState<FeatureCollection | null>(null);
  const [active, setActive] = useState<Record<LayerKey, boolean>>({
    legal: true,
    economic: true,
    security: true,
    classified: false,
  });

  const layers: { key: LayerKey; label: string; locked?: boolean }[] = [
    { key: "legal", label: t.dashboard.layerLegal },
    { key: "economic", label: t.dashboard.layerEconomic },
    { key: "security", label: t.dashboard.layerSecurity },
    { key: "classified", label: t.dashboard.layerClassified, locked: true },
  ];

  useEffect(() => {
    fetch("/api/geojson")
      .then((r) => r.json())
      .then(setData)
      .catch(() => setData(null));
  }, []);

  const filtered = useMemo(() => {
    if (!data) return null;
    return {
      ...data,
      features: data.features.filter((f) => {
        const layer = (f.properties as { layer?: LayerKey })?.layer;
        if (!layer) return false;
        if (layer === "classified" && !canSeeClassified) return false;
        return active[layer];
      }),
    } as FeatureCollection;
  }, [data, active, canSeeClassified]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t.dashboard.mapTitle}</CardTitle>
        <CardDescription>{t.dashboard.mapDesc}</CardDescription>
        <div className="flex flex-wrap gap-2 pt-2">
          {layers.map((l) => {
            const locked = l.locked && !canSeeClassified;
            return (
              <Button
                key={l.key}
                size="sm"
                variant={active[l.key] && !locked ? "amber" : "secondary"}
                disabled={locked}
                onClick={() =>
                  setActive((s) => ({ ...s, [l.key]: !s[l.key] }))
                }
                className={cn(locked && "opacity-40")}
              >
                {l.label}
                {locked ? " 🔒" : ""}
              </Button>
            );
          })}
        </div>
      </CardHeader>
      <CardContent>
        {!filtered ? (
          <div className="h-64 sm:h-80 lg:h-[480px] flex items-center justify-center text-slate-500 text-sm bg-ink-950/60 rounded-md border border-white/5">
            {t.dashboard.loadingMap}
          </div>
        ) : (
          <MapInner data={filtered} />
        )}
      </CardContent>
    </Card>
  );
}
