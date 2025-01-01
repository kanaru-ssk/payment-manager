#!/bin/bash

DB_USER=${DB_USER:-backend-local}
DB_PW=${DB_PW:-password}

PROJECT_ROOT_DIR=$(dirname "$0")/..
docker run --rm -it --network=host \
    -v "$PROJECT_ROOT_DIR/db:/db" \
    ghcr.io/amacneil/dbmate \
    --url "postgres://$DB_USER:$DB_PW@localhost:5432/payment-manager?sslmode=disable" \
    $@
