#!/bin/bash

protoc \
  --go_out=paths=source_relative:backend/interface \
  --go-grpc_out=paths=source_relative:backend/interface \
  --js_out=import_style=commonjs,binary:frontend/src/infrastructure/grpc \
  --ts_out=import_style=commonjs,binary:frontend/src/infrastructure/grpc \
  --plugin=protoc-gen-ts="$(which protoc-gen-ts)" \
  proto/$1/$2/$1.proto
