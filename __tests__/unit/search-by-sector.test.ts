// __tests__/unit/search-by-sector.test.ts
import { describe, it, expect } from 'vitest';
import { handleSearchBySector } from '../../src/tools/search-by-sector.js';

describe('handleSearchBySector', () => {
  it('healthcare sector returns nhs-dspt', () => {
    const result = handleSearchBySector({ sector: 'healthcare' });

    expect(result.isError).toBeFalsy();
    expect(result._meta).toBeDefined();

    const text = result.content[0].text;

    expect(text).toContain('nhs-dspt');
  });

  it('government sector returns ncsc-caf and other government frameworks', () => {
    const result = handleSearchBySector({ sector: 'government' });

    expect(result.isError).toBeFalsy();

    const text = result.content[0].text;

    expect(text).toContain('ncsc-caf');
  });

  it('with query param returns matching controls within sector frameworks', () => {
    const result = handleSearchBySector({ sector: 'healthcare', query: 'training' });

    expect(result.isError).toBeFalsy();

    const text = result.content[0].text;

    // Framework section must be present
    expect(text).toContain('nhs-dspt');

    // Controls section with matching results
    expect(text).toContain('nhs-dspt:');
  });

  it('unknown sector returns INVALID_INPUT', () => {
    const result = handleSearchBySector({ sector: 'unknown-sector-xyz' });

    expect(result.isError).toBe(true);
    expect(result._error_type).toBe('INVALID_INPUT');
    expect(result._meta).toBeDefined();
  });

  it('missing/empty sector returns INVALID_INPUT', () => {
    // @ts-expect-error -- intentional missing arg for test
    const result = handleSearchBySector({});

    expect(result.isError).toBe(true);
    expect(result._error_type).toBe('INVALID_INPUT');
  });

  it('empty string sector returns INVALID_INPUT', () => {
    const result = handleSearchBySector({ sector: '' });

    expect(result.isError).toBe(true);
    expect(result._error_type).toBe('INVALID_INPUT');
  });
});
