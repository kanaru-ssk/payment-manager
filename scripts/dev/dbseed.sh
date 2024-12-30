#!/bin/bash

cat ./db/seeds.sql | docker compose exec -T db psql -U postgres -d postgres