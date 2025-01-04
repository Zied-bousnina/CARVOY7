import { guestHeader, ApiConfigs, authHeader } from "../_helpers";

export const AuthService = {

  login,
  Register,
  getUserByEmail,
  CreatePartner,
  forgotPassword,
  updatePassword

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
         'Content-Type': 'multipart/form-data'
     },
       body: JSON.stringify(userData)
     };
  const response = await fetch(`${ApiConfigs.base_url + ApiConfigs.apis.auth.updatePassword}`, requestOptions)

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
      const error = (data ) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}
