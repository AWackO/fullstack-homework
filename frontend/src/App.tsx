import React from "react";
import "./App.css";
import PlaceDropdown from "./components/Dropdown";
import PlaceCard from "./components/PlaceCard";
import PlaceDataProvider from "./components/PlaceDataProvider";
import usePlaceIDs from "./hooks/FetchPlaceIDs";

const App = () => {
  const { placeIDs, loading, error } = usePlaceIDs();
  const [selectedPlaceID, setSelectedPlaceID] = React.useState("");
  const handlePlaceSelect = (placeID: string) => {
    setSelectedPlaceID(placeID);
  };

  if (error) {
    return <h2>Error no places found</h2>;
  }

  return (
    <div className="App">
      <h1>Place Information</h1>
      {!loading ? <PlaceDropdown placeIDs={placeIDs} onSelect={handlePlaceSelect} /> : <p>Loading....</p>}
      {selectedPlaceID && (
        <PlaceDataProvider placeID={selectedPlaceID}>{(placeData) => <PlaceCard {...placeData} />}</PlaceDataProvider>
      )}
    </div>
  );
};

export default App;
