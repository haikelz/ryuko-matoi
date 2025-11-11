package entities

type AsmaulHusna struct {
	ID     int    `json:"id" validate:"required"`
	Urutan int    `json:"urutan" validate:"required"`
	Latin  string `json:"latin" validate:"required"`
	Arab   string `json:"arab" validate:"required"`
	Arti   string `json:"arti" validate:"required"`
}
