package config

import (
	"context"

	"github.com/sethvargo/go-envconfig"
)

type Config struct {
	Port  int    `env:"PORT,default=8000"`
	DbUrl string `env:"DB_URL,default=postgres://backend-local:password@db:5432/payment-manager?sslmode=disable"`
}

func NewConfig(ctx context.Context) (*Config, error) {
	configs := &Config{}
	if err := envconfig.Process(ctx, configs); err != nil {
		return nil, err
	}
	return configs, nil
}
