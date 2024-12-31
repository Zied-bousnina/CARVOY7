import React, { useState } from 'react';
import { Button } from 'reactstrap';
import './Documents.css';
import carDocumentIconPlaceholder from './car.png'; // Default icon path
import idDocumentIconPlaceholder from './id.png'; // Default icon path

const Documents = ({ onDocumentUpload, validerCommande }) => {
  const isLoad = false
  const [documentIcons, setDocumentIcons] = useState({
    vehicleRegistration: carDocumentIconPlaceholder,
    identityProof: idDocumentIconPlaceholder,
  });

  const handleFileChange = (event, documentName) => {
    const file = event.target.files[0];
    if (file) {
      // Set the document icon to the selected image
      const reader = new FileReader();
      reader.onload = (e) => {
        setDocumentIcons({ ...documentIcons, [documentName]: e.target.result });
      };
      reader.readAsDataURL(file);

      // Call the provided onDocumentUpload function
      onDocumentUpload(documentName, file);
      console.log(documentName, file);
    }
  };

  return (
    <div className="documents-container">
      <h3 className="document-heading">Documents à apporter lors du départ</h3>
      <div className="document-list">
        {/* Vehicle Registration Document */}
        <div className="document-item">
          <img src={documentIcons.vehicleRegistration} alt="Vehicle Registration" className="document-icon" />
          <input
            id="vehicleRegistration"
            type="file"
            onChange={(event) => handleFileChange(event, 'vehicleRegistration')}
            hidden
          />
          <label htmlFor="vehicleRegistration" className="document-label">
            Copie de la carte grise
          </label>
        </div>

        {/* Identity Proof Document */}
        <div className="document-item">
          <img src={documentIcons.identityProof} alt="Identity Proof" className="document-icon" />
          <input
            id="identityProof"
            type="file"
            onChange={(event) => handleFileChange(event, 'identityProof')}
            hidden
          />
          <label htmlFor="identityProof" className="document-label">
            Votre pièce d'identité
          </label>
        </div>
      </div>
      {/* <Button
        onClick={validerCommande}
       color="primary" className="submit-button">

      {isLoad ? (
        <div className="spinner-border text-light" role="status">
          <span className="visually-hidden"></span>
        </div>
      ) : (
        ' Valider ma commande'
      )}
      </Button> */}
    </div>
  );
};

export default Documents;
