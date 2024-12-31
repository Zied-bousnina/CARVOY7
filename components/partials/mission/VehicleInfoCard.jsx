import React from "react";

const VehicleInfoCard = ({ currentStep, vehicleData }) => {
  return (
    <>
      {currentStep === 2 && vehicleData && (
        <div className="bg-white shadow-lg rounded-lg p-8 mt-8 max-w-4xl mx-auto">
          {/* Header Section with Title and Logo */}
          <div className="flex justify-between items-center border-b pb-4 mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Informations sur le Véhicule</h2>
            {vehicleData.logo_marque && (
              <img
                src={vehicleData.logo_marque}
                alt="Logo Marque"
                className="h-12 w-auto object-contain"
              />
            )}
          </div>

          {/* Vehicle Details Section */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 text-sm">
            {/* Field Group 1 */}
            <div>
              <p className="font-semibold text-gray-500">Immatriculation :</p>
              <p className="text-gray-800">{vehicleData.immat}</p>
            </div>
            <div>
              <p className="font-semibold text-gray-500">Marque :</p>
              <p className="text-gray-800">{vehicleData.marque}</p>
            </div>
            <div>
              <p className="font-semibold text-gray-500">Modèle :</p>
              <p className="text-gray-800">{vehicleData.modele}</p>
            </div>

            {/* Field Group 2 */}
            <div>
              <p className="font-semibold text-gray-500">Énergie :</p>
              <p className="text-gray-800">{vehicleData.energieNGC}</p>
            </div>
            <div>
              <p className="font-semibold text-gray-500">Couleur :</p>
              <p className="text-gray-800">{vehicleData.couleur}</p>
            </div>
            <div>
              <p className="font-semibold text-gray-500">Genre :</p>
              <p className="text-gray-800">{vehicleData.genreVCGNGC}</p>
            </div>

            {/* Field Group 3 */}
            <div>
              <p className="font-semibold text-gray-500">Date de 1ère Circulation :</p>
              <p className="text-gray-800">{vehicleData.date1erCir_fr}</p>
            </div>
            <div>
              <p className="font-semibold text-gray-500">Nombre de Cylindres :</p>
              <p className="text-gray-800">{vehicleData.cylindres}</p>
            </div>
            <div>
              <p className="font-semibold text-gray-500">Poids :</p>
              <p className="text-gray-800">{vehicleData.poids}</p>
            </div>

            {/* Field Group 4 */}
            <div>
              <p className="font-semibold text-gray-500">Boîte de Vitesse :</p>
              <p className="text-gray-800">{vehicleData.boite_vitesse}</p>
            </div>
            <div>
              <p className="font-semibold text-gray-500">Puissance Fiscale :</p>
              <p className="text-gray-800">{vehicleData.puisFisc} CV</p>
            </div>
            <div>
              <p className="font-semibold text-gray-500">VIN :</p>
              <p className="text-gray-800">{vehicleData.vin}</p>
            </div>
          </div>

          {/* Additional Notes */}
          <div className="mt-6 bg-gray-100 rounded-md p-4">
            <p className="text-sm text-gray-600">
              <span className="font-semibold">Remarque :</span> Les informations ci-dessus sont basées
              sur les données fournies par l'utilisateur et l'API.
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default VehicleInfoCard;
