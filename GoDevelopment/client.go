package main

import (
	"encoding/json"
	"fmt"
	"bytes"
	"io"
	"net/http"
)

type book struct {
	ID 		string `json:"id"`
	Title 	string `json:"title"`
	Author 	string `json:"author"`
	Quantity int   `json:"quantity"`
}


const BASE_URL = "http://localhost:8080"

func get() {
	response, err := http.Get(BASE_URL + "/books/1")

	if err != nil {
		fmt.Println(err.Error())
		return
	}

	responseData, err := io.ReadAll(response.Body)
	if err != nil {
		fmt.Println(err.Error())
		return
	}

	var data book
	json.Unmarshal(responseData, &data)
	fmt.Println(data)
}

func post() {
	postBody := book{ID: "4", Title: "Kian Book", Author: "Kian Rahimi", Quantity: 1}
	bodyBytes, err := json.Marshal(&postBody)

	if err != nil {
		fmt.Println(err.Error())
		return
	}

	requestBody := bytes.NewReader(bodyBytes)
	response, err := http.Post(BASE_URL + "/books", "application/json", requestBody)

	if err != nil {
		fmt.Println(err.Error())
		return
	}
	defer response.Body.Close()

	body, err := io.ReadAll(response.Body)
	if err != nil {
		fmt.Println(err.Error())
		return
	}

	s := string(body)
	fmt.Println(s)
}

func main() {
	post()
}