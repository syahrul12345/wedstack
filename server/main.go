package main

import (
	"fmt"
	"net/http"
	"os"
	"path/filepath"
	"server/controller"

	"github.com/gorilla/mux"
	"github.com/rs/cors"
)

func main() {
	router := mux.NewRouter()
	// router.Use(auth.JwtAuthentication)
	router.HandleFunc("/api/login", controller.Login).Methods("POST")
	router.HandleFunc("/api/newAccount", controller.CreateAccount).Methods("POST")
	router.HandleFunc("/api/changePassword", controller.ChangePassword).Methods("POST")
	router.PathPrefix("/").Handler(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		const staticPath = "../website/build"
		const indexPath = "index.html"
		fileServer := http.FileServer(http.Dir(staticPath))
		path, err := filepath.Abs(r.URL.Path)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}
		path = filepath.Join(staticPath, path)
		_, err = os.Stat(path)
		if os.IsNotExist(err) {
			// file does not exist, serve index.html
			http.ServeFile(w, r, filepath.Join(staticPath, indexPath))
			return
		} else if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		fileServer.ServeHTTP(w, r)
	}))
	port := "9290"
	fmt.Println("Serving static website at http://localhost:" + port)
	//lets set the cors policy for testing
	c := cors.New(cors.Options{
		AllowedOrigins:   []string{"http://localhost:8080"},
		AllowCredentials: true,
	})
	handler := c.Handler(router)
	err := http.ListenAndServe(":"+port, handler) //Launch the app, visit localhost:5555/api
	if err != nil {
		fmt.Print(err)
	}
}
