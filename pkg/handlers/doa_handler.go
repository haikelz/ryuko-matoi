package handlers

import (
	"context"
)

type Doa interface {
	GetRandomDoa(ctx context.Context) (string, error)
}

func DoaHandler() {}
