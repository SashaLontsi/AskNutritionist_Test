# ---------- Install dependencies only when needed ----------
    FROM node:lts-slim AS deps
    WORKDIR /app
    
    # Copy lock files and install dependencies
    COPY package.json ./
    COPY pnpm-lock.yaml ./
    RUN npm install -g pnpm && pnpm install
    
    # ---------- Build source code ----------
    FROM node:lts-slim AS builder
    WORKDIR /app
    
    COPY . .
    COPY --from=deps /app/node_modules ./node_modules
    RUN pnpm build
    
    # ---------- Final production image ----------
    FROM node:lts-slim AS runner
    WORKDIR /app
    
    ENV NODE_ENV=production
    
    # Copy build artifacts
    COPY --from=builder /app/public ./public
    COPY --from=builder /app/.next ./.next
    COPY --from=builder /app/node_modules ./node_modules
    COPY --from=builder /app/package.json ./package.json
    
    # Optional: expose port if needed (adjust if you're not using 3000)
    EXPOSE 3000
    
    # Start the Next.js app
    CMD ["pnpm", "start"]
    