FROM node:18.16.0-slim
RUN apt-get update && \
    apt-get install -y locales curl
RUN locale-gen ja_JP.UTF-8
RUN localedef -f UTF-8 -i ja_JP ja_JP
ENV LANG=ja_JP.UTF-8
ENV TZ=Asia/Tokyo

# server ディレクトリ
WORKDIR /server

# Docker コンテナが起動されたときに実行されるコマンド: server/setup.sh を実行する
ENTRYPOINT ["sh", "./setup.sh" ]