import React, { useState } from 'react';
import './ServiceOptions.css';

// ... (same servicesData as above)
const servicesDataPro = [
  { id: 'fuel', name: 'Plein carburant', description: 'Livraison avec le plein (celui-ci vous sera facturé au réel)', price: 10 },
  { id: 'charge', name: 'Recharge électrique', description: 'Réalisation d\'une recharge lors du convoyage (elle vous sera facturée au réel)', price: 10 },
  { id: 'exteriorWash', name: 'Lavage Extérieur', description: 'Au rouleau avant la livraison', price: 19 },
  { id: 'interiorCleaning', name: 'Lavage Intérieur', description: 'Aspirateur sur les sièges et tapis', price: 15 },
  { id: 'garagePlate', name: 'Plaque W Garage', description: 'Si votre véhicule ne possède pas de plaque', price: 30 }
];
const servicesDataPlat = [
  { id: 'fuel', name: 'Plein carburant', description: 'Livraison avec le plein (celui-ci vous sera facturé au réel)', price: 10 },
  { id: 'main', name: 'Mise en main', description: 'Présentation rapide des options et fonctionnalités essentielles à la conduite et l\'entretien du véhicule(± 20min)', price: 20 },
  { id: 'exteriorWash', name: 'Lavage Extérieur', description: 'Au rouleau avant la livraison', price: 19 },
  { id: 'interiorCleaning', name: 'Lavage Intérieur', description: 'Aspirateur sur les sièges et tapis', price: 15 },
  { id: 'garagePlate', name: 'Plaque W Garage', description: 'Si votre véhicule ne possède pas de plaque', price: 30 }
];

const ServiceOptions = ({ onUpdateTotal,onUpdateSelectedService, screen }) => {
  const [selectedServices, setSelectedServices] = useState({
    [
      screen === 'professionel' ? "charge":  "main"
    ]: false,
    fuel: false,
    exteriorWash: false,
    interiorCleaning: false,
    garagePlate: false,

  });
  const servicesData = screen === 'professionel' ? servicesDataPro:  servicesDataPlat ;

  const toggleService = (serviceId) => {
    setSelectedServices(prevSelectedServices => {
      // Toggle the selected state for the service
      const isSelected = !prevSelectedServices[serviceId];
      const newSelectedServices = { ...prevSelectedServices, [serviceId]: isSelected };
// console.log(newSelectedServices);
      // Calculate the new total price based on the selected services
      const newTotalPrice = servicesData.reduce((total, service) => {
        return total + (newSelectedServices[service.id] ? service.price : 0);
      }, 0);

      // Call the function passed through props to update the total cost
      onUpdateTotal(newTotalPrice);

      onUpdateSelectedService(newSelectedServices);

      return newSelectedServices;
    });
  };

  return (
  <div className="service-options">
    <div className="services-list">
      {servicesData.map(service => (
        <div
          key={service.id}
       className={`service-item ${service.id} ${selectedServices[service.id] ? 'selected' : ''}`}
          onClick={() => toggleService(service.id)}
        >
          <div className="service-content">
            <div className="service-name">
              {service.name}
            </div>
            <div className="service-description">
              {service.description}
            </div>
          </div>
          <div className="service-price">
            {service.price} €
          </div>
        </div>
      ))}
    </div>
  </div>
);
      }


export default ServiceOptions;

