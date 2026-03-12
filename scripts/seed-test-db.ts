// scripts/seed-test-db.ts
// Builds a minimal test database at data/standards.db for development and testing.
// Uses @ansvar/mcp-sqlite (WASM-based, CommonJS loaded via createRequire).

import { createRequire } from 'node:module';
import { mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DB_PATH = join(__dirname, '..', 'data', 'standards.db');

// Ensure the data directory exists
mkdirSync(join(__dirname, '..', 'data'), { recursive: true });

const require = createRequire(import.meta.url);
const { Database } = require('@ansvar/mcp-sqlite');
const db = new Database(DB_PATH);

db.exec(`
CREATE TABLE IF NOT EXISTS frameworks (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  name_nl TEXT,
  issuing_body TEXT NOT NULL,
  version TEXT NOT NULL,
  effective_date TEXT,
  scope TEXT,
  scope_sectors TEXT,
  structure_description TEXT,
  source_url TEXT,
  license TEXT,
  language TEXT NOT NULL DEFAULT 'nl'
);

CREATE TABLE IF NOT EXISTS controls (
  id TEXT PRIMARY KEY,
  framework_id TEXT NOT NULL REFERENCES frameworks(id),
  control_number TEXT NOT NULL,
  title TEXT,
  title_nl TEXT NOT NULL,
  description TEXT,
  description_nl TEXT NOT NULL,
  category TEXT,
  subcategory TEXT,
  level TEXT,
  iso_mapping TEXT,
  implementation_guidance TEXT,
  verification_guidance TEXT,
  source_url TEXT
);

CREATE VIRTUAL TABLE IF NOT EXISTS controls_fts USING fts5(
  id,
  title,
  title_nl,
  description,
  description_nl,
  category,
  content='controls',
  content_rowid='rowid'
);

CREATE TABLE IF NOT EXISTS db_metadata (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL
);
`);

const insertFramework = db.prepare(
  'INSERT OR REPLACE INTO frameworks (id, name, name_nl, issuing_body, version, effective_date, scope, scope_sectors, structure_description, source_url, license, language) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
);

insertFramework.run('ncsc-caf', 'Cyber Assessment Framework', 'Cyber Assessment Framework', 'National Cyber Security Centre (NCSC-UK)', '3.2', '2024-04-01', 'Assessment of cyber resilience for operators of essential services under NIS Regulations', '["government","energy","transport","healthcare","water","digital_infrastructure"]', '4 objectives (A-D), 14 principles, contributing outcomes', 'https://www.ncsc.gov.uk/collection/caf', 'Open Government Licence v3.0', 'en');

insertFramework.run('ncsc-ce', 'NCSC Cyber Essentials', 'NCSC Cyber Essentials', 'National Cyber Security Centre (NCSC-UK)', 'Willow', '2024-04-01', 'Technical cybersecurity controls for all UK organisations seeking Cyber Essentials certification', '["government","healthcare","finance","education","all"]', '5 technical control themes with sub-requirements', 'https://www.ncsc.gov.uk/cyberessentials/overview', 'Open Government Licence v3.0', 'en');

insertFramework.run('nhs-dspt', 'NHS Data Security and Protection Toolkit', 'NHS Data Security and Protection Toolkit', 'NHS Digital / Department of Health and Social Care (DHSC)', '2024-25', '2024-07-01', 'Data security standards for all organisations that access NHS patient data and systems', '["healthcare"]', '10 data security standards from the National Data Guardian review', 'https://www.dsptoolkit.nhs.uk/', 'Open Government Licence v3.0', 'en');

insertFramework.run('ncsc-zt', 'NCSC Zero Trust Architecture', 'NCSC Zero Trust Architecture', 'National Cyber Security Centre (NCSC-UK)', '2024', '2024-01-01', '8 principles for zero trust network architectures', '["government","defence","all"]', '8 zero trust principles covering identity, device health, policy enforcement, and monitoring', 'https://www.ncsc.gov.uk/collection/zero-trust-architecture', 'Open Government Licence v3.0', 'en');

insertFramework.run('hmg-mcss', 'HMG Minimum Cyber Security Standard', 'HMG Minimum Cyber Security Standard', 'Cabinet Office / HM Government', '2018', '2018-06-01', 'Mandatory minimum cyber security standard for government departments', '["government"]', '10 requirements across identify, protect, detect, respond, recover', 'https://www.gov.uk/government/publications/the-minimum-cyber-security-standard', 'Open Government Licence v3.0', 'en');

insertFramework.run('pra-opres', 'PRA Operational Resilience (SS1/21)', 'PRA Operational Resilience (SS1/21)', 'Prudential Regulation Authority (PRA) / Bank of England', 'SS1/21', '2022-03-31', 'Operational resilience requirements for PRA-regulated firms', '["finance"]', 'Requirements for important business services, impact tolerances, and scenario testing', 'https://www.bankofengland.co.uk/prudential-regulation/publication/2021/march/operational-resilience-ss', 'Open Government Licence v3.0', 'en');

insertFramework.run('mod-defstan', 'Def Stan 05-138 Cyber Security for Defence Suppliers', 'Def Stan 05-138 Cyber Security for Defence Suppliers', 'Ministry of Defence (MOD)', 'Issue 3', '2024-01-01', 'Mandatory cyber security requirements for MOD suppliers', '["defence"]', 'Tiered requirements for defence contractors handling MOD information', 'https://www.gov.uk/government/publications/defence-standard-05-138', 'Open Government Licence v3.0', 'en');

const insertControl = db.prepare(
  'INSERT OR REPLACE INTO controls (id, framework_id, control_number, title, title_nl, description, description_nl, category, subcategory, level, iso_mapping, implementation_guidance, verification_guidance, source_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
);

// CAF controls
insertControl.run('ncsc-caf:A1.a', 'ncsc-caf', 'A1.a', 'Board direction', 'Board direction', 'The organisation has a board-level individual or committee with responsibility for the security of network and information systems. Security-related decisions are made with appropriate authority, informed by an understanding of relevant risks.', 'The organisation has a board-level individual or committee with responsibility for the security of network and information systems. Security-related decisions are made with appropriate authority, informed by an understanding of relevant risks.', 'Managing Security Risk', 'A1 Governance', null, '5.1', 'Appoint a named board member or committee responsible for cyber security. Ensure security is a regular agenda item at board meetings.', 'Confirm board-level accountability for cyber security exists. Review board meeting minutes for security agenda items.', 'https://www.ncsc.gov.uk/collection/caf/caf-principles-and-guidance/a-1-governance');

insertControl.run('ncsc-caf:B2.a', 'ncsc-caf', 'B2.a', 'Identity verification, authentication and authorisation', 'Identity verification, authentication and authorisation', 'The organisation verifies the identity of users and systems and manages access to services, data, and operational technology based on appropriate policies.', 'The organisation verifies the identity of users and systems and manages access to services, data, and operational technology based on appropriate policies.', 'Protecting Against Cyber Attack', 'B2 Identity and Access Control', null, 'A.9.2.1', 'Implement multi-factor authentication for privileged access. Apply the principle of least privilege.', 'Review access control policies and implementation. Verify MFA is enforced for privileged access.', 'https://www.ncsc.gov.uk/collection/caf/caf-principles-and-guidance/b-2-identity-and-access-control');

insertControl.run('ncsc-caf:C1.a', 'ncsc-caf', 'C1.a', 'Monitoring coverage', 'Monitoring coverage', 'The organisation has appropriate monitoring in place to detect cyber security events that may affect the security of network and information systems or the operation of essential functions.', 'The organisation has appropriate monitoring in place to detect cyber security events that may affect the security of network and information systems or the operation of essential functions.', 'Detecting Cyber Security Events', 'C1 Security Monitoring', null, 'A.12.4.1', 'Deploy monitoring across all critical systems. Implement centralised log collection.', 'Review monitoring coverage against asset inventory. Verify log collection is functioning.', 'https://www.ncsc.gov.uk/collection/caf/caf-principles-and-guidance/c-1-security-monitoring');

insertControl.run('ncsc-caf:D1.a', 'ncsc-caf', 'D1.a', 'Response plan', 'Response plan', 'The organisation has an incident response plan that is relevant, up to date, and tested.', 'The organisation has an incident response plan that is relevant, up to date, and tested.', 'Minimising Impact', 'D1 Response and Recovery Planning', null, 'A.16.1.5', 'Develop and maintain an incident response plan. Test the plan regularly through exercises.', 'Review incident response plan. Verify exercises have been conducted.', 'https://www.ncsc.gov.uk/collection/caf/caf-principles-and-guidance/d-1-response-and-recovery-planning');

// CE controls
insertControl.run('ncsc-ce:1', 'ncsc-ce', '1', 'Firewalls', 'Firewalls', 'Every device that connects to the internet must be protected by a properly configured firewall.', 'Every device that connects to the internet must be protected by a properly configured firewall.', 'Firewalls', null, null, 'A.13.1.1', 'Ensure all devices connecting to the internet have a firewall enabled and properly configured.', 'Check firewall rules on boundary devices.', 'https://www.ncsc.gov.uk/cyberessentials/overview');

insertControl.run('ncsc-ce:3', 'ncsc-ce', '3', 'User Access Control', 'User Access Control', 'User accounts and access privileges must be controlled effectively. Access to data and services should only be granted to users who need it.', 'User accounts and access privileges must be controlled effectively. Access to data and services should only be granted to users who need it.', 'User Access Control', null, null, 'A.9.2.1', 'Create individual user accounts. Apply the principle of least privilege.', 'Review user account list. Verify accounts follow least privilege.', 'https://www.ncsc.gov.uk/cyberessentials/overview');

insertControl.run('ncsc-ce:5', 'ncsc-ce', '5', 'Security Update Management', 'Security Update Management', 'Manufacturers release regular updates to fix known vulnerabilities. These must be applied promptly.', 'Manufacturers release regular updates to fix known vulnerabilities. These must be applied promptly.', 'Security Update Management', null, null, 'A.12.6.1', 'Apply security updates within 14 days for critical vulnerabilities.', 'Verify patch levels on all in-scope devices.', 'https://www.ncsc.gov.uk/cyberessentials/overview');

// NHS DSPT controls
insertControl.run('nhs-dspt:1', 'nhs-dspt', '1', 'Personal Confidential Data', 'Personal Confidential Data', 'All staff ensure that personal confidential data is handled, stored and transmitted securely, whether in electronic or paper form.', 'All staff ensure that personal confidential data is handled, stored and transmitted securely, whether in electronic or paper form.', 'People', 'Standard 1', null, 'A.8.2.3', 'Ensure all staff understand their responsibilities for handling personal confidential data.', 'Review data handling policies. Audit compliance with data sharing agreements.', 'https://www.dsptoolkit.nhs.uk/');

insertControl.run('nhs-dspt:3', 'nhs-dspt', '3', 'Training', 'Training', 'All staff complete appropriate annual data security training and pass a mandatory test.', 'All staff complete appropriate annual data security training and pass a mandatory test.', 'People', 'Standard 3', null, 'A.7.2.2', 'Deliver annual mandatory data security awareness training to all staff.', 'Review training completion statistics. Verify target compliance rate is met.', 'https://www.dsptoolkit.nhs.uk/');

insertControl.run('nhs-dspt:9', 'nhs-dspt', '9', 'IT Protection', 'IT Protection', 'A strategy is in place for protecting IT systems from cyber threats based on a proven cyber security framework such as Cyber Essentials.', 'A strategy is in place for protecting IT systems from cyber threats based on a proven cyber security framework such as Cyber Essentials.', 'Technology', 'Standard 9', null, 'A.12.6.1', 'Adopt a recognised cyber security framework. Implement the framework controls.', 'Verify a cyber security framework is adopted.', 'https://www.dsptoolkit.nhs.uk/');

// Zero Trust control
insertControl.run('ncsc-zt:1', 'ncsc-zt', '1', 'Know your architecture including users, devices, services and data', 'Know your architecture including users, devices, services and data', 'In a zero trust architecture, you need a thorough understanding of your assets.', 'In a zero trust architecture, you need a thorough understanding of your assets.', 'Architecture Foundations', 'Asset inventory', null, 'A.8.1.1', 'Maintain a dynamic inventory of all users, devices, services, and data stores.', 'Review asset inventory for completeness and currency.', 'https://www.ncsc.gov.uk/collection/zero-trust-architecture/zero-trust-principles/know-your-architecture');

// HMG MCSS control
insertControl.run('hmg-mcss:1', 'hmg-mcss', '1', 'Identify and catalogue information assets', 'Identify and catalogue information assets', 'Departments shall identify, catalogue, and manage information held in their systems and services.', 'Departments shall identify, catalogue, and manage information held in their systems and services.', 'Identify', 'Asset management', null, 'A.8.1.1', 'Maintain an asset register of information systems and data.', 'Review asset register completeness.', 'https://www.gov.uk/government/publications/the-minimum-cyber-security-standard');

// PRA control
insertControl.run('pra-opres:1', 'pra-opres', '1', 'Identify important business services', 'Identify important business services', 'Firms must identify their important business services whose disruption could cause intolerable harm.', 'Firms must identify their important business services whose disruption could cause intolerable harm.', 'Service Identification', 'Important business services', null, 'A.8.1.1', 'Map all business services. Assess each for potential harm if disrupted.', 'Review important business service register.', 'https://www.bankofengland.co.uk/prudential-regulation/publication/2021/march/operational-resilience-ss');

// Def Stan control
insertControl.run('mod-defstan:1', 'mod-defstan', '1', 'Achieve Cyber Essentials Plus certification', 'Achieve Cyber Essentials Plus certification', 'Defence suppliers must achieve and maintain Cyber Essentials Plus certification as a minimum baseline.', 'Defence suppliers must achieve and maintain Cyber Essentials Plus certification as a minimum baseline.', 'Baseline Requirements', 'Certification', 'Level 1', 'A.12.6.1', 'Achieve Cyber Essentials Plus certification from an accredited assessor.', 'Verify current Cyber Essentials Plus certificate.', 'https://www.gov.uk/government/publications/defence-standard-05-138');

db.exec("INSERT INTO controls_fts(controls_fts) VALUES('rebuild')");

const insertMeta = db.prepare('INSERT OR REPLACE INTO db_metadata (key, value) VALUES (?, ?)');
insertMeta.run('schema_version', '1.0');
insertMeta.run('category', 'domain_intelligence');
insertMeta.run('mcp_name', 'UK Standards MCP');
insertMeta.run('database_built', new Date().toISOString().split('T')[0]);
insertMeta.run('database_version', '0.1.0');

db.pragma('journal_mode=DELETE');
db.exec('VACUUM');
db.close();

console.log('Test database seeded at data/standards.db');
