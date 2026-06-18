import { expect, test, describe } from 'vitest';
import { SITE_NAME, SITE_URL } from '../lib/constants';

describe('Constants', () => {
  test('SITE_NAME should be a string', () => {
    expect(typeof SITE_NAME).toBe('string');
  });

  test('SITE_URL should be a string', () => {
    expect(typeof SITE_URL).toBe('string');
  });
});
