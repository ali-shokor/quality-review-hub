const BASE_URL = "";

async function apiFetch(url, options = {}) {

  const token = localStorage.getItem("access_token");

  const headers = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(BASE_URL + url, {
    ...options,
    headers: {
      ...headers,
      ...options.headers,
    },
  });

  return res;
}