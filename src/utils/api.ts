export const GEO_API_URL = import.meta.env.VITE_GEO_API_URL;

export const geoApiOptions = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': import.meta.env.VITE_GEO_API_KEY,
    'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
  }
};

export const METEOMATICS_URL = import.meta.env.VITE_METEOMATICS_URL;

export const meteomaticsAuth = {
  username: import.meta.env.VITE_METEOMATICS_USER,
  password: import.meta.env.VITE_METEOMATICS_PASS
};
