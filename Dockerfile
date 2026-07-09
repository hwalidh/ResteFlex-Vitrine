# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build the Angular app for production
RUN npm run build

# Production stage
FROM node:20-alpine

WORKDIR /app

# Install a simple HTTP server to serve the built app
RUN npm install -g http-server

# Copy built app from builder stage
COPY --from=builder /app/dist/demo ./dist/demo

# Expose port
EXPOSE 4200

# Health check
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost:4200/ || exit 1

# Serve the app
CMD ["http-server", "dist/demo", "-p", "4200", "-c-1"]
