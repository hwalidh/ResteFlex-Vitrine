# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Production stage — nginx
FROM nginx:alpine

# Config nginx personnalisée
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copie du build Angular
COPY --from=builder /app/dist/demo /usr/share/nginx/html

EXPOSE 4200

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost:4200/ || exit 1
