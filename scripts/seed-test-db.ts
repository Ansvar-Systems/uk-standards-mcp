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
