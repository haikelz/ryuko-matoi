package handlers

import (
	"context"
)

type RandomJoke interface {
	GetRandomJoke(ctx context.Context) (string, error)
}

func RandomJokeHandler() {}
