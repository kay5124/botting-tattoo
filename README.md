# 刺青形象官網

此存儲庫包含刺青形象官網的源代碼，使用 Vue 3、Vite、Quasar 和 Nginx 構建。

## 介紹

此項目展示了一個專業刺青工作室的在線形象，具有現代和響應式設計。網站使用以下技術構建：

- **Vue 3**：一個漸進式 JavaScript 框架，用於構建用戶界面。
- **Vite**：一個快速的構建工具和開發服務器。
- **Quasar**：一個高性能的 Vue.js 框架，用於構建響應式網站和應用程序。
- **Nginx**：一個高性能的 Web 服務器，用於提供網站服務。

## 特點
- **響應式設計**：確保網站在所有設備上都能良好顯示。
- **畫廊**：展示工作室的刺青作品。

## 項目設置

### 安裝依賴
```shell
npm install
```

### 啟動開發伺服器
```shell
npm run dev
```

### 構建應用
```shell
npm run build
```

## Docker 設置

使用 Docker 運行應用程序，使用以下命令：
```shell
docker run -d --name tattoo-studio-container -p 8080:80 -v /path/to/your/dist:/usr/share/nginx/html nginx
```