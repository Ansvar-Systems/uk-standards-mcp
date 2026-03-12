// __tests__/unit/get-iso-mapping.test.ts
import { describe, it, expect } from 'vitest';
import { handleGetIsoMapping } from '../../src/tools/get-iso-mapping.js';

describe('handleGetIsoMapping', () => {
  it('finds UK controls mapped to ISO 5.1', () => {
    const result = handleGetIsoMapping({ iso_control: '5.1' });

    expect(result.isError).toBeFalsy();
    expect(result._meta).toBeDefined();

    const text = result.content[0].text;

    // ncsc-caf controls with iso_mapping="5.1" must appear
    expect(text).toContain('ncsc-caf:A1.a');

    // Should show the ISO control in the heading
    expect(text).toContain('5.1');

    // Markdown table structure
    expect(text).toContain('| ID |');
  });

  it('finds controls mapped to ISO A.12.6.1', () => {
    const result = handleGetIsoMapping({ iso_control: 'A.12.6.1' });

    expect(result.isError).toBeFalsy();
    expect(result._meta).toBeDefined();

    const text = result.content[0].text;

    // Multiple frameworks should have this mapping
    expect(text).toContain('A.12.6.1');
    expect(text).toContain('| ID |');
  });

  it('returns NO_MATCH for unmapped ISO control', () => {
    const result = handleGetIsoMapping({ iso_control: '99.99' });

    expect(result.isError).toBe(true);
    expect(result._error_type).toBe('NO_MATCH');
    expect(result._meta).toBeDefined();
  });

  it('returns INVALID_INPUT for missing iso_control param', () => {
    // @ts-expect-error -- intentional missing arg for test
    const result = handleGetIsoMapping({});

    expect(result.isError).toBe(true);
    expect(result._error_type).toBe('INVALID_INPUT');
    expect(result._meta).toBeDefined();
  });
});
