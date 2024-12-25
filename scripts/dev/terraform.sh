#!/bin/bash

project_root=$(dirname "$0")/../..
env=$1
shift
terraform -chdir=$project_root/infra/environments/$env $@ -var-file=../../globals/common.tfvars
