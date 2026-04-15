#!/usr/bin/env bash
set -euo pipefail

if [ -z "${1:-}" ]; then
  echo "Usage: ./scripts/deploy-docs.sh <site>"
  echo "Example: ./scripts/deploy-docs.sh sentinel"
  exit 1
fi

SITE="$1"
SITE_DIR="sites/docs/$SITE"

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
