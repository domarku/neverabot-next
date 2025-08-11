// IP Geolocation service
export interface LocationData {
  city: string;
  country: string;
  region?: string;
  latitude?: number;
  longitude?: number;
}

// Get location from IP address using free API
export async function getLocationFromIP(): Promise<LocationData | null> {
  try {
    // Using ipapi.co (free tier: 1,000 requests/day)
    const response = await fetch('https://ipapi.co/json/');

    if (!response.ok) {
      throw new Error('IP geolocation request failed');
    }

    const data = await response.json();

    return {
      city: data.city || '',
      country: data.country_name || '',
      region: data.region || '',
      latitude: data.latitude,
      longitude: data.longitude,
    };
  } catch (error) {
    console.error('IP geolocation error:', error);
    return null;
  }
}

// Alternative: Using ip-api.com (free tier: 45 requests/minute)
export async function getLocationFromIPAlternative(): Promise<LocationData | null> {
  try {
    const response = await fetch('http://ip-api.com/json/');

    if (!response.ok) {
      throw new Error('IP geolocation request failed');
    }

    const data = await response.json();

    if (data.status === 'success') {
      return {
        city: data.city || '',
        country: data.country || '',
        region: data.regionName || '',
        latitude: data.lat,
        longitude: data.lon,
      };
    }

    return null;
  } catch (error) {
    console.error('IP geolocation error:', error);
    return null;
  }
}
