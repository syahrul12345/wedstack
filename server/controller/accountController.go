package controller

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"server/models"
	"server/utils"
)

//CreateAccount will create a new customer account
var CreateAccount = func(writer http.ResponseWriter, request *http.Request) {
	log.Print("Attempting to create new account...")
	account := &models.Account{}
	err := json.NewDecoder(request.Body).Decode(account)
	if err != nil {
		writer.WriteHeader(http.StatusBadRequest)
		utils.Respond(writer, utils.Message(false, "Invalid Request"))
		return
	} else {
		resp := account.Create()
		if resp["error"] != nil {
			writer.WriteHeader(http.StatusBadRequest)
			log.Print("Failed to create an account with username " + account.Email + " as the email is already in use")
			utils.Respond(writer, resp)
			return
		}
		utils.Respond(writer, resp)
	}
}

//Login to the cms
var Login = func(writer http.ResponseWriter, request *http.Request) {
	account := &models.Account{}
	err := json.NewDecoder(request.Body).Decode(account)
	if err != nil {
		writer.WriteHeader(http.StatusBadRequest)
		utils.Respond(writer, utils.Message(false, "Invalid Request"))
		return
	}
	log.Print("Login Attempt detected by user: " + account.Email)
	resp := models.Login(account.Email, account.Password)
	if resp["error"] != nil {
		writer.WriteHeader(http.StatusUnauthorized)
		log.Print("Login for user: "+account.Email+" has failed: ", resp["error"])
		utils.Respond(writer, resp)
		return
	}
	utils.Respond(writer, resp)
}

// ChangePassword of the account
var ChangePassword = func(writer http.ResponseWriter, request *http.Request) {
	newAccount := &models.NewAccount{}
	err := json.NewDecoder(request.Body).Decode(newAccount)
	if err != nil {
		writer.WriteHeader(http.StatusBadRequest)
		utils.Respond(writer, utils.Message(false, "Invalid Request, please provide new password"))
	} else {
		log.Print("Password change detected by user: " + newAccount.Email)
		resp := newAccount.Save()
		if resp["error"] != nil {
			writer.WriteHeader(http.StatusBadRequest)
			log.Print("Changing of password for user: "+newAccount.Email+" has failed: ", resp["error"])
			utils.Respond(writer, resp)
			return
		}
		utils.Respond(writer, resp)
	}
}

func interfaceToString(inter interface{}) string {
	return fmt.Sprintf("%v", inter)
}
