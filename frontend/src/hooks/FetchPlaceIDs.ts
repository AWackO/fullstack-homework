import { useState, useEffect } from "react";
import axios from "axios";

const PLACE_IDS_URL = `http://localhost:8080/place-ids`;

const usePlaceIDs = () => {
  const [placeIDs, setPlaceIDs] = useState<string[] | []>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPlaceData = async () => {
    try {
      const response = await axios.get(PLACE_IDS_URL);
      const data: string[] = response.data;
      setPlaceIDs(data);
    } catch (error: any) {
      setError(`Failed to fetch data: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlaceData();
  }, []);

  return { placeIDs, loading, error };
};

export default usePlaceIDs;
