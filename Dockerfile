# ---- STAGE 1 - build stage ----
FROM node:14-alpine as builder
WORKDIR /build

COPY package.json package.json

# yarn.lock is a fingerprint for the next RUN instruction - CACHE
COPY yarn.lock yarn.lock
RUN yarn install \
  --no-progress \
  --non-interactive \
  --emoji true

# entire app data is a fingerprint for the next RUN instruction - NO CACHE here because application source code always changes
COPY . .
RUN yarn build
RUN yarn install --production

# ---- STAGE 2 - final image stage ----
FROM node:14-alpine
WORKDIR /app

COPY --from=builder /build/node_modules/ ./node_modules
COPY --from=builder /build/dist ./dist

CMD ["node", "dist/src/main"]
