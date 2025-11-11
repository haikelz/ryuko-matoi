package entities

type Env struct {
	REMOVE_BG_API_KEY    string `env:"REMOVE_BG_API_KEY" validate:"required"`
	REMOVE_BG_API_URL    string `env:"REMOVE_BG_API_URL" validate:"required"`
	JOKES_API_URL        string `env:"JOKES_API_URL" validate:"required"`
	ANIME_QUOTE_API_URL  string `env:"ANIME_QUOTE_API_URL" validate:"required"`
	DISTRO_INFO_API_URL  string `env:"DISTRO_INFO_API_URL" validate:"required"`
	DOA_API_URL          string `env:"DOA_API_URL" validate:"required"`
	QURAN_API_URL        string `env:"QURAN_API_URL" validate:"required"`
	IMAGE_API_URL        string `env:"IMAGE_API_URL" validate:"required"`
	GEMINI_API_KEY       string `env:"GEMINI_API_KEY" validate:"required"`
	ASMAUL_HUSNA_API_URL string `env:"ASMAUL_HUSNA_API_URL" validate:"required"`
}
