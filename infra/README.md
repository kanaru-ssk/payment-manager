# infra

インフラは[terraform](https://www.terraform.io)で管理します。

※ README 内のコマンドはプロジェクトルートで実行してください。

## ローカル環境構築

Google Cloud の認証のため、ADC を設定

```sh
gcloud auth application-default login --disable-quota-project
```

## terraform コマンド

```sh
terraform fmt -recursive -write=true

./scripts/terraform.sh common init
./scripts/terraform.sh common plan
./scripts/terraform.sh common apply

./scripts/terraform.sh stg init
./scripts/terraform.sh stg plan
./scripts/terraform.sh stg apply

./scripts/terraform.sh prod init
./scripts/terraform.sh prod plan
./scripts/terraform.sh prod apply
```
