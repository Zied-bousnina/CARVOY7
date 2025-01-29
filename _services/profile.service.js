


import { guestHeader, ApiConfigs, authHeader } from "../_helpers";


export const ProfileService =  {
    AddProfile,
    EditProfile_Web,
    EditProfile_WebPartner,
    GetProfile
}

export async function AddProfile(userData){
    const requestOptions =  {
       method: "POST",
       headers: {
           ...authHeader(),
           'Accept': 'application/json',
           'Content-Type': 'multipart/form-data'
       },
         body: JSON.stringify(userData)
       };
    const response = await fetch(`${ApiConfigs.base_url + ApiConfigs.apis.profile.AddProfile}`, requestOptions)

    return handleResponse(response);

   }
export async function EditProfile_Web(userData){
    const requestOptions =  {
       method: "POST",
       headers: {
           ...authHeader(),
          //  'Accept': 'application/json',
          //  'Content-Type': 'multipart/form-data'
       },
         body: userData
       };
    const response = await fetch(`${ApiConfigs.base_url + ApiConfigs.apis.profile.EditProfile_Web}`, requestOptions)

    return handleResponse(response);

   }
export async function EditProfile_WebPartner(userData){
    const requestOptions =  {
       method: "POST",
       headers: {
           ...authHeader(),
           'Accept': 'application/json',
          //  'Content-Type': 'multipart/form-data'
       },
         body: userData
       };
    const response = await fetch(`${ApiConfigs.base_url + ApiConfigs.apis.profile.EditProfile_WebPartner}`, requestOptions)

    return handleResponse(response);

   }
export async function GetProfile () {
    const requestOptions = {
      method:'GET',
      headers: authHeader()
    }

    const response = await fetch(`${ApiConfigs.base_url+ ApiConfigs.apis.profile.GetProfile}`,requestOptions)


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