import { useState, useEffect } from "react";
import axios from "axios";

const usePlaceIDs = () => {
  const [placeIDs, setPlaceIDs] = useState<string[] | []>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlaceData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/place-ids`);
        const data: string[] = response.data;
        setPlaceIDs(data);
      } catch (error: any) {
        setError(`Failed to fetch data: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchPlaceData();
  }, []);

  return { placeIDs, loading, error };
};

export default usePlaceIDs;
