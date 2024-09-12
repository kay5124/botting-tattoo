#!/bin/bash

# 環境變量，用於區分本地和線上環境
ENVIRONMENT=${1:-"dev"}

# 驗證環境參數
case "$ENVIRONMENT" in
  "dev"|"online"|"prod")
    echo "Deploying $ENVIRONMENT environment"
    ;;
  *)
    echo "Invalid environment. Use dev, online, or prod."
    exit 1
    ;;
esac

# 使用 docker-compose 來管理容器
docker compose --profile $ENVIRONMENT up -d --build --remove-orphans

# 獲取容器名稱和端口
CONTAINER_NAME=$(docker compose --profile $ENVIRONMENT ps -q)
PORT=$(docker port $CONTAINER_NAME 80 | cut -d ':' -f 2)

echo "Frontend ($ENVIRONMENT) is now running on port $PORT"