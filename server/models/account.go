package models

import (
	"log"
	"os"
	"server/utils"
	"strings"

	"github.com/dgrijalva/jwt-go"
	"github.com/jinzhu/gorm"
	"golang.org/x/crypto/bcrypt"
)

//Token is the JWT token that will be returned
type Token struct {
	UserID   uint
	UserName string
	jwt.StandardClaims
}

//Account is an object representing the account saved in the DB
type Account struct {
	gorm.Model
	Email    string
	Password string
	Token    string
}

//NewAccount is used to replace the Account struct when password is being changed
type NewAccount struct {
	Email       string
	Password    string
	NewPassword string
}

//Validate comment
func (acc *Account) Validate() (map[string]interface{}, bool) {
	resp := make(map[string]interface{})
	if !strings.Contains(acc.Email, "@") {
		return utils.Message(false, "Email Address Required"), false
	}
	if len(acc.Password) < 6 {
		return utils.Message(false, "Password is required"), false
	}
	//Email must be unique
	temp := &Account{}

	err := GetDB().Table("accounts").Where("email = ?", acc.Email).First(temp).Error
	if err != nil && err != gorm.ErrRecordNotFound {
		resp["error"] = "Connection Error. Please retry"
		return resp, false
	}
	if temp.Email != "" {
		resp["error"] = "Email already in use"
		return resp, false
	}
	return utils.Message(false, "Requirement passed"), true
}

//Validate the new account object
func (newAcc *NewAccount) Validate() (map[string]interface{}, bool) {
	resp := make(map[string]interface{})
	if !strings.Contains(newAcc.Email, "@") {
		resp["error"] = "Email address required"
		return resp, false
	}
	if len(newAcc.Password) < 6 {
		resp["error"] = "Old password has to be provided"
		return resp, false
	}
	if len(newAcc.NewPassword) < 6 {
		resp["error"] = "New password has to be provided"
		return resp, false
	}
	//Email must be unique
	temp := &Account{}

	err := GetDB().Table("accounts").Where("email = ?", newAcc.Email).First(temp).Error
	if err != nil && err != gorm.ErrRecordNotFound {
		resp["error"] = "Connection error to DB"
		return resp, false
	}
	if temp.Email == "" {
		resp["error"] = "Email does not exist"
		return resp, false
	}

	return resp, true
}

//Create account
func (acc *Account) Create() map[string]interface{} {
	response, ok := acc.Validate()
	if !ok {
		return response
	}
	hashedPassword, _ := bcrypt.GenerateFromPassword([]byte(acc.Password), bcrypt.DefaultCost)
	acc.Password = string(hashedPassword)
	//stores the account into the database
	GetDB().Create(acc)

	if acc.ID <= 0 {
		response["error"] = "Failed to create new account dew to database error of ID less than 0"
		return response
	}
	//create a new JWT token
	tk := &Token{UserID: acc.ID, UserName: acc.Email}
	token := jwt.NewWithClaims(jwt.GetSigningMethod("HS256"), tk)
	tokenString, _ := token.SignedString([]byte(os.Getenv("token_password")))
	acc.Token = tokenString
	acc.Password = ""

	response = utils.Message(true, "Account has been created")
	log.Print("Succesfully created new account for user: " + acc.Email)
	response["account"] = acc
	return response
}

//Save will save the new account
func (newAcc *NewAccount) Save() map[string]interface{} {
	response, ok := newAcc.Validate()
	if !ok {
		return response
	}
	account := &Account{}
	err := GetDB().Table("accounts").Where("email =?", newAcc.Email).First(account).Error
	if err != nil {
		if err == gorm.ErrRecordNotFound {
			response["error"] = "Email does not exist"
			return response
		}
		response["error"] = "Database error"
		return response
	}
	err = bcrypt.CompareHashAndPassword([]byte(account.Password), []byte(newAcc.Password))
	if err != nil && err == bcrypt.ErrMismatchedHashAndPassword {
		response["error"] = "Old password is incorrect"
		return response
	}

	hashedPassword, _ := bcrypt.GenerateFromPassword([]byte(newAcc.NewPassword), bcrypt.DefaultCost)
	GetDB().Model(account).Update("Password", string(hashedPassword))
	account.Password = ""

	//create JWT TOKEN
	tk := &Token{UserID: account.ID, UserName: account.Email}
	token := jwt.NewWithClaims(jwt.GetSigningMethod("HS256"), tk)
	tokenString, _ := token.SignedString([]byte(os.Getenv("token_password")))
	account.Token = tokenString
	log.Print("User: " + newAcc.Email + " has succesfully changed password")
	resp := utils.Message(true, "Succesfully changed password")
	resp["account"] = account
	return resp
}

//Login comment
func Login(email, password string) map[string]interface{} {
	resp := make(map[string]interface{})
	account := &Account{}
	err := GetDB().Table("accounts").Where("email = ?", email).First(account).Error
	if err != nil {
		if err == gorm.ErrRecordNotFound {
			resp["error"] = "Email not found "
			return resp
		}
		resp["error"] = "Database error"
		return resp
	}
	err = bcrypt.CompareHashAndPassword([]byte(account.Password), []byte(password))
	if err != nil && err == bcrypt.ErrMismatchedHashAndPassword {
		resp["error"] = "Invalid login credentials"
		return resp
	}
	//worked, logged in
	account.Password = ""
	//create JWT token
	tk := &Token{UserID: account.ID, UserName: account.Email}
	token := jwt.NewWithClaims(jwt.GetSigningMethod("HS256"), tk)
	tokenString, _ := token.SignedString([]byte(os.Getenv("token_password")))
	account.Token = tokenString
	resp["status"] = "Succesfully logged in"
	resp["account"] = account
	log.Print("Login by user " + email + " is succesfull")
	return resp
}

//GetUser comment
func GetUser(u uint) *Account {
	acc := &Account{}
	GetDB().Table("accounts").Where("id = ?", u).First(acc)
	if acc.Email == "" {
		return nil
	}
	acc.Password = ""
	return acc
}
