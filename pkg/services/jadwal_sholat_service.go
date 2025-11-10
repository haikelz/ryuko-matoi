package services

import (
	"context"
)

type JadwalSholat interface {
	GetRandomJadwalSholat(ctx context.Context) (string, error)
}

func JadwalSholatService() {}
