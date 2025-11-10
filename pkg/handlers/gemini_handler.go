package handlers

import (
	"context"
)

type Gemini interface {
	GetRandomGemini(ctx context.Context) (string, error)
}

func GeminiHandler() {}
