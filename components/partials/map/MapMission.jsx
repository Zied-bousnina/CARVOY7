import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet-routing-machine";
import { LoadScript, GoogleMap, Marker as GoogleMarker } from "@react-google-maps/api";
import { SocialService } from "@/_services/SocialLoginConfig.service"; // API to fetch Google Maps Key

const MapMission = ({ startingPoint, setStartingPoint, destination, setDestination, setSearchQuery }) => {
  const [googleMapsApiKey, setGoogleMapsApiKey] = useState(null);
  const [currentLocation, setCurrentLocation] = useState([48.709438, 2.503570]);
  const [mapInstance, setMapInstance] = useState(null);
  const [routeControl, setRouteControl] = useState(null);

  // Fetch Google Maps API Key
  useEffect(() => {
    SocialService.GetSocialConfig()
      .then((data) => {
        if (data.googleMaps?.apiKey) {
          setGoogleMapsApiKey(data.googleMaps.apiKey);
        }
      })
      .catch(() => setGoogleMapsApiKey(null));
  }, []);

  // Get current location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      setCurrentLocation([latitude, longitude]);
    });
  }, []);

  // ------------------------ Leaflet (Fallback) ------------------------
  let DefaultIcon = L.icon({
    iconUrl: "/assets/images/mapicon/Marker-location.png",
    iconSize: [60, 60],
  });

  let DestinationIcon = L.icon({
    iconUrl: "/assets/images/mapicon/marker-courier.png",
    iconSize: [60, 60],
  });

  const reverseGeocode = async (lat, lon) => {
    if (googleMapsApiKey) {
      // ✅ Use Google Geocoding API if Google Maps is available
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=${googleMapsApiKey}`
      );
      const data = await response.json();

      if (data.status === "OK" && data.results.length > 0) {
        return data.results[0].formatted_address; // Return full formatted address
      }
    } else {
      // ❌ Fallback to OpenStreetMap (Nominatim)
      const response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`);
      const data = await response.json();
      return data.display_name; // Return OpenStreetMap address format
    }
  };


  const MapClickHandler = () => {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        if (!startingPoint) {
          reverseGeocode(lat, lng).then((display_name) => {
            setStartingPoint({ latitude: lat, longitude: lng, display_name });
            setSearchQuery(display_name);
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

  // ------------------------ Google Maps ------------------------
  const handleGoogleMapClick = async (event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();

    if (!startingPoint) {
      const display_name = await reverseGeocode(lat, lng);
      setStartingPoint({ latitude: lat, longitude: lng, display_name });
      setSearchQuery(display_name);
    } else if (!destination) {
      const display_name = await reverseGeocode(lat, lng);
      setDestination({ latitude: lat, longitude: lng, display_name });
    }
  };

  // ------------------------ Conditional Rendering ------------------------
  return (
    <div className="w-full h-[500px]">
      {googleMapsApiKey ? (
        // ✅ Use Google Maps if API key is available
        <LoadScript googleMapsApiKey={googleMapsApiKey}>
          <GoogleMap
            mapContainerStyle={{ height: "100%", width: "100%" }}
            center={{ lat: currentLocation[0], lng: currentLocation[1] }}
            zoom={13}
            onClick={handleGoogleMapClick}
          >
            {startingPoint && (
              <GoogleMarker position={{ lat: startingPoint.latitude, lng: startingPoint.longitude }} />
            )}
            {destination && (
              <GoogleMarker position={{ lat: destination.latitude, lng: destination.longitude }} />
            )}
          </GoogleMap>
        </LoadScript>
      ) : (
        // ❌ Fallback to Leaflet if Google Maps API Key is missing
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
          )}

          {destination && (
            <Marker position={[destination.latitude, destination.longitude]} icon={DestinationIcon}>
              <Popup>{destination.display_name}</Popup>
            </Marker>
          )}

          <MapClickHandler />
        </MapContainer>
      )}
    </div>
  );
};

export default MapMission;
