"use client";
import React, { useEffect, useRef, useState } from "react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import dynamic from "next/dynamic";
import Textinput from "@/components/ui/Textinput";
import {
  CardHeader,
  CardBody,
  Container,
  Row,
  Col
} from "reactstrap";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { AuthService } from "@/_services/auth.service";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";
import axios from "axios";
import Radio from "@/components/ui/Radio";
import { calculatePrice, calculatePriceConvo } from "@/utils/calculatePrice";
import Summary from "@/components/partials/validation-devis/Summary/Summary";
import ServiceOptions from "@/components/partials/validation-devis/ServicesOptions/ServiceOptions";
import Documents from "@/components/partials/validation-devis/Documents/Documents";
import { missionService } from "@/_services/mission.service";
import VehicleInfoCard from "@/components/partials/mission/VehicleInfoCard";
import { SocialService } from "@/_services/SocialLoginConfig.service";

const MapMission = dynamic(() => import("@/components/partials/map/MapMission"), {
  ssr: false,
});
const localData = {
  erreur: "",
  immat: "aa123bc",
  co2: "134",
  energie: "2",
  energieNGC: "DIESEL",
  genreVCG: 1,
  genreVCGNGC: "VP",
  puisFisc: "7",
  carrosserieCG: "CI",
  marque: "RENAULT",
  modele: "MEGANE III",
  date1erCir_us: "2009-04-18",
  date1erCir_fr: "18-04-2009",
  collection: "non",
  date30: "1989-06-30",
  vin: "VF1DZ0N0641118804",
  boite_vitesse: "M",
  puisFiscReel: "130",
  nr_passagers: "5",
  nb_portes: "5",
  type_mine: "MRE5531A0421",
  couleur: "NOIR",
  poids: "1310 kg",
  cylindres: "4",
  sra_id: "RE80126",
  sra_group: "32",
  sra_commercial: "1.9 DCI 130 XV DE FRANCE",
  logo_marque: "https://api.apiplaqueimmatriculation.com/logos_marques/?marque=renault",
  code_moteur: "",
  k_type: "31164",
  db_c: 1,
  nbr_req_restants: 49,
};
const EditMission = ({ params }) => {
  const [currentStep, setCurrentStep] = useState(1); // State to track the current step
  const [form, setForm] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState({});
  const router = useRouter();
  const [transType, setTransType] = useState("");
  const [phone, setphone] = useState()
  const [correctDistance, setcorrectDistance] = useState(0)
  const [startingPointSuggestions, setStartingPointSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  const [isStartingPoint, setisStartingPoint] = useState(true)
const [isLoading, setIsLoading] = useState(false);
const [isLoad, setIsLoad] = useState(false)
const [isDestination, setisDestination] = useState(false)
const [startingPoint, setstartingPoint] = useState()
const [destination, setdestination] = useState()
const isStartingPointRef = useRef(true);
const [searchQuery, setSearchQuery] = useState("");
const [destinationSearchQuery, setDestinationSearchQuery] = useState("");
const [screen, setscreen] = useState("create")
const [data, setdata] = useState({});
const [cost, setcost] = useState(0)
const [hasPlaque, setHasPlaque] = useState(true)
const [selectedServices, setSelectedServices] = useState({});
const [costdriver, setcostdriver] = useState(0)
const [uploadedDocuments, setUploadedDocuments] = useState({});
const [price, setPrice] = useState(0);
const [googleMapsApiKey, setGoogleMapsApiKey] = useState(null);
const [immatApiKey, setImmatApiKey] = useState(null);
const [vehicleDetails, setVehicleDetails] = useState({
  vehicle: '',
  transport: '',
  journey: '',
  distance: ''
});
const [MissionDetails, setMissionDetails] = useState({});
const { id } = params;
const [immatriculation, setImmatriculation] = useState("");
  const [vehicleData, setVehicleData] = useState(null);
  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const data = await SocialService.GetSocialConfig();
        if (data.googleMaps?.apiKey) {
          setGoogleMapsApiKey(data.googleMaps.apiKey);
        }
        if (data.immatApi?.apiKey) {
          setImmatApiKey(data.immatApi.apiKey);
        }
      } catch {
        setGoogleMapsApiKey(null);
        setImmatApiKey(null);
      }
    };
    fetchConfig();
  }, []);
  const fetchVehicleData = async (immatriculation) => {
    if (!immatApiKey) {
      setVehicleData(null);
      return;
    }

    try {
      const response = await axios.get(
        `https://api.apiplaqueimmatriculation.com/carte-grise?immatriculation=${immatriculation}&token=${immatApiKey}&format=json`
      );

      if (response.data) {
        setVehicleData(response.data.data);
      }
    } catch (error) {
      console.error("Vehicle API failed. Using local data.");
    }
  };
  const FetchMissionDetail = (id) => {
    return missionService
      .FindRequestDemandeById(id)
      .then((res) => {
        setMissionDetails(res?.demande|| {}); // Update the state with the correct value
        prepopulateForm(res?.demande || {});
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {});
  };
  // const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    startPoint: "",
    partnerInfo: "",
    immatriculation: "",
  });



  // Move to the next step
  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  // Move to the previous step
  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };
  useEffect(() => {
    // Trigger search whenever immatriculation changes
    if (form.immatriculation) {
      fetchVehicleData();
    }
  }, [form.immatriculation]);
  const groupAsyncFunctions = (id) => {
    setIsLoading(true);
    Promise.all([FetchMissionDetail(id)])
      .then(() => {})
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    groupAsyncFunctions(id);
  }, []);
  console.log("MissionDetails", MissionDetails)
  const getDistanceFromLatLonInKm=()=>{
    const lat1 = startingPoint?.latitude;
  const lon1 = startingPoint?.longitude;
  const lat2 = destination?.latitude;
  const lon2 = destination?.longitude;
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2-lat1);  // deg2rad below
    var dLon = deg2rad(lon2-lon1);
    var a =
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ;
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c; // Distance in km
   return d
  }

  const deg2rad=(deg)=> {
    return deg * (Math.PI/180)
  }
  const distance = correctDistance ? correctDistance : getDistanceFromLatLonInKm();
  const calculateAndSetPrice = () => {
    try {

      const calculatedPrice = calculatePrice(distance, transType);

      setPrice(calculatedPrice);
      setcost(calculatedPrice)
      setcostdriver(calculatePriceConvo(distance))
    } catch (error) {
      console.error(error.message);
    }
  };
  useEffect(() => {
    if (startingPoint && destination && transType) {
      calculateAndSetPrice();
    }
  }, [startingPoint, destination, transType]);
  const onSubmit = (e) => {
    e.preventDefault();
    const data = {
      ...form,
      address: startingPoint,
      destination:destination,
      postalAddress:startingPoint?.display_name,
      postalDestination:destination?.display_name,
      distance:distance,
      // driverIsAuto:!checked,
      // dateDepart:value?._d,
      // driver:selectedValues?.value,
      // vehicleType: selectedVehicleType?.value,
      // missionType: selectedMissionType?.value,
      status:"En attente",
      // time: correctTime ? correctTime : Math.round(distance / 60),
      transport:transType,
      // vehicule: vehicule
      // vehicule: Vehicule,

      phone:phone,
      vehicleData: vehicleData






    }

    setVehicleDetails({
      ...vehicleDetails, // Keep existing vehicleDetails properties
      vehicle: vehicleData.modele, // Update with actual vehicle name if you have it in state
      transport: data.transport=="convoyeur professionnel" ? "Convoyeur partenaires CarVoy" : "Plateau porteur" , // Update with actual transport type if you have it in state
      journey: `${data.postalAddress} > ${data.postalDestination}`,
      distance: data.distance, // Update with actual distance if you have it calculated
      address: startingPoint,
      destination:destination,
    });
    setdata(data)
    if(data.transport==="convoyeur professionnel"){
      setscreen("professionel")
    }else{
      setscreen("plateau")
    }

    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  }
    const handleTotalUpdate = (total) => {
      setcost(
       price+ total

      );

    // if (
    //   form.name === undefined ||
    //   form.contactName === undefined ||
    //   form.addressPartner === undefined ||
    //   form.email === undefined ||
    //   form.phoneNumber === undefined ||
    //   form.siret === undefined ||
    //   form.kbis === undefined
    // ) {
    //
    //   return;
    // }

    // const formData = new FormData();
    // Object.keys(form).forEach((key) => {
    //   if (Array.isArray(form[key])) {
    //     form[key].forEach((value) => {
    //       formData.append(key, value);
    //     });
    //   } else {
    //     formData.append(key, form[key]);
    //   }
    // });

    // createPartner(formData);
  };
  const handleServicesUpdate = (services) => {
    setSelectedServices(
      {
        ...services
      }

    );

  }

  const fetchSuggestions = async (query, isStarting) => {
    if (!query) {
      if (isStarting) setStartingPointSuggestions([]);
      else setDestinationSuggestions([]);
      return;
    }

    try {
      let suggestions = [];

      if (googleMapsApiKey) {
        // Use Google Places API if API Key exists
        const response = await axios.get(
          `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${query}&key=${googleMapsApiKey}&language=fr`
        );

        if (response.data.status === "OK") {
          suggestions = response.data.predictions.map((place) => ({
            display_name: place.description,
            place_id: place.place_id,
          }));
        }
      } else {
        // Use OpenStreetMap (Nominatim)
        const response = await axios.get(
          `https://nominatim.openstreetmap.org/search?q=${query}&format=json&addressdetails=1&limit=5`
        );

        suggestions = response.data.map((place) => ({
          display_name: place.display_name,
          latitude: place.lat,
          longitude: place.lon,
        }));
      }

      if (isStarting) setStartingPointSuggestions(suggestions);
      else setDestinationSuggestions(suggestions);
    } catch (error) {
      console.error("Error fetching location suggestions:", error);
    }
  };


    const formatAddress = (displayName) => {
      const parts = displayName.split(',').map(part => part.trim());
      let streetNumber = '';
      let streetName = '';
      let postalCode = '';
      let city = '';

      // Assuming the typical order of components in the display_name
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

    const handleSuggestionClick = async (suggestion, isStarting) => {
      if (!suggestion) return;

      try {
        let locationData = {
          display_name: suggestion.display_name || "",
          latitude: suggestion.latitude || suggestion.lat,
          longitude: suggestion.longitude || suggestion.lon,
        };

        if (!locationData.latitude || !locationData.longitude) {
          console.error("❌ Error: Invalid location data received:", locationData);
          return;
        }

        if (isStarting) {
          setstartingPoint(locationData);
          setSearchQuery(locationData.display_name);
          setStartingPointSuggestions([]);
        } else {
          setdestination(locationData);
          setDestinationSearchQuery(locationData.display_name);
          setDestinationSuggestions([]);
        }

        console.log(`✅ ${isStarting ? "Starting Point" : "Destination"} set:`, locationData);
      } catch (error) {
        console.error("❌ Error handling suggestion selection:", error);
      }
    };
  const handleSuggestionDestinationClick = (suggestion) => {
    const formattedAddress = formatAddress(suggestion.display_name);
    setdestination({
      display_name: formattedAddress,
      latitude: suggestion.lat,
      longitude: suggestion.lon,
    });
    setDestinationSuggestions([]);
  };
  const handleDocumentUpload = (documentName, file) => {
    setUploadedDocuments({
      ...uploadedDocuments,
      [documentName]: file
    });
    setdata({
      ...data,
      [documentName]: file

    })
  };
  const onSubmit2 = async (e) => {




    await setdata({
      ...data,
      price:cost*1.2,
      selectedServices:selectedServices,
      uploadedDocuments,
      remunerationAmount: costdriver
    })


console.log("new new: ", {
  ...data,
  price:cost,
  selectedServices:selectedServices,
  uploadedDocuments,
  remunerationAmount: costdriver
 })
    CreateMission(
      {
         ...data,
         price:cost,
         selectedServices:selectedServices,
         uploadedDocuments,
         remunerationAmount: costdriver
        }
    )

    };

    const CreateMission = (data) => {
      setIsLoad(true)
      setIsSubmitting(true);
      missionService.UpdateMission(data,id)
        .then((res) => {

          setIsSubmitting(false);
          // You can show a success message here
          toast.success("         created successfully!          ", {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          setError( {});
          setForm({});

          router.push(`/admin/mission`);

        })
        .catch((error) => {

          setIsSubmitting(false);
          if (error) {
            setError(error); // Assuming the backend returns an error object like { email: 'Email already exists', ... }
          }
        })
        .finally(() => {
          setIsLoad(false)
        }
        );

        ;
    };
    const prepopulateForm = (details) => {
      setForm({
        address: details?.address || "",
        destination: details?.destination || "",
        transport: details?.transport || "",
        immatriculation: details?.immatriculation || "",
        phone: details?.phone || "",
        dateDepart: details?.dateDepart
          ? new Date(details.dateDepart).toISOString().slice(0, 16)
          : "",
      });
      setTransType(details?.transport || "");
      setstartingPoint(details?.address || null);
      setSearchQuery(details?.address?.display_name || "");
      setdestination(details?.destination || null);
      setDestinationSearchQuery(details?.destination?.display_name || "");
      setphone(details?.phone || "");

      if (details?.immatriculation) {
        fetchVehicleData(details.immatriculation);
      }
    };
    console.log(startingPoint)
  return (
    <div>
      <form
   onSubmit={onSubmit}
   style={{
     padding: "20px",
     borderRadius: "5px",
     justifyContent: "center",
     alignItems: "center",
     margin: 20,
   }}
 >
      <ToastContainer />
      <Card title="modifier la mission" className="bg-white">
        {currentStep === 1 && (
          <div>

            <h2 className="text-xl font-semibold mb-4">Étape 1: Point de départ</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 ">

{/* point depart */}
<div>
<Textinput
label="Point de départ"
type="text"
placeholder="Choisissez le point de départ"
name="address"
value={searchQuery|| startingPoint?.display_name} // Controlled by searchQuery
onChange={(e) => {
setSearchQuery(e.target.value); // Update search query
fetchSuggestions(e.target.value, true); // Fetch suggestions
}}
error={error?.name}
/>


  {isLoading && (
<div className="loader">
<div className="spinner"></div>
</div>
)}
{startingPoint?.display_name && (
<button
type="button"
className="text-gray-500 hover:text-gray-700 bg-transparent p-2 rounded-full focus:outline-none"
onClick={() => {
setstartingPoint(null);
setSearchQuery('');
}}
>
&times;
</button>
)}
{startingPointSuggestions.length > 0 && (
<ul className="bg-white shadow-md rounded-lg mt-2 border border-gray-200 divide-y divide-gray-200">
<li
      className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-100 text-blue-500"
      onClick={() => {
        if (!navigator.geolocation) {
          toast.error("La géolocalisation n'est pas prise en charge par votre navigateur.");
          return;
        }

        toast.info("Détection de votre position...", { autoClose: 1000 });

        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;

            try {
              let locationData;

              if (googleMapsApiKey) {
                const googleResponse = await fetch(
                  `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${googleMapsApiKey}`
                );
                const googleData = await googleResponse.json();

                if (googleData.status === "OK" && googleData.results.length > 0) {
                  locationData = {
                    display_name: googleData.results[0].formatted_address,
                    latitude,
                    longitude,
                  };
                }
              } else {
                const osmResponse = await axios.get(
                  `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
                );
                const osmData = osmResponse.data;

                locationData = {
                  display_name: osmData.display_name,
                  latitude,
                  longitude,
                };
              }

              if (locationData) {
                setstartingPoint(locationData);
                setSearchQuery(locationData.display_name);
                setStartingPointSuggestions([]);
                toast.success("Position détectée avec succès !");
              }
            } catch (error) {
              console.error("Erreur lors de la récupération de la position:", error);
              toast.error("Impossible de récupérer votre position.");
            }
          },
          (error) => {
            console.error("Erreur de géolocalisation:", error);
            toast.error("Accès à la localisation refusé ou indisponible.");
          }
        );
      }}
    >
      <span className="font-semibold">📍 Position actuelle</span>
    </li>
{startingPointSuggestions.map((suggestion, index) => (
      <li
        key={index}
        onClick={() => handleSuggestionClick(suggestion, true)} // ✅ Ensure true for startingPoint
        className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-100"
      >
        <span className="text-gray-700">
          <span className="font-semibold">{suggestion.display_name.split(",")[0]}</span>
          {suggestion.display_name.split(",").slice(1).join(",")}
        </span>
      </li>
    ))}
</ul>
)}

  {error?.name && <div className="text-red-500">{error.name}</div>}
</div>

{/* destination */}
<div>
  <Textinput
    label="Destination"
    type="text"
    placeholder="Choisissez la destination ou cliquez sur la carte"
    value={destination?.display_name || destinationSearchQuery}
    required
    name="destination"
    onClick={() => {
isStartingPointRef.current = false;
setdestination(null);
}}
onChange={(e) => {
setDestinationSearchQuery(e.target.value);
fetchSuggestions(e.target.value, false);
}}
  />
  {isLoading && (
<div className="flex justify-center items-center mt-4">
<div className="animate-spin rounded-full h-8 w-8 border-t-2 border-blue-500 border-solid"></div>
</div>
)}
{destination?.display_name && (
<button
type="button"
className="text-gray-500 hover:text-gray-700 bg-transparent p-2 rounded-full focus:outline-none"
onClick={() => {
setdestination(null);
setDestinationSearchQuery('');
}}
>
&times;
</button>
)}
{destinationSuggestions.length > 0 && (
<ul className="bg-white shadow-md rounded-lg mt-2 border border-gray-200 divide-y divide-gray-200">
<li
      className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-100 text-blue-500"
      onClick={() => {
        if (!navigator.geolocation) {
          toast.error("La géolocalisation n'est pas prise en charge par votre navigateur.");
          return;
        }

        toast.info("Détection de votre position...", { autoClose: 1000 });

        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;

            try {
              let locationData;

              if (googleMapsApiKey) {
                const googleResponse = await fetch(
                  `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${googleMapsApiKey}`
                );
                const googleData = await googleResponse.json();

                if (googleData.status === "OK" && googleData.results.length > 0) {
                  locationData = {
                    display_name: googleData.results[0].formatted_address,
                    latitude,
                    longitude,
                  };
                }
              } else {
                const osmResponse = await axios.get(
                  `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
                );
                const osmData = osmResponse.data;

                locationData = {
                  display_name: osmData.display_name,
                  latitude,
                  longitude,
                };
              }

              if (locationData) {
                setdestination(locationData);
                setDestinationSearchQuery(locationData.display_name);
                setDestinationSuggestions([]);
                toast.success("Position détectée avec succès !");
              }
            } catch (error) {
              console.error("Erreur lors de la récupération de la position:", error);
              toast.error("Impossible de récupérer votre position.");
            }
          },
          (error) => {
            console.error("Erreur de géolocalisation:", error);
            toast.error("Accès à la localisation refusé ou indisponible.");
          }
        );
      }}
    >
      <span className="font-semibold">📍 Position actuelle</span>
    </li>

    {destinationSuggestions.map((suggestion, index) => (
      <li
        key={index}
        onClick={() => handleSuggestionClick(suggestion, false)} // ✅ Ensure false for destination
        className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-100"
      >
        <span className="text-gray-700">
          <span className="font-semibold">{suggestion.display_name.split(",")[0]}</span>
          {suggestion.display_name.split(",").slice(1).join(",")}
        </span>
      </li>
    ))}
</ul>
)}

  {error?.contactName && <div className="text-red-500">{error.contactName}</div>}
</div>

{/* Date */}
<div>
  <Textinput
    label="Date de départ"
    type="datetime-local"
    placeholder="Entrez l'adresse de l'entreprise"
    required
    name="dateDepart"
    onChange={onChangeHandler}
    value={form.dateDepart}
    format-value="yyyy-MM-ddTHH:mm"

  />
  {error?.addressPartner && <div className="text-red-500">{error.addressPartner}</div>}
</div>


</div>

</div>
        )}

        {currentStep === 2 && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Étape 2: Informations sur le partenaire et immatriculation</h2>
            <div className="mt-8">
        <h3 className="text-lg font-medium text-gray-800">Type de transport</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
          <Radio
            label="Convoyeur professionnel"
            id="convoyeur-professionnel"
            name="transportType"
            value="convoyeur professionnel"
            checked={transType === "convoyeur professionnel"}
            onChange={(e) => setTransType(e.target.value)}
            activeClass="ring-blue-600"
            wrapperClass="flex items-center space-x-2"
            labelClass="text-gray-700"
          />
          <Radio
            label="Transporteur indépendant"
            id="transporteur-independant"
            name="transportType"
            value="transporteur indépendant"
            checked={transType === "transporteur indépendant"}
            onChange={(e) => setTransType(e.target.value)}
            activeClass="ring-blue-600"
            wrapperClass="flex items-center space-x-2"
            labelClass="text-gray-700"
          />

        </div>
        {transType && (
          <div className="mt-2 text-sm text-green-600">
            Type sélectionné : {transType}
          </div>
        )}
      </div>

      <div className="mt-2">

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
          <div>
      <Textinput
        label="Plaque d'immatriculation :"
        type="text"
        placeholder="Plaque d'immatriculation :"
        required
        name="immatriculation"
        value={form.immatriculation}
        onChange={(e) => {
          const { value, name } = e.target;
          if (value.trim() === "") {
            // Clear the vehicleData if input is empty
            setVehicleData(null);
          } else {
            // Update form state
            onChangeHandler(e);
          }
        }}
      />

      {error?.siret && <div className="text-red-500">{error.siret}</div>}
    </div>
    <div>

    <label

  className={`block capitalize py-2    `}
>
  Numéro de contact:
</label>
    <PhoneInput
country={'fr'}
value={
phone || form.phone
}
onChange={
(e)=>{
setphone(e)

}

}

enableSearch

/>
      {error?.siret && <div className="text-red-500">{error.siret}</div>}
    </div>
    <div>
      <Textinput
        label="Email du contact:"
        type="email"
        placeholder="Email du contact:"
        required
        name="mail"
        onChange={onChangeHandler}
        value={form.mail}
      />
      {error?.siret && <div className="text-red-500">{error.siret}</div>}
    </div>

</div>

</div>
<hr className="my-4" />


          </div>
        )}

        {currentStep === 3 && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Étape 3: Devis</h2>
            <Card title={ screen == "professionel" ?
                      "Par un convoyeur professionel":"Par un transport plateau"}

      headerslot={false}>
           <Summary
        vehicle={vehicleDetails.vehicle}
        transport={vehicleDetails.transport}
        journey={vehicleDetails.journey}
        distance={vehicleDetails.distance}
        totalCost={cost}
        screen={screen}

      />
      <ServiceOptions
      onUpdateTotal={handleTotalUpdate}
      onUpdateSelectedService={handleServicesUpdate}
      screen={screen}

      />
      <Documents
        onDocumentUpload={handleDocumentUpload}
        // screen={screen}
        validerCommande={onSubmit2}
      />


      </Card>
            {/* Optionally, you could add a dynamic map */}
            {/* <MapMission /> */}
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="mt-6 flex justify-between">
          {currentStep > 1 && (
            <Button onClick={prevStep} className="bg-gray-500 text-white">
              Précédent
            </Button>
          )}
          {currentStep < 3 ? (

            <Button
  {...(currentStep !== 2 && { onClick: nextStep })}
  type={currentStep === 2 ? "submit" : "button"}
    className="bg-blue-500 text-white"
>
  Suivant
</Button>

          ) : (
            <Button
  onClick={onSubmit2}
  type="submit"
  className="bg-green-500 text-white"
  disabled={isLoad}
>
  {isLoad ? (
    <div className="loader"></div> // Add your loader component or CSS here
  ) : (
    "Valider"
  )}
</Button>

          )}
        </div>
      </Card>
      {currentStep === 1 &&(
      <Card title="Map"
      className={"bg-white mt-8"}

      headerslot={false}>
        <MapMission
        startingPoint={startingPoint}
        setStartingPoint={setstartingPoint}
        destination={destination}
        setDestination={setdestination}
        setSearchQuery={setSearchQuery}
      />

      </Card>
      )}
      {currentStep === 2 &&vehicleData   &&(
      <Card title="Vehicle Information"
      className={"bg-white mt-8"}

      headerslot={false}>
        <VehicleInfoCard
        currentStep={currentStep}
        vehicleData={vehicleData}/>

      </Card>
      )}
      </form>
    </div>
  );
};

export default EditMission;
