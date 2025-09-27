import type { Handler } from '@netlify/functions';
import axios from 'axios';
import { METEOMATICS_URL } from './config.js';

const handler: Handler = async (event) => {
  const lat = event.queryStringParameters?.lat;
  const lon = event.queryStringParameters?.lon;

  if (!lat || !lon) {
    return { statusCode: 400, body: 'Missing lat or lon' };
  }

  try {
    const user = process.env.METEOMATICS_USER;
    const pass = process.env.METEOMATICS_PASS;

    const currentUrl = `${METEOMATICS_URL}/now/t_2m:C,wind_speed_10m:kmh,msl_pressure:hPa,uv:idx,weather_symbol_1h:idx/${lat},${lon}/json`;
    const forecastUrl = `${METEOMATICS_URL}/today+1DT12:00:00Z--today+5DT12:00:00Z:P1D/t_max_2m_24h:C,t_min_2m_24h:C,weather_symbol_24h:idx/${lat},${lon}/json`;

    const [currentRes, forecastRes] = await Promise.all([
      axios.get(currentUrl, { auth: { username: user!, password: pass! } }),
      axios.get(forecastUrl, { auth: { username: user!, password: pass! } })
    ]);

    return {
      statusCode: 200,
      body: JSON.stringify({
        data: currentRes.data,
        forecastData: forecastRes.data
      })
    };
  } catch (err: unknown) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: err instanceof Error ? err.message : String(err)
      })
    };
  }
};

export { handler };
