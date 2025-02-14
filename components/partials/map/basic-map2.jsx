import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import "leaflet-routing-machine";
import L from "leaflet";
import { SocialService } from "@/_services/SocialLoginConfig.service";

const BasicMap2 = ({ cords }) => {
  const [googleMapsApiKey, setGoogleMapsApiKey] = useState(null);
  const [currentLocation, setCurrentLocation] = useState([48.709438, 2.503570]);
  const { depart, destination } = cords;

  useEffect(() => {
    SocialService.GetSocialConfig()
      .then((data) => {
        if (data.googleMaps?.apiKey) {
          setGoogleMapsApiKey(data.googleMaps.apiKey);
        }
      })
      .catch(() => setGoogleMapsApiKey(null));
  }, []);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      setCurrentLocation([latitude, longitude]);
    });
  }, []);

  let DefaultIcon = L.icon({
    iconUrl: "/assets/images/mapicon/Marker-location.png",
    iconSize: [60, 60],
    iconAnchor: [30, 60],
    popupAnchor: [0, -40],
  });

  const myIcon = L.icon({
    iconUrl: "/assets/images/mapicon/marker-courier.png",
    iconSize: [60, 60],
    iconAnchor: [30, 60],
    popupAnchor: [0, -40],
  });

  const EnRoute = L.icon({
    iconUrl: "/assets/images/mapicon/EnRoute.png",
    iconSize: [60, 60],
    iconAnchor: [30, 60],
    popupAnchor: [0, -40],
  });

  L.Marker.prototype.options.icon = DefaultIcon;

  return (
    <div className="w-full h-[500px]">
      <MapContainer
        center={currentLocation}
        zoom={7}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%" }}
      >
        {googleMapsApiKey ? (
          <TileLayer
            url={`https://maps.googleapis.com/maps/api/js?key=${googleMapsApiKey}&callback=initMap`}
            attribution={"Google Maps"}
          />
        ) : (
          <TileLayer
            attribution="OpenStreetMap"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        )}

        <MarkerClusterGroup chunkedLoading>
          {depart?.latitude && depart?.longitude && (
            <Marker position={[depart.latitude, depart.longitude]} icon={myIcon}>
              <Popup>{depart?.display_name || "Point de départ"}</Popup>
            </Marker>
          )}
          {destination?.latitude && destination?.longitude && (
            <Marker position={[destination.latitude, destination.longitude]} icon={EnRoute}>
              <Popup>{destination?.display_name || "Point de destination"}</Popup>
            </Marker>
          )}
        </MarkerClusterGroup>
      </MapContainer>
    </div>
  );
};

export default BasicMap2;
