package handlers

import (
	"context"
)

type AnimeQuote interface {
	GetRandomQuote(ctx context.Context) (string, error)
}

func AnimeQuoteHandler() {}
