const BASE_URL = process.env.REACT_APP_BASE_URL;
const API_KEY = process.env.REACT_APP_API_KEY;

export function apiRequest({path, method = 'GET'}) {
  const url = BASE_URL + `?apikey=${API_KEY}` + path;

  return fetch(url, {method}).then(response => response.json())
}
