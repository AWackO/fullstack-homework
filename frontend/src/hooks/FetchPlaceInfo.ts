import { useState, useEffect } from "react";
import axios from "axios";

interface OpeningHours {
  [day: string]: {
    start: string;
    end: string;
    type: string;
  }[];
}

export interface PlaceData {
  displayed_what: string;
  displayed_where: string;
  opening_hours: {
    days: OpeningHours;
    closed_on_holidays: boolean;
    open_by_arrangement: boolean;
  };
}

const usePlaceInfo = (placeID: string) => {
  const [placeData, setPlaceData] = useState<PlaceData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlaceData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/place/${placeID}`);
        const data: PlaceData = response.data;
        setPlaceData(data);
      } catch (error: any) {
        setError(`Failed to fetch data: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchPlaceData();
  }, [placeID]);

  return { placeData, loading, error };
};

export default usePlaceInfo;
