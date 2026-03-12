# Coverage -- UK Standards MCP

> Last verified: 2026-03-12 | Database version: 0.1.0

This document declares exactly what data the UK Standards MCP contains, what it does not contain, and the limitations of each source. It is the contract with users.

---

## What's Included

### NCSC Publications (17 frameworks)

| Source | Authority | Items | Version / Date | Completeness | Refresh |
|--------|-----------|-------|----------------|-------------|---------|
| NCSC Cyber Essentials | NCSC-UK | 16 controls | Willow (2024) | Full | Annual |
| NCSC Cyber Essentials Plus | NCSC-UK | 13 controls | Willow (2024) | Full | Annual |
| NCSC Cyber Assessment Framework (CAF) | NCSC-UK | 36 controls | 3.2 (2024) | Full | Annual |
| NCSC Cloud Security Principles | NCSC-UK | 14 principles | 2024 | Full | Annual |
| NCSC 10 Steps to Cyber Security | NCSC-UK | 23 controls | 2021 | Full | Annual |
| NCSC Board Toolkit | NCSC-UK | 12 controls | 2023 | Full | Annual |
| NCSC Supply Chain Security Guidance | NCSC-UK | 12 principles | 2024 | Full | Annual |
| NCSC Zero Trust Architecture | NCSC-UK | 8 principles | 2024 | Full | Annual |
| NCSC Email Security and Anti-Spoofing | NCSC-UK | 8 controls | 2024 | Full | Annual |
| NCSC TLS Configuration Guidance | NCSC-UK | 7 controls | 2024 | Full | Annual |
| NCSC Password Administration | NCSC-UK | 8 controls | 2024 | Full | Annual |
| NCSC Secure Design Principles | NCSC-UK | 12 principles | 2024 | Full | Annual |
| NCSC Identity and Access Management | NCSC-UK | 8 controls | 2024 | Full | Annual |
| NCSC Logging and Protective Monitoring | NCSC-UK | 10 controls | 2024 | Full | Annual |
| NCSC Incident Management | NCSC-UK | 10 controls | 2024 | Full | Annual |
| NCSC BYOD Guidance | NCSC-UK | 6 controls | 2024 | Full | Annual |
| NHS Data Security and Protection Toolkit (DSPT) | NHS Digital / DHSC | 30 assertions | 2024-25 | Full | Annual |

### Government Standards (4 frameworks)

| Source | Authority | Items | Version / Date | Completeness | Refresh |
|--------|-----------|-------|----------------|-------------|---------|
| GDS Technology Code of Practice | GDS | 12 points | 2021 | Full | Annual |
| GDS Service Standard | GDS | 14 points | 2024 | Full | Annual |
| HMG Minimum Cyber Security Standard | Cabinet Office | 10 requirements | 2018 | Full | Annual |
| Cyber Governance Code of Practice | DSIT | 9 actions | 2025 | Full | Annual |

### Regulatory (2 frameworks)

| Source | Authority | Items | Version / Date | Completeness | Refresh |
|--------|-----------|-------|----------------|-------------|---------|
| UK NIS Regulations 2018 | DSIT | 7 obligations | 2018 (amended 2022) | Full | 5-year |
| OFCOM Telecoms Security Code of Practice | OFCOM | 8 measures | 2022 | Full | Annual |

### Healthcare (2 frameworks)

| Source | Authority | Items | Version / Date | Completeness | Refresh |
|--------|-----------|-------|----------------|-------------|---------|
| NHS DCB0129 Clinical Risk Management (Manufacturers) | NHS Digital | 7 requirements | 4.2 (2020) | Full | 5-year |
| NHS DCB0160 Clinical Risk Management (Health Orgs) | NHS Digital | 5 requirements | 3.1 (2020) | Full | 5-year |

### Financial Services (2 frameworks)

| Source | Authority | Items | Version / Date | Completeness | Refresh |
|--------|-----------|-------|----------------|-------------|---------|
| PRA Operational Resilience (SS1/21) | PRA / Bank of England | 8 requirements | SS1/21 | Full | Annual |
| FCA SYSC 13 Operational Risk | FCA | 7 requirements | 2024 | Full | Annual |

### Defence (1 framework)

| Source | Authority | Items | Version / Date | Completeness | Refresh |
|--------|-----------|-------|----------------|-------------|---------|
| Def Stan 05-138 Cyber Security for Defence Suppliers | MOD | 8 requirements | Issue 3 (2024) | Full | 5-year |

**Total:** 11 tools, 328 controls/requirements, database built from 28 authoritative UK sources.

---

## What's NOT Included

| Gap | Reason | Planned? |
|-----|--------|----------|
| ISO/IEC 27001:2022 (full standard) | Commercial ISO standard -- reference mappings included via `iso_mapping` field, full text excluded | No |
| CIS Controls v8 | International framework -- out of scope for UK-specific MCP | No |
| PCI DSS v4.0 | International payment standard -- out of scope for UK government focus | No |
| NIST Cybersecurity Framework | US framework -- out of scope for UK-specific MCP | No |
| Government Functional Standard GovS 007 (Security) | Sets policy rather than technical controls | No |
| CBEST Threat Intelligence-Led Penetration Testing | Methodology, not control framework | No |
| DfT Cyber Security Toolkit for Transport | Sector-specific guidance, not a control framework | No |
| Ofgem Cyber Resilience Guidelines | Regulatory interpretation of CAF for energy sector | No |
| NHS Secure Boundary | Operational implementation of Cyber Essentials for NHS | No |

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
| NCSC Cyber Essentials | Annual | 2026-03-12 | 2027-03-12 |
| NCSC Cyber Essentials Plus | Annual | 2026-03-12 | 2027-03-12 |
| NCSC CAF | Annual | 2026-03-12 | 2027-03-12 |
| NCSC Cloud Security Principles | Annual | 2026-03-12 | 2027-03-12 |
| NCSC 10 Steps | Annual | 2026-03-12 | 2027-03-12 |
| NCSC Board Toolkit | Annual | 2026-03-12 | 2027-03-12 |
| NCSC Supply Chain Security | Annual | 2026-03-12 | 2027-03-12 |
| NCSC Zero Trust Architecture | Annual | 2026-03-12 | 2027-03-12 |
| NCSC Email Security | Annual | 2026-03-12 | 2027-03-12 |
| NCSC TLS Configuration | Annual | 2026-03-12 | 2027-03-12 |
| NCSC Password Administration | Annual | 2026-03-12 | 2027-03-12 |
| NCSC Secure Design Principles | Annual | 2026-03-12 | 2027-03-12 |
| NCSC IAM | Annual | 2026-03-12 | 2027-03-12 |
| NCSC Logging and Monitoring | Annual | 2026-03-12 | 2027-03-12 |
| NCSC Incident Management | Annual | 2026-03-12 | 2027-03-12 |
| NCSC BYOD | Annual | 2026-03-12 | 2027-03-12 |
| NHS DSPT | Annual | 2026-03-12 | 2027-03-12 |
| NHS DCB0129 | 5-year | 2026-03-12 | 2031-03-12 |
| NHS DCB0160 | 5-year | 2026-03-12 | 2031-03-12 |
| GDS Technology Code of Practice | Annual | 2026-03-12 | 2027-03-12 |
| GDS Service Standard | Annual | 2026-03-12 | 2027-03-12 |
| HMG Minimum Cyber Security Standard | Annual | 2026-03-12 | 2027-03-12 |
| Cyber Governance Code of Practice | Annual | 2026-03-12 | 2027-03-12 |
| UK NIS Regulations | 5-year | 2026-03-12 | 2031-03-12 |
| OFCOM Telecoms Security | Annual | 2026-03-12 | 2027-03-12 |
| PRA Operational Resilience | Annual | 2026-03-12 | 2027-03-12 |
| FCA SYSC 13 | Annual | 2026-03-12 | 2027-03-12 |
| Def Stan 05-138 | 5-year | 2026-03-12 | 2031-03-12 |

To check current freshness status programmatically, call the `check_data_freshness` tool.

The ingestion pipeline (`ingest.yml`) runs on the most frequent source schedule. The `check-updates.yml` workflow runs daily and creates a GitHub issue if any source is overdue.

---

## Regulatory Mapping

This table maps UK regulations and laws to the frameworks in this MCP that implement or operationalize them.

| Regulation / Law | Relevant Frameworks | Notes |
|-----------------|---------------------|-------|
| Network and Information Systems Regulations 2018 (UK NIS) | NCSC CAF, UK NIS Regulations | CAF is the primary assessment framework for operators of essential services under NIS. NIS Regulations framework covers the regulatory obligations directly. |
| UK GDPR / Data Protection Act 2018 | NHS DSPT, NCSC Cyber Essentials, NCSC Logging and Monitoring | Security of personal data -- Article 32 equivalent technical measures |
| Health and Social Care Act 2012 | NHS DSPT, NHS DCB0129, NHS DCB0160 | Data security and clinical risk management requirements for health and social care organisations |
| Computer Misuse Act 1990 | NCSC 10 Steps, NCSC Cyber Essentials, NCSC IAM | Baseline security measures to prevent unauthorized access |
| Telecommunications (Security) Act 2021 | OFCOM Telecoms Security Code, NCSC CAF | OFCOM code implements TSA requirements; CAF-based assessment applies to telecoms providers |
| Financial Services and Markets Act 2000 | PRA Operational Resilience, FCA SYSC 13, NCSC Board Toolkit | PRA SS1/21 and FCA SYSC 13 set operational resilience requirements for regulated firms |
| Regulation of Investigatory Powers Act 2000 | NCSC Logging and Monitoring | Lawful monitoring obligations for organisations |
| Civil Contingencies Act 2004 | NCSC Incident Management | Incident response planning for critical national infrastructure operators |

---

## Sector-Specific Coverage

### Government (Central and Local)

- **Included:** NCSC Cyber Essentials (mandatory for government suppliers), NCSC CAF (critical national infrastructure), NCSC 10 Steps, NCSC Board Toolkit, NCSC Cloud Security Principles, HMG Minimum Cyber Security Standard (mandatory for departments), GDS Technology Code of Practice, GDS Service Standard, Cyber Governance Code of Practice, NCSC Zero Trust Architecture
- **Gap:** Government Functional Standard GovS 007 (Security) not included -- sets policy rather than technical controls

### Healthcare (NHS and Social Care)

- **Included:** NHS DSPT (30 assertions across 10 NDG standards), NHS DCB0129 (clinical risk management for manufacturers), NHS DCB0160 (clinical risk management for health organisations), plus all NCSC frameworks
- **Gap:** NHS Secure Boundary not included -- operational implementation of Cyber Essentials for NHS

### Energy and Utilities

- **Included:** NCSC CAF (primary framework for OES under NIS Regulations), UK NIS Regulations (direct regulatory obligations)
- **Gap:** Ofgem Cyber Resilience guidelines not included -- regulatory interpretation of CAF for energy sector

### Financial Services

- **Included:** PRA Operational Resilience SS1/21 (important business services and impact tolerances), FCA SYSC 13 (operational risk management), NCSC CAF, NCSC Board Toolkit
- **Gap:** CBEST threat intelligence-led penetration testing -- methodology, not control framework

### Telecoms and Digital Infrastructure

- **Included:** OFCOM Telecoms Security Code of Practice (Telecommunications (Security) Act 2021), NCSC CAF, UK NIS Regulations
- **Gap:** DfT Cyber Security Toolkit for Transport not included -- sector-specific guidance

### Defence

- **Included:** Def Stan 05-138 (mandatory cyber security for defence suppliers), NCSC Zero Trust Architecture, HMG Minimum Cyber Security Standard
- **Gap:** JSP 440 (Defence Manual of Security) not included -- classified
