import React, { useEffect, useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import axios from 'axios';
import { missionService } from '@/_services/mission.service';
import { toast } from 'react-toastify';
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

const CARD_OPTIONS = {
  style: {
    base: {
      iconColor: '#c4f0ff',
      color: '#000000',
      fontWeight: '500',
      fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
      fontSize: '16px',
      '::placeholder': { color: '#87bbfd' },
    },
    invalid: {
      iconColor: '#ffc7ee',
      color: '#ffc7ee',
    },
  },
};

export default function PaymentForm({ data, id }) {
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [userInformation, setUserInformation] = useState({});
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const userAuth = useSelector((state) => state.userAuth);
  const [Role, setRole] = useState("admin");
  useEffect(() => {
    if (userAuth.role === "PARTNER") {
      setRole("partner");
    } else if (userAuth.role === "ADMIN") {
      setRole("admin");
    }
  }, [userAuth.role]);

  const getUserInformation = () => {
    // Simulate loading user data
    setUserInformation({
      price: 120, // Example subtotal
    });
  };

  useEffect(() => {
    getUserInformation();
  }, []);
  const Payee = (data) => {
    setIsLoading(true);
    missionService
      .PayerEnLignePartner(data)
      .then(() => {
        // setEditing(false);
        // setSuccess(true);
        toast.success('Facture payée avec succès  !', {
          position: 'top-right',
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
      })
      .catch((error) => {

      })
      .finally(() => {
        setIsLoading(false);
        toast.success('Facture payée avec succès  !', {
          position: 'top-right',
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
        router.push(
          Role ==="admin"?

          "/admin/mission"
          :"partner/mission"
        );
      });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });

    if (!error) {
      try {
        const { id } = paymentMethod;
        const payload = {
          referenceNumber: e.target.referenceNumber.value,
          freeComment: e.target.freeComment.value,
          partnerId: userInformation.user?._id,
          missionId: userInformation._id,
          totalAmmount: totalTTC,
          id,
        };

        Payee(payload)
        // const response = await axios.post(
        //   'https://convoyage.onrender.com/api/users/facture/PayerEnLignePartner',
        //   payload
        // );

        if (response.data.success) {
          setSuccess(true);
        }
      } catch (error) {
        console.error('Payment Error:', error);
      }
    } else {
      console.error('Stripe Error:', error.message);
    }
    setIsLoading(false);
  };

  const subtotal = userInformation.price || 0;
  const taxRate = 0.2; // Example tax rate
  const totalTTC = subtotal / (1 + taxRate);

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6 my-5 w-full max-w-3xl mx-auto ">
      {!success ? (
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="referenceNumber" className="block text-sm font-medium text-gray-700">
              Référence (pour votre comptabilité)
            </label>
            <input
              type="text"
              name="referenceNumber"
              id="referenceNumber"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm  sm:text-sm"
              placeholder="Numéro de facture"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="freeComment" className="block text-sm font-medium text-gray-700">
              Commentaire ou instruction spécifique
            </label>
            <textarea
              name="freeComment"
              id="freeComment"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm  sm:text-sm"
              placeholder="Instruction pour le transporteur"
            ></textarea>
          </div>

          <div className="mb-4">
            <label htmlFor="card-element" className="block text-sm font-medium text-gray-700">
              Carte bancaire
            </label>
            <div className="p-2 border rounded-md bg-gray-100">
              <CardElement id="card-element" options={CARD_OPTIONS} />
            </div>
          </div>

          <div className="mb-6">
            <div className="text-gray-700">
              <p className="text-sm">
                <span className="font-semibold">Total:</span>{' '}
                {Number(Number(totalTTC).toFixed(3)).toLocaleString('fr-FR', {
                  style: 'currency',
                  currency: 'EUR',
                })}
              </p>
              <p className="text-sm">
                <span className="font-semibold">Total TTC (TVA 20%):</span>{' '}
                {Number(Number(subtotal).toFixed(3)).toLocaleString('fr-FR', {
                  style: 'currency',
                  currency: 'EUR',
                })}
              </p>
            </div>
          </div>

          <button
            type="submit"
            className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
              isLoading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-indigo-600 hover:bg-indigo-700'
            }`}
            disabled={isLoading || !stripe}
          >
            {isLoading ? (
              <span className="loader spinner-border-sm" role="status" aria-hidden="true"></span>
            ) : (
              'Payer'
            )}
          </button>
        </form>
      ) : (
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-green-600">Paiement réussi.</h2>
        </div>
      )}
    </div>
  );
}
