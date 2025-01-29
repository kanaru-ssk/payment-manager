package appcloudsql

import (
	"database/sql"

	_ "github.com/lib/pq"
)

func NewClient(dbUrl string) (*sql.DB, error) {
	c, err := sql.Open("postgres", dbUrl)
	if err != nil {
		return nil, err
	}
	return c, nil
}
