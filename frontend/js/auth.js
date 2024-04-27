export function createCookie(name, value, days) {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = "expires=" + date.toUTCString();
  document.cookie = name + "=" + value + ";" + expires + ";path=/";
}
export function getCookie(name) {
  const nameEq = `${name}=`;
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(";");

  for (let i = 0; i < ca.length; i++) {
    let c = ca[i].trim();
    if (c.indexOf(nameEq) == 0) return c.substring(nameEq.length, c.length);
  }

  return "";
}

export function deleteCookie(name) {
  const expires = "expires=Thu, 01 Jan 1970 00:00:00 GMT";
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  const httpOnly = "; HttpOnly";
  document.cookie = `${name}=; ${expires}; path=/;${secure}${httpOnly}`;
}
