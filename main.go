package main

import (
	"encoding/json"
	"errors"
	"fmt"
	"net/http"
	"os"
	"regexp"
)

func main() {
	mux := http.NewServeMux()

	mux.Handle("/", http.FileServer(http.Dir("./static")))
	mux.Handle("/static/", http.StripPrefix("/static/", http.FileServer(http.Dir("./static/notes"))))

	mux.HandleFunc("/change-root", handle)

	err := http.ListenAndServe(":3000", mux)
	if err != nil {
		fmt.Println(err)
	}
}

func handle(w http.ResponseWriter, r *http.Request) {
	queryP := r.URL.Query()
	root := queryP["root"][0]
	mode := queryP["mode"][0]

	if root == "" || mode == "" {
		http.Error(w, "no root or mode specified", 500)
		return
	}

	notes, err := getNotesOfTonality(root, mode)
	if err != nil {
		http.Error(w, "incorrect root or mode", 500)
		return
	}

	files, err := os.ReadDir("static/notes")
	if err != nil {
		http.Error(w, "something went wrong", 500)
		return
	}

	names := []string{}
	for _, file := range files {
		for _, note := range notes {
			r := regexp.MustCompile(note + `\d`)
			ism := r.MatchString(file.Name())
			if ism {
				names = append(names, "./static/"+file.Name())
			}
		}
	}

	fmt.Println(names)
	enc := json.NewEncoder(w)

	enc.Encode(names)
}

func getNotesOfTonality(root, mode string) ([]string, error) {
	aliases := []string{"C", "CS", "D", "DS", "E", "F", "FS", "G", "GS", "A", "AS", "B", "C", "CS", "D", "DS", "E", "F", "FS", "G", "GS", "A"}

	pos := -1
	for i := 0; i < len(aliases); i++ {
		if aliases[i] == root {
			pos = i
			break
		}
	}
	if pos == -1 {
		return nil, errors.New("invalid root")
	}

	var modeStructure []int

	switch mode {
	case "minor":
		modeStructure = []int{2, 1, 2, 2, 1, 2}
	case "major":
		modeStructure = []int{2, 2, 1, 2, 2, 2}
	default:
		return nil, errors.New("invalid mode")
	}

	resultAliases := make([]string, len(modeStructure)+1)
	resultAliases[0] = aliases[pos]
	for i := 0; i < len(modeStructure); i++ {
		pos = pos + modeStructure[i]
		resultAliases[i+1] = aliases[pos]
	}

	return resultAliases, nil
}
