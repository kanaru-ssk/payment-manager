# インフラ構成

```mermaid
flowchart LR
  d@{ shape: circle, label: "Developer" }
  gh[GitHub]
  eu@{ shape: circle, label: "End User" }

  d -. terraform apply .-> ccs
  d -. git push .-> gh

  gh -. docker push .-> par
  gh -. docker push .-> sar
  eu ==> pcrf

  subgraph stg
    sar[Artifact Registry]
    scrf[Cloud Run <br> frontend <br> Next.js]
    sidp[Identity Platform]

    subgraph sv[vpc]
      scrb[Cloud Run <br> backend <br> Go]
      scs@{ shape: db, label: "Cloud SQL" }
    end

    scrf == gRPC ==> scrb
    scrf == 認証 ==> sidp
    scrb == SQL ==> scs
    sar -. docker pull .-> scrf
    sar -. docker pull .-> scrb
  end

  subgraph prod
    par[Artifact Registry]
    pcrf[Cloud Run <br> frontend <br> Next.js]
    pidp[Identity Platform]

    subgraph pv[vpc]
      pcrb[Cloud Run <br> backend <br> Go]
      pcs@{ shape: db, label: "Cloud SQL" }
    end

    pcrf == gRPC ==> pcrb
    pcrf == 認証 ==> pidp
    pcrb == SQL ==> pcs
    par -. docker pull .-> pcrf
    par -. docker pull .-> pcrb
  end

  subgraph common
    ccs@{ shape: disk, label: "Cloud Storage <br> (terraform backend)" }
  end
```

## prod, stg

本番およびステージング用の Google Cloud プロジェクト。

### frontend

- UI を担当する。
- 外部リクエストは全て Next.js のサーバーサイドで行う。

### backend

- db リクエストを担当する。
- Frontend のサービスアカウントからのみリクエストを受け付ける。
- VPC 内からのみリクエストを受け付ける。

### db

- VPC 内からのみリクエストを受け付ける。
- Backend のサービスアカウントからのみリクエストを受け付ける。

## common

本番、開発共通で利用する Google Cloud プロジェクト。

- Terraform Backend 用の Cloud Storage

## GitHub

コードの管理および CI/CD の実行を行う。

- Deploy Dispatcher でデプロイ
- PR 作成・更新で CI 実行
- develop -> main の流れでマージする。

## Developer

開発者。

- terraform apply で common の Cloud Storage の state を更新
- git push で GitHub にコードプッシュ
