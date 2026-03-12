// __tests__/unit/get-control.test.ts
import { describe, it, expect } from 'vitest';
import { handleGetControl } from '../../src/tools/get-control.js';

describe('handleGetControl', () => {
  it('returns full control detail for ncsc-caf:A1.a', () => {
    const result = handleGetControl({ control_id: 'ncsc-caf:A1.a' });

    expect(result.isError).toBeFalsy();
    expect(result._meta).toBeDefined();

    const text = result.content[0].text;

    // Heading: control number
    expect(text).toContain('A1.a');

    // Title
    expect(text).toContain('Board direction');

    // Framework name
    expect(text).toContain('Cyber Assessment Framework');

    // Category
    expect(text).toContain('Managing Security Risk');

    // ISO mapping
    expect(text).toContain('5.1');

    // Description
    expect(text).toContain('board-level');

    // Source URL
    expect(text).toContain('ncsc.gov.uk');
  });

  it('returns NO_MATCH for ncsc-caf:Z99.z', () => {
    const result = handleGetControl({ control_id: 'ncsc-caf:Z99.z' });

    expect(result.isError).toBe(true);
    expect(result._error_type).toBe('NO_MATCH');
    expect(result._meta).toBeDefined();
  });

  it('returns INVALID_INPUT for missing control_id', () => {
    // @ts-expect-error -- intentional missing arg for test
    const result = handleGetControl({});

    expect(result.isError).toBe(true);
    expect(result._error_type).toBe('INVALID_INPUT');
    expect(result._meta).toBeDefined();
  });
});
