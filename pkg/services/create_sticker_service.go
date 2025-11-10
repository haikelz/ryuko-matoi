package services

import (
	"context"
)

type CreateSticker interface {
	CreateSticker(ctx context.Context, image []byte) (string, error)
}

func CreateStickerService() {}
