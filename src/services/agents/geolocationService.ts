/**
 * Geolocation Service — Step 3 of the Agentic Pipeline
 * 
 * Uses Google Maps Places API to dynamically find the nearest hospital and its phone number.
 */

export interface HospitalInfo {
  name: string;
  address: string;
  distance: string;
  eta: string;
  phone: string;
}

export async function findNearestHospital(
  lat: number,
  lng: number,
  specialty?: string
): Promise<HospitalInfo> {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  
  // Strict requirement: No mocks allowed
  if (!apiKey || apiKey === 'YOUR_GOOGLE_MAPS_KEY') {
    throw new Error('GOOGLE_MAPS_API_KEY is not configured. Clinical Engine Unavailable - Real-time geolocation failed.');
  }

  // 1. Find nearest hospital
  const keyword = encodeURIComponent(specialty || 'hospital');
  const searchUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=15000&type=hospital&keyword=${keyword}&key=${apiKey}`;
  const searchRes = await fetch(searchUrl);
  const searchData = await searchRes.json();

  if (!searchData.results || searchData.results.length === 0) {
    throw new Error(`No hospitals found matching criteria "${specialty}" in the vicinity.`);
  }

  const placeId = searchData.results[0].place_id;
  const destLat = searchData.results[0].geometry.location.lat;
  const destLng = searchData.results[0].geometry.location.lng;

  // 2. Get details (specifically the phone number for dynamic dispatch)
  const detailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,formatted_address,formatted_phone_number&key=${apiKey}`;
  const detailsRes = await fetch(detailsUrl);
  const detailsData = await detailsRes.json();

  if (!detailsData.result) {
    throw new Error('Failed to retrieve hospital details from Google Places.');
  }

  const hospitalName = detailsData.result.name;
  const address = detailsData.result.formatted_address;
  const phone = detailsData.result.formatted_phone_number;

  // We MUST have a phone number for the autonomous dispatcher
  if (!phone) {
    throw new Error(`Nearest hospital (${hospitalName}) does not have a registered phone number. Autonomous dispatch failed.`);
  }

  // 3. Get exact Distance and ETA using Distance Matrix API
  const matrixUrl = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${lat},${lng}&destinations=${destLat},${destLng}&key=${apiKey}`;
  const matrixRes = await fetch(matrixUrl);
  const matrixData = await matrixRes.json();

  let distance = 'Unknown';
  let eta = 'Unknown';
  
  if (matrixData.rows && matrixData.rows[0].elements && matrixData.rows[0].elements[0].status === 'OK') {
    distance = matrixData.rows[0].elements[0].distance.text;
    eta = matrixData.rows[0].elements[0].duration.text;
  }

  return {
    name: hospitalName,
    address,
    phone,
    distance,
    eta,
  };
}
