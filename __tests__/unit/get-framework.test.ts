// __tests__/unit/get-framework.test.ts
import { describe, it, expect } from 'vitest';
import { handleGetFramework } from '../../src/tools/get-framework.js';

describe('handleGetFramework', () => {
  it('returns framework details for ncsc-caf including control count, categories table, and sectors', () => {
    const result = handleGetFramework({ framework_id: 'ncsc-caf' });

    expect(result.isError).toBeFalsy();
    expect(result._meta).toBeDefined();

    const text = result.content[0].text;

    // Framework name
    expect(text).toContain('Cyber Assessment Framework');

    // Issuing body
    expect(text).toContain('NCSC-UK');

    // Sectors
    expect(text).toContain('government');

    // Categories
    expect(text).toContain('Managing Security Risk');
    expect(text).toContain('Protecting Against Cyber Attack');

    // Source URL
    expect(text).toContain('ncsc.gov.uk');
  });

  it('returns NO_MATCH for unknown framework', () => {
    const result = handleGetFramework({ framework_id: 'nonexistent-fw' });

    expect(result.isError).toBe(true);
    expect(result._error_type).toBe('NO_MATCH');
    expect(result._meta).toBeDefined();
  });

  it('returns INVALID_INPUT for missing framework_id', () => {
    // @ts-expect-error -- intentional missing arg for test
    const result = handleGetFramework({});

    expect(result.isError).toBe(true);
    expect(result._error_type).toBe('INVALID_INPUT');
    expect(result._meta).toBeDefined();
  });
});
