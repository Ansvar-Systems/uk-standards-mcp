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
  // NCSC frameworks
  { script: join(__dirname, 'ingest-ncsc-ce.ts'), source: 'NCSC Cyber Essentials' },
  { script: join(__dirname, 'ingest-ncsc-ceplus.ts'), source: 'NCSC Cyber Essentials Plus' },
  { script: join(__dirname, 'ingest-ncsc-caf.ts'), source: 'NCSC Cyber Assessment Framework (CAF)' },
  { script: join(__dirname, 'ingest-ncsc-cloud.ts'), source: 'NCSC Cloud Security Principles' },
  { script: join(__dirname, 'ingest-ncsc-10steps.ts'), source: 'NCSC 10 Steps to Cyber Security' },
  { script: join(__dirname, 'ingest-ncsc-board.ts'), source: 'NCSC Board Toolkit' },
  { script: join(__dirname, 'ingest-ncsc-scg.ts'), source: 'NCSC Supply Chain Security Guidance' },
  { script: join(__dirname, 'ingest-ncsc-zt.ts'), source: 'NCSC Zero Trust Architecture' },
  { script: join(__dirname, 'ingest-ncsc-email.ts'), source: 'NCSC Email Security and Anti-Spoofing' },
  { script: join(__dirname, 'ingest-ncsc-tls.ts'), source: 'NCSC TLS Configuration Guidance' },
  { script: join(__dirname, 'ingest-ncsc-passwords.ts'), source: 'NCSC Password Administration Guidance' },
  { script: join(__dirname, 'ingest-ncsc-sdp.ts'), source: 'NCSC Secure Design Principles' },
  { script: join(__dirname, 'ingest-ncsc-iam.ts'), source: 'NCSC Identity and Access Management' },
  { script: join(__dirname, 'ingest-ncsc-logging.ts'), source: 'NCSC Logging and Protective Monitoring' },
  { script: join(__dirname, 'ingest-ncsc-incident.ts'), source: 'NCSC Incident Management Guidance' },
  { script: join(__dirname, 'ingest-ncsc-byod.ts'), source: 'NCSC BYOD Guidance' },
  // Government standards
  { script: join(__dirname, 'ingest-gds-techcode.ts'), source: 'GDS Technology Code of Practice' },
  { script: join(__dirname, 'ingest-gds-servicestandard.ts'), source: 'GDS Service Standard' },
  { script: join(__dirname, 'ingest-hmg-mcss.ts'), source: 'HMG Minimum Cyber Security Standard' },
  { script: join(__dirname, 'ingest-gov-cgcop.ts'), source: 'Cyber Governance Code of Practice' },
  // Regulatory frameworks
  { script: join(__dirname, 'ingest-nisr.ts'), source: 'UK NIS Regulations 2018' },
  { script: join(__dirname, 'ingest-ofcom-tsa.ts'), source: 'OFCOM Telecoms Security Code of Practice' },
  // Healthcare
  { script: join(__dirname, 'ingest-nhs-dspt.ts'), source: 'NHS Data Security and Protection Toolkit' },
  { script: join(__dirname, 'ingest-nhs-dcb0129.ts'), source: 'DCB0129 Clinical Risk Management (Manufacturers)' },
  { script: join(__dirname, 'ingest-nhs-dcb0160.ts'), source: 'DCB0160 Clinical Risk Management (Health Organisations)' },
  // Financial services
  { script: join(__dirname, 'ingest-pra-opres.ts'), source: 'PRA Operational Resilience (SS1/21)' },
  { script: join(__dirname, 'ingest-fca-sysc.ts'), source: 'FCA SYSC 13 Operational Risk' },
  // Defence
  { script: join(__dirname, 'ingest-mod-defstan.ts'), source: 'Def Stan 05-138 Cyber Security for Defence Suppliers' },
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
