"use client";

import { useEffect, useRef } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useClimateStore } from "@/stores/useClimateStore";

// Admin layers are always controlled via their own UI toggles — exclude from URL
const EXCLUDED_PREFIXES = ["admin-"];

function isUrlLayer(id: string): boolean {
  return !EXCLUDED_PREFIXES.some((p) => id.startsWith(p));
}

/**
 * Syncs activeLayers to/from URL search params (?layers=id1,id2,...)
 * - On mount: reads `layers` param and sets activeLayers in the store
 * - On change: updates the URL param without navigation
 * Admin layers (admin-*) are excluded from the URL.
 */
export function useLayerUrlSync() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const initialized = useRef(false);

  // On mount: read URL → store (merge URL layers with default admin layers)
  useEffect(() => {
    const layersParam = searchParams.get("layers");
    if (layersParam && !initialized.current) {
      const urlLayers = layersParam.split(",").filter(Boolean);
      if (urlLayers.length > 0) {
        const currentAdmin = useClimateStore.getState().activeLayers.filter((id) => !isUrlLayer(id));
        useClimateStore.setState({ activeLayers: [...currentAdmin, ...urlLayers] });
      }
    }
    initialized.current = true;
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // On store change: store → URL (only non-admin layers)
  useEffect(() => {
    return useClimateStore.subscribe((state, prevState) => {
      if (!initialized.current) return;
      if (state.activeLayers === prevState.activeLayers) return;

      const urlLayers = state.activeLayers.filter(isUrlLayer);
      const params = new URLSearchParams(searchParams.toString());
      if (urlLayers.length > 0) {
        params.set("layers", urlLayers.join(","));
      } else {
        params.delete("layers");
      }
      const qs = params.toString();
      const url = qs ? `${pathname}?${qs}` : pathname;
      router.replace(url, { scroll: false });
    });
  }, [searchParams, router, pathname]);
}
