FROM node:18-alpine AS base

# 可选，自定义参数变量，在docker build时通过--build-arg ENV=参数
# ARG ENV

# Install dependencies only when needed
FROM base AS deps
RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.ustc.edu.cn/g' /etc/apk/repositories
RUN apk update
RUN apk add --no-cache libc6-compat
WORKDIR /app


COPY package.json  ./
COPY package-lock.json ./
RUN npm config set registry https://registry.npmmirror.com \
  && npm_config_platform=linux npm_config_arch=x64 npm_config_libc=glibc npm i

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# 可使用自定义参数变量来打包
# RUN npm run ${ENV}

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NEXT_TELEMETRY_DISABLED 1

COPY --from=builder  /app/.next/standalone ./
COPY --from=builder  /app/.env /app
COPY --from=builder  /app/public /app/public
COPY --from=builder  /app/.next/static /app/.next/static

EXPOSE 3002
ENV PORT 3002

ENV HOSTNAME="0.0.0.0"

CMD node server.js
