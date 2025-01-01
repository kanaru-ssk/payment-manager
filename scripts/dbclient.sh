#!/bin/bash

DB_USER=${DB_USER:-backend-stg}
DB_PW=${DB_PW:-password}

docker run --rm -it --network=host \
    postgres:17 \
    psql "postgres://$DB_USER:$DB_PW@localhost:5432/payment-manager?sslmode=disable"
