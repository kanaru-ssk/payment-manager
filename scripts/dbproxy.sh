#!/bin/bash

docker run -d \
    --name dbproxy \
    -v ~/.config/gcloud/application_default_credentials.json:/key.json \
    --env GOOGLE_APPLICATION_CREDENTIALS=/key.json \
    -p 127.0.0.1:5432:5432 \
    gcr.io/cloud-sql-connectors/cloud-sql-proxy:2.14.0 \
    --address 0.0.0.0 --port 5432 \
    dev-payment-manager:asia-northeast1:payment-manager
