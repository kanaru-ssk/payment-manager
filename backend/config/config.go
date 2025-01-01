package config

import (
	"context"
	"log"

	"github.com/sethvargo/go-envconfig"
)

type Config struct {
	Port  int    `env:"PORT,default=8080"`
	DbUrl string `env:"DB_URL,default=postgres://backend-local:password@db:5432/payment-manager?sslmode=disable"`
}

func New(ctx context.Context) *Config {
	configs := &Config{}
	if err := envconfig.Process(ctx, configs); err != nil {
		log.Fatalf("configs.New: envconfig.Process err: %v", err)
	}
	return configs
}
