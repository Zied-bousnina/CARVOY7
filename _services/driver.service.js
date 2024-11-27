
import { guestHeader, ApiConfigs, authHeader } from "../_helpers";


export const DriverService =  {
    FetchAllDrivers,
    CreateDriver,
    UpdateDriver,
    activateDriverAccount,
    RefusAccount


}

export async function FetchAllDrivers () {
    const requestOptions = {
      method:'GET',
      headers: authHeader()
    }

    const response = await fetch(`${ApiConfigs.base_url+ ApiConfigs.apis.admin.driver.FetchAllDrivers}`,requestOptions)

    return handleResponse(response)
  }

  export async function CreateDriver(userData){
    const requestOptions =  {
       method: "POST",
       headers: {
           ...authHeader(),
           'Content-Type': 'multipart/form-data'
       },
         body: JSON.stringify(userData)
       };
    const response = await fetch(`${ApiConfigs.base_url + ApiConfigs.apis.admin.driver.CreateDriver}`, requestOptions)

    return handleResponse(response);

   }

  export async function UpdateDriver(userData,id){
    const requestOptions =  {
       method: "POST",
       headers: {
           ...authHeader(),
           'Content-Type': 'multipart/form-data'
       },
         body: JSON.stringify(userData)
       };
    const response = await fetch(`${ApiConfigs.base_url + ApiConfigs.apis.admin.driver.UpdateDriver.replace('{id}', id)}`, requestOptions)

    return handleResponse(response);

   }

   export async function activateDriverAccount(id){
    const requestOptions =  {
       method: "POST",
       headers: authHeader(),


       };
    const response = await fetch(`${ApiConfigs.base_url + ApiConfigs.apis.admin.driver.activateDriverAccount.replace('{id}', id)}`, requestOptions)

    return handleResponse(response);

   }
   export async function RefusAccount(id,userData){
    const requestOptions =  {
        method: "POST",
        headers: {
            ...authHeader(),
            'Content-Type': 'multipart/form-data'
        },
          body: JSON.stringify(userData)
        };
    const response = await fetch(`${ApiConfigs.base_url + ApiConfigs.apis.admin.driver.RefusAccount.replace('{id}', id)}`, requestOptions)

    return handleResponse(response);

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