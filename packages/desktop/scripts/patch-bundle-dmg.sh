#!/usr/bin/env bash
# Background watcher: patches bundle_dmg.sh the instant tauri writes it,
# making AppleScript failures non-fatal (fixes macOS -1743 Automation error).

SCRIPT_PATH="$(cd "$(dirname "$0")/.." && pwd)/src-tauri/target/release/bundle/dmg/bundle_dmg.sh"

patch_script() {
  python3 - "$SCRIPT_PATH" <<'EOF'
import sys

path = sys.argv[1]
with open(path, 'r') as f:
    content = f.read()

old = '''\t\tif /usr/bin/osascript "${APPLESCRIPT_FILE}" "${VOLUME_NAME}"; then
\t\t\t# Okay, we're cool
\t\t\ttrue
\t\t\telse
\t\t\techo >&2 "Failed running AppleScript"
\t\t\thdiutil_detach_retry "${DEV_NAME}"
\t\t\texit 64
\t\tfi'''

new = '''\t\tif /usr/bin/osascript "${APPLESCRIPT_FILE}" "${VOLUME_NAME}"; then
\t\t\t# Okay, we're cool
\t\t\ttrue
\t\t\telse
\t\t\techo >&2 "Warning: AppleScript failed (no Automation permission for Finder). Continuing without DMG styling."
\t\tfi'''

# Use a simpler line-by-line approach
lines = content.split('\n')
out = []
skip_next = False
i = 0
while i < len(lines):
    line = lines[i]
    if 'echo >&2 "Failed running AppleScript"' in line:
        out.append('\t\t\techo >&2 "Warning: AppleScript failed (no Automation permission for Finder). Continuing without DMG styling."')
        i += 1
        # Skip the next two lines: hdiutil_detach_retry and exit 64
        while i < len(lines) and ('hdiutil_detach_retry' in lines[i] or 'exit 64' in lines[i]):
            i += 1
        continue
    out.append(line)
    i += 1

with open(path, 'w') as f:
    f.write('\n'.join(out))

print(f"[patch-bundle-dmg] Successfully patched {path}")
EOF
}

echo "[patch-bundle-dmg] Watching for bundle_dmg.sh..."
for i in $(seq 1 600); do
  if [ -f "$SCRIPT_PATH" ] && grep -q 'exit 64' "$SCRIPT_PATH" 2>/dev/null; then
    patch_script
    exit 0
  fi
  sleep 0.1
done
echo "[patch-bundle-dmg] Timed out waiting for bundle_dmg.sh"
exit 0
