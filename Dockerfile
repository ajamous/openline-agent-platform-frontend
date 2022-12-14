FROM node:16.16-alpine as deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

FROM node:16.16-alpine AS builder

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules

COPY . .

RUN npm run-script "build:uat-ninja" # TODO set the environment as external

FROM node:16.16-alpine AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 openlinegroup
RUN adduser --system --uid 1001 openlineuser

COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=openlineuser:openlinegroup /app/.next/standalone ./
COPY --from=builder --chown=openlineuser:openlinegroup /app/.next/static ./.next/static

USER openlineuser

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]