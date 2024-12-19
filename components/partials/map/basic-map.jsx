import { missionService } from "@/_services/mission.service";
import { UserService } from "@/_services/user.service";
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup,useMapEvents } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import "leaflet-control-geocoder/dist/Control.Geocoder.css"
import "leaflet-control-geocoder/dist/Control.Geocoder.js"
import L from "leaflet"
import { socket } from "@/utils/socket";
import { useRouter } from 'next/navigation';
import { useSelector } from "react-redux";

const BasicMap = () => {
  const position = [47.31322, -1.319482];

  const [AllDriver, setAllDriver] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentLocation, setCurrentLocation] = useState([48.709438,2.503570]);
  const defaultCenter = currentLocation || position;
  const router = useRouter();
  const userAuth = useSelector((state) => state.userAuth);
  const [Role, setRole] = useState("admin");
  useEffect(() => {
    if (userAuth.role === "PARTNER") {
      setRole("partner");
    } else if (userAuth.role === "ADMIN") {
      setRole("admin");
    }
  }, [userAuth.role]);
  const FindAllDrivers = () => {
    return UserService.GetAllUsers()
      .then((res) => {
        console.log("FindAllDrivers",res);
        setAllDriver(res.users);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        console.log("done");
      });
  };



  const groupAsyncFunctions = () => {
    setIsLoading(true);
    Promise.all([ FindAllDrivers()])
      .then(() => {})
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    groupAsyncFunctions();
  }, []); // Empty array to only run on mount

let DefaultIcon = L.icon({

    iconUrl: "/assets/images/mapicon/Marker-location.png",
    iconSize: [60, 60],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76],
    shadowSize: [50, 64],
    shadowAnchor: [4, 62],
    className: "my-custom-class"
  });
  const myIcon = L.icon({
    iconUrl:"/assets/images/mapicon/marker-courier.png",
    iconSize: [60, 60],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76],
    shadowSize: [50, 64],
    shadowAnchor: [4, 62],
    className: "my-custom-class"
    });
  const EnRoute = L.icon({
    iconUrl: "/assets/images/mapicon/EnRoute.png",
    iconSize: [60, 60],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76],
    shadowSize: [50, 64],
    shadowAnchor: [4, 62],
    className: "my-custom-class"
    });
  L.Marker.prototype.options.icon = DefaultIcon;
  // const mapRef = useMapEvents({
  //   click(){
  //
  //   }
  // })
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      setCurrentLocation([latitude, longitude]);
    });
  }, []);
  const MapsMarker = () => {
    const [position1, setPosition] = useState(null);
    const map = useMapEvents({
      click() {
        map.locate();
      },
      locationfound(e) {
        setPosition(e.latlng);
        map.flyTo(e.latlng, map.getZoom());
      },
    });
    // useEffect(() => {
    //   if (currentLocation) {
    //     map.flyTo(currentLocation, map.getZoom());
    //   }
    // }, [ map]);


    return position1 === null ? null : (
      <Marker position={position1}
      // icon={}
      >
        <Popup>You are here</Popup>
      </Marker>
    );
  };
    const [onlineUsers, setOnlineUsers] = useState(new Map());
    const handleLocationUpdate = (newUserObject) => {

      setUserArray(prevArray => {
        const existingUserIndex = prevArray.findIndex(user => user.userId === newUserObject.userId);

        if (existingUserIndex !== -1) {
          // Update the location of the existing user
          const updatedArray = [...prevArray];

          if (newUserObject.hasOwnProperty('enRoute')) {
            // alert("gggg")
            updatedArray[existingUserIndex] = { ...prevArray[existingUserIndex], enRoute:newUserObject.enRoute  };

          }else {

            updatedArray[existingUserIndex] = { ...prevArray[existingUserIndex], location: newUserObject.location };
          }
          return updatedArray;
        } else {
          // Add a new user object to the array
          return [...prevArray, newUserObject];
        }
      });
    };

    const handleOffline = (offlineUserId) => {
      setUserArray(prevArray => prevArray.filter(user => user.userId !== offlineUserId));
    };
    useEffect(() => {
      socket.on('connect', () => {

      });
      socket.on('offline', (userid) => {

        handleOffline(userid)

      });

      socket.on('error', (error) => {
        console.error('Socket error:', error);
      });

      socket.on('newLocation', (location) => {

        handleLocationUpdate(location);

        setOnlineUsers((prevOnlineUsers) => {
          const newOnlineUsers = new Map(prevOnlineUsers);
          newOnlineUsers.set(location.userId, { location });

          return newOnlineUsers;
        });
      });
      socket.on('userEnRoute', userOnroute=> {

        handleLocationUpdate(userOnroute);
      })

    }, [socket]);
    const [userArray, setUserArray] = useState([
      {
        location: {
          latitude: 48.709438,
          longitude: 2.503570
        },
        userId: '1234'
      }
    ]);
    const bounds = AllDriver?.reduce(
      (acc, pointBin) => {
        const [lat, lon] = [
          pointBin?.address?.latitude,
          pointBin?.address?.longitude
        ];

        if (lat && lon) {
          acc.extend([lat, lon]);
        }

        return acc;
      },
      L.latLngBounds(defaultCenter, defaultCenter)
    );
  return (
    <div className="w-full h-[500px]">
      <MapContainer
        center={{ lat: currentLocation[0], lng: currentLocation[1] }}
        zoom={2}

        bounds={bounds}
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


        {userArray &&
          userArray?.map(e => (
            (e?.location?.latitude && e?.location?.longitude )&&
            <Marker
              key={e?._id}
              position={[e?.location?.latitude, e?.location?.longitude]} // Update property names
                icon={e?.enRoute  ? EnRoute:myIcon }
                eventHandlers={{

              click: () => {
                // const navigate = useHistory();
                router.push(
                  Role === "admin"
                    ? `/admin/driverDetail/${e.userId}`
                    : `/partner`
                  );
                // alert('A marker has been clicked!')
                }
            }}
            >


            </Marker>
          ))}
        {currentLocation && (
          <Marker position={currentLocation}
            // icon={}
            eventHandlers={{
              click: () => {}
            }}

          >
            <Popup>Your current location</Popup>
          </Marker>
        )}
        <MapsMarker />
        </MarkerClusterGroup>
      </MapContainer>
    </div>
  );
};

export default BasicMap;
