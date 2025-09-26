export const GEO_MOCK_LONDON = {
  data: [
    {
      name: 'London',
      countryCode: 'GB',
      latitude: 51.507222,
      longitude: -0.1275
    }
  ]
};

export const CURRENT_WEATHER_LONDON = {
  data: [
    { parameter: 't_2m:C', coordinates: [{ dates: [{ value: 13 }] }] },
    {
      parameter: 'wind_speed_10m:kmh',
      coordinates: [{ dates: [{ value: 11.5 }] }]
    },
    {
      parameter: 'msl_pressure:hPa',
      coordinates: [{ dates: [{ value: 1026 }] }]
    },
    { parameter: 'uv:idx', coordinates: [{ dates: [{ value: 1 }] }] },
    {
      parameter: 'weather_symbol_1h:idx',
      coordinates: [{ dates: [{ value: 1 }] }]
    }
  ]
};

export const FORECAST_WEATHER_LONDON = {
  data: [
    {
      parameter: 't_max_2m_24h:C',
      coordinates: [
        {
          dates: [
            { value: 18 },
            { value: 17 },
            { value: 17 },
            { value: 18 },
            { value: 18 }
          ]
        }
      ]
    },
    {
      parameter: 't_min_2m_24h:C',
      coordinates: [
        {
          dates: [
            { value: 10 },
            { value: 9 },
            { value: 12 },
            { value: 8 },
            { value: 9 }
          ]
        }
      ]
    },
    {
      parameter: 'weather_symbol_24h:idx',
      coordinates: [
        {
          dates: [
            { value: 1 },
            { value: 3 },
            { value: 8 },
            { value: 2 },
            { value: 4 }
          ]
        }
      ]
    }
  ]
};
