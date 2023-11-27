package structs

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