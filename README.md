# my-recipe-api

# 事前インストール

```sh
npm i ts-node
```

# このシステムではスクリプトの実行が無効になっているため～ を参照してください。

```sh
Set-ExecutionPolicy RemoteSigned -Scope Process
```

# DB 上で実行

CREATE DATABASE recipe;

# マイグレーションで DB 作成

```sh
db-migrate up
```

## 実行

```sh
npm start
```

# DB 関連ファイル解説

connection.ts == サーバー起動時に DB につなぐための設定ファイル
database.ts == migration の際に DB につなぐための設定ファイル
