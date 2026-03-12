# UK Standards MCP

[![npm version](https://img.shields.io/npm/v/@ansvar/uk-standards-mcp)](https://www.npmjs.com/package/@ansvar/uk-standards-mcp)
[![CI](https://github.com/Ansvar-Systems/uk-standards-mcp/actions/workflows/ci.yml/badge.svg)](https://github.com/Ansvar-Systems/uk-standards-mcp/actions/workflows/ci.yml)
[![License](https://img.shields.io/badge/license-Apache--2.0-blue)](LICENSE)
[![MCP Registry](https://img.shields.io/badge/MCP%20Registry-ansvar.ai%2Fmcp-blue)](https://ansvar.ai/mcp)

Structured access to 28 UK government cybersecurity standards and frameworks: NCSC publications (Cyber Essentials, CAF, Cloud Security, Zero Trust, and 13 more), GDS standards, HMG Minimum Cyber Security Standard, NIS Regulations, NHS clinical risk management, PRA/FCA financial resilience, OFCOM telecoms security, and MOD Def Stan 05-138. FTS5 search, ISO 27002 cross-references, and sector-based filtering across government, healthcare, finance, energy, telecoms, and defence.

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

### NCSC Publications (17 frameworks)

| Source | Items | Refresh |
|--------|-------|---------|
| Cyber Essentials (Willow) | 16 controls | Annual |
| Cyber Essentials Plus | 13 controls | Annual |
| Cyber Assessment Framework (CAF) v3.2 | 36 controls | Annual |
| Cloud Security Principles | 14 principles | Annual |
| 10 Steps to Cyber Security | 23 controls | Annual |
| Board Toolkit | 12 controls | Annual |
| Supply Chain Security Guidance | 12 principles | Annual |
| Zero Trust Architecture | 8 principles | Annual |
| Email Security and Anti-Spoofing | 8 controls | Annual |
| TLS Configuration Guidance | 7 controls | Annual |
| Password Administration | 8 controls | Annual |
| Secure Design Principles | 12 principles | Annual |
| Identity and Access Management | 8 controls | Annual |
| Logging and Protective Monitoring | 10 controls | Annual |
| Incident Management | 10 controls | Annual |
| BYOD Guidance | 6 controls | Annual |
| NHS DSPT | 30 assertions | Annual |

### Government, Regulatory, Financial, Healthcare, Defence (11 frameworks)

| Source | Authority | Items | Refresh |
|--------|-----------|-------|---------|
| GDS Technology Code of Practice | GDS | 12 points | Annual |
| GDS Service Standard | GDS | 14 points | Annual |
| HMG Minimum Cyber Security Standard | Cabinet Office | 10 requirements | Annual |
| Cyber Governance Code of Practice | DSIT | 9 actions | Annual |
| UK NIS Regulations 2018 | DSIT | 7 obligations | 5-year |
| OFCOM Telecoms Security Code | OFCOM | 8 measures | Annual |
| NHS DCB0129 (Clinical Risk - Manufacturers) | NHS Digital | 7 requirements | 5-year |
| NHS DCB0160 (Clinical Risk - Health Orgs) | NHS Digital | 5 requirements | 5-year |
| PRA Operational Resilience (SS1/21) | PRA / BoE | 8 requirements | Annual |
| FCA SYSC 13 Operational Risk | FCA | 7 requirements | Annual |
| Def Stan 05-138 (Defence Suppliers) | MOD | 8 requirements | 5-year |

**Total:** 328 controls and requirements across 28 frameworks.

For full coverage details, see [COVERAGE.md](COVERAGE.md).

---

## Available Tools

| Tool | Category | Description |
|------|----------|-------------|
| `search_controls` | Search | Full-text search across all 28 frameworks. Returns controls ranked by FTS5 relevance. |
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

All 28 sources were last refreshed on 2026-03-12. Sources with annual refresh schedules are next due 2027-03-12. Sources on a 5-year cycle (NIS Regulations, DCB0129, DCB0160, Def Stan 05-138) are next due 2031-03-12.

To check freshness at runtime, call `check_data_freshness`. Full source provenance and licenses: [sources.yml](sources.yml). Full freshness schedule: [COVERAGE.md](COVERAGE.md#data-freshness-schedule).

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

All 28 sources are published under the **Open Government Licence v3.0** by UK government bodies (NCSC, GDS, Cabinet Office, DSIT, OFCOM, NHS Digital, PRA, FCA, MOD). Free to use with attribution.

All data is extracted from publicly available UK government publications. Zero AI-generated content in the database. See [sources.yml](sources.yml) for complete provenance.
