
import { guestHeader, ApiConfigs, authHeader } from "../_helpers";


export const missionService =  {
  AdMission,
  AdMissionNewVersion,
  FinddevisByPartner,
  FinddevisById,
  FindRequestDemande,
  FindRequestDemandeByPartner,
  findDemandsstatisticsByPartner,
  findDemandsstatisticsadmin,
  findAmmountStatis,
  FindRequestDemandeByPartnerV2,
  FindFacturesByPartners,
  FindFacturesDriver,
  FindFacturesDetailsById,
  FindFacturesDriverDetailsById,
  PayeeFacture,
  PayeeFactureDriver,
  DeleteMission,
  DeleteCategorie,
  createCategorie,
  FindRequestDemandeById,
  getUserInformationById,
  UpdateUserInformationById,
  FindDevisByPartner,
  UpdateMission,
  UpdateCategorie1,
  FindAllCategories,
  AddDevis,
  rejectDevis,
  UpdateDevis,
  FindCategorieById,
  FindFactureById,
  FindDevisByPartnerId,
  PayeFactureByPartnerHorLigne,
  createFacture,
  FindFacturesByPartner,
  FetchAllPartnership,
  GetPartnerDetailsById,
  UpdatePartnerShip,
  PayerEnLignePartner


}

export async function AdMission(userData){
 const requestOptions =  {
    method: "POST",
    headers: {
        ...authHeader(),
        'Content-Type': 'application/json'
    },
      body: JSON.stringify(userData)
    };
 const response = await fetch(`${ApiConfigs.base_url + ApiConfigs.apis.partner.mission.create}`, requestOptions)

 return handleResponse(response);

}
export async function AdMissionNewVersion(userData){
    const requestOptions =  {
       method: "POST",
       headers: {
           ...authHeader(),
           'Content-Type': 'application/json'
       },
         body: JSON.stringify(userData)
       };
    const response = await fetch(`${ApiConfigs.base_url + ApiConfigs.apis.admin.mission.createNewVersion}`, requestOptions)

    return handleResponse(response);

   }

export async function FinddevisByPartner() {
    const requestOptions =  {
        method:'GET',
        headers: authHeader()
    }
    const response =  await fetch(`${ApiConfigs.base_url + ApiConfigs.apis.partner.devis.FindDevisByPartner}`, requestOptions);

    return handleResponse(response)
}

export async function FinddevisById (devisId) {
    const requestOptions =  {
        method : 'GET',
        headers :  authHeader()
    };

    const response =  await fetch(`${ApiConfigs.base_url + ApiConfigs.apis.admin.FinddevisById.replace('{id}', devisId)}`, requestOptions)
    return handleResponse(response)
}


export async function GetPartnerDetailsById (partnerId) {
    const requestOptions =  {
        method : 'GET',
        headers :  authHeader()
    };

    const response =  await fetch(`${ApiConfigs.base_url + ApiConfigs.apis.admin.GetPartnerDetailsById.replace('{id}', partnerId)}`, requestOptions)
    return handleResponse(response)
}

 export async function FindRequestDemande () {

  const requestOptions =  {
    method: 'GET',
    headers :  authHeader()
  }

  const response =  await fetch(`${ApiConfigs.base_url + ApiConfigs.apis.admin.mission.findMissionByUserId}`, requestOptions)

  return handleResponse(response)
 }

 export async function FindRequestDemandeByPartner () {
  const requestOptions =  {
    method : 'GET',
    headers : authHeader()
  }

  const response  = await fetch(`${ApiConfigs.base_url  + ApiConfigs.apis.partner.mission.findMissionCreatedByPartner}`)
  return handleResponse(response)
 }

export async function findDemandsstatisticsByPartner() {
  const requestOptions =  {
    method: 'GET',
    headers: authHeader()
  }

  const response =  await fetch (`${ApiConfigs.base_url + ApiConfigs.apis.partner.mission.findMissionStatisticsByPartner}`, requestOptions)
  return handleResponse(response)
}

export async function findDemandsstatisticsadmin() {
  const requestOptions = {
    method:'GET',
    headers: authHeader()
  }

  const response = await fetch(`${ApiConfigs.base_url+ ApiConfigs.apis.admin.mission.findMissionStatisticsByAdmin}`,requestOptions)

  return handleResponse(response)
}

export async function findAmmountStatis() {
  const requestOptions = {
    method:'GET',
    headers: authHeader()
  }

  const response = await fetch(`${ApiConfigs.base_url+ ApiConfigs.apis.partner.ammount.findAmmountStatisticsByPartner}`,requestOptions)

  return handleResponse(response)

}

export async function FindRequestDemandeByPartnerV2 () {
  const requestOptions = {
    method:'GET',
    headers: authHeader()
  }

  const response = await fetch(`${ApiConfigs.base_url+ ApiConfigs.apis.admin.FindRequestDemandeByPartnerV2}`,requestOptions)

  return handleResponse(response)
}
export async function FetchAllPartnership () {
  const requestOptions = {
    method:'GET',
    headers: authHeader()
  }

  const response = await fetch(`${ApiConfigs.base_url+ ApiConfigs.apis.admin.FetchAllPartnership}`,requestOptions)

  return handleResponse(response)
}
export async function FindFacturesByPartners () {
  const requestOptions = {
    method:'GET',
    headers: authHeader()
  }

  const response = await fetch(`${ApiConfigs.base_url+ ApiConfigs.apis.admin.facture.findAllPartnersAndTheirFactures}`,requestOptions)

  return handleResponse(response)
}
export async function FindFacturesDriver () {
  const requestOptions = {
    method:'GET',
    headers: authHeader()
  }

  const response = await fetch(`${ApiConfigs.base_url+ ApiConfigs.apis.admin.driver.findAllDriversAndTheirFactures}`,requestOptions)

  return handleResponse(response)
}

export async function FindFacturesDetailsById (id) {
  const requestOptions = {
    method:'GET',
    headers: authHeader()
  }

  const response = await fetch(`${ApiConfigs.base_url+ ApiConfigs.apis.admin.facture.findFactureById.replace('{id}',id)}`,requestOptions)

  return handleResponse(response)
}

export async function FindFacturesDriverDetailsById (id) {
  const requestOptions = {
    method:'GET',
    headers: authHeader()
  }

  const response = await fetch(`${ApiConfigs.base_url+ ApiConfigs.apis.admin.facture.factureDriverById.replace('{id}',id)}`,requestOptions)

  return handleResponse(response)
}
export async function PayeeFacture (id) {
  const requestOptions = {
    method:'GET',
    headers: authHeader()
  }

  const response = await fetch(`${ApiConfigs.base_url+ ApiConfigs.apis.admin.facture.PayeeFacture.replace('{id}',id)}`,requestOptions)

  return handleResponse(response)
}
export async function PayeeFactureDriver (id) {
  const requestOptions = {
    method:'GET',
    headers: authHeader()
  }

  const response = await fetch(`${ApiConfigs.base_url+ ApiConfigs.apis.admin.facture.payeeFactureDriver.replace('{id}',id)}`,requestOptions)

  return handleResponse(response)
}

export async function DeleteMission (id) {
  const requestOptions = {
    method:'DELETE',
    headers: authHeader()
  }

  const response = await fetch(`${ApiConfigs.base_url+ ApiConfigs.apis.admin.mission.deleteMission.replace('{missionId}',id)}`,requestOptions)

  return handleResponse(response)
}
export async function DeleteCategorie (id) {
  const requestOptions = {
    method:'DELETE',
    headers: authHeader()
  }

  const response = await fetch(`${ApiConfigs.base_url+ ApiConfigs.apis.admin.categorie.deleteCategories.replace('{id}',id)}`,requestOptions)

  return handleResponse(response)
}
export async function createCategorie(userData){
  const requestOptions =  {
     method: "POST",
     headers: {
         ...authHeader(),
         'Content-Type': 'multipart/form-data'
     },
       body: JSON.stringify(userData)
     };
  const response = await fetch(`${ApiConfigs.base_url + ApiConfigs.apis.admin.categorie.createCategorie}`, requestOptions)

  return handleResponse(response);

 }
export async function FindRequestDemandeById (id) {
  const requestOptions = {
    method:'GET',
    headers: authHeader()
  }

  const response = await fetch(`${ApiConfigs.base_url+ ApiConfigs.apis.admin.mission.findMissionById.replace('{id}',id)}`,requestOptions)

  return handleResponse(response)
}
export async function getUserInformationById (id) {
  const requestOptions = {
    method:'GET',
    headers: authHeader()
  }

  const response = await fetch(`${ApiConfigs.base_url+ ApiConfigs.apis.admin.mission.getUserInformationById.replace('{id}',id)}`,requestOptions)

  return handleResponse(response)
}
export async function UpdateUserInformationById(userData){
  const requestOptions =  {
     method: "POST",
     headers: {
         ...authHeader(),

     },
       body: JSON.stringify(userData)
     };
  const response = await fetch(`${ApiConfigs.base_url + ApiConfigs.apis.partner.devis.UpdateUserInformationById}`, requestOptions)

  return handleResponse(response);

 }
 export async function FindDevisByPartner (id) {
  const requestOptions = {
    method:'GET',
    headers: authHeader()
  }

  const response = await fetch(`${ApiConfigs.base_url+ ApiConfigs.apis.partner.devis.FindDevisByPartner.replace('{id}',id)}`,requestOptions)

  return handleResponse(response)
}
export async function UpdateMission(userData,id){
  const requestOptions =  {
     method: "POST",
     headers: {
         ...authHeader(),
         'Content-Type': 'application/json'
     },
       body: JSON.stringify(userData)
     };
  const response = await fetch(`${ApiConfigs.base_url + ApiConfigs.apis.partner.mission.UpdateMission.replace('{id}', id)}`, requestOptions)

  return handleResponse(response);

 }

 export async function UpdateCategorie1(userData,id){
  const requestOptions =  {
     method: "POST",
     headers: {
         ...authHeader(),
         'Content-Type': 'application/json'
     },
       body: JSON.stringify(userData)
     };
  const response = await fetch(`${ApiConfigs.base_url + ApiConfigs.apis.admin.categorie.UpdateCategorie1.replace('{id}', id)}`, requestOptions)

  return handleResponse(response);

 }
 export async function FindAllCategories () {
  const requestOptions = {
    method:'GET',
    headers: authHeader()
  }

  const response = await fetch(`${ApiConfigs.base_url+ ApiConfigs.apis.admin.categorie.FindAllCategories}`,requestOptions)

  return handleResponse(response)
}

export async function AddDevis(userData){
  const requestOptions =  {
     method: "POST",
     headers: {
         ...authHeader(),
         'Content-Type': 'application/json'
     },
       body: JSON.stringify(userData)
     };
  const response = await fetch(`${ApiConfigs.base_url + ApiConfigs.apis.admin.devis.AddDevis}`, requestOptions)

  return handleResponse(response);

 }

 export async function rejectDevis(){
  const requestOptions =  {
     method: "POST",
     headers: {
         ...authHeader(),
         'Content-Type': 'application/json'
     },

     };
  const response = await fetch(`${ApiConfigs.base_url + ApiConfigs.apis.partner.devis.rejectDevis}`, requestOptions)

  return handleResponse(response);

 }
 export async function UpdateDevis(userData,id){
  const requestOptions =  {
     method: "POST",
     headers: {
         ...authHeader(),
         'Content-Type': 'application/json'
     },
       body: JSON.stringify(userData)
     };
  const response = await fetch(`${ApiConfigs.base_url + ApiConfigs.apis.partner.devis.UpdateDevis.replace('{id}', id)}`, requestOptions)

  return handleResponse(response);

 }
 export async function UpdatePartnerShip(userData,id){
  const requestOptions =  {
     method: "POST",
     headers: {
         ...authHeader(),
         'Content-Type': 'application/json'
     },
       body: JSON.stringify(userData)
     };
  const response = await fetch(`${ApiConfigs.base_url + ApiConfigs.apis.admin.UpdatePartnerShip.replace('{id}', id)}`, requestOptions)

  return handleResponse(response);

 }

 export async function FindCategorieById (id) {
  const requestOptions = {
    method:'GET',
    headers: authHeader()
  }

  const response = await fetch(`${ApiConfigs.base_url+ ApiConfigs.apis.admin.categorie.FindCategorieById.replace('{id}',id)}`,requestOptions)

  return handleResponse(response)
}
export async function FindFactureById (id) {
  const requestOptions = {
    method:'GET',
    headers: authHeader()
  }

  const response = await fetch(`${ApiConfigs.base_url+ ApiConfigs.apis.admin.facture.FindFactureById.replace('{id}',id)}`,requestOptions)

  return handleResponse(response)
}
export async function FindDevisByPartnerId (userData,id) {
  const requestOptions =  {
    method: "POST",
    headers: {
        ...authHeader(),
        'Content-Type': 'application/json'
    },
      body: JSON.stringify(userData)
    };

  const response = await fetch(`${ApiConfigs.base_url+ ApiConfigs.apis.admin.devis.FindDevisByPartnerId.replace('{id}',id)}`,requestOptions)

  return handleResponse(response)
}

export async function PayeFactureByPartnerHorLigne(id){
  const requestOptions =  {
     method: "POST",
     headers: {
         ...authHeader(),

     },

     };
  const response = await fetch(`${ApiConfigs.base_url + ApiConfigs.apis.partner.facture.PayeFactureByPartnerHorLigne.replace('{id}',id)}`, requestOptions)

  return handleResponse(response);

 }


export async function PayerEnLignePartner(data){
  const requestOptions =  {
     method: "POST",
     headers: {
         ...authHeader(),

     },
        body: JSON.stringify(data)

     };
  const response = await fetch(`${ApiConfigs.base_url + ApiConfigs.apis.admin.facture.PayerEnLignePartner }`, requestOptions)

  return handleResponse(response);

 }

export async function createFacture(userData){
  const requestOptions =  {
     method: "POST",
     headers: {
         ...authHeader(),
         'Content-Type': 'application/json'
     },
       body: JSON.stringify(userData)
     };
  const response = await fetch(`${ApiConfigs.base_url + ApiConfigs.apis.admin.facture.createFacture}`, requestOptions)

  return handleResponse(response);

 }
 export async function FindFacturesByPartner () {
  const requestOptions = {
    method:'GET',
    headers: authHeader()
  }

  const response = await fetch(`${ApiConfigs.base_url+ ApiConfigs.apis.partner.facture.FindFacturesByPartner}`,requestOptions)

  return handleResponse(response)
}



function handleResponse(response) {
    return response.text().then((text) => {
      const data = text && JSON.parse(text);
      if (!response.ok) {
        if (response.status === 401) {
          window.location.href = "/login";
          localStorage.removeItem("user")
        } else if (response.status === 403) {
          window.location.href = "/";
        }
        const error = (data && data.message) || response.statusText;
        return Promise.reject(error);
      }

      return data;
    });
  }