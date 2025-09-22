import { useEffect, useState } from "react";

const useGeolocation = () => {
  const [location, setLocation] = useState("unknown");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLocation = async () => {
      setIsLoading(true);
      try {
        const apiKey = process.env.NEXT_PUBLIC_GOOGLE_GEOLOCATION_KEY;
        if (!apiKey) {
          throw new Error("Google Geolocation API key is not configured");
        }

        const geolocationResponse = await fetch(
          `https://www.googleapis.com/geolocation/v1/geolocate?key=${apiKey}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!geolocationResponse.ok) {
          throw new Error("Invalid response from geolocation API");
        }

        const geolocationData = await geolocationResponse.json();

        if (!geolocationData.location) {
          throw new Error("Invalid response from geolocation API");
        }

        const { lat, lng } = geolocationData.location;

        const geocodingResponse = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`
        );

        if (!geocodingResponse.ok) {
          throw new Error("Invalid response from geocoding API");
        }

        const geocodingData = await geocodingResponse.json();

        if (!geocodingData.results) {
          throw new Error("Invalid response from geocoding API");
        }

        const countryResult = geocodingData.results.find((result) =>
          result.types.includes("country")
        );

        if (!countryResult?.formatted_address) {
          throw new Error("Country not found in geocoding response");
        }

        const country = countryResult.formatted_address.toLowerCase();
        setLocation(country);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLocation();
  }, []);

  console.log({ location });
  return { location, error, isLoading };
};

export default useGeolocation;
