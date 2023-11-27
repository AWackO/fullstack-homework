// main.go
package main

import (
	"net/http"

	"github.com/AWackO/home-assignment/backend/handlers"
	"github.com/go-chi/chi"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/rs/cors"
)


func main() {
	r := chi.NewRouter()

	// Middleware
	r.Use(middleware.Logger)
	r.Use(middleware.Recoverer)

	c := cors.New(cors.Options{
        AllowedOrigins:   []string{"http://localhost:3000"}, 
        AllowCredentials: true,
        Debug:            true,
    })

	r.Use(c.Handler)

	// Routes for FE to hit
	r.Get("/place/{placeId}", handlers.GetPlaceInfo)
	r.Get("/place-ids", handlers.GetPlaceIDs)
	// Start the server
	http.ListenAndServe(":8080", r)
}