package main

import (
	"fmt"
	"net/http"
)

func main() {
	mux := http.NewServeMux()

	mux.Handle("/", http.FileServer(http.Dir("./static")))
	err := http.ListenAndServe(":3000", mux)

	if err != nil {
		fmt.Println(err)
	}
}

func handle(w http.ResponseWriter, r *http.Request) {
	fmt.Println(r.URL)
}
