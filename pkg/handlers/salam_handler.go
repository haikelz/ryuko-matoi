package handlers

import (
	"context"
)

type Salam interface {
	GetRandomSalam(ctx context.Context) (string, error)
}

func SalamHandler() {}
