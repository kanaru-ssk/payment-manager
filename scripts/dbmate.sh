#!/bin/bash

project_root=$(dirname "$0")/..
docker run --rm -it --network=host -v "$project_root/db:/db" ghcr.io/amacneil/dbmate --url "postgres://postgres:password@localhost:5432/postgres?sslmode=disable" $@