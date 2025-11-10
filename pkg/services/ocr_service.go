package services

import (
	"context"
)

type Ocr interface {
	GetRandomOcr(ctx context.Context) (string, error)
}

func OcrService() {}
