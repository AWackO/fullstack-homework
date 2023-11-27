import React, { ReactNode, useEffect, useState } from "react";
import usePlaceInfo, { PlaceData } from "../hooks/FetchPlaceInfo";

interface PlaceDataProviderProps {
  placeID: string;
  children: (placeData: PlaceData) => ReactNode;
}

const PlaceDataProvider: React.FC<PlaceDataProviderProps> = ({ placeID, children }) => {
  const { placeData, loading, error } = usePlaceInfo(placeID);
  const [initialLoad, setInitialLoad] = useState<boolean>(true);

  useEffect(() => {
    if (placeID) {
      setInitialLoad(false);
    }
  }, [placeID]);
  return (
    <>
      {(initialLoad || loading) && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      <section className="card-grid">{placeData && children(placeData)}</section>
    </>
  );
};

export default PlaceDataProvider;
