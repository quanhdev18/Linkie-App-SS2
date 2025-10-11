import { useEffect, useRef } from "react";

const MapPicker = ({ onLocationSelect }) => {
  const mapRef = useRef(null);
  const markerRef = useRef(null);

  useEffect(() => {
    const map = new window.google.maps.Map(mapRef.current, {
      center: { lat: -1.286389, lng: 36.817223 }, // Default center (Nairobi)
      zoom: 12,
    });

    map.addListener("click", (event) => {
      const { latLng } = event;

      if (markerRef.current) {
        markerRef.current.setPosition(latLng);
      } else {
        markerRef.current = new window.google.maps.Marker({
          position: latLng,
          map,
        });
      }

      onLocationSelect({
        lat: latLng.lat(),
        lng: latLng.lng(),
      });
    });
  }, [onLocationSelect]);

  return <div ref={mapRef} style={{ width: "100%", height: "400px" }} />;
};

export default MapPicker;
