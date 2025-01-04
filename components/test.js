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
// import { MapMission } from '@/components/partials/map/basic-map';
const MapMission = dynamic(
  () => import("@/components/partials/map/MapMission"),
  {
    ssr: false,
  }
);

const CreateMission = () => {
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
const [vehicleDetails, setVehicleDetails] = useState({
  vehicle: '',
  transport: '',
  journey: '',
  distance: ''
});
const [currentStep, setCurrentStep] = useState(1); // State to track the current step
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
  const onChangeHandlerFile = (e) => {
    setForm({
      ...form,
      kbis: e.target.files[0],
    });
  };

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

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
      console.log("distance",distance)
      console.log("transType",transType)
      const calculatedPrice = calculatePrice(distance, transType);
      console.log("calculatedPrice",calculatedPrice)
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






    }
    console.log("data",data)
    setVehicleDetails({
      ...vehicleDetails, // Keep existing vehicleDetails properties
      vehicle: data.vehicle, // Update with actual vehicle name if you have it in state
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
    //   console.log("Please fill all required fields");
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
    console.log("services",services);
    console.log(selectedServices);
  }

  const createPartner = (data) => {
    setIsSubmitting(true);
    AuthService.CreatePartner(data)
      .then((res) => {
        console.log(res);
        setIsSubmitting(false);
        // You can show a success message here
        toast.success("        Partner created successfully!          ", {
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
        // router.push("/partner/Partenaires");

      })
      .catch((error) => {
        console.log(error);
        setIsSubmitting(false);
        if (error) {
          setError(error); // Assuming the backend returns an error object like { email: 'Email already exists', ... }
        }
      });
  };

  // Map


const fetchSuggestions = async (query, isStartingPoint) => {
  if (!query) {
    if (isStartingPoint) {
      setStartingPointSuggestions([]);
    } else {
      setDestinationSuggestions([]);
    }
    return;
  }

  setIsLoading(true); // Start loading

  try {
    const response = await axios.get(`https://nominatim.openstreetmap.org/search?format=json&q=${query}&countrycodes=fr`);

    if (isStartingPoint) {
      setStartingPointSuggestions(response.data);
    } else {
      setDestinationSuggestions(response.data);
    }
  } catch (error) {
    console.error("Error fetching location suggestions:", error);
  } finally {
    setIsLoading(false); // End loading
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

const handleSuggestionClick = (suggestion) => {
  const formattedAddress = formatAddress(suggestion.display_name  );
  setstartingPoint({
    display_name: formattedAddress ,
    latitude: suggestion.lat,
    longitude: suggestion.lon,
  });
  setStartingPointSuggestions([]);
  setSearchQuery(formattedAddress);
  // console.log("startingPoint", startingPoint)
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

  console.log("oihmoiugùo", {
  ...data,
  price:cost*1.2,
  selectedServices:selectedServices,
  uploadedDocuments,
  remunerationAmount: costdriver
  },cost )
  setstartingPoint()
  setdestination()
  setstartingPoint()
  setdestination()
  CreateDriver(
    {
       ...data,
       price:cost,
       selectedServices:selectedServices,
       uploadedDocuments,
       remunerationAmount: costdriver
      }
  )
  setTimeout(() => {


  // dispatch(createDemandeNewVersion({
  // ...data,
  // price:cost,
  // selectedServices:selectedServices,
  // uploadedDocuments,
  // remunerationAmount: costdriver
  // }, navigate))
  setstartingPoint()
  setdestination()
  }, 1500);

    // e.target.reset();
  };

  const CreateDriver = (data) => {
    setIsSubmitting(true);
    missionService.AdMissionNewVersion(data)
      .then((res) => {
        console.log(res);
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
        console.log("++++++++++++++++",res)
        router.push(`/partner/devis/${res?.demande?._id}`);

      })
      .catch((error) => {
        console.log(error);
        setIsSubmitting(false);
        if (error) {
          setError(error); // Assuming the backend returns an error object like { email: 'Email already exists', ... }
        }
      });
  };
const handleCheckboxChange = () => {
  setHasPlaque(!hasPlaque); // Toggle the visibility of the text input
  setFormData({ ...formData, siret: "" }); // Clear the text input value when hidden
  setError({ ...error, siret: "" }); // Clear errors for siret
};

  return (
    <div>
    <ToastContainer />
{
  screen === "create"  ?
  <Card title="Créer un mission"

      headerslot={false}>
        {/* <h4 className="text-slate-900 dark:text-white text-xl mb-4">#89572935Kh</h4> */}
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

          <div className="">
        {/* <h3 className="text-lg font-medium text-gray-800">Type de transport</h3> */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 ">

            {/* point depart */}
            <div>
            <Textinput
  label="Point de départ"
  type="text"
  placeholder="Choisissez le point de départ"
  name="address"
  value={searchQuery} // Controlled by searchQuery
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
      className="px-4 py-2 cursor-pointer hover:bg-gray-100 text-blue-500"
      onClick={() => {
        navigator.geolocation.getCurrentPosition(async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const response = await axios.get(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
            );
            const result = response.data;
            if (result) {
              setstartingPoint({
                display_name: result.display_name,
                latitude: latitude,
                longitude: longitude,
              });

              setStartingPointSuggestions([]);
            }
          } catch (error) {
            console.error('Error fetching current position:', error);
          }
        });
      }}
    >
      Position actuelle
    </li>
    {startingPointSuggestions.map((suggestion, index) => (
      <li
        key={index}
        onClick={() => {
          console.log("suggestion",suggestion)
          handleSuggestionClick(suggestion)}}
        className="px-4 py-2 flex items-center cursor-pointer hover:bg-gray-100"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-gray-400 mr-2"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M10 2a6 6 0 00-6 6c0 3.72 6 10 6 10s6-6.28 6-10a6 6 0 00-6-6zm0 8a2 2 0 110-4 2 2 0 010 4z"
            clipRule="evenodd"
          />
        </svg>
        <span className="text-gray-700">
          {formatAddress(suggestion.display_name)}
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
      className="px-4 py-2 cursor-pointer hover:bg-gray-100 text-blue-500"
      onClick={() => {
        navigator.geolocation.getCurrentPosition(async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const response = await axios.get(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
            );
            const result = response.data;
            if (result) {
              setdestination({
                display_name: result.display_name,
                latitude: latitude,
                longitude: longitude,
              });
              setDestinationSuggestions([]);
            }
          } catch (error) {
            console.error('Error fetching current position:', error);
          }
        });
      }}
    >
      Position actuelle
    </li>
    {destinationSuggestions.map((suggestion, index) => (
      <li
        key={index}
        onClick={() => handleSuggestionDestinationClick(suggestion)}
        className="px-4 py-2 flex items-center cursor-pointer hover:bg-gray-100"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-gray-400 mr-2"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M10 2a6 6 0 00-6 6c0 3.72 6 10 6 10s6-6.28 6-10a6 6 0 00-6-6zm0 8a2 2 0 110-4 2 2 0 010 4z"
            clipRule="evenodd"
          />
        </svg>
        <span className="text-gray-700">
          {formatAddress(suggestion.display_name)}
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
              />
              {error?.addressPartner && <div className="text-red-500">{error.addressPartner}</div>}
            </div>


        </div>

      </div>



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
                onChange={onChangeHandler}
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
    phone
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
              />
              {error?.siret && <div className="text-red-500">{error.siret}</div>}
            </div>

        </div>

      </div>

          <hr className="my-4" />

          <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
            {/* Siret */}
            <div>
              <Textinput
                label="Véhicule :"
                type="text"
                placeholder="BMW, Mercedes, etc."
                required
                name="vehicle"
                onChange={onChangeHandler}
              />
              {error?.siret && <div className="text-red-500">{error.siret}</div>}
            </div>


          </div>

          {/* Submit Button */}
          <div className="ltr:text-right rtl:text-left space-x-3 rtl:space-x-reverse">
            {/* {isSubmitting ? (
              <div className="spinner-border text-light" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            ) : ( */}
              <Button isLoading={isSubmitting} isdi type="submit" text="Valider" className="btn-dark" />
            {/* )} */}
          </div>
        </form>
      </Card>
  :


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
    }
      <Card title="j’obtiens mon devis"
      className={"bg-white mt-8"}

      headerslot={false}>
        <h4 className="text-slate-900 dark:text-white text-xl mb-4">#89572935Kh</h4>
        <MapMission
        startingPoint={startingPoint}
        setStartingPoint={setstartingPoint}
        destination={destination}
        setDestination={setdestination}
        setSearchQuery={setSearchQuery}
      />

      </Card>
    </div>
  );
};


export default CreateMission;
