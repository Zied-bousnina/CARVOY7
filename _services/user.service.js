
import { guestHeader, ApiConfigs, authHeader } from "../_helpers";


export const UserService =  {
    GetCurrentUser,
    GetAllUsers,
    GetAllUserDetails,
    BlockUser,
    UnBlockUser,
    DeleteUserByAdmin,
    GetBusinessDetails,    //  Fetch Business Details
    SaveBusinessDetails,   //  Create or Update Business Details
    DeleteBusinessDetails  //  Delete Business Details

}
// 🔹 Fetch Business Details
export async function GetBusinessDetails() {
  const requestOptions = {
      method: 'GET',
      headers: authHeader()
  };

  const response = await fetch(`${ApiConfigs.base_url + ApiConfigs.apis.admin.BusinessDetails.getBusiness}`, requestOptions);
  return handleResponse(response);
}

// 🔹 Create or Update Business Details
export async function SaveBusinessDetails(businessDetails) {
  console.log("heyyyyyy", businessDetails)
  const requestOptions = {
      method: 'POST',
      headers: {
          ...authHeader(),
          'Content-Type': 'application/json'

      },
      body: JSON.stringify(businessDetails)
  };

  const response = await fetch(`${ApiConfigs.base_url + ApiConfigs.apis.admin.BusinessDetails.saveBusiness}`, requestOptions);
  return handleResponse(response);
}

// 🔹 Delete Business Details
export async function DeleteBusinessDetails() {
  const requestOptions = {
      method: 'DELETE',
      headers: authHeader()
  };

  const response = await fetch(`${ApiConfigs.base_url + ApiConfigs.apis.admin.BusinessDetails.deleteBusiness}`, requestOptions);
  return handleResponse(response);
}


export async function GetCurrentUser () {
    const requestOptions = {
      method:'GET',
      headers: authHeader()
    }

    const response = await fetch(`${ApiConfigs.base_url+ ApiConfigs.apis.auth.GetCurrentUser}`,requestOptions)

    return handleResponse(response)
  }

  export async function GetAllUsers () {
    const requestOptions = {
      method:'GET',
      headers: authHeader()
    }

    const response = await fetch(`${ApiConfigs.base_url+ ApiConfigs.apis.auth.GetAllUsers}`,requestOptions)

    return handleResponse(response)
  }
  export async function GetAllUserDetails (id) {
    const requestOptions = {
      method:'GET',
      headers: authHeader()
    }

    const response = await fetch(`${ApiConfigs.base_url+ ApiConfigs.apis.auth.GetAllUserDetails.replace('{id}',id)}`,requestOptions)

    return handleResponse(response)
  }

  export async function BlockUser(id){
    const requestOptions =  {
       method: "PUT",
       headers: {
           ...authHeader(),

       },

       };
    const response = await fetch(`${ApiConfigs.base_url + ApiConfigs.apis.auth.BlockUser.replace('{id}',id)}`, requestOptions)

    return handleResponse(response);

   }
   export async function UnBlockUser(id){
    const requestOptions =  {
       method: "PUT",
       headers: {
           ...authHeader(),

       },

       };
    const response = await fetch(`${ApiConfigs.base_url + ApiConfigs.apis.auth.UnBlockUser.replace('{id}',id)}`, requestOptions)

    return handleResponse(response);

   }

   export async function DeleteUserByAdmin(id){
    const requestOptions =  {
       method: "DELETE",
       headers: {
           ...authHeader(),

       },

       };
    const response = await fetch(`${ApiConfigs.base_url + ApiConfigs.apis.auth.DeleteUserByAdmin.replace('{id}',id)}`, requestOptions)

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