import { useEffect, useRef } from 'react';

/* global google */
declare const google: any;

export interface MapMarker {
  lat: string | number;
  lng: string | number;
  name: string;
  url: string;
}

interface AnnuaireMapProps {
  markers: MapMarker[];
  height?: string;
  focusFilter?: string | null;
  autoFit?: boolean;
}

let loadScriptPromise: Promise<void> | null = null;

function loadGoogleMapsScript(apiKey: string): Promise<void> {
  if (typeof window !== 'undefined' && (window as any).google?.maps) {
    return Promise.resolve();
  }
  if (loadScriptPromise) return loadScriptPromise;

  loadScriptPromise = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = reject;
    document.head.appendChild(script);
  });

  return loadScriptPromise;
}

export default function AnnuaireMap({ markers, height = '450px', focusFilter, autoFit }: AnnuaireMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? '';

  useEffect(() => {
    if (!apiKey || !containerRef.current) return;

    const validMarkers = markers.filter(
      (m) => m.lat !== '' && m.lng !== '' && !isNaN(Number(m.lat)) && !isNaN(Number(m.lng))
    );

    loadGoogleMapsScript(apiKey)
      .then(() => {
        if (!containerRef.current) return;

        const map = new google.maps.Map(containerRef.current, {
          center: { lat: 46.2276, lng: 2.2137 },
          zoom: 6,
          mapTypeControl: false,
          streetViewControl: false,
        });

        mapInstanceRef.current = map;

        validMarkers.forEach((marker) => {
          const position = { lat: Number(marker.lat), lng: Number(marker.lng) };
          const pin = new google.maps.Marker({ position, map, title: marker.name });

          const content = marker.url
            ? `<a href="${marker.url}" style="font-weight:600">${marker.name}</a>`
            : marker.name;
          const info = new google.maps.InfoWindow({ content });
          pin.addListener('click', () => info.open({ anchor: pin, map }));
        });

        if (autoFit && validMarkers.length) {
          if (validMarkers.length === 1) {
            map.setCenter({ lat: Number(validMarkers[0].lat), lng: Number(validMarkers[0].lng) });
            map.setZoom(14);
          } else {
            const bounds = new google.maps.LatLngBounds();
            validMarkers.forEach((m) => bounds.extend({ lat: Number(m.lat), lng: Number(m.lng) }));
            map.fitBounds(bounds);
          }
        }
      })
      .catch(() => {
        console.warn('Échec du chargement de la carte.');
      });
  }, [apiKey, markers]);

  // Zoom sur le filtre actif (département ou ville)
  useEffect(() => {
    if (!mapInstanceRef.current || !focusFilter) return;

    const filtered = markers.filter(
      (m) =>
        m.url.startsWith(focusFilter) &&
        m.lat !== '' &&
        m.lng !== '' &&
        !isNaN(Number(m.lat)) &&
        !isNaN(Number(m.lng))
    );

    if (!filtered.length) return;

    const bounds = new google.maps.LatLngBounds();
    filtered.forEach((m) => bounds.extend({ lat: Number(m.lat), lng: Number(m.lng) }));
    mapInstanceRef.current.fitBounds(bounds);
  }, [focusFilter, markers]);

  if (!apiKey) return null;

  return <div ref={containerRef} style={{ width: '100%', height }} />;
}
