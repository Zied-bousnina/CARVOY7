


import { guestHeader, ApiConfigs, authHeader } from "../_helpers";


export const NotificationService =  {
    RemoveNotification,
    ByIdRemoveNotification


}


export async function RemoveNotification(){
    const requestOptions =  {
       method: "POST",
       headers: {
           ...authHeader(),

       },

       };
    const response = await fetch(`${ApiConfigs.base_url + ApiConfigs.apis.notifications.RemoveNotification}`, requestOptions)

    return handleResponse(response);

   }

   export async function ByIdRemoveNotification(id){
    const requestOptions =  {
       method: "POST",
       headers: {
           ...authHeader(),

       },

       };
    const response = await fetch(`${ApiConfigs.base_url + ApiConfigs.apis.notifications.ByIdRemoveNotification.replace('{id}',id)}`, requestOptions)

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