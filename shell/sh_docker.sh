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

# 設定域名和證書路徑
echo "Setting up domains and certificates..."
domains=(bottingtattoo.com www.bottingtattoo.com)
rsa_key_size=4096
data_path="/var/server/certs"
email="dsa123465@gmail.com" # Adding a valid address is strongly recommended
staging=0 # Set to 1 if you're testing your setup to avoid hitting request limits

if [ -d "$data_path" ]; then
  echo "Existing data found for $domains. Continuing and replacing existing certificate..."
  # 自動確認替換現有證書
fi

mkdir -p "$data_path"
mkdir -p "$data_path/conf"
mkdir -p "$data_path/www"
echo "Setting up domains and certificates...done"

# 生成或更新證書
docker compose run --rm --entrypoint "\
  certbot certonly --webroot -w /var/www/certbot \
    --email $email \
    -d ${domains[@]} \
    --rsa-key-size $rsa_key_size \
    --agree-tos \
    --force-renewal" certbot

# 啟動 Docker Compose 服務
echo "### Starting services with profile $ENVIRONMENT ..."
docker compose --profile $ENVIRONMENT up -d --build --remove-orphans

# 獲取容器名稱和端口
CONTAINER_NAME=$(docker compose --profile $ENVIRONMENT ps -q)
PORT=$(docker port $CONTAINER_NAME 80 | cut -d ':' -f 2)

echo "Frontend ($ENVIRONMENT) is now running on port $PORT"