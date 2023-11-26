import React, { ChangeEvent } from "react";

interface PlaceDropdownProps {
  placeIDs: string[];
  onSelect: (selectedPlace: string) => void;
}

const PlaceDropdown: React.FC<PlaceDropdownProps> = ({ placeIDs, onSelect }) => {
  return (
    <div className="dropdown-container">
      <label htmlFor="placeDropdown" className="dropdown-label">
        Select place by id:
      </label>
      <select
        id="placeDropdown"
        className="dropdown-select"
        onChange={(e: ChangeEvent<HTMLSelectElement>) => onSelect(e.target.value)}
      >
        <option value="" className="dropdown-option">
          Select a place
        </option>
        {placeIDs.map((placeID) => (
          <option key={placeID} value={placeID} className="dropdown-option">
            {placeID}
          </option>
        ))}
      </select>
    </div>
  );
};

export default PlaceDropdown;
