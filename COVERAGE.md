# Coverage -- UK Standards MCP

> Last verified: 2026-03-12 | Database version: 0.1.0

This document declares exactly what data the UK Standards MCP contains, what it does not contain, and the limitations of each source. It is the contract with users.

---

## What's Included

| Source | Authority | Items | Version / Date | Completeness | Refresh |
|--------|-----------|-------|----------------|-------------|---------|
| NCSC Cyber Essentials (Willow) | NCSC-UK | 16 controls | Willow (2024) | Full | Annual |
| NCSC Cyber Assessment Framework (CAF) | NCSC-UK | 36 controls | 3.2 (2024) | Full | Annual |
| NCSC Cloud Security Principles | NCSC-UK | 14 principles | 2024 | Full | Annual |
| NCSC 10 Steps to Cyber Security | NCSC-UK | 23 controls | 2021 | Full | Annual |
| NHS Data Security and Protection Toolkit (DSPT) | NHS Digital / DHSC | 30 assertions | 2024-25 | Full | Annual |
| NCSC Board Toolkit | NCSC-UK | 12 controls | 2023 | Full | Annual |

**Total:** 11 tools, 131 controls/requirements, database built from 6 authoritative UK sources.

---

## What's NOT Included

| Gap | Reason | Planned? |
|-----|--------|----------|
| NCSC CYOD / BYOD Guidance | Device management guidance -- operational advice, not a control framework | No |
| NCSC Secure Design Principles | Architecture guidance -- not structured as auditable controls | No |
| NCSC Supply Chain Security Guidance | Supply chain guidance -- operational advice, not structured controls | No |
| Cyber Governance Code of Practice | Published 2025 -- pending assessment for inclusion | Yes -- v0.2 |
| NIS Regulations 2018 (UK NIS) | Regulatory framework implemented via CAF -- CAF controls are included | No |
| ISO/IEC 27001:2022 (full standard) | Commercial ISO standard -- reference mappings included via `iso_mapping` field, full text excluded | No |
| CIS Controls v8 | International framework -- out of scope for UK-specific MCP | No |
| PCI DSS v4.0 | International payment standard -- out of scope for UK government focus | No |
| NIST Cybersecurity Framework | US framework -- out of scope for UK-specific MCP | No |

---

## Limitations

- **Snapshot data, not live.** The database is a point-in-time extract. Standards may be updated between database rebuilds. The `check_data_freshness` tool reports the last-fetched date for each source.
- **ISO mapping is partial.** Not all controls have `iso_mapping` populated. NCSC CAF has the most complete ISO 27002 mapping; other frameworks have varying coverage. `get_iso_mapping` only returns controls with an explicit mapping.
- **English only.** All controls have English titles and descriptions. The `title_nl` field mirrors the English title (no Dutch translations).
- **No case law or enforcement decisions.** The database contains normative controls only, not ICO enforcement notices, tribunal decisions, or regulator guidance letters.
- **Sector metadata may be incomplete.** Frameworks are tagged with `scope_sectors` values during ingestion. If a framework's sector coverage is broader than what's tagged, `search_by_sector` may not surface it.
- **Not a legal opinion.** Compliance with these standards is not verified by this tool. The tool provides structured access to control text -- whether a specific system or process meets a control is a judgment that requires qualified assessment.

---

## Data Freshness Schedule

| Source | Refresh Schedule | Last Refresh | Next Expected |
|--------|-----------------|-------------|---------------|
| NCSC Cyber Essentials | Annual | 2026-03-12 | 2027-01-01 |
| NCSC CAF | Annual | 2026-03-12 | 2027-01-01 |
| NCSC Cloud Security Principles | Annual | 2026-03-12 | 2027-01-01 |
| NCSC 10 Steps | Annual | 2026-03-12 | 2027-01-01 |
| NHS DSPT | Annual | 2026-03-12 | 2027-01-01 |
| NCSC Board Toolkit | Annual | 2026-03-12 | 2027-01-01 |

To check current freshness status programmatically, call the `check_data_freshness` tool.

The ingestion pipeline (`ingest.yml`) runs on the most frequent source schedule. The `check-updates.yml` workflow runs daily and creates a GitHub issue if any source is overdue.

---

## Regulatory Mapping

This table maps UK regulations and laws to the frameworks in this MCP that implement or operationalize them.

| Regulation / Law | Relevant Frameworks | Notes |
|-----------------|---------------------|-------|
| Network and Information Systems Regulations 2018 (UK NIS) | NCSC CAF | CAF is the primary assessment framework for operators of essential services under NIS |
| UK GDPR / Data Protection Act 2018 | NHS DSPT, NCSC Cyber Essentials | Security of personal data -- Article 32 equivalent technical measures |
| Health and Social Care Act 2012 | NHS DSPT | Sets data security requirements for health and social care organisations |
| Computer Misuse Act 1990 | NCSC 10 Steps, NCSC Cyber Essentials | Baseline security measures to prevent unauthorized access |
| Telecommunications (Security) Act 2021 | NCSC CAF | Applies CAF-based assessment to telecoms providers |
| Financial Services and Markets Act 2000 | NCSC CAF, NCSC Board Toolkit | FCA/PRA regulated firms use CAF for operational resilience assessment |

---

## Sector-Specific Coverage

### Government (Central and Local)

- **Included:** NCSC Cyber Essentials (mandatory for government suppliers), NCSC CAF (critical national infrastructure), NCSC 10 Steps, NCSC Board Toolkit, NCSC Cloud Security Principles
- **Gap:** Government Functional Standard GovS 007 (Security) not included -- sets policy rather than technical controls

### Healthcare (NHS and Social Care)

- **Included:** NHS DSPT (30 assertions across 10 NDG standards), plus all NCSC frameworks
- **Gap:** NHS Secure Boundary not included -- operational implementation of Cyber Essentials for NHS
- **Gap:** DCB0129 / DCB0160 clinical risk management standards not included -- clinical safety, not cybersecurity

### Energy and Utilities

- **Included:** NCSC CAF (primary framework for OES under NIS Regulations)
- **Gap:** Ofgem Cyber Resilience guidelines not included -- regulatory interpretation of CAF for energy sector

### Financial Services

- **Included:** NCSC CAF, NCSC Board Toolkit (governance guidance for boards)
- **Gap:** FCA/PRA operational resilience requirements not included -- regulatory framework, not technical controls
- **Gap:** CBEST threat intelligence-led penetration testing -- methodology, not control framework

### Transport and Digital Infrastructure

- **Included:** NCSC CAF (transport and digital infrastructure are NIS-regulated sectors)
- **Gap:** DfT Cyber Security Toolkit for Transport not included -- sector-specific guidance
