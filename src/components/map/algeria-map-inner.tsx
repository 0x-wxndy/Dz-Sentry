"use client";

import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import type { FeatureCollection, Point } from "geojson";
import "leaflet/dist/leaflet.css";

function colorFor(risk?: string) {
  if (risk === "red") return "#f07178";
  if (risk === "yellow") return "#e6c07b";
  return "#7fd99a";
}

export default function AlgeriaMapInner({ data }: { data: FeatureCollection }) {
  return (
    <div className="h-[480px] rounded-md overflow-hidden border border-white/10 map-dark">
      <MapContainer
        center={[28.0, 2.5]}
        zoom={5}
        scrollWheelZoom
        className="h-full w-full"
        style={{ background: "#0b1220" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; CARTO'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        {data.features.map((f, i) => {
          if (f.geometry.type !== "Point") return null;
          const coords = (f.geometry as Point).coordinates;
          const p = f.properties as {
            name?: string;
            risk?: string;
            score?: number;
            note?: string;
            layer?: string;
          };
          return (
            <CircleMarker
              key={`${p.name}-${i}`}
              center={[coords[1], coords[0]]}
              radius={10}
              pathOptions={{
                color: colorFor(p.risk),
                fillColor: colorFor(p.risk),
                fillOpacity: 0.75,
                weight: 2,
              }}
            >
              <Popup>
                <div className="text-sm">
                  <strong>{p.name}</strong>
                  <div>
                    {p.layer} | {p.risk} | score {p.score}
                  </div>
                  <div className="mt-1 text-xs opacity-80">{p.note}</div>
                </div>
              </Popup>
            </CircleMarker>
          );
        })}
      </MapContainer>
    </div>
  );
}
