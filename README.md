# AI Conversation Training BackEnd

## App 概要

1. AI Conversation Training の BackEnd

2. アーキテクチャ構成


   - BackEnd-API: NestJS

   - DB: PostgreSQL

3. ツール

   - Linter: ESLint

   - Formatter: Prettier

## 環境構築

### 0. Nest CLI をインストール

`server`ディレクトリに移動して、`yarn install`してください
```
$ cd server/

$ yarn install
```

`.env.exapmle`を`.env`の名前でローカルにコピーして下さい

- local に NestJS CLI が Install されていない場合は、まずは CLI を install しましょう。

```bash
npm install -g @nestjs/cli
```

### Docker Image の Build & Docker Container の起動

- Docker Image のビルド と コンテナの実行を実施します。

```bash
docker-compose up --build
```

### NestJS Container に入る時のコマンド

```bash
docker compose exec nest-app bash
```

## 起動確認

- `http://localhost:3222/`にアクセスして Hello World! が表示されれば、起動成功

## 参考・引用

1. [Docker を使って NestJS の開発環境を構築してみました](https://zenn.dev/bloomer/articles/335e2d7c26ac86)
