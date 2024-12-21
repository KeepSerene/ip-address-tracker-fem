import "./IpMap.css";

// Library imports
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

// React imports
import { useEffect } from "react";

// Default icon configuration
const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// Set the default icon for all markers
L.Marker.prototype.options.icon = DefaultIcon;

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
