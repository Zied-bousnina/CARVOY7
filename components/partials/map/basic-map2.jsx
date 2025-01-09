import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import "leaflet-routing-machine";
import L from "leaflet";

const BasicMap2 = ({ cords }) => {
  const [currentLocation, setCurrentLocation] = useState([48.709438, 2.503570]);
  const { depart, destination } = cords;

  let DefaultIcon = L.icon({
    iconUrl: "/assets/images/mapicon/Marker-location.png",
    iconSize: [60, 60],
    iconAnchor: [30, 60],
    popupAnchor: [0, -40],
    className: "my-custom-class",
  });

  const myIcon = L.icon({
    iconUrl: "/assets/images/mapicon/marker-courier.png",
    iconSize: [60, 60],
    iconAnchor: [30, 60],
    popupAnchor: [0, -40],
    className: "my-custom-class",
  });

  const EnRoute = L.icon({
    iconUrl: "/assets/images/mapicon/EnRoute.png",
    iconSize: [60, 60],
    iconAnchor: [30, 60],
    popupAnchor: [0, -40],
    className: "my-custom-class",
  });

  L.Marker.prototype.options.icon = DefaultIcon;

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      setCurrentLocation([latitude, longitude]);
    });
  }, []);

  return (
    <div className="w-full h-[500px]">
      <MapContainer
        center={currentLocation}
        zoom={7}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution={"Google Maps"}
          url="http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
          maxZoom={20}
          subdomains={["mt0", "mt1", "mt2", "mt3"]}
        />
        <MarkerClusterGroup chunkedLoading>
          {depart?.latitude && depart?.longitude && (
            <Marker position={[depart.latitude, depart.longitude]} icon={myIcon}>
              <Popup>{depart?.display_name || "Departure Point"}</Popup>
            </Marker>
          )}
          {destination?.latitude && destination?.longitude && (
            <Marker
              position={[destination.latitude, destination.longitude]}
              icon={EnRoute}
            >
              <Popup>{destination?.display_name || "Destination Point"}</Popup>
            </Marker>
          )}
        </MarkerClusterGroup>
      </MapContainer>
    </div>
  );
};

export default BasicMap2;
