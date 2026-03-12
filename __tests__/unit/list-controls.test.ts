// __tests__/unit/list-controls.test.ts
import { describe, it, expect } from 'vitest';
import { handleListControls } from '../../src/tools/list-controls.js';

describe('handleListControls', () => {
  it('lists all controls for ncsc-caf with total_results count', () => {
    const result = handleListControls({ framework_id: 'ncsc-caf' });

    expect(result.isError).toBeFalsy();
    expect(result._meta).toBeDefined();

    const text = result.content[0].text;

    expect(text).toContain('total_results');
    expect(text).toContain('ncsc-caf:A1.a');
    expect(text).toContain('| ID |');
  });

  it('filters controls by category', () => {
    const result = handleListControls({ framework_id: 'ncsc-caf', category: 'Managing Security Risk' });

    expect(result.isError).toBeFalsy();

    const text = result.content[0].text;

    expect(text).toContain('ncsc-caf:A1.a');
    // Should not contain Objective B controls
    expect(text).not.toContain('ncsc-caf:B1');
  });

  it('returns INVALID_INPUT for missing framework_id', () => {
    // @ts-expect-error -- intentional missing arg for test
    const result = handleListControls({});

    expect(result.isError).toBe(true);
    expect(result._error_type).toBe('INVALID_INPUT');
    expect(result._meta).toBeDefined();
  });

  it('returns NO_MATCH for unknown framework', () => {
    const result = handleListControls({ framework_id: 'nonexistent-framework' });

    expect(result.isError).toBe(true);
    expect(result._error_type).toBe('NO_MATCH');
    expect(result._meta).toBeDefined();
  });

  it('paginates results via limit and offset', () => {
    const page1 = handleListControls({ framework_id: 'ncsc-caf', limit: 1, offset: 0 });
    const page2 = handleListControls({ framework_id: 'ncsc-caf', limit: 1, offset: 1 });

    expect(page1.isError).toBeFalsy();
    expect(page2.isError).toBeFalsy();

    const text1 = page1.content[0].text;
    const text2 = page2.content[0].text;

    expect(text1).toContain('total_results');
    expect(text1).not.toBe(text2);
  });
});
