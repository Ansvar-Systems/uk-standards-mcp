# UK Standards MCP

[![npm version](https://img.shields.io/npm/v/@ansvar/uk-standards-mcp)](https://www.npmjs.com/package/@ansvar/uk-standards-mcp)
[![CI](https://github.com/Ansvar-Systems/uk-standards-mcp/actions/workflows/ci.yml/badge.svg)](https://github.com/Ansvar-Systems/uk-standards-mcp/actions/workflows/ci.yml)
[![License](https://img.shields.io/badge/license-Apache--2.0-blue)](LICENSE)
[![MCP Registry](https://img.shields.io/badge/MCP%20Registry-ansvar.ai%2Fmcp-blue)](https://ansvar.ai/mcp)

Structured access to UK government cybersecurity standards: NCSC Cyber Essentials, Cyber Assessment Framework (CAF), Cloud Security Principles, 10 Steps to Cyber Security, NHS Data Security and Protection Toolkit (DSPT), and NCSC Board Toolkit. FTS5 search, ISO 27002 cross-references, and sector-based filtering.

Part of the [Ansvar MCP Network](https://ansvar.ai/mcp) — specialist MCP servers for compliance and security intelligence.

---

## Quick Start

### Remote endpoint (no installation)

Add to your MCP client config:

```json
{
  "mcpServers": {
    "uk-standards": {
      "url": "https://uk-standards-mcp.vercel.app/mcp"
    }
  }
}
```

### Local (stdio via npx)

**Claude Desktop** — edit `~/Library/Application Support/Claude/claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "uk-standards": {
      "command": "npx",
      "args": ["-y", "@ansvar/uk-standards-mcp"]
    }
  }
}
```

**Cursor** — edit `.cursor/mcp.json` in your project:

```json
{
  "mcpServers": {
    "uk-standards": {
      "command": "npx",
      "args": ["-y", "@ansvar/uk-standards-mcp"]
    }
  }
}
```

**VS Code / GitHub Copilot** — add to `.vscode/mcp.json`:

```json
{
  "servers": {
    "uk-standards": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@ansvar/uk-standards-mcp"]
    }
  }
}
```

---

## What's Included

| Source | Authority | Items | Refresh |
|--------|-----------|-------|---------|
| NCSC Cyber Essentials (Willow) | NCSC-UK | 16 controls | Annual |
| NCSC Cyber Assessment Framework (CAF) v3.2 | NCSC-UK | 36 controls | Annual |
| NCSC Cloud Security Principles | NCSC-UK | 14 principles | Annual |
| NCSC 10 Steps to Cyber Security | NCSC-UK | 23 controls | Annual |
| NHS Data Security and Protection Toolkit (DSPT) | NHS Digital / DHSC | 30 assertions | Annual |
| NCSC Board Toolkit | NCSC-UK | 12 controls | Annual |

**Total:** 131 controls and requirements across 6 frameworks.

For full coverage details, see [COVERAGE.md](COVERAGE.md).

---

## Available Tools

| Tool | Category | Description |
|------|----------|-------------|
| `search_controls` | Search | Full-text search across all 6 frameworks. Returns controls ranked by FTS5 relevance. |
| `search_by_sector` | Search | Returns frameworks for a sector (`government`, `healthcare`, `energy`, etc.), optionally filtered by keyword. |
| `get_control` | Lookup | Full record for a single control: description, implementation guidance, ISO mapping. |
| `get_framework` | Lookup | Metadata for a framework: issuing body, version, control count, category breakdown. |
| `list_controls` | Lookup | All controls in a framework, filterable by category. Paginated. |
| `compare_controls` | Comparison | Side-by-side comparison of the same topic across 2-4 frameworks. |
| `get_iso_mapping` | Comparison | All UK controls mapped to a given ISO 27002 control reference. |
| `list_frameworks` | Meta | Lists all frameworks in the database with summary stats. |
| `about` | Meta | Server version, build date, and coverage statistics. |
| `list_sources` | Meta | Data provenance: authority, standard name, retrieval method, license for each source. |
| `check_data_freshness` | Meta | Per-source freshness status against the expected refresh schedule. |

For full parameter documentation, return formats, and examples, see [TOOLS.md](TOOLS.md).

---

## Data Sources & Freshness

| Source | Last Refresh | Refresh Schedule |
|--------|-------------|-----------------|
| NCSC Cyber Essentials | 2026-03-12 | Annual |
| NCSC CAF | 2026-03-12 | Annual |
| NCSC Cloud Security Principles | 2026-03-12 | Annual |
| NCSC 10 Steps | 2026-03-12 | Annual |
| NHS DSPT | 2026-03-12 | Annual |
| NCSC Board Toolkit | 2026-03-12 | Annual |

To check freshness at runtime, call `check_data_freshness`. Full source provenance and licenses: [sources.yml](sources.yml).

---

## Security

This repository runs 6-layer automated security scanning on every push and weekly:

| Layer | Tool | What it checks |
|-------|------|----------------|
| Static analysis | CodeQL | Code vulnerabilities |
| SAST | Semgrep | Security anti-patterns |
| Container / dependency scan | Trivy | Known CVEs in dependencies |
| Secret detection | Gitleaks | Leaked credentials |
| Supply chain | OSSF Scorecard | Repository security posture |
| Dependency updates | Dependabot | Automated dependency PRs |

---

## Disclaimer

**THIS TOOL IS NOT PROFESSIONAL ADVICE.**

This MCP provides structured access to UK cybersecurity standards sourced from authoritative NCSC and NHS publications. It is provided for informational and research purposes only.

- Verify critical compliance decisions against the original standards
- Data is a snapshot — sources update, and there may be a delay between upstream changes and database refresh
- See [DISCLAIMER.md](DISCLAIMER.md) for the full disclaimer and no-warranty statement

---

## Ansvar MCP Network

This server is part of the [Ansvar MCP Network](https://ansvar.ai/mcp) — 149 specialist MCP servers covering legislation, compliance frameworks, and cybersecurity standards.

| Category | Servers | Coverage |
|----------|---------|----------|
| Law MCPs | 108 | 119 countries, 668K+ laws |
| EU Regulations | 1 | 61 regulations, 4,054 articles |
| Security frameworks | 1 | 262 frameworks, 1,451 SCF controls |
| Domain-specific | ~48 | CVE, STRIDE, sanctions, OWASP, healthcare, financial, and more |

Browse the full directory at [ansvar.ai/mcp](https://ansvar.ai/mcp).

---

## Development

### Branch strategy

`feature-branch -> PR to dev -> verify on dev -> PR to main -> deploy`

Never push directly to `main`. `main` triggers npm publish and Vercel deployment.

### Setup

```bash
git clone https://github.com/Ansvar-Systems/uk-standards-mcp.git
cd uk-standards-mcp
npm install
npm run build
npm test
```

### Ingestion

```bash
# Full pipeline: fetch -> build DB -> update coverage
npm run ingest:full

# Individual steps
npm run ingest:fetch     # Run all ingestion scripts
npm run build:db         # Rebuild SQLite database
npm run coverage:update  # Regenerate coverage.json and COVERAGE.md

# Check freshness
npm run freshness:check
```

### Pre-deploy verification

```bash
npm run build            # Gate 1: build
npm run lint             # Gate 2: TypeScript strict
npm test                 # Gate 3: unit tests
npm run test:contract    # Gate 4: golden contract tests
npm run coverage:verify  # Gate 6: coverage consistency
```

---

## License & Data Licenses

**Code:** [Apache-2.0](LICENSE)

**Data licenses by source:**

| Source | License |
|--------|---------|
| NCSC Cyber Essentials | Open Government Licence v3.0 |
| NCSC CAF | Open Government Licence v3.0 |
| NCSC Cloud Security Principles | Open Government Licence v3.0 |
| NCSC 10 Steps | Open Government Licence v3.0 |
| NHS DSPT | Open Government Licence v3.0 |
| NCSC Board Toolkit | Open Government Licence v3.0 |

All data is extracted from publicly available UK government publications. Zero AI-generated content in the database. See [sources.yml](sources.yml) for complete provenance.
