package services

import (
	"encoding/json"
	"io"
	"net/http"
	"ryuko-matoi/pkg/entities"
	"ryuko-matoi/pkg/utils"
	"strconv"

	"github.com/rs/zerolog/log"
)

type AsmaulHusna interface {
	GetAllAsmaulHusna() ([]entities.AsmaulHusna, error)
}

func GetAllAsmaulHusna() ([]*entities.AsmaulHusna, error) {
	resp, err := http.NewRequest("GET", utils.Env().ASMAUL_HUSNA_API_URL+"/api/all", nil)
	if err != nil {
		log.Error().Err(err)
		return nil, err
	}

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		log.Error().Err(err)
		return nil, err
	}

	var asmaulHusna []*entities.AsmaulHusna
	err = json.Unmarshal(body, &asmaulHusna)
	if err != nil {
		log.Error().Err(err)
		return nil, err
	}

	return asmaulHusna, nil
}

func GetAsmaulHusnaByLatin(latin string) (*entities.AsmaulHusna, error) {
	asmaulHusna, err := fetchAsmaulHusna("/api/latin/" + latin)
	if err != nil {
		return nil, err
	}

	return asmaulHusna, nil
}

func GetAsmaulHusnaByUrutan(urutan int) (*entities.AsmaulHusna, error) {
	asmaulHusna, err := fetchAsmaulHusna("/api/" + strconv.Itoa(urutan))
	if err != nil {
		return nil, err
	}

	return asmaulHusna, nil
}

func fetchAsmaulHusna(endpoint string) (*entities.AsmaulHusna, error) {
	resp, err := http.NewRequest("GET", utils.Env().ASMAUL_HUSNA_API_URL+endpoint, nil)
	if err != nil {
		log.Error().Err(err)
		return nil, err
	}

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		log.Error().Err(err)
		return nil, err
	}

	var asmaulHusna *entities.AsmaulHusna
	if err := json.Unmarshal(body, &asmaulHusna); err != nil {
		log.Error().Err(err)
		return nil, err
	}

	return asmaulHusna, nil
}
