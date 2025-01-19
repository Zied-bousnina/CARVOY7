import React, { useState } from 'react';
import './ServiceOptions.css';

const ServiceOptions = ({ onUpdateTotal, onUpdateSelectedService, screen }) => {
  const [selectedServices, setSelectedServices] = useState({
    [screen === 'professionel' ? 'charge' : 'main']: false,
    fuel: false,
    exteriorWash: false,
    interiorCleaning: false,
    garagePlate: false,
  });

  const servicesDataPro = [
    { id: 'fuel', name: 'Plein carburant', description: 'Livraison avec le plein (facturé au réel)', price: 10 },
    { id: 'charge', name: 'Recharge électrique', description: 'Recharge lors du convoyage (facturée au réel)', price: 10 },
    { id: 'exteriorWash', name: 'Lavage Extérieur', description: 'Rouleau avant livraison', price: 19 },
    { id: 'interiorCleaning', name: 'Lavage Intérieur', description: 'Aspirateur sur sièges et tapis', price: 15 },
    { id: 'garagePlate', name: 'Plaque W Garage', description: 'Si véhicule sans plaque', price: 30 },
  ];

  const servicesDataPlat = [
    { id: 'fuel', name: 'Plein carburant', description: 'Livraison avec le plein (facturé au réel)', price: 10 },
    { id: 'main', name: 'Mise en main', description: 'Présentation options essentielles (~20 min)', price: 20 },
    { id: 'exteriorWash', name: 'Lavage Extérieur', description: 'Rouleau avant livraison', price: 19 },
    { id: 'interiorCleaning', name: 'Lavage Intérieur', description: 'Aspirateur sur sièges et tapis', price: 15 },
    { id: 'garagePlate', name: 'Plaque W Garage', description: 'Si véhicule sans plaque', price: 30 },
  ];

  const servicesData = screen === 'professionel' ? servicesDataPro : servicesDataPlat;

  const toggleService = (serviceId) => {
    setSelectedServices((prevSelectedServices) => {
      const isSelected = !prevSelectedServices[serviceId];
      const newSelectedServices = { ...prevSelectedServices, [serviceId]: isSelected };

      const newTotalPrice = servicesData.reduce((total, service) => {
        return total + (newSelectedServices[service.id] ? service.price : 0);
      }, 0);

      onUpdateTotal(newTotalPrice);
      onUpdateSelectedService(newSelectedServices);

      return newSelectedServices;
    });
  };

  return (
    <div className="service-options">
      <h3 className="service-options-title">Options de Service</h3>
      <div className="services-list">
        {servicesData.map((service) => (
          <div
            key={service.id}
            className={`service-item ${service.id} ${selectedServices[service.id] ? 'selected' : ''}`}
            onClick={() => toggleService(service.id)}
          >
            <div className="service-icon">
              <i className={`icon-${service.id}`} />
            </div>
            <div className="service-content">
              <div className="service-name">{service.name}</div>
              <div className="service-description">{service.description}</div>
            </div>
            <div className="service-price">{service.price} €</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceOptions;
