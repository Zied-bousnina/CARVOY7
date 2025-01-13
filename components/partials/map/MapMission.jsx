import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet-routing-machine";

const MapMission = ({ startingPoint, setStartingPoint, destination, setDestination, setSearchQuery }) => {
  const [currentLocation, setCurrentLocation] = useState([48.709438, 2.503570]);
  const [mapInstance, setMapInstance] = useState(null);
  const [routeControl, setRouteControl] = useState(null);
  const [route, setRoute] = useState(null);

  // Marker Icons
  let DefaultIcon = L.icon({
    iconUrl: "/assets/images/mapicon/Marker-location.png",
    iconSize: [60, 60],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76],
    shadowSize: [50, 64],
    shadowAnchor: [4, 62],
    className: "my-custom-class",
  });

  let DestinationIcon = L.icon({
    iconUrl: "/assets/images/mapicon/marker-courier.png",
    iconSize: [60, 60],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76],
    shadowSize: [50, 64],
    shadowAnchor: [4, 62],
    className: "my-custom-class",
  });

  // Get current location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      setCurrentLocation([latitude, longitude]);
    });
  }, []);

  // Update route when points change
  useEffect(() => {
    if (mapInstance && (startingPoint || destination)) {
      if (routeControl) {
        mapInstance.removeControl(routeControl);
      }

      const newRouteControl = L.Routing.control({
        waypoints: [
          startingPoint ? L.latLng(startingPoint.latitude, startingPoint.longitude) : null,
          destination ? L.latLng(destination.latitude, destination.longitude) : null,
        ].filter(Boolean),
        routeWhileDragging: true,
        show: true,
        lineOptions: {
          styles: [{ color: "#6c63ff", weight: 5 }],
        },
      }).addTo(mapInstance);

      setRouteControl(newRouteControl);
    }
  }, [mapInstance, startingPoint, destination]);

  // Handle map clicks to set points
  const reverseGeocode = async (lat, lon) => {
    const response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`);
    const data = await response.json();
    return data.display_name;
  };

  const formatAddress = (displayName) => {
    const parts = displayName.split(',').map(part => part.trim());
    let streetNumber = '';
    let streetName = '';
    let postalCode = '';
    let city = '';

    parts.forEach(part => {
      if (/^\d{5}$/.test(part)) {
        postalCode = part;
      } else if (/^\d+\s/.test(part)) {
        streetNumber = part.split(' ')[0];
        streetName = part.split(' ').slice(1).join(' ');
      } else if (!streetName && !postalCode && !city) {
        streetName = part;
      } else if (!city) {
        city = part;
      }
    });

    return `${streetNumber} ${streetName}, ${postalCode}, ${city}`;
  };

  const MapClickHandler = () => {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;

        if (!startingPoint) {
          reverseGeocode(lat, lng).then((display_name) => {
            setStartingPoint({ latitude: lat, longitude: lng, display_name });
            setSearchQuery(formatAddress(display_name));
          });
        } else if (!destination) {
          reverseGeocode(lat, lng).then((display_name) => {
            setDestination({ latitude: lat, longitude: lng, display_name });
          });
        }
      },
    });

    return null;
  };

  return (
    <div className="w-full h-[500px]">
      <MapContainer
        center={currentLocation}
        zoom={13}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%" }}
        whenCreated={(map) => setMapInstance(map)}
      >
        <TileLayer
          attribution={"Google Maps"}
          url="http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
          maxZoom={20}
          subdomains={["mt0", "mt1", "mt2", "mt3"]}
        />

        {startingPoint && (
          <Marker position={[startingPoint.latitude, startingPoint.longitude]} icon={DefaultIcon}>
            <Popup>{startingPoint.display_name}</Popup>
          </Marker>
        )
        }

        {destination && (
          <Marker position={[destination.latitude, destination.longitude]} icon={DestinationIcon}>
            <Popup>{destination.display_name}</Popup>
          </Marker>
        )}

        <MapClickHandler />
      </MapContainer>
    </div>
  );
};

export default MapMission;
