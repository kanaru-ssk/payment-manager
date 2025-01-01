#!/bin/bash

DB_USER=${DB_USER:-backend-local}
DB_PW=${DB_PW:-password}

cat ./db/seeds.sql | \
docker run --rm -i --network=host \
    postgres:17 \
    psql postgres://$DB_USER:$DB_PW@localhost:5432/payment-manager?sslmode=disable
