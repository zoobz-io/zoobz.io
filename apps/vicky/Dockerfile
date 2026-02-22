FROM node:22-alpine AS base
RUN corepack enable

FROM base AS deps
WORKDIR /app
COPY zoobz.io/package.json zoobz.io/pnpm-lock.yaml zoobz.io/pnpm-workspace.yaml ./zoobz.io/
COPY zoobz.io/apps/vicky/package.json ./zoobz.io/apps/vicky/
COPY foundation/apps/appula/package.json ./foundation/apps/appula/
COPY foundation/layers/blocks/package.json ./foundation/layers/blocks/
COPY foundation/packages/iconic/package.json ./foundation/packages/iconic/
COPY foundation/packages/untheme/package.json ./foundation/packages/untheme/
WORKDIR /app/zoobz.io
RUN pnpm install --frozen-lockfile --filter @zoobz/vicky...

FROM base AS build
WORKDIR /app
COPY --from=deps /app/zoobz.io/node_modules ./zoobz.io/node_modules
COPY --from=deps /app/zoobz.io/apps/vicky/node_modules ./zoobz.io/apps/vicky/node_modules
COPY --from=deps /app/foundation ./foundation
COPY zoobz.io ./zoobz.io
COPY foundation ./foundation
WORKDIR /app/zoobz.io/apps/vicky
RUN pnpm build

FROM node:22-alpine AS runtime
WORKDIR /app
COPY --from=build /app/zoobz.io/apps/vicky/.output ./
ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3000
EXPOSE 3000
CMD ["node", "server/index.mjs"]
