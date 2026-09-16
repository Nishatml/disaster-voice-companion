export async function fetchDisasterForecast() {
  try {
    // Dynamic origin for GitHub Codespaces & local environment
    const baseUrl = typeof window !== 'undefined' 
      ? window.location.origin.replace('-3000', '-8000') 
      : 'http://localhost:8000';

    const response = await fetch(`${baseUrl}/api/v1/forecast`);
    if (!response.ok) {
      throw new Error('Failed to fetch forecast');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API Error:', error);
    // Fallback Mock Data for UI presentation
    return {
      risk_level: 'Low Risk',
      summary: 'Normal weather conditions expected.',
      weather: {
        max_wind_speed: 11.9,
        precipitation: 4.3
      }
    };
  }
}