package utils

import (
	"encoding/json"
	"fmt"
	"net/http"
)

func FetchPlace(url string, target interface{}) error {
	resp, err := http.Get(url)
	if err != nil {
		return err
	}
	
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return fmt.Errorf("HTTP request failed with status code: %d", resp.StatusCode)
	}

	decoder := json.NewDecoder(resp.Body)
	err = decoder.Decode(target)
	if err != nil {
    	return err
	}

	return nil
}
