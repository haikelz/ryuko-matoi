package services

import (
	"context"
)

type Gemini interface {
	GetRandomGemini(ctx context.Context) (string, error)
}

func GeminiService() {}
