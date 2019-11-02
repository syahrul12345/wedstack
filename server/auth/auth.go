package auth

import (
	"context"
	"fmt"
	"net/http"
	"os"
	"server/models"
	"server/utils"
	"strings"

	"github.com/dgrijalva/jwt-go"
)

//JwtAuthentication authenticates the received JWT token
var JwtAuthentication = func(next http.Handler) http.Handler {
	return http.HandlerFunc(func(writer http.ResponseWriter, request *http.Request) {
		requestPath := request.URL.Path
		//auth is the list of paths that does not require authentication
		auth := []string{"/", "/login", "/createAccount"}
		fmt.Println(requestPath)
		//check if response does not require authenthication
		for _, value := range auth {
			if value == requestPath {
				next.ServeHTTP(writer, request)
				return
			}
		}
		//other wise it requires authentication
		response := make(map[string]interface{})
		tokenHeader := request.Header.Get("Authorization")

		if tokenHeader == "" {
			response = utils.Message(false, "Missing auth token")
			writer.WriteHeader(http.StatusForbidden)
			writer.Header().Add("Content-Type", "application/json")
			utils.Respond(writer, response)
		}
		splitted := strings.Split(tokenHeader, " ") //The token normally comes in format `Bearer {token-body}`, we check if the retrieved token matched this requirement
		if len(splitted) != 2 {
			response = utils.Message(false, "Invalid/Malformed auth token")
			writer.WriteHeader(http.StatusForbidden)
			writer.Header().Add("Content-Type", "application/json")
			utils.Respond(writer, response)
			return
		}
		tokenPart := splitted[1] // the information that we're interested in
		tk := &models.Token{}

		token, err := jwt.ParseWithClaims(tokenPart, tk, func(token *jwt.Token) (interface{}, error) {
			return []byte(os.Getenv("token_password")), nil
		})

		//malformed token, return 403
		if err != nil {
			fmt.Println(err)
			response = utils.Message(false, "Malformed auth token")
			writer.WriteHeader(http.StatusForbidden)
			writer.Header().Add("Content-Type", "application/json")
			utils.Respond(writer, response)
			return
		}
		//token is invalid
		if !token.Valid {
			fmt.Println(token.Valid)
			response = utils.Message(false, "Token is invalid")
			writer.WriteHeader(http.StatusForbidden)
			writer.Header().Add("Content-Type", "application/json")
			utils.Respond(writer, response)
			return
		}

		//everything went well
		fmt.Sprintf("User ", tk.UserName)
		ctx := context.WithValue(request.Context(), "user", tk.UserID)
		request = request.WithContext(ctx)
		next.ServeHTTP(writer, request)
	})
}
