import { missionService } from "@/_services/mission.service";
import { UserService } from "@/_services/user.service";
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.js";
import L from "leaflet";
import { socket } from "@/utils/socket";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { SocialService } from "@/_services/SocialLoginConfig.service";

const BasicMap = () => {
  const [googleMapsApiKey, setGoogleMapsApiKey] = useState(null);
  const [currentLocation, setCurrentLocation] = useState([48.709438, 2.503570]);
  const [AllDriver, setAllDriver] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [userArray, setUserArray] = useState([]);
  const router = useRouter();
  const userAuth = useSelector((state) => state.userAuth);
  const [Role, setRole] = useState("admin");

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
    if (userAuth.role === "PARTNER") setRole("partner");
    else if (userAuth.role === "ADMIN") setRole("admin");
  }, [userAuth.role]);

  const FindAllDrivers = () => {
    return UserService.GetAllUsers()
      .then((res) => {
        setAllDriver(res.users);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    setIsLoading(true);
    Promise.all([FindAllDrivers()])
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false));
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

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCurrentLocation([position.coords.latitude, position.coords.longitude]);
      },
      (error) => console.error("Geolocation error:", error)
    );
  }, []);

  const handleLocationUpdate = (newUserObject) => {
    setUserArray((prevArray) => {
      const existingUserIndex = prevArray.findIndex(user => user.userId === newUserObject.userId);

      if (existingUserIndex !== -1) {
        const updatedArray = [...prevArray];
        updatedArray[existingUserIndex] = {
          ...prevArray[existingUserIndex],
          location: newUserObject.location,
          enRoute: newUserObject.enRoute || prevArray[existingUserIndex].enRoute
        };
        return updatedArray;
      } else {
        return [...prevArray, newUserObject];
      }
    });
  };

  const handleOffline = (offlineUserId) => {
    setUserArray(prevArray => prevArray.filter(user => user.userId !== offlineUserId));
  };

  useEffect(() => {
    socket.on("connect", () => console.log("Socket connected"));
    socket.on("offline", (userid) => handleOffline(userid));
    socket.on("error", (error) => console.error("Socket error:", error));
    socket.on("newLocation", (location) => handleLocationUpdate(location));
    socket.on("userEnRoute", (userOnRoute) => handleLocationUpdate(userOnRoute));

    return () => {
      socket.off("connect");
      socket.off("offline");
      socket.off("error");
      socket.off("newLocation");
      socket.off("userEnRoute");
    };
  }, []);

  const bounds = AllDriver.reduce(
    (acc, driver) => {
      const [lat, lon] = [driver?.address?.latitude, driver?.address?.longitude];
      if (lat && lon) acc.extend([lat, lon]);
      return acc;
    },
    L.latLngBounds(currentLocation, currentLocation)
  );

  return (
    <div className="w-full h-[500px]">
      <MapContainer
        center={currentLocation}
        zoom={7}
        bounds={bounds}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%" }}
      >
        {googleMapsApiKey ? (
          <TileLayer
            url={`https://maps.googleapis.com/maps/api/js?key=${googleMapsApiKey}&callback=initMap`}
            attribution="Google Maps"
          />
        ) : (
          <TileLayer
            attribution="OpenStreetMap"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        )}

        <MarkerClusterGroup chunkedLoading>
          {userArray.map((user) =>
            user?.location?.latitude && user?.location?.longitude ? (
              <Marker
                key={user.userId}
                position={[user.location.latitude, user.location.longitude]}
                icon={user.enRoute ? EnRoute : myIcon}
                eventHandlers={{
                  click: () => {
                    router.push(Role === "admin" ? `/admin/driverDetail/${user.userId}` : `/partner`);
                  },
                }}
              />
            ) : null
          )}

          {currentLocation && (
            <Marker position={currentLocation}>
              <Popup>Votre position actuelle</Popup>
            </Marker>
          )}
        </MarkerClusterGroup>
      </MapContainer>
    </div>
  );
};

export default BasicMap;
