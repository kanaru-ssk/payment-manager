#!/bin/bash

protoc \
  --go_out=paths=source_relative:backend/interface \
  --go-grpc_out=paths=source_relative:backend/interface \
  --ts_out=import_style=commonjs,binary:frontend/src/infrastructure/grpc \
  proto/$1/$2/$1.proto
