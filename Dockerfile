FROM node:18-alpine AS builder
WORKDIR /app

COPY package*.json ./

RUN npm install

COPY prisma ./prisma
COPY tsconfig*.json ./
COPY src ./src

RUN npx prisma generate

RUN npm run build

FROM node:18-alpine
WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/package*.json ./

EXPOSE 3000

CMD npx prisma migrate deploy && npm run start:dev
