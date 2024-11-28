import { missionService } from "@/_services/mission.service";
import { UserService } from "@/_services/user.service";
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup,useMapEvents } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import "leaflet-control-geocoder/dist/Control.Geocoder.css"
import "leaflet-control-geocoder/dist/Control.Geocoder.js"
import L from "leaflet"
import { socket } from "@/utils/socket";
const BasicMap = () => {
  const position = [47.31322, -1.319482];

  const [AllDriver, setAllDriver] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentLocation, setCurrentLocation] = useState([48.709438,2.503570]);
  const defaultCenter = currentLocation || position;
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

const base64="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAABYdJREFUWEeVV11sFFUUPndm//+6rVLYggWEPsAWsSmlbLel2xZFNKgoNWpiNPrgg33UxKgQiDVEfSTyYEzUJxUEEkWRCHbb0t1KKWnSpY2K2NraH8pSdrvdn+7OXHNndnbv/LUwD93JnXvO/c453/nOLYL7fhAA4Pu0om2kd/GX/L2vB7e3s9OpKR8D0MQDWoMAMRjwLIuYUPkC08MEgzk5PASAsBpzHkcRAAVSCy9uCRim7dk3GECHMMBabdR4DiPm2GLOcaLq/PkMCPHhwk/BRjo1/0naJvtOopCATB7Y+QDKGk8ygFpVB9MZJR9Fp0M84GcqzvX9S5aELfLMi25IclY6Pbqv3pVhjCGEwKvau0zxMMZjrAnXrz4burVcjVfkwPT+xtOA0XPyIlLhaNU3jxQDBD3nLrciKgFKMLoAEAKYetLfAgz6TSS9nP0cz0M6xwn+LAYWWIZR7RHTjA56zvWeFt716KBuLHFl8qmGiyxi2mjUGDDcWkxBLJ0BjLGQXoRQudtigVV2S76mkgUCHvNDa3/qq9Erg5ABLdZP7a+1Id4SA4QMtPF/8QQsZLNfA0BnS/j6DWIbrN9SBQxzyGEyvVLhtMvOwhgwyy55Vv9wZVbVDgIJqVahyzm7t3E7b4QhyRupQmopB5Px+JHm/pGjslPyEQR93qPrXI7DdqNRFlY2xz1R+Uv4glYWVByQsnFjT91rdov5y0I7IoDbidTUtq7BhxAAr+UMAzCRttrJB61WD/19Mcsd3nwh/KHahjQhYRtWS+vonroOt8V8nE7bnUT6O2/w6otKwaBLeL217mSZzdxOHxZNZzqrLw4cuqcMSICuBWoOehz2U7RRMpM9s+nXK8+rWzJPcQD4+/H6szaz8Vm6c2YSiY6a4NBnxWCKkOUloELprt9StbHM/aeRZQsYeA5H7zrmK7zfjyyp5xGCv/btNVshPs2yTKlklOV4GEvM1+7uHb2mbmYRUv4RXxGQRhNbdri1Nr7KZnXIU4e/WLMj9CY6gnlaY8mQmklNfw4Ar4v7xWiiyXQmnjKWNoTDKbkfzWlISEEAiB97fNuObyxzdhgQEZniQxQOEH/MYDGFCNJcivMjhnsPMLNbKgbxxGMObsbi3zZdjrxEYZJ1iKwESkG65Nu+ttTE3vS4bCbNK4BawWRAb6cyeC6Rrmv9fXhQPRKlYaSgprIpevzVn653Ot82GYpckI830QHJGqKEJMdjGIvFTzX1Db8gO0Ix9vNCVGQxzQjCha7Ao24HDxPrXA6KC/LQyahF1LwV5DqRykaXklVtodFxdfvpdYEWTYnU+qrfqXQ5PrEaDUIl9CeYyN4Mx8F4LPFxIDT8rup2pKilogu073pdgQ0WW65krNLtXC2qt+KKRSWEeJiOL8TuLBrWPzY4GFNHr+4FnT3yNHfv8r5a4XJ85TDJdV5JriSXg4lY/K1AaOSELkelsIXxTN0tCvnVSARGwIT9j0Q2uF1bCFHzzCv8CEsYYDy+MG5IGqp2DA5ml28SWgeEd63t8rXgrq371jjsP5dYzJpZI3eEmUTy6UD/yI+0XBfwFtwVy6jLJ73a9TVW9z5c4m5UMhFjBOOx+X7f5YhPaSvJm1Y7FqahKn6qNEXOIejye3eUW6wDZTazbCZFU2k8l07vbOmLXNUCL/Ov0AKdy65+Bbv9W89sdpceYPJk4HgM/9yNf9MUHn5Z+58mfV9iCRSkKkagbXipoXpTicHwh8dpZ8mBU4nEUjLFbW4eiEyo00/TS51WFQc0j9RY7GrwdiKM3xcaCaMPmvsjH2lqBI1Iow73RkKdLunxbd3JI4QD4esDWlf3gqwrL11UW8gALNu3Oh+Vy8v3Pi1btA5oFk5cLDosGog6tdJRasnVEvr/AW5qQkWZz9wvAAAAAElFTkSuQmCC"
  let DefaultIcon = L.icon({

    iconUrl: base64,
    iconSize: [60, 60],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76],
    shadowSize: [50, 64],
    shadowAnchor: [4, 62],
    className: "my-custom-class"
  });
  const myIcon = L.icon({
    iconUrl:base64,
    iconSize: [60, 60],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76],
    shadowSize: [50, 64],
    shadowAnchor: [4, 62],
    className: "my-custom-class"
    });
  const EnRoute = L.icon({
    iconUrl: base64,
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
    <div className="w-full h-[300px]">
      <MapContainer
        center={{ lat: currentLocation[0], lng: currentLocation[1] }}
        zoom={1}

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
                  navigate.push(`/admin/driver-details/${e.userId}`);
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
