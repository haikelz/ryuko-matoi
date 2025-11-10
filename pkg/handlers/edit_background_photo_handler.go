package handlers

import (
	"context"
)

type EditBackgroundPhoto interface {
	EditBackgroundPhoto(ctx context.Context, image []byte) (string, error)
}

func EditBackgroundPhotoHandler() {}
