# 構建階段
FROM node:20-bullseye AS build
ARG NODE_ENV=dev
ENV NODE_ENV=$NODE_ENV
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . .
COPY ./.env.${NODE_ENV} /app/.env
RUN yarn build

# 運行階段
FROM nginx:stable
ARG NODE_ENV=dev
COPY --from=build /app/dist /usr/share/nginx/html
COPY /nginx_conf/nginx.${NODE_ENV}.conf /etc/nginx/conf.d/default.conf

# 健康檢查
HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
    CMD curl -f http://localhost/ || exit 1

# 暴露 80 端口
EXPOSE 80

# 啟動 Nginx
CMD ["nginx", "-g", "daemon off;"]