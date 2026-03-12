// __tests__/unit/compare-controls.test.ts
import { describe, it, expect } from 'vitest';
import { handleCompareControls } from '../../src/tools/compare-controls.js';

describe('handleCompareControls', () => {
  it('compares controls across ncsc-caf and ncsc-ce for "access"', () => {
    const result = handleCompareControls({
      query: 'access',
      framework_ids: ['ncsc-caf', 'ncsc-ce'],
    });

    expect(result.isError).toBeFalsy();
    expect(result._meta).toBeDefined();

    const text = result.content[0].text;

    // Should have a section for each framework
    expect(text).toContain('ncsc-caf');
    expect(text).toContain('ncsc-ce');
  });

  it('returns INVALID_INPUT for fewer than 2 frameworks', () => {
    const result = handleCompareControls({
      query: 'security',
      framework_ids: ['ncsc-caf'],
    });

    expect(result.isError).toBe(true);
    expect(result._error_type).toBe('INVALID_INPUT');
    expect(result._meta).toBeDefined();
  });

  it('returns INVALID_INPUT for empty framework_ids array', () => {
    const result = handleCompareControls({
      query: 'security',
      framework_ids: [],
    });

    expect(result.isError).toBe(true);
    expect(result._error_type).toBe('INVALID_INPUT');
  });

  it('returns INVALID_INPUT for more than 4 frameworks', () => {
    const result = handleCompareControls({
      query: 'security',
      framework_ids: ['ncsc-caf', 'ncsc-ce', 'nhs-dspt', 'ncsc-cloud', 'ncsc-board'],
    });

    expect(result.isError).toBe(true);
    expect(result._error_type).toBe('INVALID_INPUT');
    expect(result._meta).toBeDefined();
  });

  it('returns INVALID_INPUT when framework_ids is missing', () => {
    // @ts-expect-error -- intentional missing arg for test
    const result = handleCompareControls({ query: 'security' });

    expect(result.isError).toBe(true);
    expect(result._error_type).toBe('INVALID_INPUT');
  });

  it('returns INVALID_INPUT when query is missing', () => {
    // @ts-expect-error -- intentional missing arg for test
    const result = handleCompareControls({ framework_ids: ['ncsc-caf', 'ncsc-ce'] });

    expect(result.isError).toBe(true);
    expect(result._error_type).toBe('INVALID_INPUT');
  });

  it('renders one markdown section per framework', () => {
    const result = handleCompareControls({
      query: 'security',
      framework_ids: ['ncsc-caf', 'ncsc-ce'],
    });

    expect(result.isError).toBeFalsy();

    const text = result.content[0].text;

    expect(text).toMatch(/##\s+ncsc-caf/);
    expect(text).toMatch(/##\s+ncsc-ce/);
  });
});
