package cloudsql

import (
	"database/sql"

	_ "github.com/lib/pq"
)

func NewClient(databaseUrl string) (*sql.DB, error) {
	c, err := sql.Open("postgres", databaseUrl)
	if err != nil {
		return nil, err
	}
	return c, nil
}
