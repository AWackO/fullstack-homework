package handlers

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strings"

	"github.com/AWackO/home-assignment/backend/utils"
	"github.com/go-chi/chi"
)

type TimePeriod struct {
	Start string `json:"start"`
	End   string `json:"end"`
	Type  string `json:"type"`
}

type OpeningHours struct {
	Days              map[string][]TimePeriod `json:"days"`
	ClosedOnHolidays bool                    `json:"closed_on_holidays"`
	OpenByArrangement bool                    `json:"open_by_arrangement"`
}

type PlaceResponse struct {
	DisplayedWhat  string       `json:"displayed_what"`
	DisplayedWhere string       `json:"displayed_where"`
	OpeningHours   OpeningHours `json:"opening_hours"`
}

var placeIDs = []string{"GXvPAor1ifNfpF0U5PTG0w", "ohGSnJtMIC5nPfYRi_HTAg"} 

func GetPlaceInfo(w http.ResponseWriter, r *http.Request) {
	// Retrieve placeId from the URL path parameter
	placeID := chi.URLParam(r, "placeId")
	placeID = strings.TrimSpace(placeID)

	upstreamURL := fmt.Sprintf("https://storage.googleapis.com/coding-session-rest-api/%v", placeID)

	// Fetch data from the upstream API using FetchJSON
	var placeData PlaceResponse
	err := utils.FetchPlace(upstreamURL, &placeData)
	if err != nil {
		http.Error(w, fmt.Sprintf("Failed to fetch data from upstream API: %v", err), http.StatusInternalServerError)
		return
	}



	// Respond with the extracted data
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]interface{}{
		"displayed_what":  placeData.DisplayedWhat,
		"displayed_where": placeData.DisplayedWhere,
		"opening_hours":   placeData.OpeningHours,
	})
	
}

// Respond with a list of available place ids
func GetPlaceIDs(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(placeIDs)
}