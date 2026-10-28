import { describe, expect, test } from 'bun:test';
import { contactSchema } from './contact-schema';
import { handler } from '../../supabase/functions/send-contact-email/handler';

const valid = { user_name: 'Test Twelve', user_email: 'test@example.com', user_phone: '60592006', message: 'Mesaj de test' };

describe('Contact safety', () => {
  for (const field of Object.keys(valid)) {
    test(`${field} is required and cannot be null`, () => {
      for (const value of ['', null, undefined]) {
        expect(contactSchema.safeParse({ ...valid, [field]: value }).success).toBe(false);
      }
    });
  }
  test('email must have a valid format', () => {
    expect(contactSchema.safeParse({ ...valid, user_email: 'test@' }).success).toBe(false);
    expect(contactSchema.safeParse(valid).success).toBe(true);
  });
  test('phone requires at least 8 digits and no letters', () => {
    expect(contactSchema.safeParse({ ...valid, user_phone: '1234567' }).success).toBe(false);
    expect(contactSchema.safeParse({ ...valid, user_phone: '1234567a' }).success).toBe(false);
    expect(contactSchema.safeParse(valid).success).toBe(true);
  });
  test('message requires 5 characters', () => {
    expect(contactSchema.safeParse({ ...valid, message: 'abcd' }).success).toBe(false);
    expect(contactSchema.safeParse({ ...valid, message: 'abcde' }).success).toBe(true);
  });
  for (const [field, limit] of [['user_name', 100], ['user_email', 255], ['user_phone', 20], ['message', 1000]] as const) {
    test(`${field} rejects values beyond ${limit} characters`, () => {
      expect(contactSchema.safeParse({ ...valid, [field]: '1'.repeat(limit + 1) }).success).toBe(false);
    });
  }
  test('legacy endpoint refuses submissions without reading private data', async () => {
    let bodyRead = false;
    const request = new Request('https://example.com', { method: 'POST', body: 'private data' });
    request.json = async () => { bodyRead = true; throw new Error('Must not read'); };
    const response = handler(request);
    expect(response.status).toBe(410);
    expect(bodyRead).toBe(false);
    expect(await response.json()).toEqual({ error: 'Endpoint unavailable' });
    expect(response.headers.get('Access-Control-Allow-Origin')).toBeNull();
  });
});