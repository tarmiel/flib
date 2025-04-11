FROM node:20-alpine AS builder
RUN apk update

WORKDIR /app
RUN npm install -g turbo
COPY . .
RUN turbo prune web --docker


FROM node:20-alpine AS installer
RUN apk update
WORKDIR /app
COPY --from=builder /app/out/json/ ./
COPY --from=builder /app/out/package-lock.json ./package-lock.json
COPY --from=builder /app/turbo.json ./turbo.json
RUN npm ci


FROM node:20-alpine AS sourcer
WORKDIR /app
ARG VITE_APP_API_URL
ENV VITE_APP_API_URL $VITE_APP_API_URL
COPY --from=installer /app/ ./
COPY --from=builder /app/out/full/ ./
COPY .gitignore .gitignore
RUN npm run build --workspace=web


FROM node:20-alpine AS runner
WORKDIR /app

RUN npm install -g serve
COPY --from=sourcer /app/apps/web/dist ./dist

EXPOSE 3000

CMD ["serve", "-s", "dist", "-l", "3000"]
