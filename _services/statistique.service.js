import { guestHeader, ApiConfigs, authHeader } from "../_helpers";


export const StatistiqueService =  {
  getUsersCounts,
  getPartnerCounts,
  getMissionByPartnerCounts,
  getDemandesCount



}


export async function getUsersCounts () {
  const requestOptions = {
    method:'GET',
    headers: authHeader()
  }

  const response = await fetch(`${ApiConfigs.base_url+ ApiConfigs.apis.admin.getUsersCounts}`,requestOptions)

  return handleResponse(response)
}

export async function getPartnerCounts () {
  const requestOptions = {
    method:'GET',
    headers: authHeader()
  }

  const response = await fetch(`${ApiConfigs.base_url+ ApiConfigs.apis.admin.getPartnerCounts}`,requestOptions)

  return handleResponse(response)
}

export async function getMissionByPartnerCounts () {
  const requestOptions = {
    method:'GET',
    headers: authHeader()
  }

  const response = await fetch(`${ApiConfigs.base_url+ ApiConfigs.apis.partner.getMissionByPartnerCounts}`,requestOptions)

  return handleResponse(response)
}

export async function getDemandesCount () {
  const requestOptions = {
    method:'GET',
    headers: authHeader()
  }

  const response = await fetch(`${ApiConfigs.base_url+ ApiConfigs.apis.partner.mission.getMissionsCount}`,requestOptions)

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