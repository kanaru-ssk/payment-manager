# infra

インフラは[terraform](https://www.terraform.io)で管理します。

※ README 内のコマンドはプロジェクトルートで実行してください。

## terraform コマンド

```sh
terraform fmt -recursive -write=true

./scripts/terraform.sh common init
./scripts/terraform.sh common plan
./scripts/terraform.sh common apply

./scripts/terraform.sh dev init
./scripts/terraform.sh dev plan
./scripts/terraform.sh dev apply

./scripts/terraform.sh prd init
./scripts/terraform.sh prd plan
./scripts/terraform.sh prd apply
```
