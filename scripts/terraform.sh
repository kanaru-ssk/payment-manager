#!/bin/bash

PROJECT_ROOT_DIR=$(dirname "$0")/..
ENV=$1
COMMAND=$2
shift
shift

docker run --rm -it \
    -v "$PROJECT_ROOT_DIR/infra:/infra" \
    -v ~/.config/gcloud/application_default_credentials.json:/application_default_credentials.json:ro \
    --env GOOGLE_APPLICATION_CREDENTIALS=/application_default_credentials.json \
    --env GOOGLE_CLOUD_QUOTA_PROJECT=payment-manager-$ENV \
    hashicorp/terraform:latest -chdir=/infra/environments/$ENV \
    $COMMAND -var-file=../../globals/common.tfvars $@
