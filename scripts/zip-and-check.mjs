// scripts/zip-and-check.mjs
import zl from 'zip-lib';
import { statSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const DIST = 'dist';
const OUT_ZIP = join(DIST, 'game.zip');
const LIMIT = 13 * 1024; // 13 KB

async function main() {
  const html = join(DIST, 'index.html');
  if (!existsSync(html)) {
    console.error('Build not found. Expected dist/index.html');
    process.exit(1);
  }

  // Create zip containing index.html
  await zl.archiveFile(html, OUT_ZIP);

  const size = statSync(OUT_ZIP).size;
  const kb = (size / 1024).toFixed(2);
  const ok = size <= LIMIT;
  console.log(`\nZIP size: ${kb} KB (${size} bytes) — ${ok ? 'OK ✅' : 'TOO BIG ❌'}`);
  if (!ok) process.exitCode = 2;
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});