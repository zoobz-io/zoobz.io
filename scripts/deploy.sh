#!/usr/bin/env bash
set -euo pipefail

if [ -z "${1:-}" ]; then
  echo "Usage: ./scripts/deploy.sh <site>"
  echo "Examples:"
  echo "  ./scripts/deploy.sh sentinel    # deploys sites/docs/sentinel"
  echo "  ./scripts/deploy.sh blog        # deploys sites/blog"
  exit 1
fi

SITE="$1"

if [ "$SITE" = "blog" ]; then
  SITE_DIR="sites/blog"
else
  SITE_DIR="sites/docs/$SITE"
fi

if [ ! -d "$SITE_DIR" ]; then
  echo "Error: $SITE_DIR does not exist"
  exit 1
fi

echo "==> Linking Vercel project for $SITE"
vercel link --project "zoobz-io-$SITE" --yes

echo "==> Cleaning .vercel/output/static"
rm -rf .vercel/output/static

echo "==> Building $SITE"
pnpm "$SITE:build"

echo "==> Generating $SITE"
pnpm "$SITE:generate"

echo "==> Copying output to .vercel/output/static"
mkdir -p .vercel/output
cp -r "$SITE_DIR/.output/public" .vercel/output/static

echo "==> Deploying to Vercel"
vercel deploy --prebuilt --prod

echo "==> Done"
