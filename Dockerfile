FROM node:20-alpine AS builder

WORKDIR /app

# Kopiere package files
COPY package*.json ./
COPY prisma ./prisma/

# Installiere Dependencies
RUN npm ci

# Kopiere Projekt
COPY . .

# Generiere Prisma Client
RUN npx prisma generate

# Baue die Anwendung
RUN npm run build

# Production Image
FROM node:20-alpine

WORKDIR /app

# Kopiere nur notwendige Dateien
COPY --from=builder /app/build ./build
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
COPY --from=builder /app/prisma ./prisma

# Setze Environment
ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

CMD ["node", "build"]
