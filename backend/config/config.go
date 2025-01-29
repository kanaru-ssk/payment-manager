package config

import (
	"context"

	"github.com/sethvargo/go-envconfig"
)

type Config struct {
	Port        int    `env:"PORT,required"`
	ProjectId   string `env:"PROJECT_ID,required"`
	FrontendUrl string `env:"FRONTEND_URL,required"`
	DbUrl       string `env:"DB_URL,required"`
}

func NewConfig(ctx context.Context) (*Config, error) {
	configs := &Config{}
	if err := envconfig.Process(ctx, configs); err != nil {
		return nil, err
	}
	return configs, nil
}
