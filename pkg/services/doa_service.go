package services

import (
	"context"
)

type Doa interface {
	GetRandomDoa(ctx context.Context) (string, error)
}

func DoaService() {}
