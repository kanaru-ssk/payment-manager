# インフラ構成

```mermaid
flowchart LR
  d@{ shape: circle, label: "Developer" }
  gh[GitHub]
  eu@{ shape: circle, label: "End User" }

  d -.-> ccs
  d -.-> gh

  gh -.-> par
  gh -.-> sar
  eu ==> pcrf

  subgraph stg
    subgraph sv[vpc]
      scrb[Cloud Run <br> backend]
      scs@{ shape: db, label: "Cloud SQL" }
    end

    sar[Artifact Registry]
    scrf[Cloud Run <br> frontend]

    scrf ==> scrb
    scrb ==> scs
    sar -.-> scrf
    sar -.-> scrb
  end

  subgraph prod
    subgraph pv[vpc]
      pcrb[Cloud Run <br> backend]
      pcs@{ shape: db, label: "Cloud SQL" }
    end

    par[Artifact Registry]
    pcrf[Cloud Run <br> frontend]


    pcrf ==> pcrb
    pcrb ==> pcs
    par -.-> pcrf
    par -.-> pcrb
  end

  subgraph common
    ccs@{ shape: disk, label: "Cloud Storage <br> (terraform backend)" }
  end
```

## prod, stg

本番およびステージング用の Google Cloud プロジェクト。

- Backend は Frontend のサービスアカウントでアクセス可能。常に Next.js のサーバーサイドからリクエストする。
- Cloud SQL は Backend のサービスアカウントでアクセス可能。
- Cloud SQL と Backend はアクセスを internal に制限する。

## common

本番、開発共通で利用する Google Cloud プロジェクト。

- Terraform Backend 用の Cloud Storage

## GitHub

コードの管理および CI/CD の実行を行う。

- Publish release で prod デプロイ
- stg は Deploy Dispatcher でデプロイ
- PR 作成・更新で CI 実行
- develop -> main の流れでマージする。

## Developer

開発者。

- terraform apply で common の Cloud Storage の state を更新
- git push で GitHub にコードプッシュ
