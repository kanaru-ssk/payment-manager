#!/bin/bash

project_root=$(dirname "$0")/..
env=$1
shift

docker run --rm -it \
    -v "$project_root/infra:/infra" \
    -v ~/.config/gcloud/application_default_credentials.json:/key.json \
    --env GOOGLE_APPLICATION_CREDENTIALS=/key.json \
    hashicorp/terraform:latest -chdir=/infra/environments/$env \
    $@ -var-file=../../globals/common.tfvars
