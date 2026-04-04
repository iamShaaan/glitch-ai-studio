import sharp from "sharp";
import { existsSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const INPUT_DIR = join(ROOT, "public", "sequence");
const OUTPUT_DIR = join(ROOT, "public", "sequence-webp");
const FRAME_COUNT = 304;
const CONCURRENCY = 10;
const TARGET_WIDTH = 1280;
const WEBP_QUALITY = 82;

if (!existsSync(OUTPUT_DIR)) {
  mkdirSync(OUTPUT_DIR, { recursive: true });
}

let converted = 0;
let errors = 0;
const startTime = Date.now();

async function convertFrame(i) {
  const input = join(INPUT_DIR, `frame_${i}.jpeg`);
  const output = join(OUTPUT_DIR, `frame_${i}.webp`);

  if (!existsSync(input)) {
    errors++;
    return;
  }

  try {
    await sharp(input)
      .resize(TARGET_WIDTH, null, { withoutEnlargement: true })
      .webp({ quality: WEBP_QUALITY, effort: 4 })
      .toFile(output);

    converted++;
    if (converted % 30 === 0 || converted === FRAME_COUNT) {
      const pct = ((converted / FRAME_COUNT) * 100).toFixed(0);
      const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
      console.log(`[${pct}%] ${converted}/${FRAME_COUNT} frames converted (${elapsed}s elapsed)`);
    }
  } catch (err) {
    errors++;
    console.error(`Error converting frame ${i}:`, err.message);
  }
}

// Run in batches of CONCURRENCY
async function run() {
  console.log(`Converting ${FRAME_COUNT} frames → WebP at ${TARGET_WIDTH}px wide, quality ${WEBP_QUALITY}...`);
  console.log(`Output: ${OUTPUT_DIR}\n`);

  const indices = Array.from({ length: FRAME_COUNT }, (_, i) => i);

  for (let i = 0; i < indices.length; i += CONCURRENCY) {
    const batch = indices.slice(i, i + CONCURRENCY);
    await Promise.all(batch.map(convertFrame));
  }

  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
  console.log(`\n✅ Done in ${elapsed}s`);
  console.log(`   Converted: ${converted}, Errors: ${errors}`);
  
  // Report size savings
  const { execSync } = await import("child_process");
  try {
    const oldSize = execSync(`du -sh "${INPUT_DIR}"`).toString().split("\t")[0];
    const newSize = execSync(`du -sh "${OUTPUT_DIR}"`).toString().split("\t")[0];
    console.log(`   Old JPEG size: ${oldSize}`);
    console.log(`   New WebP size: ${newSize}`);
  } catch {}
}

run().catch(console.error);
