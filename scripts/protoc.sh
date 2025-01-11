#!/bin/bash

protoc \
  --go_out=paths=source_relative:backend/interface \
  --go-grpc_out=paths=source_relative:backend/interface \
  --ts_out=import_style=commonjs,binary:frontend/src/infrastructure \
  proto/user/v1/*.proto \
  proto/paymentcategory/v1/*.proto

protoc \
  --ts_out=import_style=commonjs,binary:frontend/src/infrastructure \
  --proto_path=./proto/googleapis \
  proto/googleapis/google/cloud/identitytoolkit/v2/*.proto
