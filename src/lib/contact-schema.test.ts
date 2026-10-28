import { describe, it as test } from 'node:test';
import assert from 'node:assert/strict';
import { contactSchema } from './contact-schema';
import { handler } from '../../supabase/functions/send-contact-email/handler';

const valid = { user_name: 'Test Twelve', user_email: 'test@example.com', user_phone: '60592006', message: 'Mesaj de test' };

describe('Contact safety', () => {
  for (const field of Object.keys(valid)) {
    test(`${field} is required and cannot be null`, () => {
      for (const value of ['', null, undefined]) {
        assert.equal(contactSchema.safeParse({ ...valid, [field]: value }).success, false);
      }
    });
  }
  test('email must have a valid format', () => {
    assert.equal(contactSchema.safeParse({ ...valid, user_email: 'test@' }).success, false);
    assert.equal(contactSchema.safeParse(valid).success, true);
  });
  test('phone requires at least 8 digits and no letters', () => {
    assert.equal(contactSchema.safeParse({ ...valid, user_phone: '1234567' }).success, false);
    assert.equal(contactSchema.safeParse({ ...valid, user_phone: '1234567a' }).success, false);
    assert.equal(contactSchema.safeParse(valid).success, true);
  });
  test('message requires 5 characters', () => {
    assert.equal(contactSchema.safeParse({ ...valid, message: 'abcd' }).success, false);
    assert.equal(contactSchema.safeParse({ ...valid, message: 'abcde' }).success, true);
  });
  for (const [field, limit] of [['user_name', 100], ['user_email', 255], ['user_phone', 20], ['message', 1000]] as const) {
    test(`${field} rejects values beyond ${limit} characters`, () => {
      assert.equal(contactSchema.safeParse({ ...valid, [field]: '1'.repeat(limit + 1) }).success, false);
    });
  }
  test('legacy endpoint refuses submissions without reading private data', async () => {
    let bodyRead = false;
    const request = new Request('https://example.com', { method: 'POST', body: 'private data' });
    request.json = async () => { bodyRead = true; throw new Error('Must not read'); };
    const response = handler(request);
    assert.equal(response.status, 410);
    assert.equal(bodyRead, false);
    assert.deepEqual(await response.json(), { error: 'Endpoint unavailable' });
    assert.equal(response.headers.get('Access-Control-Allow-Origin'), null);
  });
});