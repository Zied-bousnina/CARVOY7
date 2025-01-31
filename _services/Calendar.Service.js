import { authHeader, ApiConfigs } from "../_helpers";

export const CalendarService = {
  getAllEvents,
  createEvent,
  updateEvent,
  deleteEvent,
};

async function getAllEvents() {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
  };

  const response = await fetch(
    `${ApiConfigs.base_url + ApiConfigs.apis.calendar.getAllEvents}`,
    requestOptions
  );

  return handleResponse(response);
}

async function createEvent(eventData) {
  const requestOptions = {
    method: "POST",
    headers: {
      ...authHeader(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(eventData),
  };

  const response = await fetch(
    `${ApiConfigs.base_url + ApiConfigs.apis.calendar.createEvent}`,
    requestOptions
  );

  return handleResponse(response);
}

async function updateEvent(eventId, updates) {

  const requestOptions = {
    method: "PUT",
    headers: {
      ...authHeader(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updates),
  };

  const response = await fetch(
    `${ApiConfigs.base_url + ApiConfigs.apis.calendar.updateEvent}/${eventId}`,
    requestOptions
  );

  return handleResponse(response);
}

async function deleteEvent(eventId) {
  const requestOptions = {
    method: "DELETE",
    headers: authHeader(),
  };

  const response = await fetch(
    `${ApiConfigs.base_url + ApiConfigs.apis.calendar.deleteEvent}/${eventId}`,
    requestOptions
  );

  return handleResponse(response);
}

function handleResponse(response) {
  return response.text().then((text) => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        window.location.href = "/login";
        localStorage.removeItem("user");
      }
      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }
    return data;
  });
}
