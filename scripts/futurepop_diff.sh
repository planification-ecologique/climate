#!/usr/bin/env bash
# Compute FuturePop diff grids: 2050 minus 2025 for SSP2 and SSP4
# Crops to France first for faster processing
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
DATA_DIR="$REPO_ROOT/data"
OUT_DIR="$DATA_DIR/FuturePop_diff"
TMP_DIR="$OUT_DIR/tmp"
mkdir -p "$OUT_DIR" "$TMP_DIR"

# France bounding box (WGS84)
BBOX="-5.5 41.0 9.9 51.7"  # minLon minLat maxLon maxLat

for SSP in SSP2 SSP4; do
  SRC_DIR="$DATA_DIR/FuturePop_${SSP}_1km_v0_2"
  FILE_2025="$SRC_DIR/FuturePop_${SSP}_2025_1km_v0_2.tif"
  FILE_2050="$SRC_DIR/FuturePop_${SSP}_2050_1km_v0_2.tif"
  OUT_FILE="$OUT_DIR/FuturePop_${SSP}_diff_2050_minus_2025_france.tif"

  if [ ! -f "$FILE_2025" ] || [ ! -f "$FILE_2050" ]; then
    echo "SKIP $SSP: missing source files in $SRC_DIR"
    continue
  fi

  echo "[$SSP] Cropping 2025 to France..."
  CROP_2025="$TMP_DIR/${SSP}_2025_france.tif"
  gdal_translate -projwin -5.5 51.7 9.9 41.0 "$FILE_2025" "$CROP_2025" -q

  echo "[$SSP] Cropping 2050 to France..."
  CROP_2050="$TMP_DIR/${SSP}_2050_france.tif"
  gdal_translate -projwin -5.5 51.7 9.9 41.0 "$FILE_2050" "$CROP_2050" -q

  echo "[$SSP] Computing diff (2050 - 2025)..."
  gdal_calc.py \
    -A "$CROP_2050" \
    -B "$CROP_2025" \
    --outfile="$OUT_FILE" \
    --calc="A-B" \
    --type=Float32 \
    --NoDataValue=-9999 \
    --overwrite \
    --co="COMPRESS=DEFLATE" \
    --co="TILED=YES" \
    --quiet

  echo "  -> $OUT_FILE"
  gdalinfo -stats "$OUT_FILE" 2>&1 | grep -E "Size is|STATISTICS_(MINIMUM|MAXIMUM|MEAN|STDDEV)"
  echo ""

  # Cleanup temp files
  rm -f "$CROP_2025" "$CROP_2050"
done

rmdir "$TMP_DIR" 2>/dev/null || true
echo "Done."
