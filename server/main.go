package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"sync"
)

var (
	redState   bool
	greenState bool
	mutex      = &sync.Mutex{}
)

func main() {
	http.HandleFunc("/state", stateHandler)
	http.HandleFunc("/", handler)
	log.Fatal(http.ListenAndServe(":9090", nil))
}

func handler(w http.ResponseWriter, r *http.Request) {
	var gtx map[string]string
	err := json.NewDecoder(r.Body).Decode(&gtx)
	if err != nil {
		fmt.Println(err)
		json.NewEncoder(w).Encode(err)
		return
	}
	if gtx["green"] != "" {
		if gtx["green"] == "ON" {
			mutex.Lock()
			greenState = true
			mutex.Unlock()
		} else {
			mutex.Lock()
			greenState = false
			mutex.Unlock()
		}
	}
	if gtx["red"] != "" {
		if gtx["red"] == "ON" {
			mutex.Lock()
			redState = true
			mutex.Unlock()
		} else {
			mutex.Lock()
			redState = false
			mutex.Unlock()
		}
	}
	fmt.Println(gtx)
	json.NewEncoder(w).Encode(fmt.Sprintf("green: %v, red: %v", greenState, redState))
}

func stateHandler(w http.ResponseWriter, r *http.Request) {
	gtx := make(map[string]bool)
	mutex.Lock()
	gtx["green"] = greenState
	gtx["red"] = redState
	mutex.Unlock()
	json.NewEncoder(w).Encode(gtx)
}
