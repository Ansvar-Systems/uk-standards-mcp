// scripts/ingest-fetch.ts
// Orchestrates running all UK standards ingestion scripts.
// Each script embeds the control data directly (NCSC sources are HTML pages).

import { execFileSync } from 'node:child_process';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

interface FetchResult {
  script: string;
  source: string;
  success: boolean;
  error?: string;
  durationMs: number;
}

const SOURCES: { script: string; source: string }[] = [
  { script: join(__dirname, 'ingest-ncsc-ce.ts'), source: 'NCSC Cyber Essentials' },
  { script: join(__dirname, 'ingest-ncsc-caf.ts'), source: 'NCSC Cyber Assessment Framework (CAF)' },
  { script: join(__dirname, 'ingest-ncsc-cloud.ts'), source: 'NCSC Cloud Security Principles' },
  { script: join(__dirname, 'ingest-ncsc-10steps.ts'), source: 'NCSC 10 Steps to Cyber Security' },
  { script: join(__dirname, 'ingest-nhs-dspt.ts'), source: 'NHS Data Security and Protection Toolkit' },
  { script: join(__dirname, 'ingest-ncsc-board.ts'), source: 'NCSC Board Toolkit' },
];

function runScript(scriptPath: string): { success: boolean; error?: string; durationMs: number } {
  const start = Date.now();
  try {
    execFileSync(
      process.execPath,
      ['--import', 'tsx', scriptPath],
      {
        stdio: 'inherit',
        timeout: 120_000,
      }
    );
    return { success: true, durationMs: Date.now() - start };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    return { success: false, error: msg, durationMs: Date.now() - start };
  }
}

async function main(): Promise<void> {
  console.log('Ingest Fetch — UK Standards MCP');
  console.log('================================');
  console.log(`Running ${SOURCES.length} source ingestion scripts`);
  console.log('');

  const results: FetchResult[] = [];

  for (const { script, source } of SOURCES) {
    console.log(`--- Ingesting: ${source} ---`);
    const result = runScript(script);
    results.push({ script, source, ...result });
    console.log('');
  }

  // Summary
  console.log('=============================');
  console.log('Fetch Summary');
  console.log('=============================');

  const succeeded = results.filter((r) => r.success);
  const failed = results.filter((r) => !r.success);

  console.log(`\nSources:`);
  for (const r of results) {
    const status = r.success ? 'OK' : 'FAILED';
    const duration = (r.durationMs / 1000).toFixed(1);
    console.log(`  [${status}] ${r.source} (${duration}s)`);
    if (!r.success && r.error) {
      console.log(`         ${r.error.split('\n')[0]}`);
    }
  }

  console.log('');
  console.log(`Result: ${succeeded.length}/${SOURCES.length} sources ingested successfully`);

  if (failed.length > 0) {
    console.error(`\n${failed.length} source(s) failed. Check output above.`);
    process.exit(1);
  }

  console.log('Done.');
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
