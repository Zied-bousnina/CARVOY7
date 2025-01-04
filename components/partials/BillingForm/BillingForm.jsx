import './BillingInformation.css';
import React, { useEffect, useState } from 'react';
import { missionService } from '@/_services/mission.service';
import { toast } from 'react-toastify';

const BillingForm = ({ id }) => {
  const [isloadBillingInformation, setisloadBillingInformation] = useState(false);
  const [userInformation, setuserInformation] = useState({});
  const [billingInfo, setBillingInfo] = useState({});
  const [editing, setEditing] = useState(false);
  const [isload, setIsLoading] = useState(false);

  const FetchPartnerDetail = (id) => {
    setisloadBillingInformation(true);
    return missionService
      .getUserInformationById(id)
      .then((res) => {

        setisloadBillingInformation(false);
        setuserInformation({
          name: res.user.name,
          address: res.user.addressPartner,
          email: res.user.email,
          phone: res.user.phoneNumber,
          vat: res.user.VAT,
        });
      })
      .catch((err) => {
        
      })
      .finally(() => {
       
        setisloadBillingInformation(false);
      });
  };

  const groupAsyncFunctions = (id) => {
    setIsLoading(true);
    Promise.all([FetchPartnerDetail(id)])
      .then(() => {})
      .catch((err) => {
       
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    groupAsyncFunctions(id);
  }, []);

  const handleEditToggle = () => setEditing(!editing);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBillingInfo((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    EditPartner(billingInfo);
    setEditing(false);
  };
  const EditPartner = (data) => {
    setIsLoading(true);
    missionService
      .UpdateUserInformationById(data)
      .then(() => {
        setEditing(false);
        toast.success('Created successfully!', {
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
      });
  };

  return (
    <div className="w-full max-w-3xl mx-auto ">
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="border-b pb-4 mb-4">
          {/* <h5 className="text-lg font-semibold">Facturation et commentaire</h5> */}
        </div>
        {!editing ? (
          isloadBillingInformation ? (
            <div className="flex justify-center">
              <div className="spinner-border text-primary" role="status"></div>
            </div>
          ) : (
            <div
              className="bg-gray-100 p-4 rounded-lg cursor-pointer"
              onClick={handleEditToggle}
            >
              <h6 className="text-gray-600 text-sm mb-4 uppercase">
                Informations de facturation (Cliquer pour changer)
              </h6>
              <p className="text-sm mb-1">{billingInfo?.name}</p>
              <p className="text-sm mb-1">{billingInfo?.address}</p>
              <p className="text-sm mb-1">{billingInfo?.email}</p>
              <p className="text-sm mb-1">{billingInfo?.phone}</p>
              <p className="text-sm mb-1">{billingInfo?.vat}</p>
            </div>
          )
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1" htmlFor="name">
                Nom
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                value={billingInfo.name || ''}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1" htmlFor="address">
                Adresse
              </label>
              <input
                type="text"
                name="address"
                id="address"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                value={billingInfo.address || ''}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                value={billingInfo.email || ''}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1" htmlFor="phone">
                Téléphone
              </label>
              <input
                type="tel"
                name="phone"
                id="phone"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                value={billingInfo.phone || ''}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1" htmlFor="vat">
                TVA
              </label>
              <input
                type="text"
                name="vat"
                id="vat"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                value={billingInfo.vat || ''}
                onChange={handleInputChange}
              />
            </div>
            <button
              type="submit"
              className={`w-full py-2 px-4 text-white rounded-lg ${
                isload ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-600'
              }`}
              disabled={isload}
            >
              {isload ? 'Saving...' : 'Sauvegarder'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default BillingForm;
