#!/bin/bash

project_root=$(dirname "$0")/../..
terraform -chdir=$project_root/infra/environments/$1 $2 -var-file=../../globals/common.tfvars
