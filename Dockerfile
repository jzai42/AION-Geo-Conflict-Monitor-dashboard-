# PDF API 专用镜像：Express + puppeteer-core + 系统 Chromium（Debian）
FROM node:20-bookworm-slim

RUN apt-get update \
  && apt-get install -y --no-install-recommends \
    chromium \
    ca-certificates \
    fonts-liberation \
  && rm -rf /var/lib/apt/lists/*

ENV PDF_API_PORT=8787
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY tsconfig.json ./
COPY server ./server
COPY src ./src

EXPOSE 8787

ENV NODE_ENV=production

# tsx 位于 devDependencies：镜像构建阶段未设置 NODE_ENV=production，以便 npm ci 安装 tsx
CMD ["npx", "tsx", "server/index.ts"]
