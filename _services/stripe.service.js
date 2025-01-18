import { authHeader, ApiConfigs } from "../_helpers";

export const StripeService = {
  GetStripeConfig,
  SaveStripeConfig,
};

// Fetch Stripe configuration
export async function GetStripeConfig() {
  const requestOptions = {
    method: "POST",
    headers: authHeader(),
  };
console.log("++++++++++++++++++++++++++++++",ApiConfigs.base_url+ ApiConfigs.apis.PaymentGateway.getConfig)
  const response = await fetch(
    `${ApiConfigs.base_url+ ApiConfigs.apis.PaymentGateway.getConfig}`,
    requestOptions
  );

  return handleResponse(response);
}

// Save or update Stripe configuration
export async function SaveStripeConfig(config) {
  const requestOptions = {
    method: "POST",
    headers: {
      ...authHeader(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(config),
  };

  const response = await fetch(
    `${ApiConfigs.base_url + ApiConfigs.apis.PaymentGateway.saveConfig}`,
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
