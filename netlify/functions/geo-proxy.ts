import type { Handler } from '@netlify/functions';
import axios from 'axios';
import type { GeoApiCity } from '../../src/types/interfaces.js';
import { GEO_API_URL, GEO_API_KEY } from './config.js';

const handler: Handler = async (event) => {
  const query = event.queryStringParameters?.q;
  if (!query) return { statusCode: 400, body: 'Missing query' };

  try {
    const url = `${GEO_API_URL}/cities?minPopulation=10000&namePrefix=${encodeURIComponent(query)}`;

    const res = await axios.get(url, {
      headers: {
        'X-RapidAPI-Key': GEO_API_KEY!,
        'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
      }
    });

    const cities = res.data.data.map((city: GeoApiCity) => ({
      lat: city.latitude,
      lon: city.longitude,
      name: `${city.name}, ${city.countryCode}`
    }));

    return { statusCode: 200, body: JSON.stringify(cities) };
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
