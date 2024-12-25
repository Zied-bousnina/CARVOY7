import { guestHeader, ApiConfigs, authHeader } from "../_helpers";

export const chatService =  {
    searchPartners,
    getMessages,
    sendMessage,
    getUnreadMessages


}
export async function searchPartners(query) {
  const requestOptions = {
    method: 'GET',
    headers: authHeader(),
  };

  const response = await fetch(`${ApiConfigs.base_url}chats/partners?query=${query}`, requestOptions);

  return handleResponse(response);
}


// Fetch messages for a specific chat
async function getMessages(chatId) {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
  };
  const response = await fetch(
    `${ApiConfigs.base_url}chats/${chatId}/messages`,
    requestOptions
  );
  if (!response.ok) {
    throw new Error("Failed to fetch messages");
  }
  return response.json();
}
// fetch unread messages
async function getUnreadMessages(chatId) {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
  };
  const response = await fetch(
    `${ApiConfigs.base_url}chats/getChatsWithUnreadCount`,
    requestOptions
  );
  if (!response.ok) {
    throw new Error("Failed to fetch messages");
  }
  return response.json();
}

// Send a message
async function sendMessage(chatId, message) {
  const requestOptions = {
    method: "POST",
    headers: {
      ...authHeader(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ content: message.content }),
  };

  const response = await fetch(
    `${ApiConfigs.base_url}chats/${chatId}/messages`,
    requestOptions
  );

  return handleResponse(response); // Use handleResponse for consistent error handling
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