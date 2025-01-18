import { authHeader, ApiConfigs } from "../_helpers";

export const SocialService = {
  GetSocialConfig,
  SaveSocialConfig,
};

// Fetch Social configuration
export async function GetSocialConfig() {
  const requestOptions = {
    method: "POST",
    headers: authHeader(),
  };
console.log("++++++++++++++++++++++++++++++",ApiConfigs.base_url+ ApiConfigs.apis.SocialLoginConfig.getConfig)
  const response = await fetch(
    `${ApiConfigs.base_url+ ApiConfigs.apis.SocialLoginConfig.getConfig}`,
    requestOptions
  );

  return handleResponse(response);
}

// Save or update Social configuration
export async function SaveSocialConfig(config) {
  const requestOptions = {
    method: "POST",
    headers: {
      ...authHeader(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(config),
  };

  const response = await fetch(
    `${ApiConfigs.base_url + ApiConfigs.apis.SocialLoginConfig.saveConfig}`,
    requestOptions
  );

  return handleResponse(response);
}

// Handle API responses
function handleResponse(response) {
  return response.text().then((text) => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        window.location.href = "/login"; // Redirect to login on unauthorized
        localStorage.removeItem("user");
      } else if (response.status === 403) {
        window.location.href = "/"; // Redirect on forbidden
      }
      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}
