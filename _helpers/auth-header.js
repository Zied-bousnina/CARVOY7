function parseJwt(token) {
  if (!token) { return; }
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace('-', '+').replace('_', '/');
  return JSON.parse(window.atob(base64));
}
export function authHeader() {
let userJSON = localStorage.getItem("jwtToken");
let user = parseJwt(userJSON);
let language = localStorage.getItem("Language");

if (user && userJSON) {
  return {
    "Authorization": userJSON,
    "X-Requested-With": "XMLHttpRequest",
    "Content-Language": language || "en",
  };
}
return {
  "X-Requested-With": "XMLHttpRequest",
  "Content-Language": language || "en",
};
}

export function guestHeader() {
let language = localStorage.getItem("Language");
return {
  "X-Requested-With": "XMLHttpRequest",
  "Content-Language": language || "en",

};
}
