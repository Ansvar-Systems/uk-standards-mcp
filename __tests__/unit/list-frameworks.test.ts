// __tests__/unit/list-frameworks.test.ts
import { describe, it, expect } from 'vitest';
import { handleListFrameworks } from '../../src/tools/list-frameworks.js';

describe('handleListFrameworks', () => {
  it('returns a Markdown table containing all frameworks with control counts', () => {
    const result = handleListFrameworks();

    expect(result.isError).toBeFalsy();
    expect(result._meta).toBeDefined();

    const text = result.content[0].text;

    // Core framework IDs present
    expect(text).toContain('ncsc-caf');
    expect(text).toContain('ncsc-ce');
    expect(text).toContain('nhs-dspt');
    expect(text).toContain('ncsc-cloud');
    expect(text).toContain('ncsc-10steps');
    expect(text).toContain('ncsc-board');

    // New framework IDs present
    expect(text).toContain('ncsc-zt');
    expect(text).toContain('hmg-mcss');
    expect(text).toContain('pra-opres');
    expect(text).toContain('mod-defstan');

    // Framework names present
    expect(text).toContain('Cyber Assessment Framework');
    expect(text).toContain('Cyber Essentials');

    // Issuing bodies present
    expect(text).toContain('NCSC-UK');

    // Sectors present
    expect(text).toContain('government');
    expect(text).toContain('healthcare');

    // Markdown table structure
    expect(text).toContain('| ID |');

    // 28 frameworks
    expect(text).toContain('28 frameworks');
  });
});
