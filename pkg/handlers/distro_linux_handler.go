package handlers

import (
	"context"
)

type DistroLinux interface {
	GetRandomDistroLinux(ctx context.Context) (string, error)
}

func DistroLinuxHandler() {}
