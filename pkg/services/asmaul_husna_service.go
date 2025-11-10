package services

import (
	"context"
)

type AsmaulHusna interface {
	GetRandomAsmaulHusna(ctx context.Context) (string, error)
}

func AsmaulHusnaService() {

}
