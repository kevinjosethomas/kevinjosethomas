"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import type { GlobeMethods } from "react-globe.gl";

const GlobeGl = dynamic(() => import("react-globe.gl"), {
  ssr: false,
});

const getThree = async () => {
  const THREE = await import("three");
  return THREE;
};

interface HexFeature {
  type: string;
  properties: Record<string, unknown>;
  geometry: {
    type: string;
    coordinates: number[][][];
  };
}

const airports: Record<string, { lat: number; lng: number }> = {
  YVR: { lat: 49.1967, lng: -123.1815 }, // Vancouver
  YYZ: { lat: 43.6777, lng: -79.6248 }, // Toronto
  YTZ: { lat: 43.6275, lng: -79.3963 }, // Toronto City
  SFO: { lat: 37.6213, lng: -122.379 }, // San Francisco
  IAH: { lat: 29.9902, lng: -95.3368 }, // Houston
  BOS: { lat: 42.3656, lng: -71.0096 }, // Boston
  EWR: { lat: 40.6895, lng: -74.1745 }, // Newark
  AUS: { lat: 30.1975, lng: -97.6664 }, // Austin
  LAX: { lat: 33.9416, lng: -118.4085 }, // Los Angeles
  SEA: { lat: 47.4502, lng: -122.3088 }, // Seattle
  FRA: { lat: 50.0379, lng: 8.5622 }, // Frankfurt
  BLR: { lat: 13.1979, lng: 77.7063 }, // Bengaluru
  HKG: { lat: 22.308, lng: 113.9185 }, // Hong Kong
  AMS: { lat: 52.3105, lng: 4.7683 }, // Amsterdam
  DEL: { lat: 28.5562, lng: 77.1 }, // Delhi
  FCO: { lat: 41.8003, lng: 12.2389 }, // Rome
  MAD: { lat: 40.4839, lng: -3.568 }, // Madrid
  SIN: { lat: 1.3644, lng: 103.9915 }, // Singapore
  MAA: { lat: 12.9941, lng: 80.1709 }, // Chennai
  SJD: { lat: 23.1518, lng: -109.7211 }, // San José del Cabo
  CPT: { lat: -33.9715, lng: 18.6021 }, // Cape Town
  JNB: { lat: -26.1367, lng: 28.2411 }, // Johannesburg
  PLZ: { lat: -33.9849, lng: 25.6173 }, // Port Elizabeth
  DXB: { lat: 25.2532, lng: 55.3657 }, // Dubai
  CDG: { lat: 49.0097, lng: 2.5479 }, // Paris
  ZRH: { lat: 47.4582, lng: 8.5555 }, // Zurich
  BOM: { lat: 19.0896, lng: 72.8656 }, // Mumbai
  BHO: { lat: 23.2875, lng: 77.3374 }, // Bhopal
  NAG: { lat: 21.0922, lng: 79.0472 }, // Nagpur
  IXZ: { lat: 11.6414, lng: 92.7296 }, // Port Blair
};

const routes = [
  ["YVR", "YYZ"],
  ["YVR", "SFO"],
  ["YVR", "IAH"],
  ["YYZ", "BOS"],
  ["YTZ", "EWR"],
  ["SFO", "AUS"],
  ["IAH", "AUS"],
  ["LAX", "SEA"],
  ["SEA", "FRA"],
  ["FRA", "YYZ"],
  ["BLR", "FRA"],
  ["BLR", "HKG"],
  ["HKG", "YYZ"],
  ["BLR", "AMS"],
  ["AMS", "DEL"],
  ["AMS", "FCO"],
  ["MAD", "AMS"],
  ["SIN", "MAA"],
  ["SJD", "YVR"],
  ["CPT", "JNB"],
  ["JNB", "BOM"],
  ["JNB", "PLZ"],
  ["DXB", "BLR"],
  ["DXB", "CDG"],
  ["ZRH", "DXB"],
  ["DEL", "BLR"],
  ["BOM", "BLR"],
  ["BLR", "BHO"],
  ["BLR", "NAG"],
  ["IXZ", "MAA"],
  ["BLR", "MAA"],
  ["MAA", "IXZ"],
];

const pointsData = Object.entries(airports).map(([code, coords]) => ({
  lat: coords.lat,
  lng: coords.lng,
  name: code,
  color: "#DC4A15",
  size: 0.5,
}));

const Globe = () => {
  const globeEl = useRef<GlobeMethods | undefined>(undefined);
  const [hexData, setHexData] = useState<HexFeature[]>([]);
  const [globeMaterial, setGlobeMaterial] = useState<unknown>(null);
  const [activeArcs, setActiveArcs] = useState<
    Array<{
      startLat: number;
      startLng: number;
      endLat: number;
      endLng: number;
      color: string;
    }>
  >([]);

  useEffect(() => {
    fetch("/data/ne_110m_admin_0_countries.geojson")
      .then((res) => res.json())
      .then((data) => {
        setHexData(data.features);
      });
  }, []);

  useEffect(() => {
    getThree().then((THREE) => {
      setGlobeMaterial(new THREE.MeshBasicMaterial({ color: 0x0a0a0a }));
    });
  }, []);

  useEffect(() => {
    const updateArcs = () => {
      const numArcs = Math.random() > 0.5 ? 2 : 1;
      const selectedRoutes = [];

      for (let i = 0; i < numArcs; i++) {
        const randomRoute = routes[Math.floor(Math.random() * routes.length)];
        selectedRoutes.push(randomRoute);
      }

      const newArcs = selectedRoutes.map(([from, to]) => ({
        startLat: airports[from].lat,
        startLng: airports[from].lng,
        endLat: airports[to].lat,
        endLng: airports[to].lng,
        color: "rgba(201, 87, 17, 0.75)",
      }));

      setActiveArcs(newArcs);
    };

    const interval = setInterval(updateArcs, 3000);
    updateArcs();

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (globeEl.current) {
        const controls = globeEl.current.controls();

        globeEl.current.pointOfView(
          {
            lat: 35,
            lng: -40,
            altitude: 2,
          },
          0,
        );

        controls.enableZoom = false;
        controls.enablePan = false;

        controls.autoRotate = true;
        controls.autoRotateSpeed = 0.5;
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [globeMaterial]);

  if (!globeMaterial) return null;

  return (
    <div className="h-full w-full">
      <GlobeGl
        ref={globeEl}
        backgroundColor="rgba(0,0,0,0)"
        width={1000}
        height={1000}
        globeMaterial={globeMaterial}
        hexPolygonsData={hexData}
        hexPolygonResolution={3}
        hexPolygonMargin={0.4}
        hexPolygonUseDots={true}
        hexPolygonColor={() => "rgba(255, 255, 255, 0.15)"}
        pointsData={pointsData}
        enablePointerInteraction={false}
        pointAltitude={0.01}
        pointColor="color"
        pointRadius="size"
        pointLabel="name"
        arcsData={activeArcs}
        arcColor="color"
        arcStroke={0.5}
        arcDashLength={0.4}
        arcDashGap={0.2}
        arcDashAnimateTime={2000}
        arcAltitudeAutoScale={0.3}
        showAtmosphere={false}
      />
    </div>
  );
};

export default Globe;
