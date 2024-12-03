import React from 'react';

const cardStyle = {
  backgroundColor: '#fff', // White background
  color: '#343a40', // Dark gray text
  padding: '20px', // Add padding for spacing
  border: '1px solid #e0e0e0', // Light border
  borderRadius: '8px', // Rounded corners
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Subtle shadow
};

const titleStyle = {
  fontSize: '1.5rem',
  fontWeight: 'bold',
  marginBottom: '20px',
};

const sectionTitleStyle = {
  fontSize: '1.2rem',
  fontWeight: 'bold',
  marginTop: '20px',
  marginBottom: '10px',
};

const listStyle = {
  marginLeft: '20px',
};

const checkboxStyle = {
  marginTop: '20px',
};

const TermsComponent = () => {
  return (
    <div style={cardStyle}>
      {/* <h5 style={titleStyle}>Conditions particulières</h5> */}

      <div>
        <strong style={sectionTitleStyle}>Transport par camion :</strong>
        <p>
          CarVoy s'engage à vous mettre en relation avec un transporteur camion
          pour réaliser le transport de votre véhicule entre deux adresses de
          votre choix.
        </p>
      </div>

      <div>
        <strong style={sectionTitleStyle}>Compris dans le prix :</strong>
        <p>
          Assurance tout risque (voir les détails de l'assurance), péages,
          carburant. Conditions d'annulation:
        </p>
        <ul style={listStyle}>
          <li>Si votre véhicule n'est pas encore affecté à un transporteur camion :</li>
          <ul style={listStyle}>
            <li>
              Plus de 48h (hors dimanche et jours fériés) avant la date limite de
              livraison : Annulation gratuite
            </li>
            <li>
              Entre 24 et 48h avant la date limite de livraison : Remboursement de
              50% du prix de la commande
            </li>
            <li>Moins de 24h avant la date limite de livraison : Aucun remboursement</li>
          </ul>
          <li>Si votre véhicule est déjà affecté à un transporteur camion :</li>
          <ul style={listStyle}>
            <li>
              Plus de 48h (hors dimanche et jours fériés) avant la date de
              l'enlèvement : Annulation gratuite
            </li>
            <li>
              Entre 24 et 48h avant la date d'enlèvement : Remboursement de 50% du
              prix de la commande
            </li>
            <li>Moins de 24h avant la date d'enlèvement : Aucun remboursement</li>
          </ul>
        </ul>
      </div>

      <div>
        <strong style={sectionTitleStyle}>Conditions de transport :</strong>
        <p>
          Vous vous engagez à mettre à disposition un véhicule assuré et dans
          l'état de fonctionnement mentionné. Veillez noter qu'un véhicule "en
          panne" doit néanmoins posséder ses 4 roues, une direction et des freins
          en état de marche. Dans le cas contraire, il s'agit d'un véhicule
          "accidenté" et tous deux devraient être préparés pour modifier l'état
          du véhicule. Un état des lieux du véhicule à l'arrivée sera effectué.
          Pour des raisons de sécurité et car le véhicule ne sera pas verrouillé,
          veuillez ne rien stocker dans le véhicule.
        </p>
      </div>

      <div className="form-check" style={checkboxStyle}>
        <input
          type="checkbox"
          className="form-check-input"
          id="acceptTerms"
        />
        <label className="form-check-label" htmlFor="acceptTerms">
          J'accepte les conditions
        </label>
      </div>
    </div>
  );
};

export default TermsComponent;
