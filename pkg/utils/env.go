package utils

import (
	"log"
	"ryuko-matoi/pkg/configs"
	"ryuko-matoi/pkg/entities"

	"github.com/spf13/viper"
)

func Env() entities.Env {
	v := configs.NewViper()

	_ = v.BindEnv("REMOVE_BG_API_KEY", "REMOVE_BG_API_URL", "JOKES_API_URL", "ANIME_QUOTE_API_URL", "DISTRO_INFO_API_URL", "DOA_API_URL", "QURAN_API_URL", "IMAGE_API_URL", "GEMINI_API_KEY", "ASMAUL_HUSNA_API_URL")

	if err := v.ReadInConfig(); err != nil {
		if _, ok := err.(viper.ConfigFileNotFoundError); !ok {
			log.Printf("Error reading config file: %v", err)
		}
	}

	env := entities.Env{
		REMOVE_BG_API_KEY:    v.GetString("REMOVE_BG_API_KEY"),
		REMOVE_BG_API_URL:    v.GetString("REMOVE_BG_API_URL"),
		JOKES_API_URL:        v.GetString("JOKES_API_URL"),
		ANIME_QUOTE_API_URL:  v.GetString("ANIME_QUOTE_API_URL"),
		DISTRO_INFO_API_URL:  v.GetString("DISTRO_INFO_API_URL"),
		DOA_API_URL:          v.GetString("DOA_API_URL"),
		QURAN_API_URL:        v.GetString("QURAN_API_URL"),
		IMAGE_API_URL:        v.GetString("IMAGE_API_URL"),
		GEMINI_API_KEY:       v.GetString("GEMINI_API_KEY"),
		ASMAUL_HUSNA_API_URL: v.GetString("ASMAUL_HUSNA_API_URL"),
	}

	return env
}
