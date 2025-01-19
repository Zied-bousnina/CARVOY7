import React from 'react';
import './Summary.css';

const Summary = ({ vehicle, transport, journey, distance, totalCost }) => {
  // Function to extract departure and arrival cities
  const extractCities = (journey) => {
    const parts = journey.split(' > ');
    const departureCity = parts[0]?.split(',')[0].trim();
    const arrivalCity = parts[1]?.split(',')[0].trim();
    return { departureCity, arrivalCity };
  };

  // Function to calculate the interval for the estimated cost
  const calculateInterval = (amount) => {
    const lowerBound = Math.max(amount * 0.5, 20); // Lower bound is 50% of the amount or a minimum of 20€
    const upperBound = amount + 50; // Upper bound is the amount + 50€
    return {
      lowerBound: lowerBound.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' }),
      upperBound: upperBound.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' }),
    };
  };

  const { departureCity, arrivalCity } = extractCities(journey);
  const { lowerBound, upperBound } = calculateInterval(Number(totalCost));

  return (
    <div className="summary">
      <h2 className="summary-title">Récapitulatif de la demande</h2>
      <div className="summary-detail">
        <p>
          <strong className="blue-petrol">Véhicule :</strong> {vehicle}
        </p>
        <p>
          <strong className="blue-petrol">Transport :</strong> {transport}
        </p>
        <p>
          <strong className="blue-petrol">Trajet :</strong> {departureCity} {'>'} {arrivalCity}
        </p>
        <p>
          <strong className="blue-petrol">Distance :</strong> {distance?.toFixed(2)} km
        </p>
      </div>
      <div className="summary-total">
        {/* <p>
          <strong>Total :</strong>{' '}
          {Number(totalCost).toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
        </p> */}
      <div className="estimate-container">
  <div className="estimate-icon">
    <i className="fas fa-info-circle"></i>
  </div>
  <div className="estimate-content">
    <span className="estimate-label">Devis estimatif :</span>
    <p className="estimate-range">
      Votre devis estimatif varie entre <strong>{lowerBound}</strong> et <strong>{upperBound}</strong>.
    </p>
  </div>
</div>


      </div>
    </div>
  );
};

export default Summary;
