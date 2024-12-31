import React from 'react';
import './Summary.css';

const Summary = ({ vehicle, transport, journey, distance, totalCost }) => {
  const extractCities = (journey) => {
    const parts = journey.split(' > ');
    const departureCity = parts[0]?.split(',')[0].trim();
    const arrivalCity = parts[1]?.split(',')[0].trim();
    return { departureCity, arrivalCity };
  };
  const { departureCity, arrivalCity } = extractCities(journey);
  return (
    <div className="summary">
      <h2 className="summary-title">Récapitulatif de la demande</h2>
      <div className="summary-detail">
      <p>
  <strong className="blue-petrol">Véhicule :</strong> {vehicle}
</p>
        <p><strong className="blue-petrol" >Transport :</strong> {transport}</p>
        <p> <strong className="blue-petrol">Trajet :</strong> {departureCity} {'>'} {arrivalCity}</p>
        <p><strong className="blue-petrol">Distance :</strong> {distance?.toFixed(2)} km</p>
      </div>
      <div className="summary-total">
        <p><strong>Total :</strong>
        {
          (Number(totalCost)

).toLocaleString('fr-FR', {style:'currency', currency: 'EUR'})
        }
        </p>
      </div>
    </div>
  );
};

export default Summary;
