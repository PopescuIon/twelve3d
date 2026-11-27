const PROMO_MONTH_INDEX = 10; // November (0-indexed)
const PROMO_START_DAY = 1;
const PROMO_END_DAY = 30;
const MAX_TIMEOUT_MS = 2_147_483_647;

/**
 * Returns true from November 1 00:00:00.000 through November 30 23:59:59.999
 * in the user's local timezone. Starting December 1 00:00:00.000 it returns false.
 */
export function isBlackFridayPromoActive(now: Date = new Date()): boolean {
  const month = now.getMonth();
  const day = now.getDate();
  return month === PROMO_MONTH_INDEX && day >= PROMO_START_DAY && day <= PROMO_END_DAY;
}

/**
 * Milliseconds remaining until December 1 00:00:00.000 local time, or null when inactive
 * or further away than setTimeout's safe 32-bit maximum.
 */
export function msUntilPromoExpiration(now: Date = new Date()): number | null {
  if (!isBlackFridayPromoActive(now)) return null;
  const expiresAt = new Date(now.getFullYear(), PROMO_MONTH_INDEX + 1, 1, 0, 0, 0, 0);
  const remaining = expiresAt.getTime() - now.getTime();
  if (remaining <= 0) return 0;
  return remaining <= MAX_TIMEOUT_MS ? remaining : null;
}