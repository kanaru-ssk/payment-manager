# インフラ

インフラは[terraform](https://www.terraform.io)で管理します。

※ README 内のコマンドはプロジェクトルートで実行してください。

## terraform コマンド

```sh
terraform fmt -recursive -write=true

./scripts/dev/terraform.sh common init
./scripts/dev/terraform.sh common plan
./scripts/dev/terraform.sh common apply

./scripts/dev/terraform.sh dev init
./scripts/dev/terraform.sh dev plan
./scripts/dev/terraform.sh dev apply

./scripts/dev/terraform.sh prd init
./scripts/dev/terraform.sh prd plan
./scripts/dev/terraform.sh prd apply
```
