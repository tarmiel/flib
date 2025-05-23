FROM node:20-alpine AS builder
RUN apk update

WORKDIR /app
RUN npm install -g turbo
COPY . .
RUN turbo prune api --docker

FROM node:20-alpine AS installer
RUN apk update
WORKDIR /app
COPY --from=builder /app/out/json/ ./
COPY --from=builder /app/out/package-lock.json ./package-lock.json
COPY --from=builder /app/turbo.json ./turbo.json
COPY --from=builder /app/apps/api/prisma ./prisma
RUN npm ci
RUN npx prisma generate

FROM node:20-alpine AS sourcer
WORKDIR /app
COPY --from=installer /app/ ./
COPY --from=builder /app/out/full/ ./
COPY .gitignore .gitignore
RUN npm run build --workspace=api

FROM node:20-alpine as runner
WORKDIR /app
COPY --from=sourcer /app/ .
CMD [ "node", "apps/api/dist/main.js" ]
