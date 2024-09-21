# ベースイメージを指定
FROM node:18.16.0-slim

# 必要なパッケージのインストールとロケール、タイムゾーン設定
RUN apt-get update && \
    apt-get install -y locales curl && \
    locale-gen ja_JP.UTF-8 && \
    localedef -f UTF-8 -i ja_JP ja_JP

ENV LANG=ja_JP.UTF-8
ENV TZ=Asia/Tokyo

# npm のキャッシュクリア（必要であれば）
RUN npm cache clean --force

# NestJS CLI をグローバルインストール
RUN npm install -g @nestjs/cli

# server ディレクトリに作業ディレクトリを設定
WORKDIR /server

# package.json と yarn.lock をコピー
COPY /server/package*.json ./

# TypeORM, pg, NestJSの依存関係をインストール (yarn 使用)
RUN yarn add @nestjs/typeorm typeorm pg

# 依存関係のインストール（yarn 使用）
RUN yarn install --frozen-lockfile

# ソースコードをコピー
COPY /server /server

# setup.sh の権限を変更
RUN chmod +x ./setup.sh

# Docker コンテナ起動時に実行されるコマンド
ENTRYPOINT ["sh", "./setup.sh"]
