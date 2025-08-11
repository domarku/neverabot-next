// Mapbox API types
interface MapboxContext {
  id: string;
  text: string;
}

export interface MapboxFeature {
  place_name: string;
  context?: MapboxContext[];
}

interface MapboxResponse {
  features: MapboxFeature[];
}

// Mapbox configuration
export const MAPBOX_ACCESS_TOKEN =
  process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || '';

// Geocoding function
export async function geocodeLocation(query: string): Promise<MapboxFeature[]> {
  if (!MAPBOX_ACCESS_TOKEN) {
    console.warn('Mapbox access token not found');
    return [];
  }

  try {
    const response = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
        query
      )}.json?access_token=${MAPBOX_ACCESS_TOKEN}&types=place,country&limit=5`
    );

    if (!response.ok) {
      throw new Error('Geocoding request failed');
    }

    const data: MapboxResponse = await response.json();
    return data.features || [];
  } catch (error) {
    console.error('Geocoding error:', error);
    return [];
  }
}

// Extract city and country from geocoding result
export function extractLocationData(feature: MapboxFeature): {
  city: string;
  country: string;
} {
  const context = feature.context || [];
  const placeName = feature.place_name || '';

  // Extract city and country from place_name or context
  let city = '';
  let country = '';

  // Try to extract from context first
  const placeContext = context.find((ctx: MapboxContext) =>
    ctx.id.startsWith('place.')
  );
  const countryContext = context.find((ctx: MapboxContext) =>
    ctx.id.startsWith('country.')
  );

  if (placeContext) {
    city = placeContext.text;
  }

  if (countryContext) {
    country = countryContext.text;
  }

  // Fallback: try to parse from place_name
  if (!city || !country) {
    const parts = placeName.split(', ');
    if (parts.length >= 2) {
      city = parts[0];
      country = parts[parts.length - 1];
    }
  }

  return { city, country };
}
