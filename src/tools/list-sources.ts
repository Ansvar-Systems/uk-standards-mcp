// src/tools/list-sources.ts
import { readFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { successResponse } from '../response-meta.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

interface SourceEntry {
  id: string;
  authority: string;
  name: string;
  retrieval_method: string;
  license: string;
  url?: string;
}

const FALLBACK_SOURCES: SourceEntry[] = [
  {
    id: 'NCSC-CE',
    authority: 'National Cyber Security Centre (NCSC-UK)',
    name: 'Cyber Essentials',
    retrieval_method: 'Manual extraction (HTML)',
    license: 'Open Government Licence v3.0',
    url: 'https://www.ncsc.gov.uk/cyberessentials/overview',
  },
  {
    id: 'NCSC-CAF',
    authority: 'National Cyber Security Centre (NCSC-UK)',
    name: 'Cyber Assessment Framework (CAF) v3.2',
    retrieval_method: 'Manual extraction (HTML)',
    license: 'Open Government Licence v3.0',
    url: 'https://www.ncsc.gov.uk/collection/caf',
  },
  {
    id: 'NCSC-Cloud',
    authority: 'National Cyber Security Centre (NCSC-UK)',
    name: 'Cloud Security Principles',
    retrieval_method: 'Manual extraction (HTML)',
    license: 'Open Government Licence v3.0',
    url: 'https://www.ncsc.gov.uk/collection/cloud/the-cloud-security-principles',
  },
  {
    id: 'NCSC-10Steps',
    authority: 'National Cyber Security Centre (NCSC-UK)',
    name: '10 Steps to Cyber Security',
    retrieval_method: 'Manual extraction (HTML)',
    license: 'Open Government Licence v3.0',
    url: 'https://www.ncsc.gov.uk/collection/10-steps',
  },
  {
    id: 'NHS-DSPT',
    authority: 'NHS Digital / DHSC',
    name: 'Data Security and Protection Toolkit (DSPT)',
    retrieval_method: 'Manual extraction (HTML)',
    license: 'Open Government Licence v3.0',
    url: 'https://www.dsptoolkit.nhs.uk/',
  },
  {
    id: 'NCSC-Board',
    authority: 'National Cyber Security Centre (NCSC-UK)',
    name: 'Board Toolkit',
    retrieval_method: 'Manual extraction (HTML)',
    license: 'Open Government Licence v3.0',
    url: 'https://www.ncsc.gov.uk/collection/board-toolkit',
  },
];

export function handleListSources() {
  let sources: SourceEntry[] = FALLBACK_SOURCES;

  const sourcesPath = join(__dirname, '..', '..', 'sources.yml');
  if (existsSync(sourcesPath)) {
    try {
      const raw = readFileSync(sourcesPath, 'utf-8');
      void raw; // file read but not parsed without yaml dep
    } catch {
      // Ignore read errors — use fallback
    }
  }

  const lines: string[] = [];

  lines.push('## Data Sources');
  lines.push('');
  lines.push(
    'This MCP server aggregates UK cybersecurity standards from the following authoritative sources:'
  );
  lines.push('');
  lines.push('| ID | Authority | Standard / Document | Retrieval method | License |');
  lines.push('|----|-----------|---------------------|-----------------|---------|');

  for (const src of sources) {
    const nameCell = src.url ? `[${src.name}](${src.url})` : src.name;
    lines.push(`| ${src.id} | ${src.authority} | ${nameCell} | ${src.retrieval_method} | ${src.license} |`);
  }

  lines.push('');
  lines.push(`**Total sources:** ${sources.length}`);
  lines.push('');
  lines.push(
    '> All data is extracted from authoritative UK government publications. ' +
    'This tool is a reference aid — verify critical compliance decisions against the originals.'
  );

  return successResponse(lines.join('\n'));
}
