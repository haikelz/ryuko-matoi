package handlers

import (
	"context"
)

type Ocr interface {
	GetRandomOcr(ctx context.Context) (string, error)
}

func OcrHandler() {}
