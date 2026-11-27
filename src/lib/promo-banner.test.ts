/// <reference types="node" />
import { describe, it as test } from 'node:test';
import assert from 'node:assert/strict';
import { isBlackFridayPromoActive, msUntilPromoExpiration } from './promo-banner';

describe('Black Friday promo banner schedule', () => {
  test('is active from November 1 00:00:00 through November 30 23:59:59.999', () => {
    assert.equal(isBlackFridayPromoActive(new Date(2026, 10, 1, 0, 0, 0, 0)), true);
    assert.equal(isBlackFridayPromoActive(new Date(2026, 10, 27, 12, 0, 0, 0)), true);
    assert.equal(isBlackFridayPromoActive(new Date(2026, 10, 30, 23, 59, 59, 999)), true);
  });

  test('disappears starting December 1 00:00:00 and outside November', () => {
    assert.equal(isBlackFridayPromoActive(new Date(2026, 11, 1, 0, 0, 0, 0)), false);
    assert.equal(isBlackFridayPromoActive(new Date(2026, 11, 15, 10, 0, 0, 0)), false);
    assert.equal(isBlackFridayPromoActive(new Date(2026, 9, 31, 23, 59, 59, 999)), false);
    assert.equal(isBlackFridayPromoActive(new Date(2027, 0, 1, 0, 0, 0, 0)), false);
  });

  test('calculates remaining milliseconds until December 1 00:00:00 when within timeout range', () => {
    const almostMidnight = new Date(2026, 10, 30, 23, 59, 50, 0);
    assert.equal(msUntilPromoExpiration(almostMidnight), 10_000);
    assert.equal(msUntilPromoExpiration(new Date(2026, 11, 1, 0, 0, 0, 0)), null);
  });
});