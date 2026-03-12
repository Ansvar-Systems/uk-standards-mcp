// scripts/ingest-fca-sysc.ts
// FCA SYSC 13 — Operational Risk: Systems and Controls (Financial Conduct Authority)
// Source: https://www.handbook.fca.org.uk/handbook/SYSC/13/
// Version: 2024

import { writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUTPUT_DIR = join(__dirname, '..', 'data', 'extracted');
mkdirSync(OUTPUT_DIR, { recursive: true });

const data = {
  framework: {
    id: 'fca-sysc',
    name: 'FCA SYSC 13 — Operational Risk Systems and Controls',
    name_nl: 'FCA SYSC 13 — Operational Risk Systems and Controls',
    issuing_body: 'Financial Conduct Authority (FCA)',
    version: '2024',
    effective_date: '2024-01-01',
    scope: 'Requirements for FCA-regulated firms to establish, implement, and maintain adequate systems and controls to manage operational risk, including technology risk and cybersecurity.',
    scope_sectors: ['finance'],
    structure_description: 'Rules and guidance covering operational risk identification, business continuity, outsourcing, and technology risk for financial services firms',
    source_url: 'https://www.handbook.fca.org.uk/handbook/SYSC/13/',
    license: 'Open Government Licence v3.0',
    language: 'en',
  },
  controls: [
    {
      control_number: '13.1',
      title: 'Operational risk: systems and controls scope',
      title_nl: 'Operational risk: systems and controls scope',
      description: 'A firm must establish, implement, and maintain adequate systems and controls to manage operational risks. The firm should have a well-documented assessment and management of operational risk as part of its risk management framework.',
      description_nl: 'A firm must establish, implement, and maintain adequate systems and controls to manage operational risks. The firm should have a well-documented assessment and management of operational risk as part of its risk management framework.',
      category: 'Risk Framework',
      subcategory: 'Operational risk management',
      level: null,
      iso_mapping: '6.1',
      implementation_guidance: 'Integrate operational risk into the enterprise risk framework. Document risk assessment methodology. Define operational risk appetite. Report operational risks to the board.',
      verification_guidance: 'Review operational risk framework. Verify integration with enterprise risk management. Check risk appetite definition.',
      source_url: 'https://www.handbook.fca.org.uk/handbook/SYSC/13/1',
    },
    {
      control_number: '13.2',
      title: 'Operational risk identification',
      title_nl: 'Operational risk identification',
      description: 'The firm should identify and assess operational risks, including but not limited to technology failures, cyber threats, human error, and external events. Risk identification should be ongoing and cover all business areas.',
      description_nl: 'The firm should identify and assess operational risks, including but not limited to technology failures, cyber threats, human error, and external events. Risk identification should be ongoing and cover all business areas.',
      category: 'Risk Framework',
      subcategory: 'Risk identification',
      level: null,
      iso_mapping: '6.1',
      implementation_guidance: 'Conduct regular operational risk assessments. Maintain a risk register covering technology, people, process, and external events. Use scenario analysis for emerging risks.',
      verification_guidance: 'Review risk register completeness. Verify assessment frequency. Check scenario analysis.',
      source_url: 'https://www.handbook.fca.org.uk/handbook/SYSC/13/2',
    },
    {
      control_number: '13.3',
      title: 'Business continuity planning',
      title_nl: 'Business continuity planning',
      description: 'A firm must establish, implement, and maintain an adequate business continuity policy aimed at ensuring that, in the case of an interruption to its systems and procedures, its regulated activities can continue and essential data and functions are preserved.',
      description_nl: 'A firm must establish, implement, and maintain an adequate business continuity policy aimed at ensuring that, in the case of an interruption to its systems and procedures, its regulated activities can continue and essential data and functions are preserved.',
      category: 'Business Continuity',
      subcategory: 'BCP',
      level: null,
      iso_mapping: 'A.17.1.1',
      implementation_guidance: 'Develop business continuity plans for all critical business functions. Define recovery time objectives. Maintain tested backup and recovery capabilities. Test plans at least annually.',
      verification_guidance: 'Review BCP documentation. Verify testing frequency. Check RTO documentation.',
      source_url: 'https://www.handbook.fca.org.uk/handbook/SYSC/13/3',
    },
    {
      control_number: '13.4',
      title: 'Technology risk management',
      title_nl: 'Technology risk management',
      description: 'A firm should take reasonable care to establish and maintain effective systems and controls for compliance with applicable requirements relating to IT systems and security. Technology risks should be identified, assessed, and mitigated.',
      description_nl: 'A firm should take reasonable care to establish and maintain effective systems and controls for compliance with applicable requirements relating to IT systems and security. Technology risks should be identified, assessed, and mitigated.',
      category: 'Technology Risk',
      subcategory: 'IT systems and security',
      level: null,
      iso_mapping: 'A.12.1.1',
      implementation_guidance: 'Implement IT risk management processes. Apply security controls proportionate to risk. Conduct regular security assessments. Maintain incident response capability.',
      verification_guidance: 'Review IT risk management. Verify security controls. Check assessment frequency.',
      source_url: 'https://www.handbook.fca.org.uk/handbook/SYSC/13/4',
    },
    {
      control_number: '13.5',
      title: 'Outsourcing risk management',
      title_nl: 'Outsourcing risk management',
      description: 'A firm that outsources critical or important functions remains fully responsible for discharging all its obligations. The firm must manage the risks associated with outsourcing, including operational resilience and data security.',
      description_nl: 'A firm that outsources critical or important functions remains fully responsible for discharging all its obligations. The firm must manage the risks associated with outsourcing, including operational resilience and data security.',
      category: 'Outsourcing',
      subcategory: 'Third-party risk',
      level: null,
      iso_mapping: 'A.15.1.1',
      implementation_guidance: 'Maintain a register of outsourced activities. Conduct due diligence on service providers. Include security and resilience requirements in contracts. Monitor provider performance.',
      verification_guidance: 'Review outsourcing register. Verify due diligence completion. Check contractual security requirements.',
      source_url: 'https://www.handbook.fca.org.uk/handbook/SYSC/13/5',
    },
    {
      control_number: '13.6',
      title: 'Change management controls',
      title_nl: 'Change management controls',
      description: 'The firm should implement change management processes that assess operational risk before making changes to systems, processes, or organisational structure. Changes should be tested and approved before deployment.',
      description_nl: 'The firm should implement change management processes that assess operational risk before making changes to systems, processes, or organisational structure. Changes should be tested and approved before deployment.',
      category: 'Technology Risk',
      subcategory: 'Change management',
      level: null,
      iso_mapping: 'A.12.1.2',
      implementation_guidance: 'Implement formal change management processes. Require risk assessment for significant changes. Test changes before production deployment. Maintain rollback capability.',
      verification_guidance: 'Review change management process. Verify risk assessments are conducted. Check testing evidence.',
      source_url: 'https://www.handbook.fca.org.uk/handbook/SYSC/13/6',
    },
    {
      control_number: '13.7',
      title: 'Incident management and reporting',
      title_nl: 'Incident management and reporting',
      description: 'The firm should have procedures for managing operational incidents including cyber incidents. Material operational incidents must be reported to the FCA. The firm should learn from incidents and near-misses.',
      description_nl: 'The firm should have procedures for managing operational incidents including cyber incidents. Material operational incidents must be reported to the FCA. The firm should learn from incidents and near-misses.',
      category: 'Incident Management',
      subcategory: 'Operational incidents',
      level: null,
      iso_mapping: 'A.16.1.1',
      implementation_guidance: 'Establish incident management procedures. Define FCA reporting thresholds for material incidents. Conduct post-incident reviews. Track and implement improvements.',
      verification_guidance: 'Review incident management procedures. Verify FCA reporting channel. Check post-incident review completion.',
      source_url: 'https://www.handbook.fca.org.uk/handbook/SYSC/13/7',
    },
  ],
};

writeFileSync(join(OUTPUT_DIR, 'fca-sysc.json'), JSON.stringify(data, null, 2));
console.log(`Wrote ${data.controls.length} controls for ${data.framework.id}`);
