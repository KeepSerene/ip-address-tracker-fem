import "./IpMap.css";

// Library imports
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

// React imports
import { useEffect } from "react";

// Utility component to handle map position updates
function MapUpdater({ center }) {
  // Access the Leaflet map instance
  const map = useMap();

  useEffect(() => {
    map.setView(center);
  }, [map, center]);

  // It doesn't need to render anything
  return null;
}

function IpMap({ ipData }) {
  const { lat, lng } = ipData.location;
  const position = [lat, lng];

  const formatCoord = (coord, type) => {
    const degrees = Math.abs(parseFloat(coord).toFixed(2));
    const direction =
      type === "lat" ? (+coord > 0 ? "N" : "S") : +coord > 0 ? "E" : "W";

    return `${degrees}° ${direction}`;
  };

  return (
    // MapContainer is deliberately non-reactive to prop changes to avoid performance issues
    <MapContainer center={position} zoom={13} id="map-container">
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      <Marker position={position}>
        <Popup>
          {formatCoord(lat, "lat")}, {formatCoord(lng, "lng")}
        </Popup>
      </Marker>

      <MapUpdater center={position} />
    </MapContainer>
  );
}

export default IpMap;
