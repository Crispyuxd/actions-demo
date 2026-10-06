#!/usr/bin/env bash
# Build the widget-demos handover bundle from src/.
#
# Output:
#   widget-demos-handover/    Clean source folder (gitignored)
#   widget-demos-v<VER>.zip   Zip artifact ready to send to consumers
#
# Bump VERSION below when shipping a new drop. Tag the matching git
# commit (`git tag widget-demos-v1.0.0 && git push --tags`) so the
# zip is reproducible from the repo.

set -euo pipefail

VERSION="1.2.0"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
OUT="$ROOT/widget-demos-handover"
ZIP="$ROOT/widget-demos-v${VERSION}.zip"

echo "▶ Cleaning previous build..."
rm -rf "$OUT" "$ZIP"
mkdir -p "$OUT"/{components,hooks,lib,demos,styles,icons}

echo "▶ Copying source..."
cp -r "$ROOT/src/components/." "$OUT/components/"
cp "$ROOT/src/hooks/useTimeline.ts" "$OUT/hooks/"
cp "$ROOT/src/lib/"*.ts "$OUT/lib/"
cp "$ROOT/src/app/globals.css" "$OUT/styles/tokens.css"
# Components import inline-SVG icons from `@/icons` — must ship them or
# every consumer build breaks with TS2307 on `@/icons` and at runtime
# on the missing module. Bundled as a folder mirroring the src layout.
cp -r "$ROOT/src/icons/." "$OUT/icons/"

# This drop ships only the four commerce demos. shopify-widget also holds
# the WidgetChrome/WidgetIcons the three order demos import.
for d in shopify-widget order-lookup order-cancellation replacement-order; do
  cp -r "$ROOT/src/app/demos/$d" "$OUT/demos/"
done

# Demos load images by absolute URL (`/shopify/...`, `/order-lookup/...`,
# `/replacement-order/...`), so these files must sit at the consumer's
# public root. Shipped under public/ for a straight copy.
mkdir -p "$OUT/public"
for a in shopify order-lookup replacement-order; do
  cp -r "$ROOT/public/$a" "$OUT/public/"
done

echo "▶ Writing package.json + README + INTEGRATION.md + index.ts..."
# These four files are not regenerated automatically — they live in
# scripts/handover-templates/ and get copied verbatim. Edit them there
# if you need to update the public API surface or docs.
cp "$ROOT/scripts/handover-templates/index.ts"        "$OUT/index.ts"
cp "$ROOT/scripts/handover-templates/package.json"    "$OUT/package.json"
cp "$ROOT/scripts/handover-templates/README.md"       "$OUT/README.md"
cp "$ROOT/scripts/handover-templates/INTEGRATION.md"  "$OUT/INTEGRATION.md"

echo "▶ Zipping..."
cd "$ROOT"
if command -v zip >/dev/null 2>&1; then
  cd "$OUT" && zip -rq "$ZIP" . && cd "$ROOT"
else
  # Windows: bsdtar ships with Windows 10+ and writes forward-slash entry
  # names. PowerShell 5.1's Compress-Archive writes backslashes, which
  # extract as flat "demos\x\page.tsx" files on macOS/Linux.
  # Called by full path: Git Bash's own `tar` is GNU tar, which can't
  # write zips. Relative paths sidestep its "C:" remote-host parsing.
  # Entries are listed by name, not ".": a "./" prefix on every entry makes
  # Windows Explorer reject the whole zip as invalid.
  BSDTAR="$(cygpath -u "${SYSTEMROOT:-C:\\Windows}")/System32/tar.exe"
  ( cd "$OUT" && "$BSDTAR" -a -c -f "../$(basename "$ZIP")" * )
fi

SIZE=$(du -h "$ZIP" | cut -f1)
echo "✓ Built $ZIP ($SIZE)"
