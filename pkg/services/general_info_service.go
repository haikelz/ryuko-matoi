package services

import (
	"context"
)

type GeneralInfo interface {
	GetRandomGeneralInfo(ctx context.Context) (string, error)
}

func GeneralInfoService() {}
