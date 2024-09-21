# ベースイメージを指定
FROM node:18.16.0-slim

# 必要なパッケージのインストールとロケール、タイムゾーン設定
RUN apt-get update && \
    apt-get install -y locales curl && \
    locale-gen ja_JP.UTF-8 && \
    localedef -f UTF-8 -i ja_JP ja_JP

# 環境変数の設定
ENV LANG=ja_JP.UTF-8
ENV TZ=Asia/Tokyo

# 作業ディレクトリの設定
WORKDIR /server

# package.json と yarn.lock をコピー
COPY /server/package*.json ./

# 依存関係のインストール
RUN yarn install --frozen-lockfile

# ソースコードをコピー
COPY /server /server

# setup.sh の権限を変更
RUN chmod +x ./setup.sh

# Docker コンテナ起動時に実行されるコマンド
ENTRYPOINT ["sh", "./setup.sh"]
