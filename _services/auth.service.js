import { guestHeader, ApiConfigs, authHeader } from "../_helpers";

export const AuthService = {

  login,
  Register,
  getUserByEmail,
  CreatePartner,
  forgotPassword,
  updatePassword,
  CompletePartnerProfile,
  refreshAuthToken

};

async function login(userData) {
  const requestOptions = {
    method: "POST",
    headers: { ...guestHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  };

  return await fetch(
    `${ApiConfigs.base_url + ApiConfigs.apis.auth.login}`,
    requestOptions
  ).then(handleResponse);
}
export async function getUserByEmail (email) {
  const requestOptions = {
    method:'GET',
    headers: authHeader()
  }

  const response = await fetch(`${ApiConfigs.base_url+ ApiConfigs.apis.auth.getUserByEmail.replace('{email}', email)}`,requestOptions)

  return handleResponse(response)
}
export async function CreatePartner(userData){
  const requestOptions =  {
     method: "POST",
     headers: {
         ...authHeader(),
        //  'Content-Type': 'multipart/form-data'
     },
       body: userData
     };
  const response = await fetch(`${ApiConfigs.base_url + ApiConfigs.apis.admin.addPartner}`, requestOptions)

  return handleResponse(response);

 }
 export async function Register(userData){
  const requestOptions =  {
     method: "POST",
     headers: {
         ...guestHeader(),
        //  'Content-Type': 'multipart/form-data'
     },
       body: userData
     };

  const response = await fetch(`${ApiConfigs.base_url + ApiConfigs.apis.auth.Register}`, requestOptions)

  return handleResponse(response);

 }
 export async function refreshAuthToken(){
  const requestOptions =  {
     method: "GET",
     headers: {
         ...authHeader(),
        //  'Content-Type': 'multipart/form-data'
     },

     };

  const response = await fetch(`${ApiConfigs.base_url + ApiConfigs.apis.auth.refreshAuthToken}`,requestOptions)

  return handleResponse(response);

 }
 export async function CompletePartnerProfile(userData){
  const requestOptions =  {
     method: "POST",
     headers: {
         ...authHeader(),
        //  'Content-Type': 'multipart/form-data'
     },
       body: userData
     };

  const response = await fetch(`${ApiConfigs.base_url + ApiConfigs.apis.auth.CompletePartnerProfile}`, requestOptions)
console.log(response)
  return handleResponse(response);

 }
 export async function forgotPassword(email){
  const requestOptions =  {
     method: "POST",
     headers: {
         ...guestHeader(),
         'Content-Type': 'application/json'
     },
       body: JSON.stringify(email)
     };
  const response = await fetch(`${ApiConfigs.base_url + ApiConfigs.apis.auth.forgotPassword}`, requestOptions)

  return handleResponse(response);

 }

 export async function updatePassword(userData){
  const requestOptions =  {
     method: "POST",
     headers: {
         ...authHeader(),
         'Content-Type': 'application/json'
     },
       body: JSON.stringify(userData)
     };
  const response = await fetch(`${ApiConfigs.base_url + ApiConfigs.apis.auth.updatePassword}`, requestOptions)

  return handleResponse(response);

 }



function handleResponse(response) {
  console.log("response",response)
  if (response.status === 401) {
    window.location.href = "/";
    localStorage.removeItem("user")}
  return response.text().then((text) => {
    const data = text && JSON.parse(text);
    console.log("data",response)
    if (!response.ok) {
      if (response.status === 401) {
        window.location.href = "/";
        localStorage.removeItem("user")
      } else if (response.status === 403) {
        window.location.href = "/";
      }
      const error = (data ) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}
